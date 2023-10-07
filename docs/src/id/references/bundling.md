---
locale: id
---

# Bundling

Sebelum memulai dengan referensi di bawah ini, pastikan Anda telah membaca [Bundles and Bundling](/concepts/bundles.md) dari [Core Concepts](/concepts/).

## Persiapan

Kami akan menggunakan pustaka [arbundles](https://github.com/irys-xyz/arbundles) yang merupakan implementasi JavaScript dari [spesifikasi ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md). ArBundles dilengkapi dengan dukungan TypeScript.

**Catatan:** Referensi ini mengasumsikan lingkungan NodeJS. Kompatibilitas browser dengan ArBundles memungkinkan tetapi saat ini memerlukan penanganan `Buffer` polyfill. Ini akan diatasi dalam versi ArBundles yang akan datang.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install arbundles
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add arbundles
```

  </CodeGroupItem>
</CodeGroup>

## Buat `Signer`

Untuk membuat Data Item, kita perlu membuat `Signer` terlebih dahulu.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* file kunci jwk Arweave Anda */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## Buat `DataItem`

Untuk membuat `DataItem`, kita menyediakan beberapa data bersama dengan `Signer` ke fungsi utilitas `createData()`.

**Catatan:** Meskipun fungsi utilitas `createData()` memerlukan `Signer`, `DataItem` yang dikembalikan **belum ditandatangani** dan berisi ID placeholder.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { createData } from 'arbundles'

// Buat DataItem dari string
const myStringData: string = 'Halo, Permaweb!'
const myDataItem = createData(myStringData, signer)

// Buat DataItem dari Buffer atau Uint8Array
const myBufferData: Buffer | Uint8Array = Buffer.from('Halo, Permaweb!')
const myOtherDataItem = createData(myBufferData, signer)

/* !!!PERINGATAN!!! DATA ITEM BELUM DITANDATANGANI! */
```

  </CodeGroupItem>
</CodeGroup>

## Buat `Bundle`

Untuk membuat Bundle, kita memasukkan `DataItem` kita ke dalam fungsi utilitas `bundleAndSignData` dan menunggu hasilnya.

**Catatan:** `DataItem` yang diberikan kepada fungsi utilitas ini bisa telah ditandatangani sebagaimana dijelaskan dalam bagian selanjutnya.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## Buat `Transaction` dari `Bundle`

Untuk mengirimkan Bundle ke Arweave, akhirnya perlu ada Layer 1 Transaction root yang berisi Bundle.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

// Siapkan klien Arweave
const arweave = new Arweave({
  protocol: 'https',
  host: 'arweave.net',
  port: 443
})

// Buat menggunakan ArweaveJS
const tx = await arweave.createTransaction({ data: bundle.getRaw() }, jwk)

// ATAU Buat dari Bundle itu sendiri
const tx = await bundle.toTransaction({}, arweave, jwk)

// Tandatangani transaksi
await arweave.transactions.sign(tx, jwk)

// Kirim tx ke Arweave dengan metode yang Anda preferensikan!
```

  </CodeGroupItem>
</CodeGroup>

## Tandai `DataItem`

`DataItem` itu sendiri dapat memiliki tag seperti yang dapat dimiliki Transaksi Arweave Layer 1. Setelah Arweave Gateway membuka dan mengindeks Bundle, tag-tag `DataItem` ini dapat diquery dengan cara yang sama dengan tag-tag Transaksi Arweave Layer 1 yang dapat diquery.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const myStringData: string = 'Halo, Permaweb!'
  const tags = [
    { name: 'Title', value: 'Halo Permaweb' },
    { name: 'Content-Type', value: 'text/plain' }
  ]
  const myDataItem = createData(myStringData, signer, { tags })
```

  </CodeGroupItem>
</CodeGroup>

## Mengonsumsi Bundles

**PERINGATAN:** Pastikan bahwa `Buffer` yang Anda berikan kepada `new Bundle(buffer)` berisi sebuah `Bundle`, jika tidak, `Buffer` yang sangat kecil yang diberikan akan mengakibatkan crash pada thread. **JANGAN** menggunakan `new Bundle(buffer)` dalam lingkungan produksi. Sebaliknya, lihat [antarmuka yang dapat di-stream](https://github.com/irys-xyz/arbundles/blob/master/src/stream) di repositori ArBundles.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
