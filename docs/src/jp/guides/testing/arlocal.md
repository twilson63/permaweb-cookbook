---
locale: jp
---
# arlocal
`arlocal`は、ローカルのArweaveテスト環境を迅速にセットアップおよび実行するためのツールです。これにより、Arweaveのゲートウェイのようなサーバー上でトランザクションをテストできます。開発者は、アプリケーションをArweaveネットワークにデプロイする前に、シミュレーション環境でアプリケーションをテストすることができます。

`$AR`トークンは必要なく、トランザクションは即座に行われます。

## CLI
`arlocal` CLIを使用するには、マシンにnodeとnpmをインストールする必要があります。

ローカルゲートウェイを起動するには、`npx arlocal`を実行します。

::: tip
ポート番号を指定するには、引数としてポートを渡します
`npx arlocal 8080`
:::

ログを非表示にするには、ゲートウェイを実行する際に`--hidelogs`フラグを追加してください
`npx arlocal --hidelogs`
## Node 
パッケージをdev dependencyとしてインストールするには、次のコマンドを実行します
`yarn add arlocal -D`または`npm install arlocal --save-dev`

```js
import ArLocal from 'arlocal';

(async () => {
  const arLocal = new ArLocal();

  // ローカルテスト環境を作成
  await arLocal.start();

  // ここにテストを記述

  // テスト環境をシャットダウン
  await arLocal.stop();
})();
```

`ArLocal`インスタンスはオプションと共に作成できます
| オプション | 説明 |
| ---- | ----------- |
| port | 使用するポート |
| showLogs | ログの表示 |
| dbPath | 一時データベースのディレクトリ |
| persist | サーバー再起動時にデータを保持する

### 例
この例が動作するためには、コードが生成されたテストウォレットを使用する必要があります。これを実現するには、`arweave`パッケージをプロジェクトにインストールし、`arlocal`も同様にインストールする必要があります。

`yarn add arweave arlocal -D`または`npm install --save-dev arweave arlocal`

以下は、arlocalを使用してデータトランザクションを作成し、Arweaveに投稿するための基本的なJavaScriptのテストです：

```js
import ArLocal from 'arlocal'
import Arweave from 'arweave'

test('test transaction', async () => {
    // ArLocalインスタンスの作成と開始
    const arLocal = new ArLocal()
    await arLocal.start()
    // ローカルArweaveゲートウェイの作成
    const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
  })
  // ウォレットの生成
  const wallet = await arweave.wallets.generate()
  // ウォレットにトークン（winston単位）のエアドロップ
  await arweave.api.get(`mint/${addr}/10000000000000000`)
  // マイニングのための関数の作成
  const mine = () => arweave.api.get('mine')
  try {
    // トランザクションの作成
    let transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, wallet);
    // トランザクションに署名して投稿
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // トランザクションのマイニング
    await mine()
    // レスポンスのテスト
  } catch(err) {
    console.error('ERROR: ', err.message)
  }
  // テスト環境を終了
  await arLocal.stop()
})
```

::: warning
L1トランザクションのテスト結果はL2トランザクションと異なる場合があります
:::

## リソース
[arlocalのドキュメント](https://github.com/textury/arlocal)