import { description } from "../../package";

import { defaultTheme } from "@vuepress/theme-default";
import { containerPlugin } from "@vuepress/plugin-container";
import { mediumZoomPlugin } from "@vuepress/plugin-medium-zoom";
import { searchPlugin } from "@vuepress/plugin-search";

import createSidebars from "./sidebar";
import { languages } from "../../languages/def";
import enStrings from "../../languages/strings/en.json";

export default {
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en", // this will be set as the lang attribute on <html>
      title: "Cooking with the Permaweb",
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
    code: {
      lineNumbers: false,
    },
  },

  theme: defaultTheme({
    repo: "https://github.com/twilson63/permaweb-cookbook",
    editLink: true,
    editLinkPattern: ":repo/edit/:branch/docs/src/:path",
    // layouts: {
    //   "/": "./layouts/DefaultLayout.vue",
    //   "/es/": "./layouts/LayoutES.vue",
    // },
    colorMode: "dark",
    sidebar: createSidebars(),
  }),

  /**
   * Apply plugins
   */
  plugins: [
    mediumZoomPlugin({
      selector: ":not(.not-zoomable)",
    }),
    containerPlugin({
      type: "info",
    }),
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search",
        },
      },
    }),
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
