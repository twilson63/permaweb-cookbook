---
locale: jp
---
# トランザクションデータの取得
インデックスサービスはトランザクションのメタデータのクエリを可能にしますが、トランザクションデータ自体へのアクセスは提供しません。これは、トランザクションデータのキャッシュとメタデータのインデックス作成には異なるリソース要件があるためです。インデックスサービスは主に計算リソースに依存してデータベース上でクエリを実行しますが、トランザクションデータはストレージと帯域幅の最適化のためにコンテンツデリバリーネットワーク（CDN）に展開することが適しています。

トランザクションデータのキャッシュサービスは、ほとんどのゲートウェイで提供されています。これらのエンドポイントからトランザクションデータをリクエストするために、AxiosやFetch（JavaScript）、Guzzle（PHP）などのHTTPクライアント/パッケージを使用することができます。

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

もしトランザクションデータのキャッシュサービスを迂回してArweaveのピア/ノードから直接データを取得したい場合、それは大変な作業です！

トランザクションデータは、ネットワークの最初から現在のブロックまでの256KBのチャンクの連続したシーケンスとしてArweaveに保存されます。この形式は、Arweaveデータを保存していることを証明するためにマイナーが参加するSPoRAマイニングメカニズムをサポートするために最適化されています。

:::info
1. 既知のピアからピアリストを取得します。
1. トランザクションデータを含むチャンクのオフセットをピアに問い合わせます。
1. ピアにチャンクを要求します。
    1. ピアがチャンクを提供する場合は、それらを元の形式に結合します。
1. （ピアがチャンクを持っていない場合）ピアリストを繰り返し訪れ、チャンクを要求します。
1. 訪れる各ピアで、そのピアのピアリストを確認し、リストに含まれていないピアを追加します。
1. ステップ3から繰り返し、すべてのチャンクを取得します。
:::

Arweaveネットワークからデータを取得するたびに、この作業はかなりの量になります。例えば、[https://public-square.g8way.io]（https://public-square.g8way.io）のようなツイートのタイムラインを表示しようとした場合、ユーザーエクスペリエンスはロード時間が長く、スピナーが表示されるというひどいものになります。Arweaveのデータは永久的に保存されるため、元の形式でキャッシュすることで、トランザクションデータの取得をより迅速かつ容易に行うことができます。

以下のHTTPエンドポイントは、arweave.netのトランザクションデータキャッシュサービスでキャッシュされたトランザクションデータにアクセスする方法です。

<hr />

### キャッシュされたトランザクションデータの取得
このメソッドは、指定されたトランザクションID（TX_ID）に関連するトランザクションデータをキャッシュから取得します。

`https://arweave.net/TX_ID`

```js
const res = await axios.get('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8')
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

### 生のトランザクションの取得
いくつかの[トランザクションタイプ](manifests.md)のデータは、レンダリングに異なるルールが適用されます。このエンドポイントは、生の変換されていないデータを返します。
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

それぞれのArweaveピア/ノードは、しばしば複製されたゲートウェイとして使用されるいくつかのHTTPエンドポイントも公開しています。ArweaveのピアのHTTPエンドポイントについての詳細は[こちら](/references/http-api.md)をご覧ください。