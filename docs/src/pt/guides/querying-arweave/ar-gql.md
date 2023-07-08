---
locale: pt
---
# ar-gql
Este pacote é uma camada mínima em cima do GraphQL, ele suporta consultas parametrizadas com variáveis de consulta. Ele também implementa o gerenciamento de resultados paginados.

## Instalação

Para instalar `ar-gql`, execute
<CodeGroup>
 <CodeGroupItem title="NPM">

```console:no-line-numbers
npm i ar-gql
```
 </CodeGroupItem>
 <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add ar-gql
```
  </CodeGroupItem>
</CodeGroup>

## Exemplo
```js:no-line-numbers
import { arGql } from "ar-gql"

const argql = arGql()

(async () => {
	let results = await argql.run(`query( $count: Int ){
    transactions(
      first: $count, 
      tags: [
        {
          name: "App-Name",
          values: ["PublicSquare"]
        },
        {
          name: "Content-Type",
          values: ["text/plain"]
        },
      ]
    ) {
      edges {
        node {
          id
          owner {
            address
          }
          data {
            size
          }
          block {
            height
            timestamp
          }
          tags {
            name,
            value
          }
        }
      }
    }
  }`, {count: 1});
  console.log(results);
})();
```

## Recursos
* [Página do ar-gql no github](https://github.com/johnletey/arGql)