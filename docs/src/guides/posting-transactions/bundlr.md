# Posting Transactions using bundlr.network
Posting transactions to bundlr.network can be accomplished using the `bundlr.network/client` javascript package. Bundling services enable guaranteed confirmation of posted transactions as well as supporting many thousands of transactions per block though the use of transaction bundles.

## Installing the bundlr.network/client
To install `bundlr.network/client` run

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

## Initializing Bundlr Network Client
A difference between posting Layer 1 and bundled Layer 2 transactions is that when using bundlr you must make a deposit on the bundlr node ahead of time. This deposit can be made using AR tokens or a variety of other crypto currencies. Another difference is that the bundlr service guarantees your data will arrive on chain.

```js:no-line-numbers
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initailze the bundlr SDK
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## Posting a Bundled Transaction

```js:no-line-numbers
// load the data from disk
const imageData = fs.readFileSync(`images/myImage.png`);

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
* For an overview of all the ways you can post transactions, see the [Posting Transactions](../../concepts/post-transactions.md) section of the cookbook.

* The full bundlr client docs can be found on the [bundlr.network website](https://docs.bundlr.network/docs/overview)

* A tutorial and workshop for [uploading an NFT collection](https://github.com/DanMacDonald/nft-uploader) using bundlr.