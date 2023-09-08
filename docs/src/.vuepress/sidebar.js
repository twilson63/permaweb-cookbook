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
        text: get_i18n_str(langCode, "getting-started-hw-no-code", "Hello World (No Code)"),
        link: get_i18n_link(langCode, "/getting-started/quick-starts/hw-no-code"),
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
        collapsible: false,
        children: [
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
        text: "SmartWeave",
        link: get_i18n_link(langCode, "/concepts/smartweave"),
        collapsible: false,
        children: [
          {
            text: "Arweave Name System (ArNS)",
            link: get_i18n_link(langCode, "/concepts/arns"),
          },
          {
            text: get_i18n_str(langCode, "concepts-atomic-tokens"),
            link: get_i18n_link(langCode, "/concepts/atomic-tokens.md"),
          },
          {
            text: "Profit Sharing Tokens (PSTs)",
            link: get_i18n_link(langCode, "/concepts/psts"),
          },
          {
            text: get_i18n_str(langCode, "concepts-vouch"),
            link: get_i18n_link(langCode, "/concepts/vouch"),
          },
        ],
      },
    ],
  },
  {
    text: get_i18n_str(langCode, "guides"),
    link: get_i18n_link(langCode, "/guides/"),
    collapsible: true,
    children: [
      {
        text: get_i18n_str(langCode, "guides-arprofile"),
        link: get_i18n_link(langCode, "/guides/arprofile"),
      },
      {
        text: get_i18n_str(langCode, "guides-dns-integration"),
        collapsible: true,
        children: [
          {
            text: get_i18n_str(langCode, "guides-server-side"),
            link: get_i18n_link(langCode, "/guides/dns-integration/server-side"),
          },
          {
            text: get_i18n_str(langCode, "guides-spheron"),
            link: get_i18n_link(langCode, "/guides/dns-integration/spheron"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "guides-deploying-apps"),
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
            text: get_i18n_str(langCode, "guides-github-action"),
            link: get_i18n_link(langCode, "/guides/deployment/github-action"),
          },
        ],
      },
      {
        text: get_i18n_str(langCode, "guides-deploying-manifests"),
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
        text: get_i18n_str(langCode, "guides-deploying-psts"),
        collapsible: false,
        link: get_i18n_link(langCode, "/guides/deploying-psts"),
      },
      {
        text: get_i18n_str(langCode, "guides-execution-machine"),
        collapsible: true,
        children: [
          {
            text: get_i18n_str(langCode, "guides-intro"),
            link: get_i18n_link(langCode, "/guides/exm/intro.md"),
          },
          {
            text: get_i18n_str(langCode, "guides-api-token"),
            link: get_i18n_link(langCode, "/guides/exm/api.md"),
          },
          {
            text: "JS SDK",
            collapsible: true,
            children: [
              {
                text: get_i18n_str(langCode, "guides-sdk-intro"),
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-intro.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-sdk-deploy"),
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-deploy.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-sdk-write"),
                link: get_i18n_link(langCode, "/guides/exm/js-sdk/sdk-write.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-sdk-read"),
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
            text: get_i18n_str(langCode, "guides-search-indexing-service"),
            link: get_i18n_link(langCode, "/guides/querying-arweave/search-indexing-service"),
          },
        ],
      },
      {
        text: "SmartWeave",
        collapsible: true,
        children: [
          {
            text: get_i18n_str(langCode, "guides-atomic-token"),
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
                text: get_i18n_str(langCode, "guides-intro"),
                link: get_i18n_link(langCode, "/guides/smartweave/warp/intro.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-warp-deploying-contracts"),
                link: get_i18n_link(langCode, "/guides/smartweave/warp/deploying-contracts.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-warp-read-state"),
                link: get_i18n_link(langCode, "/guides/smartweave/warp/readstate.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-warp-write-interactions"),
                link: get_i18n_link(langCode, "/guides/smartweave/warp/write-interactions.md"),
              },
              {
                text: get_i18n_str(langCode, "guides-warp-evolve"),
                link: get_i18n_link(langCode, "/guides/smartweave/warp/evolve.md"),
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
            link: get_i18n_link(langCode, "/guides/testing/arlocal"),
          },
        ],
      },
    ],
  },
  {
    text: get_i18n_str(langCode, "references"),
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
    text: get_i18n_str(langCode, "kits"),
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