---
locale: zh
---

# 使用 irys.xyz 发布交易

使用`irys.xyz/sdk` JavaScript 软件包可以将交易发布到 irys.xyz。捆绑服务可以通过交易捆绑在每个区块中支持数千个交易，并确保发布的交易获得确认。

## 安装 irys.xyz/sdk

要安装`irys.xyz/sdk`，运行以下命令：

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

## 初始化 Irys 网络客户端

使用 Irys 进行 Layer 1 和捆绑 Layer 2 交易的区别之一是，在使用 Irys 时，您必须提前在 Irys 节点上存入保证金。该保证金可以使用 AR 代币或其他加密货币进行存入。另一个区别是，Irys 服务保证您的数据将到达链上。

```js:no-line-numbers
import Irys from '@irys/sdk';
import fs from "fs";

// 从磁盘加载JWK钱包密钥文件
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// 初始化IrysSDK
const irys = new Irys({ "http://node1.iryz.xyz", "arweave", key });
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
const tx = irys.createTransaction(imageData, { tags });
await tx.sign();

// 将交易上传到Irys以便包含在要发布的捆绑包中
await tx.upload();
```

## 资源

-   有关发布交易的所有方式的概述，请参阅操作手册中的[发布交易](../../concepts/post-transactions.md)部分。

-   可以在[irys.xyz 网站](https://docs.irys.xyz/)上找到完整的 Irys 客户端文档。

-   使用 Irys 上传 NFT 合集的教程和工作坊[在此处](http://docs.irys.xyz/hands-on/tutorials/uploading-nfts)。
