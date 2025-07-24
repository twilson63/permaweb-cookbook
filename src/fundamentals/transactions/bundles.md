# Transaction Bundles

### What is a Bundle?

---

A transaction bundle is a special type of Arweave transaction. It enables multiple other transactions and/or data items to be bundled inside it. Because transaction bundles contain many nested transactions they are key to Arweave's ability to scale to thousands of transactions per second.

Users submit transactions to a bundling service, such as [turbo](https://ardrive.io/turbo-bundler/), which combines them into a 'bundle' with other transactions and posts them to the network.

### How Do Bundles Help Arweave?

---

#### Availability

Bundling services guarantee that bundled transactions are reliably posted to Arweave without dropping.

Transaction IDs of the bundled transactions are immediately made available, meaning the data can instantly be accessed as if it was already on the Arweave network.

#### Reliability

Transactions posted to Arweave can occasionally fail to confirm (resulting in a dropped transaction) due to a number of reasons, such as high network activity. In these instances transactions can become **orphaned**, i.e. stuck in the mempool and eventually removed.

Bundlers solve this problem by continually attempting to post bundled data to Arweave, assuring that it does not fail or get stuck in the mempool.

#### Scalability

Bundles can store up to 2<sup>256</sup> transactions, each of which are settled as a single transaction on Arweave. This makes Arweave blockspace scale to support almost any use case.

### What are Nested Bundles?

---

Bundles can include data items for uploading to Arweave and those data item can themselves be a bundle.

This means it is possible to upload a bundle of bundles, or in other words **nested bundles**.

Nested bundles have no theoretical limit on nesting depth, meaning that transaction throughput can be increased drastically.

Nested bundles might be useful for when you have different groups of bundled data that you want to guarantee reach Arweave altogether, and at the same time.

Sources and Further Reading:

[Ardrive Turbo](https://ardrive.io/turbo-bundler/)

[ANS-104 Standard](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)
