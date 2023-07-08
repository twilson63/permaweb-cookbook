---
locale: pt
---
# Introdução ao SDK Warp (SmartWeave)

Warp é um popular SDK do Protocolo SmartWeave. Com o Warp e o Bundlr, suas implantações e interações do SmartWeave podem ser extremamente rápidas.

## Introdução

Este guia é uma breve introdução ao SDK Warp e alguns de seus métodos de API. Se você deseja aprender mais sobre Contratos SmartWeave em geral, visite [Conceitos Principais: SmartWeave](/concepts/smartweave.html).

::: dica
Você pode encontrar o SDK Warp no [github](https://github.com/warp-contracts). Para uma exploração mais profunda do Warp SmartWeave, visite [Warp Website](https://warp.cc).
:::

Para usar o SDK no servidor, você precisará de acesso a um arquivo wallet.json e, para usar o SDK no navegador, você precisará se conectar a uma carteira suportada pelo arweave.

## Instalação

Para instalar o warp em seu projeto, você pode usar `npm` ou `yarn` ou outros clientes npm.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install warp-contracts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add warp-contracts
```

  </CodeGroupItem>
</CodeGroup>

## Importação

Ao usar o Warp com seu projeto, há várias maneiras de importar o sdk, dependendo da configuração do seu projeto.

<CodeGroup>
  <CodeGroupItem title="Typescript">

```ts
import { WarpFactory } from 'warp-contracts'
```

  </CodeGroupItem>
  <CodeGroupItem title="ESM">

```js
import { WarpFactory } from 'warp-contracts/mjs'
```

  </CodeGroupItem>
  <CodeGroupItem title="CommonJS">

```js
const { WarpFactory } = require('warp-contracts')
```

  </CodeGroupItem>
</CodeGroup>


## Conexão com um ambiente

Existem vários ambientes com os quais você pode querer interagir e pode se conectar a esses ambientes usando os helpers `forXXXX`.


<CodeGroup>
  <CodeGroupItem title="Mainnet">

```ts
const warp = WarpFactory.forMainnet()
```

  </CodeGroupItem>
  <CodeGroupItem title="Testnet">

```js
const warp = WarpFactory.forTestnet()
```

  </CodeGroupItem>
  <CodeGroupItem title="Local">

```js
const warp = WarpFactory.forLocal()
```

  </CodeGroupItem>
  <CodeGroupItem title="Personalizado">

```js
const warp = WarpFactory.custom(
  arweave, // arweave-js
  cacheOptions, // { ...defaultCacheOptions, inMemory: true}
  environment // 'local', 'testnet', 'mainnet'
)
```

  </CodeGroupItem>
</CodeGroup>


::: advertência
Ao usar o ambiente local, você precisará ter o arLocal em execução na porta 1984.
:::


## Resumo

Este guia introdutório visa ajudá-lo a configurar o Warp. Os guias seguintes mostrarão como implantar contratos SmartWeave usando o SDK Warp, como interagir com esses contratos e, por fim, como evoluir contratos SmartWeave.