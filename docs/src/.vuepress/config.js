const { description } = require('../../package')

module.exports = {
  base: "",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Cooking with the Permaweb',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#663399' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Contribute',
        link: 'https://github.com/twilson63/permaweb-cookbook'
      },
      {
        text: 'Starters',
        link: '/kits/'
      }
    ],
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          children: ['/', '/getting-started/installation.md']
        },
        {
          text: 'Core Concepts',
          children: ['/concepts/README.md', '/concepts/tags.md']
        },
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],

    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
