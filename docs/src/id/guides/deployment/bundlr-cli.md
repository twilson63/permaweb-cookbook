---
locale: id
---

# Bundlr CLI

## Prasyarat
Diperlukan dompet Arweave untuk melakukan penyebaran. Jika ukuran direktori lebih dari 100kb, diperlukan <a href="#fund-bundlr">instance Bundlr yang telah didanai</a>.

## Instalasi

Untuk menginstal Bundlr CLI, jalankan perintah berikut:
<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g @bundlr-network/client
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn global add @bundlr-network/client
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
bundlr upload-dir [path to folder] -w [path to wallet] --index-file [index.html] -c [mata uang] -h [node bundlr]
```

<br/>
<img src="https://arweave.net/XfcrDTZsBn-rNwPuIiftHsLCyYczxgIZeIcr10l1-AM" />

## Perintah Lain

#### Dana Bundlr

```console
bundlr fund [jumlah] -h [node bundlr] -w [path to wallet] -c [mata uang]
```
<sub style="float:right">\* Mendanai instance Bundlr dapat memakan waktu hingga 30 menit untuk diproses</sub>

#### Periksa Saldo Bundlr
```console
bundlr balance [alamat dompet] -h [node bundlr] -c arweave
```