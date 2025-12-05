# 擷取交易資料

雖然索引服務允許查詢交易的 metadata，但它們不提供交易資料本身的存取。這是因為快取交易資料與建立索引 metadata 所需的資源不同。索引服務主要依賴運算資源對資料庫進行查詢，而交易資料較適合部署在內容傳遞網路 (CDN) 上，以優化儲存與頻寬。

大多數網關都會透過一組 HTTP 端點提供交易資料快取服務。任何 HTTP 用戶端/套件都可以用來從這些端點請求交易資料，例如 JavaScript 的 Axios 或 Fetch、PHP 的 Guzzle 等等。

如果你想繞過交易資料快取服務，直接從 Arweave 的同儕/節點抓取資料也是可以的，但會非常麻煩！

交易資料在 Arweave 上以從網路起始到當前區塊的一連續 256KB 區塊（chunk）序列儲存。此格式是為了支援礦工用以證明他們正在儲存 Arweave 資料的 SPoRA 挖礦機制所優化。

::: info

1. 從一個知名的同儕取得同儕名單。
1. 向該同儕詢問包含你欲取回的交易資料之 chunk 的位移（offsets）。
1. 向該同儕請求那些 chunk。
   1. 如果該同儕提供了 chunk，將它們合併回原始格式。
1. （如果該同儕沒有那些 chunk）遍歷同儕名單並向其他同儕索取 chunk。
1. 對於每個拜訪過的同儕，檢查其同儕名單並將尚未在你名單中的同儕加入。
1. 重複從步驟 3 開始直到取得所有 chunk。
   :::

每次要從 Arweave 網路取回資料時都要執行上述流程相當耗時。試想如果你要像 https://public-square.arweave.net 那樣顯示一個推文時間軸，用戶體驗會因為漫長的載入時間與等待指示而變差。由於 Arweave 上的資料是永久性的，將原始資料快取下來以加快交易資料的擷取是安全且實用的作法。

以下說明如何在 arweave.net 的交易資料快取服務存取快取的交易資料。

### 取得快取的交易資料

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

每個 Arweave 同儕/節點也會公開一些 HTTP 端點，這些端點常被重複部署為網關。你可以在這裡閱讀更多關於 Arweave 同儕的 HTTP 端點的資訊。

### 取得原始交易

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

### 依欄位取得

`https://arweave.net/tx/TX_ID/FIELD`

可用欄位： id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "ticker": "ANT-PENDING",
  "name": "pending",
  "owner": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "controller": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "evolve": null,
  "records": {
    "@": "As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
  },
  "balances": { "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0": 1 }
}
```

</details>
<hr />

### 取得錢包餘額

回傳的餘額單位為 Winston。若要取得 $AR，請將餘額除以 1000000000000
`https://arweave.net/wallet/ADDRESS/balance`

```js
const res = await axios.get(
  `https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`
);
console.log(res);
console.log(res.data / 1000000000000);

6638463438702; // Winston
6.638463438702; // $AR
```

### 取得交易狀態

`https://arweave.net/tx/TX_ID/status`
::: tip
此端點僅支援原生 Arweave 交易。交易必須被確認後才能取得成功的回應。
:::

```js
const result = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "block_height": 1095552,
  "block_indep_hash": "hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3",
  "number_of_confirmations": 10669
}
```

</details>
<hr />

### 取得網路資訊

```js
const res = await axios.get("https://arweave.net/info");
console.log(res.data);
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "network": "arweave.N.1",
  "version": 5,
  "release": 53,
  "height": 1106211,
  "current": "bqPU_7t-TdRIxgsja0ftgEMNnlGL6OX621LPJJzYP12w-uB_PN4F7qRYD-DpIuRu",
  "blocks": 1092577,
  "peers": 13922,
  "queue_length": 0,
  "node_state_latency": 0
}
```

</details>
<hr />

---

## 使用 Wayfinder 擷取資料

[Wayfinder](https://docs.ar.io/wayfinder) 是一個協定與一組函式庫，透過 AR.IO 網路提供去中心化、具密碼學驗證的 Arweave 資料存取。Wayfinder 會自動為每次請求選擇最佳網關、驗證資料完整性，並確保可靠地存取永久網（permaweb）內容。

- 智能路由：自動選擇最快且最可靠的網關
- 資料驗證：確保收到的是真實、未被修改的內容
- 去中心化存取：將請求分散到 AR.IO 的網關網路

### 安裝

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### 基本用法 (JavaScript/TypeScript)

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

### React 用法

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

如需進階設定與使用，請參閱 [官方 Wayfinder 文件](https://docs.ar.io/wayfinder)。
