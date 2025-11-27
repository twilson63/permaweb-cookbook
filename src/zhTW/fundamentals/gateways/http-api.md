---
title: 使用 HTTP API 擷取資料
---

# 使用 HTTP API 擷取資料

HTTP API 是從 Arweave 擷取資料的最簡單方式。您可以使用任何支援 HTTP 的客戶端直接向 Arweave 閘道發出請求。

HTTP API 的請求是直接發送到 Arweave 閘道端點。此方法不需要額外套件，並可搭配任何支援 HTTP 請求的程式語言使用。

## 基本資料擷取

### 取得交易資料

擷取與交易 ID 關聯的資料：

```sh
GET https://arweave.net/{TX_ID}
```

**範例：**

```bash
curl https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8
```

**JavaScript 範例：**

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

response = await fetch(`https://arweave.net/${txId}`);
console.log(response.data);
```

## 進階端點

### 取得原始交易資料

某些交易類型有不同的呈現規則。使用 raw 端點以取得未經轉換的原始資料：

```bash
GET https://arweave.net/raw/{TX_ID}
```

**範例：**

```js
const response = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
);
const data = await response.json();
console.log(data);
```

### 取得特定交易欄位

只擷取交易中的特定欄位：

```bash
GET https://arweave.net/tx/{TX_ID}/{FIELD}
```

可用欄位：

- `id` - 交易 ID
- `last_tx` - 擁有者的上一筆交易
- `owner` - 擁有者的錢包地址
- `target` - 目標錢包地址（轉帳時使用）
- `quantity` - 轉移金額（以 Winston 為單位）
- `data` - 交易資料
- `reward` - 採礦獎勵
- `signature` - 交易簽名

**範例：**

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

## 使用不同的閘道

您可以使用任何 Arweave 閘道替代 `arweave.net`：

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

## 錯誤處理

在進行 HTTP 請求時務必處理可能發生的錯誤：

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

## 速率限制與最佳實務

- **尊重**：請勿對公用閘道發出過量請求
- **設定適當的逾時時間**：為您的請求設定合理的逾時值
- **優雅處理錯誤**：為失敗的請求實作重試機制
- **盡可能快取**：將常用資料儲存在本地
- **使用 HTTPS**：始終使用安全連線

使用 HTTP API 查詢 Arweave 資料的缺點是它依賴單一閘道。如果您想設定備援閘道或進行資料驗證，建議參考 [AR.IO Wayfinder](https://github.com/ar-io/wayfinder).
