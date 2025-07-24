/**
 * Markdown Processor with Content Metadata Integration
 * 
 * This module handles markdown processing with automatic metadata detection,
 * frontmatter parsing, and content enhancement for the Permaweb Cookbook.
 */

import { generateContentMetadata, detectStability, detectDifficulty } from './contentMetadata.js';

/**
 * Parse frontmatter from markdown content
 * @param {string} content - Raw markdown content
 * @returns {object} { frontmatter, body }
 */
export function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: {},
      body: content
    };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter = {};
  
  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, body };
}

/**
 * Generate frontmatter string from object
 * @param {object} frontmatter - Frontmatter object
 * @returns {string} YAML frontmatter string
 */
export function stringifyFrontmatter(frontmatter) {
  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return '';
  }
  
  const lines = ['---'];
  Object.entries(frontmatter).forEach(([key, value]) => {
    // Quote strings that contain special characters
    const needsQuotes = typeof value === 'string' && 
      (value.includes(':') || value.includes('#') || value.includes('[') || value.includes(']'));
    
    if (needsQuotes) {
      lines.push(`${key}: "${value}"`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  });
  lines.push('---', '');
  
  return lines.join('\n');
}

/**
 * Enhance content with automatic metadata detection and badges
 * @param {string} content - Original markdown content
 * @param {string} filePath - File path for context
 * @param {object} options - Processing options
 * @returns {string} Enhanced markdown content
 */
export function enhanceContent(content, filePath = '', options = {}) {
  const {
    autoDetectMetadata = true,
    injectBadges = true,
    preserveExisting = true,
    badgePosition = 'after-title' // 'after-title', 'before-content', 'manual'
  } = options;
  
  const { frontmatter, body } = parseFrontmatter(content);
  
  if (!autoDetectMetadata && !injectBadges) {
    return content;
  }
  
  let enhancedFrontmatter = { ...frontmatter };
  let enhancedBody = body;
  
  // Auto-detect and add metadata if missing
  if (autoDetectMetadata) {
    const metadata = generateContentMetadata(body, filePath);
    
    // Only add if not explicitly set and preserveExisting is true
    if (!enhancedFrontmatter.stability || !preserveExisting) {
      enhancedFrontmatter.stability = metadata.stability.level;
    }
    if (!enhancedFrontmatter.difficulty || !preserveExisting) {
      enhancedFrontmatter.difficulty = metadata.difficulty.level;
    }
    if (!enhancedFrontmatter.timeEstimate || !preserveExisting) {
      enhancedFrontmatter.timeEstimate = metadata.timeEstimate;
    }
    
    // Add processing metadata
    enhancedFrontmatter.lastProcessed = new Date().toISOString();
  }
  
  // Inject content badges
  if (injectBadges && badgePosition !== 'manual') {
    const badgeComponent = generateBadgeComponent(enhancedFrontmatter);
    
    if (badgePosition === 'after-title') {
      // Insert after the first heading
      const titleMatch = enhancedBody.match(/^(# .+?\n)/);
      if (titleMatch) {
        enhancedBody = enhancedBody.replace(titleMatch[1], 
          `${titleMatch[1]}\n${badgeComponent}\n`);
      } else {
        enhancedBody = `${badgeComponent}\n\n${enhancedBody}`;
      }
    } else if (badgePosition === 'before-content') {
      enhancedBody = `${badgeComponent}\n\n${enhancedBody}`;
    }
  }
  
  return stringifyFrontmatter(enhancedFrontmatter) + enhancedBody;
}

/**
 * Generate badge component markup for insertion
 * @param {object} frontmatter - Document frontmatter
 * @returns {string} Badge component markup
 */
function generateBadgeComponent(frontmatter) {
  const props = [];
  
  if (frontmatter.stability) {
    props.push(`stability="${frontmatter.stability}"`);
  }
  if (frontmatter.difficulty) {
    props.push(`difficulty="${frontmatter.difficulty}"`);
  }
  if (frontmatter.timeEstimate) {
    props.push(`timeEstimate="${frontmatter.timeEstimate}"`);
  }
  
  return `<ContentMetadataBadges ${props.join(' ')} />`;
}

/**
 * Validate content metadata and structure
 * @param {string} content - Markdown content to validate
 * @param {string} filePath - File path for context
 * @returns {object} Validation results with issues and suggestions
 */
export function validateContent(content, filePath = '') {
  const { frontmatter, body } = parseFrontmatter(content);
  const issues = [];
  const suggestions = [];
  
  // Check for required frontmatter fields
  const requiredFields = ['title', 'description'];
  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      issues.push(`Missing required frontmatter field: ${field}`);
    }
  });
  
  // Validate metadata consistency
  if (frontmatter.stability) {
    const detectedStability = detectStability(body, filePath);
    if (frontmatter.stability.toUpperCase() !== detectedStability) {
      suggestions.push(
        `Frontmatter stability (${frontmatter.stability}) differs from detected stability (${detectedStability})`
      );
    }
  }
  
  if (frontmatter.difficulty) {
    const detectedDifficulty = detectDifficulty(body);
    if (frontmatter.difficulty.toUpperCase() !== detectedDifficulty) {
      suggestions.push(
        `Frontmatter difficulty (${frontmatter.difficulty}) differs from detected difficulty (${detectedDifficulty})`
      );
    }
  }
  
  // Check content structure
  const headingMatches = body.match(/^#+\s+.+$/gm) || [];
  if (headingMatches.length === 0) {
    issues.push('No headings found in content');
  }
  
  // Check for broken internal links
  const internalLinks = body.match(/\[.*?\]\((?!https?:\/\/).*?\)/g) || [];
  internalLinks.forEach(link => {
    const linkMatch = link.match(/\[.*?\]\((.*?)\)/);
    if (linkMatch && linkMatch[1].startsWith('/')) {
      // This would need file system checking in a real implementation
      suggestions.push(`Verify internal link exists: ${linkMatch[1]}`);
    }
  });
  
  // Check code block syntax highlighting
  const codeBlocks = body.match(/```(\w+)?\n[\s\S]*?```/g) || [];
  codeBlocks.forEach(block => {
    if (block.startsWith('```\n')) {
      suggestions.push('Code block missing language specification for syntax highlighting');
    }
  });
  
  return {
    valid: issues.length === 0,
    issues,
    suggestions,
    frontmatter,
    metadata: generateContentMetadata(body, filePath)
  };
}

/**
 * Extract table of contents from markdown content
 * @param {string} content - Markdown content
 * @param {number} maxDepth - Maximum heading depth to include
 * @returns {array} Table of contents entries
 */
export function extractTableOfContents(content, maxDepth = 3) {
  const { body } = parseFrontmatter(content);
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc = [];
  let match;
  
  while ((match = headingRegex.exec(body)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    
    if (level <= maxDepth) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      toc.push({
        level,
        title,
        slug,
        anchor: `#${slug}`
      });
    }
  }
  
  return toc;
}

/**
 * Calculate reading time estimate
 * @param {string} content - Markdown content
 * @param {number} wordsPerMinute - Average reading speed
 * @returns {string} Reading time estimate
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  const { body } = parseFrontmatter(content);
  
  // Remove code blocks and other non-readable content
  const readableContent = body
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Replace links with just text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .trim();
  
  const wordCount = readableContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes === 1) return '1 minute read';
  if (minutes < 60) return `${minutes} minute read`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} read`;
  }
  
  return `${hours}h ${remainingMinutes}m read`;
}

/**
 * Process markdown files in batch
 * @param {array} files - Array of { path, content } objects
 * @param {object} options - Processing options
 * @returns {array} Processed files with enhancement results
 */
export function batchProcessFiles(files, options = {}) {
  return files.map(({ path, content }) => {
    try {
      const enhanced = enhanceContent(content, path, options);
      const validation = validateContent(enhanced, path);
      
      return {
        path,
        originalContent: content,
        enhancedContent: enhanced,
        validation,
        success: true
      };
    } catch (error) {
      return {
        path,
        originalContent: content,
        enhancedContent: content,
        validation: { valid: false, issues: [error.message], suggestions: [] },
        success: false,
        error: error.message
      };
    }
  });
}

export default {
  parseFrontmatter,
  stringifyFrontmatter,
  enhanceContent,
  validateContent,
  extractTableOfContents,
  calculateReadingTime,
  batchProcessFiles
};