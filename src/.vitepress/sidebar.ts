import { get_i18n_str, languages } from "../../languages/def"

const get_i18n_link = (code: string, link: string) => `${code === "en" ? "" : "/" + code}${link}`

const getI18NSidebar = (langCode: string) => [
	{
		text: get_i18n_str(langCode, "getting-started", "Getting Started"),
		link: get_i18n_link(langCode, "/getting-started/"),
		collapsed: false,
		items: [
			{
				text: get_i18n_str(langCode, "getting-started-welcome", "Welcome"),
				link: get_i18n_link(langCode, "/getting-started/welcome"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-hw-no-code", "Hello World (No Code)"),
				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-no-code"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-hw-cli", "Hello World (CLI)"),
				link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-cli"),
			},
			{
				text: get_i18n_str(langCode, "getting-started-contributing", "Contributing"),
				link: get_i18n_link(langCode, "/getting-started/contributing"),
			},
		],
	},
	{
		text: get_i18n_str(langCode, "concepts"),
		link: get_i18n_link(langCode, "/concepts/"),
		collapsed: false,
		items: [
			{
				text: get_i18n_str(langCode, "concepts-post-transactions"),
				link: get_i18n_link(langCode, "/concepts/post-transactions"),
				collapsed: false,
				items: [
					{
						text: "arweave-js",
						link: get_i18n_link(langCode, "/guides/posting-transactions/arweave-js"),
					},
					{
						text: "dispatch",
						link: get_i18n_link(langCode, "/guides/posting-transactions/dispatch"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/posting-transactions/arseeding-js"),
					},
					{
						text: "Turbo-SDK",
						link: get_i18n_link(langCode, "/guides/posting-transactions/turbo")
					},
				],
			},
			{
				text: get_i18n_str(langCode, "concepts-tags"),
				link: get_i18n_link(langCode, "/concepts/tags"),
			},
			{
				text: get_i18n_str(langCode, "concepts-querying"),
				link: get_i18n_link(langCode, "/concepts/queryTransactions"),
			},
			{
				text: get_i18n_str(langCode, "concepts-fetching-data"),
				link: get_i18n_link(langCode, "/guides/http-api"),
			},
			{
				text: get_i18n_str(langCode, "concepts-transaction-types"),
				items: [
					{
						text: get_i18n_str(langCode, "concepts-bundles"),
						link: get_i18n_link(langCode, "/concepts/bundles"),
					},
					{
						text: get_i18n_str(langCode, "concepts-path-manifests"),
						link: get_i18n_link(langCode, "/concepts/manifests"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "concepts-wallets-and-keys"),
				link: get_i18n_link(langCode, "/concepts/keyfiles-and-wallets"),
			},
			{
				text: "Permaweb",
				link: get_i18n_link(langCode, "/concepts/permaweb"),
				collapsed: false,
				items: [
					{
						text: get_i18n_str(langCode, "concepts-permaweb-applications"),
						link: get_i18n_link(langCode, "/concepts/permawebApplications"),
					},
					{
						text: get_i18n_str(langCode, "concepts-gateways"),
						link: get_i18n_link(langCode, "/concepts/gateways"),
					},
					{
						text: get_i18n_str(langCode, "concepts-bundlers"),
						link: get_i18n_link(langCode, "/concepts/bundlers"),
					},
				],
			},
			{
				text: "Arweave File System (ArFS)",
				link: get_i18n_link(langCode, "/concepts/arfs/arfs"),
				items: [
					{
						text: "ArFS",
						link: get_i18n_link(langCode, "/concepts/arfs/arfs"),
					},
					{
						text: "Data Model",
						link: get_i18n_link(langCode, "/concepts/arfs/data-model"),
					},
					{
						text: "Entity Types",
						link: get_i18n_link(langCode, "/concepts/arfs/entity-types"),
					},
					{
						text: "Content Types",
						link: get_i18n_link(langCode, "/concepts/arfs/content-types"),
					},
					{
						text: "Privacy",
						link: get_i18n_link(langCode, "/concepts/arfs/privacy"),
					},
					{
						text: "Schema Diagrams",
						link: get_i18n_link(langCode, "/concepts/arfs/schema-diagrams"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "concepts-vouch", "Vouch"),
				link: get_i18n_link(langCode, "/concepts/vouch"),
			}
		],
	},
	{
		text: get_i18n_str(langCode, "guides"),
		link: get_i18n_link(langCode, "/guides/"),
		collapsed: false,
		items: [
			{
				text: get_i18n_str(langCode, "guides-dns-integration"),
				collapsed: false,
				items: [
					{
						text: get_i18n_str(langCode, "guides-server-side"),
						link: get_i18n_link(langCode, "/guides/dns-integration/server-side"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-apps"),
				collapsed: false,
				items: [
					{
						text: "arkb",
						link: get_i18n_link(langCode, "/guides/deployment/arkb"),
					},
					{
						text: get_i18n_str(langCode, "guides-github-action"),
						link: get_i18n_link(langCode, "/guides/deployment/github-action"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-manifests"),
				link: get_i18n_link(langCode, "/guides/deploying-manifests/deployingManifests"),
				collapsed: false,
				items: [
					{
						text: "arweave.app",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arweave-app"),
					},
					{
						text: "ardrive",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/ardrive"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arseeding-js"),
					},
					{
						text: "Turbo",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/turbo"),
					},
				],
			},
			{
				text: "GraphQL",
				link: get_i18n_link(langCode, "/guides/querying-arweave/queryingArweave"),
				collapsed: false,
				items: [
					{
						text: "ArDB",
						link: get_i18n_link(langCode, "/guides/querying-arweave/ardb"),
					},
					{
						text: "ArGQL",
						link: get_i18n_link(langCode, "/guides/querying-arweave/ar-gql"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-posting-transactions"),
				link: get_i18n_link(langCode, "/guides/posting-transactions/"),
				collapsed: false,
				items: [
					{
						text: "arweave-js",
						link: get_i18n_link(langCode, "/guides/posting-transactions/arweave-js"),
					},
					{
						text: "dispatch",
						link: get_i18n_link(langCode, "/guides/posting-transactions/dispatch"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/posting-transactions/arseeding-js"),
					},
					{
						text: "Turbo",
						link: get_i18n_link(langCode, "/guides/posting-transactions/turbo"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-manifests"),
				link: get_i18n_link(langCode, "/guides/deploying-manifests/deployingManifests"),
				collapsed: false,
				items: [
					{
						text: "arweave.app",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arweave-app"),
					},
					{
						text: "ardrive",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/ardrive"),
					},
					{
						text: "arseeding-js",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/arseeding-js"),
					},
					{
						text: "Turbo",
						link: get_i18n_link(langCode, "/guides/deploying-manifests/turbo"),
					},
				],
			},
			{
				text: get_i18n_str(langCode, "guides-deploying-psts"),
				link: get_i18n_link(langCode, "/guides/deploying-psts/"),
			},
			{
				text: get_i18n_str(langCode, "guides-atomic-tokens"),
				link: get_i18n_link(langCode, "/guides/atomic-tokens/intro"),
			},
			{
				text: get_i18n_str(langCode, "guides-smartweave"),
				link: get_i18n_link(langCode, "/guides/smartweave/warp/intro"),
			},
			{
				text: get_i18n_str(langCode, "guides-testing"),
				link: get_i18n_link(langCode, "/guides/testing/arlocal"),
			},
			{
				text: get_i18n_str(langCode, "guides-vouch"),
				link: get_i18n_link(langCode, "/guides/vouch"),
			},
			{
				text: get_i18n_str(langCode, "guides-using-vue"),
				link: get_i18n_link(langCode, "/guides/using-vue"),
			},
		],
	},
	{
		text: get_i18n_str(langCode, "references"),
		link: get_i18n_link(langCode, "/references/"),
		collapsed: false,
		items: [
			{
				text: get_i18n_str(langCode, "references-bundling"),
				link: get_i18n_link(langCode, "/references/bundling"),
			},
			{
				text: get_i18n_str(langCode, "references-gql"),
				link: get_i18n_link(langCode, "/references/gql"),
			},
			{
				text: get_i18n_str(langCode, "references-http-api"),
				link: get_i18n_link(langCode, "/references/http-api"),
			},
		],
	},
	{
		text: get_i18n_str(langCode, "kits"),
		link: get_i18n_link(langCode, "/kits/"),
		collapsed: false,
		items: [
			{
				text: "React",
				link: get_i18n_link(langCode, "/kits/react/"),
				collapsed: false,
				items: [
					{
						text: "Create React App",
						link: get_i18n_link(langCode, "/kits/react/create-react-app"),
					},
					{
						text: "Vite",
						link: get_i18n_link(langCode, "/kits/react/vite"),
					},
					{
						text: "Turbo",
						link: get_i18n_link(langCode, "/kits/react/turbo"),
					},
				],
			},
			{
				text: "Vue",
				link: get_i18n_link(langCode, "/kits/vue/"),
				collapsed: false,
				items: [
					{
						text: "Create Vue",
						link: get_i18n_link(langCode, "/kits/vue/create-vue"),
					},
				],
			},
			{
				text: "Svelte",
				link: get_i18n_link(langCode, "/kits/svelte/"),
				collapsed: false,
				items: [
					{
						text: "Minimal",
						link: get_i18n_link(langCode, "/kits/svelte/minimal"),
					},
					{
						text: "Vite",
						link: get_i18n_link(langCode, "/kits/svelte/vite"),
					},
				],
			},
		],
	},
]

const createSidebars = () => {
	const sidebars = {}
	
	// Create sidebar for each language
	languages.forEach((lang) => {
		sidebars[`/${lang.code === "en" ? "" : lang.code}`] = getI18NSidebar(lang.code)
	})
	
	return sidebars
}

export default createSidebars 