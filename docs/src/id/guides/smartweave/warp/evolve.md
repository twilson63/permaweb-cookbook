---
locale: id
---

# Warp (SmartWeave) SDK - Evolve

Evolve adalah fitur yang memungkinkan pengembang untuk memperbarui kode sumber kontrak pintar tanpa harus mendeploy kontrak baru. Untuk menggunakan fitur ini, Anda harus pertama-tama mengirimkan kode sumber baru menggunakan fungsi `save`. Setelah kode yang diperbarui telah dikonfirmasi di Permaweb, Anda dapat menggunakan fungsi `evolve` untuk mengarahkan kontrak ke ID kode sumber baru. Hal ini memungkinkan Anda untuk memperbarui perilaku kontrak tanpa membuat instansi kontrak baru.

## Mengapa?

Menulis kontrak SmartWeave bisa sulit dan terkadang memerlukan pembaruan atau penambahan fitur baru seiring berjalannya waktu. Evolve memungkinkan Anda untuk melakukan perubahan pada kontrak Anda tanpa harus membuat instansi kontrak baru dari awal. Untuk menggunakan fitur ini, objek status kontrak Anda harus menyertakan properti evolve yang diatur ke identifikasi transaksi kode sumber kontrak baru. Ini memungkinkan Anda untuk memodifikasi dan meningkatkan kontrak yang sudah ada tanpa harus memulainya dari awal.

```json
{
  ...
  "evolve": "YOUR SOURCE CODE TX_ID"
}
```

## Unggah kode sumber baru ke Permaweb

Sebelum Anda dapat melakukan evolusi pada kontrak yang sudah ada, Anda perlu mengunggah kode sumber baru ke Permaweb, Anda dapat melakukannya dengan menggunakan fungsi `save`.

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const TX_ID = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function main() {
  const newSrcTxId = await warp.contract(TX_ID).connect(jwk).save({ src })
  console.log('NEW SRC ID', newSrcTxId)
}

main()
```

## Evolusi kontrak Anda

::: warning
**Verifikasi** bahwa TX_ID Kode Sumber baru Anda sudah dikonfirmasi, periksa ke [Sonar](https://sonar.warp.cc) untuk memastikan TX_ID sudah dikonfirmasi.
:::

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const TX_ID = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function main() {
  const result = await warp.contract(TX_ID).connect(jwk).evolve('SRC TX ID')
  console.log(result)
}

main()
```

::: tip
Harap diperhatikan bahwa fitur evolve hanya berlaku untuk tindakan di masa depan, artinya Anda tidak dapat menggunakannya untuk menerapkan kode sumber baru pada tindakan yang terjadi sebelum kontrak berevolusi.
:::

## Ringkasan

Evolve adalah fitur yang kuat dan dapat memberikan fleksibilitas pada kontrak Anda, tetapi juga dapat menjadi vektor serangan, jadi pastikan Anda benar-benar memahami apa yang Anda lakukan saat menggunakannya. Di bawah ini adalah potongan kode umum tentang bagaimana fungsi evolve mungkin terlihat dalam kontrak Anda.

```js
export async function handle(state, action) {
  ...
  if (action.input.function === 'evolve') {
    if (action.caller === state.creator) {
      state.evolve = action.input.value
    }
    return { state }
  }
  ...
}
```