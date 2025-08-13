---
locale: id
---

# Minimal Svelte Starter Kit

## Panduan Memulai

Panduan ini akan membimbing Anda langkah demi langkah dalam mengkonfigurasi lingkungan pengembangan Anda untuk membangun dan mendeploy aplikasi Permaweb.

## Persyaratan

-   Mengenal TypeScript
-   NodeJS v18 atau yang lebih tinggi
-   Mengenal Svelte - [https://svelte.dev](https://svelte.dev)
-   Mengenal git dan perintah terminal umum

## Ketergantungan Pengembangan

-   TypeScript
-   esbuild
-   w3
-   yarn `npm i -g yarn`

## Langkah-langkah

### Membuat Proyek

```sh
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

## Membuat buildscript.js

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

// Pastikan direktori sudah ada sebelum berkas dimasukkan ke dalamnya
if (!fs.existsSync("./dist/")) {
	fs.mkdirSync("./dist/");
}
esbuild
	.build({
		entryPoints: [`./src/main.ts`],
		bundle: true,
		outdir: `./dist`,
		mainFields: ["svelte", "browser", "module", "main"],
		// logLevel: `info`,
		splitting: true,
		write: true,
		format: `esm`,
		plugins: [
			esbuildSvelte({
				preprocess: sveltePreprocess(),
			}),
		],
	})
	.catch((error, location) => {
		console.warn(`Errors: `, error, location);
		process.exit(1);
	});

// Gunakan berkas html dasar untuk pengujian
fs.copyFileSync("./index.html", "./dist/index.html");
```

## Modifikasi package.json

Atur `type` menjadi `module`.
Tambahkan skrip build:

```json
{
  "type": "module",
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## Buat direktori `src` dan beberapa berkas src

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

## Main.ts

```ts
import App from "./app.svelte";

new App({
	target: document.body,
});
```

## app.svelte

```html
<script lang="ts">
	import { Route, router } from "tinro";
	import Counter from "./counter.svelte";
	import About from "./about.svelte";

	// tambahkan routing hash untuk dukungan Permaweb
	router.mode.hash();
</script>
<nav><a href="/">Home</a> | <a href="/about">About</a></nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info Routing Hash
Anda akan melihat pengaturan `router.mode.hash()` dalam sesi skrip, ini penting untuk mengonfigurasi aplikasi Anda untuk menggunakan routing berbasis hash, yang akan mengaktifkan dukungan URL saat menjalankan aplikasi pada jalur seperti `https://[gateway]/[TX]`
:::

## counter.svelte

```html
<script lang="ts">
	let count = 0;

	function inc() {
		count += 1;
	}
</script>
<h1>Hello Permaweb</h1>
<button on:click="{inc}">Inc</button>
<p>Count: {count}</p>
```

## about.svelte

```html
<h1>About Page</h1>
<p>Minimal About Page</p>
<a href="/">Home</a>
```

## Mendeploy

### Generate Wallet

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Instalasi Irys

```sh
yarn add -D @irys/sdk
```

### Perbarui package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Jalankan deploy

```sh
yarn deploy
```

::: tip SUKSES
Anda sekarang memiliki Aplikasi Svelte di Permaweb! Hebat!
:::

::: warning Isi Wallet
Jika aplikasi Anda lebih besar dari 120 KB, Anda perlu mengisi wallet Irys Anda. Lihat [https://irys.xyz](https://iryz.xyz) untuk informasi lebih lanjut.
:::

## Repositori

Versi lengkap dari contoh ini tersedia di sini: [https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## Ringkasan

Ini adalah versi minimal dari cara mempublikasikan aplikasi Svelte di Permaweb, tetapi Anda mungkin ingin memiliki lebih banyak fitur, seperti hot-reloading dan tailwind, dll. Lihat `hypar` untuk starter kit yang sudah jadi. [HypAR](https://github.com/twilson63/hypar)
