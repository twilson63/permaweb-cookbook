# 获取交易数据

虽然索引服务允许查询交易的 metadata，但它们不提供交易数据本身的访问。这是因为缓存交易数据与建立索引 metadata 所需的资源不同。索引服务主要依赖计算资源对数据库进行查询，而交易数据更适合部署在内容分发网络 (CDN) 上，以优化存储与带宽。

大多数网关都会通过一组 HTTP 端点提供交易数据缓存服务。任何 HTTP 客户端/库都可以用来从这些端点请求交易数据，例如 JavaScript 的 Axios 或 Fetch、PHP 的 Guzzle 等等。

如果你想绕过交易数据缓存服务，直接从 Arweave 的节点/对等节点抓取数据也是可以的，但会非常麻烦！

交易数据在 Arweave 上以从网络起始到当前区块的一连串 256KB 区块（chunk）序列存储。此格式是为支持矿工用以证明他们正在存储 Arweave 数据的 SPoRA 挖矿机制而优化的。

::: info

1. 从一个已知的节点取得节点列表。
1. 向该节点询问包含你欲取回的交易数据之 chunk 的偏移（offsets）。
1. 向该节点请求那些 chunk。
   1. 如果该节点提供了 chunk，将它们合并回原始格式。
1. （如果该节点没有那些 chunk）遍历节点列表并向其他节点索取 chunk。
1. 对于每个访问过的节点，检查其节点列表并将尚未在你列表中的节点加入。
1. 重复从步骤 3 开始直到取得所有 chunk。
   :::

每次要从 Arweave 网络取回数据时都要执行上述流程相当耗时。试想如果你要像 https://public-square.arweave.net 那样显示一个推文时间线，用户体验会因为漫长的加载时间与等待指示而变差。由于 Arweave 上的数据是永久性的，将原始数据缓存下来以加快交易数据的获取是安全且实用的做法。

以下说明如何在 arweave.net 的交易数据缓存服务访问缓存的交易数据。

### 获取缓存的交易数据

`https://arweave.net/TX_ID`

```js
const res = await axios.get(
  `https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`
);
console.log(res);
```

<details>
<summary><b>点击以查看示例结果</b></summary>

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

每个 Arweave 节点也会公开一些 HTTP 端点，这些端点常被重复部署为网关。你可以在这里阅读更多关于 Arweave 节点的 HTTP 端点的信息。

### 获取原始交易

`https://arweave.net/raw/TX_ID`

```js
const result = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>点击以查看示例结果</b></summary>

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

### 按字段获取

`https://arweave.net/tx/TX_ID/FIELD`

可用字段： id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>点击以查看示例结果</b></summary>

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

### 获取钱包余额

返回的余额单位为 Winston。若要获取 $AR，请将余额除以 1000000000000
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

### 获取交易状态

`https://arweave.net/tx/TX_ID/status`
::: tip
此端点仅支持原生 Arweave 交易。交易必须被确认后才能取得成功的响应。
:::

```js
const result = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>点击以查看示例结果</b></summary>

```json
{
  "block_height": 1095552,
  "block_indep_hash": "hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3",
  "number_of_confirmations": 10669
}
```

</details>
<hr />

### 获取网络信息

```js
const res = await axios.get("https://arweave.net/info");
console.log(res.data);
```

<details>
<summary><b>点击以查看示例结果</b></summary>

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

## 使用 Wayfinder 获取数据

[Wayfinder](https://docs.ar.io/wayfinder) 是一个协议和一组库，通过 AR.IO 网络提供去中心化、具有密码学验证的 Arweave 数据访问。Wayfinder 会自动为每次请求选择最佳网关、验证数据完整性，并确保可靠地访问永久网（permaweb）内容。

- 智能路由：自动选择最快且最可靠的网关
- 数据验证：确保收到的是真实、未被篡改的内容
- 去中心化访问：将请求分散到 AR.IO 的网关网络

### 安装

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

安装两个包：

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

如需高级配置与使用，请参阅 [官方 Wayfinder 文档](https://docs.ar.io/wayfinder)。
