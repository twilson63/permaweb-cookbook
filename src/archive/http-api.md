
# Arweave peer HTTP API
For a more complete reference of the Arweave peer HTTP APIs see the [linked guide](https://docs.arweave.org/developers/server/http-api).

The endpoints present here are for done so for convenance and/or because they were omitted from the [linked guide](https://docs.arweave.org/developers/server/http-api).

::: info
Permaweb gateway services are typically backed by one or more full Arweave nodes. As a result they will often expose the node endpoints under the `/tx/` path and routing the request directly to an Arweave node. This means these methods can often be called on a gateway as well as directly on an arweave peer/node.
:::

<hr />

### Get by field
Retrieves the header fields associated with a transaction directly from an Arweave node. Can be used to retrieve the transaction data as well, if the node 
stores the chunks, and the data is small enough for the node to serve.

`https://arweave.net/tx/TX_ID/FIELD`

Available fields: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
// fields are returned in base64url format, so we need to decode
const base64url = await result.text()
const jsonData = JSON.parse( Arweave.utils.b64UrlToString(base64url) )
console.log(jsonData)
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
<hr />

### Get transaction status
`https://arweave.net/tx/TX_ID/status`
::: tip
This endpoint only supports base Arweave transactions not bundled transactions. Transactions must be confirmed on-chain before their status will be available.
:::

```js
  const response = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status')
  const result = await response.json()
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


