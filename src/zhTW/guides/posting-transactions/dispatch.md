# 使用 Dispatch 發佈交易

Arweave 的瀏覽器錢包支援 dispatch（派發）交易的概念。

如果交易小於 100KB，則可以免費發佈到 Arweave！

## 發佈交易（Dispatch）

這可以在用戶端應用程式不安裝任何套件依賴的情況下完成。只要使用者有啟用的瀏覽器錢包且資料小於 100KB，dispatch 的交易就是免費的，且可保證在網路上被確認。

```js:no-line-numbers
// 使用 arweave-js 建立交易
let tx = await arweave.createTransaction({ data:"Hello World!" })

// 為交易新增自訂標籤
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// 使用瀏覽器錢包的 dispatch() 發佈交易
let result = await window.arweaveWallet.dispatch(tx);

// 輸出交易 id
console.log(result.id);
```

## 資源

- 有關可以發佈交易的所有方式概覽，請參閱食譜中的 [發佈交易](../../fundamentals/post-transactions.md) 一節。
