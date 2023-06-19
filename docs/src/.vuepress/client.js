import { defineClientConfig } from "@vuepress/client";

import Layout from "./layouts/Layout.vue";
import LayoutES from "./layouts/LayoutES.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  layouts: { Layout, LayoutES },
  rootComponents: [],
});
