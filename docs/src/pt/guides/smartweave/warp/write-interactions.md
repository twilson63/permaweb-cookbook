---
locale: pt
---
# Warp WriteInteractions

Para chamar uma função em um contrato SmartWeave, você pode criar uma transação conhecida como uma ação SmartWeave. Essa ação inclui o nome da função e os parâmetros de entrada necessários para a função no contrato SmartWeave. Você pode criar uma ação SmartWeave usando a função contract.writeInteraction.

## Código

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const PROTOCOLO_SELO = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function fazerSelo() {
  const resultado = await warp.contract(PROTOCOLO_SELO)
    .connect('use_wallet')
    .writeInteraction({
      function: 'selo',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(resultado)
}
```

Ao chamar writeInteraction, você precisa passar seus parâmetros de entrada, que são os parâmetros que o contrato espera receber.

::: warning
Como os contratos SmartWeave são avaliados em um fluxo preguiçoso, você não sabe se sua interação foi executada com sucesso até avaliar o contrato para o estado atual. Use [Warp readState](./readstate.md) para acessar o contrato e determinar se a interação foi aplicada com sucesso.
:::

## Dry Write

`DryWrite` permite que você teste e verifique uma interação no estado atual sem realmente executá-la na permaweb. Essa funcionalidade permite simular a interação localmente e garantir que ela seja bem-sucedida antes de aplicá-la.

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const PROTOCOLO_SELO = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function fazerSelo() {
  const resultado = await warp.contract(PROTOCOLO_SELO)
    .connect('use_wallet')
    .dryWrite({
      function: 'selo',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(resultado)
}
```

::: warning
Um aspecto a ser observado ao usar dry writes é que todo o estado precisa ser avaliado localmente para contratos que usam readState ou internalWrites. Isso pode resultar em um processo com desempenho lento.
:::

## Otimizado para velocidade

Por padrão, writeInteractions são enviadas ao Warp Sequencer e agrupadas e enviadas para o Arweave. Você pode enviar diretamente para o Arweave desabilitando o agrupamento.

```ts
const resultado = await contrato.writeInteraction({
  function: 'NOME_DA_SUA_FUNÇÃO',
  ...
}, { disableBundling: true })
```

## Resumo

O Protocolo SmartWeave permite a modificação de dados dinâmicos em um sistema de armazenamento imutável e somente para adição usando writeInteractions. Essas interações permitem comunicação sem confiança e sem permissões com contratos SmartWeave. O SDK Warp fornece aos desenvolvedores uma API amigável para interagir com o Protocolo SmartWeave e sua funcionalidade de writeInteractions.

Para recursos adicionais:

* SDK Warp [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Documentação Warp [https://warp.cc](https://warp.cc)