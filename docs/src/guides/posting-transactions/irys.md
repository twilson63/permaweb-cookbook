# Posting Transactions using Irys (Previously Bundlr)

Posting transactions to irys.xyz can be accomplished using the `irys.xyz/sdk` JavaScript package. Bundling services enable guaranteed confirmation of posted transactions as well as supporting many thousands of transactions per block though the use of transaction bundles.

## Installing the irys.xyz/client

To install `irys.xyz/client` run

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

## Initializing Irys Network Client

A difference between posting Layer 1 and bundled Layer 2 transactions is that when using Irys you must make a deposit on the [Irys node](http://docs.irys.xyz/overview/nodes) ahead of time. This deposit can be made using AR tokens or a variety of other crypto currencies. Another difference is that Irys guarantees your data will arrive on chain.

```js:no-line-numbers
import Irys from "@irys/sdk";
import fs from "fs";

const url = "https://node1.irys.xyz";
const token = "arweave";
// load the JWK wallet key file from disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

const irys = new Irys({
	url, // URL of the node you want to connect to
	token, // Token used for payment and signing
	key, // Arweave wallet
});
```

## Using ArDrive Turbo with Irys

The Irys SDK can post transactions to Turbo, and use Turbo Credits to pay for upload, by setting `https://turbo.ardrive.io` as the upload url when initializing.

```js:no-line-numbers
const irys = new Irys({
	url: 'https://turbo.ardrive.io',
	token: 'arweave',
	key //Arweave Wallet
})
```

## Posting a Bundled Transaction

```js:no-line-numbers
// Your file
const fileToUpload = "./myImage.png";

// Add a custom tag
// NOTE: The Content-Type tag will be added automatically
const tags = [{ name: "application-id", value: "MyNFTDrop" }];

// Upload the file
try {
	const receipt = await irys.uploadFile(fileToUpload, { tags });
	console.log(`File uploaded ==> https://arweave.net/${receipt.id}`);
} catch (e) {
	console.log("Error uploading file ", e);
}
```

## Resources

-   For an overview of all the ways you can post transactions, see the [Posting Transactions](../../concepts/post-transactions.md) section of the cookbook.

-   The full Irys client docs can be found on the [irys.xyz website](http://docs.irys.xyz/developer-docs/irys-sdk)

-   A tutorial for [uploading NFT assets](http://docs.irys.xyz/hands-on/tutorials/uploading-nfts) using Irys.
