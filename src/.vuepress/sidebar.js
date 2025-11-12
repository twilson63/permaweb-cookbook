const { get_i18n_str, languages } = require('../../languages/def');

const get_i18n_link = (code, link) =>
  `${code === 'en' ? '' : '/' + code}${link}`;

const getI18NSidebar = (langCode) => [
  {
    text: "Getting Started",
    link: get_i18n_link(langCode, "/getting-started/index.html"),
    collapsible: true,
    children: [
      {
        text: get_i18n_str(
          langCode,
          "getting-started-welcome",
          "Welcome & Overview"
        ),
        link: get_i18n_link(langCode, "/getting-started/welcome.html"),
      },
      {
        text: "Quick Starts",
        collapsible: true,
        children: [
          {
            text: "CLI",
            link: get_i18n_link(
              langCode,
              "/getting-started/quick-starts/hw-cli.html"
            ),
          },
          {
            text: "Code",
            link: get_i18n_link(
              langCode,
              "/getting-started/quick-starts/hw-code.html"
            ),
          },
        ],
      },
    ],
  },
  {
    text: "Fundamentals",
    link: get_i18n_link(langCode, "/fundamentals/index.html"),
    collapsible: true,
    children: [
      {
        text: get_i18n_str(langCode, "concepts-wallets-and-keys"),
        link: get_i18n_link(
          langCode,
          "/fundamentals/wallets-and-keyfiles/index.html"
        ),
        collapsible: true,
        children: [
          {
            text: "Generating a wallet",
            link: get_i18n_link(
              langCode,
              "/fundamentals/wallets-and-keyfiles/creating-a-wallet.html"
            ),
          },
        ],
      },
      {
        text: "Transactions",
        link: get_i18n_link(
          langCode,
          "/fundamentals/transactions/transaction-types.html"
        ),
        collapsible: true,
        children: [
          {
            text: get_i18n_str(langCode, "concepts-post-transactions"),
            link: get_i18n_link(
              langCode,
              "/fundamentals/transactions/post-transactions.html"
            ),
          },
          {
            text: get_i18n_str(langCode, "concepts-tags"),
            link: get_i18n_link(
              langCode,
              "/fundamentals/transactions/tags.html"
            ),
          },
          {
            text: get_i18n_str(langCode, "concepts-bundles"),
            link: get_i18n_link(
              langCode,
              "/fundamentals/transactions/bundles.html"
            ),
          },
        ],
      },
      {
        text: "Accessing Arweave Data",
        link: get_i18n_link(
          langCode,
          "/fundamentals/accessing-arweave-data/index.html"
        ),
        collapsible: true,
        children: [
          {
            text: "Data Retrieval Methods",
            collapsible: true,
            link: get_i18n_link(
              langCode,
              "/fundamentals/accessing-arweave-data/data-retrieval.html"
            ),
            children: [
              {
                text: "HTTP API",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/accessing-arweave-data/http-api.html"
                ),
              },
              {
                text: "Arweave.js SDK",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/accessing-arweave-data/arweave-js.html"
                ),
              },
              {
                text: "ARIO Wayfinder",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/accessing-arweave-data/wayfinder.html"
                ),
              },
            ],
          },

          {
            text: "Gateways & Access",
            link: get_i18n_link(
              langCode,
              "/fundamentals/accessing-arweave-data/gateways.html"
            ),
          },
          {
            text: "GraphQL Queries",
            link: get_i18n_link(
              langCode,
              "/fundamentals/accessing-arweave-data/graphql.html"
            ),
          },
          {
            text: "Manifests & Path Resolution",
            link: get_i18n_link(
              langCode,
              "/fundamentals/accessing-arweave-data/manifests.html"
            ),
          },
          {
            text: "ArNS Introduction",
            link: get_i18n_link(
              langCode,
              "/fundamentals/accessing-arweave-data/arns.html"
            ),
          },
        ],
      },
      {
        text: "Decentralized Computing",
        link: get_i18n_link(
          langCode,
          "/fundamentals/decentralized-computing/index.html"
        ),
        collapsible: true,
        children: [
          {
            text: "AO Processes",
            link: get_i18n_link(
              langCode,
              "/fundamentals/decentralized-computing/ao-processes/what-are-ao-processes.html"
            ),
          },
          {
            text: "HyperBEAM",
            link: get_i18n_link(
              langCode,
              "/fundamentals/decentralized-computing/hyperbeam/hyperbeam-introduction.html"
            ),
            collapsible: true,
            children: [
              {
                text: "HyperBEAM Introduction",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/decentralized-computing/hyperbeam/hyperbeam-introduction.html"
                ),
              },
              {
                text: "Getting AO Process State",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/decentralized-computing/hyperbeam/getting-ao-state.html"
                ),
              },
              {
                text: "Lua Serverless Functions",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/decentralized-computing/hyperbeam/lua-serverless.html"
                ),
              },
              {
                text: "HyperBEAM Devices",
                link: get_i18n_link(
                  langCode,
                  "/fundamentals/decentralized-computing/hyperbeam/hyperbeam-devices.html"
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "Guides",
    link: get_i18n_link(langCode, "/guides/index.html"),
    collapsible: true,
    children: [
      {
        text: "Frontend",
        collapsible: true,
        children: [
          {
            text: "React",
            link: get_i18n_link(langCode, "/kits/react/index.html"),
            collapsible: true,
            children: [
              {
                text: "Vite + permaweb-deploy",
                link: get_i18n_link(langCode, "/kits/react/turbo.html"),
              },
              {
                text: "Create React App",
                link: get_i18n_link(
                  langCode,
                  "/kits/react/create-react-app.html"
                ),
              },
            ],
          },
          {
            text: "Svelte",
            link: get_i18n_link(langCode, "/kits/svelte/index.html"),
            collapsible: true,
            children: [
              {
                text: "Minimal",
                link: get_i18n_link(langCode, "/kits/svelte/minimal.html"),
              },
              {
                text: "Vite",
                link: get_i18n_link(langCode, "/kits/svelte/vite.html"),
              },
            ],
          },
          {
            text: "Vue",
            link: get_i18n_link(langCode, "/kits/vue/index.html"),
            collapsible: true,
            children: [
              {
                text: "Create Vue App",
                link: get_i18n_link(langCode, "/kits/vue/create-vue.html"),
              },
            ],
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
    // 				text: "Posting Transactions",
    // 				collapsible: true,
    // 				children: [
    // 					{
    // 						text: "arweave-js",
    // 						link: get_i18n_link(langCode, "/guides/posting-transactions/arweave-js.html"),
    // 					},
    // 					{
    // 						text: "Turbo-SDK",
    // 						link: get_i18n_link(langCode, "/guides/posting-transactions/turbo.html")
    // 					},
    // 					{
    // 						text: "dispatch",
    // 						link: get_i18n_link(langCode, "/guides/posting-transactions/dispatch.html"),
    // 					},
    // 					{
    // 						text: "arseeding-js",
    // 						link: get_i18n_link(langCode, "/guides/posting-transactions/arseeding-js.html"),
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
    // 				text: "Manifests & Bundling",
    // 				link: get_i18n_link(langCode, "/guides/deploying-manifests/deploying-manifests.html"),
    // 				collapsible: true,
    // 				children: [
    // 					{
    // 						text: "arweave.app",
    // 						link: get_i18n_link(langCode, "/guides/deploying-manifests/arweave-app.html"),
    // 					},
    // 					{
    // 						text: "ArDrive",
    // 						link: get_i18n_link(langCode, "/guides/deploying-manifests/ardrive.html"),
    // 					},
    // 					{
    // 						text: "arseeding-js",
    // 						link: get_i18n_link(langCode, "/guides/deploying-manifests/arseeding-js.html"),
    // 					},
    // 					{
    // 						text: "Turbo",
    // 						link: get_i18n_link(langCode, "/guides/deploying-manifests/turbo"),
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
    link: get_i18n_link(langCode, "/tooling/index.html"),
    collapsible: true,
    children: [
      {
        text: "Upload & Bundling",
        collapsible: true,
        children: [
          {
            text: "Turbo",
            link: get_i18n_link(langCode, "/tooling/bundlers.html"),
          },
        ],
      },
      {
        text: "Querying & Indexing",
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            link: get_i18n_link(langCode, "/tooling/graphql/index.html"),
            collapsible: true,
            children: [
              {
                text: "Querying Arweave",
                link: get_i18n_link(langCode, "/tooling/querying-arweave.html"),
              },
              {
                text: "Goldsky Search Gateway",
                link: get_i18n_link(
                  langCode,
                  "/tooling/graphql/search-indexing-service.html"
                ),
              },
              {
                text: "ar-gql (Library)",
                link: get_i18n_link(langCode, "/tooling/graphql/ar-gql.html"),
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
            link: get_i18n_link(
              langCode,
              "/tooling/deployment/permaweb-deploy.html"
            ),
          },
          {
            text: "arkb (CLI)",
            link: get_i18n_link(langCode, "/tooling/deployment/arkb.html"),
          },
          {
            text: "GitHub Actions",
            link: get_i18n_link(
              langCode,
              "/tooling/deployment/github-action.html"
            ),
          },
        ],
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
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-101.html"
                ),
              },
              {
                text: "ANS-102: Bundled Data - JSON",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-102.html"
                ),
              },
              {
                text: "ANS-103: Succinct Proofs",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-103.html"
                ),
              },
              {
                text: "ANS-104: Bundled Data - Binary",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-104.html"
                ),
              },
              {
                text: "ANS-105: License Tags",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-105.html"
                ),
              },
              {
                text: "ANS-106: Do-Not-Store",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-106.html"
                ),
              },
              {
                text: "ANS-109: Vouch-For",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-109.html"
                ),
              },
              {
                text: "ANS-110: Asset Discoverability",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/ans/ANS-110.html"
                ),
              },
            ],
          },
          {
            text: "ArFS",
            link: get_i18n_link(langCode, "/tooling/specs/arfs/arfs.html"),
            collapsible: true,
            children: [
              {
                text: "Data Model",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/arfs/data-model.html"
                ),
              },
              {
                text: "Entity Types",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/arfs/entity-types.html"
                ),
              },
              {
                text: "Content Types",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/arfs/content-types.html"
                ),
              },
              {
                text: "Privacy",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/arfs/privacy.html"
                ),
              },
              {
                text: "Schema Diagrams",
                link: get_i18n_link(
                  langCode,
                  "/tooling/specs/arfs/schema-diagrams.html"
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "References",
    link: get_i18n_link(langCode, "/references/index.html"),
    collapsible: true,
    children: [
      {
        text: "Glossary",
        collapsible: false,
        link: get_i18n_link(langCode, "/references/glossary.html"),
      },
      {
        text: "LLMs.txt",
        collapsible: false,
        link: get_i18n_link(langCode, "/references/llms-txt.html"),
      },
      {
        text: get_i18n_str(
          langCode,
          "getting-started-contributing",
          "Contributing"
        ),
        link: get_i18n_link(langCode, "/getting-started/contributing.html"),
      },
    ],
  },
  {
    text: "Community",
    link: get_i18n_link(langCode, "/community/index.html"),
    collapsible: true,
    children: [
      {
        text: "Developer Resources",
        link: get_i18n_link(langCode, "/community/index.html"),
      },
      // {
      // 	text: "Archive (Deprecated Content)",
      // 	link: get_i18n_link(langCode, "/archive/index.html"),
      // 	collapsible: true,
      // 	children: [
      // 		{
      // 			text: "SmartWeave",
      // 			link: get_i18n_link(langCode, "/archive/fundamentals/smartweave.html"),
      // 			collapsible: true,
      // 			children: [
      // 				{
      // 					text: "Profit Sharing Tokens (PSTs)",
      // 					link: get_i18n_link(langCode, "/archive/fundamentals/psts.html"),
      // 				},
      // 				{
      // 					text: "Atomic Tokens",
      // 					link: get_i18n_link(langCode, "/archive/fundamentals/atomic-tokens.html"),
      // 				},
      // 				{
      // 					text: "Warp SDK",
      // 					collapsible: true,
      // 					children: [
      // 						{
      // 							text: get_i18n_str(langCode, "guides-intro"),
      // 							link: get_i18n_link(langCode, "/archive/guides/smartweave/warp/intro.html"),
      // 						},
      // 						{
      // 							text: get_i18n_str(langCode, "guides-warp-deploying-contracts"),
      // 							link: get_i18n_link(langCode, "/archive/guides/smartweave/warp/deploying-contracts.html"),
      // 						},
      // 						{
      // 							text: get_i18n_str(langCode, "guides-warp-read-state"),
      // 							link: get_i18n_link(langCode, "/archive/guides/smartweave/warp/readstate.html"),
      // 						},
      // 						{
      // 							text: get_i18n_str(langCode, "guides-warp-write-interactions"),
      // 							link: get_i18n_link(langCode, "/archive/guides/smartweave/warp/write-interactions.html"),
      // 						},
      // 						{
      // 							text: get_i18n_str(langCode, "guides-warp-evolve"),
      // 							link: get_i18n_link(langCode, "/archive/guides/smartweave/warp/evolve.html"),
      // 						},
      // 					],
      // 				},
      // 			],
      // 		},
      // 		{
      // 			text: "Atomic Tokens Guide",
      // 			link: get_i18n_link(langCode, "/archive/fundamentals/atomic-tokens.html"),
      // 		},
      // 		{
      // 			text: "Vouch Protocol",
      // 			link: get_i18n_link(langCode, "/archive/fundamentals/vouch-system.html"),
      // 		},
      // 	],
      // },
    ],
  },
];

const createSidebars = () => {
  return languages.reduce(
    (sidebars, { code }) => {
      sidebars[`/${code}/`] = getI18NSidebar(code);
      return sidebars;
    },
    {
      '/': getI18NSidebar('en')
    }
  );
};

module.exports = createSidebars;
