module.exports = [
    {
        text: "はじめに",
        link: "/ja/getting-started/index.html",
        collapsible: true,
        children: [
            {
                text: "ようこそ",
                link: "/ja/getting-started/welcome.html",
            },
            {
                text: "Hello World (ノーコード)",
                link: "/ja/getting-started/quick-starts/hw-no-code.html",
            },
            {
                text: "Hello World (CLI)",
                link: "/ja/getting-started/quick-starts/hw-cli.html",
            },
            {
                text: "貢献",
                link: "/ja/getting-started/contributing.html",
            },
        ],
    },
    {
        text: "概念",
        link: "/ja/concepts/index.html",
        collapsible: true,
        children: [
            {
                text: "トランザクションの投稿",
                link: "/ja/concepts/post-transactions.html",
                collapsible: true,
                children: [
                    {
                        text: "arweave-js",
                        link: "/ja/guides/posting-transactions/arweave-js.html",
                    },
                    {
                        text: "dispatch",
                        link: "/ja/guides/posting-transactions/dispatch.html",
                    },
                    {
                        text: "arseeding-js",
                        link: "/ja/guides/posting-transactions/arseeding-js.html",
                    },
                    {
                        text: "Turbo-SDK",
                        link: "/ja/guides/posting-transactions/turbo.html"
                    },
                ],
            },
            {
                text: "タグ",
                link: "/ja/concepts/tags.html",
            },
            {
                text: "クエリ",
                link: "/ja/concepts/queryTransactions.html",
            },
            {
                text: "データの取得",
                link: "/ja/guides/http-api.html",
            },
            {
                text: "トランザクションタイプ",
                children: [
                    {
                        text: "バンドル",
                        link: "/ja/concepts/bundles.html",
                    },
                    {
                        text: "パスマニフェスト",
                        link: "/ja/concepts/manifests.html",
                    },
                ],
            },
            {
                text: "ウォレットとキー",
                link: "/ja/concepts/keyfiles-and-wallets.html",
            },
            {
                text: "Permaweb",
                link: "/ja/concepts/permaweb.html",
                collapsible: false,
                children: [
                    {
                        text: "Permawebアプリケーション",
                        link: "/ja/concepts/permawebApplications.html",
                    },
                    {
                        text: "ゲートウェイ",
                        link: "/ja/concepts/gateways.html",
                    },
                    {
                        text: "バンドラー",
                        link: "/ja/concepts/bundlers.html",
                    },
                ],
            },
            {
                text: "Arweave File System (ArFS)",
                link: "/ja/concepts/arfs/arfs.html",
                children: [
                    {
                        text: "ArFS",
                        link: "/ja/concepts/arfs/arfs.html",
                    },
                    {
                        text: "Data Model",
                        link: "/ja/concepts/arfs/data-model.html",
                    },
                    {
                        text: "Entity Types",
                        link: "/ja/concepts/arfs/entity-types.html",
                    },
                    {
                        text: "Content Types",
                        link: "/ja/concepts/arfs/content-types.html",
                    },
                    {
                        text: "Privacy",
                        link: "/ja/concepts/arfs/privacy.html",
                    },
                    {
                        text: "Schema Diagrams",
                        link: "/ja/concepts/arfs/schema-diagrams.html",
                    },
                ],
            },
            {
                text: "Vouch",
                link: "/ja/concepts/vouch.html",
            }
        ],
    },
    {
        text: "ガイド",
        link: "/ja/guides/index.html",
        collapsible: true,
        children: [
            {
                text: "ArProfile",
                link: "/ja/guides/arprofile.html",
            },
            {
                text: "DNS統合",
                collapsible: true,
                children: [
                    {
                        text: "サーバーサイド",
                        link: "/ja/guides/dns-integration/server-side.html",
                    },
                    {
                        text: "Spheron",
                        link: "/ja/guides/dns-integration/spheron.html",
                    },
                ],
            },
            {
                text: "アプリのデプロイ",
                collapsible: true,
                children: [
                    {
                        text: "arkb",
                        link: "/ja/guides/deployment/arkb.html",
                    },
                    {
                        text: "GitHubアクション",
                        link: "/ja/guides/deployment/github-action.html",
                    },
                ],
            },
            {
                text: "マニフェストのデプロイ",
                link: "/ja/guides/deploying-manifests/deployingManifests.html",
                collapsible: false,
                children: [
                    {
                        text: "arweave.app",
                        link: "/ja/guides/deploying-manifests/arweave-app.html",
                    },
                    {
                        text: "ardrive",
                        link: "/ja/guides/deploying-manifests/ardrive.html",
                    },
                    {
                        text: "arseeding-js",
                        link: "/ja/guides/deploying-manifests/arseeding-js.html",
                    },
                    {
                        text: "Turbo",
                        link: "/ja/guides/deploying-manifests/turbo",
                    },
                ],
            },
            {
                text: "PSTのデプロイ",
                collapsible: false,
                link: "/ja/guides/deploying-psts.html",
            },
            {
                text: "実行マシン",
                collapsible: true,
                children: [
                    {
                        text: "イントロ",
                        link: "/ja/guides/exm/intro.html",
                    },
                    {
                        text: "APIトークン",
                        link: "/ja/guides/exm/api.html",
                    },
                    {
                        text: "JS SDK",
                        collapsible: true,
                        children: [
                            {
                                text: "SDKイントロ",
                                link: "/ja/guides/exm/js-sdk/sdk-intro.html",
                            },
                            {
                                text: "SDKデプロイ",
                                link: "/ja/guides/exm/js-sdk/sdk-deploy.html",
                            },
                            {
                                text: "SDK書き込み",
                                link: "/ja/guides/exm/js-sdk/sdk-write.html",
                            },
                            {
                                text: "SDK読み取り",
                                link: "/ja/guides/exm/js-sdk/sdk-read.html",
                            },
                        ],
                    },
                ],
            },
            {
                text: "GraphQL",
                link: "/ja/guides/querying-arweave/queryingArweave.html",
                collapsible: false,
                children: [
                    {
                        text: "ArDB",
                        link: "/ja/guides/querying-arweave/ardb.html",
                    },
                    {
                        text: "ar-gql",
                        link: "/ja/guides/querying-arweave/ar-gql.html",
                    },
                    {
                        text: "検索インデックスサービス",
                        link: "/ja/guides/querying-arweave/search-indexing-service.html",
                    },
                ],
            },
            {
                text: "テスト",
                collapsible: true,
                children: [
                    {
                        text: "arlocal",
                        collapsible: false,
                        link: "/ja/guides/testing/arlocal.html",
                    },
                ],
            },
            {
                text: "Vouch",
                link: "/ja/guides/vouch.html",
            },
        ],
    },
    {
        text: "リファレンス",
        link: "/ja/references/index.html",
        collapsible: true,
        children: [
            {
                text: "Bundling",
                collapsible: false,
                link: "/ja/references/bundling.html",
            },
            {
                text: "GraphQL",
                collapsible: false,
                link: "/ja/references/gql.html",
            },
            {
                text: "HTTP API",
                collapsible: false,
                link: "/ja/references/http-api.html",
            },
        ],
    },
    {
        text: "キット",
        link: "/ja/kits/index.html",
        collapsible: true,
        children: [
            {
                text: "React",
                link: "/ja/kits/react/index.html",
            },
            {
                text: "Svelte",
                link: "/ja/kits/svelte/index.html",
            },
            {
                text: "Vue",
                link: "/ja/kits/vue/index.html",
            },
        ],
    },
    {
        text: "コミュニティ",
        link: "/ja/community/index.html",
        collapsible: true,
        children: [
            {
                text: "Arweave Name System (ArNS)",
                link: "/ja/concepts/arns.html",
            },
            {
                text: "アトミックアセット",
                link: "/ja/guides/smartweave/atomic-assets/index.html",
                collapsible: true,
                children: [
                    {
                        text: "using ArDrive CLI",
                        link: "/ja/guides/smartweave/atomic-assets/ardrive-cli.html",
                    }
                ],
            },
        ]
    },
    {
        text: "Legacy",
        link: "/ja/legacy/index.html",
        collapsible: true,
        children: [
            {
                text: "概念",
                collapsible: true,
                children: [
                    {
                        text: "SmartWeave",
                        link: "/ja/concepts/smartweave.html",
                        collapsible: false,
                        children: [
                            {
                                text: "Profit Sharing Tokens (PSTs)",
                                link: "/ja/concepts/psts.html",
                            },
                        ],
                    },
                ]
            },
            {
                text: "ガイド",
                collapsible: true,
                children: [
                    {
                        text: "SmartWeave",
                        collapsible: true,
                        children: [
                            {
                                text: "アトミックトークン",
                                link: "/ja/guides/atomic-tokens/intro.html",
                            },
                            {
                                text: "Warp",
                                collapsible: false,
                                children: [
                                    {
                                        text: "イントロ",
                                        link: "/ja/guides/smartweave/warp/intro.html",
                                    },
                                    {
                                        text: "コントラクトのデプロイ",
                                        link: "/ja/guides/smartweave/warp/deploying-contracts.html",
                                    },
                                    {
                                        text: "状態の読み取り",
                                        link: "/ja/guides/smartweave/warp/readstate.html",
                                    },
                                    {
                                        text: "インタラクションの書き込み",
                                        link: "/ja/guides/smartweave/warp/write-interactions.html",
                                    },
                                    {
                                        text: "Evolve",
                                        link: "/ja/guides/smartweave/warp/evolve.html",
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