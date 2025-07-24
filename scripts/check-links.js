#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load configuration
const config = require('./link-validation.config.js');

/**
 * Find all markdown files in the specified directories
 */
function findMarkdownFiles(searchPaths = config.searchPaths, fileList = []) {
  searchPaths.forEach(searchPath => {
    if (!fs.existsSync(searchPath)) {
      console.warn(`Warning: Search path '${searchPath}' does not exist`);
      return;
    }
    
    const files = fs.readdirSync(searchPath);
    
    files.forEach(file => {
      const filePath = path.join(searchPath, file);
      const stat = fs.statSync(filePath);
      
      // Skip excluded directories
      if (stat.isDirectory()) {
        const isExcluded = config.excludePaths.some(excludePath => 
          filePath.includes(excludePath) || file.startsWith('.')
        );
        
        if (!isExcluded) {
          findMarkdownFiles([filePath], fileList);
        }
      } else {
        // Check if file has allowed extension
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
 * Check for internal links pointing to archived content
 */
function checkArchiveLinks(filePath) {
  if (!config.validation.checkArchiveLinks) {
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const archiveWarnings = [];
  
  // Skip if this file is already in the archive
  if (filePath.includes(config.archivePatterns.archiveDirectory)) {
    return archiveWarnings;
  }
  
  // Regex to find markdown links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    
    // Check if this is an intentional archive link
    const isIntentionalArchive = config.archivePatterns.intentionalArchivePatterns.some(pattern =>
      pattern.test(linkUrl)
    );
    
    if (isIntentionalArchive) {
      continue;
    }
    
    // Check for links pointing to archived content
    const isArchiveLink = linkUrl.includes(config.archivePatterns.archiveDirectory) ||
                         config.archivePatterns.deprecatedContent.some(content => 
                           linkUrl.includes(content)
                         );
    
    if (isArchiveLink) {
      // Determine appropriate suggestion
      let suggestion = config.suggestions.archiveGeneric;
      
      for (const [key, value] of Object.entries(config.suggestions)) {
        if (linkUrl.includes(key)) {
          suggestion = value;
          break;
        }
      }
      
      archiveWarnings.push({
        linkText,
        linkUrl,
        suggestion
      });
    }
  }
  
  return archiveWarnings;
}

/**
 * Check for broken internal relative links
 */
function checkInternalLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const brokenLinks = [];
  const fileDir = path.dirname(filePath);
  
  // Regex to find relative markdown links (not starting with http/https/mailto/file)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const linkText = match[1];
    const linkUrl = match[2];
    
    // Skip external links, anchors, and absolute paths
    if (linkUrl.startsWith('http') || 
        linkUrl.startsWith('mailto:') || 
        linkUrl.startsWith('file:') ||
        linkUrl.startsWith('#') ||
        linkUrl.startsWith('/')) {
      continue;
    }
    
    // Resolve relative path
    let targetPath = path.resolve(fileDir, linkUrl);
    
    // Check if target exists
    if (!fs.existsSync(targetPath)) {
      brokenLinks.push({
        linkText,
        linkUrl,
        resolvedPath: targetPath,
        suggestion: 'File does not exist at this path'
      });
    }
  }
  
  return brokenLinks;
}

/**
 * Run markdown-link-check on a file
 */
function checkFile(filePath) {
  return new Promise((resolve, reject) => {
    const cmd = `npx markdown-link-check "${filePath}" --config config/markdown-link-check.json`;
    
    exec(cmd, (error, stdout, stderr) => {
      if (error && error.code !== 1) {
        // Code 1 is expected when there are broken links
        reject(error);
        return;
      }
      
      const hasErrors = stdout.includes('✖') || stdout.includes('ERROR');
      
      // Additional internal link checks
      const archiveWarnings = checkArchiveLinks(filePath);
      const brokenInternalLinks = checkInternalLinks(filePath);
      
      resolve({
        file: filePath,
        output: stdout,
        hasErrors: hasErrors,
        archiveWarnings: archiveWarnings,
        brokenInternalLinks: brokenInternalLinks,
        hasInternalIssues: archiveWarnings.length > 0 || brokenInternalLinks.length > 0
      });
    });
  });
}

/**
 * Check if build directory exists (for built HTML validation)
 */
function checkBuildExists() {
  return fs.existsSync(buildDir);
}

/**
 * Main function to run link checking
 */
async function main(options = {}) {
  console.log('🔍 Starting link validation...\n');
  
  // Find all markdown files
  const markdownFiles = findMarkdownFiles();
  let filesToCheck = markdownFiles;
  
  // Apply fast mode limit if specified
  if (options.fast) {
    filesToCheck = markdownFiles.slice(0, config.validation.fastModeLimit);
    console.log(`Fast mode: checking first ${filesToCheck.length} files\n`);
  } else {
    console.log(`Found ${markdownFiles.length} markdown files to check\n`);
  }
  
  let totalErrors = 0;
  let totalArchiveWarnings = 0;
  let totalInternalErrors = 0;
  const failedFiles = [];
  const filesWithArchiveIssues = [];
  const filesWithInternalIssues = [];
  
  // Check each file
  for (const file of filesToCheck) {
    console.log(`Checking: ${file}`);
    
    try {
      const result = await checkFile(file);
      
      // Handle external link errors
      if (result.hasErrors) {
        totalErrors++;
        failedFiles.push(file);
        console.log(result.output);
      }
      
      // Handle archive warnings
      if (result.archiveWarnings.length > 0) {
        totalArchiveWarnings += result.archiveWarnings.length;
        filesWithArchiveIssues.push(file);
        console.log('⚠️  Archive Link Warnings:');
        result.archiveWarnings.forEach(warning => {
          console.log(`  - "${warning.linkText}" → ${warning.linkUrl}`);
          console.log(`    ${warning.suggestion}`);
        });
      }
      
      // Handle broken internal links
      if (result.brokenInternalLinks.length > 0) {
        totalInternalErrors += result.brokenInternalLinks.length;
        filesWithInternalIssues.push(file);
        console.log('❌ Broken Internal Links:');
        result.brokenInternalLinks.forEach(link => {
          console.log(`  - "${link.linkText}" → ${link.linkUrl}`);
          console.log(`    ${link.suggestion}`);
          console.log(`    Resolved to: ${link.resolvedPath}`);
        });
      }
      
      if (!result.hasErrors && !result.hasInternalIssues) {
        console.log('✅ All links valid\n');
      } else {
        console.log(''); // Add spacing
      }
    } catch (error) {
      console.error(`❌ Error checking ${file}:`, error.message);
      totalErrors++;
      failedFiles.push(file);
    }
  }
  
  // Summary
  console.log('\n📊 Link Validation Summary');
  console.log('='.repeat(50));
  console.log(`Total files checked: ${filesToCheck.length}`);
  console.log(`Files with external link errors: ${failedFiles.length}`);
  console.log(`Files with broken internal links: ${filesWithInternalIssues.length}`);
  console.log(`Files with archive link warnings: ${filesWithArchiveIssues.length}`);
  console.log(`Total external link errors: ${totalErrors}`);
  console.log(`Total broken internal links: ${totalInternalErrors}`);
  console.log(`Total archive warnings: ${totalArchiveWarnings}`);
  
  let hasIssues = false;
  
  if (failedFiles.length > 0) {
    console.log('\n❌ Files with broken external links:');
    failedFiles.forEach(file => console.log(`  - ${file}`));
    hasIssues = true;
  }
  
  if (filesWithInternalIssues.length > 0) {
    console.log('\n💥 Files with broken internal links:');
    filesWithInternalIssues.forEach(file => console.log(`  - ${file}`));
    hasIssues = true;
  }
  
  if (filesWithArchiveIssues.length > 0) {
    console.log('\n⚠️  Files with archive link warnings:');
    filesWithArchiveIssues.forEach(file => console.log(`  - ${file}`));
    console.log('\n📝 Archive warnings indicate links to deprecated content.');
    console.log('   Consider updating these links or removing them if no longer relevant.');
  }
  
  if (hasIssues) {
    console.log('\n💡 Tips:');
    console.log('  - Internal link errors MUST be fixed - they indicate structural issues');
    console.log('  - Check that internal links use correct relative paths');
    console.log('  - Verify external URLs are accessible');
    console.log('  - Run "npm run build" first to ensure all pages exist');
    console.log('  - Update archive references after content reorganization');
    
    process.exit(1);
  } else if (totalArchiveWarnings > 0) {
    console.log('\n⚠️  Archive warnings found but no critical errors.');
    console.log('   Review warnings above and update links as appropriate.');
    process.exit(0);
  } else {
    console.log('\n✅ All links are valid!');
    process.exit(0);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const options = {
  fast: args.includes('--fast') || args.includes('-f'),
  help: args.includes('--help') || args.includes('-h'),
  skipExternal: args.includes('--skip-external'),
  skipInternal: args.includes('--skip-internal'),
  skipArchive: args.includes('--skip-archive')
};

if (options.help) {
  console.log(`
Usage: node scripts/check-links.js [options]

Options:
  --help, -h           Show this help message
  --fast, -f           Check only the first ${config.validation.fastModeLimit} files
  --skip-external      Skip external link validation
  --skip-internal      Skip internal link validation
  --skip-archive       Skip archive link warnings

This script checks all markdown files for broken links using configurable rules.
External link validation uses markdown-link-check.
Internal link validation checks filesystem paths.
Archive link detection warns about deprecated content references.

Configuration is handled through link-validation.config.js
  `);
  process.exit(0);
}

// Override config based on command line options
if (options.skipExternal) config.validation.checkExternalLinks = false;
if (options.skipInternal) config.validation.checkInternalLinks = false;
if (options.skipArchive) config.validation.checkArchiveLinks = false;

main(options).catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});