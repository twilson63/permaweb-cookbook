module.exports = [
  {
    text: "快速开始",
    link: "/zh/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "快速入门",
        collapsible: true,
        children: [
          {
            text: "CLI",
            link: "/zh/getting-started/quick-starts/hw-cli.html",
          },
          {
            text: "代码",
            link: "/zh/getting-started/quick-starts/hw-code.html",
          },
        ],
      },
    ],
  },
  {
    text: "基础",
    link: "/zh/fundamentals/index.html",
    collapsible: true,
    children: [
      {
        text: "钱包与密钥文件",
        link: "/zh/fundamentals/wallets-and-keyfiles/index.html",
      },
      {
        text: "交易",
        link: "/zh/fundamentals/transactions/index.html",
        collapsible: true,
        children: [
          {
            text: "交易打包",
            link: "/zh/fundamentals/transactions/bundles.html",
          },
          {
            text: "交易标签",
            link: "/zh/fundamentals/transactions/tags.html",
          },
          {
            text: "路径清单",
            link: "/zh/fundamentals/transactions/manifests.html",
          },
        ],
      },
      {
        text: "网关",
        link: "/zh/fundamentals/gateways/index.html",
        collapsible: true,
        children: [
          {
            text: "数据检索方法",
            collapsible: true,
            link: "/zh/fundamentals/gateways/data-retrieval.html",
            children: [
              {
                text: "HTTP API",
                link: "/zh/fundamentals/gateways/http-api.html",
              },
              {
                text: "Arweave.js SDK",
                link: "/zh/fundamentals/gateways/arweave-js.html",
              },
              {
                text: "ARIO Wayfinder",
                link: "/zh/fundamentals/gateways/wayfinder.html",
              },
            ],
          },
          {
            text: "GraphQL 端点",
            link: "/zh/fundamentals/gateways/graphql.html",
          },
        ],
      },
      {
        text: "去中心化计算",
        link: "/zh/fundamentals/decentralized-computing/index.html",
      },
    ],
  },
  {
    text: "指南",
    link: "/zh/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "钱包与密钥文件",
        collapsible: true,
        children: [
          {
            text: "创建钱包",
            link: "/zh/guides/wallets-and-keyfiles/creating-a-wallet.html",
          },
        ],
      },
      {
        text: "前端",
        collapsible: true,
        children: [
          {
            text: "React",
            link: "/zh/kits/react/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite + permaweb-deploy",
                link: "/zh/kits/react/turbo.html",
              },
            ],
          },
          {
            text: "Svelte",
            link: "/zh/kits/svelte/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite",
                link: "/zh/kits/svelte/vite.html",
              },
            ],
          },
          {
            text: "Vue",
            link: "/zh/kits/vue/index.html",
            collapsible: true,
            children: [
              {
                text: "创建 Vue 应用程序",
                link: "/zh/kits/vue/create-vue.html",
              },
            ],
          },
        ],
      },
      {
        text: "发布交易",
        collapsible: true,
        children: [
          {
            text: "Arweave JS",
            link: "/zh/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "Turbo SDK",
            link: "/zh/guides/posting-transactions/turbo.html",
          },
          {
            text: "Dispatch",
            link: "/zh/guides/posting-transactions/dispatch.html",
          },
        ],
      },
      {
        text: "清单与打包",
        collapsible: true,
        children: [
          {
            text: "arweave.app",
            link: "/zh/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ArDrive",
            link: "/zh/guides/deploying-manifests/ardrive.html",
          },
          {
            text: "Turbo",
            link: "/zh/guides/deploying-manifests/turbo",
          },
        ],
      },
      {
        text: "查询与索引",
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            link: "/zh/guides/graphql/index.html",
            collapsible: true,
            children: [
              {
                text: "ar-gql（库）",
                link: "/zh/guides/graphql/ar-gql.html",
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
            link: "/zh/guides/deployment/permaweb-deploy.html",
          },
        ],
      },
    ],
  },
  {
    text: "参考",
    link: "/zh/references/index.html",
    collapsible: true,
    children: [
      {
        text: "词汇表",
        collapsible: false,
        link: "/zh/references/glossary.html",
      },
      {
        text: "LLMs.txt",
        collapsible: false,
        link: "/zh/references/llms-txt.html",
      },
      {
        text: "贡献",
        link: "/zh/getting-started/contributing.html",
      },
      {
        text: "规范",
        collapsible: true,
        children: [
          {
            text: "ANS",
            collapsible: true,
            children: [
              {
                text: "ANS-101: Gateway Capabilities",
                link: "/zh/references/specs/ans/ANS-101.html",
              },
              {
                text: "ANS-102: Bundled Data - JSON",
                link: "/zh/references/specs/ans/ANS-102.html",
              },
              {
                text: "ANS-103: Succinct Proofs",
                link: "/zh/references/specs/ans/ANS-103.html",
              },
              {
                text: "ANS-104: Bundled Data - Binary",
                link: "/zh/references/specs/ans/ANS-104.html",
              },
              {
                text: "ANS-105: License Tags",
                link: "/zh/references/specs/ans/ANS-105.html",
              },
              {
                text: "ANS-106: Do-Not-Store",
                link: "/zh/references/specs/ans/ANS-106.html",
              },
              {
                text: "ANS-109: Vouch-For",
                link: "/zh/references/specs/ans/ANS-109.html",
              },
              {
                text: "ANS-110: Asset Discoverability",
                link: "/zh/references/specs/ans/ANS-110.html",
              },
            ],
          },
          {
            text: "ArFS",
            link: "/zh/references/specs/arfs/arfs.html",
            collapsible: true,
            children: [
              {
                text: "数据模型",
                link: "/zh/references/specs/arfs/data-model.html",
              },
              {
                text: "实体类型",
                link: "/zh/references/specs/arfs/entity-types.html",
              },
              {
                text: "内容类型",
                link: "/zh/references/specs/arfs/content-types.html",
              },
              {
                text: "隐私",
                link: "/zh/references/specs/arfs/privacy.html",
              },
              {
                text: "架构图",
                link: "/zh/references/specs/arfs/schema-diagrams.html",
              },
            ],
          },
          {
            text: "ArNS",
            link: "/zh/references/arns.html",
          },
        ],
      },
    ],
  },
];