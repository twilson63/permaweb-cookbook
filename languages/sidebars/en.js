module.exports = [
  {
    text: "Getting Started",
    link: "/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "Quick Starts",
        collapsible: true,
        children: [
          {
            text: "CLI",
            link: "/getting-started/quick-starts/hw-cli.html",
          },
          {
            text: "Code",
            link: "/getting-started/quick-starts/hw-code.html",
          },
        ],
      },
    ],
  },
  {
    text: "Fundamentals",
    link: "/fundamentals/index.html",
    collapsible: true,
    children: [
      {
        text: "Wallets and Keys",
        link: "/fundamentals/wallets-and-keyfiles/index.html",
      },
      {
        text: "Transactions",
        link: "/fundamentals/transactions/index.html",
        collapsible: true,
        children: [
          {
            text: "Bundled Transactions",
            link: "/fundamentals/transactions/bundles.html",
          },
          {
            text: "Transaction Tags",
            link: "/fundamentals/transactions/tags.html",
          },
          {
            text: "Path Manifests",
            link: "/fundamentals/transactions/manifests.html",
          },
        ],
      },
      {
        text: "Accessing Arweave Data",
        link: "/fundamentals/accessing-arweave-data/index.html",
        collapsible: true,
        children: [
          {
            text: "Data Retrieval Methods",
            collapsible: true,
            link: "/fundamentals/accessing-arweave-data/data-retrieval.html",
            children: [
              {
                text: "HTTP API",
                link: "/fundamentals/accessing-arweave-data/http-api.html",
              },
              {
                text: "Arweave.js SDK",
                link: "/fundamentals/accessing-arweave-data/arweave-js.html",
              },
              {
                text: "ARIO Wayfinder",
                link: "/fundamentals/accessing-arweave-data/wayfinder.html",
              },
            ],
          },

          {
            text: "Gateways & Access",
            link: "/fundamentals/accessing-arweave-data/gateways.html",
          },
          {
            text: "GraphQL Queries",
            link: "/fundamentals/accessing-arweave-data/graphql.html",
          },
          {
            text: "ArNS Introduction",
            link: "/fundamentals/accessing-arweave-data/arns.html",
          },
        ],
      },
      {
        text: "Decentralized Computing",
        link: "/fundamentals/decentralized-computing/index.html",
      },
    ],
  },
  {
    text: "Guides",
    link: "/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "Wallets and Keys",
        collapsible: true,
        children: [
          {
            text: "Generating a wallet",
            link: "/guides/wallets-and-keyfiles/creating-a-wallet.html",
          },
        ],
      },
      {
        text: "Frontend",
        collapsible: true,
        children: [
          {
            text: "React",
            link: "/kits/react/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite + permaweb-deploy",
                link: "/kits/react/turbo.html",
              },
            ],
          },
          {
            text: "Svelte",
            link: "/kits/svelte/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite",
                link: "/kits/svelte/vite.html",
              },
            ],
          },
          {
            text: "Vue",
            link: "/kits/vue/index.html",
            collapsible: true,
            children: [
              {
                text: "Create Vue App",
                link: "/kits/vue/create-vue.html",
              },
            ],
          },
        ],
      },
      {
        text: "Posting Transactions",
        collapsible: true,
        children: [
          {
            text: "Arweave JS",
            link: "/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "Turbo SDK",
            link: "/guides/posting-transactions/turbo.html",
          },
          {
            text: "Dispatch",
            link: "/guides/posting-transactions/dispatch.html",
          },
        ],
      },
      {
        text: "Manifests & Bundling",
        collapsible: true,
        children: [
          {
            text: "arweave.app",
            link: "/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ArDrive",
            link: "/guides/deploying-manifests/ardrive.html",
          },
          {
            text: "Turbo",
            link: "/guides/deploying-manifests/turbo",
          },
        ],
      },
    ],
    // children: [
    // 	{
    // 		text: "Builder",
    // 		collapsible: true,
    // 		children: [
    // 			{
    // 				text: "Quick Start: Deploy Your First App",
    // 				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-cli.html"),
    // 			},
    // 			{
    // 				text: "Framework Kits",
    // 				collapsible: true,
    // 				children: [
    // 					{
    // 						text: "React",
    // 						link: get_i18n_link(langCode, "/kits/react/index.html"),
    // 						collapsible: true,
    // 						children: [
    // 							{
    // 								text: "Vite + permaweb-deploy",
    // 								link: get_i18n_link(langCode, "/kits/react/turbo.html"),
    // 							},
    // 							{
    // 								text: "Create React App",
    // 								link: get_i18n_link(langCode, "/kits/react/create-react-app.html"),
    // 							},
    // 						],
    // 					},
    // 					{
    // 						text: "Svelte",
    // 						link: get_i18n_link(langCode, "/kits/svelte/index.html"),
    // 						collapsible: true,
    // 						children: [
    // 							{
    // 								text: "Minimal",
    // 								link: get_i18n_link(langCode, "/kits/svelte/minimal.html"),
    // 							},
    // 							{
    // 								text: "Vite",
    // 								link: get_i18n_link(langCode, "/kits/svelte/vite.html"),
    // 							},
    // 						],
    // 					},
    // 					{
    // 						text: "Vue",
    // 						link: get_i18n_link(langCode, "/kits/vue/index.html"),
    // 						collapsible: true,
    // 						children: [
    // 							{
    // 								text: "Create Vue App",
    // 								link: get_i18n_link(langCode, "/kits/vue/create-vue.html"),
    // 							},
    // 						],
    // 					},
    // 				],
    // 			},
    // 			{
    // 				text: "Deployment Tools",
    // 				collapsible: true,
    // 				children: [
    // 					{
    // 						text: "arkb",
    // 						link: get_i18n_link(langCode, "/guides/deployment/arkb.html"),
    // 					},
    // 					{
    // 						text: get_i18n_str(langCode, "guides-github-action"),
    // 						link: get_i18n_link(langCode, "/guides/deployment/github-action.html"),
    // 					},
    // 				],
    // 			},
    // 			{
    // 				text: "DNS Integration",
    // 				collapsible: true,
    // 				children: [
    // 					{
    // 						text: get_i18n_str(langCode, "guides-server-side"),
    // 						link: get_i18n_link(langCode, "/guides/dns-integration/server-side.html"),
    // 					},
    // 				],
    // 			},
    // 		],
    // 	},
    // 	{
    // 		text: "Explorer",
    // 		collapsible: true,
    // 		children: [
    // 			{
    // 				text: "GraphQL Querying",
    // 				link: get_i18n_link(langCode, "/guides/querying-arweave/querying-arweave.html"),
    // 				collapsible: true,
    // 				children: [
    // 					{
    // 						text: "ar-gql",
    // 						link: get_i18n_link(langCode, "/guides/querying-arweave/ar-gql.html"),
    // 					},
    // 					{
    // 						text: get_i18n_str(langCode, "guides-search-indexing-service"),
    // 						link: get_i18n_link(langCode, "/guides/querying-arweave/search-indexing-service.html"),
    // 					},
    // 				],
    // 			},
    // 			{
    // 				text: "HTTP API Usage",
    // 				link: get_i18n_link(langCode, "/guides/http-api.html"),
    // 			},
    // 		],
    // 	},
    // 	{
    // 		text: "Gamer",
    // 		collapsible: true,
    // 		children: [
    // 			{
    // 				text: "Atomic Tokens for Gaming (Legacy)",
    // 				link: get_i18n_link(langCode, "/archive/guides/atomic-tokens/intro.html"),
    // 			},
    // 		],
    // 	},
    // 	{
    // 		text: "Quant",
    // 		collapsible: true,
    // 		children: [
    // 			{
    // 				text: "Advanced Querying Techniques",
    // 				link: get_i18n_link(langCode, "/guides/querying-arweave/querying-arweave.html"),
    // 			},
    // 		],
    // 	},
    // 	{
    // 		text: "Node Operator",
    // 		collapsible: true,
    // 		children: [
    // 			{
    // 				text: "Vouch Protocol",
    // 				link: get_i18n_link(langCode, "/guides/vouch-system.html"),
    // 			},
    // 		],
    // 	},
    // 	{
    // 		text: "Jack of All Trades",
    // 		collapsible: true,
    // 		children: [
    // 			{
    // 				text: "ArDrive & No-Code Solutions",
    // 				link: get_i18n_link(langCode, "/guides/deploying-manifests/ardrive.html"),
    // 			},
    // 		],
    // 	},
    // ],
  },
  {
    text: "Tooling",
    link: "/tooling/index.html",
    collapsible: true,
    children: [
      {
        text: "Upload & Bundling",
        collapsible: true,
        children: [
          {
            text: "Turbo",
            link: "/tooling/bundlers.html",
          },
        ],
      },
      {
        text: "Querying & Indexing",
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            link: "/tooling/graphql/index.html",
            collapsible: true,
            children: [
              {
                text: "ar-gql (Library)",
                link: "/tooling/graphql/ar-gql.html",
              },
            ],
          },
        ],
      },
      {
        text: "Deployment",
        collapsible: true,
        children: [
          {
            text: "Permaweb Deploy",
            link: "/tooling/deployment/permaweb-deploy.html",
          },
        ],
      },
    ],
  },
  {
    text: "References",
    link: "/references/index.html",
    collapsible: true,
    children: [
      {
        text: "Glossary",
        collapsible: false,
        link: "/references/glossary.html",
      },
      {
        text: "LLMs.txt",
        collapsible: false,
        link: "/references/llms-txt.html",
      },
      {
        text: "Contributing",
        link: "/getting-started/contributing.html",
      },
      {
        text: "Specs",
        collapsible: true,
        children: [
          {
            text: "ANS",
            collapsible: true,
            children: [
              {
                text: "ANS-101: Gateway Capabilities",
                link: "/references/specs/ans/ANS-101.html",
              },
              {
                text: "ANS-102: Bundled Data - JSON",
                link: "/references/specs/ans/ANS-102.html",
              },
              {
                text: "ANS-103: Succinct Proofs",
                link: "/references/specs/ans/ANS-103.html",
              },
              {
                text: "ANS-104: Bundled Data - Binary",
                link: "/references/specs/ans/ANS-104.html",
              },
              {
                text: "ANS-105: License Tags",
                link: "/references/specs/ans/ANS-105.html",
              },
              {
                text: "ANS-106: Do-Not-Store",
                link: "/references/specs/ans/ANS-106.html",
              },
              {
                text: "ANS-109: Vouch-For",
                link: "/references/specs/ans/ANS-109.html",
              },
              {
                text: "ANS-110: Asset Discoverability",
                link: "/references/specs/ans/ANS-110.html",
              },
            ],
          },
          {
            text: "ArFS",
            link: "/references/specs/arfs/arfs.html",
            collapsible: true,
            children: [
              {
                text: "Data Model",
                link: "/references/specs/arfs/data-model.html",
              },
              {
                text: "Entity Types",
                link: "/references/specs/arfs/entity-types.html",
              },
              {
                text: "Content Types",
                link: "/references/specs/arfs/content-types.html",
              },
              {
                text: "Privacy",
                link: "/references/specs/arfs/privacy.html",
              },
              {
                text: "Schema Diagrams",
                link: "/references/specs/arfs/schema-diagrams.html",
              },
            ],
          },
        ],
      },
    ],
  },
];
