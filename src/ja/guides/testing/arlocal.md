---
locale: ja
---
# arlocal

`arlocal`は、ローカルのArweaveテスト環境を迅速にセットアップし、実行するためのツールです。これにより、Arweaveゲートウェイのようなサーバー上でトランザクションをテストすることができます。開発者は、アプリケーションをArweaveネットワークにデプロイする前に、シミュレーションされた環境でテストすることができます。

$ARトークンは必要なく、トランザクションは即時です。

## CLI

`arlocal` CLIを使用するには、マシンにNodeとnpmをインストールしておく必要があります。

ローカルゲートウェイを起動するには、次のコマンドを実行します：
::: tip
スリムゲートウェイを実行するポートを指定するには、引数としてポートを渡します。
`npx arlocal 8080`
:::

ログを隠すには、ゲートウェイを実行するときに`--hidelogs`フラグを追加します。
`npx arlocal --hidelogs`
## Node 
パッケージを開発依存関係としてインストールするには、次のコマンドを実行します：
`yarn add arlocal -D` or `npm install arlocal --save-dev`

```js
import ArLocal from 'arlocal';

(async () => {
  const arLocal = new ArLocal();

  // create local testing environment
  await arLocal.start();

  // your tests here

  // shut down testing environment
  await arLocal.stop();
})();
```

`ArLocal`インスタンスは、以下のオプションを指定して作成できます：

| オプション  | 説明                           |
|-------------|--------------------------------|
| port        | 使用するポート                 |
| showLogs    | ログを表示するかどうか         |
| dbPath      | 一時データベース用のディレクトリ|
| persist     | サーバーの再起動間でデータを永続化 |

### 例

この例を動作させるには、生成されたテストウォレットを使用する必要があります。これを実現するためには、`arweave`パッケージをプロジェクトにインストールする必要があります。
`arweave` package must be installed to the project along with `arlocal`

`yarn add arweave arlocal -D` or `npm install --save-dev arweave arlocal`

以下は、データトランザクションを作成し、arlocalを使用してArweaveに投稿するための基本的なJavaScriptテストです：

```js
import ArLocal from 'arlocal'
import Arweave from 'arweave'

test('test transaction', async () => {
    // create and start ArLocal instance
    const arLocal = new ArLocal()
    await arLocal.start()
    // create local Arweave gateway
    const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
  })
  // generate wallet
  const wallet = await arweave.wallets.generate()
  // airdrop amount of tokens (in winston) to wallet
  await arweave.api.get(`mint/${addr}/10000000000000000`)
  // create mine function
  const mine = () => arweave.api.get('mine')
  try {
    // create transaction
    let transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, wallet);
    // sign and post transaction
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // mine transaction
    await mine()
    // test the response
  } catch(err) {
    console.error('ERROR: ', err.message)
  }
  // tear down testing environment
  await arLocal.stop()
})
```


::: warning
L1トランザクションのテスト結果は、L2トランザクションと異なる場合があります。
:::

## リソース
[arlocalドキュメント](https://github.com/textury/arlocal)
