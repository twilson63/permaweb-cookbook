---
locale: id
---

# Mengambil Data Transaksi
Sementara layanan pengindeksan memungkinkan pengajuan permintaan metadata transaksi, mereka tidak memberikan akses ke data transaksi itu sendiri. Hal ini disebabkan karena penyimpanan data transaksi dan pengindeksan metadata memiliki persyaratan sumber daya yang berbeda. Layanan pengindeksan utamanya mengandalkan sumber daya komputasi untuk melakukan kueri pada database, sementara data transaksi lebih cocok untuk ditempatkan di Jaringan Pengiriman Konten (CDN) untuk mengoptimalkan penyimpanan dan bandwidth.

Layanan penyimpanan data transaksi ditawarkan oleh sebagian besar gateway melalui serangkaian endpoint HTTP. Semua klien/paket HTTP dapat digunakan untuk meminta data transaksi dari endpoint-endpoint ini. Sebagai contoh, Axios atau Fetch untuk JavaScript, Guzzle untuk PHP, dll.

Jika Anda ingin melewati layanan penyimpanan data transaksi dan mendapatkan data langsung dari peer/node Arweave, Anda bisa, tetapi itu memerlukan banyak pekerjaan!

Data transaksi disimpan di Arweave sebagai urutan berkelanjutan dari chunk 256KB, dari awal jaringan hingga blok saat ini. Format ini dioptimalkan untuk mendukung mekanisme pertambangan SPoRA yang digunakan oleh penambang untuk membuktikan bahwa mereka menyimpan data Arweave.

::: info
1. Dapatkan daftar peer dari peer yang sudah dikenal.
1. Mintai peer offset chunk yang berisi data transaksi Anda.
1. Mintai peer untuk chunk tersebut.
    1. Jika peer menyediakan chunk tersebut, gabungkan kembali ke dalam format aslinya.
1. (Jika peer tidak memiliki chunk tersebut) jelajahi daftar peer dan mintai chunk.
1. Untuk setiap peer yang Anda kunjungi, periksa daftar peer mereka dan tambahkan peer yang belum ada dalam daftar Anda.
1. Ulangi dari langkah 3 hingga Anda mendapatkan semua chunk.
:::

Ini adalah jumlah pekerjaan yang cukup besar untuk dilakukan setiap kali Anda ingin mengambil data dari jaringan Arweave. Bayangkan jika Anda mencoba menampilkan timeline tweet seperti yang dilakukan [https://public-square.g8way.io](https://public-square.g8way.io). Pengalaman pengguna akan buruk dengan waktu pemuatan yang lama dan tanda putar. Karena data di Arweave bersifat permanen, aman untuk menyimpannya dalam bentuk aslinya untuk membuat pengambilan data transaksi menjadi lebih cepat dan mudah.

Berikut adalah cara mengakses data transaksi yang telah disimpan dalam layanan penyimpanan data transaksi arweave.net.

### Dapatkan data TX yang disimpan

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

Setiap peer/node Arweave juga mengekspos beberapa endpoint HTTP yang seringkali adalah gateway-gateway yang direplikasi. Anda dapat membaca lebih lanjut tentang endpoint-endpoint HTTP peer Arweave di sini.

### Dapatkan transaksi mentah
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
      "id": "FOPrEoqqk184Bnk9KrnQ0MTZFOM1oXb0JZjJqhluv78"
    }
  }
}
```

</details>
<hr/>

### Dapatkan berdasarkan field
`https://arweave.net/tx/TX_ID/FIELD`

Field yang tersedia: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Klik untuk melihat contoh hasil</b></summary>

```json
{
  "ticker":"ANT-PENDING",
  "name":"pending",
  "owner":"NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "controller":"NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "evolve":null,
  "records": {
    "@":"As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
  },
  "balances":{"NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0":1}
}
```
</details>
<hr />

### Dapatkan Saldo Dompet
Saldo yang dikembalikan dalam bentuk Winston. Untuk mendapatkan saldo dalam $AR, bagi saldo dengan 1000000000000
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### Dapatkan status transaksi
`https://arweave.net/tx/TX_ID/status`
::: tip
Endpoint ini hanya mendukung transaksi Arweave asli. Transaksi harus dikonfirmasi sebelum mendapatkan tanggapan yang berhasil.
:::

```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
  console.log(JSON.stringify(result))
```
<details>
<summary><b>Klik untuk melihat contoh hasil</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />



### Dapatkan informasi jaringan

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>Klik untuk melihat contoh hasil</b></summary>

```json
{
    "network": "arweave.N.1",
    "version": 5,
    "release": 53,
    "height": 1106211,
    "current": "bqPU_7t-TdRIxgsja0ftgEMNnlGL6OX621LPJJzYP12w-uB_PN4F7qRYD-DpIuRu",
    "blocks": 1092577,
    "peers": 13922,
    "queue_length": 0,
    "node_state_latency": 0
}

```
</details>
<hr />