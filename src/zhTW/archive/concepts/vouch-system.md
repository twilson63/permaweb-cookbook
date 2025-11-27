# Vouch（擔保）

## 概覽

#### 動機

Vouching 提供了一種去中心化的方法來抵禦 Sybil 攻擊。Sybil 攻擊是攻擊者透過建立大量偽匿名身分來顛覆網路，從而獲得不成比例的影響力。

#### Vouch 協議

Arweave 提出了 ANS-109 Vouch（身份斷言）的概念。這是一個標準，使用特定的交易格式以及一些標籤，允許任何人在 permaweb 上為任何 Arweave 位址的身份與人性進行「擔保」。

在 permaweb 上加入像 ANS-109 這類標準，有助於將 Sybil 攻擊與惡意行為者的影響降到最低，為 permaweb 使用者提供更安全的體驗。

## ANS-109 交易格式

| 標籤名稱            | 是否為選填？ | 標籤值                                                                    |
| ------------------- | ------------ | ------------------------------------------------------------------------- |
| App-Name            | 否           | `Vouch`                                                                   |
| Vouch-For           | 否           | Arweave `address` 在此交易中被擔保的位址                                  |
| App-Version         | 是           | `0.1`                                                                     |
| Verification-Method | 是           | 用於驗證該人的身份的方法。例如 - `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | 是           | 根據 Verification Method 的使用者識別碼。例如 - `abhav@arweave.org`       |

## 資源

- [ANS-109 文件](https://github.com/ArweaveTeam/arweave-standards/blob/ans-109/ans/ANS-109.md)
