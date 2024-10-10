---
locale: ja
---
# Dispatchを使用したトランザクションの投稿

Arweaveのブラウザウォレットには、トランザクションをディスパッチするという概念があります。トランザクションが100KB未満の場合、無料で投稿できます！

## トランザクションのディスパッチ

クライアントアプリに依存するパッケージは必要ありません。ユーザーがブラウザウォレットをアクティブにしており、データが100KB未満であれば、ディスパッチされたトランザクションは無料で、ネットワーク上での確認が保証されます。




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

## リソース
* トランザクションを投稿するためのすべての方法の概要については、操作マニュアルの[Posting Transactions](../../concepts/post-transactions.md)セクションを参照してください。
