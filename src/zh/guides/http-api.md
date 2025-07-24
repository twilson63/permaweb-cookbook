---
locale: zh
---
# 提取交易数据
尽管索引服务可以查询交易元数据，但它们无法提供对交易数据本身的访问。这是因为缓存交易数据和索引元数据具有不同的资源要求。索引服务主要依赖计算资源在数据库上执行查询，而交易数据更适合部署在内容交付网络（CDN）上，以优化存储和带宽。

大多数网关提供了一个通过一组HTTP端点来获取交易数据的事务数据缓存服务。可以使用任何HTTP客户端/包从这些端点请求交易数据。例如，JavaScript可以使用Axios或Fetch，PHP可以使用Guzzle等。

如果您想绕过事务数据缓存服务并直接从Arweave的节点获取数据，可以这样做，但这是一项艰巨的工作！

交易数据在Arweave上存储为一系列连续的256KB块，从网络的起始时刻直到当前块。这种格式被优化用于支持SPoRA挖矿机制，挖矿者参与其中以证明他们正在存储Arweave数据。

::: info
1. 从一个众所周知的节点检索节点列表。
1. 向节点请求包含您的交易数据的块偏移量。
1. 请求块的内容。
    1. 如果节点提供了块，将其合并成原始格式。
1. （如果节点没有这些块）遍历节点列表，逐个请求块。
1. 访问每个节点时，检查其节点列表，并将未包含在您列表中的节点添加进去。
1. 从步骤3开始重复，直到获得所有的块。
:::

每次想要从Arweave网络中检索数据时，都需要执行这么多的工作量。想象一下，如果您要尝试显示一个类似于[https://public-square.g8way.io](https://public-square.g8way.io)的推文时间线，用户体验将非常糟糕，加载时间长且有旋转图标。由于Arweave上的数据是永久的，将其以原始形式进行缓存可以使交易数据的检索更快捷简单。

以下是如何在arweave.net的事务数据缓存服务中访问缓存的交易数据。

### 获取缓存的交易数据

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

每个Arweave节点还公开了一些HTTP端点，这些端点通常是复制的网关。您可以在此处阅读有关Arweave节点的HTTP端点的更多信息。

### 获取原始事务
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

### 按字段获取
`https://arweave.net/tx/TX_ID/FIELD`

可用字段：id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>点击查看示例结果</b></summary>

```json
{
  "ticker":"ANT-PENDING",
  "name":"pending",
  "owner":"NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "controller":"NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "evolve":null,
  "records": {
    "@":"As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
  },
  "balances":{"NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0":1}
}
```
</details>
<hr />

### 获取钱包余额
返回的余额以Winston为单位。若要获得以$AR计算的余额，请将余额除以1000000000000
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### 获取交易状态
`https://arweave.net/tx/TX_ID/status`
::: tip
此端点仅支持原生Arweave交易。必须在获取成功响应前确认交易。
:::

```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
  console.log(JSON.stringify(result))
```
<details>
<summary><b>点击查看示例结果</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />



### 获取网络信息

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>点击查看示例结果</b></summary>

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