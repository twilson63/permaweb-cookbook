# 使用 Dispatch 发布交易

Arweave 浏览器钱包支持 Dispatch 交易的机制。

如果交易大小小于 100KB，即可免费发布到 Arweave！

## 使用 Dispatch 发布交易

这可以在客户端应用程序无需任何依赖项的情况下完成。只要用户启用了浏览器钱包，且数据小于 100KB，Dispatch 的交易就是免费的，并且保证会在网络上被确认。

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

## 资源

- 如需了解所有可用于发布交易的方式概览，请参阅 cookbook 的 [发布交易](../../fundamentals/post-transactions.md) 章节。
