---
title: Arweave JS로 데이터 가져오기
---

# Arweave JS로 데이터 가져오기

Arweave JS는 Arweave 네트워크와 상호작용하기 위한 공식 JavaScript/TypeScript SDK입니다.

이 가이드는 알려진 거래(transaction) ID에서 데이터를 가져오는 기본 방법을 다룹니다.

## 설치

### NPM

```sh
npm install --save arweave
```

## 초기화

### 기본 초기화

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

## 데이터 가져오기

### 트랜잭션 데이터 가져오기

트랜잭션 데이터를 가져오는 권장 방법:

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

### 전체 트랜잭션 가져오기

메타데이터를 포함한 전체 트랜잭션 정보를 가져옵니다:

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

## 태그 작업하기

### 트랜잭션 태그 디코딩

태그는 기본적으로 base64url로 인코딩되어 있습니다. 내장 디코더를 사용하세요:

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

## 다양한 데이터 유형 작업하기

### JSON 데이터

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

### 바이너리 데이터

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.getData(txId, { decode: true }).then((data) => {
  console.log("Binary data size:", data.byteLength);
  // data is a Uint8Array
});
```

## 모범 사례

- 데이터만 필요할 때는 `get()` 대신 `getData()`를 사용하세요
- 데이터를 가져올 때 발생할 수 있는 오류를 항상 처리하세요
- 중요한 작업을 위해 데이터를 처리하기 전에 트랜잭션 상태를 확인하세요
- 예상하는 데이터 유형에 따라 적절한 디코딩 옵션을 사용하세요

## 리소스

- [Arweave JS GitHub 저장소](https://github.com/ArweaveTeam/arweave-js)
- [GraphQL 가이드](/guides/querying-arweave/queryingArweave.md) - 트랜잭션 찾기에 사용
