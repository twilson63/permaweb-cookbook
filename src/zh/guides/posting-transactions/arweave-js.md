---
locale: zh
---

# 使用 `arweave-js` 发布交易

Arweave 原生交易可以直接使用 `arweave-js` 包发布到节点或网关。

::: info
Arweave 通过使用交易包进行扩展。这些交易包使得每个块能够包含近乎无限数量的交易。如果没有使用交易包，Arweave 块将被限制每个块最多包含 1000 条交易（每 2 分钟产生一个新的块）。如果您的用例超过这个容量，您可能会遇到交易丢失的问题。在这种情况下，请考虑使用 [irys.xyz](./irys.md) 或类似的服务来打包您的交易。
:::

## 安装 `arweave-js` 包

要安装 `arweave-js`，运行以下命令
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

## 初始化 arweave-js

使用 `arweave-js` 库发布直接的第一层（Layer 1）交易。

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// 从磁盘加载 JWK 钱包密钥文件
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// 初始化 arweave 实例
const arweave = Arweave.init({});
```

## 发布钱包到钱包的交易

一个简单的交易，将 AR 代币从一个钱包地址转移到另一个钱包地址。

```js:no-line-numbers
// 创建一个钱包到钱包的交易，将 10.5AR 发送到目标地址
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// 在发布之前，您必须使用您的密钥对交易进行签名
await arweave.transactions.sign(transaction, key);

// 发布交易
const response = await arweave.transactions.post(transaction);
```

## 发布数据交易

此示例演示了如何从磁盘加载文件并创建一个事务，以将其数据存储在网络上。您可以在 [https://ar-fees.arweave.dev](https://ar-fees.arweave.dev) 上找到网络目前的收费价格。

```js:no-line-numbers
// 从磁盘加载数据
const imageData = fs.readFileSync(`iamges/myImage.png`);

// 创建一个数据交易
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// 添加一个自定义标签，告诉网关如何为浏览器提供此数据
transaction.addTag('Content-Type', 'image/png');

// 在发布之前，您必须使用您的密钥对交易进行签名
await arweave.transactions.sign(transaction, key);

// 创建一个上传器，用于将数据种子到网络中
let uploader = await arweave.transactions.getUploader(transaction);

// 运行上传器直到完成上传。
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## 资源

-   若要了解有关所有发布交易的方法的概述，请参阅食谱中的 [发布交易](../../concepts/post-transactions.md) 部分。

-   若要详细了解 `arweave-js` 所有功能，请参阅[github 上的文档](https://github.com/ArweaveTeam/arweave-js)。
