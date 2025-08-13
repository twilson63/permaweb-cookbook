---
locale: zh
---

# Hello World（NodeJS）

本指南将指导您使用`arweave-js`和`Irys`的最简单方法将数据放入永久网络（Permaweb）。

由于 Arweave 2.6 每个区块仅允许 1000 个项目，直接发布到网关（例如使用`arweave-js`）的情况可能很少见。

## 要求

-   [NodeJS](https://nodejs.org) LTS 或更高版本

## 描述

请在终端/控制台窗口中创建一个名为 `hw-nodejs` 的新文件夹。

## 设置

```sh
cd hw-nodejs
npm init -y
npm install arweave @irys/sdk
```

## 生成一个钱包

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## 使用 Irys 上传（免费交易）

```js:no-line-numbers
import Irys from "@irys/sdk";
import fs from "fs";

const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());

const irys = new Irys({}
  "http://node2.irys.xyz",
  "arweave",
  jwk
});

irys
  .upload("你好，世界")
  .then((r) => console.log(`https://arweave.net/${r.id}`))
  .catch(console.log);
```

## 使用 ArweaveJS 上传

如果您正在运行最新版本的`nodejs`，那么此`arweavejs`脚本将按原样工作。对于其他版本，您可能需要使用`--experimental-fetch`标志。

```js:no-line-numbers
import Arweave from "arweave";
import fs from "fs";

// 从磁盘加载JWK钱包密钥文件
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// 初始化arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const tx = await arweave.createTransaction(
  {
    data: "Hello world!",
  },
  jwk
);

await arweave.transactions.sign(tx, jwk);

arweave.transactions.post(tx).then(console.log).catch(console.log);
console.log(`https://arweave.net/${tx.id}`);
```

## 资源

-   [Irys Irys 软件开发工具包）](https://github.com/irys-xyz/js-sdk)
-   [Arweave JS SDK（Arweave JavaScript 软件开发工具包）](https://github.com/ArweaveTeam/arweave-js)
-   [Irys 文档：免费上传](http://docs.irys.xyz/faqs/dev-faq#does-irys-offer-free-uploads)
