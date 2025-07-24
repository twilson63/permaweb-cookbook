/**
 * StabilityBadge Component
 * 
 * A visual indicator for content stability levels that helps users
 * understand the maturity and reliability of documentation content.
 */

import React from 'react';
import { stabilityTags, difficultyLevels } from '../utils/contentMetadata.js';

/**
 * Badge component for displaying content stability
 * @param {Object} props - Component props
 * @param {string} props.stability - Stability level (EVERGREEN, STABLE, CUTTING_EDGE, LEGACY)
 * @param {string} props.size - Badge size (small, medium, large)
 * @param {boolean} props.showTooltip - Whether to show detailed tooltip on hover
 * @param {string} props.className - Additional CSS classes
 */
export function StabilityBadge({ 
  stability = 'STABLE', 
  size = 'medium',
  showTooltip = true,
  className = '' 
}) {
  const config = stabilityTags[stability.toUpperCase()];
  
  if (!config) {
    console.warn(`Unknown stability level: ${stability}`);
    return null;
  }

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm', 
    large: 'px-4 py-2 text-base'
  };

  const badgeStyle = {
    backgroundColor: config.bgColor,
    color: config.textColor,
    borderLeft: `4px solid ${config.color}`
  };

  return (
    <span 
      className={`
        inline-flex items-center gap-1 rounded-md font-medium border-l-4
        transition-all duration-200 hover:shadow-sm
        ${sizeClasses[size]} 
        ${className}
      `}
      style={badgeStyle}
      title={showTooltip ? config.description : ''}
    >
      <span className="stability-indicator" style={{ backgroundColor: config.color }}>
        ●
      </span>
      {config.label}
    </span>
  );
}

/**
 * Badge component for displaying content difficulty
 * @param {Object} props - Component props
 * @param {string} props.difficulty - Difficulty level (BEGINNER, INTERMEDIATE, ADVANCED)
 * @param {string} props.size - Badge size (small, medium, large)
 * @param {boolean} props.showTimeEstimate - Whether to show time estimate
 * @param {string} props.timeEstimate - Custom time estimate
 */
export function DifficultyBadge({ 
  difficulty = 'BEGINNER',
  size = 'medium',
  showTimeEstimate = false,
  timeEstimate = '',
  className = ''
}) {
  const config = difficultyLevels[difficulty.toUpperCase()];
  
  if (!config) {
    console.warn(`Unknown difficulty level: ${difficulty}`);
    return null;
  }

  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base'
  };

  const displayTime = timeEstimate || config.timeEstimate;

  return (
    <span 
      className={`
        inline-flex items-center gap-1 rounded-md font-medium
        transition-all duration-200 hover:shadow-sm
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        backgroundColor: `${config.color}15`, // 15% opacity
        color: config.color,
        border: `1px solid ${config.color}40` // 40% opacity
      }}
      title={config.description}
    >
      <span className="difficulty-icon">
        {difficulty === 'BEGINNER' && '⭐'}
        {difficulty === 'INTERMEDIATE' && '⭐⭐'}
        {difficulty === 'ADVANCED' && '⭐⭐⭐'}
      </span>
      {config.label}
      {showTimeEstimate && (
        <span className="text-opacity-75 ml-1">
          ({displayTime})
        </span>
      )}
    </span>
  );
}

/**
 * Combined metadata display component
 * @param {Object} props - Component props
 * @param {string} props.stability - Stability level
 * @param {string} props.difficulty - Difficulty level  
 * @param {string} props.timeEstimate - Time to complete
 * @param {string} props.layout - Layout style (horizontal, vertical, compact)
 */
export function ContentMetadataBadges({
  stability,
  difficulty,
  timeEstimate,
  layout = 'horizontal',
  className = ''
}) {
  const layoutClasses = {
    horizontal: 'flex flex-wrap items-center gap-2',
    vertical: 'flex flex-col items-start gap-2',
    compact: 'flex items-center gap-1'
  };

  return (
    <div className={`content-metadata ${layoutClasses[layout]} ${className}`}>
      {stability && (
        <StabilityBadge 
          stability={stability} 
          size={layout === 'compact' ? 'small' : 'medium'} 
        />
      )}
      {difficulty && (
        <DifficultyBadge 
          difficulty={difficulty} 
          size={layout === 'compact' ? 'small' : 'medium'}
          showTimeEstimate={layout !== 'compact'}
          timeEstimate={timeEstimate}
        />
      )}
    </div>
  );
}

/**
 * Automated metadata badge that detects content properties
 * @param {Object} props - Component props  
 * @param {string} props.content - Markdown content to analyze
 * @param {string} props.filePath - File path for context
 * @param {Object} props.frontmatter - Parsed frontmatter data
 */
export function AutoContentBadges({
  content = '',
  filePath = '',
  frontmatter = {},
  layout = 'horizontal',
  className = ''
}) {
  // Use explicit frontmatter values if available
  const stability = frontmatter.stability || 
    (content ? detectStability(content, filePath) : 'STABLE');
  const difficulty = frontmatter.difficulty || 
    (content ? detectDifficulty(content) : 'BEGINNER');
  const timeEstimate = frontmatter.time || frontmatter.timeEstimate || 
    (content ? extractTimeEstimate(content) : '');

  return (
    <ContentMetadataBadges
      stability={stability}
      difficulty={difficulty}
      timeEstimate={timeEstimate}
      layout={layout}
      className={className}
    />
  );
}

// CSS styles for the badges (to be included in global styles)
export const badgeStyles = `
.stability-badge {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.stability-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}

.content-metadata {
  margin: 1rem 0;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.difficulty-icon {
  font-size: 0.875em;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .content-metadata {
    border-bottom-color: #374151;
  }
}

/* Print styles */
@media print {
  .content-metadata {
    border: 1px solid #000;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    margin: 0.5rem 0;
    page-break-inside: avoid;
  }
}
`;

export default StabilityBadge;