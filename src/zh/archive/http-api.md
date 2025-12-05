# Arweave 对等节点 HTTP API

如需更完整的 Arweave 对等节点 HTTP API 参考，请参阅 [相关指南](https://docs.arweave.org/developers/server/http-api)。

此处列出的端点是为方便起见提供的，或是因为它们在 [相关指南](https://docs.arweave.org/developers/server/http-api) 中被遗漏。

::: info
Permaweb 网关服务通常由一个或多个完整的 Arweave 节点支持。因此它们常会在 `/tx/` 路径下暴露节点端点，并将请求直接路由至 Arweave 节点。这表示这些方法通常可以在网关上调用，也可以直接在 Arweave 对等节点/节点上调用。
:::

<hr />

### 按字段获取

直接从 Arweave 节点检索与交易相关的标头字段。如果节点有存储该交易的 chunk，且数据足够小以供节点返回，也可用来检索交易数据。

`https://arweave.net/tx/TX_ID/FIELD`

可用字段： id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
);
// fields are returned in base64url format, so we need to decode
const base64url = await result.text();
const jsonData = JSON.parse(Arweave.utils.b64UrlToString(base64url));
console.log(jsonData);
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

返回的余额以 Winston 为单位。要取得 $AR 的余额，请将余额除以 1000000000000
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

<hr />

### 获取交易状态

`https://arweave.net/tx/TX_ID/status`
::: tip
此端点仅支持基本的 Arweave 交易（base transactions），不支持捆绑交易（bundled transactions）。交易必须在链上被确认，状态才会可用。
:::

```js
const response = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
);
const result = await response.json();
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
