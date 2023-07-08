---
locale: pt
---
# Arweave API peer HTTP
Para uma referência mais completa das APIs HTTP do Arweave peer, consulte o [guia linkado](https://docs.arweave.org/developers/server/http-api).

Os endpoints apresentados aqui são adicionados por conveniência e/ou porque foram omitidos do [guia linkado](https://docs.arweave.org/developers/server/http-api).

::: info
Os serviços de gateway Permaweb normalmente são suportados por um ou mais nós completos do Arweave. Como resultado, eles costumam expor os endpoints do nó sob o caminho `/tx/` e rotear a solicitação diretamente para um nó do Arweave. Isso significa que esses métodos podem ser chamados tanto em um gateway quanto diretamente em um peer/nó do arweave.
:::

<hr />

### Obter por campo
Recupera os campos de cabeçalho associados a uma transação diretamente de um nó do Arweave. Pode ser usado para recuperar também os dados da transação, se o nó armazenar os fragmentos e os dados forem pequenos o suficiente para serem servidos pelo nó.

`https://arweave.net/tx/TX_ID/FIELD`

Campos disponíveis: id | last_tx | owner | target | quantity | data | reward | signature
```js
const result = await fetch('https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data')
// os campos são retornados no formato base64url, então precisamos decodificar
const base64url = await result.text()
const jsonData = JSON.parse(Arweave.utils.b64UrlToString(base64url))
console.log(jsonData)
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
O saldo retornado está em Winston. Para obter o saldo em $AR, divida o saldo por 1000000000000.
`https://arweave.net/wallet/ENDEREÇO/saldo`
```js
const res = await axios.get(`https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`)
console.log(res)
console.log(res.data / 1000000000000)

6638463438702 // Winston
6.638463438702 // $AR
```
<hr />

### Obter status da transação
`https://arweave.net/tx/TX_ID/status`
::: tip
Este endpoint suporta apenas transações básicas do Arweave, não transações agrupadas. As transações devem ser confirmadas na cadeia antes que seu status esteja disponível.
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