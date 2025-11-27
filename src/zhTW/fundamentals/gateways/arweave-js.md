---
title: 使用 Arweave JS 擷取資料
---

# 使用 Arweave JS 擷取資料

Arweave JS 是與 Arweave 網路互動的官方 JavaScript/TypeScript SDK。

本指南涵蓋如何從已知交易 ID 擷取資料的基礎內容。

## 安裝

### NPM

```sh
npm install --save arweave
```

## 初始化

### 基礎初始化

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

## 擷取資料

### 取得交易資料

推薦的取得交易資料方式：

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

### 取得完整交易資訊

擷取包含 metadata 的完整交易資訊：

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

## 處理標籤

### 解碼交易標籤

標籤預設為 base64url 編碼。使用內建解碼器：

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

## 處理不同資料類型

### JSON 資料

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

### 二進位資料

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.getData(txId, { decode: true }).then((data) => {
  console.log("Binary data size:", data.byteLength);
  // data is a Uint8Array
});
```

## 最佳實務

- 當只需要資料時，使用 `getData()` 而非 `get()`
- 在擷取資料時，務必處理潛在錯誤
- 在處理關鍵操作的資料前，檢查交易狀態
- 根據預期的資料類型使用適當的解碼選項

## 資源

- [Arweave JS GitHub Repository](https://github.com/ArweaveTeam/arweave-js)
- [GraphQL 指南](/guides/querying-arweave/queryingArweave.md) - 用於尋找交易
