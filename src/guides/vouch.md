# Vouch

There are a few ways to query an Arweave address to verify if it has been vouched by a service. Below is two of those approaches.
## VouchDAO Package
The `isVouched` function is made available to use in your applications in a straight-forward way.

#### Installation
Add the package:
<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm i vouchdao
```

</CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add vouchdao
```

</CodeGroupItem>
</CodeGroup>

#### Usage
Inside of an async function you can use the `isVouched` function which will return true if a user is vouched.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## Using GraphQL
You can query the Arweave network using GraphQL to find out if a given Arweave address has been vouched. 

```graphql
query {
  transactions(
    tags:{name:"Vouch-For", values:["ARWEAVE_ADDRESS"]}
  ) {
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

If the address has been vouched, an array of nodes will be returned with tags pertaining to the service that issues the ANS-109. You can cross reference the `owner address` value with the passed community votes to ensure the service has been verified through community vote via VouchDAO.

```graphql
"owner": {
 "address": "Ax_uXyLQBPZSQ15movzv9-O1mDo30khslqN64qD27Z8"
},
"tags": [
  {
    "name": "Content-Type",
    "value": "application/json"
  },
  {
    "name": "App-Name",
    "value": "Vouch"
  },
  {
    "name": "App-Version",
    "value": "0.1"
  },
  {
    "name": "Verification-Method",
    "value": "Twitter"
  },
  {
    "name": "Vouch-For",
    "value": "ARWEAVE_ADDRESS"
  }
]
```

## Resources
* [VouchDAO](https://vouch-dao.arweave.dev)
* [VouchDAO Contract](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
* [Arweave/GraphQL Playground](https://arweave.net/graphql)