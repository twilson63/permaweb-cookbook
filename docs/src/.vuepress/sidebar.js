const { get_i18n_str, languages } = require("../../languages/def");

const get_i18n_link = (code, link) => `${code === "en" ? "" : "/" + code}${link}`;

const getI18NSidebar = (langCode) => [
	{
		text: get_i18n_str(langCode, "getting-started", "Getting Started"),
		link: get_i18n_link(langCode, "/getting-started/index.html"),
		collapsible: true,
		children: [
			{
				text: get_i18n_str(langCode, "getting-started-welcome", "Welcome"),
				link: get_i18n_link(langCode, "/getting-started/welcome.html"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-hw-no-code", "Hello World (No Code)"),
				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-no-code.html"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-hw-cli", "Hello World (CLI)"),
				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-cli.html"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-contributing", "Contributing"),
				link: get_i18n_link(langCode, "/getting-started/contributing.html"),
			},
		],
	},
	{
		text: get_i18n_str(langCode, "concepts"),
		link: get_i18n_link(langCode, "/concepts/index.html"),
		collapsible: true,
		children: [
			{
				text: get_i18n_str(langCode, "concepts-post-transactions"),
				link: get_i18n_link(langCode, "/concepts/post-transactions.html"),
				collapsible: true,
				children: [
					{
						text: "arweave-js",
						link: get_i18n_link(langCode, "/guides/posting-transactions/arweave-js.html"),
					},
					{
						text: "dispatch",
						link: get_i18n_link(langCode, "/guides/posting-transactions/dispatch.html"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/posting-transactions/arseeding-js.html"),
					},
					{
						text: "Turbo-SDK",
						link: get_i18n_link(langCode, "/guides/posting-transactions/turbo.html")
					},
				],
			},
			{
				text: get_i18n_str(langCode, "concepts-tags"),
				link: get_i18n_link(langCode, "/concepts/tags.html"),
			},
			{
				text: get_i18n_str(langCode, "concepts-querying"),
				link: get_i18n_link(langCode, "/concepts/queryTransactions.html"),
			},
			{
				text: get_i18n_str(langCode, "concepts-fetching-data"),
				link: get_i18n_link(langCode, "/guides/http-api.html"),
			},
			{
				text: get_i18n_str(langCode, "concepts-transaction-types"),
				link: get_i18n_link(langCode, "/concepts/transaction-types.html"),
				collapsible: true,
				children: [
					{
						text: get_i18n_str(langCode, "concepts-bundles"),
						link: get_i18n_link(langCode, "/concepts/bundles.html"),
					},
					{
						text: get_i18n_str(langCode, "concepts-path-manifests"),
						link: get_i18n_link(langCode, "/concepts/manifests.html"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "concepts-wallets-and-keys"),
				link: get_i18n_link(langCode, "/concepts/keyfiles-and-wallets.html"),
			},
			{
				text: "Permaweb",
				link: get_i18n_link(langCode, "/concepts/permaweb.html"),
				collapsible: true,
				children: [
					{
						text: get_i18n_str(langCode, "concepts-permaweb-applications"),
						link: get_i18n_link(langCode, "/concepts/permawebApplications.html"),
					},
					{
						text: get_i18n_str(langCode, "concepts-gateways"),
						link: get_i18n_link(langCode, "/concepts/gateways.html"),
					},
					{
						text: get_i18n_str(langCode, "concepts-bundlers"),
						link: get_i18n_link(langCode, "/concepts/bundlers.html"),
					},
				],
			},
			{
				text: "Browser Sandboxing",
				link: get_i18n_link(langCode, "/concepts/sandboxing")
			},
			{
				text: get_i18n_str(langCode, "concepts-vouch", "Vouch"),
				link: get_i18n_link(langCode, "/concepts/vouch.html"),
			}
		],
	},
	{
		text: get_i18n_str(langCode, "guides"),
		link: get_i18n_link(langCode, "/guides/index.html"),
		collapsible: true,
		children: [
			{
				text: get_i18n_str(langCode, "guides-dns-integration"),
				collapsible: true,
				children: [
					{
						text: get_i18n_str(langCode, "guides-server-side"),
						link: get_i18n_link(langCode, "/guides/dns-integration/server-side.html"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-apps"),
				collapsible: true,
				children: [
					{
						text: "arkb",
						link: get_i18n_link(langCode, "/guides/deployment/arkb.html"),
					},
					{
						text: get_i18n_str(langCode, "guides-github-action"),
						link: get_i18n_link(langCode, "/guides/deployment/github-action.html"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-manifests"),
				link: get_i18n_link(langCode, "/guides/deploying-manifests/deployingManifests.html"),
				collapsible: true,
				children: [
					{
						text: "arweave.app",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arweave-app.html"),
					},
					{
						text: "ardrive",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/ardrive.html"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arseeding-js.html"),
					},
					{
						text: "Turbo",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/turbo"),
					},
				],
			},
			{
				text: "GraphQL",
				link: get_i18n_link(langCode, "/guides/querying-arweave/queryingArweave.html"),
				collapsible: true,
				children: [
					{
						text: "ar-gql",
						link: get_i18n_link(langCode, "/guides/querying-arweave/ar-gql.html"),
					},
					{
						text: get_i18n_str(langCode, "guides-search-indexing-service"),
						link: get_i18n_link(langCode, "/guides/querying-arweave/search-indexing-service.html"),
					},
				],
			},
			{
				text: "Vouch",
				link: get_i18n_link(langCode, "/guides/vouch.html"),
			},
		],
	},
	{
		text: get_i18n_str(langCode, "references"),
		link: get_i18n_link(langCode, "/references/index.html"),
		collapsible: true,
		children: [
			{
				text: "LLMs.txt",
				collapsible: false,
				link: get_i18n_link(langCode, "/references/llms.html"),
			},
			{
				text: "Glossary",
				collapsible: false,
				link: get_i18n_link(langCode, "/references/glossary.html"),
			},
		],
	},
	{
		text: get_i18n_str(langCode, "kits"),
		link: get_i18n_link(langCode, "/kits/index.html"),
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
						link: get_i18n_link(langCode, "/kits/react/create-react-app.html"),
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
	{
		text: get_i18n_str(langCode, "community", "Community"),
		link: get_i18n_link(langCode, "/community/index.html"),
		collapsible: true,
		children: [
			{
				text: "Arweave Name System (ArNS)",
				link: get_i18n_link(langCode, "/concepts/arns.html"),
			},
			{
				text: "Arweave File System (ArFS)",
				link: get_i18n_link(langCode, "/concepts/arfs/arfs.html"),
				collapsible: true,
				children: [
					{
						text: "ArFS",
						link: get_i18n_link(langCode, "/concepts/arfs/arfs.html"),
					},
					{
						text: "Data Model",
						link: get_i18n_link(langCode, "/concepts/arfs/data-model.html"),
					},
					{
						text: "Entity Types",
						link: get_i18n_link(langCode, "/concepts/arfs/entity-types.html"),
					},
					{
						text: "Content Types",
						link: get_i18n_link(langCode, "/concepts/arfs/content-types.html"),
					},
					{
						text: "Privacy",
						link: get_i18n_link(langCode, "/concepts/arfs/privacy.html"),
					},
					{
						text: "Schema Diagrams",
						link: get_i18n_link(langCode, "/concepts/arfs/schema-diagrams.html"),
					},
				],
			}
		]
	},
	{
		text: "Legacy",
		link: get_i18n_link(langCode, "/legacy/index.html"),
		collapsible: true,
		children: [
			{
				text: "Concepts",
				collapsible: true,
				children: [
					{
						text: "SmartWeave",
						link: get_i18n_link(langCode, "/concepts/smartweave.html"),
						collapsible: true,
						children: [
							{
								text: "Profit Sharing Tokens (PSTs)",
								link: get_i18n_link(langCode, "/concepts/psts.html"),
							},
						],
					},
				]
			},
			{
				text: "Guides",
				collapsible: true,
				children: [
					{
						text: "SmartWeave",
						collapsible: true,
						children: [
							{
								text: get_i18n_str(langCode, "guides-atomic-token"),
								link: get_i18n_link(langCode, "/guides/atomic-tokens/intro.html"),
							},
							{
								text: "Warp",
								collapsible: true,
								children: [
									{
										text: get_i18n_str(langCode, "guides-intro"),
										link: get_i18n_link(langCode, "/guides/smartweave/warp/intro.html"),
									},
									{
										text: get_i18n_str(langCode, "guides-warp-deploying-contracts"),
										link: get_i18n_link(langCode, "/guides/smartweave/warp/deploying-contracts.html"),
									},
									{
										text: get_i18n_str(langCode, "guides-warp-read-state"),
										link: get_i18n_link(langCode, "/guides/smartweave/warp/readstate.html"),
									},
									{
										text: get_i18n_str(langCode, "guides-warp-write-interactions"),
										link: get_i18n_link(langCode, "/guides/smartweave/warp/write-interactions.html"),
									},
									{
										text: get_i18n_str(langCode, "guides-warp-evolve"),
										link: get_i18n_link(langCode, "/guides/smartweave/warp/evolve.html"),
									},
								],
							},
						],
					},
				],
			},
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
			"/": getI18NSidebar("en"),
		},
	);
};

module.exports = createSidebars;
