#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  // Directories to scan for markdown files
  scanDirs: ['src'],
  
  // File extensions to process
  extensions: ['.md'],
  
  // Directories to exclude
  excludeDirs: ['node_modules', '.vuepress', 'dist', '.git'],
  
  // Files to exclude from renaming
  excludeFiles: ['README.md', 'index.md', 'CLAUDE.md', 'CLAUDE.local.md'],
  
  // Naming rules
  namingRules: {
    // Preferred casing style: kebab-case
    casing: 'kebab-case',
    
    // Common replacements for better clarity
    replacements: {
      'queryTransactions': 'query-transactions',
      'queryingArweave': 'querying-arweave',
      'gqlGuide': 'graphql-guide',
      'arGQL': 'ar-graphql',
      'aoTokens': 'ao-tokens',
      'aoConnect': 'ao-connect',
      'arnsSDK': 'arns-sdk',
      'vouch': 'vouch-dao',
      'turboSdk': 'turbo-sdk',
      'uploadFiles': 'upload-files',
      'tagFiltering': 'tag-filtering',
      'searchIndexing': 'search-indexing',
      'pathManifest': 'path-manifest',
      'createManifest': 'create-manifest',
      'vouch': 'vouch-system',
      'importAndPublish': 'import-and-publish',
      'deployApp': 'deploy-app',
      'llms': 'llms-txt',
    },
    
    // Keywords that should be preserved in certain contexts
    preservedWords: ['AO', 'ArNS', 'PST', 'ANT', 'UCM', 'SPoRA', 'LLMs'],
  },
  
  // Validation options
  validation: {
    checkContent: true,
    minContentLength: 50, // Minimum content length to validate
  }
};

// Convert string to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// Apply naming rules to filename
function applyNamingRules(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  
  // Check if it's an excluded file
  if (CONFIG.excludeFiles.includes(filename)) {
    return filename;
  }
  
  // Apply direct replacements first
  let newBase = base;
  for (const [old, replacement] of Object.entries(CONFIG.namingRules.replacements)) {
    if (base.toLowerCase() === old.toLowerCase()) {
      newBase = replacement;
      break;
    }
  }
  
  // If no direct replacement, apply casing rules
  if (newBase === base && CONFIG.namingRules.casing === 'kebab-case') {
    newBase = toKebabCase(base);
  }
  
  return newBase + ext;
}

// Validate file content matches filename
async function validateFileContent(filePath, filename) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    if (content.length < CONFIG.validation.minContentLength) {
      return { valid: true, reason: 'Content too short to validate' };
    }
    
    const base = path.basename(filename, path.extname(filename));
    const keywords = base.split('-').filter(k => k.length > 2);
    
    // Check if filename keywords appear in content
    const contentLower = content.toLowerCase();
    const matchingKeywords = keywords.filter(keyword => 
      contentLower.includes(keyword.toLowerCase())
    );
    
    const matchRatio = matchingKeywords.length / keywords.length;
    
    if (matchRatio < 0.5) {
      return {
        valid: false,
        reason: `Filename doesn't match content well (${Math.round(matchRatio * 100)}% keyword match)`,
        suggestion: suggestFilenameFromContent(content)
      };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, reason: `Error reading file: ${error.message}` };
  }
}

// Suggest filename based on content
function suggestFilenameFromContent(content) {
  // Extract title from markdown
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    return toKebabCase(title) + '.md';
  }
  
  // Extract from first paragraph
  const firstPara = content.split('\n\n')[0].replace(/^#+\s+/, '');
  if (firstPara.length > 10 && firstPara.length < 100) {
    return toKebabCase(firstPara.split(/[.!?]/)[0].trim().substring(0, 50)) + '.md';
  }
  
  return null;
}

// Find all markdown files recursively
async function findMarkdownFiles(dir) {
  const files = [];
  
  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        if (!CONFIG.excludeDirs.includes(entry.name)) {
          await scan(fullPath);
        }
      } else if (CONFIG.extensions.includes(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }
  
  await scan(dir);
  return files;
}

