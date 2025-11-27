# 擷取交易資料

雖然索引服務允許查詢交易的 metadata，但它們不提供交易資料本身的存取。這是因為快取交易資料與建立索引 metadata 所需的資源不同。索引服務主要仰賴計算資源來對資料庫執行查詢，而交易資料較適合部署到內容傳遞網路（CDN）以優化儲存與頻寬使用。

大多數閘道會透過一組 HTTP 端點提供交易資料快取服務。任何 HTTP 客戶端/套件都可以用來從這些端點請求交易資料，例如 JavaScript 的 Axios 或 Fetch、PHP 的 Guzzle 等等。

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

若你想繞過交易資料快取服務，直接從 Arweave 的 peers/節點取得資料也是可行的，但這非常費工！

交易資料在 Arweave 上以連續的 256KB 區塊（chunks）序列存放，從網路一開始一直到目前區塊。此格式經過優化以支援礦工參與的 SPoRA 採礦機制，用以證明他們有儲存 Arweave 的資料。

::: info

1. 從一個已知的 peer 取得 peer 列表。
1. 詢問該 peer 哪些 chunk 偏移（offsets）包含你要的交易資料。
1. 向該 peer 要求這些 chunks。
   1. 若該 peer 回傳了 chunks，將它們重新組合回原本的格式。
1. （如果該 peer 沒有那些 chunks）遍歷 peer 列表向其他 peers 要求 chunks。
1. 對於你造訪過的每個 peer，檢查它們的 peer 列表並將尚未在你的列表中的 peers 新增進去。
1. 重複第 3 步，直到你取得所有 chunks。
   :::

每次想要從 Arweave 網路擷取資料都要做上述這麼多工作會相當麻煩。想像如果你要像 [https://public-square.arweave.net](https://public-square.arweave.net) 那樣顯示一個推文時間軸，使用者體驗會因為長時間載入與旋轉指示器而很差。由於 Arweave 上的資料是永久性的，因此以原始形式快取是安全的，能讓交易資料的擷取變得更快也更簡單。

下列 HTTP 端點是如何在 arweave.net 的交易資料快取服務中存取快取的交易資料。

<hr />

### 取得快取的交易資料

此方法會從快取中取回與指定交易 ID (TX_ID) 關聯的交易資料。

`https://arweave.net/TX_ID`

```js
const res = await axios.get(
  `https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`
);
console.log(res);
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "data": {
    "ticker": "ANT-PENDING",
    "name": "pending",
    "owner": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
    "controller": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
    "evolve": null,
    "records": {
      "@": "As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
    },
    "balances": {
      "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0": 1
    }
  },
  "status": 200,
  "statusText": "",
  "headers": {
    "cache-control": "public,must-revalidate,max-age=2592000",
    "content-length": "291",
    "content-type": "application/json; charset=utf-8"
  },
  "config": {
    "transitional": {
      "silentJSONParsing": true,
      "forcedJSONParsing": true,
      "clarifyTimeoutError": false
    },
    "adapter": ["xhr", "http"],
    "transformRequest": [null],
    "transformResponse": [null],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "env": {},
    "headers": {
      "Accept": "application/json, text/plain, */*"
    },
    "method": "get",
    "url": "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8"
  },
  "request": {}
}
```

</details>
<hr />

### 取得原始交易資料

某些 [交易類型](manifests.md) 的資料在渲染時會遵循不同規則，此端點會回傳未轉換的原始資料。
`https://arweave.net/raw/TX_ID`

```js
const result = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": {
      "id": "FOPrEoqqk184Bnk9KrnQ0MTZFOM1oXb0JZjJqhluv78"
    }
  }
}
```

</details>
<hr/>

每個 Arweave peer/節點也都會暴露一些 HTTP 端點，這些端點常被做為複製的閘道。你可以在這裡閱讀更多關於 Arweave peer 的 HTTP 端點：[/references/http-api.md](/references/http-api.md)。

---

## 使用 Wayfinder 擷取資料

[Wayfinder](https://docs.ar.io/wayfinder) 是一個協定與一套函式庫，透過 AR.IO 網路提供去中心化且經過密碼驗證的 Arweave 資料存取。Wayfinder 會自動為每個請求選擇最佳閘道、驗證資料完整性，並確保穩定存取永久網內容。

- 智慧路由：自動選擇最快且最可靠的閘道
- 資料驗證：確保你接收到的內容是真實且未被修改
- 去中心化存取：在 AR.IO 閘道網路間分散請求

### 安裝

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### 基本使用（JavaScript/TypeScript）

```js
import { Wayfinder, NetworkGatewaysProvider } from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
});

// Replace with your transaction ID
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

(async () => {
  try {
    const response = await wayfinder.request(`ar://${txId}`);
    const data = await response.text();
    console.log("Data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
})();
```

### React 使用方式

安裝兩個套件：

```bash
npm install @ar.io/wayfinder-react @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-react @ar.io/wayfinder-core
```

```jsx
import { WayfinderProvider, useWayfinderRequest } from "@ar.io/wayfinder-react";
import { NetworkGatewaysProvider } from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

function App() {
  return (
    <WayfinderProvider
      gatewaysProvider={new NetworkGatewaysProvider({ ario: ARIO.mainnet() })}
    >
      <MyComponent />
    </WayfinderProvider>
  );
}

function MyComponent() {
  const request = useWayfinderRequest();
  const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      try {
        const response = await request(`ar://${txId}`);
        setData(await response.text());
      } catch (e) {
        setData("Error: " + e.message);
      }
    })();
  }, [request, txId]);
  return <pre>{data}</pre>;
}
```

如需更進階的設定與使用方式，請參閱 [官方 Wayfinder 文件](https://docs.ar.io/wayfinder)。
