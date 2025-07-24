---
locale: zh
---
# ArNS - Arweave命名系统
## 概述
Arweave命名系统（ArNS）是建立在Permaweb上由Smartweave所驱动的电话簿。

它是一个去中心化且抗审查的命名系统，由AR.IO Gateways驱动，用于将易读用户名连接到PermaWeb的应用程序、页面和数据。

该系统的工作原理类似于传统的DNS，用户可以在注册表中购买名称，DNS名称服务器将这些名称解析为IP地址。

通过ArNS，注册表是去中心化的、永久的，并存储在Arweave（使用Smartweave）上，每个AR.IO网关充当缓存和名称解析器。用户可以在ArNS注册表中注册一个名称，例如"my-name"，并设置一个指针指向任何Arweave交易ID。AR.IO网关将将该名称解析为其自己的子域，例如https://laserilla.arweave.net ，并将所有请求代理到关联的Arweave交易ID。每个注册的名称也可以与之关联的下层名称，每个下层名称指向一个Arweave交易ID，例如https://v1_laserilla.arweave.net ，给其所有者提供更多的灵活性和控制权。

## ArNS注册表
<!-- // TODO: link to smartweave concept // -->

ArNS使用Smartweave协议来管理其名称记录。每个记录或名称由用户租用并与ANT代币绑定。您可以将多个ArNS名称注册到单个ANT中，但不能将多个ANT注册到单个ArNS名称——网关将无法确定路由ID的指向位置。

ArNS名称最多可以包含32个字符，包括数字[0-9]、字母[a-z]和破折号[-]。破折号不能是尾随破折号，例如-myname。

## ANTs（Arweave Name Tokens）

ANTs是ArNS生态系统的重要组成部分，它们是拥有ArNS名称的实际关键。当您将ArNS名称注册到ANT时，ANT就成为该名称的传输方式。ArNS注册表不在乎谁拥有ANT，它只知道ANT所属的名称。

在ANT中，您可以构建出任何所需的功能，范围包括ArNS注册表批准的源代码交易列表。这些功能可以包括NFT、PST、DAO或完整的应用程序。

## 下层名称（Under_Names）

下层名称是由您的ANT（Arweave Name Token）持有和管理的记录。即使不拥有ArNS名称，您也可以创建和管理这些记录，并在将ANT发送给新的所有者时进行转移。同样，如果您的ArNS名称到期，并将您的ANT注册到新的ArNS名称上，您的所有下层名称将保持不变。

示例：您拥有oldName.arweave.net。

然后：您创建了下层名称"my" - my_oldName.arweave.net。

然后：oldName.arweave.net到期了，并且您将newName.arweave.net注册到了您的ANT上。

现在：my_下层名称可以在newName上访问 - my_newName.arweave.net。

以下是ANT合约状态的示例：

```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```
基本的"@"记录是ANT的初始路由ID。如果您将'my-name'注册到此ANT，并尝试通过my-name.arweave.net访问它，您将被重定向到@记录的transactionId。

如果您尝试访问undername1_my-name.arweave.net，您将得到'undername1'的transactionId。

理论上，ANT拥有不受限制的undernames数量。然而，将服务多少个取决于使用的ArNS名称的层级。
