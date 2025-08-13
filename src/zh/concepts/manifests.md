---
locale: zh
---
# 路径清单（Path Manifests）

## 概述

当向Arweave上传多个文件时，每个文件都被分配一个唯一的交易ID。默认情况下，这些ID没有以任何特定的方式进行分组或组织。

例如，您上传的猫的一张图片可能具有交易ID为[bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw)，而另一张图片具有交易ID为[FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0)。

| 猫1 | 猫2 |
|------|------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300">|<img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

这些交易ID有些笨重，很难找到您所有相关的文件。如果您上传了100张猫的图片，您将需要跟踪**100个不同的ID和链接**！

路径清单是一种将多个交易链接到单个基本交易ID并为它们赋予人类可读的文件名的方法。以猫的例子来说，您可以拥有一个基本交易ID来像文件夹一样保存所有图片 - 使用更容易记住的文件名来访问您的猫图片，例如[{基本ID}/猫1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/猫1.jpg)，[{基本ID}/猫2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/猫2.jpg)，等等。

创建分组的可读文件名集合对于在Arweave上创建实用的应用程序至关重要，它还可以有托管网站或其他文件集合的能力，如下面的示例所探讨的。

### 清单用途

---

在任何需要以层次方式分组文件的情况下，清单都很有用。例如：

- **存储NFT集合：**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

这与NFT集合在链接到存储API或IPFS上的NFT图像和元数据时使用的常见基本路径方法相符。

- **托管网站：**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png

### 清单结构

---

路径清单是使用以下标记创建并发布到Arweave的一种特殊格式的交易：

 `{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

交易数据以JSON格式，与下面的示例匹配。

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

源及进一步阅读请参见官方Arweave路径清单文档：[Arweave文档](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)
