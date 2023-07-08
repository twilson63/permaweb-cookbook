const { get_i18n_str, languages } = require("../../languages/def");

const get_i18n_link = (code, link) => `${code === "en" ? '' : '/' + code}${link}`;

const getI18NSidebar = (langCode) => [
  {
    text: get_i18n_str(langCode, "getting-started", "Getting Started"),
    link: get_i18n_link(langCode, "/getting-started/"),
    collapsible: true,
    children: [
      {
        text: get_i18n_str(langCode, "getting-started-welcome", "Welcome"),
        link: get_i18n_link(langCode, "/getting-started/welcome"),
      },
      {
        text: get_i18n_str(langCode, "getting-started-hw-cli", "Hello World (CLI)"),
        link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-cli"),
      },
      {
        text: get_i18n_str(langCode, "getting-started-hw-code", "Hello World (With Code)"),
        link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-code"),
      },
      {
        text: get_i18n_str(langCode, "getting-started-hw-node", "Hello World (Nodejs)"),
        link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-nodejs"),
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
    collapsible: true,
    children: [
      {
        text: get_i18n_str(langCode, "concepts-post-transactions"),
        link: get_i18n_link(langCode, "/concepts/post-transactions"),
        collapsible: true,
        children: [
          {
            text: "arweave-js",
            link: get_i18n_link(langCode, "/guides/posting-transactions/arweave-js"),
          },
          {
            text: "bundlr.network",
            link: get_i18n_link(langCode, "/guides/posting-transactions/bundlr"),
          },
          {
            text: "dispatch",
            link: get_i18n_link(langCode, "/guides/posting-transactions/dispatch"),
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
        link: get_i18n_link(langCode, "/guides/http-api.md"),
      },
      {
        text: get_i18n_str(langCode, "concepts-transaction-types"),
        children: [
          {
            text: get_i18n_str(langCode, "concepts-bundles"),
            link: get_i18n_link(langCode, "/concepts/bundles"),
          },
          {
            text: get_i18n_str(langCode, "concepts-path-manifests"),
            link:get_i18n_link(langCode, "/concepts/manifests"),
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
        collapsible: false,
        children: [
          {
            text: "Permaweb Applications",
            link: get_i18n_link(langCode, "/concepts/permawebApplications"),
          },
          {
            text: "Gateway Services",
            link: get_i18n_link(langCode, "/concepts/gateways"),
          },
          {
            text: "Bundling Services",
            link: get_i18n_link(langCode, "/concepts/bundlers"),
          },
        ],
      },
      {
        text: "SmartWeave",
        link: get_i18n_link(langCode, "/concepts/smartweave"),
        collapsible: false,
        children: [
          {
            text: "Arweave Name System (ArNS)",
            link: get_i18n_link(langCode, "/concepts/arns"),
          },
          {
            text: "Atomic Tokens",
            link: get_i18n_link(langCode, "/concepts/atomic-tokens.md"),
          },
          {
            text: "Profit Sharing Tokens (PSTs)",
            link: get_i18n_link(langCode, "/concepts/psts"),
          },
          {
            text: "Vouch",
            link: get_i18n_link(langCode, "/concepts/vouch"),
          },
        ],
      },
    ],
  },
  {
    text: "Guides",
    link: get_i18n_link(langCode, "/guides/"),
    collapsible: true,
    children: [
      {
        text: "ArProfile",
        link: get_i18n_link(langCode, "/guides/arprofile"),
      },
      {
        text: "DNS Integration",
        collapsible: true,
        children: [
          {
            text: "Server Side",
            link: get_i18n_link(langCode, "/guides/dns-integration/server-side"),
          },
          {
            text: "Spheron",
            link: get_i18n_link(langCode, "/guides/dns-integration/spheron"),
          },
        ],
      },
      {
        text: `Deploying Apps`,
        collapsible: true,
        children: [
          {
            text: "arkb",
            link: get_i18n_link(langCode, "/guides/deployment/arkb"),
          },
          {
            text: "Bundlr",
            link: get_i18n_link(langCode, "/guides/deployment/bundlr-cli"),
          },
          {
            text: "Github Action",
            link: get_i18n_link(langCode, "/guides/deployment/github-action"),
          },
        ],
      },
      {
        text: `Deploying PathManifests`,
        link: get_i18n_link(langCode, "/guides/deploying-manifests/deployingManifests"),
        collapsible: false,
        children: [
          {
            text: "arweave.app",
            link: get_i18n_link(langCode, "/guides/deploying-manifests/arweave-app"),
          },
          {
            text: "ardrive",
            link: get_i18n_link(langCode, "/guides/deploying-manifests/ardrive"),
          },
          {
            text: "bundlr.network",
            link: get_i18n_link(langCode, "/guides/deploying-manifests/bundlr"),
          },
        ],
      },
      {
        text: "Deploying PSTs",
        collapsible: false,
        link: get_i18n_link(langCode, "/guides/deploying-psts"),
      },
      {
        text: "Execution Machine",
        collapsible: true,
        children: [
          {
            text: "Introduction",
            link: get_i18n_link(langCode, "/guides/exm/intro.md"),
          },
          {
            text: "API Token",
            link: get_i18n_link(langCode, "/guides/exm/api.md"),
          },
          {
            text: "JS SDK",
            collapsible: true,
            children: [
              {
                text: "Execution Machine SDK",
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-intro.md"),
              },
              {
                text: "Deploy with SDK",
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-deploy.md"),
              },
              {
                text: "Write with SDK",
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-write.md"),
              },
              {
                text: "Read with SDK",
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-read.md"),
              },
            ],
          },
        ],
      },
      {
        text: "GraphQL",
        link: get_i18n_link(langCode, "/guides/querying-arweave/queryingArweave"),
        collapsible: false,
        children: [
          {
            text: "ArDB",
            link: get_i18n_link(langCode, "/guides/querying-arweave/ardb"),
          },
          {
            text: "ar-gql",
            link: get_i18n_link(langCode, "/guides/querying-arweave/ar-gql"),
          },
          {
            text: "Search Indexing Service",
            link: get_i18n_link(langCode, "/guides/querying-arweave/search-indexing-service"),
          },
        ],
      },
      {
        text: "SmartWeave",
        collapsible: true,
        children: [
          {
            text: "Atomic Tokens",
            link: get_i18n_link(langCode, "/guides/atomic-tokens/intro"),
          },
          {
            text: "Vouch",
            link: get_i18n_link(langCode, "/guides/vouch"),
          },
          {
            text: "Warp",
            collapsible: false,
            children: [
              {
                text: "Intro",
                link: get_i18n_link(langCode, "/guides/smartweave/warp/intro.md"),
              },
              {
                text: "Deploying Contracts",
                link: get_i18n_link(langCode, "/guides/smartweave/warp/deploying-contracts.md"),
              },
              {
                text: "Read Contract State",
                link: get_i18n_link(langCode, "/guides/smartweave/warp/readstate.md"),
              },
              {
                text: "Write Contract Interactions",
                link: get_i18n_link(langCode, "/guides/smartweave/warp/write-interactions.md"),
              },
              {
                text: "Evolve Contract",
                link: get_i18n_link(langCode, "/guides/smartweave/warp/evolve.md"),
              },
            ],
          },
        ],
      },
      {
        text: `Testing`,
        collapsible: true,
        children: [
          {
            text: "arlocal",
            collapsible: false,
            link: get_i18n_link(langCode, "/guides/testing/arlocal"),
          },
        ],
      },
    ],
  },
  {
    text: "References",
    link: get_i18n_link(langCode, "/references/"),
    collapsible: true,
    children: [
      {
        text: "Bundling",
        collapsible: false,
        link: get_i18n_link(langCode, "/references/bundling"),
      },
      {
        text: "GraphQL",
        collapsible: false,
        link: get_i18n_link(langCode, "/references/gql"),
      },
      {
        text: "HTTP API",
        collapsible: false,
        link: get_i18n_link(langCode, "/references/http-api"),
      },
    ],
  },
  {
    text: "Starter Kits",
    link: get_i18n_link(langCode, "/kits/"),
    collapsible: true,
    children: [
      {
        text: "React",
        link: get_i18n_link(langCode, "/kits/react/"),
      },
      {
        text: "Svelte",
        link: get_i18n_link(langCode, "/kits/svelte/"),
      },
      {
        text: "Vue",
        link: get_i18n_link(langCode, "/kits/vue/"),
      },
    ],
  },
];

const createSidebars = () => {
  return languages.reduce((sidebars, { code }) => {
    sidebars[`/${code}/`] = getI18NSidebar(code);
    return sidebars;
  }, {
    "/": getI18NSidebar("en")
  });
}

module.exports = createSidebars;