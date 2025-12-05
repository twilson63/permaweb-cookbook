# トランザクションの完全な GraphQL 構造

以下の GraphQL クエリは、インデクシングサービスによって取得されたトランザクションのすべてのプロパティを返します。

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

## ページネーション

デフォルトでは、GraphQL クエリは最初の 10 件の結果を返します。より大きな結果セットを要求するには、`transactions` クエリに `first: X` オプション（`X` は 1〜100 の値）を追加してください。

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

結果セットに 100 件を超える項目がある場合は、カーソルを使用して続きのページを取得できます。

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

続きの結果ページが存在する場合、`hasNextPage` は `true` の値を持ちます。結果セットの最後の項目の `cursor` 値を取得し、それを `after` クエリパラメータの値として使用してください。

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

全ての結果セットを取得するには、各ページの最後の項目から更新された `cursor` 値を取得して `after` クエリを繰り返し、`hasNextPage` が `false` になるまで続けてください。

## レート制限

インデクシングサービスは、攻撃やサービスの悪用を防ぐためにレート制限を実装します。`arweave.net/graphql` サービスは GraphQL クエリを 5 分間に 600 件（各 IP アドレス毎）に制限しています。レスポンスを解析する前に、クエリの結果が 200 番台のステータスコードであることを必ず確認してください。HTTP ステータスコード 429 はレート制限が適用されていることを示します。HTTP ステータスコード 503 は通常、クエリ結果セットが `arweave.net/graphql` にとって大きすぎることを示します。

## リソース

- Arweave の GraphQL スキーマをより完全に一覧するには、[Arweave GraphQL Guide](https://gql-guide.arweave.net) を参照してください
- [ArDB package](../guides/querying-arweave/ardb.md)
- [ar-gql package](../guides/querying-arweave/ar-gql.md)
- GraphQL の一般的なガイドとしては、[graphql.org/learn](https://graphql.org/learn) が良い出発点です
