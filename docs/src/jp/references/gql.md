---
locale: jp
---
# トランザクションのための完全なGraphQL構造
次のGraphQLクエリは、インデックスサービスによってキャプチャされたトランザクションのすべてのプロパティを返します。

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

## ページネーション
デフォルトでは、GraphQLクエリは最初の10件の結果を返します。より大きな結果セットを要求するには、トランザクションクエリに`first: X`オプション（`X`は1から100の値）を追加します。
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
結果セットに100件以上のアイテムがある場合、カーソルを使用して結果の後続ページを取得できます。
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
後続の結果ページがある場合、 `hasNextPage` の値は `true` になります。結果セット内の最後のアイテムの `cursor` の値を取得し、 `after` クエリパラメータの値として使用します。
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
結果セット全体を取得するには、各ページの最後のアイテムからの更新された `cursor` の値を使用して `after` クエリを繰り返し実行し、 `hasNextPage` が `false` になるまで続けます。

## レート制限
インデックスサービスは、攻撃やサービスの乱用を防ぐためにレート制限を実装します。`arweave.net/graphql` サービスでは、GraphQLクエリをIPアドレスごとに5分ごとに600件制限しています。レスポンスをパースする前に、クエリの結果にステータスコードが200番台であるかどうかを常に確認してください。ステータスコードが429の場合、レート制限が適用されていることを示します。ステータスコードが503の場合、クエリの結果セットが `arweave.net/graphql` に対して大きすぎることを示します。

## リソース
* ArweaveのGraphQLスキーマの詳細なリストについては、[Arweave GraphQL Guide](https://gql-guide.arweave.dev)を参照してください。
* [ArDBパッケージ](../guides/querying-arweave/ardb.md)
* [ar-gqlパッケージ](../guides/querying-arweave/ar-gql.md)
* GraphQLの一般的なガイドについては、[graphql.org/learn](https://graphql.org/learn)が良い出発点です。