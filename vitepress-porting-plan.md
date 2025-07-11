# VitePress Porting Plan

## Overview
This document outlines the files that need to be updated to complete the migration from VuePress to VitePress.

## ✅ Completed Files
- `docs/package.json` - Updated dependencies and scripts
- `docs/src/.vitepress/config.ts` - Main VitePress configuration
- `docs/src/.vitepress/sidebar.ts` - Sidebar configuration (TypeScript)
- `docs/src/.vitepress/theme/index.ts` - Theme configuration
- `docs/src/.vitepress/components/Navbar.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/Sidebar.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/Page.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/Onboarding.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/DocSelector.vue` - Confirmed VitePress compatible
- `docs/src/.vitepress/components/ToggleSidebarButton.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/ToggleLanguageButton.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/I18NRouterLink.vue` - Confirmed VitePress compatible

## 🔄 Remaining Files to Port

### High Priority - Core Components
✅ **All high priority components completed!**

### Medium Priority - Supporting Components
✅ **All medium priority components completed!**
- `docs/src/.vitepress/components/Topbar.vue` - Updated for VitePress compatibility
- `docs/src/.vitepress/components/PageMeta.vue` - Updated for VitePress compatibility  
- `docs/src/.vitepress/components/FeaturedContributors.vue` - Updated for VitePress compatibility

### Low Priority - Utility Components
✅ **All low priority components completed!**
- `docs/src/.vitepress/composables/useI18N.js` - Updated for VitePress compatibility
- `docs/src/.vitepress/theme/styles/vars.css` - Created CSS variables for VitePress theme
- `docs/src/.vitepress/theme/styles/custom.css` - Created custom styles for VitePress theme

### Configuration Files
✅ **All configuration files completed!**
- `docs/src/.vitepress/config.ts` - Main VitePress configuration (already completed)
- `docs/src/.vitepress/theme/styles/vars.css` - CSS variables (already completed)
- `docs/src/.vitepress/theme/styles/custom.css` - Custom styles (already completed)
- `docs/deploy.mjs` - Updated deployment script for VitePress dist directory

### Public Assets
✅ **Public assets are already in place!**
- `docs/src/.vitepress/public/` - Static assets (images, icons, etc.) are already in the correct location

### Documentation Files
✅ **All documentation files completed!**
- ✅ **Updated key files** - Removed VuePress-specific frontmatter (prev:, next:, sidebar:)
- ✅ **Updated container blocks** - Converted VuePress containers to VitePress format
- ✅ **Updated package.json examples** - Changed VuePress to VitePress in code examples
- ✅ **Updated language versions** - Applied same changes to all es/, zh/, id/ files
- ✅ **Updated Vue references** - Changed VuePress to VitePress in using-vue.md files
- ✅ **Fixed malformed containers** - Removed commented-out and malformed container blocks

## 🗑️ Files to Remove (VuePress-specific)
- `docs/src/.vuepress/` - Entire VuePress directory
- `docs/src/.vuepress/config.js` - Old VuePress config
- `docs/src/.vuepress/sidebar.js` - Old sidebar config
- `docs/src/.vuepress/client.js` - Old client config
- `docs/src/.vuepress/layouts/Layout.vue` - Old layout

## 🔧 Additional Tasks
✅ **Test the build process** - VitePress dev server is running successfully at http://localhost:5173
✅ **Update deployment script** - Modified `deploy.mjs` for VitePress dist directory
🔄 **Test internationalization** - Need to test language switching functionality
🔄 **Test search functionality** - VitePress has different search implementation
🔄 **Test responsive design** - Need to test mobile/tablet layouts
✅ **Update any hardcoded VuePress paths** - Replaced with VitePress equivalents
✅ **Fix missing dependencies** - Added sass-embedded for SCSS processing
✅ **Fix router imports** - Updated vue-router imports to use VitePress router

## 📝 Notes
- VitePress uses TypeScript by default, so `.js` files should be converted to `.ts`
- VitePress has different plugin system than VuePress
- Some VuePress-specific features may need alternative implementations
- The theme system is different in VitePress

## 🚀 Next Steps
1. Start with high priority components
2. Test each component after updating
3. Move to medium priority components
4. Finally address low priority items
5. Test the entire site before removing old VuePress files 