import { defineClientConfig } from "@vuepress/client";

import Layout from "./layouts/Layout.vue";
import CollapsibleCode from "./components/CollapsibleCode.vue";

export default defineClientConfig({
  enhance({ app, router, siteData, languages }) {
    app.component("CollapsibleCode", CollapsibleCode);
  },
  setup() {},
  layouts: { Layout },
  rootComponents: [],
});
