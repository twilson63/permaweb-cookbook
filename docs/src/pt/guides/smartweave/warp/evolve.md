---
locale: pt
---
# Warp (SmartWeave) SDK - Evoluir

Evoluir é um recurso que permite que os desenvolvedores atualizem o código-fonte de um contrato inteligente sem implantar um novo contrato. Para usar esse recurso, você deve primeiro enviar o novo código-fonte usando a função salvar. Uma vez que o código atualizado tenha sido confirmado no Permaweb, você pode usar a função evoluir para apontar o contrato para o novo código-fonte. Isso permite que você atualize o comportamento do contrato sem criar uma nova instância do contrato.

## Por quê?

Escrever contratos SmartWeave pode ser difícil e às vezes requer atualizações ou novos recursos a serem adicionados ao longo do tempo. Evoluir permite que você faça alterações no seu contrato sem precisar criar uma nova instância do contrato do zero. Para usar esse recurso, o objeto de estado do seu contrato deve incluir uma propriedade de evolução que é definida como o identificador da transação do código-fonte do contrato novo. Isso permite que você modifique e melhore seu contrato existente sem começar do zero.

```json
{
  ...
  "evoluir": "SEU IDENTIFICADOR DE TRANSAÇÃO DO CÓDIGO-FONTE"
}
```

## Publique seu novo código-fonte no Permaweb

Antes de poder evoluir seu contrato existente, você precisa publicar o novo código-fonte no Permaweb, isso pode ser feito usando a função 'salvar'.

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const ID_TRANSACAO = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function principal() {
  const novoSrcIdTx = await warp.contract(ID_TRANSACAO).connect(jwk).save({src })
  console.log('NOVO SRC ID', novoSrcIdTx)
}

principal()
```

## Evolua seu contrato

::: warning
**Verifique** se seu novo IDENTIFICADOR DE TRANSAÇÃO DO CÓDIGO-FONTE foi confirmado, vá para [Sonar](https://sonar.warp.cc) para ter certeza de que o IDENTIFICADOR DE TRANSAÇÃO foi confirmado.
:::

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const ID_TRANSACAO = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function principal() {
  const novoSrcIdTx = await warp.contract(ID_TRANSACAO).connect(jwk).evoluir('ID TRANSAÇÃO SRC')
  console.log(result)
}

principal()
```

::: tip
Vale ressaltar que o recurso de evoluir é aplicável apenas a ações futuras, ou seja, você não pode usá-lo para aplicar novo código-fonte a ações que ocorreram antes do contrato ter evoluído.
:::

## Sumário

Evoluir é um recurso poderoso e pode fornecer extensibilidade para seus contratos, mas também pode ser um vetor de **ataque**, então tenha certeza de que você entende completamente o que está fazendo ao usá-lo. Abaixo está um trecho comum de como uma função de evoluir pode ser em seu contrato.

```js

export async function handle(state, action) {
  ...
  if (action.input.function === 'evoluir') {
    if (action.caller === state.creator) {
      state.evoluir = action.input.value 
    }
    return { state }
  }
  ...
}
```