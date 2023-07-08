---
locale: pt
---
# Agrupamento

Antes de começar com qualquer uma das referências abaixo, certifique-se de ler [Bundles e Bundling](/concepts/bundles.md) de [Conceitos Principais](/concepts/).

## Configuração

Vamos usar a biblioteca [arbundles](https://github.com/bundlr-Network/arbundles), que é uma implementação em JavaScript da [especificação ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md). O ArBundles oferece suporte ao TypeScript.

**Observação:** Esta referência assume um ambiente NodeJS. A compatibilidade com o navegador é possível, mas atualmente requer manipulação de preenchimentos de `Buffer`. Isso será abordado em uma versão futura do ArBundles.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install arbundles
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add arbundles
```

  </CodeGroupItem>
</CodeGroup>

## Criar um `Assinante`

Para criar Itens de Dados, precisamos primeiro criar um `Assinante`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* o arquivo de chave jwk Arweave */ }
const assinante = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## Criar um `Item de Dados`

Para criar um `Item de Dados`, passamos alguns dados juntamente com um `Assinante` para a função utilitária `createData()`.

**Observação:** Embora a função utilitária `createData()` exija um `Assinante`, o `Item de Dados` retornado **ainda não está assinado** e contém um ID de espaço reservado.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { createData } from 'arbundles'

// Criar um Item de Dados a partir de uma string
const meuDadoString: string = 'Olá, Permaweb!'
const meuItemDado = createData(meuDadoString, assinante)

// Criar um Item de Dados de um Buffer ou Uint8Array
const meuBuffDados: Buffer | Uint8Array = Buffer.from('Olá, Permaweb!')
const meuOutroItemDado = createData(meuBuffDados, assinante)

/* !!!ATENÇÃO!!! ITENS DE DADOS AINDA NÃO ESTÃO ASSINADOS! */
```

  </CodeGroupItem>
</CodeGroup>

## Criar um `Agrupamento`

Para criar um Agrupamento, passamos nosso `Item de Dados` para a função utilitária `bundleAndSignData` e aguardamos o resultado.

**Observação:** Um `Item de Dados` passado para esta função utilitária pode ser pré-assinado conforme detalhado em uma seção posterior.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const itensDados = [ meuItemDado, meuOutroItemDado ]
const agrupamento = await bundleAndSignData(itensDados, assinante)
```

  </CodeGroupItem>
</CodeGroup>

## Criar uma `Transação` a partir de um `Agrupamento`

Para enviar um `Agrupamento` para o Arweave, no final, precisa haver uma `Transação` raiz da Camada 1 que contém o `Agrupamento`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

// Configurar um cliente Arweave
const arweave = new Arweave({
  protocol: 'https',
  host: 'arweave.net',
  port: 443
})

// Criar usando ArweaveJS
const tx = await arweave.createTransaction({ data: agrupamento.getRaw() }, jwk)

// OU Criar a partir do próprio Agrupamento
const tx = await agrupamento.toTransaction({}, arweave, jwk)

// Assinar a transação
await arweave.transactions.sign(tx, jwk)

// Enviar tx para o Arweave com o método preferido!
```

  </CodeGroupItem>
</CodeGroup>

## Assinar um `Item de Dados`

Para obter o ID de um `Item de Dados` (por exemplo, para uso em um manifesto também contido no mesmo agrupamento), devemos chamar e aguardar o método `.sign()` do `Item de Dados`. Se a assinatura for bem-sucedida, o `Item de Dados` agora terá seu ID único e assinatura e estará pronto para ser adicionado a um `Agrupamento`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
await meuItemDado.sign(assinante)
await meuOutroItemDado.sign(assinante)

const id1 = meuItemDado.id
const id2 = meuOutroItemDado.id
```

  </CodeGroupItem>
</CodeGroup>

## Etiquetando um `Item de Dados`

`Itens de Dados` podem ter tags assim como as Transações da Camada 1 do Arweave podem ter tags. Quando um Gateway do Arweave descompacta e indexa o `Agrupamento`, essas tags do `Item de Dados` se tornam consultáveis da mesma forma que as tags de uma Transação da Camada 1 do Arweave são consultáveis.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const meuDadoString: string = 'Olá, Permaweb!'
  const tags = [
    { name: 'Título', value: 'Olá Permaweb' },
    { name: 'Tipo de Conteúdo', value: 'texto / plano' }
  ]
  const meuItemDado = createData(meuDadoString, assinante, { tags })
```

  </CodeGroupItem>
</CodeGroup>

## Consumindo Agrupamentos

**ATENÇÃO:** Certifique-se de que o `Buffer` que você passa para `new Bundle(buffer)` contenha um `Agrupamento`, caso contrário, um `Buffer` muito pequeno sendo passado causará a parada do thread. **NÃO** use `new Bundle(buffer)` em um ambiente de produção. Em vez disso, consulte a [interface streamable](https://github.com/Bundlr-Network/arbundles/blob/master/src/stream) no repositório ArBundles.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const agrupamento = new Bundle(Buffer.from(tx.data))
  const meuItemDado = agrupamento.get(0)
  const meuOutroItemDado = agrupamento.get(1)
```

  </CodeGroupItem>
</CodeGroup>