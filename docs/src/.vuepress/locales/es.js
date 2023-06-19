export default {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Cocinando con la Permaweb",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  // description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html#sidebar
   */

  sidebar: [
    {
      text: "Comenzando",
      link: "/es/getting-started/",
      collapsible: true,
      children: [
        {
          text: "Bienvenido",
          link: "/es/getting-started/welcome",
        },
        {
          text: "Hola Mundo (CLI)",
          link: "/es/getting-started/quick-starts/hw-cli",
        },
        {
          text: "Hola Mundo (Con Código)",
          link: "/es/getting-started/quick-starts/hw-code",
        },
        {
          text: "Hola Mundo (NodeJS)",
          link: "/es/getting-started/quick-starts/hw-nodejs",
        },
        {
          text: "Contribuyendo",
          link: "/es/getting-started/contributing",
        },
      ],
    },
    {
      text: "Conceptos Fundamentales",
      link: "/es/concepts/",
      collapsible: true,
      children: [
        {
          text: "Publicación de Transacciones",
          link: "/es/concepts/post-transactions",
          collapsible: true,
          children: [
            {
              text: "arweave-js",
              link: "/es/guides/posting-transactions/arweave-js",
            },
            {
              text: "bundlr.network",
              link: "/es/guides/posting-transactions/bundlr",
            },
            {
              text: "dispatch",
              link: "/es/guides/posting-transactions/dispatch",
            },
          ],
        },
        {
          text: `Metadatos (Etiquetas "Tags")`,
          link: "/es/concepts/tags",
        },
        {
          text: `Consultas`,
          link: `/es/concepts/queryTransactions`,
        },
        {
          text: `Obteniendo Datos`,
          link: `/es/guides/http-api.md`,
        },
        {
          text: "Tipos de Transacción",
          children: [
            {
              text: "Paquetes",
              link: "/es/concepts/bundles",
            },
            {
              text: "Manifiestos de Ruta",
              link: "/es/concepts/manifests",
            },
          ],
        },
        {
          text: "Billeteras y Claves",
          link: "/es/concepts/keyfiles-and-wallets",
        },
        {
          text: "Permaweb",
          link: "/es/concepts/permaweb",
          collapsible: false,
          children: [
            {
              text: "Aplicaciones Permaweb",
              link: "/es/concepts/permawebApplications",
            },
            {
              text: "Servicios de Puerta de Enlace",
              link: "/es/concepts/gateways",
            },
            {
              text: "Servicios de Agrupación",
              link: "/es/concepts/bundlers",
            },
          ],
        },
        {
          text: "SmartWeave",
          link: "/es/concepts/smartweave",
          collapsible: false,
          children: [
            {
              text: "Sistema de Nombres Arweave (ArNS)",
              link: "/es/concepts/arns",
            },
            {
              text: "Tokens Atómicos",
              link: "/es/concepts/atomic-tokens.md",
            },
            {
              text: "Tokens de Participación en Ganancias (PSTs)",
              link: "/es/concepts/psts",
            },
            {
              text: "Vouch",
              link: "/es/concepts/vouch",
            },
          ],
        },
      ],
    },
    {
      text: "Guías",
      link: "/es/guides/",
      collapsible: true,
      children: [
        {
          text: "ArProfile",
          link: "/es/guides/arprofile",
        },
        {
          text: "Integración DNS",
          collapsible: true,
          children: [
            {
              text: "Lado del Servidor",
              link: "/es/guides/dns-integration/server-side",
            },
            {
              text: "Spheron",
              link: "/es/guides/dns-integration/spheron",
            },
          ],
        },
        {
          text: `Desplegando Aplicaciones`,
          collapsible: true,
          children: [
            {
              text: "arkb",
              link: "/es/guides/deployment/arkb",
            },
            {
              text: "Bundlr",
              link: "/es/guides/deployment/bundlr-cli",
            },
            {
              text: "Acción de Github",
              link: "/es/guides/deployment/github-action",
            },
          ],
        },
        {
          text: `Desplegando Manifiestos de Ruta`,
          link: "/es/guides/deploying-manifests/deployingManifests",
          collapsible: false,
          children: [
            {
              text: "arweave.app",
              link: "/es/guides/deploying-manifests/arweave-app",
            },
            {
              text: "ardrive",
              link: "/es/guides/deploying-manifests/ardrive",
            },
            {
              text: "bundlr.network",
              link: "/es/guides/deploying-manifests/bundlr",
            },
          ],
        },
        {
          text: "Desplegando PSTs",
          collapsible: false,
          link: "/es/guides/deploying-psts",
        },
        {
          text: "Execution Machine",
          collapsible: true,
          children: [
            {
              text: "Introducción",
              link: "/es/guides/exm/intro.md",
            },
            {
              text: "Token de API",
              link: "/es/guides/exm/api.md",
            },
            {
              text: "SDK de JS",
              collapsible: true,
              children: [
                {
                  text: "SDK de Execution Machine",
                  link: "/es/guides/exm/js-sdk/sdk-intro.md",
                },
                {
                  text: "Desplegar con SDK",
                  link: "/es/guides/exm/js-sdk/sdk-deploy.md",
                },
                {
                  text: "Escribir con SDK",
                  link: "/es/guides/exm/js-sdk/sdk-write.md",
                },
                {
                  text: "Leer con SDK",
                  link: "/es/guides/exm/js-sdk/sdk-read.md",
                },
              ],
            },
          ],
        },
        {
          text: "GraphQL",
          link: "/es/guides/querying-arweave/queryingArweave",
          collapsible: false,
          children: [
            {
              text: "ArDB",
              link: "/es/guides/querying-arweave/ardb",
            },
            {
              text: "ar-gql",
              link: "/es/guides/querying-arweave/ar-gql",
            },
            {
              text: "Servicio de Indexación de Búsqueda",
              link: "/es/guides/querying-arweave/search-indexing-service",
            },
          ],
        },
        {
          text: "SmartWeave",
          collapsible: true,
          children: [
            {
              text: "Tokens Atómicos",
              link: "/es/guides/atomic-tokens/intro",
            },
            {
              text: "Vouch",
              link: "/es/guides/vouch",
            },
            {
              text: "Warp",
              collapsible: false,
              children: [
                {
                  text: "Introducción",
                  link: "/es/guides/smartweave/warp/intro.md",
                },
                {
                  text: "Desplegar Contratos",
                  link: "/es/guides/smartweave/warp/deploying-contracts.md",
                },
                {
                  text: "Leer Estado del Contrato",
                  link: "/es/guides/smartweave/warp/readstate.md",
                },
                {
                  text: "Escribir Interacciones del Contrato",
                  link: "/es/guides/smartweave/warp/write-interactions.md",
                },
                {
                  text: "Evolucionar Contrato",
                  link: "/es/guides/smartweave/warp/evolve.md",
                },
              ],
            },
          ],
        },
        {
          text: `Pruebas`,
          collapsible: true,
          children: [
            {
              text: "arlocal",
              collapsible: false,
              link: "/es/guides/testing/arlocal",
            },
          ],
        },
      ],
    },
    {
      text: "Referencias",
      link: "/es/references/",
      collapsible: true,
      children: [
        {
          text: "Agrupamiento",
          collapsible: false,
          link: "/es/references/bundling",
        },
        {
          text: "GraphQL",
          collapsible: false,
          link: "/es/references/gql",
        },
        {
          text: "API HTTP",
          collapsible: false,
          link: "/es/references/http-api",
        },
      ],
    },
    {
      text: "Kits de Inicio",
      link: "/es/kits/",
      collapsible: true,
      children: [
        {
          text: "React",
          link: "/es/kits/react/",
        },
        {
          text: "Svelte",
          link: "/es/kits/svelte/",
        },
        {
          text: "Vue",
          link: "/es/kits/vue/",
        },
      ],
    },
  ],
};
