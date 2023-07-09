import { defineClientConfig } from "@vuepress/client";

import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  enhance({ app, router, siteData, languages }) {},
  setup() {},
  layouts: { Layout },
  rootComponents: [],
});
