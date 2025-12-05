# arlocal

`arlocal` はローカルの Arweave テスト環境を素早くセットアップして実行するためのツールです。Arweave ゲートウェイのようなサーバー上でトランザクションをテストできます。開発者が Arweave ネットワークにデプロイする前に、シミュレートされた環境でアプリケーションを検証することができます。

$AR トークンは不要で、トランザクションは即時に処理されます。

## CLI

arlocal CLI を使用するには、マシンに node と npm がインストールされている必要があります。

ローカルゲートウェイを起動するには、`npx arlocal` を実行します。

::: tip
引数としてポートを渡すことで、slim ゲートウェイを実行するポートを指定できます  
`npx arlocal 8080`
:::

ログを非表示にするには、ゲートウェイ実行時にフラグ `--hidelogs` を追加します  
`npx arlocal --hidelogs`

## Node

開発依存としてパッケージをインストールするには、`yarn add arlocal -D` または `npm install arlocal --save-dev` を実行します。

```js
import ArLocal from "arlocal";

(async () => {
  const arLocal = new ArLocal();

  // create local testing environment
  await arLocal.start();

  // your tests here

  // shut down testing environment
  await arLocal.stop();
})();
```

`ArLocal` インスタンスは以下のオプションで作成できます
| オプション | 説明 |
| ---- | ----------- |
| port | 使用するポート |
| showLogs | ログを表示する |
| dbPath | 一時データベースのディレクトリ |
| persist | サーバー再起動間でデータを保持する |

### 例

この例を動作させるには、生成されたテストウォレットを使用する必要があります。そのためには `arweave` パッケージを `arlocal` と共にプロジェクトにインストールする必要があります。

`yarn add arweave arlocal -D` または `npm install --save-dev arweave arlocal`

以下は、データトランザクションを作成して arlocal を使って Arweave に投稿する基本的な JavaScript テストです:

```js
import ArLocal from "arlocal";
import Arweave from "arweave";

test("test transaction", async () => {
  // create and start ArLocal instance
  const arLocal = new ArLocal();
  await arLocal.start();
  // create local Arweave gateway
  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  });
  // generate wallet
  const wallet = await arweave.wallets.generate();
  // airdrop amount of tokens (in winston) to wallet
  await arweave.api.get(`mint/${addr}/10000000000000000`);
  // create mine function
  const mine = () => arweave.api.get("mine");
  try {
    // create transaction
    let transaction = await arweave.createTransaction(
      {
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
      },
      wallet
    );
    // sign and post transaction
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // mine transaction
    await mine();
    // test the response
  } catch (err) {
    console.error("ERROR: ", err.message);
  }
  // tear down testing environment
  await arLocal.stop();
});
```

::: warning
L1 トランザクションのテスト結果は L2 トランザクションと異なる場合があります。
:::

## リソース

[arlocal ドキュメント](https://github.com/textury/arlocal)
