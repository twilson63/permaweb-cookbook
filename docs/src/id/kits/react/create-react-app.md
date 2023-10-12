---
locale: id
---

# Create React App Starter Kit

## Panduan Memulai

Panduan ini akan membimbing Anda melalui langkah demi langkah untuk mengonfigurasi lingkungan pengembangan Anda agar dapat membangun dan mendeploy aplikasi permaweb menggunakan React.

## Prasyarat

-   Pengetahuan Dasar Typescript (Tidak Wajib) - [Pelajari Typescript](https://www.typescriptlang.org/docs/)
-   NodeJS v16.15.0 atau lebih baru - [Unduh NodeJS](https://nodejs.org/en/download/)
-   Pengetahuan tentang ReactJS - [Pelajari ReactJS](https://reactjs.org/)
-   Mengenal git dan perintah terminal umum

## Dependensi Pengembangan

-   TypeScript
-   Manajer Paket NPM atau Yarn

## Langkah-Langkah

### Membuat Proyek

Jika Anda tidak terbiasa dengan TypeScript, Anda dapat mengabaikan pemeriksaan ekstra `--template typescript`.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npx create-react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
</CodeGroup>

### Pindah ke Direktori Proyek

```sh
cd permaweb-create-react-app
```

### Pasang react-router-dom

Anda harus menginstal paket ini untuk mengelola routing antara halaman-halaman yang berbeda.

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

### Jalankan Aplikasi

Sekarang kita perlu memeriksa apakah semuanya berfungsi sebelum melanjutkan ke langkah berikutnya, jalankan
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm start
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn start
```

  </CodeGroupItem>
</CodeGroup>
Ini akan memulai server pengembangan baru secara lokal di mesin Anda. Secara default, ini menggunakan `PORT 3000`, jika PORT ini sudah digunakan,
mungkin Anda akan diminta untuk beralih ke PORT lain yang tersedia di Terminal

### Modifikasi package.json untuk mengandung konfigurasi berikut

```json
{
  ...
  "homepage": ".",
}
```

### Menyiapkan Routing

Sekarang, modifikasi aplikasi dan tambahkan rute baru seperti halaman "about", pertama-tama buat 2 file .tsx lagi. (jika Anda telah mengabaikan pemeriksaan tambahan `--template typescript`, maka ekstensi file komponen Anda harus `.jsx` atau `.js`)

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

Kita perlu memperbarui App.tsx untuk mengelola halaman-halaman yang berbeda

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

::: info Routing dengan Hash
Perhatikan bahwa kita membungkus rute dalam HashRouter dan menggunakan komponen Link dari react-router-dom untuk membuat tautan.
Ini penting pada permaweb dalam kondisinya saat ini, ini akan memastikan bahwa rute-rute berfungsi dengan baik karena aplikasi disajikan pada path seperti `https://[gateway]/[TX]`
:::

## Mendeploy Secara Permanen

### Membuat Dompet

Kita memerlukan paket `arweave` untuk membuat dompet

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

lalu jalankan perintah ini di terminal

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Menyiapkan Irys

Kita memerlukan Irys untuk mendeploy aplikasi kita ke Permaweb karena Irys menyediakan pengunggahan dan pengambilan data instan.

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
Anda harus menambahkan AR ke dompet ini dan mendanai dompet Irys Anda agar dapat mengunggah aplikasi ini. Lihat [https://irys.xyz](https://irys.xyz) dan [https://www.arweave.org/](https://www.arweave.org/) untuk informasi lebih lanjut.
:::

### Memperbarui package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir ./build -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### Menjalankan build

Sekarang saatnya untuk menghasilkan build, jalankan

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

Akhirnya, kita siap untuk mendeploy aplikasi Permaweb pertama kita

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
Sekarang Anda harus memiliki Aplikasi React di Permaweb! Kerja Bagus!
:::

::: info ERROR
Jika Anda menerima kesalahan ini `Not enough funds to send data`, Anda harus mendanai beberapa AR ke dompet Irys Anda, dan kemudian coba mendeploynya lagi, jalankan
:::

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
irys fund 1479016 -h https://node1.irys.xyz -w wallet.json -c arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
iryz fund 1479016 -h https://node1.iryz.xyz -w wallet.json -c arweave
```

  </CodeGroupItem>
</CodeGroup>

::: info
Nomor 1479016 di atas adalah jumlah AR yang dinyatakan dalam winston, unit terkecil dari AR. Ini akan memakan waktu untuk menyebar ke dompet Irys Anda. Kembali dalam 10-20 menit dan coba jalankan lagi proses deployment.
:::

## Repositori

Versi lengkap dari contoh ini tersedia di sini: [https://github.com/VinceJuliano/permaweb-create-react-app](https://github.com/VinceJuliano/permaweb-create-react-app)

## Ringkasan

Ini adalah versi Create React App dari cara mempublikasikan aplikasi React di permaweb. Anda mungkin menemukan cara baru untuk mendeploy aplikasi di permaweb atau memeriksa starter kit lain dalam panduan ini!
