module.exports = [
  {
    text: "Mulai dari awal",
    link: "/id/getting-started/index.html",
    collapsible: true,
    children: [
      {
        text: "Selamat Datang",
        link: "/id/getting-started/welcome.html",
      },
      {
        text: "Hello World (Tanpa Kode)",
        link: "/id/getting-started/quick-starts/hw-no-code.html",
      },
      {
        text: "Hello World (CLI)",
        link: "/id/getting-started/quick-starts/hw-cli.html",
      },
      {
        text: "Hello World (Kode)",
        link: "/id/getting-started/quick-starts/hw-code.html",
      },
      {
        text: "Hello World (NodeJS)",
        link: "/id/getting-started/quick-starts/hw-nodejs.html",
      },
      {
        text: "Berkontribusi",
        link: "/id/getting-started/contributing.html",
      },
    ],
  },
  {
    text: "Konsep Inti",
    link: "/id/concepts/index.html",
    collapsible: true,
    children: [
      {
        text: "Posting Transaksi",
        link: "/id/concepts/post-transactions.html",
        collapsible: true,
        children: [
          {
            text: "arweave-js",
            link: "/id/guides/posting-transactions/arweave-js.html",
          },
          {
            text: "dispatch",
            link: "/id/guides/posting-transactions/dispatch.html",
          }
        ],
      },
      {
        text: "Metadata (Tag)",
        link: "/id/concepts/tags.html",
      },
      {
        text: "Pencarian",
        link: "/id/concepts/query-transactions.html",
      },
      {
        text: "Mengambil Data",
        link: "/id/guides/http-api.html",
      },
      {
        text: "Jenis Transaksi",
        children: [
          {
            text: "Bundle",
            link: "/id/concepts/bundles.html",
          },
          {
            text: "Jalur Manifest",
            link: "/id/concepts/manifests.html",
          },
        ],
      },
      {
        text: "Dompet dan Kunci",
        link: "/id/concepts/keyfiles-and-wallets.html",
      },
      {
        text: "Permaweb",
        link: "/id/concepts/permaweb.html",
        collapsible: false,
        children: [
          {
            text: "Aplikasi Permaweb",
            link: "/id/concepts/permaweb-applications.html",
          },
          {
            text: "Layanan Gateway",
            link: "/id/concepts/gateways.html",
          },
          {
            text: "Layanan Bundling",
            link: "/id/concepts/bundlers.html",
          },
        ],
      },
    ],
  },
  {
    text: "Panduan",
    link: "/id/guides/index.html",
    collapsible: true,
    children: [
      {
        text: "ArProfile",
        link: "/id/guides/arprofile.html",
      },
      {
        text: "Integrasi DNS",
        collapsible: true,
        children: [
          {
            text: "Sisi Server",
            link: "/id/guides/dns-integration/server-side.html",
          },
          {
            text: "Spheron",
            link: "/id/guides/dns-integration/spheron.html",
          },
        ],
      },
      {
        text: "Mengunggah Aplikasi",
        collapsible: true,
        children: [
          {
            text: "arkb",
            link: "/id/guides/deployment/arkb.html",
          },
          {
            text: "Github Action",
            link: "/id/guides/deployment/github-action.html",
          }
        ],
      },
      {
        text: "Mengunggah PathManifests",
        link: "/id/guides/deploying-manifests/deploying-manifests.html",
        collapsible: false,
        children: [
          {
            text: "arweave.app",
            link: "/id/guides/deploying-manifests/arweave-app.html",
          },
          {
            text: "ardrive",
            link: "/id/guides/deploying-manifests/ardrive.html",
          }
        ],
      },
      {
        text: "Mengunggah PSTs",
        collapsible: false,
        link: "/id/guides/deploying-psts.html",
      },
      {
        text: "Execution Machine",
        collapsible: true,
        children: [
          {
            text: "Pengantar",
            link: "/id/guides/exm/intro.html",
          },
          {
            text: "Token API",
            link: "/id/guides/exm/api.html",
          },
          {
            text: "JS SDK",
            collapsible: true,
            children: [
              {
                text: "Pengantar SDK Execution Machine",
                link: "/id/guides/exm/js-sdk/sdk-intro.html",
              },
              {
                text: "Mengunggah dengan SDK",
                link: "/id/guides/exm/js-sdk/sdk-deploy.html",
              },
              {
                text: "Menulis dengan SDK",
                link: "/id/guides/exm/js-sdk/sdk-write.html",
              },
              {
                text: "Membaca dengan SDK",
                link: "/id/guides/exm/js-sdk/sdk-read.html",
              },
            ],
          },
        ],
      },
      {
        text: "GraphQL",
        link: "/id/guides/querying-arweave/querying-arweave.html",
        collapsible: false,
        children: [
          {
            text: "ArDB",
            link: "/id/guides/querying-arweave/ardb.html",
          },
          {
            text: "ar-gql",
            link: "/id/guides/querying-arweave/ar-gql.html",
          },
          {
            text: "Layanan Indeks Pencarian",
            link: "/id/guides/querying-arweave/search-indexing-service.html",
          },
        ],
      },
      {
        text: "Pengujian",
        collapsible: true,
        children: [
          {
            text: "arlocal",
            collapsible: false,
            link: "/id/guides/testing/arlocal.html",
          },
        ],
      },
    ],
  },
  {
    text: "Referensi",
    link: "/id/references/index.html",
    collapsible: true,
    children: [
      {
        text: "Bundling",
        collapsible: false,
        link: "/id/references/bundling.html",
      },
      {
        text: "GraphQL",
        collapsible: false,
        link: "/id/references/gql.html",
      },
      {
        text: "HTTP API",
        collapsible: false,
        link: "/id/references/http-api.html",
      },
    ],
  },
  {
    text: "Starter Kits",
    link: "/id/kits/index.html",
    collapsible: true,
    children: [
      {
        text: "React",
        link: "/id/kits/react/index.html",
        collapsible: true,
        children: [
          {
            text: "Create React App",
            link: "/id/kits/react/create-react-app.html",
          },
          {
            text: "Vite",
            link: "/id/kits/react/vite.html",
          },
        ],
      },
      {
        text: "Svelte",
        link: "/id/kits/svelte/index.html",
        collapsible: true,
        children: [
          {
            text: "Minimal",
            link: "/id/kits/svelte/minimal.html",
          },
          {
            text: "Vite",
            link: "/id/kits/svelte/vite.html",
          },
        ],
      },
      {
        text: "Vue",
        link: "/id/kits/vue/index.html",
        collapsible: true,
        children: [
          {
            text: "Create Vue",
            link: "/id/kits/vue/create-vue.html",
          },
        ],
      },
    ],
  },
  {
    text: "Komunitas",
    collapsible: true,
    children: [
      {
        text: "Arweave Name System (ArNS)",
        link: "/id/concepts/arns.html",
      },
      {
        text: "Token Atomic",
        link: "/id/guides/atomic-tokens/intro.html",
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
            link: "/id/concepts/smartweave.html",
            collapsible: false,
            children: [
              {
                text: "Profit Sharing Tokens (PSTs)",
                link: "/id/concepts/psts.html",
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
                    text: "Pengantar",
                    link: "/id/guides/smartweave/warp/intro.html",
                  },
                  {
                    text: "Deploy Kontrak",
                    link: "/id/guides/smartweave/warp/deploying-contracts.html",
                  },
                  {
                    text: "Membaca Status Kontrak",
                    link: "/id/guides/smartweave/warp/readstate.html",
                  },
                  {
                    text: "Menulis Interaksi Kontrak",
                    link: "/id/guides/smartweave/warp/write-interactions.html",
                  },
                  {
                    text: "Mengembangkan Kontrak",
                    link: "/id/guides/smartweave/warp/evolve.html",
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