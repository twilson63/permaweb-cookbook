---
locale: es
---

# API HTTP de pares de Arweave

Para obtener una referencia más completa de las API HTTP de pares de Arweave, consulta la [guía vinculada](https://docs.arweave.org/developers/server/http-api).

Los puntos finales presentes aquí se incluyen por conveniencia y/o porque se omitieron en la [guía vinculada](https://docs.arweave.org/developers/server/http-api).

::: info
Los servicios de puerta de enlace de Permaweb están típicamente respaldados por uno o más nodos completos de Arweave. Como resultado, a menudo expondrán los puntos finales del nodo bajo la ruta `/tx/` y enrutarán la solicitud directamente a un nodo de Arweave. Esto significa que estos métodos a menudo se pueden llamar tanto en una puerta de enlace como directamente en un peer/nodo de Arweave.
:::

<hr />

### Obtener por campo

Recupera los campos de encabezado asociados con una transacción directamente de un nodo de Arweave. También se puede utilizar para recuperar los datos de la transacción, si el nodo
almacena las partes.

`https://arweave.net/tx/TX_ID/FIELD`

Campos disponibles: id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>Clic para ver el ejemplo del resultado</b></summary>

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

### Obtener saldo de la billetera

El saldo devuelto está en Winston. Para obtener el saldo en $AR, divide el saldo entre 1000000000000
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

### Obtener estado de la transacción

`https://arweave.net/tx/TX_ID/status`
::: tip
Este punto final solo admite transacciones base de Arweave, no transacciones agrupadas. Las transacciones deben ser confirmadas en la cadena antes de que su estado esté disponible.
:::

```js
const result = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>Clic para ver el ejemplo del resultado</b></summary>

```json
{
  "block_height": 1095552,
  "block_indep_hash": "hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3",
  "number_of_confirmations": 10669
}
```

</details>
<hr />

### Obtener información de la red

```js
const res = await axios.get("https://arweave.net/info");
console.log(res.data);
```

<details>
<summary><b>Clic para ver el ejemplo del resultado</b></summary>

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
