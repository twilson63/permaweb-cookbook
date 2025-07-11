---
locale: id
---

# Vite Starter Kit

## Panduan Memulai

Panduan ini akan membimbing Anda langkah demi langkah untuk mengonfigurasi lingkungan pengembangan Anda agar dapat membangun dan mendeploy aplikasi React di permaweb.

## Persyaratan

-   Pengetahuan Dasar TypeScript (Tidak Wajib) - [Pelajari TypeScript](https://www.typescriptlang.org/docs/)
-   NodeJS v16.15.0 atau lebih baru - [Unduh NodeJS](https://nodejs.org/en/download/)
-   Pengetahuan tentang ReactJS - [Pelajari ReactJS](https://reactjs.org/)
-   Mengetahui git dan perintah terminal umum

## Dependensi Pengembangan

-   TypeScript
-   NPM atau Yarn Package Manager

## Langkah-langkah

### Buat Proyek

Jika Anda tidak familiar dengan TypeScript, Anda dapat menggunakan template "react" (`--template react`)

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm create vite@latest my-arweave-app -- --template react-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create vite my-arweave-app --template react-ts
```

  </CodeGroupItem>
</CodeGroup>

### Pindah ke Direktori Proyek

```sh
cd my-arweave-app
```

### Instalasi react-router-dom

Anda harus menginstal paket ini untuk mengelola routing antara halaman yang berbeda.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install react-router-dom --save
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add react-router-dom -D
```

  </CodeGroupItem>
</CodeGroup>

### Menjalankan Aplikasi

Sekarang kita perlu memeriksa apakah semuanya berjalan dengan sempurna sebelum melangkah ke langkah berikutnya, jalankan
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
Ini akan memulai server pengembangan baru secara lokal di mesin Anda. Secara default, ia menggunakan `PORT 3000`, jika PORT ini sudah digunakan,
mungkin akan meminta Anda untuk beralih ke PORT lain yang tersedia di Terminal.

### Pengaturan tipe wallet

Jika Anda ingin menggunakan [ArConnect](https://arconnect.io), [Arweave.app](https://arweave.app), atau dompet berbasis browser lainnya, Anda dapat menginstal paket tipe ArConnect untuk mendapatkan deklarasi untuk `window.arweaveWallet`.
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arconnect -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arconnect -D
```

  </CodeGroupItem>
</CodeGroup>

Setelah menginstal paket, Anda perlu menambahkannya ke file `src/vite-env.d.ts` Anda.

```ts
/// <reference types="arconnect" />
```

### Pengaturan Routing

Sekarang, modifikasi aplikasinya dan tambahkan rute baru seperti halaman "about", pertama-tama buat 2 file .tsx lagi. (jika Anda menggunakan template React JS biasa, pastikan ekstensi file komponen Anda adalah `.jsx atau .js`)

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

#### HomePage.tsx

```ts
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			Selamat datang di Permaweb!
			<Link to={"/about/"}>
				<div>Tentang</div>
			</Link>
		</div>
	);
}

export default HomePage;
```

#### About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
	return (
		<div>
			Selamat datang di halaman About!
			<Link to={"/"}>
				<div>Beranda</div>
			</Link>
		</div>
	);
}

export default About;
```

#### Modifikasi App.tsx

Kita perlu memperbarui App.tsx untuk mengelola halaman yang berbeda

```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

::: info Routing Hash
Perhatikan bahwa kita membungkus rute dalam HashRouter dan menggunakan komponen Link react-router-dom untuk membangun tautan.
Ini penting di permaweb dalam kondisinya saat ini, ini akan memastikan rute berfungsi dengan baik karena aplikasi disajikan di jalur seperti `https://[gateway]/[TX]`
:::

## Deploy Secara Permanen

### Membuat Wallet

Kita membutuhkan paket `arweave` untuk membuat wallet

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

lalu jalankan perintah berikut di terminal

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Pengaturan Irys

Kita memerlukan Irys untuk mendeploy aplikasi kita ke Permaweb karena ini menyediakan pengunggahan dan pengambilan data instan

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

::: info
Anda perlu menambahkan AR ke wallet ini dan mendanai wallet Irys Anda agar dapat mengunggah aplikasi ini. Lihat [https://irys.xyz](https://irys.xyz) dan [https://www.arweave.org/](https://www.arweave.org/) untuk informasi lebih lanjut.
:::

### Perbarui package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir ./dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### Jalankan build

Sekarang saatnya untuk menghasilkan build

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

### Jalankan deploy

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

::: tip BERHASIL
Sekarang Anda seharusnya memiliki Aplikasi React di Permaweb! Kerja bagus!
:::

::: warning error
Jika Anda menerima kesalahan ini `Not enough funds to send data`, Anda harus mendanai beberapa AR ke wallet Anda, dan kemudian mencoba mendeploynya lagi.
:::
