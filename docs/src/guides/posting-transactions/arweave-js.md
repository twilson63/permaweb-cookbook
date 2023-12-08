# Posting Transactions using arweave-js

Arweave native transactions can be posted directly to a node or gateway using the `arweave-js` package.

::: info
Arweave scales though the use of transaction bundles. These bundles make it possible for each block to contain a nearly unlimited number of transactions. Without the use of bundles, Arweave blocks are limited 1000 transactions per block (with new blocks produced every ~2 minutes). If your use case exceeds this capacity you may experience dropped transactions. Under these circumstances please consider using [irys.xyz](./irys.md) or similar services to bundle your transactions.
:::

## Installing the arweave-js Package

To install `arweave-js` run
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
When working with NodeJS a minimum version of NodeJS 18 or higher is required.
:::

## Initializing arweave-js

Direct Layer 1 transactions are posted using the `arweave-js` library.

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initialize an arweave instance
const arweave = Arweave.init({});
```

## Posting a wallet-to-wallet Transaction

A basic transaction to move AR tokens from one wallet address to another.

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

## Posting a Data Transaction

This example illustrates how load a file from disk and create a transaction to store its data on the network. You can find the current price the network is charging at [https://ar-fees.arweave.dev](https://ar-fees.arweave.dev)

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

## Resources

-   For an overview of all the ways you can post transactions, see the [Posting Transactions](../../concepts/post-transactions.md) section of the cookbook.

-   For a more detailed description of all `arweave-js`'s features see the documentation [on github](https://github.com/ArweaveTeam/arweave-js)
