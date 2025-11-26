module.exports = [
  {
    text: "開始使用",
    link: "/zhTW/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "快速開始",
        collapsible: true,
        children: [
          {
            text: "CLI",
            link: "/zhTW/getting-started/quick-starts/hw-cli.html",
          },
          {
            text: "程式碼",
            link: "/zhTW/getting-started/quick-starts/hw-code.html",
          },
        ],
      },
    ],
  },
  {
    text: "基礎知識",
    link: "/zhTW/fundamentals/index.html",
    collapsible: true,
    children: [
      {
        text: "錢包與金鑰",
        link: "/zhTW/fundamentals/wallets-and-keyfiles/index.html",
      },
      {
        text: "交易",
        link: "/zhTW/fundamentals/transactions/index.html",
        collapsible: true,
        children: [
          {
            text: "打包交易",
            link: "/zhTW/fundamentals/transactions/bundles.html",
          },
          {
            text: "交易標籤",
            link: "/zhTW/fundamentals/transactions/tags.html",
          },
          {
            text: "路徑清單",
            link: "/zhTW/fundamentals/transactions/manifests.html",
          },
        ],
      },
      {
        text: "閘道",
        link: "/zhTW/fundamentals/gateways/index.html",
        collapsible: true,
        children: [
          {
            text: "資料擷取方法",
            collapsible: true,
            link: "/zhTW/fundamentals/gateways/data-retrieval.html",
            children: [
              {
                text: "HTTP API",
                link: "/zhTW/fundamentals/gateways/http-api.html",
              },
              {
                text: "Arweave.js SDK",
                link: "/zhTW/fundamentals/gateways/arweave-js.html",
              },
              {
                text: "ARIO Wayfinder",
                link: "/zhTW/fundamentals/gateways/wayfinder.html",
              },
            ],
          },
          {
            text: "GraphQL 端點",
            link: "/zhTW/fundamentals/gateways/graphql.html",
          },
        ],
      },
      {
        text: "去中心化運算",
        link: "/zhTW/fundamentals/decentralized-computing/index.html",
      },
    ],
  },
  {
    text: "教學指南",
    link: "/zhTW/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "錢包與金鑰",
        collapsible: true,
        children: [
          {
            text: "建立錢包",
            link: "/zhTW/guides/wallets-and-keyfiles/creating-a-wallet.html",
          },
        ],
      },
      {
        text: "前端",
        collapsible: true,
        children: [
          {
            text: "React",
            link: "/zhTW/kits/react/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite + permaweb-deploy",
                link: "/zhTW/kits/react/turbo.html",
              },
            ],
          },
          {
            text: "Svelte",
            link: "/zhTW/kits/svelte/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite",
                link: "/zhTW/kits/svelte/vite.html",
              },
            ],
          },
          {
            text: "Vue",
            link: "/zhTW/kits/vue/index.html",
            collapsible: true,
            children: [
              {
                text: "建立 Vue 應用程式",
                link: "/zhTW/kits/vue/create-vue.html",
              },
            ],
          },
        ],
      },
      {
        text: "發佈交易",
        collapsible: true,
        children: [
          {
            text: "Arweave JS",
            link: "/zhTW/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "Turbo SDK",
            link: "/zhTW/guides/posting-transactions/turbo.html",
          },
          {
            text: "Dispatch",
            link: "/zhTW/guides/posting-transactions/dispatch.html",
          },
        ],
      },
      {
        text: "清單與打包",
        collapsible: true,
        children: [
          {
            text: "arweave.app",
            link: "/zhTW/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ArDrive",
            link: "/zhTW/guides/deploying-manifests/ardrive.html",
          },
          {
            text: "Turbo",
            link: "/zhTW/guides/deploying-manifests/turbo",
          },
        ],
      },
      {
        text: "查詢與索引",
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            link: "/zhTW/guides/graphql/index.html",
            collapsible: true,
            children: [
              {
                text: "ar-gql（函式庫）",
                link: "/zhTW/guides/graphql/ar-gql.html",
              },
            ],
          },
        ],
      },
      {
        text: "部署",
        collapsible: true,
        children: [
          {
            text: "Permaweb Deploy",
            link: "/zhTW/guides/deployment/permaweb-deploy.html",
          },
        ],
      },
    ],
  },
  {
    text: "參考資料",
    link: "/zhTW/references/index.html",
    collapsible: true,
    children: [
      {
        text: "術語表",
        collapsible: false,
        link: "/zhTW/references/glossary.html",
      },
      {
        text: "LLMs.txt",
        collapsible: false,
        link: "/zhTW/references/llms-txt.html",
      },
      {
        text: "貢獻",
        link: "/zhTW/getting-started/contributing.html",
      },
      {
        text: "規格",
        collapsible: true,
        children: [
          {
            text: "ANS",
            collapsible: true,
            children: [
              {
                text: "ANS-101: Gateway Capabilities",
                link: "/zhTW/references/specs/ans/ANS-101.html",
              },
              {
                text: "ANS-102: Bundled Data - JSON",
                link: "/zhTW/references/specs/ans/ANS-102.html",
              },
              {
                text: "ANS-103: Succinct Proofs",
                link: "/zhTW/references/specs/ans/ANS-103.html",
              },
              {
                text: "ANS-104: Bundled Data - Binary",
                link: "/zhTW/references/specs/ans/ANS-104.html",
              },
              {
                text: "ANS-105: License Tags",
                link: "/zhTW/references/specs/ans/ANS-105.html",
              },
              {
                text: "ANS-106: Do-Not-Store",
                link: "/zhTW/references/specs/ans/ANS-106.html",
              },
              {
                text: "ANS-109: Vouch-For",
                link: "/zhTW/references/specs/ans/ANS-109.html",
              },
              {
                text: "ANS-110: Asset Discoverability",
                link: "/zhTW/references/specs/ans/ANS-110.html",
              },
            ],
          },
          {
            text: "ArFS",
            link: "/zhTW/references/specs/arfs/arfs.html",
            collapsible: true,
            children: [
              {
                text: "資料模型",
                link: "/zhTW/references/specs/arfs/data-model.html",
              },
              {
                text: "實體類型",
                link: "/zhTW/references/specs/arfs/entity-types.html",
              },
              {
                text: "內容類型",
                link: "/zhTW/references/specs/arfs/content-types.html",
              },
              {
                text: "隱私",
                link: "/zhTW/references/specs/arfs/privacy.html",
              },
              {
                text: "架構圖",
                link: "/zhTW/references/specs/arfs/schema-diagrams.html",
              },
            ],
          },
          {
            text: "ArNS",
            link: "/zhTW/references/arns.html",
          },
        ],
      },
    ],
  },
];