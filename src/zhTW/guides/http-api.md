# 取得交易資料

雖然索引服務允許查詢交易的 metadata，但它們並不提供交易資料本身的存取。這是因為快取交易資料與索引 metadata 所需的資源不同。索引服務主要依賴計算資源來對資料庫進行查詢，而交易資料則較適合部署在內容傳遞網路（CDN）上以優化儲存與頻寬。

大多數 gateway 透過一組 HTTP 端點提供交易資料快取服務。任何 HTTP 用戶端/套件都可以用來向這些端點請求交易資料。例如 JavaScript 的 Axios 或 Fetch、PHP 的 Guzzle 等。

如果你想繞過交易資料快取服務，直接從 Arweave peers/nodes 取得資料也是可以的，但會非常花工夫！

交易資料在 Arweave 上以連續的 256KB 區塊序列儲存，從網路一開始一直到目前的區塊。此格式經過優化以支援 SPoRA 採礦機制，礦工參與此機制以證明他們正在儲存 Arweave 的資料。

::: info

1. 從一個已知的 peer 取回 peers 列表。
1. 向該 peer 詢問包含你交易資料的 chunk 偏移（chunk offsets）。
1. 向該 peer 要求那些 chunks。
   1. 如果 peer 提供了 chunks，將它們合併回原始格式。
1. （如果該 peer 沒有 chunks）逐一向 peers 列表中的其他 peer 詢問 chunks。
1. 對每個你拜訪的 peer，檢查它們的 peers 列表並將尚未在你的清單中的 peers 新增進去。
1. 重複第 3 步直到取得所有 chunks。
   :::

每次要從 Arweave 網路檢索資料時都要做這些事情，工作量相當大。想像如果你想像 [https://public-square.arweave.net](https://public-square.arweave.net) 那樣顯示推文時間軸，使用者體驗會因為長時間載入和等待轉圈而非常糟糕。由於 Arweave 上的資料是永久性的，以原始形式快取是安全的，且能讓檢索交易資料變得更快、更簡單。

以下說明如何在 arweave.net 的交易資料快取服務中存取快取的交易資料。

### 取得快取的交易資料

`https://arweave.net/TX_ID`

```js
const res = await axios.get(
  `https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`
);
console.log(res);
```

<details>
<summary><b>點擊查看範例結果</b></summary>

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

每個 Arweave peer/node 通常也會暴露一些 HTTP 端點，這些端點常被複製成 gateway。你可以在此處閱讀更多有關 Arweave peer 的 HTTP 端點資訊。

### 取得原始交易

`https://arweave.net/raw/TX_ID`

```js
const result = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>點擊查看範例結果</b></summary>

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
<summary><b>點擊查看範例結果</b></summary>

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

回傳的餘額單位為 Winston。要取得 $AR，請將餘額除以 1000000000000
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
此端點僅支援原生 Arweave 交易。交易必須已被確認後才會得到成功回應。
:::

```js
const result = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>點擊查看範例結果</b></summary>

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
<summary><b>點擊查看範例結果</b></summary>

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

## 使用 Wayfinder 取得資料

[Wayfinder](https://docs.ar.io/wayfinder) 是一套協定與程式庫，透過 AR.IO Network 提供去中心化且經密碼學驗證的 Arweave 資料存取。Wayfinder 會自動為每個請求選擇最佳的 gateway，驗證資料完整性，並確保能可靠存取永久網（permaweb）內容。

- 智慧路由：自動選擇最快且最可靠的 gateway
- 資料驗證：確保你收到的是原始且未被更改的內容
- 去中心化存取：將請求分散到 AR.IO 的 gateway 網路

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

如需更進階的設定與使用方式，請參閱 [官方 Wayfinder 文件](https://docs.ar.io/wayfinder)。
