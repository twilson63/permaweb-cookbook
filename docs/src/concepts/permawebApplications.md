# Permaweb Applications

A permaweb application is a type of computer program that runs on the internet. But, it is special because it is saved forever, even if the team who made it stops working on it. It is a special kind of website that is always there for you to use.

## What is the permaweb?

::: info INFORMATION
For a deeper dive into the permaweb check out this medium post [Welcome to the Permaweb](https://arweave.medium.com/welcome-to-the-permaweb-ce0e6c73ddfb)
:::

The permaweb is a platform built on top of the [Arweave decentralized network](https://arweave.org), which serves internet web apps and sites that are published on Arweave. The core parts of the Permaweb are the following:

* Gateway (ex. arweave.net, arweave.live, ar.io)
* Bundlr (ex. bundlr.network)
* Sequencer (ex. warp.cc)

### Gateway

The Gateway is a service that provides the web server semantics to enable browsers to interact with the site or application. The Gateway also contains a GraphQL query server that developers can use to query/lookup data stored on Arweave.

### Bundlr 

The Bundlr is a service that allows many Arweave data-items to be grouped together and posted on to arweave in batches, then updates the gateway via a cache mechanism to provide immediate access to the bundled data via direct reference and GraphQL queries.

### Sequencer

The Sequencer is a service that enables high performance for SmartWeave Contracts to calculate business logic stored on the Arweave network.

![arweave image](https://arweave.net/qy97_UEV1vEDasGLeaXSwKJi2lnCcg_aggDFxN1jPB8)

These services work together to form the permaweb and gives developers the power to build fully decentralized applications on the permaweb.

## Application Development

Approaching application development with the permaweb is similar to `Single Page Application` development, the application consists of frontend functionality that is executed in a web browser, and uses GraphQL (Read/Query), Bundlr (Write), and SmartWeave (Process) to make up the business logic and persisten layer of the application. 

![common permaweb app](https://arweave.net/UjbgAk8duudDc97lOYIt7rBVtRHp2Z9F6Ua5OcvwNCk/)

By leveraging modern web application frameworks and the [Path Manifest](./manifests.md) specification, developers can deploy web sites and applications to the permaweb.

To learn more about creating and deploying Permaweb Apps, check out our starter kits in your favorite framework:

* [React](../kits/react.md)
* [Svelte](../kits/svelte.md)

::: tip Missing my framework?
Can't find your framework, why don't you contribute? [How to contribute to the cookbook](../getting-started/contributing.md)
:::