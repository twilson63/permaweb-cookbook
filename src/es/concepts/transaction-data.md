---
locale: es
---


# Obtener datos de la transacción

Aunque los servicios de indexación permiten realizar consultas de metadatos de la transacción, no ofrecen acceso a los datos de la transacción en sí. Esto se debe a que almacenar datos de la transacción y indexar metadatos requieren recursos diferentes. Los servicios de indexación principalmente se basan en recursos de computación para realizar consultas en una base de datos, mientras que los datos de la transacción se prestan mejor para su despliegue en una Red de Distribución de Contenidos (CDN) para optimizar el almacenamiento y el ancho de banda.

La mayoría de los gateways ofrece un servicio de Cache de datos de la transacción a través de un conjunto de extremos HTTP. Se puede usar cualquier cliente/paquete HTTP para solicitar datos de transacción de estos extremos. Por ejemplo, Axios o Fetch para JavaScript, Guzzle para PHP, etc.

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700" />

Si desea omitir el servicio de caché de datos de transacción y obtener datos directamente de los pares/nodos de Arweave, puede hacerlo, ¡pero es una gran cantidad de trabajo!

Los datos de la transacción se almacenan en Arweave como una secuencia contigua de fragmentos de 256KB desde el principio mismo de la red hasta el bloque actual. Este formato está optimizado para admitir el mecanismo de minería SPoRA en el que participan los mineros para demostrar que están almacenando los datos de Arweave.

::: info
1. Recupere una lista de pares de un par bien conocido.
1. Pregunte al par por los desplazamientos del fragmento que contienen sus datos de transacción.
1. Pregunte al par por los fragmentos.
    1. Si el par proporciona los fragmentos, vuélvalos a componer a su formato original.
1. (Si el par no tiene los fragmentos) recorra la lista de pares preguntando por los fragmentos.
1. Para cada par que visite, revise su lista de pares y agregue pares que no estén en su lista.
1. Repita desde el paso 3 hasta que tenga todos los fragmentos.
:::

Esta es una cantidad bastante grande de trabajo para realizar cada vez que desea recuperar datos de la red Arweave. Imagine que intentara mostrar una línea de tiempo de tweets como [https://public-square.g8way.io](https://public-square.g8way.io). La experiencia de usuario sería terrible con largos tiempos de carga y giradores. Debido a que los datos en Arweave son permanentes, es seguro almacenarlos en su forma original para hacer que la recuperación de datos de transacción sea mucho más rápida y fácil.

Los siguientes extremos HTTP son la forma de acceder a los datos de la transacción en caché en el servicio de caché de datos de la transacción de arweave.net.

<hr />

### Obtener datos de caché de TX
Este método recupera los datos de la transacción asociados con el ID de transacción (TX_ID) especificado a partir de la caché.

`https://arweave.net/TX_ID`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>Haga clic para ver el resultado del ejemplo</b></summary>

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

### Obtener transacción en bruto
Los datos de algunos [tipos de transacciones](manifests.md) siguen reglas diferentes para su representación, este extremo devolverá los datos en bruto no transformados.
`https://arweave.net/raw/TX_ID`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Haga clic para ver el resultado del ejemplo</b></summary>

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

Cada par/nodo de Arweave también expone algunos puntos finales HTTP que suelen ser gateways replicados. Puedes obtener más información sobre los puntos finales HTTP de los pares de Arweave [aquí](/references/http-api.md).