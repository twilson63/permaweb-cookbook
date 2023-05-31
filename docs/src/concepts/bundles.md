# Transaction Bundles

### What is a Bundle?

---

Bundles are groups of transactions or data items to be uploaded to Arweave. 

Bundles are submitted to a layer 2 network, such as [Bundlr](https://bundlr.network), who post the grouped transactions as a single 'bundle' to Arweave (Layer 1).

### How Do Bundles Help Arweave?

---

#### Availability

Bundled transactions are guaranteed to be settled on Arweave.

The transaction ID of the bundle is immediately made available, meaning the data can instantly be accessed as if it was already on the Arweave network.


#### Reliability 

Transactions posted to Arweave can occasionally fail to confirm due to a number of reasons, such as high network activity. In these instances transactions can become **orphaned**, i.e. stuck in the mempool and eventually removed.

Bundlers solve this problem by continually attempting to post your bundled data to Arweave, assuring that it does not fail or get stuck in the mempool. It also guarantees that **all** of your bundled data arrives together.

#### Scalability 

Bundles can store up to 2^256 transactions, each of which are settled as a single transaction on Arweave. This makes Arweave essentially infinitely scalable.

#### Flexibility

As bundles are handled by a layer 2 network, this opens up opportunity for different kinds of payment channels (such as eth, matic, solana) to pay for uploading data to Arweave.

### What are Nested Bundles?

---

Bundles take data items to be uploaded to Arweave, and the data item itself can be a bundle.

This means it is possible to upload a bundle of bundles, or in other words **nested bundles**.

Nested bundles have no theoretical limit on nesting depth, meaning that transaction throughput can be increased drastically.

Nested bundles might be useful for when you have different groups of bundled data that you want to guarantee reach Arweave altogether, and at the same time.

Sources and Further Reading:

[Bundlr Docs](https://docs.bundlr.network)

[ANS-104 Standard](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)
