---
title: 使用 HTTP API 获取数据
---

# 使用 HTTP API 获取数据

HTTP API 是从 Arweave 获取数据的最简单方式。您可以使用任何支持 HTTP 的客户端直接向 Arweave 网关发出请求。

HTTP API 的请求是直接发送到 Arweave 网关端点。此方法不需要额外套件，并可搭配任何支持 HTTP 请求的编程语言使用。

## 基本数据获取

### 获取交易数据

获取与交易 ID 关联的数据：

```sh
GET https://arweave.net/{TX_ID}
```

**示例：**

```bash
curl https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8
```

**JavaScript 示例：**

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

response = await fetch(`https://arweave.net/${txId}`);
console.log(response.data);
```

## 高级端点

### 获取原始交易数据

某些交易类型有不同的呈现规则。使用 raw 端点以获取未经转换的原始数据：

```bash
GET https://arweave.net/raw/{TX_ID}
```

**示例：**

```js
const response = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
);
const data = await response.json();
console.log(data);
```

### 获取特定交易字段

只获取交易中的特定字段：

```bash
GET https://arweave.net/tx/{TX_ID}/{FIELD}
```

可用字段：

- `id` - 交易 ID
- `last_tx` - 拥有者的上一笔交易
- `owner` - 拥有者的钱包地址
- `target` - 目标钱包地址（转账时使用）
- `quantity` - 转移金额（以 Winston 为单位）
- `data` - 交易数据
- `reward` - 挖矿奖励
- `signature` - 交易签名

**示例：**

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

## 使用不同的网关

您可以使用任何 Arweave 网关替代 `arweave.net`：

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

## 错误处理

在进行 HTTP 请求时务必处理可能发生的错误：

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

## 速率限制与最佳实践

- **尊重**：请勿对公共网关发出过多请求
- **设置适当的超时时间**：为您的请求设置合理的超时时间
- **优雅处理错误**：为失败的请求实现重试机制
- **尽可能缓存**：将常用数据保存在本地
- **使用 HTTPS**：始终使用安全连接

使用 HTTP API 查询 Arweave 数据的缺点是它依赖单一网关。如果您想设置备援网关或进行数据验证，建议参考 [AR.IO Wayfinder](https://github.com/ar-io/wayfinder).
