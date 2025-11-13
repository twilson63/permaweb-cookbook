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
                    },
                    {
                        text: "arseeding-js",
                        link: "/zh/guides/posting-transactions/arseeding-js.html",
                    },
                    {
                        text: "Turbo-SDK",
                        link: "/zh/guides/posting-transactions/turbo.html"
                    },
                ],
            },
            {
                text: "元数据（标签）",
                link: "/zh/concepts/tags.html",
            },
            {
                text: "查询",
                link: "/zh/concepts/queryTransactions.html",
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
                        link: "/zh/concepts/permawebApplications.html",
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
            {
                text: "Arweave File System (ArFS)",
                link: "/zh/concepts/arfs/arfs.html",
                children: [
                    {
                        text: "ArFS",
                        link: "/zh/concepts/arfs/arfs.html",
                    },
                    {
                        text: "Data Model",
                        link: "/zh/concepts/arfs/data-model.html",
                    },
                    {
                        text: "Entity Types",
                        link: "/zh/concepts/arfs/entity-types.html",
                    },
                    {
                        text: "Content Types",
                        link: "/zh/concepts/arfs/content-types.html",
                    },
                    {
                        text: "Privacy",
                        link: "/zh/concepts/arfs/privacy.html",
                    },
                    {
                        text: "Schema Diagrams",
                        link: "/zh/concepts/arfs/schema-diagrams.html",
                    },
                ],
            },
            {
                text: "担保",
                link: "/zh/concepts/vouch.html",
            }
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
                    },
                ],
            },
            {
                text: "部署路径清单",
                link: "/zh/guides/deploying-manifests/deployingManifests.html",
                collapsible: false,
                children: [
                    {
                        text: "arweave.app",
                        link: "/zh/guides/deploying-manifests/arweave-app.html",
                    },
                    {
                        text: "ardrive",
                        link: "/zh/guides/deploying-manifests/ardrive.html",
                    },
                    {
                        text: "arseeding-js",
                        link: "/zh/guides/deploying-manifests/arseeding-js.html",
                    },
                    {
                        text: "Turbo",
                        link: "/zh/guides/deploying-manifests/turbo",
                    },
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
                link: "/zh/guides/querying-arweave/queryingArweave.html",
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
            {
                text: "Vouch",
                link: "/zh/guides/vouch.html",
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
            },
            {
                text: "Svelte",
                link: "/zh/kits/svelte/index.html",
            },
            {
                text: "Vue",
                link: "/zh/kits/vue/index.html",
            },
        ],
    },
    {
        text: "社区",
        link: "/zh/community/index.html",
        collapsible: true,
        children: [
            {
                text: "Arweave Name System (ArNS)",
                link: "/zh/concepts/arns.html",
            },
            {
                text: "原子资产",
                link: "/zh/guides/smartweave/atomic-assets/index.html",
                collapsible: true,
                children: [
                    {
                        text: "using ArDrive CLI",
                        link: "/zh/guides/smartweave/atomic-assets/ardrive-cli.html",
                    }
                ],
            },
        ]
    },
    {
        text: "Legacy",
        link: "/zh/legacy/index.html",
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
                                text: "原子代币",
                                link: "/zh/guides/atomic-tokens/intro.html",
                            },
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