---
title: Arweave JS によるデータ取得
---

# Arweave JS によるデータ取得

Arweave JS は Arweave ネットワークとやり取りするための公式の JavaScript/TypeScript SDK です。

本ガイドでは既知のトランザクション ID からデータを取得する基本を説明します。

## インストール

### NPM

```sh
npm install --save arweave
```

## 初期化

### 基本的な初期化

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

## データの取得

### トランザクションデータを取得する

推奨されるトランザクションデータの取得方法:

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

### 完全なトランザクションを取得する

メタデータを含む完全なトランザクション情報を取得します:

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

## タグの扱い

### トランザクションタグのデコード

タグはデフォルトで base64url エンコードされています。組み込みのデコーダを使用してください:

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

## 異なるデータ型の扱い

### JSON データ

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

### バイナリデータ

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.getData(txId, { decode: true }).then((data) => {
  console.log("Binary data size:", data.byteLength);
  // data is a Uint8Array
});
```

## ベストプラクティス

- データのみが必要な場合は `get()` ではなく `getData()` を使用する
- データ取得時は常にエラー処理を行う
- 重要な処理を行う前にトランザクションのステータスを確認する
- 想定するデータ型に基づいて適切なデコードオプションを使用する

## リソース

- [Arweave JS GitHub リポジトリ](https://github.com/ArweaveTeam/arweave-js)
- [GraphQL ガイド](../../guides/graphql/index.md) - トランザクションの検索用
