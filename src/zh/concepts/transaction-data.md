---
locale: zh
---
# 获取交易数据
尽管索引服务允许查询交易元数据，但它们不提供对交易数据本身的访问。这是因为缓存交易数据和索引元数据有不同的资源需求。索引服务主要依赖计算资源在数据库上执行查询，而交易数据更适合部署在内容交付网络（CDN）上以优化存储和带宽。

大多数网关提供了一个通过一组HTTP端点请求交易数据的交易数据缓存服务。任何HTTP客户端/软件包都可以用于从这些端点请求交易数据。例如，JavaScript使用Axios或Fetch，PHP使用Guzzle等。

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

如果您想绕过交易数据缓存服务并直接从Arweave的对等节点获取数据，虽然可以，但需要付出很大的努力！

交易数据在Arweave上作为一个连续的256KB块序列存储，从网络的起点到当前块。这种格式被优化以支持SPoRA挖矿机制，矿工参与其中以证明他们正在存储Arweave数据。

::: info
1. 从一个众所周知的peer那里检索对等体列表。
1. 向peer请求包含您的交易数据的块偏移。
1. 请求peer返回块。
    1. 如果peer提供了块，请将它们组合成其原始格式。
1. （如果peer没有这些块）遍历peer列表请求块。
1. 对于您访问的每个peer，检查他们的对等列表并添加尚未在您的列表中的peer。
1. 从第3步开始重复，直到获得所有块。
:::

每次您想从Arweave网络检索数据时，这是一项相当大的工作。想象一下，如果您尝试像[https://public-square.g8way.io](https://public-square.g8way.io)一样显示推文的时间线，用户体验将是非常糟糕的，加载时间长且出现旋转图标。因为Arweave上的数据是永久存储的，可以安全地以其原始形式进行缓存，以加快和简化交易数据的检索。

以下是如何访问arweave.net交易数据缓存服务中缓存交易数据的HTTP端点。

<hr />

### 获取缓存的交易数据
此方法从缓存中检索与指定交易ID（TX_ID）关联的交易数据。

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>点击查看示例结果</b></summary>

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
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
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

### 获取原始交易
某些[交易类型](manifests.md)的数据遵循不同的渲染规则，此端点将返回原始未转换的数据。
`https://arweave.net/raw/TX_ID`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>点击查看示例结果</b></summary>

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

每个Arweave对等节点还公开了一些HTTP端点，这些端点通常是复制的网关。您可以在此处阅读有关Arweave对等点HTTP端点的更多信息[/references/http-api.md](/references/http-api.md)。