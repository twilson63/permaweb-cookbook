---
locale: pt
---
# Metadados da Transação (Tags)

O Arweave pode ser pensado como um disco rígido permanente de apêndice único, onde cada entrada no disco é uma transação única. Transações possuem um ID, assinatura e endereço do proprietário para o endereço que assinou e pagou pela transação ser publicada. Juntamente com esses valores de cabeçalho, o protocolo Arweave permite que os usuários marquem transações com tags personalizadas. Essas tags são especificadas como pares de nome e valor de coleção que são anexadas à transação. Essas tags tornam possível fazer consultas ao Arweave e encontrar todas as transações que incluem uma tag ou tags específicas. A capacidade de consultar e filtrar transações é fundamental para dar suporte a aplicativos construídos no Arweave.

## O que são Tags de Transação?

As tags de transação são pares de chave-valor, onde a combinação de chaves e valores em base64URL deve ser inferior ao máximo de 2048 bytes para uma transação nativa Arweave.

::: dica
Transações agrupadas têm suporte para mais espaço de tag. Transações publicadas via bundler.network têm até 4096 bytes de espaço de tag.
:::


Alguns exemplos comuns de tags de transação incluem:

* `Content-Type`: Usado para especificar o tipo MIME do conteúdo a ser exibido no Permaweb.
* `App-Name`: Essa tag descreve o aplicativo que está armazenando os dados.
* `App-Version`: Essa tag é a versão do aplicativo, em parceria com App-Name.
* `Unix-Time`: Essa tag é um carimbo de data e hora em formato UNIX, **segundos** desde a época.
* `Title`: Usada para fornecer um nome ou breve descrição do conteúdo armazenado na transação.
* `Description`: Usada para fornecer uma descrição mais detalhada do conteúdo.

As tags de transação podem ser usadas para diversos propósitos, como indexar transações para pesquisa, organizar transações em categorias ou fornecer metadados sobre o conteúdo armazenado em uma transação.

## Algumas informações importantes sobre as Tags de Transação

As tags de transação são codificadas como strings codificadas Base64URL tanto para a chave quanto para o valor. Isso possibilita enviar matrizes de bytes como chaves ou valores e transferi-los com segurança por HTTP. Embora não seja legível para humanos sem decodificação, não deve ser considerado criptografia.

O tamanho máximo total das Tags de Transação para uma transação publicada diretamente no Arweave é de 2048 bytes. Esse tamanho é determinado pela concatenação de todas as chaves e todos os valores das tags de transação.

As tags de transação podem ser usadas em consultas GraphQL para retornar um conjunto filtrado de itens de transação.

## Tags Comuns usadas na comunidade

| <div style="width:100px">Nome da Tag</div>  | Descrição | Casos de Uso |
| -------- | ----------- | --------- |
| App-Name | Mais comumente usado para identificadores SmartWeave | Valores comuns são SmartWeaveContract, SmartWeaveAction e SmartWeaveContractSource |
| App-Version | A versão desses dados, pode representar o aplicativo consumindo essas informações | 0.3.0 é a versão atual do SmartWeave |
| Content-Type | Tipo MIME para identificar os dados contidos na transação | text/html, application/json, image/png |
| Unix-Time | Essa tag é um carimbo de data e hora em formato UNIX, **segundos** desde a época | O momento em que a transação é enviada |
| Title | Padrão ANS-110 para descrever o conteúdo | Fornecer um nome para um Ativo Atômico |
| Type | Padrão ANS-110 para categorização de dados | Um tipo pode classificar um ativo Permaweb |

## Exemplos

<CodeGroup>
  <CodeGroupItem title="arweave">

```ts
const tx = await arweave.createTransaction({ data: meusdados })
tx.addTag('Content-Type', 'text/html')
tx.addTag('Title', 'Meu incrível post sobre Tags de Transação')
tx.addTag('Description', 'Este é um post que você não pode perder!')
tx.addTag('Topic:Amazing', 'Incrível')
tx.addTag('Type', 'blog-post')


await arweave.transactions.sign(tx, jwk)
await arweave.transactions.post(tx)
```

  </CodeGroupItem>
  <CodeGroupItem title="@bundlr-network/client">

```js
await bundlr.upload(meusdados, [
  { name: 'Content-Type', value: 'text/html' },
  { name: 'Title', value: 'Meu incrível post sobre Tags de Transação' },
  { name: 'Description', value: 'Este é um post que você não pode perder!' },
  { name: 'Topic:Amazing', value: 'Incrível' },
  { name: 'Type', value: 'blog-post' }
])
```

  </CodeGroupItem>
</CodeGroup>

## Resumo

Compreender como as Tags de Transação se encaixam na infraestrutura Arweave pode fornecer contexto sobre como resolver problemas usando o Permaweb como uma plataforma de aplicativo. As tags fornecem uma ferramenta para consumir e criar padrões e padrões de dados comuns para promover uma experiência de dados não rival no Permaweb. O resultado oferece aos usuários a escolha de aplicativos para consumir e criar conteúdo, pois seus dados estão sempre com o usuário e não com o aplicativo.