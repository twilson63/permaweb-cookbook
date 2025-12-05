---
title: 使用 Arweave JS 获取数据
---

# 使用 Arweave JS 获取数据

Arweave JS 是与 Arweave 网络交互的官方 JavaScript/TypeScript SDK。

本指南涵盖如何从已知交易 ID 获取数据的基础内容。

## 安装

### NPM

```sh
npm install --save arweave
```

## 初始化

### 基础初始化

```js
import Arweave from "arweave";

// Initialize with default settings (recommended for web)
const arweave = Arweave.init({});

// Or specify a custom gateway
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});
```

## 获取数据

### 获取交易数据

推荐的获取交易数据的方法：

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

// Get data as base64url encoded string
arweave.transactions.getData(txId).then((data) => {
  console.log("Raw data:", data);
});

// Get data decoded to Uint8Array (for binary data)
arweave.transactions.getData(txId, { decode: true }).then((data) => {
  console.log("Decoded data:", data);
});

// Get data decoded as string
arweave.transactions
  .getData(txId, { decode: true, string: true })
  .then((data) => {
    console.log("String data:", data);
  });
```

### 获取完整交易信息

获取包含元数据的完整交易信息：

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.get(txId).then((transaction) => {
  console.log("Transaction ID:", transaction.id);
  console.log("Owner:", transaction.owner);
  console.log("Data size:", transaction.data_size);
  console.log("Tags:", transaction.tags);

  // Note: data field may not be included for large transactions
  if (transaction.data) {
    console.log("Data included:", transaction.data);
  }
});
```

## 处理标签

### 解码交易标签

标签默认为 base64url 编码。使用内置解码器：

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.get(txId).then((transaction) => {
  transaction.tags.forEach((tag) => {
    // Decode tag name and value
    const key = tag.get("name", { decode: true, string: true });
    const value = tag.get("value", { decode: true, string: true });
    console.log(`${key}: ${value}`);
  });
});
```

## 处理不同数据类型

### JSON 数据

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions
  .getData(txId, { decode: true, string: true })
  .then((data) => {
    try {
      const jsonData = JSON.parse(data);
      console.log("JSON data:", jsonData);
    } catch (e) {
      console.log("Data is not valid JSON:", data);
    }
  });
```

### 二进制数据

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.getData(txId, { decode: true }).then((data) => {
  console.log("Binary data size:", data.byteLength);
  // data is a Uint8Array
});
```

## 最佳实践

- 当只需要数据时，使用 `getData()` 而非 `get()`
- 在获取数据时，务必处理潜在错误
- 在处理关键操作的数据前，检查交易状态
- 根据预期的数据类型使用适当的解码选项

## 资源

- [Arweave JS GitHub 仓库](https://github.com/ArweaveTeam/arweave-js)
- [GraphQL 指南](/guides/querying-arweave/queryingArweave.md) - 用于查找交易
