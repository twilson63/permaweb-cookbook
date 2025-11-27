# Arweave 對等節點 HTTP API

如需更完整的 Arweave 對等節點 HTTP API 參考，請參閱 [相關指南](https://docs.arweave.org/developers/server/http-api)。

此處列出的端點是為了方便起見提供的，或是因為它們在 [相關指南](https://docs.arweave.org/developers/server/http-api) 中被遺漏。

::: info
Permaweb 閘道服務通常由一個或多個完整的 Arweave 節點支援。因此它們常會在 `/tx/` 路徑下暴露節點端點，並將請求直接路由至 Arweave 節點。這表示這些方法通常可以在閘道上呼叫，也可以直接在 Arweave 對等節點/節點上呼叫。
:::

<hr />

### 依欄位取得

直接從 Arweave 節點檢索與交易相關的標頭欄位。如果節點有儲存該交易的 chunk，且資料足夠小以供節點回傳，也可用來檢索交易資料。

`https://arweave.net/tx/TX_ID/FIELD`

可用欄位： id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
);
// fields are returned in base64url format, so we need to decode
const base64url = await result.text();
const jsonData = JSON.parse(Arweave.utils.b64UrlToString(base64url));
console.log(jsonData);
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "ticker": "ANT-PENDING",
  "name": "pending",
  "owner": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "controller": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "evolve": null,
  "records": {
    "@": "As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
  },
  "balances": { "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0": 1 }
}
```

</details>
<hr />

### 取得錢包餘額

回傳的餘額以 Winston 為單位。要取得 $AR 的餘額，請將餘額除以 1000000000000
`https://arweave.net/wallet/ADDRESS/balance`

```js
const res = await axios.get(
  `https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`
);
console.log(res);
console.log(res.data / 1000000000000);

6638463438702; // Winston
6.638463438702; // $AR
```

<hr />

### 取得交易狀態

`https://arweave.net/tx/TX_ID/status`
::: tip
此端點僅支援基本的 Arweave 交易（base transactions），不支援捆綁交易（bundled transactions）。交易必須在鏈上被確認，狀態才會可用。
:::

```js
const response = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
);
const result = await response.json();
console.log(JSON.stringify(result));
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

```json
{
  "block_height": 1095552,
  "block_indep_hash": "hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3",
  "number_of_confirmations": 10669
}
```

</details>
<hr />

### 取得網路資訊

```js
const res = await axios.get("https://arweave.net/info");
console.log(res.data);
```

<details>
<summary><b>點擊以檢視範例結果</b></summary>

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
