---
locale: ja
---
# 検索インデックスサービス

TL;DR

- Arweave GraphQLとの後方互換性のある構文
- 複雑なクエリ（例えばマルチタグ検索）のためのより高速な応答時間
- 追加のクエリオプション
---

[Goldsky](https://goldsky.com)の無料検索サービスは、Arweaveのブロックとトランザクションを横断して複雑なクエリをより迅速に検索できる最適化されたバックエンドを利用しており、あいまい検索やワイルドカード検索のユースケースに役立つ追加のクエリ構文も導入しています。

検索GraphQL構文は、[Arweave GraphQL構文](./querying-arweave.md)のスーパーセットです。完全に後方互換性があり、同じクエリに対して同じ結果を返しますが、便利な追加の修飾子があります。

- 柔軟なタグフィルター
  - タグ名または値だけを検索
- 高度なタグフィルター
  - あいまい検索
  - ワイルドカード検索
- L1トランザクションのみをフィルタリング
- 結果セットの総カウント

カスタムニーズや機能アイデアがある場合は、GoldskyチームにメールまたはDiscordでお気軽にお問い合わせください！ 


## 検索ゲートウェイエンドポイント

現在、この構文を持つ唯一のサービスはGoldskyがホストしています。誰かが同じ構文で独自のゲートウェイをホストしたい場合は、[Goldsky](https://goldsky.com)にお問い合わせください。

- [Goldsky検索サービス](https://arweave-search.goldsky.com/graphql)

## 機能

### 柔軟なタグフィルター

検索ゲートウェイ構文はそれほど厳密ではなく、タグ名または値だけを検索できます。

#### 例
タグ値が「cat」のトランザクションを検索

```graphql:no-line-numbers
query just_values {
  transactions(
    first: 10,
    tags: [
      {
        values: ["cat"]
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

Search for transactions that have an `In-Response-To-ID`

```graphql:no-line-numbers
query just_name {
  transactions(
    first: 10,
    tags: [
      {
        name: "In-Response-To-ID"
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


### Advanced tag filters

The Search Gateway Syntax offers an additional parameter to the tag filter, `match`.

| Match value | Description | 
|-------------|-------------|
| EXACT | (default) exact matches only. |
| WILDCARD | Enables * to match any amount of characters, ie. `text/*` |
| FUZZY_AND | Fuzzy match containing all search terms |
| FUZZY_OR | Fuzzy match containing at least one search term |


Open up the playground and try some of the following queries!

Searching all transactions with an image content type using a wildcard
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: "image/*", match: WILDCARD}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### あいまい検索

あいまい検索は非常に強力で、多くのバリエーションを持つ「類似」テキストを検索できます。 

「cat」または「dog」（またはCAT、doG、cAts、CAAtsなど）を持つすべてのトランザクションを検索します。タグには少なくともcatに似たまたはdogに似た用語が含まれている可能性があります。

```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_OR"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

catに似たおよびdogに似たタグ値を持つトランザクションを検索します
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_AND"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### Exclude Bundled (L2) Transactions

Simply set `bundledIn: NULL`

```graphql:no-line-numbers
query just_l1 {
  transactions(
    first: 10,
    bundledIn: null
  ) 
  {
    edges {
      node {
        id
        signature
        owner {
          address
        }
        block {
          height
        }
      }
    }
  }
}
```


### クエリに基づく総カウントを取得する

特定のフィルタセットに合致するトランザクションがいくつあるかを理解したい場合は、`count`フィールドを使用します。これにより、追加の最適化されたカウント操作がトリガーされます。クエリを返すのにかかる時間がほぼ倍増するため、必要なときだけ使用してください。 

```graphql:no-line-numbers
query count_mirror {
  {
  	transactions(tags:{values:["MirrorXYZ"]})
      {
        count
      }
  }
}
```
