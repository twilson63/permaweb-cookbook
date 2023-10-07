---
locale: id
---

# Mengirimkan Transaksi menggunakan arweave-js

Transaksi asli Arweave dapat diposting langsung ke node atau gateway menggunakan paket `arweave-js`.

::: info
Arweave mengukur skala melalui penggunaan bundel transaksi. Bundel-bundel ini membuat mungkin bagi setiap blok mengandung sejumlah besar transaksi yang hampir tak terbatas. Tanpa penggunaan bundel, blok Arweave terbatas 1000 transaksi per blok (dengan blok baru diproduksi setiap ~2 menit). Jika kasus penggunaan Anda melebihi kapasitas ini, Anda mungkin mengalami transaksi yang terhapus. Dalam keadaan seperti ini, pertimbangkan menggunakan [irys.xyz](./irys.md) atau layanan serupa untuk mengelompokkan transaksi Anda.
:::

## Menginstal Paket arweave-js

Untuk menginstal `arweave-js`, jalankan
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

## Menginisialisasi arweave-js

Transaksi Layer 1 langsung diposting menggunakan perpustakaan `arweave-js`.

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// muat berkas kunci dompet JWK dari disk
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inisialisasi instance arweave
const arweave = Arweave.init({});
```

## Mengirimkan Transaksi Wallet-ke-Wallet

Transaksi dasar untuk memindahkan token AR dari satu alamat dompet ke alamat lain.

```js:no-line-numbers
// membuat transaksi wallet-ke-wallet mengirimkan 10,5 AR ke alamat target
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// Anda harus menandatangani transaksi dengan kunci Anda sebelum mempostingnya
await arweave.transactions.sign(transaction, key);

// posting transaksi
const response = await arweave.transactions.post(transaction);
```

## Mengirimkan Transaksi Data

Contoh ini mengilustrasikan bagaimana memuat berkas dari disk dan membuat transaksi untuk menyimpan datanya di jaringan. Anda dapat menemukan harga saat ini yang dikenakan jaringan di [https://ar-fees.arweave.dev](https://ar-fees.arweave.dev)

```js:no-line-numbers
// muat data dari disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// membuat transaksi data
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// tambahkan tag kustom yang memberi tahu gateway cara menyajikan data ini ke peramban
transaction.addTag('Content-Type', 'image/png');

// Anda harus menandatangani transaksi dengan kunci Anda sebelum mempostingnya
await arweave.transactions.sign(transaction, key);

// buat uploader yang akan menyebarkan data Anda ke jaringan
let uploader = await arweave.transactions.getUploader(transaction);

// jalankan uploader hingga selesai mengunggah.
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## Sumber Daya

-   Untuk gambaran semua cara Anda dapat memposting transaksi, lihat bagian [Posting Transactions](../../concepts/post-transactions.md) dari buku masak.

-   Untuk deskripsi lebih rinci tentang semua fitur `arweave-js`, lihat dokumentasi [di github](https://github.com/ArweaveTeam/arweave-js)
