# Hello World (NodeJS)

This guide walks you through the most simple way to get data on to the permaweb using `arweave-js` and `irys`.

With Arweave 2.6 only allowing 1000 items per block, directly posting to the gateway (eg. using `arweave-js`) will likely be uncommon.

## Requirements

-   [NodeJS](https://nodejs.org) LTS or greater

## Description

Using a terminal/console window create a new folder called `hw-nodejs`.

## Setup

```sh
cd hw-nodejs
npm init -y
npm install arweave ardrive-cli
```

## Generate a wallet

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## Upload using Ardrive Turbo

Uploads of less than 100 KiB are currently free on Irys' Node 2.

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

## Upload using ArweaveJS

If you are running the latest version of `nodejs` this `arweavejs` script will work as is. For other versions you may need to use the `--experimental-fetch` flag.

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
