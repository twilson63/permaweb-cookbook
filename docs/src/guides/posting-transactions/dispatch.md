## Dispatching a Transaction
This can be done without any package dependences for the client app. As long as the user has a browser wallet active and the data is less than 100KB, dispatched transactions are free and guaranteed to be confirmed on the network.

```js
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
* For an overview of all the ways you can post transactions, see the [Posting Transactions](../../concepts/postTransaction.md) section of the cookbook.