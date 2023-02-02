const { description } = require('../../package')
import { defaultTheme } from '@vuepress/theme-default'
import { containerPlugin } from '@vuepress/plugin-container'

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
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap' }]
  ],
  markdown: {
    code: {
      lineNumbers: false
    }
  },

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
          text: 'Welcome',
          link: '/getting-started/welcome'
        }, {
          text: 'Hello World (No Code)',
          link: '/getting-started/quick-starts/hw-no-code'
        }, {
          text: 'Hello World (CLI)',
          link: '/getting-started/quick-starts/hw-cli'
        }, {
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
            text: 'Atomic Tokens',
            link: '/concepts/atomic-tokens'
          },
          {
            text: 'Path Manifests',
            link: '/concepts/manifests'
          },
          {
            text: 'Permaweb',
            link: '/concepts/permaweb'
          },
          {
            text: 'Permaweb Applications',
            link: '/concepts/permawebApplications'
          },
          {
            text: `Posting Transactions`,
            link: `/concepts/post-transactions`,
            collapsible: true,
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
              }
            ]
          },
          {
            text: `Querying Transactions`,
            link: `/concepts/queryTransactions`
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
              {
                text: 'Atomic Assets',
                link: '/concepts/atomic-assets.md'
              },
              {
                text: 'Profit Sharing Tokens (PSTs)',
                link: '/concepts/psts'
              }
            ]
          },
          {
            text: 'Transaction Tags',
            link: '/concepts/tags'
          },
          {
            text: 'Vouch',
            link: '/concepts/vouch'
          }
        ]
      },
      {
        text: 'Guides',
        link: '/guides/',
        collapsible: true,
        children: [
          {
            text: 'ArProfile',
            link: '/guides/arprofile'
          },
          {
            text: 'Atomic Tokens',
            link: '/guides/atomic-tokens/intro'
          },
          {
            text: `App Deployment`,
            collapsible: true,
            children: [
              {
                text: 'arkb',
                link: '/guides/deployment/arkb'
              },
              {
                text: 'Bundlr',
                link: '/guides/deployment/bundlr-cli'
              },
              {
                text: 'Github Action',
                link: '/guides/deployment/github-action'
              }
            ]
          },
          {
            text: 'Deploying PSTs',
            collapsible: false,
            link: '/guides/deploying-psts'
          },
          {
            text: 'DNS Integration',
            collapsible: true,
            children: [{
              text: 'Server Side',
              link: '/guides/dns-integration/server-side'
            }]
          },
          {
            text: 'HTTP API',
            collapsible: false,
            link: '/guides/http-api'
          },
          {
            text: `Posting Transactions`,
            link: `/guides/posting-transactions`
          },
          {
            text: `Deploying Path Manifests`,
            link: "/guides/deploying-manifests/deployingManifests",
            collapsible: true,
            children: [
              {
                text: 'arweave.app',
                link: '/guides/deploying-manifests/arweave-app'
              },
              {
                text: 'ardrive',
                link: '/guides/deploying-manifests/ardrive'
              },
              {
                text: 'bundlr.network',
                link: '/guides/deploying-manifests/bundlr'
              },
            ]
          },
          {
            text: "Querying Arweave",
            link: "/guides/querying-arweave/queryingArweave",
            collapsible: true,
            children: [
              {
                text: "ArDB",
                link: "/guides/querying-arweave/ardb"
              },
              {
                text: "ar-gql",
                link: "/guides/querying-arweave/ar-gql"
              }
            ]
          },
          {
            text: 'SmartWeave',
            collapsible: true,
            children: [
              {
                text: 'warp',
                collapsible: false,
                children: [{
                  text: 'Intro',
                  link: '/guides/smartweave/warp/intro.md'
                }, {
                  text: 'Deploying Contracts',
                  link: '/guides/smartweave/warp/deploying-contracts.md'
                }, {
                  text: 'ReadState',
                  link: '/guides/smartweave/warp/readstate.md'
                }, {
                  text: 'WriteInteractions',
                  link: '/guides/smartweave/warp/write-interactions.md'
                }, {
                  text: 'Evolve',
                  link: '/guides/smartweave/warp/evolve.md'
                }]
              }
            ]
          },
          {
            text: `Testing`,
            collapsible: true,
            children: [
              {
                text: 'arlocal',
                collapsible: false,
                link: '/guides/testing/arlocal'
              }
            ]
          },
          {
            text: 'Vouch',
            collapsible: false,
            link: '/guides/vouch'
          }
        ]

      },
      {
        text: 'References',
        link: '/references/',
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            collapsible: false,
            link: "/references/gql",
          }
        ]
      },
      {
        text: 'Starter Kits',
        link: '/kits/',
        collapsible: true,
        children: [
          {
            text: 'React',
            link: '/kits/react/'
          },
          {
            text: 'Svelte',
            link: '/kits/svelte/'
          }

        ]
      }
    ]
  }),

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    containerPlugin({
      type: 'info'
    })
  ]
}
