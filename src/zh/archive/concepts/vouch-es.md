# Vouch

## 介绍

#### Vouch 协议

Arweave 引入了 ANS-109 Vouch（身份声明）的概念。这是一项标准，使用特定的交易格式以及一些标签，允许 permaweb 上的任何人对任何 Arweave 地址的身份与是否为人类进行 “vouch”（背书/认证）。

将像 ANS-109 这样的标准加入 permaweb 将有助于将 Sybil 攻击与恶意行为者最小化，使 permaweb 的使用体验对用户来说更加安全。

#### VouchDAO

VouchDAO 是一个由社区主导、建立在 Vouch 标准之上的去中心化验证层。开发者建立 vouch 服务，VouchDAO 社区成员对哪些验证服务值得信赖进行投票。

当建立新的服务后，该服务的地址会在 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 界面上提交投票。如果该投票获得通过，则该服务会被加入为已验证的 Voucher。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 运作方式

开发者可以建立不同的 Vouch 服务，根据一组既定的要求对 Arweave 钱包进行见证或背书。当前的一个例子是 Twitter 服务，这是第一个 vouch 服务，目前已经为超过 180 个 Arweave 地址进行认证。

VouchDAO 智能合约的状态拥有一个属性 `vouched`（已认证）。当用户完成验证时，该状态会更新。对象 `vouched`（已认证）存储一个已认证地址的列表，格式如下：

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

完成验证的用户将在其钱包中收到 ANS-109 代币，以表明该钱包已被该服务认证。

## ANS-109 交易格式

| 标签名称     | 必填? | 标签值                                                             |
| ------------ | ----- | ------------------------------------------------------------------ |
| 应用程序名称 | 否    | `Vouch`                                                            |
| Vouch-For    | 否    | 要在此交易中被认证的 Arweave 地址                                  |
| 应用程序版本 | 是    | `0.1`                                                              |
| 验证方法     | 是    | 用于验证身份的方法，例如：`Twitter`/`In person`/`Gmail`/`Facebook` |
| 用户识别码   | 是    | 根据验证方法为用户所建立的识别码。例如 - `abhav@arweave.org`       |

## 资源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
