# SmartWeave

> **⚠️ 弃用通知**
>
> 本文件已弃用，可能包含过时信息。

## 什么是 SmartWeave？

SmartWeave 是 Arweave 上主要的智能合约范式名称。SmartWeave 合约的一个独特特性是合约的当前状态是通过「惰性求值（lazy evaluation）」的过程提供的。这表示不是由 Arweave 的矿工节点持续评估所有合约的当前状态，而是由读取合约的客户端自行评估该状态。

## 为什么 SmartWeave 很重要？

去中心化应用程序的状态与逻辑需要与其余数据一样具有抗审查、永久保存与可验证性。SmartWeave 使开发者能够编写将应用状态与逻辑封装在链上并以无需信任（trustless）且可验证的方式执行的智能合约。这并非小事，因为 Arweave 协议本身并没有为节点评估智能合约状态提供经济激励。

SmartWeave 提供了一种不可变的追加（append-only）交互模式，利用永久存储来保存合约状态。结果是建立了一个完全去中心化、链上（on-chain）的状态机，能够为协议与应用程序在无需许可且无需信任的情况下提供动态功能。通过使用 SmartWeave，开发者可以在 Arweave 上建立随时间保证不会更改的智能合约，这使得他们能够建立具有动态功能且可在无需许可与无需信任情况下使用的 Permaweb 应用程序（[Permaweb 应用程序](/concepts/permaweb-applications.md））。

开发者可能选择使用 SmartWeave 来实现他们 permaweb 应用逻辑的原因包括：

- **去中心化存储：** SmartWeave 构建在 Arweave 之上，所以使用 SmartWeave 构建的应用将储存在分布式节点网络上，而非集中式服务器。这可提高对审查、篡改与其他干预形式的抵抗力。

- **惰性求值：** SmartWeave 合约的惰性求值特性可达成高效且可扩展的执行。不是由 Arweave 节点持续评估合约状态，读取合约的客户端负责评估状态，利用用户的计算能力而非网络节点。

- **语言支持：** SmartWeave 支持多种编程语言，包括 JavaScript、TypeScript、Rust、Go、AssemblyScript 与 WASM（WebAssembly）。这让开发者可以使用自己熟悉的语言来构建 SmartWeave 应用。

- **数据耐久性：** Arweave 的设计使数据具有高度耐久性与长期保存能力。这对需要长期保存数据的应用（例如历史记录或科学数据）非常有用。

- **经济模型：** Arweave 使用一种基于永久存储概念的独特经济模型，为矿工提供长期存储数据的激励。这有助于确保使用 SmartWeave 构建的 permaweb 应用的长期可行性与耐久性。

## SmartWeave 如何运作？

SmartWeave 合约在核心上是从初始合约状态建立，然后通过交易标签（transaction tags）进行编辑、添加与删除来更改状态。

像 `Warp`（先前称为 `RedStone`）等 SmartWeave SDK 用于查询这些交易以在本地端重建合约状态，并随着每一笔交易修改合约状态。评估器（例如 `Warp`）使用标签来查询某合约的交易；它会通过 `App-Name` 标签与 `Contract` 标签来判定某交易是否属于该合约。

以下是一个合约交互（interaction）的示例：

- `App-Name` 表示这是一个 SmartWeave 的 **ACTION**。
- `Contract` 标签给出初始合约状态的特定交易 ID。
- `Input` 标签提供合约要执行的函数与其他所需数据：

```json
[
    {
        name:"App-Name"
        value:"SmartWeaveAction"
    },
    {
        name:"App-Version"
        value:"0.3.0"
    },
    {
        name:"Contract"
        value:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        name:"Input"
        value:"{
            "function":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```

以下是一个**合约**（contract）的示例：

- `App-Name` 表示这是一个 SmartWeave 的 **CONTRACT**
- `Contract-Src` 标签指向合约的原始程式码：

```json
[
    {
        key:"App-Name"
        value:"SmartWeaveContract"
    },
    {
        key:"App-Version"
        value:"0.3.0"
    },
    {
        key:"Contract-Src"
        value:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        key:"SDK"
        value:"RedStone"
    },
    {
        key:"Content-Type"
        value:"application/json"
    }
]
```

最终产生的结果即为合约的当前状态，客户端的 SDK 可利用此状态来计算用户余额、合约所有者以及其他合约特定的细节。一旦调用者拥有经验证的合约状态，他们就可以为用户建立一个交互（interaction）并部署至链上；该交互在被挖矿或于 [网关](/concepts/gateways.md) 上被索引后，会在下一次有人重建合约状态时被包含进去。

如需关于 SmartWeave 协议、其领先实现 Warp Contracts 与更多内容的完整概览，请前往 [Warp Academy](https://academy.warp.cc/)。在那里可深入逐步教学、探讨进阶概念，并了解 SmartWeave 如何驱动 Permaweb 的功能！

## SmartWeave 生态系统项目

有相当多的生态系统项目在使用 SmartWeave 智能合约，以下列出一些重点：

### 实现（Implementations）

- [Warp](https://warp.cc/) | 主要的 SmartWeave SDK 提供者、教学资源，并协助维护 SmartWeave 协议。
- [MEM](https://www.mem.tech/) | Molecular Execution Machine（MEM）是一个开发者平台，支持在去中心化环境内构建与使用高可用与高性能的应用。

### 工具（Tools）

- [SonAr](https://sonar.warp.cc/#/app/contracts) | SmartWeave 合约浏览器，由 Warp 创建与托管。

### 资源（Resources）

- [Warp Academy](https://academy.warp.cc/) | 一站式 SmartWeave 教学与资源中心

### 应用（Apps）

- [Permapages](https://permapages.app/) | 永久网页创建工具、ArNS 购买入口，以及 ANT 创建入口。你在 permaweb 的个人档案。
- [ArNS](arns.md) | Arweave 名称系统 <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | 以智能合约实现的 NoSQL 数据库。
- [KwilDB](https://docs.kwil.com/) | 以智能合约实现的 SQL 数据库。
- [ArDrive Inferno](https://ardrive.io/inferno/) | 通过 ArDrive 上传可获得 PST。
- [FirstBatch](https://www.firstbatch.xyz/) | FirstBatch 帮助开发者与企业打造个性化、私有且无失真的 AI 应用。
- [Othent](https://othent.io/) | 使用现有的传统社群登录进行 Web3 交易。
- [BazAR](https://bazar.arweave.net/) | 拥有真实世界权利的数字内容市场。
- [Alex the Archieve](https://alex.arweave.net/) | 使用 Arweave 不可变存储的去中心化文件保存平台。

以及更多其他项目。
