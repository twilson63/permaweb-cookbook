---
locale: pt
---
# Warp (SmartWeave) SDK - Implantação de Contratos

Contratos SmartWeave são criados postando duas transações na rede, uma Transação de Origem e uma Transação de Estado Inicial, a transação de origem contém o código-fonte que o contrato usará para determinar o estado atual. A transação de estado inicial fornece um identificador de contrato para referência, bem como os dados de semente inicial que o contrato deve usar como ponto de partida para avaliar o estado atual. O estado atual é calculado acessando ações que são transações escritas na rede que contêm parâmetros de entrada para executar usando o código-fonte avaliado e instanciado. Contratos Warp podem ser criados usando várias linguagens diferentes e podem ser avaliados usando o Warp SDK. Este guia mostrará as várias maneiras diferentes de implantar um Contrato Warp.

::: tip
Se você quiser saber mais sobre a autoria de Contratos Warp SmartWeave, confira a Warp Academy! [https://academy.warp.cc/](https://academy.warp.cc/)
:::

A partir da versão Warp 1.3.0, você precisará de um plugin para implantar contratos com o Warp. Esse plugin permitirá que você adicione diferentes assinaturas de carteira.

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

function deploy(initState, src) {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE']);
  }
  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  return warp.deploy({
    wallet: userSigner,
    src,
    initState: JSON.stringify(initState)
  })
}
```


## As Quatro maneiras de implantar um Contrato Warp SmartWeave

Existem 4 maneiras diferentes de implantar um Contrato SmartWeave por meio do Warp SDK, essas opções lidam com diferentes casos de uso que um desenvolvedor pode encontrar.

* Necessidade de implantar o contrato com o código-fonte ao mesmo tempo
* Necessidade de implantar um contrato em que o código-fonte já está no permaweb
* Necessidade de implantar um contrato por meio do sequenciador e apontá-lo para alguns dados usando um manifesto de caminho
* Necessidade de implantar um contrato via Bundlr e registrar esse contrato no sequenciador

::: tip
Para obter mais informações sobre as implantações Warp, confira o Readme do projeto no GitHub. [https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment). 
:::

::: warning
Este projeto está em desenvolvimento acelerado, portanto, a documentação aqui pode ficar desatualizada rapidamente. Se você descobrir que ela está desatualizada, informe-nos no [Canal Discord do Permaweb Cookbook](https://discord.gg/haCAX3shxF).
:::

## Exemplos

::: tip
Por padrão, todas as funções de implantação são publicadas no Arweave através do Bundlr-Network, cada opção possui um sinalizador que pode ser definido para não usar o Bundlr, mas pode levar várias confirmações para que a rede confirme completamente a transação.
:::

**deploy**

Implanta contrato mais código-fonte no Warp Sequencer, no Bundlr (L2), no Arweave.

```ts
const { contractTxId, srcTxId } = await warp.deploy({
  wallet,
  initState,
  data: { 'Content-Type': 'text/html', body: '<h1>Hello World</h1>' },
  src: contractSrc,
  tags: [{"name":"AppName", "value":"HelloWorld"}],
})
```

* wallet - deve ser um arquivo de chave Arweave (wallet.json) analisado como um objeto JSON que implementa a [Interface JWK](https://rfc-editor.org/rfc/rfc7517) ou a string 'use_wallet'
* initState - é um objeto JSON convertido em string
* data - é opcional se você quiser gravar dados como parte da implantação
* src - é a string ou o valor Uint8Array do código-fonte do contrato
* tags - é uma matriz de objetos name/value `{name: string, value: string}[]`, [Saiba mais sobre tags](../../../concepts/tags.md)

**deployFromSourceTx**

Já tem o código-fonte no permaweb? Então deployFromSourceTx é sua opção! Com o permaweb, você nunca precisa se preocupar com a mudança de dados, portanto, reutilizar o código-fonte para contratos é uma escolha óbvia.

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
  wallet,
  initState,
  srcTxId: 'SRC_TX_ID'
})
```

**deployBundled**

Usa o endpoint do sequenciador Warp Gateway para fazer upload de um item de dados brutos para o Bundlr e indexá-lo.

```ts
import { createData } from 'arbundles'

const itemDeDados = createData(
  JSON.stringify({
    "manifest": "arweave/paths",
    "version": "0.1.0",
    "index": {
      "path": "index.html"
    },
    "paths": {
      "index.html": {
        "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
      }
    }
  })
  , { tags: [{'Content-Type': 'application/x.arweave-manifest+json' }]})
const { contractTxId } = await warp.deployBundled(itemDeDados.getRaw());
```


**register**

Usa o endpoint do sequenciador Warp Gateway para indexar um contrato que foi enviado com o Bundlr.

```ts
import Bundlr from '@bundlr-network/client'

const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', wallet)
const { id } = await bundlr.upload('Some Awesome Atomic Asset',  { 
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2') 
```

## Resumo

Por que existem tantas opções para implantar contratos? Esses métodos existem para reduzir a duplicação, permitir interações avançadas de contrato e permitir flexibilidade para testar e usar o protocolo smartweave. O permaweb é muito único em sua arquitetura, ele fornece um recurso em que você pode implantar dados digitais e o contrato para gerenciar esses dados, gerando o mesmo identificador de transação. O resultado é dados dinâmicos associados a um conjunto imutável de dados. A implantação de contratos é apenas uma parte do Warp SDK, para saber mais, continue lendo este guia!