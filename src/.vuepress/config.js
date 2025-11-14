import { description } from "../../package";
import { viteBundler } from "@vuepress/bundler-vite";

import { defaultTheme } from "@vuepress/theme-default";
import { containerPlugin } from "@vuepress/plugin-container";
import { searchPlugin } from "@vuepress/plugin-search";
import codeCopyPlugin from "@snippetors/vuepress-plugin-code-copy";
// Using array syntax for VuePress 1 compatibility plugins

import { languages, get_i18n_str } from "../../languages/def";
import enStrings from "../../languages/strings/en.json";
import {
  enSidebar,
  jaSidebar,
  zhSidebar,
  esSidebar,
  idSidebar,
} from "../../languages/sidebars";

export default {
  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            quietDeps: true,
            silenceDeprecations: [
              "legacy-js-api",
              "import",
              "global-builtin",
              "color-functions",
              "mixed-decls",
            ],
          },
        },
      },
      build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes("node_modules")) {
                if (id.includes("bootstrap")) {
                  return "bootstrap";
                }
                if (id.includes("mermaid")) {
                  return "mermaid";
                }
                return "vendor";
              }
            },
          },
        },
      },
    },
  }),

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en", // this will be set as the lang attribute on <html>
      title: "Cooking with the Permaweb",
      description: description,
    },
    "/ja/": {
      lang: "ja",
      title: "Cocinando con la Permaweb",
      description: description,
    },
    "/zh/": {
      lang: "zh",
      title: "在 Permaweb 上烹饪",
      description: description,
    },
    "/es/": {
      lang: "es",
      title: "Cocinando con la Permaweb",
      description: description,
    },
    "/id/": {
      lang: "id",
      title: "Memasak dengan Permaweb",
      description: description,
    },
  },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/ico",
        sizes: "16x16",
        href: "/Permaweb_Cookbook.ico",
      },
    ],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap",
      },
    ],
    [
      "script",
      {
        defer: true,
        src: "https://ackee-l09o.onrender.com/tracker.js",
        "data-ackee-server": "https://ackee-l09o.onrender.com",
        async: true,
        "data-ackee-domain-id": "a6bf4de4-a529-452d-a611-6296c8af1b58",
      },
    ],
  ],

  markdown: {
    extractHeaders: {
      level: [2, 3, 4, 5, 6],
    },
  },

  theme: defaultTheme({
    repo: "https://github.com/twilson63/permaweb-cookbook",
    editLink: true,
    editLinkPattern: ":repo/edit/:branch/src/:path",
    colorMode: "dark",
    sidebarDepth: 0,
    backToTop: false,
    locales: {
      "/": {
        sidebar: enSidebar,
        notFound: [get_i18n_str("en", "not-found", "Not Found")],
        backToHome: get_i18n_str("en", "back-to-home", "Back to Home"),
      },
      "/ja/": {
        sidebar: jaSidebar,
        notFound: [get_i18n_str("ja", "not-found", "Not Found")],
        backToHome: get_i18n_str("ja", "back-to-home", "Back to Home"),
      },
      "/zh/": {
        sidebar: zhSidebar,
        notFound: [get_i18n_str("zh", "not-found", "Not Found")],
        backToHome: get_i18n_str("zh", "back-to-home", "Back to Home"),
      },
      "/es/": {
        sidebar: esSidebar,
        notFound: [get_i18n_str("es", "not-found", "Not Found")],
        backToHome: get_i18n_str("es", "back-to-home", "Back to Home"),
      },
      "/id/": {
        sidebar: idSidebar,
        notFound: [get_i18n_str("id", "not-found", "Not Found")],
        backToHome: get_i18n_str("id", "back-to-home", "Back to Home"),
      },
    },
  }),

  /**
   * Apply plugins
   */
  plugins: [
    containerPlugin({
      type: "info",
    }),
    containerPlugin({
      type: "collapsible-code",
      before: (info) =>
        `<CollapsibleCode title="${
          info || "Click to expand"
        }" class="custom-container-collapsible-code">`,
      after: () => "</CollapsibleCode>",
    }),
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search",
        },
      },
    }),
    codeCopyPlugin({}),
    ["md-enhance", {}],
  ],

  // passing languages def to client side
  define: {
    __LANGUAGES__: languages,
    __ENSTRS__: enStrings,
  },

  async onInitialized(app) {
    app.pages
      .filter((page) => page.path.slice(-1) === "/" && page.path !== "/")
      .forEach((page) => (page.path += "index.html"));
  },
};
