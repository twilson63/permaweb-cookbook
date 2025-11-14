module.exports = [
  {
    text: "入门指南",
    link: "/zh/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "欢迎",
        link: "/zh/getting-started/welcome.html",
      },
      {
        text: "Hello World (无代码)",
        link: "/zh/getting-started/quick-starts/hw-no-code.html",
      },
      {
        text: "Hello World (命令行)",
        link: "/zh/getting-started/quick-starts/hw-cli.html",
      },
      {
        text: "Hello World (代码)",
        link: "/zh/getting-started/quick-starts/hw-code.html",
      },
      {
        text: "Hello World (NodeJS)",
        link: "/zh/getting-started/quick-starts/hw-nodejs.html",
      },
      {
        text: "贡献",
        link: "/zh/getting-started/contributing.html",
      },
    ],
  },
  {
    text: "核心概念",
    link: "/zh/concepts/index.html",
    collapsible: true,
    children: [
      {
        text: "发布交易",
        link: "/zh/concepts/post-transactions.html",
        collapsible: true,
        children: [
          {
            text: "arweave-js",
            link: "/zh/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "dispatch",
            link: "/zh/guides/posting-transactions/dispatch.html",
          }
        ],
      },
      {
        text: "元数据（标签）",
        link: "/zh/concepts/tags.html",
      },
      {
        text: "查询",
        link: "/zh/concepts/query-transactions.html",
      },
      {
        text: "获取数据",
        link: "/zh/guides/http-api.html",
      },
      {
        text: "交易类型",
        children: [
          {
            text: "捆绑",
            link: "/zh/concepts/bundles.html",
          },
          {
            text: "路径清单",
            link: "/zh/concepts/manifests.html",
          },
        ],
      },
      {
        text: "钱包和密钥",
        link: "/zh/concepts/keyfiles-and-wallets.html",
      },
      {
        text: "Permaweb",
        link: "/zh/concepts/permaweb.html",
        collapsible: false,
        children: [
          {
            text: "Permaweb 应用",
            link: "/zh/concepts/permaweb-applications.html",
          },
          {
            text: "网关服务",
            link: "/zh/concepts/gateways.html",
          },
          {
            text: "捆绑服务",
            link: "/zh/concepts/bundlers.html",
          },
        ],
      },
    ],
  },
  {
    text: "指南",
    link: "/zh/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "ArProfile",
        link: "/zh/guides/arprofile.html",
      },
      {
        text: "DNS集成",
        collapsible: true,
        children: [
          {
            text: "服务端",
            link: "/zh/guides/dns-integration/server-side.html",
          },
          {
            text: "Spheron",
            link: "/zh/guides/dns-integration/spheron.html",
          },
        ],
      },
      {
        text: "部署应用",
        collapsible: true,
        children: [
          {
            text: "arkb",
            link: "/zh/guides/deployment/arkb.html",
          },
          {
            text: "Github 行动",
            link: "/zh/guides/deployment/github-action.html",
          }
        ],
      },
      {
        text: "部署路径清单",
        link: "/zh/guides/deploying-manifests/deploying-manifests.html",
        collapsible: false,
        children: [
          {
            text: "arweave.app",
            link: "/zh/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ardrive",
            link: "/zh/guides/deploying-manifests/ardrive.html",
          }
        ],
      },
      {
        text: "部署PSTs",
        collapsible: false,
        link: "/zh/guides/deploying-psts.html",
      },
      {
        text: "执行机制",
        collapsible: true,
        children: [
          {
            text: "介绍",
            link: "/zh/guides/exm/intro.html",
          },
          {
            text: "Api令牌",
            link: "/zh/guides/exm/api.html",
          },
          {
            text: "JS SDK",
            collapsible: true,
            children: [
              {
                text: "执行机器 SDK",
                link: "/zh/guides/exm/js-sdk/sdk-intro.html",
              },
              {
                text: "使用 SDK 进行部署",
                link: "/zh/guides/exm/js-sdk/sdk-deploy.html",
              },
              {
                text: "使用 SDK 编写",
                link: "/zh/guides/exm/js-sdk/sdk-write.html",
              },
              {
                text: "使用 SDK 阅读",
                link: "/zh/guides/exm/js-sdk/sdk-read.html",
              },
            ],
          },
        ],
      },
      {
        text: "GraphQL",
        link: "/zh/guides/querying-arweave/querying-arweave.html",
        collapsible: false,
        children: [
          {
            text: "ArDB",
            link: "/zh/guides/querying-arweave/ardb.html",
          },
          {
            text: "ar-gql",
            link: "/zh/guides/querying-arweave/ar-gql.html",
          },
          {
            text: "搜索索引服务",
            link: "/zh/guides/querying-arweave/search-indexing-service.html",
          },
        ],
      },
      {
        text: "测试",
        collapsible: true,
        children: [
          {
            text: "arlocal",
            collapsible: false,
            link: "/zh/guides/testing/arlocal.html",
          },
        ],
      },
    ],
  },
  {
    text: "参考资料",
    link: "/zh/references/index.html",
    collapsible: true,
    children: [
      {
        text: "Bundling",
        collapsible: false,
        link: "/zh/references/bundling.html",
      },
      {
        text: "GraphQL",
        collapsible: false,
        link: "/zh/references/gql.html",
      },
      {
        text: "HTTP API",
        collapsible: false,
        link: "/zh/references/http-api.html",
      },
    ],
  },
  {
    text: "入门套件",
    link: "/zh/kits/index.html",
    collapsible: true,
    children: [
      {
        text: "React",
        link: "/zh/kits/react/index.html",
        collapsible: true,
        children: [
          {
            text: "Create React App",
            link: "/zh/kits/react/create-react-app.html",
          },
          {
            text: "Vite",
            link: "/zh/kits/react/vite.html",
          },
        ],
      },
      {
        text: "Svelte",
        link: "/zh/kits/svelte/index.html",
        collapsible: true,
        children: [
          {
            text: "Minimal",
            link: "/zh/kits/svelte/minimal.html",
          },
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
            text: "Create Vue",
            link: "/zh/kits/vue/create-vue.html",
          },
        ],
      },
    ],
  },
  {
    text: "社区",
    collapsible: true,
    children: [
      {
        text: "Arweave Name System (ArNS)",
        link: "/zh/concepts/arns.html",
      },
      {
        text: "原子代币",
        link: "/zh/guides/atomic-tokens/intro.html",
      },
    ]
  },
  {
    text: "Legacy",
    collapsible: true,
    children: [
      {
        text: "Concepts",
        collapsible: true,
        children: [
          {
            text: "SmartWeave",
            link: "/zh/concepts/smartweave.html",
            collapsible: false,
            children: [
              {
                text: "Profit Sharing Tokens (PSTs)",
                link: "/zh/concepts/psts.html",
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
                text: "Warp",
                collapsible: false,
                children: [
                  {
                    text: "介绍",
                    link: "/zh/guides/smartweave/warp/intro.html",
                  },
                  {
                    text: "部署合约",
                    link: "/zh/guides/smartweave/warp/deploying-contracts.html",
                  },
                  {
                    text: "读取合约状态",
                    link: "/zh/guides/smartweave/warp/readstate.html",
                  },
                  {
                    text: "编写合约互动",
                    link: "/zh/guides/smartweave/warp/write-interactions.html",
                  },
                  {
                    text: "演化合约",
                    link: "/zh/guides/smartweave/warp/evolve.html",
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