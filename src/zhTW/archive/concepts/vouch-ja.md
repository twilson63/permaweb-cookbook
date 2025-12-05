# Vouch

## 概述

#### 動機

Vouch 提供了一種針對 Sybil 攻擊的去中心化方法。Sybil 攻擊是指攻擊者建立大量偽造身分以侵入網路並獲取不相稱影響力的行為。

#### Vouch 協議

Arweave 引入了 ANS-109 Vouch（身份聲明）的概念。這是一個標準，使用特定的交易格式和若干標籤，使任何人都能在 permaweb 上對任意 Arweave 位址的身份與人性進行「保證」。

將像 ANS-109 這樣的標準加入 permaweb，可將 Sybil 攻擊與惡意參與者降到最低，為 permaweb 使用者提供更安全的體驗。

#### VouchDAO

VouchDAO 是建立在 Vouch 標準之上的社群驅動去中心化驗證層。開發者可以建立保證服務，VouchDAO 社群成員則透過投票決定哪些驗證服務是值得信賴的。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 運作方式

開發者可以建立各種 Vouch 服務，依據特定需求對使用者的 Arweave 錢包進行保證。目前的範例包括首個已為超過 180 個 Arweave 位址提供保證的 Twitter 服務。

VouchDAO 智能合約的狀態包含一個名為 `vouched` 的屬性。該狀態會在使用者被驗證時更新。`vouched` 物件以以下格式儲存已保證位址的清單。

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

被驗證的使用者會收到 ANS-109 代幣，以示該錢包已被該服務保證。

## ANS-109 交易格式

| 標籤名稱            | _選填？_ | 標籤值                                                           |
| ------------------- | -------- | ---------------------------------------------------------------- |
| App-Name            | 必填     | `Vouch`                                                          |
| Vouch-For           | 必填     | このトランザクションで保証される Arweave の`address`             |
| App-Version         | 選填     | `0.1`                                                            |
| Verification-Method | 選填     | 該人身份的驗證方式。例如 - `Twitter`/`面對面`/`Gmail`/`Facebook` |
| User-Identifier     | 選填     | 根據驗證方式的使用者識別符。例如 - `abhav@arweave.org`           |

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
