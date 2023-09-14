---
locale: id
---

# ArDB
Sebuah perpustakaan yang dibangun di atas GraphQL yang memungkinkan Anda untuk mengambil data transaksi dan blok dari Arweave tanpa harus menghafal nama parameter GraphQL. Cukup bangun kueri dengan menggunakan fitur otomatisasi lengkap di editor kode favorit Anda.

## Instalasi
```console:no-line-numbers
yarn add ardb
```

## Contoh
```js:no-line-numbers
import Arweave from 'arweave';
import ArDB from 'ardb';

// inisialisasi instans arweave
const arweave = Arweave.init({});

// arweave adalah instans Klien Arweave
const ardb = new ArDB(arweave);

// Dapatkan satu transaksi berdasarkan ID-nya
const tx = await ardb.search('transaction')
	.id('A235HBk5p4nEWfjBEGsAo56kYsmq7mCCyc5UZq5sgjY')
	.findOne();

// Dapatkan array transaksi dan sertakan hanya hasil pertama
const txs = await ardb.search('transactions')
	.appName('SmartWeaveAction')
	.findOne();

// Ini sama dengan melakukan hal berikut:
const txs = await ardb.search('transactions')
	.tag('App-Name', 'SmartWeaveAction')
	.limit(1)
	.find();

// Cari beberapa transaksi dari pemilik/alamat dompet tertentu
const txs = await ardb.search('transactions')
	.from('BPr7vrFduuQqqVMu_tftxsScTKUq9ke0rx4q5C9ieQU')
	.find();

// Lanjutkan penelusuran hasil dengan...
const newTxs = await ardb.next();

// Atau Anda bisa mendapatkan semua hasil sekaligus dengan melakukan:
const txs = await ardb.search('blocks')
 .id('BkJ_h-GGIwfek-cJd-RaJrOXezAc0PmklItzzCLIF_aSk36FEjpOBuBDS27D2K_T')
 .findAll();

```

## Sumber Daya
* [Paket NPM ArDB](https://www.npmjs.com/package/ardb)