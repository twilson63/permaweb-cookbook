## Transaction Types
Arweave transactions come in two varieties. `Wallet-to-wallet` transactions that transfer AR tokens from one wallet to another and `data` transactions that charge a fee to permanently store data on the Arweave network.

Interestingly, `data` transactions may also transfer tokens to a target wallet and pay the data storage fee all in a single transaction. Both transaction types support up to 2KB worth of user generated custom tags that get indexed and can be used to query for the transaction at a later date.

## Layer 1 Transactions
Arweave produces new blocks approximately every two minutes with a protocol limit of 1000 transactions per block. As a consequence the maximum transaction at the base layer (Layer 1) is ~8 transactions per second. If your application exceeds this threshold consider posting your transactions to Layer 2 which scales to a virtually unlimited volume of transactions.

Note: It's possible when posting a Layer 1 transaction that it does not get included in a block. This is referred to as a "dropped" transaction and can happen for a variety of reasons. Always be sure to verify your transactions have several confirmations before considering them permanent.

### Initializing arweave-js
Layer 1 transactions are posted using the `arweave-js` library.
```js
import Arweave from 'arweave';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initalize an arweave instance
const arweave = Arweave.init({});
```

### Posting a wallet-to-wallet Transaction

```js
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

### Posting a Data Transaction
```js
// load the data from disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// create a data transaction
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// add a custom tag that tells the gateway how to serve this data in the browser
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

## Layer 2 Transactions
Services that increase the scaleability and performance of the underlying Arweave protocol are referred to as Layer 2 solutions. A bundler is one such service that takes multiple individual transactions and bundles them together into a single transaction that is posted to Layer 1. In this way a single transaction at the protocol level can contain tens of thousands of bundled transactions. With only one restriction, bundled transactions cannot transfer AR tokens.

### Initializing Bundlr Network Client
Layer 2 transactions are posted using `bundlr-network/client`.
```js
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// initailze the bundlr SDK
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

### Posting a Bundled Transaction
A difference between posting Layer 1 and bundled Layer 2 transactions is that when using bundlr you must make a deposit on the bundlr node ahead of time. This deposit can be made using AR tokens or a wide variety of other crypto currencies. Another difference is that the bundlr service guarantees your data will arrive on chain.
```js
// load the data from disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// add a custom tag that tells the gateway how to serve this data in the browser
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// create the bundled transaction and sign it
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// upload the transaction to bundlr for inclusion in a bundle to be posted
await tx.upload();
```

## Layer 2 Dispatch
Another way to post layer 2 transactions is from the browser. While browsers enforce some constraints around the size of data that can be uploaded, browser based wallets are able to post transactions to Layer 2. Arweave browser wallets impllment a `dispatch()` method. An interesting property of this `dispatch()` method is that if the transaction data is < 100KB, the transaction is free.
```js
// use arweave-js to create a transaction
let tx = await arweave.createTransaction({ data:"Hello World!" })

// add some custom tags to the transaction
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// use the browser wallet to dispatch() the transaction
let result = await window.arweaveWallet.dispatch(tx);

// log out the transactino id
console.log(result.id);
```

