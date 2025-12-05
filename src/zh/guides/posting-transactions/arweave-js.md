# 使用 arweave-js 发布交易

Arweave 原生交易可以使用 `arweave-js` 包直接发布到节点或网关（gateway）。

::: info
Arweave 通过使用交易捆绑（transaction bundles）来进行扩展。这些捆绑使得每个区块能包含几乎无限数量的交易。

大多数交易为了可靠性会通过捆绑器（bundlers）发布 —— 使用 `arweave-js` 则是直接将交易发布到 Arweave，而不通过捆绑器。  
:::

## 安装 arweave-js 包

要安装 `arweave-js` 请执行
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arweave
```

  </CodeGroupItem>
</CodeGroup>

::: info
在使用 Node.js 时，最低需要 Node.js 18 或更高版本。
:::

## 初始化 arweave-js

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// 從磁碟載入 JWK 錢包金鑰檔案
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// 初始化 arweave 實例
const arweave = Arweave.init({});
```

## 发布钱包到钱包的交易

一个基本的交易示例，将 AR 代币从一个钱包地址移转到另一个地址。

```js:no-line-numbers
//  create a wallet-to-wallet transaction sending 10.5AR to the target address
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// you must sign the transaction with your key before posting
await arweave.transactions.sign(transaction, key);

// post the transaction
const response = await arweave.transactions.post(transaction);
```

## 发布数据交易

此示例演示如何从磁盘加载文件并创建交易以将其数据存放到网络上。您可以在 [https://ar-fees.arweave.net](https://ar-fees.arweave.net) 查询网络当前收取的价格。

```js:no-line-numbers
// load the data from disk
const imageData = fs.readFileSync(`iamges/myImage.png`);

// create a data transaction
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// add a custom tag that tells the gateway how to serve this data to a browser
transaction.addTag('Content-Type', 'image/png');

// you must sign the transaction with your key before posting
await arweave.transactions.sign(transaction, key);

// create an uploader that will seed your data to the network
let uploader = await arweave.transactions.getUploader(transaction);

// run the uploader until it completes the upload.
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## 资源

- 要了解所有可用的发布交易方式，请参见 [Posting Transactions](../../fundamentals/transactions/post-transactions.md) 部分。

- 要了解 `arweave-js` 的详细功能说明，请参阅 [GitHub 上的文档](https://github.com/ArweaveTeam/arweave-js)。
