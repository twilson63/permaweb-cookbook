# Transaction Metadata (Tags)

Transactions on Arweave have a unique ID, signature, and owner address for the address that signed and paid for the transaction to be posted. 

Along with those header values, the Arweave protocol allows users to tag transactions with custom tags. These are specified as a collection of `key: value` pairs appended to the transaction. 

Custom tags make it possible to query Arweave and find all the transactions that include a particular tag or tags. The ability to query and filter transactions is critical to supporting apps built on Arweave.

## What are Transaction Tags?

Transaction tags are key-value pairs, where the combination of base64URL keys and values must be less than the maximum of 2048 bytes for an Arweave native transaction.

Some common examples of transaction tags include:

-   `Content-Type`: Used to specify the MIME type of content for render on the permaweb.
-   `App-Name`: This tag describes the app that is writing the data
-   `App-Version`: This tag is the version of the app, paired with App-Name
-   `Unix-Time`: This tag is the a unix timestamp, **seconds** since epoch.
-   `Title`: Used to give a name or brief description of the content stored in the transaction.
-   `Description`: Used to provide a longer description of the content.

Transaction tags can be used for a variety of purposes, such as indexing transactions for search, organizing transactions into categories, or providing metadata about the content stored in a transaction.

## Some good things to know about Transaction Tags

Transaction tags are encoded as Base64URL encoded strings for both the key and value. This makes it possible to post arrays of bytes as keys or values and transfer them safely over http. While it's not human readable without decoding, it shouldn't be considered encryption.

The max total size of Transaction tags for transaction posted directly to Arweave is 2048 bytes. This size is determined by the concatenation of all keys and all values of the transaction tags.

Transaction tags can be used in GraphQL queries to return a filtered set of transaction items.

## Examples

```ts
const tx = await arweave.createTransaction({ data: mydata });
tx.addTag("Content-Type", "text/html");
tx.addTag("Title", "My incredible post about Transaction Tags");
tx.addTag("Description", "This is one post you do not want to miss!");
tx.addTag("Topic:Amazing", "Amazing");
tx.addTag("Type", "blog-post");

await arweave.transactions.sign(tx, jwk);
await arweave.transactions.post(tx);
```

## Summary

Tags provide a tool to consume and create common data standards and patterns to encourage a non-rivalous data experience on the Permaweb. 

The result gives users of the ecosystem the choice of applications to consume and create content, as their data is always with the user not the application.
