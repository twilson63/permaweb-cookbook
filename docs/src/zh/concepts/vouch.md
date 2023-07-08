---
locale: zh
---
# Vouch（背书）
## 概述
#### Vouch 协议
Arweave 引入了 ANS-109 Vouch（身份声明）的概念。它是一种使用特定的交易格式和一些标签的标准，允许 permaweb 上的任何人为任何 Arweave 地址的身份和人性提供“背书”。

将 ANS-109 这样的标准添加到 permaweb 中将有助于最小化 Sybil 攻击和恶意行为者，使 permaweb 用户体验更加安全。

#### VouchDAO
VouchDAO 是一个由社区领导的、建立在 Vouch 标准之上的分散验证层。开发者创建背书服务，VouchDAO 社区的成员投票决定哪些验证服务值得信赖。

一旦创建了新的服务，其地址将在 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 接口上进行投票。如果投票通过，它将被添加为经过验证的背书。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 工作原理
开发者可以创建不同的 Vouch 服务，根据给定的一组要求对用户的 Arweave 钱包进行证明。当前的一个例子是 Twitter 服务，这是第一个背书服务，迄今已为超过180个 Arweave 地址提供了背书。

VouchDAO 智能合约状态具有一个 `vouched` 属性。每当用户进行验证时，状态将会更新。`vouched` 对象以以下格式存储一系列接受背书的地址：
```
VOUCH_USER_ADDRESS:[
  {
    service:"SERVICE_ADDRESS_1"
    transaction:"TX_ID"
  },
   {
    service:"SERVICE_ADDRESS_2"
    transaction:"TX_ID"
  }
]
```

获得验证的用户将在他们的钱包中收到 ANS-109 令牌，表示该钱包已经由该服务进行了背书。

## ANS-109 交易格式 
| 标签名 | _是否可选_ | 标签值 |
|---|---|---|
|App-Name|否|`Vouch`|
|Vouch-For|否|正在此交易中为其提供背书的 Arweave `address`|
|App-Version|是|`0.1`|
|Verification-Method|是|验证此人的身份的方法。例如 - `Twitter`/`In-Person`/`Gmail`/`Facebook`|
|User-Identifier|是|基于验证方法的用户标识符。例如 - `abhav@arweave.org`|

## 资源
* [VouchDAO](https://vouch-dao.arweave.dev)
* [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)