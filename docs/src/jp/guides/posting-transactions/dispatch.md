---
locale: jp
---
# ディスパッチを使用して取引を投稿する
Arweaveブラウザウォレットでは、取引をディスパッチする概念があります。取引が100KB未満のサイズの場合は無料で投稿することができます！
## 取引のディスパッチ
クライアントアプリにパッケージの依存関係がなくても行うことができます。ユーザーがブラウザウォレットをアクティブにしており、データが100KB未満であれば、ディスパッチされた取引は無料であり、ネットワーク上で確定されます。

```js:no-line-numbers
// arweave-jsを使用して取引を作成する
let tx = await arweave.createTransaction({ data:"Hello World!" })

// 取引にカスタムタグを追加する
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// ブラウザウォレットを使用して取引をディスパッチする
let result = await window.arweaveWallet.dispatch(tx);

// ログに取引IDを出力する
console.log(result.id);
```

## リソース
* 取引を投稿する方法の概要については、クックブックの[取引の投稿](../../concepts/post-transactions.md)セクションを参照してください。