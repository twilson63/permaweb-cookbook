---
locale: id
---

# Mengambil Data Transaksi

Meskipun layanan pengindeksan memungkinkan pengkuerian metadata transaksi, mereka tidak menyediakan akses ke data transaksi itu sendiri. Hal ini karena penyimpanan data transaksi dan pengindeksan metadata memiliki kebutuhan sumber daya yang berbeda. Layanan pengindeksan terutama mengandalkan sumber daya komputasi untuk melakukan kueri pada database sementara data transaksi lebih cocok untuk ditempatkan di Jaringan Pengiriman Konten (CDN) untuk mengoptimalkan penyimpanan dan bandwidth.

Layanan penyimpanan data transaksi ditawarkan oleh sebagian besar gateway melalui serangkaian titik akhir HTTP. Setiap klien/paket HTTP dapat digunakan untuk meminta data transaksi dari titik akhir ini. Contohnya adalah Axios atau Fetch untuk JavaScript, Guzzle untuk PHP, dll.

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

Jika Anda ingin mengabaikan layanan penyimpanan data transaksi dan mendapatkan data langsung dari rekan-rekan/node Arweave, Anda bisa melakukannya, tetapi itu akan memakan banyak waktu!

Data transaksi disimpan di Arweave sebagai urutan berkelanjutan dari potongan-potongan sekuensial berukuran 256KB, dari awal jaringan hingga blok saat ini. Format ini dioptimalkan untuk mendukung mekanisme penambangan SPoRA yang digunakan penambang untuk membuktikan bahwa mereka menyimpan data Arweave.

::: info
1. Ambil daftar rekan dari rekan terkenal.
2. Minta rekan untuk offset potongan yang berisi data transaksi Anda.
3. Minta rekan untuk potongan-potongan itu.
   1. Jika rekan memberikan potongan-potongan tersebut, gabungkan kembali ke format aslinya.
4. (Jika rekan tidak memiliki potongan-potongan) jelajahi daftar rekan untuk meminta potongan-potongan.
5. Untuk setiap rekan yang Anda kunjungi, periksa daftar rekan mereka dan tambahkan rekan yang belum ada dalam daftar Anda.
6. Ulangi dari langkah 3 sampai Anda memiliki semua potongan-potongan.
:::

Ini adalah jumlah pekerjaan yang cukup besar yang harus dilakukan setiap kali Anda ingin mengambil data dari jaringan Arweave. Bayangkan jika Anda mencoba menampilkan timeline tweet seperti [https://public-square.g8way.io](https://public-square.g8way.io) lakukan. Pengalaman pengguna akan buruk dengan waktu muat yang lama dan spinners. Karena data di Arweave permanen, aman untuk di-cache dalam bentuk aslinya untuk membuat pengambilan data transaksi menjadi lebih cepat dan lebih mudah.

Berikut adalah titik akhir HTTP yang digunakan untuk mengakses data transaksi yang di-cache dalam layanan penyimpanan data transaksi arweave.net.

<hr />

### Dapatkan data TX yang sudah di-cache
Metode ini mengambil data transaksi yang terkait dengan ID transaksi yang ditentukan (TX_ID) dari cache.

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>Klik untuk melihat contoh hasil</b></summary>

```json
{
    "data": {
        "ticker": "ANT-PENDING",
        "name": "pending",
        "owner": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
        "controller": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
        "evolve": null,
        "records": {
            "@": "As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
        },
        "balances": {
            "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0": 1
        }
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "cache-control": "public,must-revalidate,max-age=2592000",
        "content-length": "291",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8"
    },
    "request": {}
}

```
</details>
<hr />

### Dapatkan transaksi mentah
Data untuk beberapa [jenis transaksi](manifests.md) mengikuti aturan yang berbeda untuk rendering, titik akhir ini akan mengembalikan data mentah yang belum diubah.
`https://arweave.net/raw/TX_ID`

```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Klik untuk melihat contoh hasil</b></summary>

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": {
      "id": "FOPrEoqqk184Bnk9KrnQ0MTZFOM1oXb0JZjJqhluv

78"
    }
  }
}
```

</details>
<hr/>

Setiap peer/node Arweave juga mengekspos beberapa titik akhir HTTP yang seringkali merupakan gateway yang direplikasi. Anda dapat membaca lebih lanjut tentang titik akhir HTTP dari rekan Arweave [di sini](/references/http-api.md).