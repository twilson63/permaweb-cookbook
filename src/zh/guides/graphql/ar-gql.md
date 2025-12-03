# ar-gql

此套件是在 GraphQL 之上的一个最小封装层，支持使用查询变量的参数化查询，并实现分页结果的管理。

## 安装

要安装 `ar-gql`，请执行
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

## 示例

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

## 资源

- [ar-gql 的 GitHub 页面](https://github.com/johnletey/arGql)
