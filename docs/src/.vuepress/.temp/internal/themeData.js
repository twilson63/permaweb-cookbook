export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"GitHub\",\"link\":\"https://github.com/twilson63/permaweb-cookbook\"},{\"text\":\"Starter Kits\",\"link\":\"/kits/\"}],\"sidebar\":[{\"text\":\"Getting Started\",\"link\":\"/getting-started/\",\"children\":[{\"text\":\"Contributing\",\"link\":\"/getting-started/contributing\"}]},{\"text\":\"Core Concepts\",\"link\":\"/concepts/\",\"children\":[{\"text\":\"ArNS - Arweave Name System\",\"link\":\"/concepts/arns\"},{\"text\":\"SmartWeave\",\"link\":\"/concepts/smartweave\"},{\"text\":\"Tags\",\"link\":\"/concepts/tags\"}]},{\"text\":\"Guides\",\"link\":\"/guides/\"},{\"text\":\"References\",\"link\":\"/references/\"},{\"text\":\"Starter Kits\",\"link\":\"/kits/\"}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
