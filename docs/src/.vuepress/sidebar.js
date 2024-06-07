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
				text: get_i18n_str(langCode, "getting-started-hw-code", "Hello World (With Code)"),
				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-code.html"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-hw-node", "Hello World (Nodejs)"),
				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-nodejs.html"),
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
						text: "irys.xyz",
						link: get_i18n_link(langCode, "/guides/posting-transactions/irys.html"),
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
          {
						text: "Akord",
						link: get_i18n_link(langCode, "/guides/posting-transactions/akord")
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
				collapsible: false,
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
				text: "SmartWeave",
				link: get_i18n_link(langCode, "/concepts/smartweave.html"),
				collapsible: false,
				children: [
					{
						text: "Arweave Name System (ArNS)",
						link: get_i18n_link(langCode, "/concepts/arns.html"),
					},
					{
						text: get_i18n_str(langCode, "concepts-atomic-tokens"),
						link: get_i18n_link(langCode, "/concepts/atomic-tokens.html"),
					},
					{
						text: "Profit Sharing Tokens (PSTs)",
						link: get_i18n_link(langCode, "/concepts/psts.html"),
					},
					{
						text: get_i18n_str(langCode, "concepts-vouch"),
						link: get_i18n_link(langCode, "/concepts/vouch.html"),
					},
				],
			},
			{
				text: "Arweave File System (ArFS)",
				link: get_i18n_link(langCode, "/concepts/arfs/arfs.html"),
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
			},
		],
	},
	{
		text: get_i18n_str(langCode, "guides"),
		link: get_i18n_link(langCode, "/guides/index.html"),
		collapsible: true,
		children: [
			{
				text: get_i18n_str(langCode, "guides-arprofile"),
				link: get_i18n_link(langCode, "/guides/arprofile.html"),
			},
			{
				text: get_i18n_str(langCode, "guides-dns-integration"),
				collapsible: true,
				children: [
					{
						text: get_i18n_str(langCode, "guides-server-side"),
						link: get_i18n_link(langCode, "/guides/dns-integration/server-side.html"),
					},
					{
						text: get_i18n_str(langCode, "guides-spheron"),
						link: get_i18n_link(langCode, "/guides/dns-integration/spheron.html"),
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
						text: "Irys",
						link: get_i18n_link(langCode, "/guides/deployment/irys-cli.html"),
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
				collapsible: false,
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
						text: "irys.xyz",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/irys.html"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arseeding-js.html"),
					},
          {
						text: "Akord",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/akord"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-psts"),
				collapsible: false,
				link: get_i18n_link(langCode, "/guides/deploying-psts.html"),
			},
			{
				text: get_i18n_str(langCode, "guides-execution-machine"),
				collapsible: true,
				children: [
					{
						text: get_i18n_str(langCode, "guides-intro"),
						link: get_i18n_link(langCode, "/guides/exm/intro.html"),
					},
					{
						text: get_i18n_str(langCode, "guides-api-token"),
						link: get_i18n_link(langCode, "/guides/exm/api.html"),
					},
					{
						text: "JS SDK",
						collapsible: true,
						children: [
							{
								text: get_i18n_str(langCode, "guides-sdk-intro"),
								link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-intro.html"),
							},
							{
								text: get_i18n_str(langCode, "guides-sdk-deploy"),
								link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-deploy.html"),
							},
							{
								text: get_i18n_str(langCode, "guides-sdk-write"),
								link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-write.html"),
							},
							{
								text: get_i18n_str(langCode, "guides-sdk-read"),
								link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-read.html"),
							},
						],
					},
				],
			},
			{
				text: "GraphQL",
				link: get_i18n_link(langCode, "/guides/querying-arweave/queryingArweave.html"),
				collapsible: false,
				children: [
					{
						text: "ArDB",
						link: get_i18n_link(langCode, "/guides/querying-arweave/ardb.html"),
					},
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
				text: "Irys Query Package",
				link: get_i18n_link(langCode, "/guides/irysQueryPackage.html"),
				collapsible: false,
			},
			{
				text: "SmartWeave",
				collapsible: true,
				children: [
					{
						text: get_i18n_str(langCode, "guides-atomic-asset"),
						link: get_i18n_link(langCode, "/guides/smartweave/atomic-assets/index.html"),
						collapsible: false,
						children: [
							{
								text: "using Akord",
								link: get_i18n_link(langCode, "/guides/smartweave/atomic-assets/akord.html"),
							},
							{
								text: "using ArDrive CLI",
								link: get_i18n_link(langCode, "/guides/smartweave/atomic-assets/ardrive-cli.html"),
							}
						],
					},
					{
						text: get_i18n_str(langCode, "guides-atomic-token"),
						link: get_i18n_link(langCode, "/guides/atomic-tokens/intro.html"),
					},
					{
						text: "Vouch",
						link: get_i18n_link(langCode, "/guides/vouch.html"),
					},
					{
						text: "Warp",
						collapsible: false,
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
			{
				text: get_i18n_str(langCode, "guides-testing"),
				collapsible: true,
				children: [
					{
						text: "arlocal",
						collapsible: false,
						link: get_i18n_link(langCode, "/guides/testing/arlocal.html"),
					},
				],
			},
		],
	},
	{
		text: get_i18n_str(langCode, "references"),
		link: get_i18n_link(langCode, "/references/index.html"),
		collapsible: true,
		children: [
			{
				text: "Bundling",
				collapsible: false,
				link: get_i18n_link(langCode, "/references/bundling.html"),
			},
			{
				text: "GraphQL",
				collapsible: false,
				link: get_i18n_link(langCode, "/references/gql.html"),
			},
			{
				text: "HTTP API",
				collapsible: false,
				link: get_i18n_link(langCode, "/references/http-api.html"),
			},
			{
				text: "Irys Query Package",
				collapsible: false,
				link: get_i18n_link(langCode, "/references/irysQueryPackage.html"),
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
			},
			{
				text: "Svelte",
				link: get_i18n_link(langCode, "/kits/svelte/index.html"),
			},
			{
				text: "Vue",
				link: get_i18n_link(langCode, "/kits/vue/index.html"),
			},
			{
				text: "Irys Provenance Toolkit",
				link: get_i18n_link(langCode, "/kits/irysProvenanceToolkit.html"),
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
