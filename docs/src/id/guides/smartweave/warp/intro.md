---
locale: id
---

# Pengantar SDK Warp (SmartWeave)

Warp adalah SDK Populer untuk Protokol SmartWeave. Dengan Warp dan Irys, penyebaran dan interaksi SmartWeave Anda dapat sangat cepat.

## Pengenalan

Panduan ini adalah pengantar singkat ke SDK Warp dan beberapa metode API-nya. Jika Anda ingin mempelajari lebih lanjut tentang Kontrak SmartWeave secara umum, kunjungi [Konsep Inti: SmartWeave](/concepts/smartweave.html).

::: tip
Anda dapat menemukan SDK Warp di [github](https://github.com/warp-contracts). Untuk pemahaman lebih mendalam tentang Warp SmartWeave, kunjungi [Situs Web Warp](https://warp.cc).
:::

Untuk menggunakan SDK di server, Anda akan memerlukan akses ke file wallet.json. Untuk menggunakan SDK di browser, Anda perlu terhubung ke dompet yang didukung oleh arweave.

## Instalasi

Untuk menginstal Warp dalam proyek Anda, Anda dapat menggunakan `npm` atau `yarn` atau klien npm lainnya.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install warp-contracts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add warp-contracts
```

  </CodeGroupItem>
</CodeGroup>

## Impor

Ketika menggunakan Warp dengan proyek Anda, ada beberapa cara untuk mengimpor SDK tergantung pada pengaturan proyek Anda.

<CodeGroup>
  <CodeGroupItem title="Typescript">

```ts
import { WarpFactory } from "warp-contracts";
```

  </CodeGroupItem>
  <CodeGroupItem title="ESM">

```js
import { WarpFactory } from "warp-contracts/mjs";
```

  </CodeGroupItem>
  <CodeGroupItem title="CommonJS">

```js
const { WarpFactory } = require("warp-contracts");
```

  </CodeGroupItem>
</CodeGroup>

## Menghubungkan ke Lingkungan

Ada beberapa lingkungan yang mungkin ingin Anda interaksikan, Anda dapat terhubung ke lingkungan tersebut menggunakan helper `forXXXX`.

<CodeGroup>
  <CodeGroupItem title="Mainnet">

```ts
const warp = WarpFactory.forMainnet();
```

  </CodeGroupItem>
  <CodeGroupItem title="Testnet">

```js
const warp = WarpFactory.forTestnet();
```

  </CodeGroupItem>
  <CodeGroupItem title="Local">

```js
const warp = WarpFactory.forLocal();
```

  </CodeGroupItem>
  <CodeGroupItem title="Custom">

```js
const warp = WarpFactory.custom(
	arweave, // arweave-js
	cacheOptions, // { ...defaultCacheOptions, inMemory: true}
	environment, // 'local', 'testnet', 'mainnet'
);
```

  </CodeGroupItem>
</CodeGroup>

::: warning
Ketika menggunakan lingkungan lokal, Anda akan perlu menjalankan arLocal di port 1984.
:::

## Ringkasan

Panduan pengantar ini bertujuan membantu Anda mengatur Warp. Panduan-panduan berikutnya akan menunjukkan cara mendeploy Kontrak SmartWeave menggunakan SDK Warp, bagaimana berinteraksi dengan kontrak-kontrak tersebut, dan akhirnya, bagaimana mengembangkan Kontrak SmartWeave.
