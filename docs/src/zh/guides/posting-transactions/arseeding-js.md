---
locale: zh
---
# 使用 arseeding.js 发布交易
使用 `arseeding-js` JavaScript SDK 包可以将交易发布到 Arweave 网络。 Arseeding 会自动把交易广播到网络中所有的 Arweave 节点, 确保所有 Arweave 节点的 pending pool 中能及时接收到这笔交易，提高交易被打包的速率。

## 安装 arseeding.js
要安装`arseeding.js`，运行以下命令：

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arseeding-js
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arseeding-js
```

  </CodeGroupItem>
</CodeGroup>

## 上传数据的交易
在使用 Arseeding 时，您必须提前在 [everpay](https://app.everpay.io/) 上存入余额。该余额可以使用AR代币或其他加密货币进行存入。另一个区别是，Arseeding 服务保证您的数据将到达链上。

```js:no-line-numbers
const { genNodeAPI } = require('arseeding-js')

const run = async () => {
  const instance = genNodeAPI('YOUR PRIVATE KEY')
  const arseedUrl = 'https://arseed.web3infra.dev'
  const data = Buffer.from('........')
  const payCurrencyTag = 'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // everPay 支持的 token tag (chainType-symbol-id)
  const options = {
    tags: [{ name: 'Content-Type', value: 'image/png' }]
  }
  const res = await instance.sendAndPay(arseedUrl, data, payCurrencyTag, options)
  console.log('res', res)
}
run()
```


## 资源
* 有关发布交易的所有方式的概述，请参阅操作手册中的[发布交易](../../concepts/post-transactions.md)部分。

* 可以在[ Arseeding 网站](https://web3infra.dev/docs/arseeding/introduction/lightNode/)上找到完整的 Arseeding 客户端文档。

* 使用 Arseeding 上传 Manifest 教程[在此处](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/manifest/)。