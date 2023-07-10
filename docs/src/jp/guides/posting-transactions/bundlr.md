---
locale: jp
---
# bundlr.networkを使用してトランザクションを投稿する
`bundlr.network/client` javascriptパッケージを使用して、bundlr.networkにトランザクションを投稿することができます。バンドルングサービスを使用することで、トランザクションバンドルを通じて1ブロックあたり数千件のトランザクションを保証付きでサポートすることができます。

## bundlr.network/clientのインストール
`bundlr.network/client`をインストールするには、以下のコマンドを実行してください。

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @bundlr-network/client
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

## Bundlr Network Clientの初期化
Layer 1とバンドル化されたLayer 2のトランザクションを投稿する際の違いは、bundlrを使用する場合、事前にbundlrノードへのデポジットを行う必要がある点です。このデポジットはARトークンやさまざまな他の暗号通貨を使用して行うことができます。また、bundlrサービスはデータがブロックチェーンに到着することを保証します。

```js:no-line-numbers
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// ディスクからJWKウォレットキーファイルを読み込みます
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// bundlr SDKを初期化します
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## バンドル化されたトランザクションの投稿

```js:no-line-numbers
// ディスクからデータを読み込みます
const imageData = fs.readFileSync(`images/myImage.png`);

// ブラウザにこのデータを提供する方法をゲートウェイに伝えるカスタムタグを追加します
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// バンドル化されたトランザクションを作成し、署名します
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// トランザクションをbundlrにアップロードしてバンドルに含めるために待機します
await tx.upload();
```
## リソース
* トランザクションを投稿する方法の概要については、クックブックの[トランザクションの投稿](../../concepts/post-transactions.md)セクションを参照してください。

* bundlrクライアントの詳細なドキュメントは、[bundlr.networkウェブサイト](https://docs.bundlr.network/docs/overview)で確認できます。

* bundlrを使用した[NFTコレクションのアップロード](https://github.com/DanMacDonald/nft-uploader)のチュートリアルとワークショップ。