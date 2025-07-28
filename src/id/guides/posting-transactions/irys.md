---
locale: id
---

# Mengirimkan Transaksi menggunakan irys.xyz

Mengirimkan transaksi ke irys.xyz dapat dilakukan dengan menggunakan paket javascript `irys.xyz/sdk`. Layanan bundling memungkinkan konfirmasi transaksi yang diposting dan mendukung banyak ribu transaksi per blok melalui penggunaan bundel transaksi.

## Menginstal irys.xyz/sdk

Untuk menginstal `irys/sdk`, jalankan

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

## Menginisialisasi Irys Network Client

Perbedaan antara pengiriman transaksi Layer 1 dan transaksi Layer 2 yang dibundel adalah bahwa saat menggunakan Irys Anda harus melakukan deposit di node Irys sebelumnya. Deposit ini dapat dilakukan menggunakan token AR atau berbagai mata uang kripto lainnya. Perbedaan lainnya adalah bahwa layanan Irys menjamin data Anda akan tiba di rantai.

```js:no-line-numbers
import Irys from '@irys/sdk';
import fs from "fs";

// muat berkas kunci dompet JWK dari disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inisialisasi SDK Irys
const irys = new Irys({ "http://node1.irys.xyz", "arweave", key });
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
const tx = irys.createTransaction(imageData, { tags });
await tx.sign();

// unggah transaksi ke Irys untuk dimasukkan dalam bundel yang akan diposting
await tx.upload();
```

## Sumber Daya

-   Untuk gambaran semua cara Anda dapat memposting transaksi, lihat bagian [Posting Transactions](../../concepts/post-transactions.md) dari buku masak.

-   Dokumentasi lengkap Irys client dapat ditemukan di [situs web irys.xyz](https://docs.irys.xyz)

-   Tutorial dan lokakarya untuk [mengunggah koleksi NFT](http://docs.irys.xyz/hands-on/tutorials/uploading-nfts) menggunakan Irys.
