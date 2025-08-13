#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load configuration
const config = require('./link-validation.config.js');

/**
 * Apply fixes to a file
 */
function fixFile(filePath, dryRun = false) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changed = false;
  const fixes = [];
  
  config.linkFixes.forEach(fix => {
    // Skip archive-specific fixes if this file is in archive and fix shouldn't apply
    if (!fix.applyToArchive && filePath.includes(config.archivePatterns.archiveDirectory)) {
      return;
    }
    
    // Handle both string and regex patterns
    if (fix.pattern instanceof RegExp) {
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replacement);
        fixes.push(fix.name);
        changed = true;
      }
    } else {
      if (content.includes(fix.pattern)) {
        content = content.replace(new RegExp(fix.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fix.replacement);
        fixes.push(fix.name);
        changed = true;
      }
    }
  });
  
  if (changed) {
    if (!dryRun) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${filePath}:`);
    } else {
      console.log(`📋 Would fix ${filePath}:`);
    }
    fixes.forEach(fix => console.log(`  - ${fix}`));
  }
  
  return changed;
}

/**
 * Find all markdown files using the shared function
 */
function findMarkdownFiles(searchPaths = config.searchPaths, fileList = []) {
  // Use the same logic as check-links.js for consistency
  searchPaths.forEach(searchPath => {
    if (!fs.existsSync(searchPath)) {
      console.warn(`Warning: Search path '${searchPath}' does not exist`);
      return;
    }
    
    const files = fs.readdirSync(searchPath);
    
    files.forEach(file => {
      const filePath = path.join(searchPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        const isExcluded = config.excludePaths.some(excludePath => 
          filePath.includes(excludePath) || file.startsWith('.')
        );
        
        if (!isExcluded) {
          findMarkdownFiles([filePath], fileList);
        }
      } else {
        const hasAllowedExtension = config.fileExtensions.some(ext => 
          file.endsWith(ext)
        );
        
        if (hasAllowedExtension) {
          fileList.push(filePath);
        }
      }
    });
  });
  
  return fileList;
}

/**
 * Main function
 */
function main(options = {}) {
  const actionText = options.dryRun ? 'Previewing common link fixes' : 'Applying common link fixes';
  console.log(`🔧 ${actionText}...\n`);
  
  const markdownFiles = findMarkdownFiles();
  let totalFixed = 0;
  
  markdownFiles.forEach(file => {
    if (fixFile(file, options.dryRun)) {
      totalFixed++;
    }
  });
  
  const summaryText = options.dryRun ? 'Would fix' : 'Fixed';
  console.log(`\n📊 Summary: ${summaryText} ${totalFixed} files`);
  
  if (totalFixed > 0) {
    if (options.dryRun) {
      console.log('\n💡 Run without --dry-run to apply these fixes:');
      console.log('   npm run fix:links');
    } else {
      console.log('\n💡 Run link validation again to verify fixes:');
      console.log('   npm run check:links:fast');
    }
  } else {
    console.log('\n✅ No common issues found to fix automatically.');
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const options = {
  help: args.includes('--help') || args.includes('-h'),
  dryRun: args.includes('--dry-run') || args.includes('-d'),
  paths: args.filter(arg => !arg.startsWith('--') && !arg.startsWith('-'))
};

if (options.help) {
  console.log(`
Usage: node scripts/fix-common-links.js [options] [paths...]

Options:
  --help, -h       Show this help message
  --dry-run, -d    Show what would be fixed without making changes
  [paths...]       Specific paths to fix (defaults to all configured search paths)

This script automatically fixes common link issues based on configured patterns.
Available fixes are defined in link-validation.config.js

Examples:
  node scripts/fix-common-links.js                    # Fix all files
  node scripts/fix-common-links.js --dry-run          # Preview fixes
  node scripts/fix-common-links.js src/concepts       # Fix specific directory
  `);
  process.exit(0);
}

// Override search paths if provided
if (options.paths.length > 0) {
  config.searchPaths = options.paths;
}

main(options);