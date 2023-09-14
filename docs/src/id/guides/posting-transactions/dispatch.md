---
locale: id
---

# Mengirimkan Transaksi dengan Menggunakan Dispatch
Dompet Arweave di peramban memiliki konsep pengiriman transaksi. Jika ukuran transaksi kurang dari 100KB, maka transaksi tersebut dapat diposting secara gratis!
## Mengirimkan Transaksi
Ini dapat dilakukan tanpa ketergantungan paket apa pun untuk aplikasi klien. Selama pengguna memiliki dompet peramban yang aktif dan data kurang dari 100KB, transaksi yang dikirimkan gratis dan dijamin akan dikonfirmasi di jaringan.

```js:no-line-numbers
// menggunakan arweave-js untuk membuat transaksi
let tx = await arweave.createTransaction({ data:"Hello World!" })

// menambahkan beberapa tag kustom ke transaksi
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// menggunakan dompet peramban untuk mendispatch() transaksi
let result = await window.arweaveWallet.dispatch(tx);

// mencetak ID transaksi
console.log(result.id);
```

## Sumber Daya
* Untuk gambaran semua cara Anda dapat memposting transaksi, lihat bagian [Posting Transactions](../../concepts/post-transactions.md) dari cookbook.