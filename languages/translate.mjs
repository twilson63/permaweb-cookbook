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
    max_completion_tokens: 8192,
    messages: [
      {
        role: 'system',
        content: `You are a professional translator specializing in technical documentation. Translate the following text to ${targetLanguage}. 

IMPORTANT INSTRUCTIONS:
- This is technical documentation, so use appropriate technical vocabulary and terminology for ${targetLanguage}
- Preserve all Markdown formatting, code blocks, URLs, and file paths
- Translate ALL frontmatter fields (like title, description, etc.) to ${targetLanguage}
- Keep all code examples, variable names, and technical identifiers unchanged
- Maintain consistent terminology throughout the translation
- Only translate human-readable text, not code syntax or technical keywords`,
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
  if (typeof input === 'string' && input.length <= 4) {
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

async function getExistingFiles(dirPath, basePath = dirPath) {
  const files = new Set();
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await getExistingFiles(fullPath, basePath);
        subFiles.forEach(f => files.add(f));
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const relativePath = path.relative(basePath, fullPath);
        files.add(relativePath);
      }
    }
  } catch (error) {
    // Directory doesn't exist yet
    return files;
  }
  
  return files;
}

async function translateDirectory(dirPath, targetLang, inputLangCode, existingLangCodes) {
  // Get list of existing files in target language
  const targetDir = path.join(docsDir, targetLang.code);
  const existingTargetFiles = await getExistingFiles(targetDir, targetDir);
  
  console.log(`Found ${existingTargetFiles.size} existing translated files`);

  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (await shouldTranslatePath(fullPath, existingLangCodes)) {
        await translateDirectory(fullPath, targetLang, inputLangCode, existingLangCodes);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      // Calculate relative path from input language directory
      const docsRoot = inputLangCode === 'en' ? docsDir : path.join(docsDir, inputLangCode);
      const relativePath = path.relative(docsRoot, fullPath);
      
      // Check if this file already exists in target language
      if (existingTargetFiles.has(relativePath)) {
        console.log(`Skipping (already exists): ${relativePath}`);
        continue;
      }
      
      // Create output path in language subfolder
      const outputPath = path.join(docsDir, targetLang.code, relativePath);
      
      await translateFile(fullPath, targetLang, outputPath);
    }
  }
}

async function translateStrings(targetLang, inputLangCode = 'en') {
  const enStringsPath = path.join(rootDir, 'languages', 'strings', `${inputLangCode}.json`);
  const targetStringsPath = path.join(rootDir, 'languages', 'strings', `${targetLang.code}.json`);

  console.log(`Translating entire strings file from ${inputLangCode} -> ${targetLang.code}...`);
  const enStrings = await fs.readFile(enStringsPath, 'utf-8');
  
  const translatedContent = await translateText(enStrings, targetLang.display);
  
  await fs.writeFile(targetStringsPath, translatedContent, 'utf-8');
  console.log(`Translated strings saved to ${targetStringsPath}`);
}

async function translateSidebar(targetLang, inputLangCode = 'en') {
  const enSidebarPath = path.join(rootDir, 'languages', 'sidebars', `${inputLangCode}.js`);
  const targetSidebarPath = path.join(rootDir, 'languages', 'sidebars', `${targetLang.code}.js`);

  console.log(`Translating entire sidebar file from ${inputLangCode} -> ${targetLang.code}...`);
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
    // Support flags and a positional target language argument.
    // Usage examples:
    //   node translate.mjs --input-language fr en
    //   node translate.mjs -i fr en
    //   node translate.mjs en
    const argv = process.argv.slice(2);
    if (argv.length === 0) {
      throw new Error('Please provide a target language (code or JSON object). Optionally use --input-language or -i to set the source language (default "en").');
    }

    let inputLanguage = 'en';
    let rawTargetArg = null;

    for (let i = 0; i < argv.length; i++) {
      const a = argv[i];
      if (a.startsWith('--input-language=')) {
        inputLanguage = a.split('=')[1] || inputLanguage;
      } else if (a === '--input-language' || a === '-i') {
        i++;
        inputLanguage = argv[i] || inputLanguage;
      } else if (!rawTargetArg) {
        rawTargetArg = a;
      } else {
        // ignore additional args
      }
    }

    if (!rawTargetArg) {
      throw new Error('Please provide a target language (code or JSON object).');
    }

    let langInput;
    try {
      langInput = JSON.parse(rawTargetArg);
    } catch {
      langInput = rawTargetArg;
    }

    // Parse and validate language
    const targetLang = await parseLanguageInput(langInput);
    console.log(`Translating to ${targetLang.name} (${targetLang.code}) from input language "${inputLanguage}"`);

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

    // Translate strings first (use inputLanguage instead of hardcoded 'en')
    console.log('\nTranslating UI strings...');
    await translateStrings(targetLang, inputLanguage);

    // Translate sidebar second
    console.log('\nTranslating sidebar...');
    await translateSidebar(targetLang, inputLanguage);

    // Determine source docs directory based on inputLanguage
    const sourceDocsDir = inputLanguage === 'en' ? docsDir : path.join(docsDir, inputLanguage);

    // Translate documentation files last
    console.log('\nTranslating documentation files...');
    await translateDirectory(sourceDocsDir, targetLang, inputLanguage, existingLangCodes);

    console.log('\n✅ Translation complete!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();