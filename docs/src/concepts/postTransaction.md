# Posting Transactions
There are several ways to post transactions to Arweave. Each has its own unique affordances and constraints. The diagram below illustrates the four main approaches to posting transactions.

`Direct to Peer`,`Direct to Gateway`, `Bundled`, and `Dispatched`.

<img src="https://arweave.net/PQnMySn9x7vHhrlkBRZhwH93bZfeehPzp_c03diLmjk" width="550">

::: info INFORMATION
 <img src="https://arweave.net/UO8dtoT9P0txwVR9HrHDTVVLWDtMANpzszWl7b8KdP0" width="20" /> **Dropped Transactions:** When posting directly to Arweave there is the possiblity of dropped transactions. Always verify direct transactions have several confirmations before considering them permanent. Once posted if a transaction is not included in the subsequent ~30 blocks it is considered dropped.
 :::

 ::: tip
<img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> **Guaranteed Transactions:** When a transaction is posted to a bundling service, the service holds onto it until it is confirmed on-chain. If a transaction is not included in the current block the service re-posts the transaction with each new block until it is confirmed. 
 :::

## Direct Transactions
Transactions posted directly to Arweave (Layer 1) come in two varieties **wallet-to-wallet** transactions and **data** transactions. The first transfers **AR** tokens between wallet addresses. The second posts data to Arweave and pays the associated storage costs.

Interestingly, **data** transactions may also transfer **AR** tokens to a wallet address while paying storage costs at the same time. 

All transactions allow the user to specify up to 2KB worth of metadata in the form of [custom tags](./tags.md).



 ### Direct to Peer
Transactions may be posted directly to an Arweave peer (mining node). This is perhaps the most decentralized means of posting a transaction as clients can choose what peer they wish to post to. 

This approach is not without drawbacks. Peers may come and go making it difficult to reliably post transactions from an app. While it's possible to query a list of active peers and choose one before posting it adds overhead and friction to the process. Additionally, transactions posted to peers are only queryable at the gateway after being mined in a block. This introduces a 1-2 minute delay between posting the transaction to a peer and it being available to read in a browser from a gateway.

For the above reasons, developers tend to configure `arweave-js` to point to a gateway when posting direct transactions as the optimistic cache at the gateway makes the transaction available almost immediately.

  ### Direct to Gateway
   Gateways sit between clients and Arweave's network of peers. One of the primary functions of the gateway is to index transactions and optimistically cache the data posted to the network while waiting for it to be included in a block. This makes the transaction queryable in a "Pending" state almost instantly which allows applications built on top of a gateway to be more responsive. There is still a risk of transactions dropping out of the optimistic cache if they are not mined in a block by the peers.

  An example of how to post a direct transaction using `arwaeve-js` can be found [in this guide](../guides/posting-transactions/arweave-js.md).

## Bundled Transactions
Services that increase the scalability and performance of the underlying Arweave protocol are referred to as Layer 2 solutions. A bundler is one such service. Bundlers take multiple individual transactions and bundle them together into a single transaction that is posted to Layer 1. In this way a single transaction at the protocol level can contain tens of thousands of bundled transactions. There is one restriction, however, only **data** transactions can be included in a bundle. **Wallet-to-wallet** transactions (that transfer **AR** tokens between wallet addresses) must be done with direct transactions (Layer 1).

Another difference when using a bundling service like [bundlr.network](https://bundlr.network) is that you must make a small deposit on the bundler node you intend to use prior to posting transactions. This enables the bundler service to charge for many small (or large) uploads without the overhead of settling a Layer 1 **AR** tokens transfers each time.

[bundlr.network](https://bundlr.network) allows clients to make deposits in a number of [supported crypto currencies](https://docs.bundlr.network/docs/currencies).

::: tip
When transactions are posted to bundlr.network they are also appear in the optimistic cache of connected gateways so they are available to query in a matter of miliseconds.
:::

 An example of how to post bundled transactions using `bundlr.network/client` can be found [in this guide](../guides/posting-transactions/bundlr.md).

## Dispatched Transactions
Another way to post bundled layer 2 transactions is from the browser. While browsers enforce some constraints around the size of data that can be uploaded, browser based wallets are able to post transactions to Layer 2. Arweave browser wallets implement a `dispatch()` API method. If you are posting small transactions (100KB or less) you can use the wallets `dispatch()` method to take advantage of bundled transactions even if `bundlr.network/client` isn't packaged with your application.

 An example of how to post a 100KB or less bundled transaction with an Arweave wallets `dispatch()` method can be found [in this guide](../guides/posting-transactions/dispatch.md).
