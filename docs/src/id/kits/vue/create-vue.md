---
locale: id
---

# Create Vue Starter Kit

## Panduan Memulai

Panduan ini akan memberikan instruksi langkah demi langkah untuk mengonfigurasi lingkungan pengembangan Anda dan membangun aplikasi Permaweb berbasis Vue.

## Persyaratan

-   Pengetahuan Dasar tentang TypeScript (Tidak Wajib) - [Pelajari TypeScript](https://www.typescriptlang.org/docs/)
-   NodeJS v16.15.0 atau yang lebih baru - [Unduh NodeJS](https://nodejs.org/en/download/)
-   Pengetahuan tentang Vue.js (lebih baik lagi Vue 3) - [Pelajari Vue.js](https://vuejs.org/)
-   Mengetahui git dan perintah terminal umum

## Dependensi Pengembangan

-   TypeScript (Opsional)
-   Manajer Paket NPM atau Yarn

## Langkah-langkah

### Membuat Proyek

Perintah berikut menginstal dan menjalankan create-vue, alat scaffolding resmi untuk proyek Vue.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm init vue@latest
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn create vue
```

  </CodeGroupItem>
</CodeGroup>

Selama proses ini, Anda akan diminta untuk memilih fitur opsional seperti TypeScript dan dukungan pengujian. Kami sarankan memilih `Vue Router` dengan yes, yang lain bisa dipilih sesuai preferensi Anda.

```console:no-line-numbers
✔ Project name: … <nama-projectmu>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / *Yes*
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

### Pindah ke Direktori Proyek

```sh
cd <nama-proyek-anda>
```

### Menginstal Dependensi

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn
```

  </CodeGroupItem>
</CodeGroup>

### Konfigurasi Router

Vue Router adalah router resmi untuk Vue.js dan berintegrasi dengan Vue secara mulus. Untuk membuatnya berfungsi dengan Permaweb, ubah dari router dengan riwayat browser menjadi router hash karena URL tidak dapat dikirim ke server. Ganti `createWebHistory` menjadi `createWebHashHistory` di file `src/router/index.ts` atau `src/router/index.js` Anda.

```ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
	],
});

export default router;
```

### Konfigurasi Build

Konfigurasi proses build ada dalam file `vite.config.ts` atau `vite.config.js`. Untuk melayani aplikasi Permaweb dari sub-patokan (https://[gateway]/[TX_ID]), perbarui properti base menjadi ./ dalam file konfigurasi.

```ts
export default defineConfig({
  base: './',
  ...
})
```

### Menjalankan Aplikasi

Sebelum melanjutkan, penting untuk memverifikasi bahwa semuanya berfungsi dengan baik. Jalankan pemeriksaan untuk memastikan kemajuan yang lancar.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn dev
```

  </CodeGroupItem>
</CodeGroup>
ini akan memulai server pengembangan baru secara lokal di mesin Anda, secara default menggunakan `PORT 5173`. Jika PORT ini sudah digunakan, maka akan mencoba menggunakan PORT lain dengan menambah 1 (`PORT 5174`) dan mencoba lagi.

## Deploy

### Menghasilkan Wallet

Paket `arweave` diperlukan untuk menghasilkan wallet.

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

Untuk menghasilkan wallet Anda, jalankan perintah berikut di terminal:

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Menginstal Irys

Irys diperlukan untuk mendeploy aplikasi Anda ke Permaweb, karena ini menawarkan pengunggahan dan pengambilan data instan.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save-dev @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add -D @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

::: info Arweave Wallet
Untuk mengunggah aplikasi ini, Anda mungkin perlu menambahkan AR dan mengisi wallet Irys Anda. Kunjungi [https://irys.xyz](https://iryz.xyz) dan https://www.arweave.org/](https://www.arweave.org/) untuk informasi lebih lanjut.
:::

### Memperbarui package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Memperbarui .gitignore

Untuk melindungi dana Anda, penting untuk menjaga agar file wallet tetap pribadi. Mengunggahnya ke GitHub, di mana itu dapat menjadi publik, bisa berakibat dana Anda bocor. Untuk mencegah hal ini, tambahkan file `wallet.json` ke dalam file `.gitignore` Anda. Dan jangan lupa menyimpannya di tempat yang aman.

```sh
echo "wallet.json" >> .gitignore
```

### Menjalankan build

Sekarang saatnya untuk menghasilkan build.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm run build
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn build
```

  </CodeGroupItem>
</CodeGroup>

### Menjalankan deploy

Akhirnya, kita siap untuk mendeploy Aplikasi Permaweb pertama kita

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm run deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn deploy
```

  </CodeGroupItem>
</CodeGroup>

::: tip SUKSES
Sekarang Anda seharusnya memiliki Aplikasi Vue di Permaweb! Selamat!
:::

::: warning Dana Wallet
Jika aplikasi Anda lebih dari 120 kb atau Anda menerima pesan kesalahan `Not enough funds to send data`, Anda perlu mengisi wallet Irys Anda. Lihat [https://irys.xyz](https://irys.xyz) untuk informasi lebih lanjut.
:::

## Repositori

Contoh yang sepenuhnya fungsional dalam JavaScript atau TypeScript dapat ditemukan di lokasi ini.

-   Repositori: [https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## Ringkasan

Panduan ini memberikan metode langkah demi langkah yang sederhana untuk mempublikasikan aplikasi Vue.js di Permaweb menggunakan Create Vue. Jika Anda membutuhkan fitur tambahan seperti Tailwind, pertimbangkan untuk menjelajahi starter kit alternatif yang terdaftar dalam panduan untuk menemukan solusi yang sesuai dengan kebutuhan Anda.
