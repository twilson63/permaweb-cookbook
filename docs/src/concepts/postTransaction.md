# Posting Transactions
There are several ways to post transactions to the Arweave network. Each way has its own unque constraints and affordances. The diagram below illustrates the four main pathways for posting transactions.

<img src="https://arweave.net/qy97_UEV1vEDasGLeaXSwKJi2lnCcg_aggDFxN1jPB8" width="550">

## Direct Transactions
Transactions posted directly to Arweave (Layer 1) come in two varieties **wallet-to-walet** transactions and **data** transactions. The first is used to transfer AR tokens between wallet addresses. The second is used to store data on the network and pay the associated storage costs.

Interestingly, **data** transactions may also transfer AR tokens to a target wallet while paying storage costs at the same time. All transactions allow the user to specify up to 2KB worth of metadata in the form of [custom tags](./tags.md).

::: warning
 <img src="https://arweave.net/oCB5CRFUk0HeLQ97Xqb5Msty4EppmB6zG5ScsS84-Nw" width="20" /> **Dropped Transactions:** When posting transactions directly to Layer 1 there is the possiblity of these transactions being dropped. This can happen for a variety of reasons. Always be sure to verify your direct transactions have several confirmations before considering them permanent. Once posted a transaction must be included in one of the subsequent 30 blocks or it is considered dropped.
 :::
 ::: tip
<img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> **Guaranteed Transactions:** When transactions are posted via a bundling service, the service holds onto the transaction and its data until it is confirmed and re-posts the transaction for each new block until it is confirmed. 
 :::

 ### Direct to Peer
 It is possible to post transactions directly to an Arweave Peer though by default `arweave-js` will post to a user configurable gateway. There are a few reasons for this, one is that peers come and go, secondly by posting it directly to a peer gateways will only find out about the transaction and data after it has been included in a block and mined. As a result it may tak several minutes before the data is queryable at the gateway.

  ### Direct to Gateway
  This the default pathway for `arweave-js`. Gateways sit between the user and Arweaves network of peers.  One of the primary functions of the gateway is to index transactions and optimistically cache the data posted to the network while waiting for it to be included in a block. This makes the transaction queryiable in a "Pending" state almost instantly which allows applications built ontop of a gateway to be more responsive. There is still a risk of transactions dropping out of the optimistic cache if they are not included in a block by the peers.

  An example of how to post a direct transaction using `arwaeve-js` can be found [in this guide](../guides/posting-transactions/arweave-js.md).

## Bundled Transactions
Services that increase the scaleability and performance of the underlying Arweave protocol are referred to as Layer 2 solutions. A bundler is one such service. Bundlers take multiple individual transactions and bundle them together into a single transaction that is posted to Layer 1. In this way a single transaction at the protocol level can contain tens of thousands of bundled transactions. There is one restriction, however, only **data** transactions can be included in a bundle. **Wallet-to-wallet** transactions (that transfer AR tokens between wallets) must be done at the protocol level (Layer 1).

Another difference when using a bundling service like [bundlr.network](https://bundlr.network) is that you must make a small depost on the bundler you intend to use prior to posting transactions. This enables the bundler service to charge for small transactions without resorting to posting a Layer 1 transaction to transfer AR each time.

Bundlr.network allows clients to make deposts in a number of [supported crypto currencies](https://docs.bundlr.network/docs/currencies).

::: tip
When transactions are posted to bundlr.network they are also appear in the cache of connected gateways so they are available to query in a matter of miliseconds.
:::

 An example of how to post bundled transactions using `bundlr.network/client` can be found [in this guide](../guides/posting-transactions/bundlr.md).

## Dispatched Transactions
Another way to post layer 2 transactions is from the browser. While browsers enforce some constraints around the size of data that can be uploaded, browser based wallets are able to post transactions to Layer 2. Arweave browser wallets implement a `dispatch()` API method. If you are posting small transactions (100KB or less) you can use the wallets `dispatch()` method to take advantage of bundled transactions even if `bundlr.network/client` isn't packaged with your application.

 An example of how to post a 100KB or less bundled transaction with an Arweave wallets `dispatch()` method can be found [in this guide](../guides/posting-transactions/dispatch.md).
