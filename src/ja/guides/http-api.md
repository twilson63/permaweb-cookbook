# トランザクションデータの取得

インデックスサービスはトランザクションのメタデータの照会を可能にしますが、トランザクションデータ自体へのアクセスは提供しません。これはトランザクションデータのキャッシュとインデックスメタデータの要件が異なるためです。インデックスサービスは主にデータベース上でのクエリ実行に計算リソースを利用する一方で、トランザクションデータはストレージと帯域幅を最適化するためにコンテンツ配信ネットワーク（CDN）上に配置するのが適しています。

トランザクションデータのキャッシュサービスは、ほとんどのゲートウェイが一連の HTTP エンドポイントを通じて提供しています。任意の HTTP クライアント／パッケージ（例：JavaScript の Axios や Fetch、PHP の Guzzle 等）を使用してこれらのエンドポイントからトランザクションデータを要求できます。

トランザクションデータキャッシュサービスを迂回して Arweave のピア／ノードから直接データを取得することも可能ですが、かなり手間がかかります。

トランザクションデータは Arweave 上で、ネットワーク開始時点から現在のブロックまで連続する 256KB チャンクのシーケンスとして保存されます。このフォーマットは、マイナーが Arweave データを保存していることを証明するために参加する SPoRA マイニング機構をサポートするよう最適化されています。

::: info

1. 既知のピアからピア一覧を取得する。
1. そのピアに、あなたのトランザクションデータを含むチャンクのオフセットを問い合わせる。
1. そのピアにチャンクを要求する。
   1. ピアがチャンクを提供した場合、それらを元の形式に結合する。
1. （もしそのピアがチャンクを持っていない場合）チャンクを要求するためにピア一覧を順にたどる。
1. 訪問する各ピアについて、そのピアのピア一覧を確認し、まだリストにないピアを追加する。
1. すべてのチャンクが揃うまでステップ 3 に戻って繰り返す。
   :::

これは Arweave ネットワークからデータを取得するたびに実行するにはかなりの労力が必要です。たとえば [https://public-square.arweave.net](https://public-square.arweave.net) のようなツイートのタイムラインを表示しようとした場合を想像してください。読み込み時間が長くスピナーが表示されるなどユーザー体験は非常に悪くなります。Arweave 上のデータは恒久的であるため、元の形式でキャッシュしておくことでトランザクションデータの取得をはるかに速く、容易にすることができます。

以下は arweave.net のトランザクションデータキャッシュサービスでキャッシュ済みトランザクションデータにアクセスする方法です。

### キャッシュ済み TX データの取得

`https://arweave.net/TX_ID`

```js
const res = await axios.get(
  `https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`
);
console.log(res);
```

<details>
<summary><b>例の結果を表示</b></summary>

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

各 Arweave ピア／ノードは、しばしば複製されたゲートウェイであるいくつかの HTTP エンドポイントも公開しています。Arweave ピアの HTTP エンドポイントの詳細はここで確認できます。

### 生のトランザクションを取得

`https://arweave.net/raw/TX_ID`

```js
const result = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>例の結果を表示</b></summary>

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

### フィールド指定で取得

`https://arweave.net/tx/TX_ID/FIELD`

利用可能なフィールド: id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>例の結果を表示</b></summary>

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

### ウォレット残高を取得

返される残高は Winston 単位です。$AR 単位の残高を得るには、残高を 1000000000000 で割ってください。  
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

### トランザクションのステータスを取得

`https://arweave.net/tx/TX_ID/status`
::: tip
このエンドポイントはネイティブな Arweave トランザクションのみをサポートします。トランザクションは成功したレスポンスを得る前に確認（confirmed）されている必要があります。
:::

```js
const result = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>例の結果を表示</b></summary>

```json
{
  "block_height": 1095552,
  "block_indep_hash": "hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3",
  "number_of_confirmations": 10669
}
```

</details>
<hr />

### ネットワーク情報を取得

```js
const res = await axios.get("https://arweave.net/info");
console.log(res.data);
```

<details>
<summary><b>例の結果を表示</b></summary>

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

---

## Wayfinder を使ったデータ取得

[Wayfinder](https://docs.ar.io/wayfinder) は、AR.IO ネットワーク経由で Arweave に保存されたデータへ分散化され、暗号的に検証可能なアクセスを提供するプロトコルとライブラリ群です。Wayfinder は要求ごとに最適なゲートウェイを自動選択し、データ整合性を検証し、パーマウェブコンテンツへの信頼性の高いアクセスを保証します。

- インテリジェントルーティング: 最速かつ最も信頼性の高いゲートウェイを自動選択
- データ検証: 改ざんされていない真正なコンテンツを受け取れることを保証
- 分散アクセス: AR.IO のゲートウェイネットワークにリクエストを分散

### インストール

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### 基本的な使用方法（JavaScript/TypeScript）

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

詳細な構成や使い方については、[公式 Wayfinder ドキュメント](https://docs.ar.io/wayfinder) を参照してください。
