import { defineClientConfig } from '@vuepress/client'

import CookbookLayout from './layouts/Layout.vue';

export default defineClientConfig({
  /** Add client side changes here */
  enhance({ app, router, siteData }) {
  },
  setup(){},
  layouts: {
    Layout: CookbookLayout
  },
  rootComponents: [],
})