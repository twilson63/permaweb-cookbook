---
locale: ja
---

# Arweave ピア HTTP API

Arweave ピア HTTP API のより完全なリファレンスについては、[リンクされたガイド](https://docs.arweave.org/developers/server/http-api)を参照してください。

ここに示されているエンドポイントは、便利さのため、または[リンクされたガイド](https://docs.arweave.org/developers/server/http-api)から省略されたために提示されています。

::: info
Permaweb ゲートウェイサービスは、通常、1つ以上の完全な Arweave ノードによってバックされています。その結果、ノードエンドポイントが `/tx/` パスの下で公開され、リクエストが直接 Arweave ノードにルーティングされることがよくあります。これは、これらのメソッドがゲートウェイ上でも、Arweave ピア/ノード上でも呼び出すことができることを意味します。
:::

<hr />

### フィールドによる取得
トランザクションに関連するヘッダーフィールドを直接 Arweave ノードから取得します。ノードがチャンクを保存していて、データがノードによって提供されるのに十分小さい場合は、トランザクションデータを取得するためにも使用できます。

`https://arweave.net/tx/TX_ID/FIELD`

利用可能なフィールド: id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch('https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
// fields are returned in base64url format, so we need to decode
const base64url = await result.text()
const jsonData = JSON.parse( Arweave.utils.b64UrlToString(base64url) )
console.log(jsonData)
```

<details>
<summary><b>Click to view example result</b></summary>

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

### ウォレット残高の取得
返される残高はウィンストン（Winston）単位です。$ARでの残高を取得するには、残高を1000000000000で割ってください。
`https://arweave.net/wallet/ADDRESS/balance`

```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```
<hr />

### トランザクションのステータス取得
`https://arweave.net/tx/TX_ID/status`
::: tip
このエンドポイントは、バンドルされたトランザクションではなく、基本的な Arweave トランザクションのみをサポートしています。トランザクションのステータスが利用可能になる前に、オンチェーンで確認される必要があります。
:::

```js
  const response = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status')
  const result = await response.json()
  console.log(JSON.stringify(result))
```
<details>
<summary><b>Click to view example result</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />



### ネットワーク情報の取得

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>Click to view example result</b></summary>

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


