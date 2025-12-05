# Vouch（担保）

## 概览

#### 动机

Vouch 提供了一种去中心化的方法来抵御 Sybil 攻击。Sybil 攻击是攻击者通过建立大量伪匿名身份来颠覆网络，从而获得不成比例的影响力。

#### Vouch 协议

Arweave 提出了 ANS-109 Vouch（身份断言）的概念。这是一个标准，使用特定的交易格式以及一些标签，允许任何人在 permaweb 上为任何 Arweave 地址的身份与人性进行「担保」。

在 permaweb 上加入像 ANS-109 这类标准，有助于将 Sybil 攻击与恶意行为者的影响降到最低，为 permaweb 使用者提供更安全的体验。

## ANS-109 交易格式

| 标签名称            | 是否为选填？ | 标签值                                                                    |
| ------------------- | ------------ | ------------------------------------------------------------------------- |
| App-Name            | 否           | `Vouch`                                                                   |
| Vouch-For           | 否           | Arweave `address` 在此交易中被担保的地址                                  |
| App-Version         | 是           | `0.1`                                                                     |
| Verification-Method | 是           | 用于验证该人的身份的方法。例如 - `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | 是           | 根据 Verification Method 的用户识别码。例如 - `abhav@arweave.org`         |

## 资源

- [ANS-109 文件](https://github.com/ArweaveTeam/arweave-standards/blob/ans-109/ans/ANS-109.md)
