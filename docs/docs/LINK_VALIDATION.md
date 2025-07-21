# Link Validation

This project includes automated link validation to ensure all internal and external links in the documentation are working correctly.

## Available Commands

### `npm run check:links`
Comprehensive validation of all markdown files including:
- **External link validation** using HTTP requests
- **Internal link validation** checking file paths exist
- **Archive link warnings** for links to deprecated content

```bash
npm run check:links
```

### `npm run check:links:fast`
Quick validation of the first 10 markdown files (useful for development).

```bash
npm run check:links:fast
```

### `npm run check:links:internal`
Validate only internal links (skip external HTTP requests).

```bash
npm run check:links:internal
```

### `npm run fix:links`
Automatically fixes common link issues like ArFS references and image paths.

```bash
npm run fix:links
```

### `npm run fix:links:preview`
Preview what would be fixed without making changes.

```bash
npm run fix:links:preview
```

### `npm run build:check`
Builds the site and then validates all links.

```bash
npm run build:check
```

## Advanced Usage

### Custom Link Validation
```bash
# Check only specific types of issues
node scripts/check-links.js --skip-external --skip-archive

# Fast check with custom options
node scripts/check-links.js --fast --skip-external
```

### Custom Link Fixing
```bash
# Preview fixes for specific directories
node scripts/fix-common-links.js --dry-run src/concepts

# Fix only specific paths
node scripts/fix-common-links.js src/concepts src/guides
```

## How It Works

The comprehensive link validation system:

### External Link Validation
Uses `markdown-link-check` to:
- Make HTTP requests to validate external URLs
- Handle timeouts and retries for reliable checking
- Skip known problematic domains (configured in `.markdown-link-check.json`)

### Internal Link Validation  
Custom validation that:
- Checks if relative file paths actually exist on the filesystem
- Resolves relative paths correctly based on file location
- Identifies broken references after content reorganization

### Archive Link Detection
Warns about links to deprecated content:
- Detects references to SmartWeave, PSTs, or Atomic Tokens
- Suggests updating links to archive locations
- Helps maintain clean separation between current and legacy content

### Automatic Fixes
The `fix:links` command can automatically:
- Update ArFS references to correct paths
- Fix image source paths (`~@source/images/` → `../images/`)
- Update SmartWeave links to archive locations

## Configuration

The link validation system is configured through two main files:

### `link-validation.config.js`
Main configuration for validation behavior:
- **Search paths**: Directories to scan for markdown files
- **Archive patterns**: Rules for detecting deprecated content
- **Link fixes**: Automatic replacement patterns
- **Validation rules**: Which checks to enable/disable
- **Suggestions**: Custom messages for different issue types

### `.markdown-link-check.json`
External link validation configuration:
- **Ignored patterns**: Known problematic URLs that should be skipped
- **Timeouts**: How long to wait for external URLs
- **Retry logic**: Handling of temporary failures
- **HTTP headers**: Custom headers for specific domains

## Common Issues and Solutions

### Internal Links
- Use relative paths: `../concepts/smartweave.md`
- Check file extensions: `.md` for source, `.html` for built site
- Verify directory structure after reorganization

### External Links
- Some external services may be temporarily down
- Rate limiting can cause false positives
- Add problematic domains to `ignorePatterns` if necessary

### Archive Links
After moving content to the archive, update internal references:
- Old: `../concepts/smartweave.md`
- New: `../archive/concepts/smartweave.md`

## Integration with CI/CD

The `deploy` script now includes link validation:

```bash
npm run deploy  # Builds, validates links, then deploys
```

This ensures broken links are caught before deployment.

## Troubleshooting

### High Error Rates
If many external links are failing:
1. Check your internet connection
2. Some sites may block automated requests
3. Consider adding User-Agent headers in configuration

### False Positives
If valid links are marked as broken:
1. Check if the site requires specific headers
2. Add the domain to `ignorePatterns` if necessary
3. Verify the URL is accessible manually

### Performance
For large documentation sets:
- Use `check:links:fast` during development
- Run full validation before commits
- Consider parallel processing for faster checks

## Best Practices

1. **Run link validation regularly** during development
2. **Fix broken internal links immediately** - they indicate structural issues
3. **Monitor external links** - they may break over time
4. **Update archive references** when moving content
5. **Test after major reorganizations** like the sidebar restructure

## Example Output

```
🔍 Starting link validation...

Found 156 markdown files to check

Checking: src/getting-started/welcome.md
✅ All links valid

Checking: src/concepts/smartweave.md
⚠️  Archive Link Warnings:
  - "SmartWeave Guide" → ../guides/smartweave/intro.md
    Consider updating to point to archive or remove if no longer relevant

❌ Broken Internal Links:
  - "ArFS Documentation" → ../concepts/arfs.md
    File does not exist at this path
    Resolved to: /path/to/concepts/arfs.md

📊 Link Validation Summary
==================================================
Total files checked: 156
Files with external link errors: 0
Files with broken internal links: 1
Files with archive link warnings: 1
Total external link errors: 0
Total broken internal links: 1
Total archive warnings: 1

💥 Files with broken internal links:
  - src/concepts/smartweave.md

⚠️  Files with archive link warnings:
  - src/concepts/smartweave.md

💡 Tips:
  - Internal link errors MUST be fixed - they indicate structural issues
  - Run "npm run fix:links" to automatically fix common issues
  - Update archive references after content reorganization
```