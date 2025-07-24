---
locale: zh
---
# 使用 Dispatch 发布交易
Arweave 浏览器钱包具有分发交易的概念。如果交易大小不超过100KB，可以免费发布！
## 发布交易
客户端应用程序可以在不依赖任何软件包的情况下进行。只要用户启用了浏览器钱包，并且数据大小不超过100KB，发送的交易就是免费的，并且保证在网络上得到确认。

```js:no-line-numbers
// 使用 arweave-js 创建交易
let tx = await arweave.createTransaction({ data:"Hello World!" })

// 向交易添加一些自定义标签
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// 使用浏览器钱包分发()交易
let result = await window.arweaveWallet.dispatch(tx);

// 输出交易 ID
console.log(result.id);
```

## 资源
* 有关发送交易的所有方法概述，请参阅[发布交易](../../concepts/post-transactions.md)相关部分的参考手册。