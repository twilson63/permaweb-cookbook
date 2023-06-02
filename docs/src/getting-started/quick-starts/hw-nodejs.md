# Hello World (NodeJS)

This guide walks you through the most simple way to get data on to the permaweb using `arweave-js` and `bundlr`.

With Arweave 2.6 only allowing 1000 items per block, directly posting to the gateway (eg. using `arweave-js`) will likely be uncommon.

## Requirements

- [NodeJS](https://nodejs.org) LTS or greater

## Description

Using a terminal/console window create a new folder called `hw-nodejs`.

## Setup

```sh
cd hw-nodejs
npm init -y
npm install arweave @bundlr-network/client
```

## Generate a wallet

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Upload using bundlr (Free Transactions)

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

- [Bundlr SDK](https://github.com/Bundlr-Network/js-sdk)
- [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
- [Bundlr Docs: Free Uploads](https://docs.bundlr.network/FAQs/general-faq#does-bundlr-offer-free-uploads)
