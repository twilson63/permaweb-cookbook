# arweave-js を使用したトランザクションの投稿

Arweave のネイティブトランザクションは `arweave-js` パッケージを使用して、ノードまたはゲートウェイに直接投稿できます。

::: info
Arweave はトランザクションバンドル（transaction bundles）を用いることでスケールします。これらのバンドルにより、各ブロックがほぼ無制限の数のトランザクションを含めることが可能になります。

信頼性のため、ほとんどのトランザクションはバンドラー経由で Arweave に投稿されます — `arweave-js` を使用するとバンドラーを介さずに直接 Arweave にトランザクションを投稿します。  
:::

## `arweave-js` パッケージのインストール

`arweave-js` をインストールするには次を実行します
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
NodeJS 環境で作業する場合、最低でも NodeJS 18 以上が必要です。
:::

## `arweave-js` の初期化

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initialize an arweave instance
const arweave = Arweave.init({});
```

## ウォレット間トランザクションの投稿

あるウォレットアドレスから別のウォレットアドレスへ AR トークンを移動する基本的なトランザクション。

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

この例は、ディスクからファイルを読み込み、そのデータをネットワークに保存するトランザクションを作成する方法を示します。ネットワークが現在課している価格は [https://ar-fees.arweave.net](https://ar-fees.arweave.net) で確認できます。

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

- トランザクションを投稿するあらゆる方法の概要については、クックブックの [Transactions](../../fundamentals/transactions/index.md) セクションを参照してください。

- `arweave-js` のすべての機能の詳細な説明については、GitHub 上のドキュメントを参照してください: https://github.com/ArweaveTeam/arweave-js 。
