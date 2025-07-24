---
locale: ja
---
# arweave-jsを使用したトランザクションの投稿

Arweaveのネイティブトランザクションは、`arweave-js`パッケージを使用してノードまたはゲートウェイに直接投稿できます。

::: info
Arweaveはトランザクションバンドルを使用することでスケールします。これにより、各ブロックにほぼ無制限のトランザクションを含めることが可能になります。バンドルを使用しない場合、Arweaveブロックは1ブロックあたり最大1000トランザクションに制限されます（新しいブロックは約2分ごとに生成されます）。あなたのユースケースがこの容量を超える場合、トランザクションがドロップされることがあります。このような場合は、[irys.xyz](./irys.md)や類似のサービスを使用してトランザクションをバンドルすることを検討してください。
:::

## arweave-jsパッケージのインストール

`arweave-js`をインストールするには、次のコマンドを実行します。

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arweave
```

  </CodeGroupItem>
</CodeGroup>



::: info
NodeJSを使用する場合、NodeJSの最小バージョンは18以上が必要です。
:::

## arweave-jsの初期化

Layer 1トランザクションは、`arweave-js`ライブラリを使用して投稿されます。

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initialize an arweave instance
const arweave = Arweave.init({});
```

## ウォレット間トランザクションの投稿

ARトークンを1つのウォレットアドレスから別のウォレットアドレスに移動する基本的なトランザクション。

```js:no-line-numbers
//  create a wallet-to-wallet transaction sending 10.5AR to the target address
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// you must sign the transaction with your key before posting
await arweave.transactions.sign(transaction, key);

// post the transaction
const response = await arweave.transactions.post(transaction);
```

## データトランザクションの投稿

この例では、ディスクからファイルを読み込み、そのデータをネットワークに保存するためのトランザクションを作成する方法を示します。ネットワークが請求している現在の価格は、[https://ar-fees.arweave.dev](https://ar-fees.arweave.dev)で確認できます。

```js:no-line-numbers
// load the data from disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// create a data transaction
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// add a custom tag that tells the gateway how to serve this data to a browser
transaction.addTag('Content-Type', 'image/png');

// you must sign the transaction with your key before posting
await arweave.transactions.sign(transaction, key);

// create an uploader that will seed your data to the network
let uploader = await arweave.transactions.getUploader(transaction);

// run the uploader until it completes the upload.
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## リソース

-   トランザクションを投稿するためのすべての方法の概要については、操作マニュアルの[Posting Transactions](../../concepts/post-transactions.md)セクションを参照してください。

-   `arweave-js`のすべての機能の詳細な説明については、[GitHubのドキュメント](https://github.com/ArweaveTeam/arweave-js)をご覧ください。