# 原子代币 概念与原则

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

原子代币（Atomic Token）是一个在 Permaweb 上参照资料与 SmartWeave 合约的单一永久识别码。

## 规格

数据 必须 存储在 Arweave 网络上，且能以交易识别码（Transaction Identifier）参照。

合约 必须 实现一个 `balances` 对象，用以表示原子代币的所有权。

合约 必须 实现一个 `transfer` 函数，该函数接受下列参数：

- target {WalletAddress or Contract}
- qty {Number}

> `transfer` 函数应将所有权从调用者转移给目标

## 选项

_这些是可以让原子代币在 Permaweb 上被发现并可交易的实现选项_

[Verto Flex](https://github.com/useverto/flex) - Flex 函数库让你的原子代币可以在不必信任交易所的情况下被买卖。

[可被发现的标签 - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - 这些额外的标签可以帮助 Permaweb 的应用程序与服务发现你的代币。

[查看指南](../guides/atomic-tokens/intro.md)
