---
locale: pt
---
# Estrutura GraphQL completa para transações
A seguinte consulta GraphQL retorna todas as propriedades de uma transação capturadas pelo serviço de indexação.

```graphql:no-line-numbers
query {
    transactions {
        cursor
        pageInfo { 
          hasNextPage
        }
        edges {
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                parent {
                    id
                }
            }
        }
    }
}

```

## Paginação
Por padrão, as consultas GraphQL retornam os primeiros 10 resultados. Conjuntos de resultados maiores podem ser solicitados adicionando a opção `first: X` (onde `X` é um valor de 1 a 100) à consulta de transações.
```graphql{4}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}

```
Se houver mais de 100 itens no conjunto de resultados, páginas subsequentes de resultados podem ser obtidas usando um cursor.
```graphql{13-15,17}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```
Se houver páginas subsequentes de resultados, `hasNextPage` terá um valor de `true`. Pegue o valor do `cursor` do último item no conjunto de resultados e use-o como valor para o parâmetro de consulta `after`.
```graphql{5}
query
{
  transactions(
    first:100,
    after: "WyIyMDIyLTEyLTMwVDE2OjQ0OjIzLjc0OVoiLDEwMF0=",
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```
Para recuperar o conjunto de resultados completo, repita a consulta `after` com um valor de `cursor` atualizado do último item de cada página até que `hasNextPage` seja `false`.

## Limitação de taxa
Os serviços de indexação implementarão limitação de taxa para evitar ataques e abuso de seus serviços. O serviço `arweave.net/graphql` limita as consultas GraphQL a 600 consultas a cada 5 minutos (por endereço IP). Sempre verifique os resultados de suas consultas para ver se eles têm um código de status nos anos 200 antes de analisar a resposta. Um código de status HTTP 429 indicará que a limitação de taxa está sendo aplicada. Um código de status HTTP 503 geralmente indica que o conjunto de resultados da consulta é muito grande para `arweave.net/graphql`.

## Recursos
* Para uma lista mais completa do esquema GraphQL Arweave, consulte o [Guia GraphQL Arweave](https://gql-guide.arweave.dev)
* [Pacote ArDB](../guides/querying-arweave/ardb.md)
* [Pacote ar-gql](../guides/querying-arweave/ar-gql.md)
* Para um guia geral sobre graphql, [graphql.org/learn](https://graphql.org/learn) é um bom ponto de partida