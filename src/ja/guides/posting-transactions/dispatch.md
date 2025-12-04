# Dispatch を使用したトランザクションの投稿

Arweave のブラウザウォレットにはトランザクションをディスパッチするという概念があります。

トランザクションサイズが 100KB 未満であれば、Arweave に無料で投稿できます！

## トランザクションのディスパッチ

クライアントアプリ側で追加のパッケージ依存は不要です。ユーザーのブラウザウォレットが有効で、データが 100KB 未満であれば、ディスパッチされたトランザクションは無料でネットワーク上で確実に承認されます。

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

- トランザクションを投稿するすべての方法の概要については、クックブックの[トランザクションの投稿](../../fundamentals/transactions/index.md)セクションを参照してください。
