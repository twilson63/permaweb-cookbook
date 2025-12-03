# Vouch

## 概览

#### Vouch 协议

Arweave 引入了 ANS-109 Vouch（身份断言，Assertion of Identity）概念。这是一个标准，使用特定的交易格式并搭配若干标签，让任何人在 permaweb 上都能对任一 Arweave 地址的身份与是否为真人进行“背书”。

将像 ANS-109 这类标准加入 permaweb 有助于减少 Sybil 攻击与恶意行为者，从而为用户带来更安全的 permaweb 体验。

#### VouchDAO

VouchDAO 是一个由社区主导、基于 Vouch 标准构建的去中心化验证层。开发人员可以建立 vouch 服务，VouchDAO 社区成员则通过投票决定哪些验证服务被视为可信。

当新的服务建立后，其地址会通过 [VouchDAO 社群介面](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 进行选择。如果投票通过，该服务即会被加入为已验证的 Voucher。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 运作方式

开发人员可以建立各式 Vouch 服务，根据特定条件对用户的 Arweave 钱包提供背书。目前的范例为 Twitter 服务，为首个 vouch 服务，至今已对超过 180 个 Arweave 地址给予背书。

VouchDAO 智能合约的状态具有属性 `vouched`。每当用户通过验证，此状态便会更新。`vouched` 对象以以下格式储存被背书的地址清单：

```
ALAMAT_PENGGUNA_VOUCH:[
  {
    service:"ALAMAT_LAYANAN_1"
    transaction:"ID_TX"
  },
   {
    service:"ALAMAT_LAYANAN_2"
    transaction:"ID_TX"
  }
]
```

通过验证的用户会收到 ANS-109 代币，发送至其钱包，以表示该钱包已被该服务背书。

## ANS-109 交易格式

| 标签名称            | 是否可选？ | 标签值                                                                |
| ------------------- | ---------- | --------------------------------------------------------------------- |
| App-Name            | 否         | `Vouch`                                                               |
| Vouch-For           | 否         | 此交易中被背书的 Arweave 地址                                         |
| App-Version         | 是         | `0.1`                                                                 |
| Verification-Method | 是         | 验证身份的方法。示例 - `Twitter`/`Secara Langsung`/`Gmail`/`Facebook` |
| User-Identifier     | 是         | 根据验证方法的用户识别信息。示例 - `abhav@arweave.org`                |

## 资源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
