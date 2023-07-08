---
locale: pt
---
# Tokens Atômicos

## O que é um Token Atômico?

[Confira o conceito](../../concepts/atomic-tokens.md)

## Criando um Token Atômico

::: info INFORMAÇÃO
Para este exemplo, estamos usando uma Fonte de Contrato SWT que já está publicada na rede. [x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) - 
:::

example.ts

```ts
import Bundlr from '@bundlr-network/client'
import { WarpFactory } from 'warp-contracts'

async function main() {
  const wallet = JSON.parse(await import('fs')
    .then(fs => fs.readFileSync('./wallet.json', 'utf-8')))

  const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', wallet)
  const warp = WarpFactory.forMainnet()

  const data = `<h1>Hello Permaweb!</h1>`
  const tags = [
    { name: 'Content-Type', value: 'text/html' },
    // Tags ANS-110
    { name: 'Type', value: 'web-page' },
    { name: 'Title', value: 'Minha primeira página permaweb' },
    { name: 'Description', value: 'Primeira página permaweb por Anon' },
    { name: 'Topic:Noob', value: 'Noob' },
    // Contrato SmartWeave
    { name: 'App-Name', value: 'SmartWeaveContract' },
    { name: 'App-Version', value: '0.3.0' },
    { name: 'Contract-Src', value: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs' },
    {
      name: 'Init-State', value: JSON.stringify({
        balances: {
          'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc': 1000000
        },
        name: 'AtomicToken',
        ticker: 'ATOMIC-TOKEN',
        pairs: [],
        creator: 'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc',
        settings: [['isTradeable', true]]
      })
    }
  ]

  const { id } = await bundlr.upload(data, { tags })
  await warp.createContract.register(id, 'node2')
  console.log('Token Atômico: ', id)
}

main()
```

Neste exemplo, estamos criando um item de dados e enviando o item para o serviço de rede do bundler. Em seguida, estamos registrando nosso contrato com o sequencer Warp. Ao usar o bundler para publicar nosso item de dados e registrar com o sequencer Warp, nossos dados ficam imediatamente disponíveis no serviço de gateway e nosso contrato fica imediatamente apto a aceitar interações.

Executar Exemplo

```sh
npm install @bundlr-network/client warp-contracts 
npm install typescript ts-node
npx ts-node example.ts
```

::: info INFORMAÇÃO
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) é uma Especificação de Descoberta de Ativos que permite a componibilidade com o ecossistema de aplicativos Permaweb.
:::

## Resumo

Este é um exemplo simples de implantação de um Ativo Atômico, para exemplos mais detalhados, confira: [https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)


## Trabalhando com Tokens

Contratos SmartWeave não podem armazenar AR, a moeda nativa da Rede Arweave. O AR é usado para comprar armazenamento de dados na Rede Arweave e pode ser transferido de uma carteira de origem para uma carteira de destino na rede Arweave, mas não pode ser mantido em um contrato SmartWeave.