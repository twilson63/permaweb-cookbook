# Vouch

## 概述

#### 动机

Vouch 提供了一种针对 Sybil 攻击的去中心化方法。Sybil 攻击是指攻击者建立大量伪造身份以侵入网络并获取不相称影响力的行为。

#### Vouch 协议

Arweave 引入了 ANS-109 Vouch（身份声明）的概念。这是一个标准，使用特定的交易格式和若干标签，使任何人都能在 permaweb 上对任意 Arweave 地址的身份与人性进行“担保”。

将像 ANS-109 这样的标准加入 permaweb，可将 Sybil 攻击与恶意参与者降到最低，为 permaweb 用户提供更安全的体验。

#### VouchDAO

VouchDAO 是建立在 Vouch 标准之上的社区驱动去中心化验证层。开发者可以建立 Vouch 服务，VouchDAO 社区成员则通过投票决定哪些验证服务是值得信赖的。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 运作方式

开发者可以建立各种 Vouch 服务，根据特定需求对用户的 Arweave 钱包进行担保。目前的示例包括首个已为超过 180 个 Arweave 地址提供担保的 Twitter 服务。

VouchDAO 智能合约的状态包含一个名为 `vouched` 的属性。该状态会在用户被验证时更新。`vouched` 对象以以下格式存储已担保地址的列表。

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

被验证的用户会收到 ANS-109 代币，以示该钱包已被该服务担保。

## ANS-109 交易格式

| 标签名称            | _可选？_ | 标签值                                                           |
| ------------------- | -------- | ---------------------------------------------------------------- |
| App-Name            | 必填     | `Vouch`                                                          |
| Vouch-For           | 必填     | 该交易中被担保的 Arweave 的 `address`                            |
| App-Version         | 可选     | `0.1`                                                            |
| Verification-Method | 可选     | 该人身份的验证方式。例如 - `Twitter`/`面对面`/`Gmail`/`Facebook` |
| User-Identifier     | 可选     | 根据验证方式的用户标识符。例如 - `abhav@arweave.org`             |

## 资源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
