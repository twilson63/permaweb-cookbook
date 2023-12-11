# Irys Query Package

The Irys query package is a JavaScript abstraction that sits on top of GraphQL, enabling JavaScript and TypeScript developers to interact with GraphQL without directly engaging in its syntax.

In offers the same query functionality as native GraphQL, however most users find it significantly easier to use as it does not require learning a new language. You simply interact with it as you would any JavaScript library. 

## TL; DR

In this guide, you will learn

-   How the Irys query package works
-   How to query transaction metadata
-   How to query block information

## How It Works

Start by instantiating a new `Query` object, this is a shared instance you can reuse each time you want to execute a new query.

```js
const myQuery = new Query();
```

Then execute a query by chaining together a series of functions that collaboratively narrow down the results returned.

For example, to retrieve the 20 latest transactions with the tag `Content-Type` set to `image/png` on Irys:

```js
const results = await myQuery
	.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["image/png"] }])
	.sort("ASC")
	.limit(20);
```

Let's dive in and look at how to query transactions and block information.

## Installing / Importing

Start by installing either via npm or yarn.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install @irys/query
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add @irys/query
```

  </CodeGroupItem>
</CodeGroup>

## Querying Transactions

You can use the Irys query package to query transactions uploaded via Irys and also directly to Arweave, however, there are some key differences.

### Irys Transactions

When uploading to Arweave using Irys:

-   You can pay with [multiple different tokens](https://docs.irys.xyz/overview/supported-tokens)
-   Your upload is given a [millisecond-accurate timestamp](https://docs.irys.xyz/learn/receipts)

Both token and timestamp are queryable using the query package. 

This query searches for all transactions uploaded to Arweave using Irys, tagged as `image/png`, paid for with Solana, and happening during a slice of time from early July, 2023.

```js
import Query from "@irys/query";

const myQuery = new Query();
const results = await myQuery
	.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["image/png"] }])
	.token("solana")
	.fromTimestamp(new Date("2023-07-01T00:00:00.123"))
	.toTimestamp(new Date("2023-07-03T23:59:59.456"));
```

### Arweave Transactions

When searching transactions done directly on Arweave, the token and timestamp filters are not applicable, however, you can continue to search by tags and transaction ID. 

```js
import Query from "@irys/query";

const results = await myQuery
	.search("arweave:transactions")
	.tags([{ name: "Content-Type", values: ["image/png", "image/jpg"] }]);
```


Additionally, you can search by destination address in cases where there is a fund transfer.

```js
import Query from "@irys/query";

const results = await myQuery
	.search("arweave:transactions")
	.to("TrnCnIGq1tx8TV8NA7L2ejJJmrywtwRfq9Q7yNV6g2A");
```

## Querying Block Information

You can query for specific blocks by ID:

```js
import Query from "@irys/query";

const myQuery = new Query();
const results = await myQuery
	.search("arweave:blocks")
	.ids(["R0ZLe4RvHxLJLzI1Z9ppyYVWFyHW4D1YrxXKuA9PGrwkk2QAuXCnD1xOJe-QOz4l"]);
```

Or for blocks between a range of deadline heights. 

```js
import Query from "@irys/query";

const myQuery = new Query();
const results = await myQuery
	.search("arweave:blocks")
	.minHeight(1188272)
	.maxHeight(1188279);
```

## Downloading Data
Use the query package to search transaction metadata, then use the transaction ID to [download](https://docs.irys.xyz/developer-docs/downloading) the associated data from a gateway.

## Resources

- [Irys query package reference](/references/irysQueryPackage)
- [Irys query package](https://docs.irys.xyz/developer-docs/querying/query-package)
- [Irys query package video](https://www.youtube.com/watch?v=zD0XNzw90lc)
