/**
 * Content Metadata and Stability Tag System
 * 
 * This system provides automated classification and stability indicators
 * for documentation content to help users understand the maturity
 * and reliability of different guides and concepts.
 */

// Stability tag definitions with visual styling
export const stabilityTags = {
  EVERGREEN: {
    label: 'Evergreen',
    color: '#10B981', // emerald-500
    bgColor: '#D1FAE5', // emerald-100
    textColor: '#065F46', // emerald-800
    description: 'Fundamental concepts that rarely change. These are core blockchain and permaweb principles.',
    examples: ['wallet', 'transaction', 'key management', 'cryptographic fundamentals']
  },
  STABLE: {
    label: 'Stable',
    color: '#3B82F6', // blue-500
    bgColor: '#DBEAFE', // blue-100
    textColor: '#1E3A8A', // blue-800
    description: 'Well-tested implementations with established patterns. Production-ready.',
    examples: ['arweave-js', 'graphql queries', 'deployment tools', 'established SDKs']
  },
  CUTTING_EDGE: {
    label: 'Cutting-edge',
    color: '#F59E0B', // amber-500
    bgColor: '#FEF3C7', // amber-100
    textColor: '#92400E', // amber-700
    description: 'Latest features and experimental functionality. May change rapidly.',
    examples: ['ao-processes', 'hyperbeam', 'experimental features', 'preview APIs']
  },
  LEGACY: {
    label: 'Legacy',
    color: '#6B7280', // gray-500
    bgColor: '#F3F4F6', // gray-100
    textColor: '#374151', // gray-700
    description: 'Deprecated or outdated content maintained for reference.',
    examples: ['smartweave', 'deprecated APIs', 'archived tools']
  }
};

// Content classification keywords for automatic detection
const classificationKeywords = {
  EVERGREEN: [
    'wallet', 'transaction', 'key', 'address', 'signature', 'cryptography',
    'blockchain', 'hash', 'merkle', 'consensus', 'peer-to-peer', 'decentralized',
    'private key', 'public key', 'mnemonic', 'seed phrase'
  ],
  STABLE: [
    'arweave-js', 'graphql', 'query', 'gateway', 'bundling', 'turbo',
    'deployment', 'manifest', 'arns', 'arkb', 'permaweb-deploy',
    'github actions', 'ar-gql', 'goldsky'
  ],
  CUTTING_EDGE: [
    'ao', 'ao-process', 'hyperbeam', 'lua', 'serverless', 'wasm',
    'experimental', 'preview', 'beta', 'alpha', 'aoconnect',
    'process communication', 'message passing'
  ],
  LEGACY: [
    'smartweave', 'warp', 'exm', 'redstone', 'atomic', 'pst',
    'profit sharing token', 'deprecated', 'legacy', 'archived'
  ]
};

// Difficulty levels for content complexity
export const difficultyLevels = {
  BEGINNER: {
    label: 'Beginner',
    color: '#10B981',
    description: 'No prior experience required',
    timeEstimate: '15-30 minutes'
  },
  INTERMEDIATE: {
    label: 'Intermediate', 
    color: '#F59E0B',
    description: 'Basic knowledge of web development',
    timeEstimate: '30-60 minutes'
  },
  ADVANCED: {
    label: 'Advanced',
    color: '#EF4444',
    description: 'Solid understanding of blockchain concepts',
    timeEstimate: '60+ minutes'
  }
};

/**
 * Automatically detect content stability based on keywords and content analysis
 * @param {string} content - The markdown content to analyze
 * @param {string} filePath - The file path for additional context
 * @returns {string} The detected stability level
 */
