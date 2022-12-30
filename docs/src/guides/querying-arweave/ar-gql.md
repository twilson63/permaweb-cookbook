# ar-gql
This package is a minimal layer on top of GraphQL, it supports parameterized queries with query variables. It also implements management of paged results. 

## Installation
Add the package using npm:
```console:no-line-numbers
npm i ar-gql
```
or yarn:
```console:no-line-numbers
yarn add ar-gql
```

## Example
```js:no-line-numbers
import * as argql from "ar-gql"

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