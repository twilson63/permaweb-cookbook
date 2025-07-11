---
locale: zh
---
# SmartWeave

## 什么是SmartWeave？

SmartWeave是Arweave上主导的智能合约范例的名称。SmartWeave合约的一个独特属性是通过“惰性求值”过程提供合约的当前状态。这意味着，与Arweave的挖矿节点不断评估所有合约的当前状态不同，读取合约的客户端会自行评估状态。

## SmartWeave为什么重要？

去中心化应用的状态和逻辑需要像其余数据一样具有防止审查、永久性和可验证性。SmartWeave使开发人员能够编写智能合约，将应用的状态和逻辑封装在链上并以无信任的可验证方式执行。这是一个了不起的成就，因为Arweave协议不包括节点为网络评估智能合约状态的激励机制。

SmartWeave为合约交互提供了一个不可变的附加模式，利用永久存储来保存其状态。结果是一个完全去中心化的链上状态机，可以以无权限和无信任的方式为协议和应用提供动态功能。使用SmartWeave，开发人员可以创建存储在Arweave上且保证长期不发生变化的智能合约。这使他们能够以无权限和无信任的方式构建[Permaweb应用](/concepts/permawebApplications.md)，具有动态功能。

开发人员选择使用SmartWeave为其永久网应用实现逻辑的原因有几个：

- **去中心化存储**：SmartWeave基于Arweave构建，这意味着使用SmartWeave创建的应用将存储在一个分布式节点网络上，而不是集中式服务器上。这使它们更能抵抗审查、篡改和其他形式的干扰。

- **惰性求值**：SmartWeave合约的惰性求值功能能够实现高效和可扩展的执行。客户端读取合约时，由客户端负责评估状态，利用用户的处理能力而不是网络节点。

- **语言支持**：SmartWeave支持多种编程语言，包括JavaScript、TypeScript、Rust、Go、AssemblyScript和WASM（WebAssembly）。这使开发人员在创建SmartWeave应用程序时能够使用他们最熟悉的语言。

- **数据持久性**：Arweave设计用于以高耐用性和长寿命存储数据。这对于需要长期存储数据的应用程序（如历史记录或科学数据）非常有用。

- **经济模型**：Arweave使用基于永久存储概念的独特经济模型，激励矿工无限期地存储数据。这有助于确保使用SmartWeave创建的永久网应用的长期可行性和耐久性。

## SmartWeave如何工作？

SmartWeave合约的核心是由初始合约状态构建的，使用事务标签进行编辑、添加和减少。

SmartWeave SDK（例如`Warp`，以前称为`RedStone`）用于查询这些事务以在本地构建合约状态，并使用每个事务修改合约状态。评估器（`Warp`）使用标签查询合约的事务；通过应用程序名称标签和合约标签，它知道事务是合约的一部分。

以下是合约**交互**的示例：
- `App-Name`表示这是一个SmartWeave的**操作**。
- `Contract`标签提供初始合约状态的具体事务ID。
- `Input`标签为合约提供要执行的函数及其他数据：

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
以下是一个**合约**的示例：
- `App-Name`表示这是一个SmartWeave的**合约**。
- `Contract-Src`标签指向合约的源代码：

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

生成的状态是当前合约状态，客户端端的SDK可以使用它来计算用户余额、合约所有者和其他特定于合约的详情。一旦调用方有了经过验证的合约状态，他们可以构建一个交互操作供用户部署到链上，在[Gateway](/concepts/gateways.md)上被挖掘或索引，以便在下次构建合约状态时包含进去。

## SmartWeave生态系统项目

有很多生态系统项目利用SmartWeave智能合约，但以下是一些值得注意的项目：

### 实现
- [Warp](https://warp.cc/) | SmartWeave SDK的主要提供者，提供教程并帮助维护SmartWeave协议。
- [EXM](https://docs.exm.dev/) | Execution Machine（EXM）是一个在分散环境中创建和使用高可用性和高性能应用程序的开发平台。

### 工具
- [SonAr](https://sonar.warp.cc/#/app/contracts) | SmartWeave合约资源浏览器，由Warp创建和托管。

### 应用
- [Permapages](https://permapages.app/) | 永久网页创建工具，ArNS购买门户和ANT创建门户。您的永久网上个人资料。
- [ArNS](arns.md) | Arweave名称系统 <!-- // todo: 更新为arns门户发布时的链接 -->
- [WeaveDB](https://weavedb.dev/) | Smart Contract作为NoSQL数据库。
- [KwilDB](https://docs.kwil.com/) | Smart Contract作为SQL数据库。
- [ArDrive Inferno](https://ardrive.io/inferno/) | 通过Ardrive上传文件时获得PST。