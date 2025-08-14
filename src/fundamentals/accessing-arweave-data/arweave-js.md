---
title: Fetching Data with Arweave.js
---

# Fetching Data with Arweave.js

Arweave.js is the official JavaScript/TypeScript SDK for interacting with the Arweave network. This guide covers the basics of fetching data from known transaction IDs.

## Overview

Arweave.js provides a simple and reliable way to fetch transaction data from Arweave when you already have the transaction ID.

**Advantages:**

- Official SDK with comprehensive features
- Built-in data decoding and validation
- Support for both Node.js and browser environments
- Active maintenance and community support

**Use cases:**

- JavaScript/TypeScript applications
- Fetching data from known transaction IDs
- When you need transaction metadata

## Installation

### NPM

```bash
npm install --save arweave
```

### Yarn

```bash
yarn add arweave
```

### Browser Bundle

```html
<!-- Latest version -->
<script src="https://unpkg.com/arweave/bundles/web.bundle.js"></script>
```

## Initialization

### Basic Initialization

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

### Node.js Initialization

```js
const Arweave = require("arweave");

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});
```

## Fetching Data

### Get Transaction Data

The recommended way to fetch transaction data:

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

### Get Full Transaction

Fetch complete transaction information including metadata:

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

### Get Transaction Status

Check if a transaction has been confirmed:

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.getStatus(txId).then((status) => {
  console.log("Status:", status);
  // {
  //   status: 200,
  //   confirmed: {
  //     block_height: 140151,
  //     block_indep_hash: 'OR1wue3oBSg3XWvH0GBlauAtAjBICVs2F_8YLYQ3aoAR7q6_3fFeuBOw7d-JTEdR',
  //     number_of_confirmations: 20
  //   }
  // }
});
```

## Working with Tags

### Decode Transaction Tags

Tags are base64url encoded by default. Use the built-in decoder:

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

## Working with Different Data Types

### JSON Data

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

### Binary Data

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

arweave.transactions.getData(txId, { decode: true }).then((data) => {
  console.log("Binary data size:", data.byteLength);
  // data is a Uint8Array
});
```

## Basic Error Handling

```js
async function fetchArweaveData(txId) {
  try {
    const data = await arweave.transactions.getData(txId, {
      decode: true,
      string: true,
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Usage
fetchArweaveData("sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8")
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error.message));
```

## Best Practices

- Use `getData()` instead of `get()` when you only need the data
- Always handle potential errors when fetching data
- Check transaction status before processing data for critical operations
- Use appropriate decoding options based on your expected data type

## Resources

- [Arweave.js GitHub Repository](https://github.com/ArweaveTeam/arweave-js)
- [Arweave.js Documentation](https://docs.arweave.org/developers/client-sdk/arweave-js)
- [GraphQL Guide](/guides/querying-arweave/queryingArweave.md) - For finding transactions
- [Transaction Data Concepts](/concepts/transaction-data.md)
