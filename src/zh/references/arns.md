# Arweave 名称系统 (ArNS)

## 概览

Arweave 名称系统 (ArNS) 是 Permaweb 的电话簿。

它是一个去中心化且抗审查的命名系统，由 AR.IO Gateways 启用，用于将友好名称链接到 Permaweb 应用、页面与数据。

此系统的运作类似传统的 DNS，用户可以在注册表中购买名称，DNS 名称服务器会将这些名称解析（resolve）到 IP 地址。

在 ArNS 中，注册表是去中心化、永久且存储在 Arweave（通过 AO）上，每个 AR.IO gateway 同时扮演缓存与名称解析器。用户可以在 ArNS 注册表中注册名称（例如 "my-name"），并将该名称指向任一 Arweave 交易 ID（Transaction ID）。

AR.IO Gateways 会将该名称解析为其自身的子域，例如 https://laserilla.arweave.net，并将所有请求代理（proxy）到所关联的 Arweave 交易 ID。每个已注册的名称也可以拥有多个下级名称（undernames），每个下级名称皆指向一个 Arweave 交易 ID，例如 https://v1_laserilla.arweave.net，为持有人提供更多弹性与控制权。

## ArNS 注册表

ArNS 使用 AO 来管理其名称记录。每个记录（或名称）由用户租用或永久购买，并绑定到一个 ANT 代币（ANT token）。你可以将多个 ArNS 名称注册到单一 ANT，但不能将多个 ANT 注册到单一 ArNS 名称——否则 gateway 无法判断应该将路由指向哪个 ID。

ArNS 名称最多可包含 32 个字符，允许的字符包括数字 [0-9]、小写英文字母 [a-z] 与连字符 [-]。连字符不得为末尾连字符，例如 -myname。

## ANTs（Arweave 名称代币）

ANTs 是 ArNS 生态系统中的关键部分 —— 它们是拥有 ArNS 名称的实际钥匙。當你將 ArNS 名稱註冊到某個 ANT 時，該 ANT 隨即成為該名稱的轉移（轉讓）方式。ArNS 註冊表並不關心誰擁有該 ANT，它僅記錄該名稱所屬的 ANT。

在 ANT 內，你可以依據 ArNS 註冊表核准的原始程式碼交易清單範圍，构建任意你需要的功能。

## 下级名称

下级名称（undernames）是由你的 ANT（Arweave Name Token）持有并管理的记录。这些记录可以在未拥有 ArNS 名称的情况下创建与管理，并会在 ANT 转移给新持有人时一并转移。同样地，如果你的 ArNS 名称到期，且你把 ANT 注册到新的 ArNS 名称，所有下级名称将会保持不变。

示例：你拥有 oldName.arweave.net。

接着：你创建下级名称 "my" —— my_oldName.arweave.net。

再接着：oldName.arweave.net 到期，你把 newName.arweave.net 注册到你的 ANT。

现在：my\_ 下级名称可通过 newName 访问 —— my_newName.arweave.net。

下面是一个 ANT 合约 State 的示例：

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

base 的 "@" 记录是该 ANT 的初始路由 ID。如果你将 'my-name' 注册到此 ANT，并通过 my-name.arweave.net 访问，将会被导向到 @ 记录所对应的 transactionId。

如果你尝试访问 undername1_my-name.arweave.net，则会取得 undername1 的 transactionId。

理论上，ANT 可以有无限数量的下级名称（undernames）。然而，实际会被提供的数量取决于你为 ArNS 名称所使用的层级（tier）。

## 资源

- [ArNS App](https://arns.app/)
- [ArNS Docs](https://docs.ar.io/arns/)
