---
locale: jp
---
# arweave-jsを使用してトランザクションを投稿する
arweave-jsパッケージを使用して、Arweaveネイティブトランザクションをノードやゲートウェイに直接投稿することができます。

::: info
Arweaveは、トランザクションバンドルの使用によりスケーリングを行います。これにより、各ブロックにほぼ無制限の数のトランザクションを含めることができます。バンドルを使用しない場合、Arweaveのブロックごとのトランザクション数の上限は1000件です（新しいブロックは約2分ごとに生成されます）。使用ケースがこの容量を超える場合、トランザクションがドロップされる可能性があります。そのような場合は、[bundlr.network](./bundlr.md)や同様のサービスを使用してトランザクションをバンドルにまとめることを検討してください。
:::

## arweave-jsパッケージのインストール

`arweave-js`をインストールするには、以下のコマンドを実行します。
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

## arweave-jsの初期化
第1層のトランザクションは、`arweave-js`ライブラリを使用して投稿されます。

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// ディスクからJWKウォレットキーファイルを読み込む
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// arweaveのインスタンスを初期化する
const arweave = Arweave.init({});
```

## ウォレット間トランザクションの投稿
1つのウォレットアドレスから別のウォレットアドレスにARトークンを移動するための基本的なトランザクションです。
```js:no-line-numbers
// 10.5ARをターゲットアドレスに送るウォレット間トランザクションを作成する
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// トランザクションに署名する必要があります
await arweave.transactions.sign(transaction, key);

// トランザクションを投稿する
const response = await arweave.transactions.post(transaction);
```

## データトランザクションの投稿
この例では、ディスクからファイルを読み込み、そのデータをネットワーク上に保存するトランザクションを作成します。ネットワークが請求している現在の価格は[https://ar-fees.arweave.dev](https://ar-fees.arweave.dev)で確認できます。
```js:no-line-numbers
// ディスクからデータを読み込む
const imageData = fs.readFileSync(`iamges/myImage.png`);

// データトランザクションを作成する
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// ブラウザにこのデータを提供する方法をゲートウェイに示すカスタムタグを追加する
transaction.addTag('Content-Type', 'image/png');

// トランザクションに署名する必要があります
await arweave.transactions.sign(transaction, key);

// データをネットワークにアップロードするためにデータアップローダーを作成する
let uploader = await arweave.transactions.getUploader(transaction);

// アップローダーがアップロードを完了するまで実行する
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```
## リソース
* トランザクションを投稿する方法の概要については、クックブックの[トランザクションの投稿](../../concepts/post-transactions.md)セクションを参照してください。

* `arweave-js`のすべての機能の詳細な説明については、GitHubのドキュメントを参照してください：[https://github.com/ArweaveTeam/arweave-js](https://github.com/ArweaveTeam/arweave-js)