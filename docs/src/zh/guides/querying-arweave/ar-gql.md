---
locale: zh
---
# ar-gql
这个软件包是在GraphQL之上的一个最小层，它支持带有参数的查询和查询变量。它还实现了分页结果的管理。

## 安装

要安装`ar-gql`，运行以下命令
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
* [ar-gql的GitHub页面](https://github.com/johnletey/arGql)