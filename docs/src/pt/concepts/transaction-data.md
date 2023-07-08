---
locale: pt
---
# Buscando dados de transação
Embora os serviços de indexação permitam a consulta de metadados de transação, eles não fornecem acesso aos próprios dados da transação. Isso ocorre porque o armazenamento em cache de dados de transação e a indexação de metadados têm requisitos de recursos diferentes. Os serviços de indexação dependem principalmente de recursos de computação para executar consultas em um banco de dados, enquanto os dados da transação são mais adequados para implantação em uma Rede de Entrega de Conteúdo (CDN) para otimizar o armazenamento e a largura de banda.

Um serviço de armazenamento em cache de dados de transação é oferecido pela maioria dos gateways por meio de um conjunto de pontos de extremidade HTTP. Qualquer cliente/pacote HTTP pode ser usado para solicitar dados de transação desses pontos de extremidade. Por exemplo, Axios ou Fetch para JavaScript, Guzzle para PHP, etc.

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

Se você quisesse contornar um serviço de armazenamento em cache de dados de transação e obter os dados diretamente dos pares/nós do Arweave, poderia, mas seria um trabalho árduo!

Os dados da transação são armazenados no Arweave como uma sequência contígua de fragmentos de 256KB, desde o início da rede até o bloco atual. Este formato é otimizado para suportar o mecanismo de mineração SPoRA em que os mineradores participam para provar que estão armazenando os dados do Arweave.

:::info
1. Obtenha uma lista de pares de um peer conhecido.
1. Solicite ao peer os deslocamentos dos fragmentos que contêm os dados de suas transações.
1. Solicite ao peer os fragmentos.
    1. Se o peer fornecer os fragmentos, combine-os de volta em seu formato original.
1. (Se o peer não tiver os fragmentos) percorra a lista de pares solicitando os fragmentos.
1. Para cada par que você visitar, verifique a lista de pares deles e adicione pares que ainda não estejam em sua lista.
1. Repita a partir do passo 3 até ter todos os fragmentos.
:::

Isso é uma quantidade bastante grande de trabalho para realizar toda vez que você deseja recuperar dados da rede Arweave. Imagine se você estivesse tentando exibir uma linha do tempo de tweets como [https://public-square.g8way.io](https://public-square.g8way.io) faz. A experiência do usuário seria terrível, com tempos de carregamento longos e animações de espera. Como os dados no Arweave são permanentes, é seguro armazená-los em cache em sua forma original para tornar a recuperação dos dados de transação muito mais rápida e fácil.

Os seguintes pontos de extremidade HTTP são usados para acessar os dados de transação armazenados em cache no serviço de armazenamento em cache de dados de transação do arweave.net.

<hr />

### Obter dados de TX em cache
Este método recupera os dados de transação associados ao ID de transação (TX_ID) especificado do cache.

`https://arweave.net/TX_ID`

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

### Obter transação bruta
Os dados de alguns [tipos de transação](manifests.md) seguem regras diferentes para renderização, este ponto de extremidade retornará os dados brutos não transformados.
`https://arweave.net/raw/TX_ID`
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

Cada par/nó do Arweave também expõe alguns pontos de extremidade HTTP que são frequentemente gateways replicados. Você pode ler mais sobre os pontos de extremidade HTTP dos pares do Arweave [aqui](/references/http-api.md).