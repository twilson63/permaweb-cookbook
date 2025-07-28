---
locale: zh
---
# 概述

---

利润分享通证（PST）是一种SmartWeaveToken，包括以下结构：

| 属性       | 类型       |
| ---------- | ---------- |
| 余额       | 对象       |
| 名称       | 字符串     |
| 代号       | 字符串     |
| 转账       | 方法       |
| 余额查询   | 方法       |

PST通常用于治理一个协议或“利润分享社区”（PSC），类似于DAO。

### 如何分发PST？

---

应用的创始人可以创建一定数量的PST，并根据自己的意愿分发它们，可以保留或出售给投资者以筹集资金。

协议可以以PST作为奖励来奖励贡献工作或完成社区任务以激励增长。

PST也可以在[Permaswap](https://permaswap.network/#/)（目前处于测试网）之间进行交换，开发人员可以使用[Verto Flex](https://github.com/useverto/flex)设置代币交易权限。

### 特点

---

PST作为“微股息”起作用。当使用协议时，一定数量的小费被保留下来分配给持有者。小费以 $AR 的形式支付，而不是PST的货币。这在正在开发的应用程序和Arweave之间创造了一种特殊的关系。

### 好处

---

- 为开发人员提供了一种灵活的方式来运行协议，并根据需要分发“所有权”
- PST可以用作协议工作或社区任务的支付方式
- 鼓励创始人增加网络使用量，因为它直接与收入相关
- 持有者获得内在价值（奖励 $AR，而不是更多的“股份”）

### 示例PST：ARDRIVE Token

---

ArDrive是一个永久网络应用程序，利用了他们恰如其名的PST，即ARDRIVE。

当有人通过ArDrive支付 $AR 来上传数据时，15% 的社区费用会按照随机加权的方法分配给一个令牌持有者。

![ArDrive PST Cycle](~@source/images/ardrive-pst.png)

用户上传数据 -> 一个 ARDRIVE 代币持有者收到 $AR -> ARDRIVE 代币持有者可以使用这个 $AR 来上传文件 -> 周期重复。希望这给您一个关于您可以实现自己的PST的一个好主意！

### 探索PSTs

---

直接使用ViewBlock和Sonar by Redstone可能是最合适的。只需使用显示PST的链接，以免让人们翻阅查找。

您可以使用[ViewBlock](https://viewblock.io/arweave)获得类似于etherscan的体验，查看PST合约，例如[这里](https://viewblock.io/arweave/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ)。

另一个选择是Sonar，这是一个由[RedStone Finance](https://sonar.redstone.tools/#/app/contracts)构建的Arweave智能合约浏览器。在这里查看相同的合约[here](https://sonar.warp.cc/?#/app/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ)。

> 一些社区成员已经在讨论将PST称为“永久网络服务通证”。在PST方面还有很多探索要做 → 加入[此处](https://discord.com/channels/999377270701564065/999377270701564068/1055569446481178734)的讨论（Discord）。