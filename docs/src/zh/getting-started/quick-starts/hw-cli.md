---
locale: zh
---

# Hello World（CLI）

本指南将引导您通过命令行界面（CLI）以最简单的方式将数据上传到永久网络（permaweb）。

## 要求

-   [NodeJS](https://nodejs.org) LTS 或更高版本

## 描述

使用终端/控制台窗口创建一个名为 `hw-permaweb-1` 的新文件夹。

## 设置

```sh
cd hw-permaweb-1
npm init -y
npm install arweave @irys/sdk
```

## 生成钱包

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## 创建网页

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## 使用 Irys 上传

```sh
irys upload index.html -c arweave -h https://node2.irys.xyz -w ./wallet.json
```
