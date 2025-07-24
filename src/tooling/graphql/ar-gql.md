# ar-gql
This package is a minimal layer on top of GraphQL, it supports parameterized queries with query variables. It also implements management of paged results. 

## Installation

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

## Resources
* [ar-gql github page](https://github.com/johnletey/arGql)
