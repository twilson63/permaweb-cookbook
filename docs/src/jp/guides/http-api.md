---
locale: jp
---
# 取引データの取得
インデックスサービスは、トランザクションのメタデータのクエリを可能にしますが、トランザクションデータ自体へのアクセスは提供しません。これは、トランザクションデータのキャッシュとメタデータのインデックスには異なるリソース要件があるためです。インデックスサービスは、主にコンピュートリソースに依存してデータベース上でクエリを実行しますが、トランザクションデータは、ストレージと帯域幅の最適化の観点から、コンテンツ配信ネットワーク（CDN）での展開に適しています。

トランザクションデータのキャッシュサービスは、ほとんどのゲートウェイでHTTPエンドポイントのセットとして提供されています。これらのエンドポイントからトランザクションデータをリクエストするためには、任意のHTTPクライアント/パッケージを使用できます。たとえば、JavaScriptの場合はAxiosやFetch、PHPの場合はGuzzleなどがあります。

トランザクションデータキャッシュサービスをバイパスしてArweaveのピア/ノードから直接データを取得することもできますが、非常に手間がかかります！

トランザクションデータは、Arweave上で256KBのチャンクの連続したシーケンスとして保存されます。ネットワークの非常に初期から現在のブロックまでです。この形式は、Arweaveデータの保存を証明するためにマイナーが参加するSPoRAマイニングメカニズムをサポートするように最適化されています。

::: info
1. 有名なピアからピアのリストを取得します。
1. トランザクションデータを含むチャンクオフセットをピアに要求します。
1. ピアにチャンクを要求します。
    1. ピアがチャンクを提供する場合、それらを元の形式に結合します。
1. （ピアがチャンクを持っていない場合）ピアリストを参照してチャンクを要求します。
1. 訪れる各ピアについて、そのピアのリストをチェックし、まだリストにないピアを追加します。
1. チャンクをすべて取得するまで手順3から繰り返します。
:::

Arweaveネットワークからデータを取得するたびにこれらの作業を行うには、かなりの量の作業が必要です。たとえば、[https://public-square.g8way.io](https://public-square.g8way.io)のようなツイートのタイムラインを表示しようとした場合を想像してみてください。読み込み時間が長く、回転する待ち時間など、ユーザーエクスペリエンスが非常に悪くなります。Arweaveのデータは永久に保存されるため、トランザクションデータを元の形式でキャッシュして、データの取得を迅速かつ容易にすることができます。

以下は、arweave.netのトランザクションデータキャッシュサービスでキャッシュされたトランザクションデータにアクセスする方法です。

### キャッシュされたTXデータの取得

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>クリックして例の結果を表示</b></summary>

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

各Arweaveピア/ノードは、しばしばレプリケーションされたゲートウェイとなっているいくつかのHTTPエンドポイントを公開しています。ArweaveピアのHTTPエンドポイントについては、こちらをご覧ください。

### 生のトランザクションの取得
`https://arweave.net/raw/TX_ID`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>クリックして例の結果を表示</b></summary>

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

### フィールドで取得
`https://arweave.net/tx/TX_ID/FIELD`

利用可能なフィールド：id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>クリックして例の結果を表示</b></summary>

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

### ウォレットの残高を取得します
返される残高はWinston単位です。$ARで残高を取得するには、残高を1000000000000で割ります
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### 取引のステータスを取得
`https://arweave.net/tx/TX_ID/status`
::: tip
このエンドポイントは、ネイティブなArweaveトランザクションのみをサポートしています。トランザクションは確認されてから成功した応答を受け取ることができます。
:::

```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
  console.log(JSON.stringify(result))
```
<details>
<summary><b>クリックして例の結果を表示</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />



### ネットワーク情報を取得する

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>クリックして例の結果を表示</b></summary>

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