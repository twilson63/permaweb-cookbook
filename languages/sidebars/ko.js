module.exports = [
  {
    text: "시작하기",
    link: "/ko/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "빠른 시작",
        collapsible: true,
        children: [
          {
            text: "CLI",
            link: "/ko/getting-started/quick-starts/hw-cli.html",
          },
          {
            text: "코드",
            link: "/ko/getting-started/quick-starts/hw-code.html",
          },
        ],
      },
    ],
  },
  {
    text: "기본 개념",
    link: "/ko/fundamentals/index.html",
    collapsible: true,
    children: [
      {
        text: "지갑 및 키파일",
        link: "/ko/fundamentals/wallets-and-keyfiles/index.html",
      },
      {
        text: "트랜잭션",
        link: "/ko/fundamentals/transactions/index.html",
        collapsible: true,
        children: [
          {
            text: "번들 트랜잭션",
            link: "/ko/fundamentals/transactions/bundles.html",
          },
          {
            text: "트랜잭션 태그",
            link: "/ko/fundamentals/transactions/tags.html",
          },
          {
            text: "경로 매니페스트",
            link: "/ko/fundamentals/transactions/manifests.html",
          },
        ],
      },
      {
        text: "게이트웨이",
        link: "/ko/fundamentals/gateways/index.html",
        collapsible: true,
        children: [
          {
            text: "데이터 검색 방법",
            collapsible: true,
            link: "/ko/fundamentals/gateways/data-retrieval.html",
            children: [
              {
                text: "HTTP API",
                link: "/ko/fundamentals/gateways/http-api.html",
              },
              {
                text: "Arweave.js SDK",
                link: "/ko/fundamentals/gateways/arweave-js.html",
              },
              {
                text: "ARIO Wayfinder",
                link: "/ko/fundamentals/gateways/wayfinder.html",
              },
            ],
          },
          {
            text: "GraphQL 엔드포인트",
            link: "/ko/fundamentals/gateways/graphql.html",
          },
        ],
      },
      {
        text: "탈중앙화 컴퓨팅",
        link: "/ko/fundamentals/decentralized-computing/index.html",
      },
    ],
  },
  {
    text: "가이드",
    link: "/ko/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "지갑 및 키파일",
        collapsible: true,
        children: [
          {
            text: "지갑 생성",
            link: "/ko/guides/wallets-and-keyfiles/creating-a-wallet.html",
          },
        ],
      },
      {
        text: "프론트엔드",
        collapsible: true,
        children: [
          {
            text: "React",
            link: "/ko/kits/react/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite + permaweb-deploy",
                link: "/ko/kits/react/turbo.html",
              },
            ],
          },
          {
            text: "Svelte",
            link: "/ko/kits/svelte/index.html",
            collapsible: true,
            children: [
              {
                text: "Vite",
                link: "/ko/kits/svelte/vite.html",
              },
            ],
          },
          {
            text: "Vue",
            link: "/ko/kits/vue/index.html",
            collapsible: true,
            children: [
              {
                text: "Create Vue App",
                link: "/ko/kits/vue/create-vue.html",
              },
            ],
          },
        ],
      },
      {
        text: "트랜잭션 전송",
        collapsible: true,
        children: [
          {
            text: "Arweave JS",
            link: "/ko/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "Turbo SDK",
            link: "/ko/guides/posting-transactions/turbo.html",
          },
          {
            text: "Dispatch",
            link: "/ko/guides/posting-transactions/dispatch.html",
          },
        ],
      },
      {
        text: "매니페스트 및 번들링",
        collapsible: true,
        children: [
          {
            text: "arweave.app",
            link: "/ko/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ArDrive",
            link: "/ko/guides/deploying-manifests/ardrive.html",
          },
          {
            text: "Turbo",
            link: "/ko/guides/deploying-manifests/turbo",
          },
        ],
      },
      {
        text: "쿼리 및 인덱싱",
        collapsible: true,
        children: [
          {
            text: "GraphQL",
            link: "/ko/guides/graphql/index.html",
            collapsible: true,
            children: [
              {
                text: "ar-gql (라이브러리)",
                link: "/ko/guides/graphql/ar-gql.html",
              },
            ],
          },
        ],
      },
      {
        text: "배포",
        collapsible: true,
        children: [
          {
            text: "Permaweb Deploy",
            link: "/ko/guides/deployment/permaweb-deploy.html",
          },
        ],
      },
    ],
  },
  {
    text: "참조",
    link: "/ko/references/index.html",
    collapsible: true,
    children: [
      {
        text: "용어집",
        collapsible: false,
        link: "/ko/references/glossary.html",
      },
      {
        text: "LLMs.txt",
        collapsible: false,
        link: "/ko/references/llms-txt.html",
      },
      {
        text: "기여",
        link: "/ko/getting-started/contributing.html",
      },
      {
        text: "명세",
        collapsible: true,
        children: [
          {
            text: "ANS",
            collapsible: true,
            children: [
              {
                text: "ANS-101: 게이트웨이 기능",
                link: "/ko/references/specs/ans/ANS-101.html",
              },
              {
                text: "ANS-102: 번들 데이터 - JSON",
                link: "/ko/references/specs/ans/ANS-102.html",
              },
              {
                text: "ANS-103: 간결 증명",
                link: "/ko/references/specs/ans/ANS-103.html",
              },
              {
                text: "ANS-104: 번들 데이터 - 바이너리",
                link: "/ko/references/specs/ans/ANS-104.html",
              },
              {
                text: "ANS-105: 라이선스 태그",
                link: "/ko/references/specs/ans/ANS-105.html",
              },
              {
                text: "ANS-106: 저장 금지",
                link: "/ko/references/specs/ans/ANS-106.html",
              },
              {
                text: "ANS-109: 보증",
                link: "/ko/references/specs/ans/ANS-109.html",
              },
              {
                text: "ANS-110: 자산 검색성",
                link: "/ko/references/specs/ans/ANS-110.html",
              },
            ],
          },
          {
            text: "ArFS",
            link: "/ko/references/specs/arfs/arfs.html",
            collapsible: true,
            children: [
              {
                text: "데이터 모델",
                link: "/ko/references/specs/arfs/data-model.html",
              },
              {
                text: "엔터티 유형",
                link: "/ko/references/specs/arfs/entity-types.html",
              },
              {
                text: "콘텐츠 유형",
                link: "/ko/references/specs/arfs/content-types.html",
              },
              {
                text: "프라이버시",
                link: "/ko/references/specs/arfs/privacy.html",
              },
              {
                text: "스키마 다이어그램",
                link: "/ko/references/specs/arfs/schema-diagrams.html",
              },
            ],
          },
          {
            text: "ArNS",
            link: "/ko/references/arns.html",
          },
        ],
      },
    ],
  },
];