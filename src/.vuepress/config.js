import { viteBundler } from "@vuepress/bundler-vite";

import { defaultTheme } from "@vuepress/theme-default";
import { containerPlugin } from "@vuepress/plugin-container";
import { searchPlugin } from "@vuepress/plugin-search";
import codeCopyPlugin from "@snippetors/vuepress-plugin-code-copy";
// Using array syntax for VuePress 1 compatibility plugins

import { languages, get_i18n_str } from "../../languages/def";

// construct vue press locales object from languages def
const locales = languages.reduce((acc, lang) => {
  acc[lang.path] = {
    lang: lang.code,
    title: get_i18n_str(lang.code, "page-title", "Cooking with the Permaweb"),
    description: get_i18n_str(
      lang.code,
      "page-description",
      "A collection of little developer guides to build on the permaweb"
    ),
  };
  return acc;
}, {});

// construct vue press theme locales object from languages def
const themeLocales = languages.reduce((acc, lang) => {
  acc[lang.path] = {
    sidebar: lang.sidebar,
    home: lang.path,
    notFound: [get_i18n_str(lang.code, "not-found", "Not Found")],
    backToHome: get_i18n_str(lang.code, "back-to-home", "Back to Home"),
  };
  return acc;
}, {});

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

  locales,

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
    locales: themeLocales,
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
  },

  async onInitialized(app) {
    app.pages
      .filter((page) => page.path.slice(-1) === "/" && page.path !== "/")
      .forEach((page) => (page.path += "index.html"));
  },
};
