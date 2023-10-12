---
locale: zh
---

# 永久网(permaweb)应用程序

永久网(permaweb)应用程序是一种在您的浏览器中运行的网页或 Web 应用程序。使其成为永久网(permaweb)应用程序的是它被部署到 Arweave 并永久保存。即使开发该应用程序的团队不再维护，用户也可以放心，永久网(permaweb)应用程序仍然在线并可用。永久网(permaweb)应用程序的巨大优势在于它们将数据保存在 Arweave 上，这意味着可以轻松将其导入到其他可能改善您当前使用的应用程序的应用程序中。

## 什么是永久网(permaweb)？

::: 信息
深入了解永久网(permaweb)的详细信息，请参阅[永久网(permaweb)](./permaweb.md)这篇文章
:::

永久网(permaweb)是建立在[Arweave 永久网(permaweb)服务](./permaweb.md)之上的站点、应用程序和智能合约的集合。永久网(permaweb)的核心部分包括以下内容：

-   网关服务（如 arweave.net、arweave.live、ar.io）
-   包装服务（如 irys.xyz）
-   序列化服务（如 warp.cc）
-   索引服务（如 goldsky）

<img src="https://arweave.net/ycQzutVToTtVT_vT4811ByswtZ-KjqmifNSehSb1-eg" width="700">

### 网关服务

网关服务是连接 Arweave 上的数据和在浏览器中显示数据之间的桥梁。网关通常提供索引服务，同时提供事务数据服务，为查询 Arewave 事务公开 graphQL 链接点。

### 包装服务

包装服务将交易聚合成事务包，并确保这些事务包直接发布到 Arewave。通过使用像 irys.xyz 这样的捆绑服务，您可以在单个 Arweave 块中发布数十万个事务。

### 序列化服务

序列化服务使得智能合约能够高性能计算存储在 Arweave 网络上的业务逻辑。

### 索引服务

索引服务监听 Arweave 上的所有交易，并将它们导入到适用于快速查询的索引数据库中。然后它们公开一个 graphQL 端点，以便永久网(permaweb)应用程序可以对 Arweave 数据进行优化查询。

这些服务共同组成了永久网(permaweb)服务层，并赋予开发人员在永久网(permaweb)上构建完全分散的应用程序的能力。

## 应用程序开发

使用永久网(permaweb)进行应用程序开发与“单页应用程序”开发类似，应用程序由在 Web 浏览器中执行的前端功能组成，并使用 GraphQL（读取/查询）、Irys（写入）和 SmartWeave（分布式计算）组成应用程序的业务逻辑和持久化层。

![common permaweb app](https://arweave.net/UjbgAk8duudDc97lOYIt7rBVtRHp2Z9F6Ua5OcvwNCk/)

通过利用现代 Web 应用程序框架和[路径清单](./manifests.md)规范，开发人员可以将网站和应用程序部署到永久网(permaweb)上。

要了解有关创建和部署永久网(permaweb)应用程序的更多信息，请查看您喜欢的框架中的我们的起始套件：

-   [React](../kits/react/index.md)
-   [Svelte](../kits/svelte/index.md)

::: 提示 缺少我所用的框架？
找不到您的框架？为什么不贡献一下呢？[如何对菜谱做贡献](../getting-started/contributing.md)
:::
