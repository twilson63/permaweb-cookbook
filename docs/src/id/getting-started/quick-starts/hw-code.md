---
locale: id
---

# Hello World (Code)

Panduan ini akan membimbing Anda untuk dengan cepat mendapatkan halaman web statis HTML, CSS, dan JavaScript ke permaweb menggunakan beberapa baris kode dan antarmuka baris perintah (CLI).

## Persyaratan

-   [NodeJS](https://nodejs.org) LTS atau yang lebih tinggi
-   Pengetahuan dasar tentang HTML, CSS, dan JavaScript
-   Sebuah text editor (seperti VS Code, Sublime, atau sejenisnya)

## Deskripsi

Menggunakan jendela terminal/konsol, buat folder baru bernama `hello-world`.

## Persiapan

```sh
cd hello-world
npm init -y
npm install arweave @irys/sdk
mkdir src && cd src
touch index.js index.html style.css
```

Selanjutnya, buka editor teks Anda dan impor direktori `hello-world`.

## Generate wallet (Dompet)

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Buat halaman web

Halaman web ini menggunakan HTML, CSS, dan JavaScript dasar untuk membuat tombol berdesain yang saat Anda mengkliknya, warna teks judul berubah. Setelah selesai, kita akan menggunakan Irys dan dompet yang sudah dibuat sebelumnya untuk mendeploy halaman web statis dan permanen ke Arweave.

Tempelkan kode dari blok kode berikut ke dalam file mereka:

**index.html**

<details>
<summary>Klik untuk melihat HTML</summary>

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" type="text/css" href="style.css" />
		<script src="index.js"></script>
		<title>Cookbook Hello World!</title>
	</head>

	<body>
		<button onclick="changeColor()" class="button">Click Me!</button>
		<h1 id="main">Hello World!</h1>
	</body>
</html>
```

</details>
<hr />

**style.css**

<details>
<summary>Klik untuk melihat CSS</summary>

```css
.button {
	padding: "10px";
	background-color: #4caf50;
}
```

</details>
<hr />

**index.js**

<details>
<summary>Klik untuk melihat JS</summary>

```javascript
function changeColor() {
	const header = document.getElementById("main");
	header.style.color === "" ? (header.style.color = "red") : (header.style.color = "");
}
```

</details>

<hr />

Sekarang bahwa ada situs statis yang akan dideploy, Anda dapat memeriksanya untuk memastikan semuanya berfungsi dengan benar dengan mengetikkan `open src/index.html` di konsol/terminal Anda. Jika semuanya berfungsi seperti yang diharapkan, saatnya mendeploy ke Arweave!

## Unggah menggunakan Irys

Perintah di bawah ini mendeploy direktori `src` dan menunjukkan file `index.html` sebagai indeks untuk manifest (relatif terhadap path yang diberikan ke flag `upload-dir`).

```sh
irys upload-dir src -h https://node2.irys.xyz --index-file index.html -c arweave -w ./wallet.json
```

## Selamat!!

Anda baru saja mempublikasikan situs statis di Arweave menggunakan beberapa perintah dan beberapa baris kode!
