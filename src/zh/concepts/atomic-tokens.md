---
locale: zh
---
# 原子代币概念和原则

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

原子代币是一个永久标识符，用于引用Permaweb上的数据和SmartWeave合约。

## 规范

数据必须存储在arweave网络上，并可通过交易标识符（TxId）引用。

合约必须实现一个表示原子代币所有权的“balances”对象。

合约必须实现一个“transfer”函数，接受以下参数：
-  target {钱包地址或合约}
-  qty {数量}

> 转移函数应将所有权从调用者转移到目标。

## 选项

_这些是可以使原子代币在Permaweb上可发现和可交易的实现选项_

[Verto Flex](https://github.com/useverto/flex) - Flex库允许您的原子代币在无需信任交易所的情况下进行出售或购买。

[发现性标签 - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - 这些附加标签可以帮助Permaweb应用程序和服务发现您的令牌。

[查看指南](../guides/atomic-tokens/intro.md)
