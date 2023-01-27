# Arweave HTTP API

## Fetching Data
The Arweave protocol is based on HTTP. This allows developers to leverage the API to retrieve data from transactions, wallets, the network itself, and more.

Any existing HTTP clients/libraries can be used to interface with the network, for example Axios or Fetch for JavaScript, Guzzle for PHP, etc. Requests and queries can be sent to any Arweave node directly using their IP address, for example `http://159.65.213.43:1984/info`

### Get cached TX data

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>Click to view example result</b></summary>

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

::: tip
This endpoint only supports native Arweave transactions. Transactions must be confirmed before getting a successful response.
:::

### Get raw transaction
`https://arweave.net/raw/TX_ID`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Click to view example result</b></summary>

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

### Get by field
`https://arweave.net/tx/TX_ID/FIELD`

Available fields: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Click to view example result</b></summary>

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

### Get Wallet Balance
The returned balance is in Winston. To get balance in $AR, divide the balance by 1000000000000
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### Get transaction status
`https://arweave.net/tx/TX_ID/status`
```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Click to view example result</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />

### Get network information

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>Click to view example result</b></summary>

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


