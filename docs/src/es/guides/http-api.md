---
locale: es
---
# Obteniendo Datos de Transacciones 
Aunque los servicios de indexación permiten consultar metadatos de transacciones, no proporcionan acceso a los propios datos de transacciones. Esto se debe a que la caché de datos de transacciones e indexar metadatos tienen diferentes requisitos de recursos. Los servicios de indexación dependen principalmente de los recursos informáticos para realizar consultas en una base de datos, mientras que los datos de transacciones son más adecuados para implementarse en una red de entrega de contenido (CDN) para optimizar el almacenamiento y el ancho de banda.

La mayoría de los gateways ofrecen un servicio de caché de datos de transacción a través de un conjunto de puntos finales HTTP. Cualquier cliente / paquete HTTP se puede usar para solicitar datos de transacción desde estos puntos finales. Por ejemplo, Axios o Fetch para JavaScript, Guzzle para PHP, etc.

Si quisiera evitar un servicio de caché de datos de transacciones y obtener datos directamente de los pares / nodos de Arweave, ¡podría hacerlo, pero es mucho trabajo!

Los datos de transacción se almacenan en Arweave como una secuencia contigua de fragmentos de 256 KB, desde el comienzo de la red hasta el bloque actual. Este formato está optimizado para admitir el mecanismo minero SPoRA en el que los mineros participan para demostrar que están almacenando datos de Arweave.

::: info
1. Obtenga una lista de pares de un par conocido.
2. Pídale al par los desplazamientos de fragmentos que contienen sus datos de transacción.
3. Pídale al par los fragmentos.
     1. Si el par proporciona los fragmentos, combínelos de nuevo en su formato original.
4. (Si el par no tiene los fragmentos) recorra la lista de pares pidiendo los fragmentos.
5. Por cada par que visite, verifique su lista de pares y agregue pares que aún no estén en su lista.
6. Repita desde el paso 3 hasta que tenga todos los fragmentos.
:::

Realizar esta tarea requiere una cantidad bastante grande de trabajo cada vez que se desee recuperar datos de la red de Arweave. Imagina si estuvieras tratando de mostrar una línea de tiempo de tweets como lo hace [https://public-square.g8way.io](https://public-square.g8way.io). La experiencia del usuario sería terrible con largos tiempos de carga y "spinners". Debido a que los datos en Arweave son permanentes, es seguro almacenar en caché en su forma original para agilizar y facilitar la recuperación de los datos de transacción.

A continuación se muestra cómo acceder a los datos de transacción en caché en el servicio de caché de datos de transacción arweave.net.

### Obtener datos de transacción en caché

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>Haga clic para ver un ejemplo de resultado</b></summary>

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

Cada par / nodo de Arweave también expone algunos puntos finales HTTP que a menudo son gateways replicados. Puede leer más sobre los puntos finales HTTP de los pares de Arweave aquí.

### Obtener transacción sin formato
`https://arweave.net/raw/TX_ID`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Haga clic para ver un ejemplo de resultado</b></summary>

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

### Obtener por campo
`https://arweave.net/tx/TX_ID/FIELD`

Campos disponibles: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Haga clic para ver un ejemplo de resultado</b></summary>

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

### Obtener saldo de la billetera
El saldo devuelto está en Winston. Para obtener el saldo en $AR, divida el saldo por 1000000000000
`https://arweave.net/wallet/ADDRESS/balance`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### Obtener estado de la transacción
`https://arweave.net/tx/TX_ID/status`
::: tip
Este endpoint solo admite transacciones nativas de Arweave. Las transacciones deben confirmarse antes de obtener una respuesta exitosa.
:::

```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
  console.log(JSON.stringify(result))
```
<details>
<summary><b>Haga clic para ver un ejemplo de resultado</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />

### Obtener información de la red

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>Haga clic para ver un ejemplo de resultado</b></summary>

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