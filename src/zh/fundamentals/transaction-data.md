# 获取交易数据

虽然索引服务允许查询交易的 metadata，但它们不提供交易数据本身的访问。这是因为缓存交易数据与建立索引 metadata 所需的资源不同。索引服务主要依赖计算资源来对数据库执行查询，而交易数据较适合部署到内容分发网络（CDN）以优化存储与带宽使用。

大多数网关会通过一组 HTTP 端点提供交易数据缓存服务。任何 HTTP 客户端/库都可以用来从这些端点请求交易数据，例如 JavaScript 的 Axios 或 Fetch、PHP 的 Guzzle 等等。

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

如果你想绕过交易数据缓存服务，直接从 Arweave 的 peers/节点 获取数据也是可行的，但这非常费工！

交易数据在 Arweave 上以连续的 256KB 区块（chunks）序列存放，从网络一开始一直到目前区块。此格式经过优化以支持矿工参与的 SPoRA 採矿机制，用以证明他们有存储 Arweave 的数据。

::: info

1. 从一个已知的 peer 获取 peer 列表。
1. 询问该 peer 哪些 chunk 偏移（offsets）包含你要的交易数据。
1. 向该 peer 请求这些 chunks。
   1. 若该 peer 返回了 chunks，将它们重新组合回原本的格式。
1. （如果该 peer 没有那些 chunks）遍历 peer 列表向其他 peers 请求 chunks。
1. 对于你访问过的每个 peer，检查它们的 peer 列表并将尚未在你的列表中的 peers 新增进去。
1. 重复第 3 步，直到你获取所有 chunks。
   :::

每次想要从 Arweave 网络获取数据都要做上述这么多工作会相当麻烦。想象如果你要像 [https://public-square.arweave.net](https://public-square.arweave.net) 那样显示一个推文时间线，用户体验会因为长时间加载与旋转指示器而很差。由于 Arweave 上的数据是永久性的，因此以原始形式缓存是安全的，能让交易数据的获取变得更快也更简单。

下列 HTTP 端点是如何在 arweave.net 的交易数据缓存服务中访问缓存的交易数据。

<hr />

### 获取缓存的交易数据

此方法会从缓存中取回与指定交易 ID (TX_ID) 关联的交易数据。

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

### 获取原始交易数据

某些 [交易类型](manifests.md) 的数据在渲染时会遵循不同规则，此端点会返回未转换的原始数据。
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

每个 Arweave peer/节点也都会暴露一些 HTTP 端点，这些端点常被作为复制的网关。你可以在这里阅读更多关于 Arweave peer 的 HTTP 端点：[/references/http-api.md](/references/http-api.md)。

---

## 使用 Wayfinder 获取数据

[Wayfinder](https://docs.ar.io/wayfinder) 是一个协议与一套库，通过 AR.IO 网络提供去中心化且经过密码验证的 Arweave 数据访问。Wayfinder 会自动为每个请求选择最佳网关、验证数据完整性，并确保稳定访问永久网络内容。

- 智能路由：自动选择最快且最可靠的网关
- 数据验证：确保你接收到的内容是真实且未被修改
- 去中心化访问：在 AR.IO 网关网络间分散请求

### 安装

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### 基本用法（JavaScript/TypeScript）

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

### 在 React 中使用

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

如需更进阶的设置与使用方式，请参阅 [官方 Wayfinder 文档](https://docs.ar.io/wayfinder)。
