---
locale: id
---

# Arweave peer HTTP API
Di bawah ini adalah informasi lebih lanjut tentang beberapa endpoint Arweave peer HTTP API yang tidak ada di [panduan terkait](https://docs.arweave.org/developers/server/http-api).

::: info
Layanan gateway Permaweb biasanya didukung oleh satu atau lebih node Arweave penuh. Oleh karena itu, seringkali mereka akan mengekspos endpoint node di bawah path `/tx/` dan melewatkan permintaan langsung ke node Arweave. Ini berarti metode-metode ini seringkali dapat dipanggil pada gateway serta langsung pada node Arweave/peer.
:::

<hr />

### Dapatkan berdasarkan field
Mengambil field-header yang terkait dengan suatu transaksi langsung dari node Arweave. Dapat digunakan untuk mengambil data transaksi juga, jika node menyimpan chunks, dan data tersebut cukup kecil sehingga node dapat melayaninya.

`https://arweave.net/tx/TX_ID/FIELD`

Field yang tersedia: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
// field akan dikembalikan dalam format base64url, jadi kita perlu mendecode
const base64url = await result.text()
const jsonData = JSON.parse( Arweave.utils.b64UrlToString(base64url) )
console.log(jsonData)
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
Saldo yang dikembalikan adalah dalam Winston. Untuk mendapatkan saldo dalam $AR, bagi saldo tersebut dengan 1000000000000.
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```
<hr />

### Dapatkan status transaksi
`https://arweave.net/tx/TX_ID/status`
::: tip
Endpoint ini hanya mendukung transaksi dasar Arweave dan tidak mendukung transaksi yang di-bundle. Transaksi harus dikonfirmasi di blockchain sebelum statusnya akan tersedia.
:::

```js
  const response = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status')
  const result = await response.json()
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


