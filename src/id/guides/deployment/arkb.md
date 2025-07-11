---
locale: id
---

# arkb

## Prasyarat

Diperlukan sebuah dompet Arweave untuk melakukan penyebaran menggunakan `arkb` guna menutupi biaya transaksi data.

## Instalasi

Untuk menginstal `arkb`, jalankan salah satu dari perintah berikut:
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install -g arkb
```

 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```

  </CodeGroupItem>
</CodeGroup>

## Pengunggahan

Ketika mengunggah direktori berisi berkas-berkas atau aplikasi Permaweb, secara default `arkb` akan melakukan penyebaran masing-masing berkas secara terpisah sebagai transaksi L1, dengan opsi untuk menggabungkan transaksi menggunakan Irys.

## Bangunan Statis

Aplikasi Permaweb dibangun secara statis, artinya kode dan kontennya dibangun sebelumnya dan disimpan di jaringan.

Berikut adalah contoh dari sebuah situs statis. Untuk mengunggah ke Permaweb, direktori `build` akan digunakan sebagai argumen untuk opsi `deploy`.

```js
|- build
    |- index.html
    |- styles.css
    |- index.js
```

#### Pengunggahan Standar

Pengunggahan sebagai transaksi L1 mungkin memerlukan waktu lebih lama untuk dikonfirmasi karena langsung diunggah ke jaringan Arweave.

```console
arkb deploy [folder] --wallet [path ke dompet]
```

<br/>
<img src="https://arweave.net/_itbo7y4H0kDm4mrPViDlc6bt85-0yLU2pO2KoSA0eM" />

#### Penyebaran Tergabung

Untuk melakukan pengunggahan menggunakan Irys, Anda perlu <a href="#fund-irys">membiayai node Irys</a>.

Node Irys 2 memungkinkan transaksi gratis di bawah 100 KB.

Anda dapat menambahkan tag identifikasi khusus ke pengunggahan menggunakan sintaks `nama-tag/nilai-tag`.

```console
arkb deploy [folder] --use-bundler [node irys] --wallet [path ke dompet] --tag-name [nama tag] --tag-value [nilai tag]
```

<br/>
<img src="https://arweave.net/jXP0mQvLiRaUNYWl1clpB1G2hZeO07i5T5Lzxi3Kesk" />

## Perintah Lain

#### Biayai Irys

```console
arkb fund-bundler [jumlah] --use-bundler [node Irys]
```

<sub style="float:right">\* Membiayai sebuah instance Irys dapat memakan waktu hingga 30 menit untuk diproses</sub>

#### Simpan Keyfile

```console
arkb wallet-save [path ke dompet]
```

Setelah menyimpan kunci Anda, Anda sekarang dapat menjalankan perintah tanpa opsi `--wallet-file`, seperti ini:

```console
arkb deploy [path ke direktori]
```

#### Periksa Saldo Dompet

```console
arkb balance
```
