# Transaction Tags

Like an immutable hard drive, Arweave storage is made up of data-items or transactions, these units of data are similar to files on a computer. Every data-item or transaction has defined identification information. A unique identifier, a signature, the wallet address that signed the transaction, the block height. There is an additional need or a mechanism to categorize these transactions for retrieval. This is where the concept of `Tags` come into existence. In the Arweave decentralized storage network, each transaction can have one or more tags associated with it. These tags are used to categorize and label transactions, and they can be used to query for specific transactions or groups of transactions within the network.

## What are Transaction Tags?

Transaction tags are key-value pairs, where the combination of base64 keys and values must be less than the maxium of 2048 bytes for a layer 1 transaction and less than a maxiumu of 4096 for a layer 2 data-item. Some common examples of transaction tags include:

* `Content-Type`: Used to specify the MIME type of content for render on the permaweb.
* `App-Name`: This tag describes the app that is writing the data
* `App-Version`: This tag is the version of the app, paired with App-Name
* `Unix-Time`: This tag is the a unix timestamp, **seconds** since epoch.
* `Title`: Used to give a name or brief description of the content stored in the transaction.
* `Description`: Used to provide a longer description of the content.

Transaction tags can be used for a variety of purposes, such as indexing transactions for search, organizing transactions into categories, or providing metadata about the content stored in a transaction.

## Some good things to know about Transaction Tags

Transaction tags are encoded into 64 byte strings for both the key and value, this does not mean they are encrypted anyone can easily decode them.

The max total size of Transaction tags for a Layer 1 transaction is 2048 bytes, this is the concatenation of all keys and all values of the transaction tags.

Transaction tags on a data-item in a bundle must be less than 4096 bytes.

Transaction tags can be used in GraphQL queries to return a filtered set of transaction items.

## Common Tags used in the community

| Tag Name | Description | Use Cases |
| -------- | ----------- | --------- |
| App-Name | Most commonly used for SmartWeave Identifiers | Common values are SmartWeaveContract, SmartWeaveAction, and SmartWeaveContractSource |
| App-Version | The version of this data, it may represent the app consuming this information | 0.3.0 is the current SmartWeave Version |
| Content-Type | MIME Type to identify the data contained in the transaction | text/html, application/json, image/png |
| Unix-Time | This tag is the a unix timestamp, **seconds** since epoch | The time the transaction is submitted |
| Title | ANS-110 Standard for describing content | Providing a name for an Atomic Asset |
| Type | ANS-110 Standard for categorization of data | a type can classify a permaweb asset | 

## Examples

<CodeGroup>
  <CodeGroupItem title="arweave">

```ts
const tx = await arweave.createTransaction({ data: mydata })
tx.addTag('Content-Type', 'text/html')
tx.addTag('Title', 'My incredible post about Transaction Tags')
tx.addTag('Description', 'This is one post you do not want to miss!')
tx.addTag('Topic:Amazing', 'Amazing')
tx.addTag('Type', 'blog-post')


await arweave.transactions.sign(tx, jwk)
await arweave.transactions.post(tx)
```

  </CodeGroupItem>
  <CodeGroupItem title="@bundlr-network/client">

```js
await bundlr.upload(mydata, [
  { name: 'Content-Type', value: 'text/html' },
  { name: 'Title', value: 'My incredible post about Transaction Tags' },
  { name: 'Description', value: 'This one post you do not want to miss!' },
  { name: 'Topic:Amazing', value: 'Amazing' },
  { name: 'Type', value: 'blog-post' }
])
```

  </CodeGroupItem>
</CodeGroup>

## Summary

Understanding how Transaction Tags work in the permaweb ecosystem can provide context on how to solve problems using the permaweb as an application platform. Tags provide a tool to consume and create common data standards and patterns to encourage a non-rivalous data experience on the permaweb. The result gives users of the ecosystem the choice of applications to consume and create content as their data is always with the user not the application.