---
locale: ja
---
# ar-gql
このパッケージはGraphQLの上に構築された最小限のレイヤーで、クエリ変数を使用したパラメータ化クエリをサポートしています。また、ページネーションされた結果の管理も実装されています。

## インストール

To install `ar-gql run
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

## Example
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

## リソース
* [ar-gql GitHubページ](https://github.com/johnletey/arGql)