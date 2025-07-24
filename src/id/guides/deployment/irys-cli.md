---
locale: id
---

# Irys CLI (Previously Bundlr)

## Prasyarat

Diperlukan dompet Arweave untuk melakukan penyebaran. Jika ukuran direktori lebih dari 100kb, diperlukan <a href="#fund-irys">instance Irys yang telah didanai</a>.

## Instalasi

Untuk menginstal Irys CLI, jalankan perintah berikut:
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @irys/sdk
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

## Pembangunan Statis

Aplikasi Permaweb dibangun secara statis, artinya kode dan kontennya dibangun sebelumnya dan disimpan di jaringan.

Di bawah ini adalah contoh situs statis. Untuk mendistribusikannya ke Permaweb, direktori `build` akan digunakan sebagai argumen untuk flag `upload-dir`.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

## Penyebaran

```console
irys upload-dir [path to folder] -w [path to wallet] --index-file [index.html] -c [mata uang] -h [node Irys]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Perintah Lain

#### Dana Irys

```console
irys fund [jumlah] -h [node Irys] -w [path to wallet] -c [mata uang]
```

<sub style="float:right">\* Mendanai instance Irys dapat memakan waktu hingga 30 menit untuk diproses</sub>

#### Periksa Saldo Irys

```console
irys balance [alamat dompet] -h [node Irys] -c arweave
```
