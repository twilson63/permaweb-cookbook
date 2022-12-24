const { description } = require('../../package')
import { defaultTheme } from '@vuepress/theme-default'

module.exports = {

  base: "/",
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

  theme: defaultTheme({
    navbar: [
      { text: 'GitHub', link: 'https://github.com/twilson63/permaweb-cookbook' },
      {
        text: 'Starter Kits',
        link: '/kits/'
      }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
        collapsible: true,
        children: [{
          text: 'Contributing',
          link: '/getting-started/contributing'
        }]
      },
      {
        text: 'Core Concepts',
        link: '/concepts/',
        collapsible: true,
        children: [
          {
            text: 'Path Manifests',
            link: '/concepts/manifests'
          },
          {
            text: `Posting Transactions`,
            link: `/concepts/postTransaction`
          },
          {
            text: 'SmartWeave',
            link: '/concepts/smartweave',
            collapsible: true,
            children: [
              {
                text: 'Arweave Name System (ArNS)',
                link: '/concepts/arns'
              },
            ]
          },
          {
            text: 'Transaction Tags',
            link: '/concepts/tags'
          }
        ]
      },
      {
        text: 'Guides',
        link: '/guides/',
        collapsible: true,
        children: [
          {
            text: `Posting Transactions`,
            collapsible: false,
            children: [
              {
                text: 'arweave-js',
                link: '/guides/posting-transactions/arweave-js'
              },
              {
                text: 'bundlr.network',
                link: '/guides/posting-transactions/bundlr'
              },
              {
                text: 'dispatch',
                link: '/guides/posting-transactions/dispatch'
              },
            ]
          },
        ]

      },
      {
        text: 'References',
        link: '/references/',
        collapsible: true,
      },
      {
        text: 'Starter Kits',
        link: '/kits/',
        collapsible: true,
      }
    ]
  }),

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
