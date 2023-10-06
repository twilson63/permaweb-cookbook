---
locale: id
---

# Svelte/Vite Starter Kit

## Panduan Memulai

Svelte adalah kerangka kerja yang dikompilasi tanpa ada dalam distribusi aplikasi, yang menghasilkan paket-paket kecil, yang sangat cocok untuk Permaweb. Sebagai pengembang, kami menghargai Pengalaman Pengembangan (Dev Experience) sebanyak kami menghargai Pengalaman Pengguna (User Experience). Kit ini menggunakan sistem bundel `vite` untuk memberikan pengalaman DX yang luar biasa bagi pengembang.

## Instalasi vite dengan svelte dan typescript

<CodeGroup>
  <CodeGroupItem title="NPM v6">

```console
npm create vite@latest my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM v7">

```console
npm create vite@latest my-perma-app -- --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="PNPM">

```console
pnpm create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
</CodeGroup>

## Informasi Proyek

Sistem pembuatan vite menempatkan file index.html Anda di direktori root, inilah tempat Anda akan menyertakan dependensi css atau skrip global jika diperlukan. Untuk informasi lebih lanjut tentang tata letak proyek vite, lihat [dokumentasi vite](https://vitejs.dev/guide/#index-html-and-project-root)

## Setup hash-router

Untuk mengatur hash-router, kami akan menggunakan [tinro](https://github.com/AlexxNB/tinro). `tinro` adalah perpustakaan routing deklaratif kecil, yang mirip dengan React Router.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install --save-dev tinro
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add -D tinro
```

  </CodeGroupItem>
</CodeGroup>

## Memberi tahu Svelte untuk menggunakan hash routing

Di file `src/App.svelte`, Anda ingin mengkonfigurasi router untuk menggunakan mode routing hash.

```html
<script lang="ts">
	import { Route, router } from "tinro";
	router.mode.hash();
	router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

Fungsi `router.mode.hash` mengaktifkan mode router hash.
Callback `router.subscribe` berguna untuk mengatur ulang halaman ke bagian atas saat pemindahan halaman

## Menambahkan beberapa komponen transisi

Komponen ini akan mengelola transisi antara satu halaman ke halaman lain saat routing.

Buat direktori di bawah direktori `src` bernama components dan tambahkan dua file berikut:

announcer.svelte

```html
<script>
	import { router } from "tinro";
	$: current = $router.path === "/" ? "Home" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">{#key current} Navigated to {current} {/key}</div>

<style>
	div {
		position: absolute;
		left: 0;
		top: 0;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		overflow: hidden;
		white-space: nowrap;
		width: 1px;
		height: 1px;
	}
</style>
```

> Komponen ini digunakan untuk membacakan perubahan halaman kepada pembaca layar.

transition.svelte

```html
<script>
  import { router } from "tinro";
  import { fade } from "svelte/transition";
</script>

{#key $router.path}
  <div in:fade={{ duration: 700 }}>
    <slot />
  </div>
{/key}
```

> Komponen ini menambahkan efek fade ke transisi halaman.

## Menambahkan Rute ke aplikasi

```html
<script lang="ts">
	...
	import Announcer from "./components/announcer.svelte";
	import Transition from "./components/transition.svelte";
	...
</script>
<Announcer />
<Transition>
	<Route path="/">
		<Home />
	</Route>
	<Route path="/about">
		<About />
	</Route>
</Transition>
```

Menambahkan komponen Announcer dan Transition ke sistem routing kita akan menangani pengumuman transisi halaman serta animasi transisi.

## Membuat beberapa halaman

### home.svelte

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
<a href="/about">About</a>
```

### about.svelte

```html
<h1>About Page</h1>
<p>Svelte/Vite About Page</p>
<a href="/">Home</a>
```

### Ubah `App.svelte`

```html
<script lang="ts">
	...
	import Home from './home.svelte'
	import About from './about.svelte'
</script>
...
```

## Mendeploy ke Permaweb

### Generate Wallet

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Instalasi Irys

```sh
yarn add -D @irys/sdk
```

### Update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Jalankan deploy

```sh
yarn deploy
```

::: tip SUKSES
Anda sekarang memiliki Aplikasi Svelte di Permaweb! Selamat!
:::

::: warning Isi Wallet
Jika aplikasi Anda lebih dari 120 KB, Anda harus mengisi wallet Irys Anda. Lihat [https://irys.xyz](https://irys.xyz) untuk informasi lebih lanjut.
:::

## Repositori

Versi lengkap dari contoh ini tersedia di sini: [https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## Ringkasan

Ini adalah versi minimal dari cara mempublikasikan aplikasi Svelte di Permaweb, tetapi Anda mungkin ingin

memiliki lebih banyak fitur, seperti hot-reloading dan tailwind, dll. Lihat `hypar` untuk starter kit yang sudah jadi. [HypAR](https://github.com/twilson63/hypar)
