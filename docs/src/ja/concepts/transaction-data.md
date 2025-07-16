---
locale: ja
---
# トランザクションデータの取得

インデクシングサービスはトランザクションメタデータのクエリを可能にしますが、トランザクションデータ自体へのアクセスは提供しません。これは、トランザクションデータのキャッシングとメタデータのインデクシングが異なるリソース要件を持つためです。インデクシングサービスは、データベースでのクエリを実行するために主にコンピューティングリソースに依存しますが、トランザクションデータは、ストレージと帯域幅を最適化するためにコンテンツ配信ネットワーク（CDN）へのデプロイに適しています。

トランザクションデータキャッシングサービスは、ほとんどのゲートウェイによって一連のHTTPエンドポイントを介して提供されています。これらのエンドポイントからトランザクションデータをリクエストするために、任意のHTTPクライアント/パッケージを使用できます。たとえば、JavaScriptの場合はAxiosやFetch、PHPの場合はGuzzleなどです。

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

トランザクションデータキャッシングサービスをバイパスしてArweaveのピア/ノードからデータを直接取得したい場合もできますが、かなりの作業が必要です！

トランザクションデータは、ネットワークの非常に初期の段階から現在のブロックまで、256KBのチャンクの連続したシーケンスとしてArweaveに保存されています。この形式は、マイナーがArweaveデータを保存していることを証明するために参加するSPoRAマイニングメカニズムをサポートするよう最適化されています。

::: info
1. よく知られたピアからピアのリストを取得します。
1. ピアに対して、トランザクションデータを含むチャンクのオフセットを要求します。
1. ピアにチャンクを要求します。
    1. ピアがチャンクを提供する場合、それらを元の形式に結合します。
1. （ピアにチャンクがない場合）ピアリストを歩き、チャンクを要求します。
1. 訪問した各ピアについて、彼らのピアリストを確認し、すでにリストにないピアを追加します。
1. ステップ3から繰り返し、すべてのチャンクを取得するまで続けます。
:::

これは、Arweaveネットワークからデータを取得するたびに実行するにはかなりの作業量です。たとえば、[https://public-square.g8way.io](https://public-square.g8way.io)のようにツイートのタイムラインを表示しようとした場合、ユーザーエクスペリエンスは非常に悪く、長い読み込み時間やスピナーが表示されるでしょう。Arweave上のデータは永続的であるため、元の形式でキャッシュすることで、トランザクションデータの取得をはるかに迅速かつ容易にすることができます。

以下のHTTPエンドポイントは、arweave.netトランザクションデータキャッシングサービスでキャッシュされたトランザクションデータにアクセスする方法です。

<hr />

### キャッシュされたTXデータを取得

このメソッドは、指定されたトランザクションID（TX_ID）に関連付けられたトランザクションデータをキャッシュから取得します。


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

### 生のトランザクションを取得

一部の[トランザクションタイプ](manifests.md)のデータは、レンダリングのための異なるルールに従います。このエンドポイントは、生の未変換データを返します。
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

各Arweaveピア/ノードも、しばしばレプリケートされたゲートウェイのHTTPエンドポイントを公開しています。ArweaveピアのHTTPエンドポイントについては、[こちら](/references/http-api.md)で読むことができます。