# Vouch（背書）

## 概述

#### Vouch 協議

Arweave 引入了 ANS-109 Vouch（身份聲明）的概念。它是一種使用特定的交易格式和一些標籤的標準，允許 permaweb 上的任何人為任何 Arweave 地址的身份和人性提供「背書」。

將 ANS-109 這樣的標準添加到 permaweb 中將有助於最小化 Sybil 攻擊和惡意行為者，使 permaweb 使用者體驗更加安全。

#### VouchDAO

VouchDAO 是一個由社群領導的、建立在 Vouch 標準之上的去中心化驗證層。開發者建立背書服務，VouchDAO 社群的成員投票決定哪些驗證服務值得信賴。

一旦建立了新的服務，其地址將在 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 介面上進行投票。如果投票通過，它將被新增為經過驗證的背書。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 工作原理

開發者可以建立不同的 Vouch 服務，根據給定的一組要求對使用者的 Arweave 錢包進行驗證。目前的一個例子是 Twitter 服務，這是第一個背書服務，迄今已為超過 180 個 Arweave 地址提供了背書。

VouchDAO 智能合約狀態具有一個 `vouched` 屬性。每當使用者進行驗證時，狀態會更新。`vouched` 物件以以下格式儲存一系列接受背書的地址：

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

獲得驗證的使用者將在他們的錢包中收到 ANS-109 令牌，表示該錢包已經由該服務進行了背書。

## ANS-109 交易格式

| 標籤名              | _是否可選_ | 標籤值                                                              |
| ------------------- | ---------- | ------------------------------------------------------------------- |
| App-Name            | 否         | `Vouch`                                                             |
| Vouch-For           | 否         | 在此交易中為其提供背書的 Arweave `address`                          |
| App-Version         | 是         | `0.1`                                                               |
| Verification-Method | 是         | 驗證此人身份的方法。例如 - `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | 是         | 基於驗證方法的用戶標識符。例如 - `abhav@arweave.org`                |

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
