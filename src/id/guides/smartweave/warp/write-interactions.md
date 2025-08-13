---
locale: id
---

# Warp WriteInteractions

Untuk memanggil fungsi pada kontrak SmartWeave, Anda dapat membuat transaksi yang dikenal sebagai SmartWeave action. Tindakan ini mencakup nama fungsi dan parameter input yang diperlukan untuk fungsi pada kontrak SmartWeave. Anda dapat membuat tindakan SmartWeave menggunakan fungsi contract.writeInteraction.

## Kode

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .writeInteraction({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

Ketika memanggil writeInteraction, Anda perlu melewati parameter input Anda, ini adalah parameter yang diharapkan oleh kontrak untuk menerima.

::: warning
Karena kontrak SmartWeave dievaluasi dalam aliran yang malas, Anda tidak tahu apakah interaksi Anda berhasil berjalan sampai Anda mengevaluasi kontrak ke status saat ini. Gunakan [Warp readState](./readstate.md) untuk mengakses kontrak dan menentukan apakah interaksi telah berhasil diterapkan.
:::

## Dry Write

`DryWrite` memungkinkan Anda untuk menguji dan memverifikasi interaksi pada status saat ini tanpa benar-benar menjalankannya di permaweb. Fitur ini memungkinkan Anda mensimulasikan interaksi secara lokal dan memastikan bahwa interaksi akan berhasil sebelum menerapkannya.

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .dryWrite({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

::: warning
Hal yang perlu diperhatikan saat menggunakan penulisan kering adalah bahwa seluruh status perlu dievaluasi secara lokal untuk kontak yang menggunakan readState atau internalWrites. Ini dapat menghasilkan proses yang lambat.
:::

## Dioptimalkan untuk Kecepatan

Secara default, writeInteractions dikirimkan ke Warp Sequencer dan dibundel dan diposting ke Arweave. Anda dapat memposting langsung ke Arweave dengan menonaktifkan bundling.

```ts
const result = await contract.writeInteraction({
  function: 'NAMA_FUNGSI_ANDA',
  ...
}, { disableBundling: true })
```

## Ringkasan

Protokol SmartWeave memungkinkan modifikasi data dinamis pada sistem penyimpanan yang tidak dapat diubah dan hanya dapat ditambahkan menggunakan writeInteractions. Interaksi ini memungkinkan komunikasi tanpa kepercayaan dan tanpa izin dengan kontrak SmartWeave. SDK Warp menyediakan pengembang dengan API yang ramah pengguna untuk berinteraksi dengan Protokol SmartWeave dan fitur writeInteractions-nya.

Untuk sumber daya tambahan:

* SDK Warp [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Dokumentasi Warp [https://warp.cc](https://warp.cc)