---
locale: id
---

# Hello World (NodeJS)

Panduan ini akan memandu Anda melalui cara paling sederhana untuk mengunggah data ke permaweb menggunakan `arweave-js` dan `bundlr`.

Dengan Arweave 2.6 hanya memungkinkan 1000 item per blok, pengunggahan langsung ke gateway (misalnya dengan menggunakan `arweave-js`) kemungkinan akan jarang terjadi.

## Persyaratan

- [NodeJS](https://nodejs.org) LTS atau yang lebih baru

## Deskripsi

Dengan menggunakan jendela terminal atau konsol, buat folder baru bernama `hw-nodejs`.

## Persiapan

```sh
cd hw-nodejs
npm init -y
npm install arweave @bundlr-network/client
```

## Membuat sebuah dompet (wallet)

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Mengunggah menggunakan bundlr (Transaksi Gratis)

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

## Mengunggah menggunakan ArweaveJS

Jika Anda menjalankan versi terbaru dari `nodejs`, skrip `arweavejs` ini akan berfungsi seperti biasa. Namun, untuk versi lain Anda mungkin perlu menggunakan opsi `--experimental-fetch`.

```js:no-line-numbers
import Arweave from "arweave";
import fs from "fs";

// memuat berkas kunci dompet JWK dari disk
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// menginisialisasi arweave
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

## Sumber Daya

- [SDK Bundlr](https://github.com/Bundlr-Network/js-sdk)
- [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
- [Dokumentasi Bundlr: Unggahan Gratis](https://docs.bundlr.network/FAQs/general-faq#does-bundlr-offer-free-uploads)
