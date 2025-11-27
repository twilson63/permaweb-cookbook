# Vouch

## 概覽

#### Vouch 協議

Arweave 引入了 ANS-109 Vouch（Assertion of Identity）概念。這是一個標準，使用特定的交易格式並搭配若干標籤，讓任何人在 permaweb 上都能對任一 Arweave 地址的身分與人性進行「背書」。

將像 ANS-109 這類標準加入 permaweb 有助於減少 Sybil 攻擊與惡意行為者，從而為使用者帶來更安全的 permaweb 體驗。

#### VouchDAO

VouchDAO 是一個由社群主導、基於 Vouch 標準構建的去中心化驗證層。開發人員可以建立 vouch 服務，VouchDAO 社群成員則透過投票決定哪些驗證服務被視為可信。

當新的服務建立後，其地址會透過 [VouchDAO 社群介面](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 進行選擇。如果投票通過，該服務即會被加入為已驗證的 Voucher。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 運作方式

開發人員可以建立各式 Vouch 服務，根據特定條件對使用者的 Arweave 錢包提供背書。目前的範例為 Twitter 服務，為首個 vouch 服務，至今已對超過 180 個 Arweave 地址給予背書。

VouchDAO 智能合約的狀態具有屬性 `vouched`。每當使用者通過驗證，此狀態便會更新。`vouched` 物件以以下格式儲存被背書的地址清單：

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

通過驗證的使用者會收到 ANS-109 代幣，發送至其錢包，以表示該錢包已被該服務背書。

## ANS-109 交易格式

| 標籤名稱            | 是否選填？ | 標籤值                                                                |
| ------------------- | ---------- | --------------------------------------------------------------------- |
| App-Name            | Tidak      | `Vouch`                                                               |
| Vouch-For           | Tidak      | 此交易中被背書的 Arweave 地址                                         |
| App-Version         | Ya         | `0.1`                                                                 |
| Verification-Method | Ya         | 驗證身分的方法。範例 - `Twitter`/`Secara Langsung`/`Gmail`/`Facebook` |
| User-Identifier     | Ya         | 依據驗證方法的使用者識別資訊。範例 - `abhav@arweave.org`              |

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
