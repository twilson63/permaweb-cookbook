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

[https://knn3-gateway.knn3.xyz/arseeding/graphql](https://knn3-gateway.knn3.xyz/arseeding/graphql)

## Inspecting the Blocks

Each piece of data uploaded to Arweave has its own unique transaction id and is included in a unique block which is then added to the blockchain. The data associated with each transaction is split up into 256KB chunks and appended sequentially to Arweave's dataset. It is possible to walk back, block by block, from the [current block](https://arweave.net/block/current) and inspect each one for the transaction id in question. Once found, the chunks offsets can be retrieved from the block and used to request chunks directly from an Arweave peer. This is the lowest level way to locate and read data on the network. Thankfully, less labor intensive approaches [like GraphQL](#graphql) are available.

## Irys Query Package

The [Irys query package](https://docs.irys.xyz/developer-docs/querying/query-package) is a JavaScript abstraction that sits on top of GraphQL, enabling JavaScript and TypeScript developers to interact with GraphQL without directly engaging in its syntax.

It supports the same query functionality as native GraphQL [allowing you to search by](https://docs.irys.xyz/developer-docs/querying/query-package#query-type) transaction ID, [tags](https://docs.irys.xyz/developer-docs/tags), [payment token](https://docs.irys.xyz/overview/supported-tokens), transaction sender and block information.

You start by instantiating a new Query object and then filter your query by chaining together a series of filters. You can search transactions uploaded via Irys:

```js:no-line-numbers
const myQuery = new Query();
const results = await myQuery
	.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["image/png"] }])
	.sort("ASC")
	.limit(20);
```

Transactions on Arweave:

```js:no-line-numbers
const myQuery = new Query();
const results = await myQuery
	.search("arweave:transactions")
	.tags([{ name: "Content-Type", values: ["image/png", "image/jpg"] }]);
```

And Arweave block information.

```js:no-line-numbers
const myQuery = new Query();
const results = await myQuery
	.search("arweave:blocks")
	.minHeight(1188272)
	.maxHeight(1188279);
```

## ARQL

::: warning
ARQL is deprecated and replaced by GraphQL queries at a gateway or indexing service. Some peers may still honor ARQL requests but the availability and accuracy of results are not guaranteed.
:::
Arweave Query Language (ARQL) was used early on in Arweave's development. Along side blocks and chunks, peers also maintained a SQL database which indexed individual transactions. Clients could query a peer using ARQL and get back transaction data. The following is an example ARQL query syntax.

```js:no-line-numbers
let get_mail_query =
	{
		op: 'and',
		expr1: {
			op: 'equals',
			expr1: 'to',
			expr2: address
		},
		expr2: {
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'permamail'
		}
	}

const res = await this.arweave.api.post(`arql`, get_mail_query)
```

This approach to querying was sufficient the weave dataset was small and easy to index. As Arweave adoption accelerated, indexing the data set and responding to ARQL queries resulted in increasing computational costs. Over time as mining became more and more competitive, peers became less and less likely to be able to afford to offer the ARQL service. This ultimately became the impetus for indexing services and the [GraphQL querying](#graphql) common on Arweave today.

There is a pathway back to being able to query data directly from peers however. The [Permaweb Payments Protocol (P3)](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ) is a specification developed by the community to enable clients to pay for service. Using P3, peers wishing to offer indexing service could afford to operate it profitably it by charging for the service.

## Resources

-   [Querying Arweave Guide](../guides/querying-arweave/queryingArweave.md)
-   [ArDB package](../guides/querying-arweave/ardb.md)
-   [ar-gql package](../guides/querying-arweave/ar-gql.md)
-   [GraphQL Reference](../references/gql.md)
