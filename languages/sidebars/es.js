module.exports = [
    {
        text: "Comenzando",
        link: "/es/getting-started/index.html",
        collapsible: true,
        children: [
            {
                text: "Bienvenido",
                link: "/es/getting-started/welcome.html",
            },
            {
                text: "Hola Mundo (Sin Código)",
                link: "/es/getting-started/quick-starts/hw-no-code.html",
            },
            {
                text: "Hola Mundo (CLI)",
                link: "/es/getting-started/quick-starts/hw-cli.html",
            },
            {
                text: "Contribuyendo",
                link: "/es/getting-started/contributing.html",
            },
        ],
    },
    {
        text: "Conceptos Fundamentales",
        link: "/es/concepts/index.html",
        collapsible: true,
        children: [
            {
                text: "Publicación de Transacciones",
                link: "/es/concepts/post-transactions.html",
                collapsible: true,
                children: [
                    {
                        text: "arweave-js",
                        link: "/es/guides/posting-transactions/arweave-js.html",
                    },
                    {
                        text: "dispatch",
                        link: "/es/guides/posting-transactions/dispatch.html",
                    },
                    {
                        text: "arseeding-js",
                        link: "/es/guides/posting-transactions/arseeding-js.html",
                    },
                    {
                        text: "Turbo-SDK",
                        link: "/es/guides/posting-transactions/turbo.html"
                    },
                ],
            },
            {
                text: "Metadatos (Tags)",
                link: "/es/concepts/tags.html",
            },
            {
                text: "Consulta",
                link: "/es/concepts/queryTransactions.html",
            },
            {
                text: "Obtener Datos",
                link: "/es/guides/http-api.html",
            },
            {
                text: "Tipos de transacciones",
                children: [
                    {
                        text: "Bundles",
                        link: "/es/concepts/bundles.html",
                    },
                    {
                        text: "Manifiestos de ruta",
                        link: "/es/concepts/manifests.html",
                    },
                ],
            },
            {
                text: "Billeteras y Claves",
                link: "/es/concepts/keyfiles-and-wallets.html",
            },
            {
                text: "Permaweb",
                link: "/es/concepts/permaweb.html",
                collapsible: false,
                children: [
                    {
                        text: "Aplicaciones de la Permaweb",
                        link: "/es/concepts/permawebApplications.html",
                    },
                    {
                        text: "Servicios de puerta de enlace",
                        link: "/es/concepts/gateways.html",
                    },
                    {
                        text: "Servicios de agrupación",
                        link: "/es/concepts/bundlers.html",
                    },
                ],
            },
            {
                text: "Arweave File System (ArFS)",
                link: "/es/concepts/arfs/arfs.html",
                children: [
                    {
                        text: "ArFS",
                        link: "/es/concepts/arfs/arfs.html",
                    },
                    {
                        text: "Data Model",
                        link: "/es/concepts/arfs/data-model.html",
                    },
                    {
                        text: "Entity Types",
                        link: "/es/concepts/arfs/entity-types.html",
                    },
                    {
                        text: "Content Types",
                        link: "/es/concepts/arfs/content-types.html",
                    },
                    {
                        text: "Privacy",
                        link: "/es/concepts/arfs/privacy.html",
                    },
                    {
                        text: "Schema Diagrams",
                        link: "/es/concepts/arfs/schema-diagrams.html",
                    },
                ],
            },
            {
                text: "Vouch",
                link: "/es/concepts/vouch.html",
            }
        ],
    },
    {
        text: "Guías",
        link: "/es/guides/index.html",
        collapsible: true,
        children: [
            {
                text: "ArProfile",
                link: "/es/guides/arprofile.html",
            },
            {
                text: "Integración DNS",
                collapsible: true,
                children: [
                    {
                        text: "Lado del Servidor",
                        link: "/es/guides/dns-integration/server-side.html",
                    },
                    {
                        text: "Spheron",
                        link: "/es/guides/dns-integration/spheron.html",
                    },
                ],
            },
            {
                text: "Desplegando Aplicaciones",
                collapsible: true,
                children: [
                    {
                        text: "arkb",
                        link: "/es/guides/deployment/arkb.html",
                    },
                    {
                        text: "Acción de Github",
                        link: "/es/guides/deployment/github-action.html",
                    },
                ],
            },
            {
                text: "Desplegando Manifiestos de Ruta",
                link: "/es/guides/deploying-manifests/deployingManifests.html",
                collapsible: false,
                children: [
                    {
                        text: "arweave.app",
                        link: "/es/guides/deploying-manifests/arweave-app.html",
                    },
                    {
                        text: "ardrive",
                        link: "/es/guides/deploying-manifests/ardrive.html",
                    },
                    {
                        text: "arseeding-js",
                        link: "/es/guides/deploying-manifests/arseeding-js.html",
                    },
                    {
                        text: "Turbo",
                        link: "/es/guides/deploying-manifests/turbo",
                    },
                ],
            },
            {
                text: "Desplegando PSTs",
                collapsible: false,
                link: "/es/guides/deploying-psts.html",
            },
            {
                text: "Execution Machine",
                collapsible: true,
                children: [
                    {
                        text: "Introducción",
                        link: "/es/guides/exm/intro.html",
                    },
                    {
                        text: "Token de API",
                        link: "/es/guides/exm/api.html",
                    },
                    {
                        text: "JS SDK",
                        collapsible: true,
                        children: [
                            {
                                text: "SDK de máquina de ejecución",
                                link: "/es/guides/exm/js-sdk/sdk-intro.html",
                            },
                            {
                                text: "Implementar con SDK",
                                link: "/es/guides/exm/js-sdk/sdk-deploy.html",
                            },
                            {
                                text: "Escribir con SDK",
                                link: "/es/guides/exm/js-sdk/sdk-write.html",
                            },
                            {
                                text: "Leer con SDK",
                                link: "/es/guides/exm/js-sdk/sdk-read.html",
                            },
                        ],
                    },
                ],
            },
            {
                text: "GraphQL",
                link: "/es/guides/querying-arweave/queryingArweave.html",
                collapsible: false,
                children: [
                    {
                        text: "ArDB",
                        link: "/es/guides/querying-arweave/ardb.html",
                    },
                    {
                        text: "ar-gql",
                        link: "/es/guides/querying-arweave/ar-gql.html",
                    },
                    {
                        text: "Servicio de indexación de búsqueda",
                        link: "/es/guides/querying-arweave/search-indexing-service.html",
                    },
                ],
            },
            {
                text: "Pruebas",
                collapsible: true,
                children: [
                    {
                        text: "arlocal",
                        collapsible: false,
                        link: "/es/guides/testing/arlocal.html",
                    },
                ],
            },
            {
                text: "Vouch",
                link: "/es/guides/vouch.html",
            },
        ],
    },
    {
        text: "Referencias",
        link: "/es/references/index.html",
        collapsible: true,
        children: [
            {
                text: "Bundling",
                collapsible: false,
                link: "/es/references/bundling.html",
            },
            {
                text: "GraphQL",
                collapsible: false,
                link: "/es/references/gql.html",
            },
            {
                text: "HTTP API",
                collapsible: false,
                link: "/es/references/http-api.html",
            },
        ],
    },
    {
        text: "Kits de Inicio",
        link: "/es/kits/index.html",
        collapsible: true,
        children: [
            {
                text: "React",
                link: "/es/kits/react/index.html",
            },
            {
                text: "Svelte",
                link: "/es/kits/svelte/index.html",
            },
            {
                text: "Vue",
                link: "/es/kits/vue/index.html",
            },
        ],
    },
    {
        text: "Comunidad",
        link: "/es/community/index.html",
        collapsible: true,
        children: [
            {
                text: "Arweave Name System (ArNS)",
                link: "/es/concepts/arns.html",
            },
            {
                text: "Tokens atómicos",
                link: "/es/guides/smartweave/atomic-assets/index.html",
                collapsible: true,
                children: [
                    {
                        text: "using ArDrive CLI",
                        link: "/es/guides/smartweave/atomic-assets/ardrive-cli.html",
                    }
                ],
            },
        ]
    },
    {
        text: "Legacy",
        link: "/es/legacy/index.html",
        collapsible: true,
        children: [
            {
                text: "Concepts",
                collapsible: true,
                children: [
                    {
                        text: "SmartWeave",
                        link: "/es/concepts/smartweave.html",
                        collapsible: false,
                        children: [
                            {
                                text: "Profit Sharing Tokens (PSTs)",
                                link: "/es/concepts/psts.html",
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
                                text: "Tokens Atómicos",
                                link: "/es/guides/atomic-tokens/intro.html",
                            },
                            {
                                text: "Warp",
                                collapsible: false,
                                children: [
                                    {
                                        text: "Introducción",
                                        link: "/es/guides/smartweave/warp/intro.html",
                                    },
                                    {
                                        text: "Implementando contratos",
                                        link: "/es/guides/smartweave/warp/deploying-contracts.html",
                                    },
                                    {
                                        text: "Leer estado del contrato",
                                        link: "/es/guides/smartweave/warp/readstate.html",
                                    },
                                    {
                                        text: "Escribir interacciones de contrato",
                                        link: "/es/guides/smartweave/warp/write-interactions.html",
                                    },
                                    {
                                        text: "Evolucionar contrato",
                                        link: "/es/guides/smartweave/warp/evolve.html",
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