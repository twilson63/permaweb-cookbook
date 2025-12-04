# トランザクションデータの取得

インデックスサービスはトランザクションのメタデータのクエリを可能にしますが、トランザクションデータ自体へのアクセスは提供しません。これはトランザクションデータのキャッシュとインデックスメタデータの要件が異なるためです。インデックスサービスは主にデータベース上でクエリを実行するための計算リソースを必要とする一方で、トランザクションデータはストレージと帯域を最適化するためにコンテンツ配信ネットワーク（CDN）に展開する方が適しています。

トランザクションデータのキャッシュサービスは、ほとんどのゲートウェイで一連の HTTP エンドポイントを通じて提供されています。任意の HTTP クライアント/パッケージ（例: JavaScript では Axios や Fetch、PHP では Guzzle など）を使ってこれらのエンドポイントからトランザクションデータを要求できます。

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

トランザクションデータキャッシュサービスをバイパスして直接 Arweave のピア/ノードからデータを取得することも可能ですが、非常に手間がかかります。

トランザクションデータは Arweave 上に、ネットワーク開始時点から現在のブロックまで連続した 256KB チャンクのシーケンスとして保存されています。このフォーマットは、マイナーが Arweave データを保存していることを証明するために参加する SPoRA マイニング機構をサポートするよう最適化されています。

::: info

1. よく知られたピアからピア一覧を取得する。
1. そのピアに対して、あなたのトランザクションデータを含むチャンクのオフセットを問い合わせる。
1. そのピアにチャンクを要求する。
   1. ピアがチャンクを提供した場合、それらを結合して元のフォーマットに戻す。
1. （ピアがチャンクを持っていない場合）チャンクを求めてピア一覧を順に辿る。
1. 訪問した各ピアについて、そのピアのピア一覧を確認し、自分の一覧にないピアを追加する。
1. すべてのチャンクを取得するまでステップ 3 から繰り返す。  
   :::

この手順を毎回実行して Arweave ネットワークからデータを取得するのはかなりの手間です。たとえば [https://public-square.arweave.net](https://public-square.arweave.net) のようにツイートのタイムラインを表示しようとすると、読み込み時間が長くなりユーザー体験は非常に悪くなります（ローディング表示が長くなるなど）。Arweave 上のデータは永続的であるため、元の形式でキャッシュしておくことでトランザクションデータの取得を大幅に高速化・簡素化できます。

以下の HTTP エンドポイントは、arweave.net のトランザクションデータキャッシュサービスからキャッシュされたトランザクションデータにアクセスする方法です。

<hr />

### キャッシュされた TX データの取得

このメソッドは、指定されたトランザクション ID（TX_ID）に関連付けられたトランザクションデータをキャッシュから取得します。

`https://arweave.net/TX_ID`

```js
const res = await axios.get(
  `https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`
);
console.log(res);
```

<details>
<summary><b>サンプル結果を表示する</b></summary>

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

### 生のトランザクションを取得

一部の[トランザクションタイプ](manifests.md)ではレンダリング規則が異なるため、このエンドポイントは変換されていない生（raw）データを返します。  
`https://arweave.net/raw/TX_ID`

```js
const result = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>サンプル結果を表示する</b></summary>

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

各 Arweave ピア/ノードは、しばしばゲートウェイとして複製されるいくつかの HTTP エンドポイントも公開しています。Arweave ピアの HTTP エンドポイントの詳細は[こちら](/references/http-api.md)を参照してください。

---

## Wayfinder でのデータ取得

[Wayfinder](https://docs.ar.io/wayfinder) は、AR.IO ネットワークを介して Arweave に保存されたデータへ分散化され、暗号学的に検証されたアクセスを提供するプロトコルとライブラリ群です。Wayfinder は各リクエストに対して最適なゲートウェイを自動選択し、データの整合性を検証し、パーマウェブコンテンツへの信頼性の高いアクセスを保証します。

- インテリジェントなルーティング: 最速かつ最も信頼できるゲートウェイを自動で選択
- データ検証: 改ざんされていない正当なコンテンツを受信していることを保証
- 分散アクセス: AR.IO ゲートウェイネットワーク全体にリクエストを分散

### インストール

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### 基本的な使い方 (JavaScript/TypeScript)

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

### React での使用

両方のパッケージをインストールしてください:

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

より高度な設定や使用法については、[公式 Wayfinder ドキュメント](https://docs.ar.io/wayfinder) を参照してください。
