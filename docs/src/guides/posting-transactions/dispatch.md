# Posting a Transaction using Dispatch
Arweave Browser wallets have the concept of dispatching transactions. If the transaction is under 100KB in size it can be posted for free!
## Dispatching a Transaction
This can be done without any package dependencies for the client app. As long as the user has a browser wallet active and the data is less than 100KB, dispatched transactions are free and guaranteed to be confirmed on the network.

```js:no-line-numbers
// use arweave-js to create a transaction
let tx = await arweave.createTransaction({ data:"Hello World!" })

// add some custom tags to the transaction
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// use the browser wallet to dispatch() the transaction
let result = await window.arweaveWallet.dispatch(tx);

// log out the transactino id
console.log(result.id);
```

## Resources
* For an overview of all the ways you can post transactions, see the [Posting Transactions](../../concepts/post-transactions.md) section of the cookbook.