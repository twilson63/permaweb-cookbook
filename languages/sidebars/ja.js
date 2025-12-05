module.exports = [
  {
    text: "はじめに",
    link: "/ja/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "クイックスタート",
        collapsible: true,
        children: [
          {
            text: "CLI",
            link: "/ja/getting-started/quick-starts/hw-cli.html",
          },
          {
            text: "コード",
            link: "/ja/getting-started/quick-starts/hw-code.html",
          },
        ],
      },
    ],
  },
  {
    text: "基礎",
    link: "/ja/fundamentals/index.html",
    collapsible: true,
    children: [
      {
        text: "ウォレットとキー",
        link: "/ja/fundamentals/wallets-and-keyfiles/index.html",
      },
      {
        text: "トランザクション",
        link: "/ja/fundamentals/transactions/index.html",
        collapsible: true,
        children: [
          {
            text: "バンドルトランザクション",
            link: "/ja/fundamentals/transactions/bundles.html",
          },
          {
            text: "トランザクションタグ",
            link: "/ja/fundamentals/transactions/tags.html",
          },
          {
            text: "パスマニフェスト",
            link: "/ja/fundamentals/transactions/manifests.html",
          },
        ],
      },
      {
        text: "ゲートウェイ",
        link: "/ja/fundamentals/gateways/index.html",
        collapsible: true,
        children: [
          {
            text: "データ取得方法",
            collapsible: true,
            link: "/ja/fundamentals/gateways/data-retrieval.html",
            children: [
              {
                text: "HTTP API",
                link: "/ja/fundamentals/gateways/http-api.html",
              },
              {
                text: "Arweave.js SDK",
                link: "/ja/fundamentals/gateways/arweave-js.html",
              },
              {
                text: "ARIO Wayfinder",
                link: "/ja/fundamentals/gateways/wayfinder.html",
              },
            ],
          },
          {
            text: "GraphQL エンドポイント",
            link: "/ja/fundamentals/gateways/graphql.html",
          },
        ],
      },
      {
        text: "分散型コンピューティング",
        link: "/ja/fundamentals/decentralized-computing/index.html",
      },
    ],
  },
  {
    text: "ガイド",
    link: "/ja/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "ウォレットとキー",
        collapsible: true,
        children: [
          {
            text: "ウォレットの生成",
            link: "/ja/guides/wallets-and-keyfiles/creating-a-wallet.html",
          },
        ],
      },
      {
        text: "フロントエンド",
        collapsible: true,
        children: [
          {
            text: "React",
            link: "/ja/kits/react/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite + permaweb-deploy",
                link: "/ja/kits/react/turbo.html",
              },
            ],
          },
          {
            text: "Svelte",
            link: "/ja/kits/svelte/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite",
                link: "/ja/kits/svelte/vite.html",
              },
            ],
          },
          {
            text: "Vue",
            link: "/ja/kits/vue/index.html",
            collapsible: true,
            children: [
              {
                text: "Create Vue App",
                link: "/ja/kits/vue/create-vue.html",
              },
            ],
          },
        ],
      },
      {
        text: "トランザクションの投稿",
        collapsible: true,
        children: [
          {
            text: "Arweave JS",
            link: "/ja/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "Turbo SDK",
            link: "/ja/guides/posting-transactions/turbo.html",
          },
          {
            text: "Dispatch",
            link: "/ja/guides/posting-transactions/dispatch.html",
          },
        ],
      },
      {
        text: "マニフェストとバンドリング",
        collapsible: true,
        children: [
          {
            text: "arweave.app",
            link: "/ja/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ArDrive",
            link: "/ja/guides/deploying-manifests/ardrive.html",
          },
          {
            text: "Turbo",
            link: "/ja/guides/deploying-manifests/turbo",
          },
        ],
      },
      {
        text: "クエリとインデックス作成",
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            link: "/ja/guides/graphql/index.html",
            collapsible: true,
            children: [
              {
                text: "ar-gql（ライブラリ）",
                link: "/ja/guides/graphql/ar-gql.html",
              },
            ],
          },
        ],
      },
      {
        text: "デプロイ",
        collapsible: true,
        children: [
          {
            text: "Permaweb Deploy",
            link: "/ja/guides/deployment/permaweb-deploy.html",
          },
        ],
      },
    ],
  },
  {
    text: "リファレンス",
    link: "/ja/references/index.html",
    collapsible: true,
    children: [
      {
        text: "用語集",
        collapsible: false,
        link: "/ja/references/glossary.html",
      },
      {
        text: "LLMs.txt",
        collapsible: false,
        link: "/ja/references/llms-txt.html",
      },
      {
        text: "コントリビューション",
        link: "/ja/getting-started/contributing.html",
      },
      {
        text: "仕様",
        collapsible: true,
        children: [
          {
            text: "ANS",
            collapsible: true,
            children: [
              {
                text: "ANS-101: ゲートウェイの機能",
                link: "/ja/references/specs/ans/ANS-101.html",
              },
              {
                text: "ANS-102: バンドルデータ - JSON",
                link: "/ja/references/specs/ans/ANS-102.html",
              },
              {
                text: "ANS-103: 簡潔な証明",
                link: "/ja/references/specs/ans/ANS-103.html",
              },
              {
                text: "ANS-104: バンドルデータ - バイナリ",
                link: "/ja/references/specs/ans/ANS-104.html",
              },
              {
                text: "ANS-105: ライセンスタグ",
                link: "/ja/references/specs/ans/ANS-105.html",
              },
              {
                text: "ANS-106: 保存禁止",
                link: "/ja/references/specs/ans/ANS-106.html",
              },
              {
                text: "ANS-109: Vouch-For",
                link: "/ja/references/specs/ans/ANS-109.html",
              },
              {
                text: "ANS-110: アセットの検出性",
                link: "/ja/references/specs/ans/ANS-110.html",
              },
            ],
          },
          {
            text: "ArFS",
            link: "/ja/references/specs/arfs/arfs.html",
            collapsible: true,
            children: [
              {
                text: "データモデル",
                link: "/ja/references/specs/arfs/data-model.html",
              },
              {
                text: "エンティティタイプ",
                link: "/ja/references/specs/arfs/entity-types.html",
              },
              {
                text: "コンテンツタイプ",
                link: "/ja/references/specs/arfs/content-types.html",
              },
              {
                text: "プライバシー",
                link: "/ja/references/specs/arfs/privacy.html",
              },
              {
                text: "スキーマ図",
                link: "/ja/references/specs/arfs/schema-diagrams.html",
              },
            ],
          },
          {
            text: "ArNS",
            link: "/ja/references/arns.html",
          },
        ],
      },
    ],
  },
];