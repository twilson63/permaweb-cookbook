import { description } from '../../package';

import { defaultTheme } from '@vuepress/theme-default';
import { containerPlugin } from '@vuepress/plugin-container';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';

export default {
  base: '/',
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
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: 'http://arweave.net/DCn3QJ7zzqsFNiqMj7XdQZKyZz73NaXybf_V4wlpMTI'
      }
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap'
      }
    ],
    [
      'script',
      {
        defer: true,
        src: 'https://ackee-l09o.onrender.com/tracker.js',
        'data-ackee-server': 'https://ackee-l09o.onrender.com',
        async: true,
        'data-ackee-domain-id': 'a6bf4de4-a529-452d-a611-6296c8af1b58'
      }
    ]
  ],

  markdown: {
    code: {
      lineNumbers: false
    }
  },

  theme: defaultTheme({
    sidebar: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
        collapsible: true,
        children: [
          {
            text: 'Welcome',
            link: '/getting-started/welcome'
          },
          {
            text: 'Hello World (No Code)',
            link: '/getting-started/quick-starts/hw-no-code'
          },
          {
            text: 'Hello World (CLI)',
            link: '/getting-started/quick-starts/hw-cli'
          },
          {
            text: 'Hello World (With Code)',
            link: '/getting-started/quick-starts/hw-code'
          },
          {
            text: 'Contributing',
            link: '/getting-started/contributing'
          }
        ]
      },
      {
        text: 'Core Concepts',
        link: '/concepts/',
        collapsible: true,
        children: [
          {
            text: 'Bundles and Bundling',
            link: '/concepts/bundles'
          },
          {
            text: 'Gateways',
            link: '/concepts/gateways'
          },
          {
            text: 'Keyfiles and Wallets',
            link: '/concepts/keyfiles-and-wallets'
          },
          {
            text: 'Path Manifests',
            link: '/concepts/manifests'
          },
          {
            text: 'Permaweb',
            link: '/concepts/permaweb',
            collapsible: true,
            children: [
              {
                text: 'Permaweb Applications',
                link: '/concepts/permawebApplications'
              }
            ]
          },
          {
            text: 'SmartWeave',
            link: '/concepts/smartweave',
            collapsible: false,
            children: [
              {
                text: 'Arweave Name System (ArNS)',
                link: '/concepts/arns'
              },
              {
                text: 'Atomic Tokens',
                link: '/concepts/atomic-tokens.md'
              },
              {
                text: 'Profit Sharing Tokens (PSTs)',
                link: '/concepts/psts'
              },
              {
                text: 'Vouch',
                link: '/concepts/vouch'
              }
            ]
          },
          {
            text: `Transaction Data`,
            link: `/guides/http-api.md`
          },
          {
            text: `Transaction Posting`,
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
            text: `Transaction Querying`,
            link: `/concepts/queryTransactions`
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
            text: 'ArProfile',
            link: '/guides/arprofile'
          },
          {
            text: 'DNS Integration',
            collapsible: true,
            children: [
              {
                text: 'Server Side',
                link: '/guides/dns-integration/server-side'
              },
              {
                text: 'Spheron',
                link: '/guides/dns-integration/spheron'
              }
            ]
          },
          {
            text: `Deploying Apps`,
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
            text: `Deploying PathManifests`,
            link: '/guides/deploying-manifests/deployingManifests',
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
              }
            ]
          },
          {
            text: 'Deploying PSTs',
            collapsible: false,
            link: '/guides/deploying-psts'
          },
          {
            text: 'GraphQL',
            link: '/guides/querying-arweave/queryingArweave',
            collapsible: true,
            children: [
              {
                text: 'ArDB',
                link: '/guides/querying-arweave/ardb'
              },
              {
                text: 'ar-gql',
                link: '/guides/querying-arweave/ar-gql'
              }
            ]
          },
          {
            text: 'SmartWeave',
            collapsible: true,
            children: [
              {
                text: 'Atomic Tokens',
                link: '/guides/atomic-tokens/intro'
              },
              {
                text: 'Vouch',
                link: '/guides/vouch'
              },
              {
                text: 'Warp',
                collapsible: false,
                children: [
                  {
                    text: 'Intro',
                    link: '/guides/smartweave/warp/intro.md'
                  },
                  {
                    text: 'Deploying Contracts',
                    link: '/guides/smartweave/warp/deploying-contracts.md'
                  },
                  {
                    text: 'ReadState',
                    link: '/guides/smartweave/warp/readstate.md'
                  },
                  {
                    text: 'WriteInteractions',
                    link: '/guides/smartweave/warp/write-interactions.md'
                  },
                  {
                    text: 'Evolve',
                    link: '/guides/smartweave/warp/evolve.md'
                  }
                ]
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
          }
        ]
      },
      {
        text: 'References',
        link: '/references/',
        collapsible: true,
        children: [
          {
            text: 'GraphQL',
            collapsible: false,
            link: '/references/gql'
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
          },
          {
            text: 'Vue',
            link: '/kits/vue/'
          }
        ]
      }
    ]
  }),

  /**
   * Apply plugins
   */
  plugins: [
    mediumZoomPlugin({
      selector: ':not(.not-zoomable)'
    }),
    containerPlugin({
      type: 'info'
    })
  ]
};
