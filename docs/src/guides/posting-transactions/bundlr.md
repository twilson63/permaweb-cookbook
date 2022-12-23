## Installing the bundlr.network/client
using npm:
```console
npm install @bundlr-network/client
```
or using yarn:
```console
yarn add @bundlr-network/client
```

## Initializing Bundlr Network Client
Layer 2 transactions are posted using `bundlr-network/client`.

```js
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initailze the bundlr SDK
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## Posting a Bundled Transaction
A difference between posting Layer 1 and bundled Layer 2 transactions is that when using bundlr you must make a deposit on the bundlr node ahead of time. This deposit can be made using AR tokens or a variety of other crypto currencies. Another difference is that the bundlr service guarantees your data will arrive on chain.
```js
// load the data from disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// add a custom tag that tells the gateway how to serve this data to a browser
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// create the bundled transaction and sign it
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// upload the transaction to bundlr for inclusion in a bundle to be posted
await tx.upload();
```
## Resources
The full bundlr client docs can be found on the [bundlr.network website](https://docs.bundlr.network/docs/overview)

A tutorial and workshop for [uploading an NFT collection](https://github.com/DanMacDonald/nft-uploader) using bundlr.