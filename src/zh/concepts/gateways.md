---
locale: zh
---
# 网关（Gateways）

---

上传到Arweave网络（或[永久网](https://cookbook.arweave.dev/concepts/permaweb.html)）的数据并不是立即可用的。

### 什么是网关？

网关也可被称为“永久网的前门”。它们是Arweave和用户之间的接口，使得从您的网页浏览器中轻松访问数据或使用永久网应用变得容易。

例如，访问存储在Arweave上的HTML文件将在您的浏览器中显示为一个网页。查看图片、下载文件、查看JSON数据或任何其他存储在Arweave上的文件也是如此。这使得与永久网的交互非常类似于使用传统的网页。

### 网关的其他作用

除了为用户提供访问数据的服务外，网关还提供其他服务，例如：

- 缓存经常访问的数据和交易
- 对交易进行索引和查询（通过Arweave标签和GraphQL接口）
- 在整个Arweave网络中播种交易
- 内容审查（通过内容策略选择提供或不提供的数据）

### 网关和Arweave协议

虽然网关在允许内容在Arweave上被访问方面起着重要作用，但它们**不**是核心协议的一部分。

这意味着托管和运行网关与运行保护Arweave网络的节点是分开的（尽管通常一起运行）。

由于网关不是核心协议的一部分，因此没有内置的激励机制，如挖矿的奖励或激励。这使得网关运营商或外部服务能够选择如何构建他们的激励系统，从而实现更加分散和民主的模式。甚至个别应用程序可以运行自己的网关，以实现更好的缓存和永久网应用性能。

一些受欢迎的网关包括由Arweave团队运营的[arweave.net](https://arweave.net/)，以及其他网关如 [arweave.world](https://cookbook.arweave.world/) [arweave.asia](https://cookbook.arweave.asia) [arweave.live](https://arweave.live/)和[g8way.io](https://g8way.io)。然而，通过[AR.IO](https://ar.io/)等团队，网关的运营变得更加简单和易于访问。

### 来源和进一步阅读材料

- [ArWiki](https://arwiki.wiki/#/en/gateways)
- [AR.IO](https://ar.io/)
