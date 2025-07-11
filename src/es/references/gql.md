---
locale: es
---

# Estructura completa de GraphQL para transacciones

La siguiente consulta de GraphQL devuelve todas las propiedades de una transacción capturadas por el servicio de indexación.

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

## Paginación

Por defecto, las consultas de GraphQL devuelven los primeros 10 resultados. Se pueden solicitar conjuntos de resultados más grandes agregando la opción `first: X` (donde `X` es un valor de 1 a 100) a la consulta de transacciones.

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

Si hay más de 100 elementos en el conjunto de resultados, se puede obtener páginas siguientes de resultados utilizando un cursor.

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

Si hay páginas de resultados siguientes, `hasNextPage` tendrá un valor de `true`. Tome el valor del `cursor` del último elemento en el conjunto de resultados y úselo como valor para el parámetro de consulta `after`.

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

Para obtener el conjunto completo de resultados, repita la consulta `after` con un valor de `cursor` actualizado del último elemento de cada página hasta que `hasNextPage` sea `false`.

## Límite de velocidad

Los servicios de indexación implementarán un límite de velocidad para prevenir ataques y uso indebido de sus servicios. El servicio `arweave.net/graphql` limita las consultas de GraphQL a 600 consultas cada 5 minutos (por dirección IP). Siempre verifique los resultados de sus consultas para ver si tienen un código de estado en los 200 antes de analizar la respuesta. Un código de estado HTTP 429 indicará que se está aplicando un límite de velocidad. Un código de estado HTTP 503 generalmente indica que el conjunto de resultados de la consulta es demasiado grande para `arweave.net/graphql`.

## Recursos

- Para obtener una lista más completa del esquema de GraphQL de Arweave consulte la [Guía de GraphQL de Arweave](https://gql-guide.arweave.dev)
- [Paquete ArDB](../guides/querying-arweave/ardb.md)
- [Paquete ar-gql](../guides/querying-arweave/ar-gql.md)
- Para obtener una guía general sobre GraphQL, [graphql.org/learn](https://graphql.org/learn) es un buen punto de partida.
