# ar-gql

此套件是在 GraphQL 之上的一個最小封裝層，支援使用查詢變數的參數化查詢，並實作分頁結果的管理。

## 安裝

要安裝 `ar-gql`，請執行
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

## 範例

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

## 資源

- [ar-gql 的 GitHub 頁面](https://github.com/johnletey/arGql)
