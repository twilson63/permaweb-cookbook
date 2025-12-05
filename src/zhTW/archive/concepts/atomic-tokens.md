# 原子代幣 概念與原則

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

原子代幣（Atomic Token）是一個在 Permaweb 上參照資料與 SmartWeave 合約的單一永久識別碼。

## 規格

資料 MUST 儲存在 Arweave 網路上，且能以交易識別碼（Transaction Identifier）參照。

合約 MUST 實作一個 `balances` 物件，用以表示原子代幣的所有權。

合約 MUST 實作一個 `transfer` 函式，該函式接受下列參數：

- target {WalletAddress or Contract}
- qty {Number}

> `transfer` 函式應將所有權從呼叫者轉移給目標

## 選項

_這些是可以讓原子代幣在 Permaweb 上被發現並可交易的實作選項_

[Verto Flex](https://github.com/useverto/flex) - Flex 函式庫讓你的原子代幣可以在不必信任交易所的情況下被買賣。

[可被發現的標籤 - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - 這些額外的標籤可以幫助 Permaweb 的應用程式與服務發現你的代幣。

[查看指南](../guides/atomic-tokens/intro.md)
