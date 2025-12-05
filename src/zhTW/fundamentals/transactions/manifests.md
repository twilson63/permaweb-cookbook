# 路徑清單

當將檔案上傳到 Arweave 時，每個檔案都會被指派一個獨立的交易 ID。預設情況下，這些 ID 並不會以任何特定方式進行群組或組織。

路徑清單（Path Manifests）是一種特殊類型的 Arweave 交易，可將多個檔案在單一識別符下進行分組。

## 使用案例

路徑清單最常見的兩個使用案例是 NFT 收藏與建置靜態網站。

通常，將 100 張圖片上傳至 Arweave 會產生 100 個不同的交易 ID。

路徑清單提供了一種方法，將多個交易在單一基底交易 ID 之下連結起來，並為它們指定具可讀性的檔名。以貓咪範例為例，你可以只記住一個基底交易 ID 並像使用資料夾般使用它 — 透過更容易記憶的檔名存取你的貓咪圖片，例如 [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg)、[{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg) 等等。

建立成組且可讀的檔名集合對於在 Arweave 上開發實用應用程式至關重要，並啟用如下範例所示的網站或其他檔案集合託管能力。

### 範例

---

每當你需要以階層方式將檔案群組時，清單（manifests）都會很有用。舉例來說：

- **儲存 NFT 收藏：**
  - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
  - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

這與 NFT 收藏在連結至儲存 API 或 IPFS 上的 NFT 圖像與 metadata 時常用的基底路徑方式相呼應。

- **託管網站：**
  - https://arweave.net/X8Qm…AOhA/index.html
  - https://arweave.net/X8Qm…AOhA/styles.css
  - https://arweave.net/X8Qm…AOhA/public/favicon.png

## 清單結構

路徑清單是一種特殊格式的交易，使用下列 Tag 建立並發佈到 Arweave：

`{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

並且其交易資料需為符合下方範例的 JSON 格式。

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

路徑清單亦提供 `fallback` 屬性，該物件接受子屬性 `id`，此屬性定義在解析器無法正確解析所請求路徑時要回退到的 Arweave 資料項目交易 ID。

## 來源與延伸閱讀

- [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)
