# Querying Transactions

It isn't enough to store data permanently, for Arweave to be useful the data also needs to be discoverable and retrievable. This guide summarizes the different approaches to querying data on Arweave.

## GraphQL

Over time, indexing services that implement a GraphQL interface have became the preferred method for querying transaction data on Arweave. An indexing service reads transaction and block headers as they are added to the network (usually from a full Arweave node which the service operates). Once read, the header info is inserted into a database where it can be indexed and efficiently queried. The indexing service uses this database to provide a GraphQL endpoint for clients to query.

GraphQL has a few advantages that make it ideal for retrieving query data sets. It enables indexing services to create a single endpoint that can then be used to query all types data. The service is able to return multiple resources in a single request as opposed to making an HTTP request for each resource (like one would with a REST API). With GraphQL, clients can batch multiple requests in a single round-trip and specify exactly what data is needed which increases performance.

The following GraphQL example queries all the transaction ids from a given owners wallet address that have a "Type" tag with a value of "manifest". For more information about tags, read the guide on [Transaction Tags](tags.md).

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

### Public Indexing Services

[https://arweave.net/graphql](https://arweave.net/graphql)

[https://arweave-search.goldsky.com/graphql](https://arweave-search.goldsky.com/graphql)

## Inspecting the Blocks

Each piece of data uploaded to Arweave has its own unique transaction id and is included in a unique block which is then added to the blockchain. The data associated with each transaction is split up into 256KB chunks and appended sequentially to Arweave's dataset. It is possible to walk back, block by block, from the [current block](https://arweave.net/block/current) and inspect each one for the transaction id in question. Once found, the chunks offsets can be retrieved from the block and used to request chunks directly from an Arweave peer. This is the lowest level way to locate and read data on the network. Thankfully, less labor intensive approaches [like GraphQL](#graphql) are available.

## Resources

-   [Querying Arweave Guide](../guides/querying-arweave/queryingArweave.md)
-   [ar-gql package](../guides/querying-arweave/ar-gql.md)
-   [GraphQL Reference](../references/gql.md)
