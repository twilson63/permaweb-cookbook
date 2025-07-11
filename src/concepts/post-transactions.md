# Posting Transactions😍

There are several ways to post transactions to Arweave. Each has its own unique affordances and constraints. The diagram below illustrates the four main approaches to posting transactions.

`Direct to Peer`,`Direct to Gateway`, `Bundled`, and `Dispatched`.

<img src="https://arweave.net/Z1eDDnz4kqxAkkzy6p5elMz-jKnlaVIletp-Tm6W8kQ" width="550">

::: tip <img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> Guaranteed Transactions
When posting a large quantity of transactions or when fast settlement time is desireable consider using a bundling service. Bundlers settle large volumes of transactions immediately and make the transaction data available within milliseconds. The bundling service holds onto posted transactions until they are confirmed on-chain. If the transactions are not included in the most recent block the bundling service re-posts them with each new block until they are recorded on chain with a sufficient number of confirmations.
:::

## Direct Transactions

Transactions posted directly to Arweave come in two varieties **wallet-to-wallet** transactions and **data** transactions. The first transfers **AR** tokens between wallet addresses. The second posts data to Arweave and pays the associated storage costs.

Interestingly, **data** transactions may also transfer **AR** tokens to a wallet address while paying storage costs at the same time.

All transactions allow the user to specify up to 2KB worth of metadata in the form of [custom tags](./tags.md).

### Direct to Peer

Transactions may be posted directly to an Arweave peer (mining node). This is perhaps the most decentralized means of posting a transaction as clients can choose what peer they wish to post to.

This approach is not without drawbacks. Peers may come and go making it difficult to reliably post transactions from an app. While it's possible to query a list of active peers and choose one before posting it adds overhead and friction to the process. Additionally, transactions posted to peers are only queryable at the gateway after being mined in a block. This introduces a 1-2 minute delay between posting the transaction to a peer and it being available to read in a browser from a gateway.

For the above reasons, developers tend to configure `arweave-js` to point to a gateway when posting direct transactions as the optimistic cache at the gateway makes the transaction available almost immediately.

### Direct to Gateway

Gateways sit between clients and Arweave's network of peers. One of the primary functions of the gateway is to index transactions and optimistically cache the data posted to the network while waiting for it to be included in a block. This makes the transaction queryable in a "Pending" state almost instantly which allows applications built on top of a gateway to be more responsive. There is still a risk of transactions dropping out of the optimistic cache if they are not mined in a block by the peers.

An example of how to post a direct transaction using `arweave-js` can be found [in this guide](../guides/posting-transactions/arweave-js.md).

## Bundled Transactions

Services built on top of Arweave that provide additional utility for Permaweb builders are sometimes called Permaweb Services. A bundler is one such service. Bundlers take multiple individual transactions and bundle them together into a single transaction that is posted directly to Arweave. In this way a single transaction at the protocol level can contain tens of thousands of bundled transactions. There is one restriction, however, only **data** transactions can be included in a bundle. **Wallet-to-wallet** transactions (that transfer **AR** tokens between wallet addresses) must be done as individual transactions posted directly to Arweave.

## Dispatched Transactions

Another way to post bundled transactions is from the browser. While browsers enforce some constraints around the size of data that can be uploaded, browser based wallets are able to post transactions to bundlers. Arweave browser wallets implement a `dispatch()` API method. If you are posting small transactions (100KB or less) you can use the wallets `dispatch()` method to take advantage of bundled transactions.

An example of how to post a 100KB or less bundled transaction with an Arweave wallets `dispatch()` method can be found [in this guide](../guides/posting-transactions/dispatch.md).

## Resources

-   [arweave-js](../guides/posting-transactions/arweave-js.md) example
-   [dispatch](../guides/posting-transactions/dispatch.md) example
-   [arseeding-js](../guides/posting-transactions/arseeding-js.md) example
