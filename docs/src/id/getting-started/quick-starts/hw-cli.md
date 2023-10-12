---
locale: id
---

# Hello World (CLI)

Panduan ini akan membantu Anda untuk melakukan hal yang paling sederhana, yaitu mengunggah data ke permaweb menggunakan antarmuka baris perintah (CLI).

## Persyaratan

-   [NodeJS](https://nodejs.org) LTS atau yang lebih baru

## Deskripsi

Dengan menggunakan jendela terminal atau konsol, buat folder baru bernama `hw-permaweb-1`.

## Persiapan

```sh
cd hw-permaweb-1
npm init -y
npm install arweave @irys/sdk
```

## Membuat sebuah dompet (wallet)

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Membuat halaman web

```sh
echo "<h1>Halo Permaweb</h1>" > index.html
```

## Mengunggah menggunakan Irys

```sh
irys upload index.html -c arweave -h https://node2.irys.xyz -w ./wallet.json
```
