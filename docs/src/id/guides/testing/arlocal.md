---
locale: id
---

# arlocal

`arlocal` adalah alat untuk dengan cepat menyiapkan dan menjalankan lingkungan pengujian Arweave lokal. Ini memungkinkan Anda untuk menguji transaksi pada server mirip gateway Arweave. Ini memungkinkan pengembang menguji aplikasi mereka dalam lingkungan yang disimulasikan sebelum mendeploy mereka ke jaringan Arweave

Tidak ada token $AR yang diperlukan untuk digunakan dan transaksi instan.

## CLI
Anda harus memiliki node dan npm terinstal di mesin Anda untuk menggunakan CLI arlocal

Untuk memulai gateway lokal, jalankan `npx arlocal`

::: tip
Anda dapat menentukan port apa yang digunakan oleh slim gateway dengan melewatkan port Anda sebagai argumen
`npx arlocal 8080`
:::

Untuk menyembunyikan log, tambahkan flag `--hidelogs` ketika Anda menjalankan gateway Anda
`npx arlocal --hidelogs`
## Node 
Instal paket sebagai dependensi pengembangan dengan menjalankan
`yarn add arlocal -D` atau `npm install arlocal --save-dev`

```js
import ArLocal from 'arlocal';

(async () => {
  const arLocal = new ArLocal();

  // buat lingkungan pengujian lokal
  await arLocal.start();

  // uji Anda di sini

  // hentikan lingkungan pengujian
  await arLocal.stop();
})();
```

Sebuah instance `ArLocal` dapat dibuat dengan opsi
| Opsi | Deskripsi |
| ---- | ----------- |
| port | Port yang digunakan |
| showLogs | Menampilkan log |
| dbPath | Direktori untuk basis data sementara  |
| persist | Memelihara data antara restart server

### Contoh
Agar contoh ini berfungsi, kode perlu menggunakan dompet pengujian yang dihasilkan. Untuk mencapainya, paket `arweave` harus diinstal ke dalam proyek bersama dengan `arlocal`

`yarn add arweave arlocal -D` atau `npm install --save-dev arweave arlocal`

Di bawah ini adalah pengujian JavaScript dasar untuk membuat transaksi data dan mempostingnya ke Arweave menggunakan arlocal:

```js
import ArLocal from 'arlocal'
import Arweave from 'arweave'

test('test transaction', async () => {
    // buat dan mulai instance ArLocal
    const arLocal = new ArLocal()
    await arLocal.start()
    // buat gateway Arweave lokal
    const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
  })
  // hasilkan dompet
  const wallet = await arweave.wallets.generate()
  // airdrop jumlah token (dalam winston) ke dompet
  await arweave.api.get(`mint/${addr}/10000000000000000`)
  // buat fungsi penambangan
  const mine = () => arweave.api.get('mine')
  try {
    // buat transaksi
    let transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, wallet);
    // tanda tangan dan posting transaksi
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // tambang transaksi
    await mine()
    // uji respons
  } catch(err) {
    console.error('ERROR: ', err.message)
  }
  // hentikan lingkungan pengujian
  await arLocal.stop()
})
```

::: warning
Hasil pengujian dari transaksi L1 dapat berbeda dari transaksi L2
:::

## Sumber Daya
[dokumentasi arlocal](https://github.com/textury/arlocal)