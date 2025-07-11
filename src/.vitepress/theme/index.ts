import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import './styles/vars.css'
import './styles/custom.scss'

// Import custom components
import Topbar from '../components/Topbar.vue'
import Navbar from '../components/Navbar.vue'
import Page from '../components/Page.vue'
import Sidebar from '../components/Sidebar.vue'
import Onboarding from '../components/Onboarding.vue'
import DocSelector from '../components/DocSelector.vue'

export default {
  ...DefaultTheme,
  Layout: () => {
    const route = useRoute()
    const isHome = route.path === '/' || route.data?.frontmatter?.layout === 'home'
    
    // For home page, use default VitePress home layout without custom components
    if (isHome) {
      return h(DefaultTheme.Layout)
    }
    
    // For other pages, use custom components
    return h(DefaultTheme.Layout, null, {
      'navbar': () => h(Navbar),
      'sidebar-top': () => h(Sidebar),
      'page-content-top': () => h(Page),
      'page-content-bottom': () => h(Onboarding),
      'page-bottom': () => h(DocSelector)
    })
  },
  enhanceApp({ app }) {
    // Register global components
    app.component('Topbar', Topbar)
    app.component('Navbar', Navbar)
    app.component('Page', Page)
    app.component('Sidebar', Sidebar)
    app.component('Onboarding', Onboarding)
    app.component('DocSelector', DocSelector)
  }
} 