// Update all references to a renamed file
async function updateFileReferences(oldPath, newPath) {
  const oldRelative = path.relative('docs/src', oldPath);
  const newRelative = path.relative('docs/src', newPath);
  const oldBasename = path.basename(oldPath);
  const newBasename = path.basename(newPath);
  
  // Find all files that might contain references
  const allFiles = [];
  for (const dir of CONFIG.scanDirs) {
    const files = await findMarkdownFiles(dir);
    allFiles.push(...files);
  }
  
  // Add sidebar.js to the list
  allFiles.push('src/.vuepress/sidebar.js');
  
  let updatedFiles = 0;
  
  for (const file of allFiles) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      let updated = false;
      
      // Update different types of references
      const patterns = [
        // Markdown links
        { regex: new RegExp(`\\]\\([^)]*${escapeRegex(oldBasename)}\\)`, 'g'), replacement: (match) => match.replace(oldBasename, newBasename) },
        // HTML paths in sidebar.js
        { regex: new RegExp(`/${escapeRegex(oldRelative).replace(/\\/g, '/').replace(/\.md$/, '')}\\.html`, 'g'), 
          replacement: `/${newRelative.replace(/\\/g, '/').replace(/\.md$/, '')}.html` },
        // Relative paths
        { regex: new RegExp(`\\.\\./[^\\s)]*${escapeRegex(oldBasename)}`, 'g'), replacement: (match) => match.replace(oldBasename, newBasename) },
        { regex: new RegExp(`\\.\\./[^\\s)]*/${escapeRegex(oldBasename)}`, 'g'), replacement: (match) => match.replace(oldBasename, newBasename) },
      ];
      
      for (const { regex, replacement } of patterns) {
        const newContent = content.replace(regex, replacement);
        if (newContent !== content) {
          content = newContent;
          updated = true;
        }
      }
      
      if (updated) {
        await fs.writeFile(file, content, 'utf-8');
        updatedFiles++;
      }
    } catch (error) {
      console.error(`Error updating references in ${file}: ${error.message}`);
    }
  }
  
  return updatedFiles;
}

// Escape regex special characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  
  console.log('🔍 Scanning for files to standardize...\n');
  if (checkOnly) {
    console.log('📋 Running in check-only mode (no changes will be made)\n');
  }
  
  const filesToRename = [];
  const validationIssues = [];
  
  // Scan all configured directories
  for (const dir of CONFIG.scanDirs) {
    const files = await findMarkdownFiles(dir);
    
    for (const filePath of files) {
      const filename = path.basename(filePath);
      const newFilename = applyNamingRules(filename);
      
      // Check if rename is needed
      if (filename !== newFilename) {
        filesToRename.push({
          oldPath: filePath,
          newPath: path.join(path.dirname(filePath), newFilename),
          oldName: filename,
          newName: newFilename
        });
      }
      
      // Validate content matches filename
      if (CONFIG.validation.checkContent) {
        const validation = await validateFileContent(filePath, newFilename || filename);
        if (!validation.valid) {
          validationIssues.push({
            path: filePath,
            filename: filename,
            issue: validation.reason,
            suggestion: validation.suggestion
          });
        }
      }
    }
  }
  
  // Display findings
  if (filesToRename.length === 0 && validationIssues.length === 0) {
    console.log('✅ All files follow naming standards!\n');
    return;
  }
  
  // Show files to rename
  if (filesToRename.length > 0) {
    console.log(`📝 Files to rename (${filesToRename.length}):\n`);
    filesToRename.forEach(({ oldName, newName }) => {
      console.log(`  ${oldName} → ${newName}`);
    });
    console.log();
  }
  
  // Show validation issues
  if (validationIssues.length > 0) {
    console.log(`⚠️  Content validation issues (${validationIssues.length}):\n`);
    validationIssues.forEach(({ filename, issue, suggestion }) => {
      console.log(`  ${filename}: ${issue}`);
      if (suggestion) {
        console.log(`    Suggested: ${suggestion}`);
      }
    });
    console.log();
  }
  
  // Exit if in check-only mode
  if (checkOnly) {
    if (filesToRename.length > 0 || validationIssues.length > 0) {
      console.log('❌ Files do not meet naming standards. Run "npm run standardize:files" to fix.\n');
      process.exit(1);
    }
    return;
  }
  
  // Ask for confirmation
  if (filesToRename.length > 0) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const answer = await new Promise(resolve => {
      readline.question('Proceed with renaming? (y/n): ', resolve);
    });
    readline.close();
    
    if (answer.toLowerCase() !== 'y') {
      console.log('❌ Operation cancelled.');
      return;
    }
    
    // Perform renames
    console.log('\n🔄 Renaming files...');
    
    for (const { oldPath, newPath, oldName, newName } of filesToRename) {
      try {
        // Rename the file
        await fs.rename(oldPath, newPath);
        console.log(`  ✅ ${oldName} → ${newName}`);
        
        // Update references
        const updatedRefs = await updateFileReferences(oldPath, newPath);
        if (updatedRefs > 0) {
          console.log(`     Updated ${updatedRefs} references`);
        }
      } catch (error) {
        console.error(`  ❌ Error renaming ${oldName}: ${error.message}`);
      }
    }
    
    // Run link validation
    console.log('\n🔗 Running link validation...');
    try {
      const { stdout } = await execAsync('npm run check:links:fast');
      console.log(stdout);
    } catch (error) {
      console.error('Link validation found issues. Run "npm run check:links" for full report.');
    }
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { applyNamingRules, validateFileContent, updateFileReferences };