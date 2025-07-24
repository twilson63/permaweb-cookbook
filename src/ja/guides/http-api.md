---
locale: ja
---
# トランザクションデータの取得

インデックスサービスはトランザクションメタデータのクエリを可能にしますが、トランザクションデータ自体へのアクセスは提供していません。これは、トランザクションデータのキャッシュとメタデータのインデックス作成が異なるリソース要件を持つためです。インデックスサービスは主にデータベースでのクエリを実行するためにコンピュートリソースに依存し、一方トランザクションデータはストレージと帯域幅を最適化するためにコンテンツ配信ネットワーク（CDN）への展開に適しています。

ほとんどのゲートウェイは、一連のHTTPエンドポイントを通じてトランザクションデータキャッシングサービスを提供しています。これらのエンドポイントからトランザクションデータを要求するために、任意のHTTPクライアント/パッケージを使用できます。例えば、JavaScriptのAxiosやFetch、PHPのGuzzleなどです。

トランザクションデータキャッシングサービスをバイパスして、Arweaveのピア/ノードから直接データを取得したい場合も可能ですが、かなりの作業が必要です！

トランザクションデータは、ネットワークの最初から現在のブロックまで、256KBのチャンクの連続したシーケンスとしてArweaveに保存されます。この形式は、マイナーがArweaveデータを保存していることを証明するために参加するSPoRAマイニングメカニズムをサポートするように最適化されています。

::: info
1. よく知られたピアからピアのリストを取得します。
1. ピアにトランザクションデータを含むチャンクオフセットを尋ねます。
1. ピアにチャンクを要求します。
    1. ピアがチャンクを提供する場合、元の形式に再結合します。
1. （ピアがチャンクを持っていない場合）ピアリストを歩いてチャンクを要求します。
1. 訪問した各ピアについて、彼らのピアリストを確認し、リストにまだ含まれていないピアを追加します。
1. すべてのチャンクを取得するまでステップ3を繰り返します。
:::

これは、Arweaveネットワークからデータを取得するたびに実行するにはかなりの作業量です。例えば、[https://public-square.g8way.io](https://public-square.g8way.io)のようにツイートのタイムラインを表示しようとした場合、ユーザー体験は長いロード時間やスピナーでひどいものになるでしょう。Arweave上のデータは永久的であるため、元の形式でキャッシュすることが安全であり、トランザクションデータの取得をはるかに迅速かつ容易にします。

以下は、arweave.netトランザクションデータキャッシングサービスでキャッシュされたトランザクションデータにアクセスする方法です。

### キャッシュされたTXデータの取得

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>Click to view example result</b></summary>

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

各Arweaveピア/ノードは、しばしば複製されたゲートウェイであるHTTPエンドポイントも公開しています。ArweaveピアのHTTPエンドポイントについては、こちらで詳しく読むことができます。

### 生トランザクションの取得
`https://arweave.net/raw/TX_ID`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Click to view example result</b></summary>

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

### Get by field
`https://arweave.net/tx/TX_ID/FIELD`

Available fields: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
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
返される残高はWinston単位です。$ARでの残高を取得するには、残高を1000000000000で割ります。
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### トランザクションのステータス取得
`https://arweave.net/tx/TX_ID/status`
::: tip
このエンドポイントはネイティブのArweaveトランザクションのみをサポートしています。トランザクションは、成功した応答を得る前に確認される必要があります。
:::

```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
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



### Get network information

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


