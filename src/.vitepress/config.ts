import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Cooking with the Permaweb",
  description: "A collection of little developer guides to build on the permaweb",
  
  themeConfig: {
    siteTitle: "Cooking with the Permaweb",
    logo: "/Permaweb_Cookbook.ico",
    
    nav: [
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Concepts', link: '/concepts/' },
      { text: 'Guides', link: '/guides/' },
      { text: 'References', link: '/references/' },
      { text: 'Kits', link: '/kits/' }
    ],
    
    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Welcome', link: '/getting-started/welcome' },
            { text: 'Hello World (No Code)', link: '/getting-started/quick-starts/hw-no-code' },
            { text: 'Hello World (CLI)', link: '/getting-started/quick-starts/hw-cli' },
            { text: 'Contributing', link: '/getting-started/contributing' }
          ]
        }
      ],
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Welcome', link: '/getting-started/welcome' },
            { text: 'Hello World (No Code)', link: '/getting-started/quick-starts/hw-no-code' },
            { text: 'Hello World (CLI)', link: '/getting-started/quick-starts/hw-cli' },
            { text: 'Contributing', link: '/getting-started/contributing' }
          ]
        }
      ],
      '/concepts/': [
        {
          text: 'Concepts',
          items: [
            { text: 'Post Transactions', link: '/concepts/post-transactions' },
            { text: 'Tags', link: '/concepts/tags' },
            { text: 'Querying', link: '/concepts/queryTransactions' },
            { text: 'Fetching Data', link: '/guides/http-api' },
            { text: 'Transaction Types', items: [
              { text: 'Bundles', link: '/concepts/bundles' },
              { text: 'Path Manifests', link: '/concepts/manifests' }
            ]},
            { text: 'Wallets and Keys', link: '/concepts/keyfiles-and-wallets' },
            { text: 'Permaweb', items: [
              { text: 'Permaweb Applications', link: '/concepts/permawebApplications' },
              { text: 'Gateways', link: '/concepts/gateways' },
              { text: 'Bundlers', link: '/concepts/bundlers' }
            ]},
            { text: 'Arweave File System (ArFS)', items: [
              { text: 'ArFS', link: '/concepts/arfs/arfs' },
              { text: 'Data Model', link: '/concepts/arfs/data-model' },
              { text: 'Entity Types', link: '/concepts/arfs/entity-types' },
              { text: 'Content Types', link: '/concepts/arfs/content-types' },
              { text: 'Privacy', link: '/concepts/arfs/privacy' },
              { text: 'Schema Diagrams', link: '/concepts/arfs/schema-diagrams' }
            ]},
            { text: 'Vouch', link: '/concepts/vouch' }
          ]
        }
      ],
      '/guides/': [
        {
          text: 'Guides',
          items: [
            { text: 'DNS Integration', items: [
              { text: 'Server Side', link: '/guides/dns-integration/server-side' }
            ]},
            { text: 'Deploying Apps', items: [
              { text: 'arkb', link: '/guides/deployment/arkb' },
              { text: 'GitHub Action', link: '/guides/deployment/github-action' }
            ]},
            { text: 'Deploying Manifests', items: [
              { text: 'Deploying Manifests', link: '/guides/deploying-manifests/deployingManifests' },
              { text: 'arweave.app', link: '/guides/deploying-manifests/arweave-app' },
              { text: 'ardrive', link: '/guides/deploying-manifests/ardrive' },
              { text: 'arseeding-js', link: '/guides/deploying-manifests/arseeding-js' },
              { text: 'Turbo', link: '/guides/deploying-manifests/turbo' }
            ]},
            { text: 'GraphQL', items: [
              { text: 'Querying Arweave', link: '/guides/querying-arweave/queryingArweave' },
              { text: 'ArDB', link: '/guides/querying-arweave/ardb' },
              { text: 'ArGQL', link: '/guides/querying-arweave/ar-gql' }
            ]},
            { text: 'Posting Transactions', items: [
              { text: 'Posting Transactions', link: '/guides/posting-transactions/' },
              { text: 'arweave-js', link: '/guides/posting-transactions/arweave-js' },
              { text: 'dispatch', link: '/guides/posting-transactions/dispatch' },
              { text: 'arseeding-js', link: '/guides/posting-transactions/arseeding-js' },
              { text: 'Turbo', link: '/guides/posting-transactions/turbo' }
            ]},
            { text: 'Testing', items: [
              { text: 'arlocal', link: '/guides/testing/arlocal' }
            ]},
            { text: 'Using Vue', link: '/guides/using-vue' },
            { text: 'Vouch', link: '/guides/vouch' }
          ]
        }
      ],
      '/references/': [
        {
          text: 'References',
          items: [
            { text: 'HTTP API', link: '/references/http-api' },
            { text: 'GraphQL', link: '/references/gql' },
            { text: 'Bundling', link: '/references/bundling' },
            { text: 'LLMs', link: '/references/llms' },
            { text: 'Glossary', link: '/references/glossary' }
          ]
        }
      ],
      '/kits/': [
        {
          text: 'Kits',
          items: [
            { text: 'React', items: [
              { text: 'Create React App', link: '/kits/react/create-react-app' },
              { text: 'Vite', link: '/kits/react/vite' },
              { text: 'Turbo', link: '/kits/react/turbo' }
            ]},
            { text: 'Vue', items: [
              { text: 'Create Vue', link: '/kits/vue/create-vue' }
            ]},
            { text: 'Svelte', items: [
              { text: 'Minimal', link: '/kits/svelte/minimal' },
              { text: 'Vite', link: '/kits/svelte/vite' }
            ]}
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/twilson63/permaweb-cookbook' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Permaweb Builders'
    },
    
    search: {
      provider: 'local'
    },
    
    editLink: {
      pattern: 'https://github.com/twilson63/permaweb-cookbook/edit/main/docs/src/:path'
    },
    
    darkMode: true,
    backToTop: false
  },
  
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
  ],
  
  markdown: {
    lineNumbers: false,
    theme: 'material-theme-palenight'
  }
}) 