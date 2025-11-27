# 使用 Dispatch 張貼交易

Arweave 瀏覽器錢包支援 dispatch 交易的機制。

如果交易大小小於 100KB，即可免費張貼到 Arweave！

## 使用 Dispatch 張貼交易

這可以在用戶端應用程式不需任何套件相依性的情況下完成。只要使用者有啟用的瀏覽器錢包，且資料小於 100KB，dispatch 的交易就是免費的，且保證會在網路上被確認。

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

## 資源

- 如需瞭解所有可用來張貼交易的方式概覽，請參閱 cookbook 的 [張貼交易](../../fundamentals/post-transactions.md) 章節。
