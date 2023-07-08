---
locale: zh
---
# 使用bundlr.network发布交易
使用`bundlr.network/client` JavaScript软件包可以将交易发布到bundlr.network。捆绑服务可以通过交易捆绑在每个区块中支持数千个交易，并确保发布的交易获得确认。

## 安装bundlr.network/client
要安装`bundlr.network/client`，运行以下命令：

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @bundlr-network/client
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

## 初始化Bundlr网络客户端
使用bundlr进行Layer 1和捆绑Layer 2交易的区别之一是，在使用bundlr时，您必须提前在bundlr节点上存入保证金。该保证金可以使用AR代币或其他加密货币进行存入。另一个区别是，bundlr服务保证您的数据将到达链上。

```js:no-line-numbers
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// 从磁盘加载JWK钱包密钥文件
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// 初始化bundlr SDK
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## 发布捆绑交易

```js:no-line-numbers
// 从磁盘加载数据
const imageData = fs.readFileSync(`images/myImage.png`);

// 添加一个自定义标签，告诉网关如何向浏览器提供此数据
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// 创建捆绑交易并对其进行签名
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// 将交易上传到bundlr以便包含在要发布的捆绑包中
await tx.upload();
```
## 资源
* 有关发布交易的所有方式的概述，请参阅操作手册中的[发布交易](../../concepts/post-transactions.md)部分。

* 可以在[bundlr.network网站](https://docs.bundlr.network/docs/overview)上找到完整的bundlr客户端文档。

* 使用bundlr上传NFT合集的教程和工作坊[在此处](https://github.com/DanMacDonald/nft-uploader)。