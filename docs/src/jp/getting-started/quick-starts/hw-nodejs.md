---
locale: jp
---
# こんにちは世界（NodeJS）

このガイドでは、「arweave-js」と「bundlr」を使用してデータを永続ウェブに取得するための最もシンプルな方法を説明します。

Arweave 2.6では、ブロックあたり1000アイテムのみが許可されているため、ゲートウェイに直接投稿すること（例：「arweave-js」を使用すること）は一般的ではありません。

## 必要なもの

- [NodeJS](https://nodejs.org) LTS以上

## 説明

ターミナル/コンソールウィンドウを使用して、「hw-nodejs」という新しいフォルダを作成します。

## セットアップ

```sh
cd hw-nodejs
npm init -y
npm install arweave @bundlr-network/client
```

## ウォレットの生成

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## bundlrを使用してアップロードする（無料トランザクション）

```js:no-line-numbers
import Bundlr from "@bundlr-network/client";
import fs from "fs";

const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());

const bundlr = new Bundlr(
  "http://node2.bundlr.network",
  "arweave",
  jwk
);

bundlr
  .upload("Hello world")
  .then((r) => console.log(`https://arweave.net/${r.id}`))
  .catch(console.log);
```

## ArweaveJSを使用してアップロードする

最新バージョンの「nodejs」を実行している場合、この「arweavejs」スクリプトはそのまま使用できます。他のバージョンでは、「--experimental-fetch」フラグを使用する必要がある場合があります。

```js:no-line-numbers
import Arweave from "arweave";
import fs from "fs";

// ディスクからJWKウォレットキーファイルを読み込む
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// Arweaveを初期化する
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const tx = await arweave.createTransaction(
  {
    data: "Hello world!",
  },
  jwk
);

await arweave.transactions.sign(tx, jwk);

arweave.transactions.post(tx).then(console.log).catch(console.log);
console.log(`https://arweave.net/${tx.id}`);
```

## リソース

- [Bundlr SDK](https://github.com/Bundlr-Network/js-sdk)
- [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
- [Bundlrドキュメント：無料アップロード](https://docs.bundlr.network/FAQs/general-faq#does-bundlr-offer-free-uploads)