# Vouch

## 介紹

#### Vouch 協議

Arweave 引入了 ANS-109 Vouch（身份聲明）的概念。這是一項標準，使用特定的交易格式以及一些標籤，允許 permaweb 上的任何人對任何 Arweave 位址的身份與人類性進行「vouch」（背書／認證）。

將像 ANS-109 這樣的標準加入 permaweb 將有助於將 Sybil 攻擊與惡意行為者最小化，讓 permaweb 的使用體驗對使用者來說更加安全。

#### VouchDAO

VouchDAO 是一個由社群主導、建立在 Vouch 標準之上的去中心化驗證層。開發者建立 vouch 服務，VouchDAO 社群成員對哪些驗證服務值得信賴進行投票。

當建立新的服務後，此服務的位址會在 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 介面上提交投票。如果該投票獲得通過，則該服務會被加入為已驗證的 Voucher。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 運作方式

開發者可以建立不同的 Vouch 服務，根據一組既定的要求對 Arweave 錢包進行見證或背書。當前的一個例子是 Twitter 服務，這是第一個 vouch 服務，目前已經為超過 180 個 Arweave 位址進行認證。

VouchDAO 智能合約的狀態擁有一個屬性 `vouched`（已認證）。當使用者完成驗證時，該狀態會更新。物件 `vouched`（已認證）儲存一個已認證位址的清單，格式如下：

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

完成驗證的使用者將在其錢包中收到 ANS-109 代幣，以表明該錢包已被該服務認證。

## ANS-109 交易格式

| 標籤名稱     | 必填? | 標籤值                                                             |
| ------------ | ----- | ------------------------------------------------------------------ |
| 應用程式名稱 | 否    | `Vouch`                                                            |
| Vouch-For    | 否    | 要在此交易中被認證的 Arweave 位址                                  |
| 應用程式版本 | 是    | `0.1`                                                              |
| 驗證方法     | 是    | 用以驗證身份的方法，例如：`Twitter`/`In person`/`Gmail`/`Facebook` |
| 使用者識別碼 | 是    | 根據驗證方法為使用者所建立的識別碼。例如 - `abhav@arweave.org`     |

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
