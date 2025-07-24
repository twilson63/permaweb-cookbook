# Permaweb Applications

A Permaweb application refers to a web page or app built on top of Arweave. Applications built on Arweave have the properties of immutability and long-term availability, which can go for not only data, but also backend processes (smart contracts) and the frontend of websites as well.

## What is the permaweb?

::: info INFORMATION
For a deeper dive into the permaweb check out this article on [The Permaweb](./permaweb.md)
:::

The permaweb is a collection of sites, apps, and SmartContracts built on top of the [Arweave's Permaweb Services](./permaweb.md).

The core parts of the Permaweb are the following:

-   Gateways
-   Bundlers
-   Compute Networks (AO)
-   Indexers

### Gateway Services

Gateways are often referred to as the "front door" to the Permaweb.

Gateway services are the bridge between data on Arweave and displaying data in the browser. They serve transaction data, expose GraphQL endpoints for querying Arweave, and often provide indexing and caching services alongside their gateway responsibilities.

[AR.IO](https://ar.io/) is one of the largest gateway networks in the ecosystem, and provide education and open source software for anyone to spin up their own gateway node, as well as running gateways of their own.

### Bundling Services

Bundling services aggregate transactions into transaction bundles and make sure those bundles are posted directly to Arweave. By using a bundling service like [ArDrive Turbo](https://ardrive.io/turbo-bundler) you can post hundreds of thousands of transactions in a single Arweave block.

### Compute Services

AO Computer is a decentralized compute network built on top of Arweave to provide the ability to create general-purpose smart contracts (Processes).

Every interaction with a process on AO is stored as an Arweave transaction. 

AO is built for large-scale parallel computation, and includes integrations to use Arweave data in Processes on AO. 

### Indexing Services

Indexing services listen to all the transactions on Arweave and import them into an indexed database suitable for fast querying. They then expose a GraphQL endpoint so Permaweb apps can make optimized queries for Arweave data.

These services work together to form the Permaweb Services Layer and gives developers the power to build fully decentralized applications on the Permaweb.

## Application Development

Approaching application development with the Permaweb is similar to `Single Page Application` development.

The application consists of frontend functionality that is executed in a web browser, and uses GraphQL (Read/Query), Arweave/ArDrive Turbo (Write), and AO (decentralized computation) to make up the business logic and persistence layer of the application.

By leveraging modern web application frameworks and the [Path Manifest](./manifests.md) specification, developers can deploy web sites and applications to the permaweb.

To learn more about creating and deploying Permaweb Apps, check out our starter kits in your favorite framework:

-   [React](../kits/react/index.md)
-   [Svelte](../kits/svelte/index.md)
-   [Vue](../kits/vue/index.md)

::: tip Missing my framework?
Can't find your framework, why don't you contribute? [How to contribute to the cookbook](../getting-started/contributing.md)
:::
