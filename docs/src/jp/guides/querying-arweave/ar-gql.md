---
locale: jp
---
# ar-gql
このパッケージはGraphQLの上に最小限のレイヤーを提供します。クエリ変数を使用したパラメータ化されたクエリのサポートも行っています。また、ページングされた結果の管理も実装されています。

## インストール

`ar-gql`をインストールするには、以下のコマンドを実行します。
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

## 例
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
* [ar-gqlのGitHubページ](https://github.com/johnletey/arGql)