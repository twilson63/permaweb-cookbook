import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import { languages } from '../languages/def.js';

try {
  const dotenv = await import('dotenv')
  dotenv.config()
  console.log('dotenv loaded')
} catch (e) {
  console.log('dotenv not installed, skipping…')
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'src');

// Blacklisted paths to exclude from translation
const BLACKLIST = [
  'node_modules',
  '.git',
  'public',
  'static',
  '.docusaurus',
  'build',
  '.vuepress',
  'utils',
  'components',
  'images',
];

// Initialize OpenAI client for OpenRouter
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function translateText(text, targetLanguage) {
  const response = await openai.chat.completions.create({
    model: 'openai/gpt-5-mini',
    messages: [
      {
        role: 'system',
        content: `You are a professional translator. Translate the following text to ${targetLanguage}. Preserve all Markdown formatting, code blocks, URLs, and frontmatter. Only translate human-readable text.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
  });

  return response.choices[0].message.content;
}

async function parseLanguageInput(input) {
  // Check if input is a language code
  if (typeof input === 'string' && input.length === 2) {
    const existingLang = languages.find((lang) => lang.code === input);
    if (!existingLang) {
      throw new Error(
        `Language code "${input}" not found. Please provide a full language object.`
      );
    }
    return existingLang;
  }

  // Parse full language object
  if (typeof input === 'object') {
    if (!input.name || !input.display || !input.code || !input.path) {
      throw new Error(
        'Language object must have name, display, code, and path properties.'
      );
    }
    return input;
  }

  throw new Error('Invalid input. Provide a language code or full object.');
}

async function addLanguageDefinition(langObj) {
  const defPath = path.join(rootDir, 'languages', 'def.js');
  const content = await fs.readFile(defPath, 'utf-8');

  // Check if language already exists
  if (content.includes(`code: "${langObj.code}"`)) {
    console.log(`Language ${langObj.code} already exists in definitions.`);
    return;
  }

  // Add new language to the array
  const newLangStr = `  {
    name: "${langObj.name}",
    display: "${langObj.display}",
    code: "${langObj.code}",
    path: "${langObj.path}",
  },`;

  const updated = content.replace(
    /export const languages = \[([\s\S]*?)\];/,
    (match, langArray) => {
      return `export const languages = [${langArray}${newLangStr}\n];`;
    }
  );

  await fs.writeFile(defPath, updated, 'utf-8');
  console.log(`Added ${langObj.name} to language definitions.`);
}

async function getExistingLanguageCodes() {
  return languages.map((lang) => lang.code);
}

async function shouldTranslatePath(itemPath, existingLangCodes) {
  const basename = path.basename(itemPath);

  // Exclude blacklisted paths
  if (BLACKLIST.includes(basename)) {
    return false;
  }

  // Exclude existing language folders
  if (existingLangCodes.includes(basename)) {
    return false;
  }

  return true;
}

async function translateFile(filePath, targetLang, outputPath) {
  console.log(`Translating: ${path.relative(docsDir, filePath)}`);

  const content = await fs.readFile(filePath, 'utf-8');
  const translated = await translateText(content, targetLang.display);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, translated, 'utf-8');
}

async function translateDirectory(dirPath, targetLang, existingLangCodes) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (await shouldTranslatePath(fullPath, existingLangCodes)) {
        await translateDirectory(fullPath, targetLang, existingLangCodes);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      // Calculate relative path from src directory
      const relativePath = path.relative(docsDir, fullPath);
      // Create output path in language subfolder
      const outputPath = path.join(docsDir, targetLang.code, relativePath);
      
      await translateFile(fullPath, targetLang, outputPath);
    }
  }
}

async function translateStrings(targetLang) {
  const enStringsPath = path.join(rootDir, 'languages', 'strings', 'en.json');
  const targetStringsPath = path.join(rootDir, 'languages', 'strings', `${targetLang.code}.json`);

  console.log('Translating entire strings file...');
  const enStrings = await fs.readFile(enStringsPath, 'utf-8');
  
  const translatedContent = await translateText(enStrings, targetLang.display);
  
  await fs.writeFile(targetStringsPath, translatedContent, 'utf-8');
  console.log(`Translated strings saved to ${targetStringsPath}`);
}

async function translateSidebar(targetLang) {
  const enSidebarPath = path.join(rootDir, 'languages', 'sidebars', 'en.js');
  const targetSidebarPath = path.join(rootDir, 'languages', 'sidebars', `${targetLang.code}.js`);

  console.log('Translating entire sidebar file...');
  const content = await fs.readFile(enSidebarPath, 'utf-8');
  
  // First, update all paths to include the language code
  const updatedPaths = content.replace(
    /link: "\/([^"]+)"/g,
    `link: "/${targetLang.code}/$1"`
  );
  
  // Then translate the content
  const translated = await translateText(updatedPaths, targetLang.display);

  await fs.writeFile(targetSidebarPath, translated, 'utf-8');
  console.log(`Translated sidebar saved to ${targetSidebarPath}`);
}

async function main() {
  try {
    // Get input from command line arguments
    const inputArg = process.argv[2];
    if (!inputArg) {
      throw new Error('Please provide a language code or object.');
    }

    let langInput;
    try {
      langInput = JSON.parse(inputArg);
    } catch {
      langInput = inputArg;
    }

    // Parse and validate language
    const targetLang = await parseLanguageInput(langInput);
    console.log(`Translating to ${targetLang.name} (${targetLang.code})`);

    // Add language definition if new
    const existingLang = languages.find((lang) => lang.code === targetLang.code);
    if (!existingLang) {
      await addLanguageDefinition(targetLang);
    }

    // Get existing language codes
    const existingLangCodes = await getExistingLanguageCodes();

    // Create output directory
    const outputDir = path.join(docsDir, targetLang.code);
    await fs.mkdir(outputDir, { recursive: true });

    // Translate strings first
    console.log('\nTranslating UI strings...');
    await translateStrings(targetLang);

    // Translate sidebar second
    console.log('\nTranslating sidebar...');
    await translateSidebar(targetLang);

    // Translate documentation files last
    console.log('\nTranslating documentation files...');
    await translateDirectory(docsDir, targetLang, existingLangCodes);

    console.log('\n✅ Translation complete!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();