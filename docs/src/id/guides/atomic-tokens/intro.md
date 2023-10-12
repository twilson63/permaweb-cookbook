---
locale: id
---

# Atomic Tokens

## Apa itu Token Atomic?

[Kenali konsepnya](../../concepts/atomic-tokens.md)

## Membuat Token Atomic

::: info INFORMASI
Untuk contoh ini, kami menggunakan Sumber Kontrak SWT yang sudah dipublikasikan di jaringan. [x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) -
:::

example.ts

```ts
import Irys from '@irys/sdk'
import { WarpFactory } from 'warp-contracts'

async function main() {
  const wallet = JSON.parse(await import('fs')
    .then(fs => fs.readFileSync('./wallet.json', 'utf-8')))

  const irys = new Irys({ 'https://node2.irys.xyz', 'arweave', wallet })
  const warp = WarpFactory.forMainnet()

  const data = `<h1>Halo Permaweb!</h1>`
  const tags = [
    { name: 'Content-Type', value: 'text/html' },
    // Tag ANS-110
    { name: 'Type', value: 'web-page' },
    { name: 'Title', value: 'Halaman permaweb pertama saya' },
    { name: 'Description', value: 'Halaman permaweb pertama oleh Anon' },
    { name: 'Topic:Noob', value: 'Noob' },
    // Kontrak SmartWeave
    { name: 'App-Name', value: 'SmartWeaveContract' },
    { name: 'App-Version', value: '0.3.0' },
    { name: 'Contract-Src', value: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs' },
    {
      name: 'Init-State', value: JSON.stringify({
        balances: {
          'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc': 1000000
        },
        name: 'AtomicToken',
        ticker: 'ATOMIC-TOKEN',
        pairs: [],
        creator: 'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc',
        settings: [['isTradeable', true]]
      })
    }
  ]

  const { id } = await irys.upload(data, { tags })
  await warp.createContract.register(id, 'node2')
  console.log('Token Atomic: ', id)
}

main()
```

Dalam contoh ini, kami membuat item data dan mengunggahnya ke layanan jaringan bundler. Kemudian kami mendaftarkan kontrak kami dengan sekuen Warp. Dengan menggunakan bundler untuk memublikasikan item data kami dan mendaftar dengan sekuen Warp, data kami segera tersedia di layanan gateway dan kontrak kami segera dapat menerima interaksi.

Jalankan Contoh

```sh
npm install @irys/sdk warp-contracts
npm install typescript ts-node
npx ts-node example.ts
```

::: info INFORMASI
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) adalah Spesifikasi Penemuan Aset untuk memungkinkan komposabilitas dengan ekosistem Aplikasi Permaweb.
:::

## Ringkasan

Ini adalah contoh sederhana tentang cara mendeploy Aset Atomic. Untuk contoh yang lebih detail, lihat di sini: [https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)

## Bekerja dengan Token

Kontrak SmartWeave tidak dapat menyimpan AR, koin asli dari Jaringan Arweave. AR digunakan untuk membeli penyimpanan data di Jaringan Arweave, dan dapat ditransfer dari dompet sumber ke dompet target di jaringan Arweave, tetapi tidak dapat disimpan di kontrak SmartWeave.
