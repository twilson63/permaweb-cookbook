---
locale: id
---

# Mengirimkan Transaksi menggunakan bundlr.network
Mengirimkan transaksi ke bundlr.network dapat dilakukan dengan menggunakan paket javascript `bundlr.network/client`. Layanan bundling memungkinkan konfirmasi transaksi yang diposting dan mendukung banyak ribu transaksi per blok melalui penggunaan bundel transaksi.

## Menginstal bundlr.network/client
Untuk menginstal `bundlr.network/client`, jalankan

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

## Menginisialisasi Bundlr Network Client
Perbedaan antara pengiriman transaksi Layer 1 dan transaksi Layer 2 yang dibundel adalah bahwa saat menggunakan bundlr Anda harus melakukan deposit di node bundlr sebelumnya. Deposit ini dapat dilakukan menggunakan token AR atau berbagai mata uang kripto lainnya. Perbedaan lainnya adalah bahwa layanan bundlr menjamin data Anda akan tiba di rantai.

```js:no-line-numbers
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// muat berkas kunci dompet JWK dari disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inisialisasi SDK bundlr
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## Mengirimkan Transaksi yang Dibundel

```js:no-line-numbers
// muat data dari disk
const imageData = fs.readFileSync(`images/myImage.png`);

// tambahkan tag kustom yang memberi tahu gateway cara menyajikan data ini ke peramban
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// buat transaksi yang dibundel dan tandatangani
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// unggah transaksi ke bundlr untuk dimasukkan dalam bundel yang akan diposting
await tx.upload();
```
## Sumber Daya
* Untuk gambaran semua cara Anda dapat memposting transaksi, lihat bagian [Posting Transactions](../../concepts/post-transactions.md) dari buku masak.

* Dokumentasi lengkap bundlr client dapat ditemukan di [situs web bundlr.network](https://docs.bundlr.network/docs/overview)

* Tutorial dan lokakarya untuk [mengunggah koleksi NFT](https://github.com/DanMacDonald/nft-uploader) menggunakan bundlr.