# Arweave 网络中的网关

网关（Gateways）作为 Arweave 网络与终端用户之间的接口，让 Permaweb 的数据能通过普通网页浏览器轻松访问。

这些服务常被形容为 Permaweb 的“前门”，允许用户以熟悉的类似网页体验与存储在区块链上的内容互动。

当您在 Arweave 上访问内容时，通常会使用类似以下的 URL 结构：

```
https://<gateway>/<tx>
```

这使得 HTML 文件可以作为网页渲染、图像能正确显示，其他数据类型也能适当提供——即使内容存储在去中心化的网络上，仍能创造类似传统网络的体验。

## 网关的主要功能

网关除了基本内容提供外，还提供若干关键服务：

- **内容缓存**：存储常被访问的交易以提升性能
- **数据索引**：提供 GraphQL 接口，以通过标签与元数据查询交易
- **网络分发**：协助将交易散布至整个 Arweave 网络
- **内容审查**：套用内容策略以决定提供哪些数据

## 与核心协议的关系

重要的是要理解，网关并非 Arweave 核心协议的一部分。此一区别带来若干影响：

- 运营网关与运行用于保护网络的节点是分开的
- 协议层级并未为网关运营者提供内建的激励机制
- 网关服务可以实现自己的经济模型与激励措施
- 应用可以运营自己的网关以提升性能

这种分离让生态系统更具弹性与去中心化，不同的网关运营者可以尝试各种服务模式。

## 热门网关服务

目前有数个网关服务支持 Arweave 生态系：

- [arweave.net](https://arweave.net/) - 由 Arweave 团队运营
- [arweave.world](https://cookbook.arweave.world/)
- [arweave.asia](https://cookbook.arweave.asia)
- [arweave.live](https://arweave.live/)
- [g8way.io](https://g8way.io)

[AR.IO](https://ar.io/) 项目正致力于让网关的运行更容易上手，可能会提升网络访问点的去中心化程度。

## 延伸阅读

- [ArWiki Gateway Documentation](https://arwiki.wiki/#/en/gateways)
- [AR.IO Project](https://ar.io/)
