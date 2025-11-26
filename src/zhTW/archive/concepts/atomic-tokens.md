# 原子代幣（Atomic Token）概念與原則

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

原子代幣（Atomic Token）是一個單一的永久識別符，用以在 Permaweb 上引用資料與 SmartWeave 合約。

## 規格

資料 MUST 儲存在 arweave 網路，且可由交易識別碼（Transaction Identifier）參考

合約 MUST 實作一個 `balances` 物件，以表示原子代幣的所有權

合約 MUST 實作一個 `transfer` 函式，其接受下列參數：

- target {WalletAddress 或 Contract}
- qty {Number}

> 轉移函式應將所有權從呼叫者轉移給目標

## 選項

_這些是實作選項，可讓原子代幣在 Permaweb 上更容易被發現與交易_

[Verto Flex](https://github.com/useverto/flex) - Flex 函式庫讓你的原子代幣能在不必信任交易所的情況下被買賣。

[可發現性標籤 - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - 這些額外標籤可以幫助 Permaweb 的應用程式和服務發現你的代幣。

[查看指南](../guides/atomic-tokens/intro.md)
