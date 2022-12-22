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
        children: [{
          text: 'Contributing',
          link: '/getting-started/contributing'
        }]
      },
      {
        text: 'Core Concepts',
        link: '/concepts/',
        children: [{
          text: 'ArNS - Arweave Name System',
          link: '/concepts/arns'
        },
        {
          text: 'SmartWeave',
          link: '/concepts/smartweave'
        },
        {
          text: 'Tags',
          link: '/concepts/tags'
        },
        
      ]
      },
      {
        text: 'Guides',
        link: '/guides/'
      },
      {
        text: 'References',
        link: '/references/'
      },
      {
        text: 'Starter Kits',
        link: '/kits/'
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
