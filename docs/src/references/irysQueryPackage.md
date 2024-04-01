# Irys Query Package

The Irys query package is a JavaScript abstraction that sits on top of GraphQL, enabling JavaScript and TypeScript developers to interact with GraphQL without directly engaging in its syntax.

## Installation

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

## Importing

Import with:

```js
import Query from "@irys/query";
```

## Query location (mainnet, devnet, arweave)

The `Query` class defaults to querying Irys' mainnet. To search Irys' devnet or Arweave, use the `network` parameter.

### Irys mainnet

```js
// Either will work
const myQuery = new Query();
const myQuery = new Query({ network: "mainnet" });
```

### Irys devnet

```js
const myQuery = new Query({ network: "devnet" });
```

### Arweave

```js
const myQuery = new Query({ network: "arweave" });
```

## Query Type

Using the `Query` class users can search any of:

- Irys transactions
- Arweave transactions
- Arweave blocks

The search location is specified by passing a parameter to the [`search()`](/developer-docs/query-sdk/api/search) function.

```js
const results = await myQuery.search("irys:transactions");
```

The selected search type influences the [returned fields](/developer-docs/querying/query-package#limiting-fields-returned) and the availability of specific query functions.

|                                          | Function | irys:transactions | arweave:transactions | arweave:blocks |
| ---------------------------------------- | -------- | ----------------- | -------------------- | -------------- |
| [`search()`](./api/search)               | Yes      | Yes               | Yes                  |
| [`tags()`](./api/tags)                   | Yes      | Yes               | No                   |
| [`ids()`](./api/ids)                     | Yes      | Yes               | Yes                  |
| [`from()`](./api/from)                   | Yes      | Yes               | No                   |
| [`to()`](./api/to)                       | No       | Yes               | No                   |
| [`token()`](./api/token)                 | Yes      | No                | No                   |
| [`fromTimestamp()`](./api/fromTimestamp) | Yes      | No                | Yes                  |
| [`toTimestamp()`](./api/toTimestamp)     | Yes      | No                | Yes                  |
| [`minHeight()`](./api/minHeight)         | No       | No                | Yes                  |
| [`maxHeight()`](./api/maxHeight)         | No       | No                | Yes                  |
| [`sort()`](./api/sort)                   | Yes      | Yes               | Yes                  |
| [`limit()`](./api/limit)                 | Yes      | Yes               | Yes                  |
| [`stream()`](./api/stream)               | Yes      | Yes               | Yes                  |
| [`fields()`](./api/fields)               | Yes      | Yes               | Yes                  |

## Timestamp

Use the `fromTimestamp()` and `toTimestamp()` functions to search for transactions by timestamp. Results returned are `>= fromTimestamp` and `< toTimestamp`.

You can search by passing `Date` objects to the functions:

```js
const results = await myQuery
	.search("irys:transactions")
	.fromTimestamp(new Date("2023-07-01"))
	.toTimestamp(new Date("2023-07-03"));
```

Or by using UNIX timestamps in millisecond format:

```js
const results = await myQuery.search("irys:transactions").fromTimestamp(1688144401000).toTimestamp(1688317201000);
```

Irys timestamps are accurate to the millisecond, so you need to provide a timestamp in millisecond format. You can convert from human-readable time to UNIX timestamp using websites like [Epoch101](https://www.epoch101.com/), be sure to convert in **millisecond** format, not **second**.

## Tags

Use the `tags()` function to search [metadata tags](https://docs.irys.xyz/developer-docs/tags) attached to transactions during upload.

Search for a single tag name / value pair:

```js
const results = await myQuery.search("irys:transactions").tags([{ name: "Content-Type", values: ["image/png"] }]);
```

Search for a single tag name with a list of possible values. The search uses OR logic and returns transactions tagged with ANY provided value.

```js
const results = await myQuery
	.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["image/png", "image/jpg"] }]);
```

Search for multiple tags. The search uses AND logic and returns transactions tagged with ALL provided values.

```js
const results = await myQuery.search("irys:transactions").tags([
	{ name: "Content-Type", values: ["image/png"] },
	{ name: "Application-ID", values: ["myApp"] },
]);
```

You can also search Arweave by tags:

```js
const results = await myQuery
	.search("arweave:transactions")
	.tags([{ name: "Content-Type", values: ["image/png", "image/jpg"] }]);
```

## Transaction ID

Use the `ids()` function to by transaction ID. The search uses OR logic and returns transactions tagged with ANY provided value:

```js
const results = await myQuery
	.search("irys:transactions")
	.ids(["xXyv3u9nHHWGiMJl_DMgLwwRdOTlIlQZyqaK_rOkNZw", "_xE7tG1kl2FgCUDgJ5jNJeVA6R5kuys7A6f1qfh9_Kw"]);
```

You can also search Arweave by transaction ID.

```js
const results = await myQuery
	.search("arweave:transactions")
	.ids(["xXyv3u9nHHWGiMJl_DMgLwwRdOTlIlQZyqaK_rOkNZw", "_xE7tG1kl2FgCUDgJ5jNJeVA6R5kuys7A6f1qfh9_Kw"]);
```

## Transaction Sender

Use the `from()` function to search by wallet addresses used when signing and paying for the upload. When searching Irys transactions, you can supply an address from any of [Irys' supported chains](https://docs.irys.xyz/overview/supported-tokens).

The search employs OR logic, returning transactions tagged with ANY provided value:

```js
const results = await myQuery
	.search("irys:transactions")
	.from(["UsWPlOBHRyfWcbrlC5sV3-pNUjOQEI5WmDxLnypc93I", "0x4adDE0b3C686B4453e007994edE91A7832CF3c99"]);
```

When searching Arweave by transaction sender, only Arweave addresses are accepted:

```js
const results = await myQuery.search("arweave:transactions").from(["TrnCnIGq1tx8TV8NA7L2ejJJmrywtwRfq9Q7yNV6g2A"]);
```

## Transaction Recipient

Use the `to()` function to search for the wallet address of the transaction recipient. This works on Arweave only and is used when there's a fund transfer.

```js
const results = await myQuery.search("arweave:transactions").to("TrnCnIGq1tx8TV8NA7L2ejJJmrywtwRfq9Q7yNV6g2A");
```

## Token

Irys accepts payment in 14 different tokens, these are all searchable using the `token()` function. Any of [these values](https://docs.irys.xyz/overview/supported-tokens) are acceptable.

```js
const results = await myQuery.search("irys:transactions").token("solana");
```

## Block ID

Use the `ids()` function to search for Arweave blocks with the specified IDs.

```js
const results = await myQuery
	.search("arweave:blocks")
	.ids(["R0ZLe4RvHxLJLzI1Z9ppyYVWFyHW4D1YrxXKuA9PGrwkk2QAuXCnD1xOJe-QOz4l"]);
```

## Block Height

Use the `minHeight()` and `maxHeight()` functions to search for blocks within the specified block height range. Results are `>= minHeight and < maxHeight`.

```js
const results = await myQuery.search("arweave:blocks").minHeight(1188272).maxHeight(1188279);
```

Or for transactions within the specified block height range. Results are `>= minHeight and < maxHeight`.

```js
const results = await myQuery.search("arweave:transactions").minHeight(1188272).maxHeight(1188279);
```

## Sorting

Use the `sort()` function to sort results by timestamp in ascending order:

```js
const results = await myQuery.search("irys:transactions").token("ethereum").sort("ASC");
```

or descending order:

```js
const results = await myQuery.search("irys:transactions").token("matic").sort("DESC");
```

## First Result

Use the `first()` function to return only the first result:

```js
const results = await myQuery
	.search("irys:transactions")
	.tags([{ name: "Content-Type", values: ["image/png"] }])
	.first();
```

## Limiting Search Results

Use the `limit()` function to limit the maximum number of results returned. This overrides the default value of 1000 results when searching Irys and 100 when searching Arweave directly.

```js
const results = await myQuery
	.search("irys:transactions")
	.ids(["xXyv3u9nHHWGiMJl_DMgLwwRdOTlIlQZyqaK_rOkNZw", "_xE7tG1kl2FgCUDgJ5jNJeVA6R5kuys7A6f1qfh9_Kw"])
	.limit(20);
```

## Pagination / Streaming

Use the `stream()` function to manage large results sets. This function returns an iterable stream that continuously yields results as long as your query keeps producing them.

```js
// Create the stream
const stream = await myQuery.search("irys:transactions").token("solana").stream();

// Iterate over the results
for await (const result of stream) {
	console.log(result);
}
```

## Limiting Fields Returned

Use the `fields()` function to limit the fields returned. To limit the results, set a field's value to `false` or omit it entirely.

The fields available for retrieval depend on the search type. When searching `irys:transactions`, the following fields are available:

```js
.fields({
	id: true, // Transaction ID
	token: true, // Token used for payment
	address: true, // Cross-chain address used for signing and payment
	receipt: {
		deadlineHeight: true, // The block number by which the transaction must be finalized on Arweave
		signature: true, // A signed deep hash of the JSON receipt
		timestamp: true, // Timestamp, millisecond accurate, of the time the uploaded was verified
		version: true, // The receipt version, currently 1.0.0
	},
	tags: { // An array of tags associated with the upload
		name: true,
		value: true,
	},
	signature: true, // A signed deep hash of the JSON receipt
	timestamp: true, // Timestamp, millisecond accurate, of the time the uploaded was verified
})
```

When searching by `arweave:transactions` the following fields are available:

```js
.fields({
	id: true, // Transaction ID
	tags: {
		// Tags associated with the upload
		name: true,
		value: true,
	},
	anchor: true,
	block: {
		height: true, // Block height
		id: true, // Block ID
		previous: true, // Todo
		timestamp: true, // Block timestamp
	},
	bundledIn: {
		id: true,
	},
	data: {
		size: true, // Data size
		type: true, // Date type
	},
	fee: {
		ar: true, // Fee paid in AR
		winston: true, // Fee paid in Winston
	},
	owner: {
		address: true, // Transation originator
		key: true, // Public key
	},
	quantity: {
		ar: true, // Amount of AR transferred (for token transfers)
		winston: true, // Amount of AR transferred (for token transfers)
	},
	recipient: true, // Transfer recipient (for token transfers)
	signature: true, // Transaction signature
})
```

When searching by `arweave:blocks` the following fields are available:

```js
.fields({
	height: true,
	id: true,
	previous: true,
	timestamp: true,
})
```

## Resources

- [Querying On Irys](https://docs.irys.xyz/developer-docs/querying)
- [Irys Query Package](https://docs.irys.xyz/developer-docs/querying/query-package)
- [Irys Query Package Video](https://www.youtube.com/watch?v=zD0XNzw90lc)
