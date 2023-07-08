---
locale: pt
---
# Buscando dados de transação
Embora os serviços de indexação permitam a consulta de metadados de transação, eles não fornecem acesso aos próprios dados da transação. Isso ocorre porque o cache de dados de transação e a indexação de metadados têm requisitos de recursos diferentes. Os serviços de indexação dependem principalmente de recursos de computação para realizar consultas em um banco de dados, enquanto os dados da transação são mais adequados para implantação em uma Rede de Entrega de Conteúdo (CDN) para otimizar armazenamento e largura de banda.

Um serviço de cache de dados de transação é oferecido pela maioria dos gateways por meio de um conjunto de endpoints HTTP. Qualquer cliente/pacote HTTP pode ser usado para solicitar dados de transação desses endpoints. Por exemplo, Axios ou Fetch para JavaScript, Guzzle para PHP, etc.

Se você quisesse ignorar um serviço de cache de dados de transação e obter dados diretamente dos pares/nós Arweave, poderia, mas seria muito trabalho!

Os dados da transação são armazenados no Arweave como uma sequência contígua de segmentos de 256KB, desde o início da rede até o bloco atual. Este formato é otimizado para suportar o mecanismo de mineração SPoRA, no qual os mineradores participam para provar que estão armazenando dados do Arweave.

::: info
1. Recupere uma lista de pares de um par bem conhecido.
1. Peça ao par os deslocamentos de segmento que contêm os dados de suas transações.
1. Peça ao par os segmentos.
    1. Se o par fornecer os segmentos, combine-os de volta ao formato original.
1. (Se o par não tiver os segmentos) percorra a lista de pares solicitando os segmentos.
1. Para cada par que você visitar, verifique a lista de pares deles e adicione pares que ainda não estejam em sua lista.
1. Repita a partir da etapa 3 até ter todos os segmentos.
:::

Isso é uma quantidade considerável de trabalho para realizar sempre que você deseja recuperar dados da rede Arweave. Imagine se você estivesse tentando exibir uma linha do tempo de tweets como [https://public-square.g8way.io](https://public-square.g8way.io) faz. A experiência do usuário seria terrível, com longos tempos de carregamento e geradores de espera. Como os dados no Arweave são permanentes, é seguro armazená-los em seu formato original para facilitar e acelerar a recuperação dos dados da transação.

A seguir, está a maneira de acessar os dados de transação em cache no serviço de cache de dados de transação arweave.net.

### Obtenha dados de TX em cache

`https://arweave.net/ID_TX`

```js
const res = await axios.get(`https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`)
console.log(res)
```

<details>
<summary><b>Clique para ver o exemplo de resultado</b></summary>

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

Cada par/nó Arweave também expõe alguns endpoints HTTP que geralmente são gateways replicados. Você pode ler mais sobre os endpoints HTTP de pares Arweave aqui.

### Obter transação bruta
`https://arweave.net/raw/ID_TX`
```js
const result = await fetch('https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Clique para ver o exemplo de resultado</b></summary>

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

### Obter por campo
`https://arweave.net/tx/ID_TX/CAMPO`

Campos disponíveis: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
  .then(res => res.json())
  console.log(JSON.stringify(result))
```

<details>
<summary><b>Clique para ver o exemplo de resultado</b></summary>

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

### Obter saldo da carteira
O saldo retornado é em Winston. Para obter o saldo em $AR, divida o saldo por 1000000000000.
`https://arweave.net/wallet/ENDEREÇO/saldo`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/saldo`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```

### Obter status da transação
`https://arweave.net/tx/ID_TX/status`
::: tip
Este endpoint suporta apenas transações nativas do Arweave. As transações devem ser confirmadas antes de obter uma resposta bem-sucedida.
:::

```js
  const result = await fetch('https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status').then(res => res.json())
  console.log(JSON.stringify(result))
```
<details>
<summary><b>Clique para ver o exemplo de resultado</b></summary>

```json
{
  "block_height":1095552,"block_indep_hash":"hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3","number_of_confirmations":10669
}

```
</details>
<hr />



### Obter informações da rede

```js
const res = await axios.get('https://arweave.net/info')
console.log(res.data)
```

<details>
<summary><b>Clique para ver o exemplo de resultado</b></summary>

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