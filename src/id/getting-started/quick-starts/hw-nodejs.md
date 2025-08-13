---
locale: id
---

# Hello World (NodeJS)

Panduan ini akan memandu Anda melalui cara paling sederhana untuk mengunggah data ke permaweb menggunakan `arweave-js` dan `Irys`.

Dengan Arweave 2.6 hanya memungkinkan 1000 item per blok, pengunggahan langsung ke gateway (misalnya dengan menggunakan `arweave-js`) kemungkinan akan jarang terjadi.

## Persyaratan

-   [NodeJS](https://nodejs.org) LTS atau yang lebih baru

## Deskripsi

Dengan menggunakan jendela terminal atau konsol, buat folder baru bernama `hw-nodejs`.

## Persiapan

```sh
cd hw-nodejs
npm init -y
npm install arweave @irys/sdk
```

## Membuat sebuah dompet (wallet)

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Mengunggah menggunakan Irys (Transaksi Gratis)

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

-   [SDK Irys](https://github.com/irys-xyz/js-sdk)
-   [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
-   [Dokumentasi Irys: Unggahan Gratis](http://docs.irys.xyz/faqs/dev-faq#does-irys-offer-free-uploads)
