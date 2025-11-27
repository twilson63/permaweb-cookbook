# 交易的完整 GraphQL 結構

下列 GraphQL 查詢會回傳由索引服務擷取的交易所有屬性。

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

## 分頁

預設情況下，GraphQL 查詢會回傳前 10 筆結果。若需較大的結果集，可在 transactions 查詢中加入 `first: X` 選項（其中 `X` 的值介於 1 到 100 之間）。

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

若結果集中超過 100 項，可使用 `cursor` 來取得後續頁面的結果。

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

如果存在後續的結果頁，`hasNextPage` 的值會是 `true`。取出結果集中最後一筆的 `cursor` 值，並將其用作 `after` 查詢參數的值。

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

要取得整個結果集，請重複以每頁最後一筆更新過的 `cursor` 值執行帶有 `after` 參數的查詢，直到 `hasNextPage` 為 `false`。

## 速率限制

索引服務會實施速率限制以防止攻擊及濫用其服務。`arweave.net/graphql` 服務對 GraphQL 查詢的限制為每個 IP 地址每 5 分鐘最多 600 次查詢。於解析回應前，務必檢查查詢結果是否為 200 系列的狀態碼。HTTP 狀態碼 429 表示正在執行速率限制。HTTP 狀態碼 503 通常表示查詢結果集對於 `arweave.net/graphql` 來說過大。

## 資源

- 如需更完整的 Arweave GraphQL 架構清單，請參閱 [Arweave GraphQL 指南](https://gql-guide.arweave.net)
- [ArDB 套件](../guides/querying-arweave/ardb.md)
- [ar-gql 套件](../guides/querying-arweave/ar-gql.md)
- 若要瞭解一般性的 GraphQL 指南，[graphql.org/learn](https://graphql.org/learn) 是一個很好的起點
