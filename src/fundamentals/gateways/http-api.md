---
title: Fetching Data with HTTP API
---

# Fetching Data with HTTP API

The HTTP API is the simplest way to fetch data from Arweave. You can use any HTTP client to make requests directly to Arweave gateways.

HTTP API requests are made directly to Arweave gateway endpoints. This method requires no additional packages and works with any programming language that supports HTTP requests.

## Basic Data Retrieval

### Get Transaction Data

Fetch the data associated with a transaction ID:

```sh
GET https://arweave.net/{TX_ID}
```

**Example:**

```bash
curl https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8
```

**JavaScript Example:**

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

response = await fetch(`https://arweave.net/${txId}`)
console.log(response.data);
```

## Advanced Endpoints

### Get Raw Transaction Data

Some transaction types follow different rendering rules. Use the raw endpoint to get untransformed data:

```bash
GET https://arweave.net/raw/{TX_ID}
```

**Example:**

```js
const response = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
);
const data = await response.json();
console.log(data);
```

### Get Specific Transaction Fields

Retrieve only specific fields from a transaction:

```bash
GET https://arweave.net/tx/{TX_ID}/{FIELD}
```

**Available fields:**

- `id` - Transaction ID
- `last_tx` - Last transaction from the owner
- `owner` - Owner's wallet address
- `target` - Target wallet address (for transfers)
- `quantity` - Amount transferred (in Winston)
- `data` - Transaction data
- `reward` - Mining reward
- `signature` - Transaction signature

**Example:**

```js
// Get just the owner address
const response = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/owner"
);
const owner = await response.text();
console.log("Owner:", owner);

// Get transaction data
const dataResponse = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
);
const data = await dataResponse.json();
console.log("Data:", data);
```

## Using Different Gateways

You can use any Arweave gateway instead of `arweave.net`:

```js
// Alternative gateways
const gateways = [
  "https://arweave.net",
  "https://arweave.world",
  "https://arweave.live",
  "https://g8way.io",
];

const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

// Try multiple gateways for redundancy
for (const gateway of gateways) {
  try {
    const response = await fetch(`${gateway}/${txId}`);
    if (response.ok) {
      const data = await response.text();
      console.log(`Data from ${gateway}:`, data);
      break;
    }
  } catch (error) {
    console.log(`Failed to fetch from ${gateway}:`, error.message);
  }
}
```

## Error Handling

Always handle potential errors when making HTTP requests:

```js
async function fetchArweaveData(txId) {
  try {
    const response = await fetch(`https://arweave.net/${txId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Transaction not found");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
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

## Rate Limiting and Best Practices

- **Be respectful**: Don't make excessive requests to public gateways
- **Use appropriate timeouts**: Set reasonable timeout values for your requests
- **Handle errors gracefully**: Implement retry logic for failed requests
- **Cache when possible**: Store frequently accessed data locally
- **Use HTTPS**: Always use secure connections

The disadvantage to using the HTTP API to query Arweave data, is that it relies on a single gateway. If you want to set fallback gateways, or data verification, it may be worth checking out [AR.IO Wayfinder](https://github.com/ar-io/wayfinder).
