# 路径清单

当将文件上传到 Arweave 时，每个文件都会被指派一个独立的交易 ID。默认情况下，这些 ID 并不会以任何特定方式进行分组或组织。

路径清单（Path Manifests）是一种特殊类型的 Arweave 交易，可将多个文件在单一识别符下进行分组。

## 使用案例

路径清单最常见的两个使用案例是 NFT 收藏与构建静态网站。

通常，将 100 张图片上传至 Arweave 会产生 100 个不同的交易 ID。

路径清单提供了一种方法，将多个交易在单一基础交易 ID 之下链接起来，并为它们指定具可读性的文件名。以猫咪示例为例，你可以只记住一个基础交易 ID 并像使用文件夹般使用它 — 通过更容易记忆的文件名访问你的猫咪图片，例如 [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg)、[{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg) 等等。

建立成组且可读的文件名集合对于在 Arweave 上开发实用应用程序至关重要，并启用如下示例所示的网站或其他文件集合托管能力。

### 示例

---

每当你需要以分层方式将文件分组时，清单（manifests）都会很有用。举例来说：

- **存储 NFT 收藏：**
  - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
  - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

这与 NFT 收藏在链接至存储 API 或 IPFS 上的 NFT 图像与 metadata 时常用的基础路径方式相呼应。

- **托管网站：**
  - https://arweave.net/X8Qm…AOhA/index.html
  - https://arweave.net/X8Qm…AOhA/styles.css
  - https://arweave.net/X8Qm…AOhA/public/favicon.png

## 清单结构

路径清单是一种特殊格式的交易，使用下列 Tag 建立并发布到 Arweave：

`{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

并且其交易数据需为符合下方示例的 JSON 格式。

```json
{
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
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

路径清单亦提供 `fallback` 属性，该对象接受子属性 `id`，此属性定义在解析器无法正确解析所请求路径时要回退到的 Arweave 数据项交易 ID。

## 来源与延伸阅读

- [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)
