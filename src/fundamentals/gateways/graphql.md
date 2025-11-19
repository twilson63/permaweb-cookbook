# GraphQL Queries

GraphQL is particularly useful when needing to find the **metadata** of transactions or blocks, such as transaction IDs, tags, and more. 

When you need to access the actual data associated with a transaction, use the HTTP API or other relevant APIs/SDKs.

## Overview

Over time, indexing services that implement a GraphQL interface have became the preferred method for querying transaction data on Arweave. An indexing service reads transaction and block headers as they are added to the network (usually from a full Arweave node which the service operates). Once read, the header info is inserted into a database where it can be indexed and efficiently queried. The indexing service uses this database to provide a GraphQL endpoint for clients to query.

GraphQL has a few advantages that make it ideal for retrieving query data sets. It enables indexing services to create a single endpoint that can then be used to query all types data. The service is able to return multiple resources in a single request as opposed to making an HTTP request for each resource (like one would with a REST API). With GraphQL, clients can batch multiple requests in a single round-trip and specify exactly what data is needed which increases performance.

## Basic Query Example

The following GraphQL example queries all the transaction ids from a given owners wallet address that have a "Type" tag with a value of "manifest". For more information about tags, read the guide on [Transaction Tags](../transactions/tags.md).

```js:no-line-numbers
const queryObject = {
	query:
	`{
		transactions (
			owners:["${address}"],
			tags: [
			  {
					name: "Type",
					values: ["manifest"]
				}
			]
		) {
			edges {
				node {
					id
				}
			}
		}
	}`
};
const results = await arweave.api.post('/graphql', queryObject);
```

## Public Indexing Services

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## Resources

-   [Querying Arweave Guide](../../guides/querying-arweave/querying-arweave.md)
-   [ar-gql package](../../guides/querying-arweave/ar-gql.md)
-   [GraphQL Reference](../../references/gql.md)
