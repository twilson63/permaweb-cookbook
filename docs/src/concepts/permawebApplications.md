# Permaweb Applications

A permaweb application is a type of web page or web app that runs in your browser. What makes it a permaweb app is that it is deployed to Arweave and saved forever. Even if the team that developed it moves on users can rest assured the permaweb app will stay online and available. A huge advantage to permaweb apps is that they save their data on Arweave which means it can easily be imported into other apps that might improve on the one your currently using.

## What is the permaweb?

::: info INFORMATION
For a deeper dive into the permaweb check out this article on [The Permaweb](./permaweb.md)
:::

The permaweb is a collection of sites, apps, and SmartContracts built on top of the [Arweave's Permaweb Services](./permaweb.md). The core parts of the Permaweb are the following:

* Gateway Service (ex. arweave.net, arweave.live, ar.io)
* Bundling Service (ex. bundlr.network)
* Sequencer Service (ex. warp.cc)
* Index Service (ex goldsky)

<img src="https://arweave.net/ycQzutVToTtVT_vT4811ByswtZ-KjqmifNSehSb1-eg" width="700">

### Gateway Services

Gateway services are the bridge between data on Arweave and displaying data in the browser. Gateways often provide indexing service along side serving transaction data, exposing graphQL endpoints for querying Arewave transactions. 

### Bundling Services 

Bundling services aggregate transactions into transaction bundles and make sure those bundles are posted directly to Arweave. By using a bundling service like bundlr.network you can post hundreds of thousands of transactions in a single Arweave block.

### Sequencing Services

Sequencers enables high performance for SmartWeave Contracts to calculate business logic stored on the Arweave network.

### Indexing Services
Indexing services listen to all the transactions on Arweave and import them into an indexed database suitable for fast querying. They then expose
a graphQL endpoint so permaweb apps can make optimized queries for Arweave data.

These services work together to form the Permaweb Services Layer and gives developers the power to build fully decentralized applications on the permaweb.

## Application Development

Approaching application development with the permaweb is similar to `Single Page Application` development, the application consists of frontend functionality that is executed in a web browser, and uses GraphQL (Read/Query), Bundlr (Write), and SmartWeave (Decentralized computation) to make up the business logic and persistance layer of the application. 

![common permaweb app](https://arweave.net/UjbgAk8duudDc97lOYIt7rBVtRHp2Z9F6Ua5OcvwNCk/)

By leveraging modern web application frameworks and the [Path Manifest](./manifests.md) specification, developers can deploy web sites and applications to the permaweb.

To learn more about creating and deploying Permaweb Apps, check out our starter kits in your favorite framework:

* [React](../kits/react/index.md)
* [Svelte](../kits/svelte/index.md)
* [Vue](../kits/vue/index.md)

::: tip Missing my framework?
Can't find your framework, why don't you contribute? [How to contribute to the cookbook](../getting-started/contributing.md)
:::
