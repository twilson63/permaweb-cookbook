# Permaweb 应用程序

A Permaweb application refers to a web page or app built on top of Arweave. Applications built on Arweave have the properties of immutability and long-term availability, which can go for not only data, but also backend processes (smart contracts) and the frontend of websites as well.

## 什么是 Permaweb？

::: info 信息
如需更深入了解 permaweb，请参阅这篇关于 [The Permaweb](./permaweb.md) 的文章
:::

Permaweb 是建立在 [Arweave's Permaweb Services](./permaweb.md) 之上的网站、应用程序与智能合约的集合。

Permaweb 的核心组件如下：

- 网关服务（Gateways）
- 打包服务（Bundlers）
- 计算网络（AO）
- 索引服务（Indexers）

### 网关服务

网关通常被称为 Permaweb 的「前门」。

网关服务是 Arweave 上数据与浏览器中数据展示之间的桥梁。它们提供交易数据、开放 GraphQL 端点以查询 Arweave，并且通常会在网关职责之外提供索引与缓存服务。

[AR.IO](https://ar.io/) 是生态系统中最大的网关网络之一，并提供教育资源与开源软件，让任何人都能自行启动网关节点，或运行自己的网关。

### 打包服务

打包服务会将交易聚合成交易包（transaction bundles），并确保这些交易包直接发布到 Arweave。通过使用像 [ArDrive Turbo](https://ardrive.io/turbo-bundler) 这样的打包服务，你可以在单一 Arweave 区块中发布数十万笔交易。

### 计算服务

AO Computer 是建立在 Arweave 之上的去中心化计算网络，提供创建通用智能合约（Processes）的能力。

与 AO 上的 Process 的每次交互都会以 Arweave 交易的形式存储。

AO 为大规模并行计算而设计，并整合了在 AO 的 Processes 中使用 Arweave 数据的功能。

### 索引服务

索引服务会监听 Arweave 上的所有交易，并将它们导入适合快速查询的索引化数据库。接着它们会对外提供 GraphQL 端点，以便 Permaweb 应用可以对 Arweave 数据进行优化查询。

这些服务协同运作，形成 Permaweb 的服务层，使开发者能够在 Permaweb 上构建完全去中心化的应用程序。

## 应用程序开发

在 Permaweb 上开发应用程序的方式类似于 `Single Page Application` 的开发。

应用由在网页浏览器中执行的前端功能组成，并使用 GraphQL（读取/查询）、Arweave/ArDrive Turbo（写入）以及 AO（去中心化计算）来构成应用的业务逻辑与持久层。

通过利用现代 Web 应用框架与 [Path Manifest](./manifests.md) 规范，开发者可以将网站与应用程序部署到 Permaweb。

要了解更多关于创建与部署 Permaweb 应用程序的信息，请查看您偏好的框架的入门套件：

- [React](../kits/react/index.md)
- [Svelte](../kits/svelte/index.md)
- [Vue](../kits/vue/index.md)

::: tip 找不到你的框架？
找不到你想要的框架？为什么不贡献一个呢？[如何为示例手册做出贡献](../getting-started/contributing.md)
:::
