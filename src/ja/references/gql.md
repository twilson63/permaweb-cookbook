---
locale: ja
---

# トランザクションの完全なGraphQL構造
次のGraphQLクエリは、インデックスサービスによってキャプチャされたトランザクションのすべてのプロパティを返します。

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
デフォルトでは、GraphQLクエリは最初の10件の結果を返します。より大きな結果セットを要求するには、トランザクションクエリに `first: X` オプションを追加します（ここで `X` は1から100の値）。

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
結果セットに100件を超えるアイテムがある場合、カーソルを使用して次のページの結果を取得できます。
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
次の結果ページがある場合、`hasNextPage`の値は`true`になります。結果セットの最後のアイテムの`cursor`値を取得し、それを`after`クエリパラメーターの値として使用します。
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

すべての結果セットを取得するには、`hasNextPage`が`false`になるまで、各ページの最後のアイテムから取得した`cursor`値を使用して`after`クエリを繰り返します。

## レート制限
インデックスサービスは、攻撃やサービスの悪用を防ぐためにレート制限を実施します。`arweave.net/graphql`サービスは、GraphQLクエリを5分ごとに600クエリに制限しています（IPアドレスごと）。レスポンスを解析する前に、クエリの結果に200番台のステータスコードがあるかを必ず確認してください。HTTPステータスコード429は、レート制限が施行されていることを示します。HTTPステータスコード503は、クエリの結果セットが`arweave.net/graphql`にとって大きすぎることを示すことが一般的です。

## リソース
* Arweave GraphQLスキーマのより完全なリストについては、[Arweave GraphQL Guide](https://gql-guide.arweave.net)を参照してください。
* [ArDBパッケージ](../guides/querying-arweave/ardb.md)
* [ar-gqlパッケージ](../guides/querying-arweave/ar-gql.md)
* GraphQLに関する一般的なガイドは、[graphql.org/learn](https://graphql.org/learn)が良い出発点です。