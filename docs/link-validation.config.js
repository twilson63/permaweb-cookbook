/**
 * Link validation configuration
 * This file contains all the rules and patterns for link validation and fixing
 */

module.exports = {
  // Directories to search for markdown files
  searchPaths: ['src'],
  
  // Directories to exclude from search
  excludePaths: ['src/.vuepress', 'node_modules', '.git'],
  
  // File extensions to process
  fileExtensions: ['.md'],
  
  // Archive detection patterns
  archivePatterns: {
    // Content that has been moved to archive
    deprecatedContent: [
      'smartweave',
      'psts', 
      'atomic-tokens'
    ],
    
    // Archive directory path
    archiveDirectory: '/archive/',
    
    // Patterns that indicate intentional archive links (these won't trigger warnings)
    intentionalArchivePatterns: [
      /\.\.\/archive\//,
      /\.\/archive\//
    ]
  },
  
  // Common link fixes that can be applied automatically
  linkFixes: [
    {
      name: 'Fix ArFS main link',
      pattern: '../concepts/arfs.md',
      replacement: '../concepts/arfs/arfs.md',
      applyToArchive: false
    },
    {
      name: 'Fix image source references',
      pattern: /~@source\/images\//g,
      replacement: '../images/',
      applyToArchive: true
    },
    {
      name: 'Update SmartWeave guide links to archive',
      pattern: /\.\.\/guides\/smartweave\//g,
      replacement: '../archive/guides/smartweave/',
      applyToArchive: false
    },
    {
      name: 'Update SmartWeave concept links to archive',
      pattern: '../concepts/smartweave.md',
      replacement: '../archive/concepts/smartweave.md',
      applyToArchive: false
    },
    {
      name: 'Update PST concept links to archive',
      pattern: '../concepts/psts.md',
      replacement: '../archive/concepts/psts.md',
      applyToArchive: false
    },
    {
      name: 'Update atomic tokens concept links to archive',
      pattern: '../concepts/atomic-tokens.md',
      replacement: '../archive/concepts/atomic-tokens.md',
      applyToArchive: false
    }
  ],
  
  // Validation rules
  validation: {
    // Check for broken internal links
    checkInternalLinks: true,
    
    // Check for archive link warnings
    checkArchiveLinks: true,
    
    // Check external links (uses markdown-link-check)
    checkExternalLinks: true,
    
    // Maximum files to check in fast mode
    fastModeLimit: 10,
    
    // Fail build on internal link errors
    failOnInternalErrors: true,
    
    // Fail build on external link errors
    failOnExternalErrors: false,
    
    // Show warnings for archive links
    warnOnArchiveLinks: true
  },
  
  // Suggestions for different types of issues
  suggestions: {
    smartweave: 'Consider updating to point to archive or remove if no longer relevant',
    psts: 'Consider updating to point to archive/concepts/psts.md or remove if deprecated',
    'atomic-tokens': 'Consider updating to point to archive/concepts/atomic-tokens.md or modern alternative',
    internalBroken: 'File does not exist at this path',
    archiveGeneric: 'This appears to link to archived content'
  }
};