---
locale: es
---

# Vouch

## 介紹

#### Vouch 協議

Arweave 引入了 ANS-109 Vouch（身份聲明）的概念。這是一個標準，使用特定格式的交易以及一些標籤，以允許 permaweb 上的任何人為任何 Arweave 地址「背書」（certify）其身份與人性。

將像 ANS-109 這樣的標準加入 permaweb，有助於將 Sybil 攻擊與惡意行為者的影響降到最低，讓 permaweb 的使用體驗對用戶來說更安全。

#### VouchDAO

VouchDAO 是一個由社群領導、建立於 Vouch 標準之上的去中心化驗證層。開發者建立 Vouch 服務，而 VouchDAO 社群成員則對這些驗證服務是否值得信賴進行投票。

當一個新服務建立後，其地址會在 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 介面上進行投票。如果該投票通過，該服務便會被加入為已驗證的 Voucher。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 運作方式

開發者可以建立不同的 Vouch 服務，根據一組特定的要求對 Arweave 錢包進行背書。當前的一個實例是 Twitter 服務，這是第一個 Vouch 服務，目前已為超過 180 個 Arweave 地址進行認證。

VouchDAO 智能合約的狀態擁有一個屬性 `vouched`（已背書）。每當使用者被驗證時，此狀態會更新。`vouched`（已背書）物件儲存了一個已背書地址的清單，格式如下：

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

被驗證的使用者會在其錢包中收到 ANS-109 代幣，以表明該錢包已被該服務認證。

## ANS-109 交易格式

| 標籤名稱                 | _選項?_ | 標籤值                                                              |
| ------------------------ | ------- | ------------------------------------------------------------------- |
| Nombre de aplicación     | 否      | `Vouch`                                                             |
| Vouch-For                | 否      | 該交易中被認證的 Arweave 地址                                       |
| Versión de aplicación    | 是      | `0.1`                                                               |
| Método de verificación   | 是      | 用於驗證身份的方法。例如：`Twitter`/`En persona`/`Gmail`/`Facebook` |
| Identificador de usuario | 是      | 基於驗證方法的使用者識別碼。例如 - `abhav@arweave.org`              |

## 資源

- [VouchDAO](https://vouch-dao.arweave.net)
- [Contrato de VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
