# 交易的完整 GraphQL 结构

下列 GraphQL 查询会返回由索引服务检索的交易所有属性。

```graphql:no-line-numbers
query {
    transactions {

        pageInfo {
          hasNextPage
        }
        edges {
            cursor
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

## 分页

默认情况下，GraphQL 查询会返回前 10 笔结果。若需更大的结果集，可在 transactions 查询中加入 `first: X` 选项（其中 `X` 的值介于 1 到 100 之间）。

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

若结果集中超过 100 项，可使用 `cursor` 来取得后续页面的结果。

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

如果存在后续的结果页，`hasNextPage` 的值会是 `true`。取出结果集中最后一笔的 `cursor` 值，并将其用作 `after` 查询参数的值。

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

要获取整个结果集，请重复以每页最后一笔更新过的 `cursor` 值执行带有 `after` 参数的查询，直到 `hasNextPage` 为 `false`。

## 速率限制

索引服务会实施速率限制以防止攻击和滥用其服务。`arweave.net/graphql` 服务对 GraphQL 查询的限制为每个 IP 地址每 5 分钟最多 600 次查询。在解析响应前，务必检查查询结果是否为 200 系列的状态码。HTTP 状态码 429 表示正在执行速率限制。HTTP 状态码 503 通常表示查询结果集对于 `arweave.net/graphql` 来说过大。

## 资源

- 如需更完整的 Arweave GraphQL 架构清单，请参阅 [Arweave GraphQL 指南](https://gql-guide.arweave.net)
- [ArDB 套件](../guides/querying-arweave/ardb.md)
- [ar-gql 套件](../guides/querying-arweave/ar-gql.md)
- 若要了解一般性的 GraphQL 指南，[graphql.org/learn](https://graphql.org/learn) 是一个很好的起点