export function detectStability(content, filePath = '') {
  const contentLower = content.toLowerCase();
  const pathLower = filePath.toLowerCase();
  
  // Check for explicit stability tags in frontmatter
  const stabilityMatch = content.match(/^---[\s\S]*?stability:\s*["']?(\w+)["']?[\s\S]*?---/);
  if (stabilityMatch) {
    const explicitStability = stabilityMatch[1].toUpperCase();
    if (stabilityTags[explicitStability]) {
      return explicitStability;
    }
  }
  
  // Score each category based on keyword matches
  const scores = {};
  
  Object.entries(classificationKeywords).forEach(([category, keywords]) => {
    scores[category] = 0;
    keywords.forEach(keyword => {
      const keywordCount = (contentLower.match(new RegExp(keyword, 'g')) || []).length;
      const pathCount = (pathLower.match(new RegExp(keyword, 'g')) || []).length;
      scores[category] += keywordCount + (pathCount * 2); // Weight path matches higher
    });
  });
  
  // Special rules for specific paths
  if (pathLower.includes('/archive/')) {
    scores.LEGACY += 10;
  }
  if (pathLower.includes('/getting-started/')) {
    scores.STABLE += 5;
  }
  if (pathLower.includes('/ao/') || pathLower.includes('/hyperbeam/')) {
    scores.CUTTING_EDGE += 5;
  }
  
  // Find the highest scoring category
  const maxScore = Math.max(...Object.values(scores));
  const detectedCategory = Object.keys(scores).find(key => scores[key] === maxScore);
  
  // Default to STABLE if no clear winner or very low scores
  return maxScore > 0 ? detectedCategory : 'STABLE';
}

/**
 * Detect content difficulty based on technical complexity indicators
 * @param {string} content - The markdown content to analyze
 * @returns {string} The detected difficulty level
 */
export function detectDifficulty(content) {
  const contentLower = content.toLowerCase();
  
  // Check for explicit difficulty tags in frontmatter
  const difficultyMatch = content.match(/^---[\s\S]*?difficulty:\s*["']?(\w+)["']?[\s\S]*?---/);
  if (difficultyMatch) {
    const explicitDifficulty = difficultyMatch[1].toUpperCase();
    if (difficultyLevels[explicitDifficulty]) {
      return explicitDifficulty;
    }
  }
  
  let complexityScore = 0;
  
  // Indicators of advanced content
  const advancedIndicators = [
    'cryptographic', 'consensus', 'merkle tree', 'smart contract',
    'protocol', 'consensus mechanism', 'validator', 'mining',
    'custom implementation', 'advanced configuration'
  ];
  
  // Indicators of intermediate content  
  const intermediateIndicators = [
    'api', 'sdk', 'integration', 'deployment', 'configuration',
    'database', 'server', 'authentication', 'middleware'
  ];
  
  // Count advanced indicators
  advancedIndicators.forEach(indicator => {
    if (contentLower.includes(indicator)) {
      complexityScore += 2;
    }
  });
  
  // Count intermediate indicators
  intermediateIndicators.forEach(indicator => {
    if (contentLower.includes(indicator)) {
      complexityScore += 1;
    }
  });
  
  // Analyze code block complexity
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  if (codeBlocks.length > 3) complexityScore += 1;
  if (codeBlocks.length > 6) complexityScore += 1;
  
  // Determine difficulty level
  if (complexityScore >= 5) return 'ADVANCED';
  if (complexityScore >= 2) return 'INTERMEDIATE';
  return 'BEGINNER';
}

/**
 * Extract time estimate from content
 * @param {string} content - The markdown content to analyze
 * @returns {string} The estimated time to complete
 */
export function extractTimeEstimate(content) {
  // Look for explicit time estimates in various formats
  const timePatterns = [
    /time[:\s]*(\d+[-–]\d+\s*(?:min|minutes|hour|hours))/i,
    /(\d+\s*(?:min|minutes|hour|hours))\s*to\s*complete/i,
    /estimated[:\s]*(\d+[-–]\d+\s*(?:min|minutes|hour|hours))/i,
    /duration[:\s]*(\d+[-–]\d+\s*(?:min|minutes|hour|hours))/i
  ];
  
  for (const pattern of timePatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  // Fallback to difficulty-based estimates
  const difficulty = detectDifficulty(content);
  return difficultyLevels[difficulty]?.timeEstimate || '30-45 minutes';
}

/**
 * Generate comprehensive metadata for content
 * @param {string} content - The markdown content to analyze
 * @param {string} filePath - The file path for additional context
 * @returns {object} Complete metadata object
 */
export function generateContentMetadata(content, filePath = '') {
  const stability = detectStability(content, filePath);
  const difficulty = detectDifficulty(content);
  const timeEstimate = extractTimeEstimate(content);
  
  return {
    stability: {
      level: stability,
      config: stabilityTags[stability]
    },
    difficulty: {
      level: difficulty,
      config: difficultyLevels[difficulty]
    },
    timeEstimate,
    lastUpdated: new Date().toISOString(),
    filePath
  };
}

export default {
  stabilityTags,
  difficultyLevels,
  detectStability,
  detectDifficulty,
  extractTimeEstimate,
  generateContentMetadata
};