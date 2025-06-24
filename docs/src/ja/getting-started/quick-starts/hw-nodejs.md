---
locale: ja
---
# Hello World (NodeJS)

このガイドでは、`arweave-js`と`irys`を使用して、データをパーマウェブにアップロードする最も簡単な方法を説明します。

Arweave 2.6では、ブロックごとに1000アイテムしか許可されていないため、ゲートウェイに直接投稿する（例：`arweave-js`を使用する）ことはあまり一般的ではないでしょう。

## 要件

-   [NodeJS](https://nodejs.org) LTS以上

## 説明

ターミナル/コンソールウィンドウを使用して、`hw-nodejs`という新しいフォルダを作成します。

## セットアップ

```sh
cd hw-nodejs
npm init -y
npm install arweave ardrive-cli
```

## ウォレットの生成

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## Ardrive Turboを使用したアップロード

現在、Irysのノード2では、100 KiB未満のアップロードが無料です。


```js:no-line-numbers
import Irys from "@irys/sdk";
import fs from "fs";

const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());
const url = "https://node2.irys.xyz";
const token = "arweave";

const irys = new Irys({
	url, // URL of the node you want to connect to
	token, // Token used for payment and signing
	jwk, // Arweave wallet
});

const dataToUpload = "GM world.";

try {
	const receipt = await irys.upload(dataToUpload);
	console.log(`Data uploaded ==> https://arweave.net/${receipt.id}`);
} catch (e) {
	console.log("Error uploading data ", e);
}
```

## ArweaveJSを使用したアップロード

最新バージョンの`nodejs`を実行している場合、この`arweavejs`スクリプトはそのまま動作します。その他のバージョンでは、`--experimental-fetch`フラグを使用する必要があるかもしれません。


```js:no-line-numbers
import Arweave from "arweave";
import fs from "fs";

// load the JWK wallet key file from disk
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// initialize arweave
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

## Resources

-   [Irys SDK](https://github.com/irys-xyz/js-sdk)
-   [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
-   [Irys Docs: Free Uploads](http://docs.irys.xyz/faqs/dev-faq#does-irys-offer-free-uploads)
