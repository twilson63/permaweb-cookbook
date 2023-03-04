import { getDirname, path } from '@vuepress/utils'
import { defineClientConfig } from '@vuepress/client'

// import Layout from './layouts/Layout.vue';

// const __dirname = getDirname(import.meta.url)

export default defineClientConfig({
  // layouts: { Layout },
  // alias: {
  //   '@theme/Navbar.vue': path.resolve(__dirname, './components/Navbar.vue'),
  //   '@theme/Page.vue': path.resolve(__dirname, './components/Page.vue'),
  //   '@theme/Sidebar.vue': path.resolve(__dirname, './components/Sidebar.vue'),
  //   '@theme/Onboarding.vue': path.resolve(__dirname, './components/Onboarding.vue'),
  //   '@theme/ToggleSidebarButton.vue': path.resolve(__dirname, './components/ToggleSidebarButton.vue'),
  // },
})