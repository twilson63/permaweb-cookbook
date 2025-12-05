---
title: HTTP API を使ったデータ取得
---

# HTTP API を使ったデータ取得

HTTP API は Arweave からデータを取得する最も簡単な方法です。任意の HTTP クライアントを使用して、Arweave ゲートウェイに直接リクエストを送信できます。

HTTP API リクエストは Arweave のゲートウェイエンドポイントに直接送信されます。この方法は追加のパッケージを必要とせず、HTTP リクエストをサポートする任意のプログラミング言語で動作します。

## 基本的なデータ取得

### トランザクションデータを取得

トランザクション ID に紐づくデータを取得します:

```sh
GET https://arweave.net/{TX_ID}
```

**例:**

```bash
curl https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8
```

**JavaScript の例:**

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

response = await fetch(`https://arweave.net/${txId}`);
console.log(response.data);
```

## 高度なエンドポイント

### 生のトランザクションデータを取得

一部のトランザクションタイプは異なるレンダリングルールに従います。未変換のデータを取得するには raw エンドポイントを使用してください:

```bash
GET https://arweave.net/raw/{TX_ID}
```

**例:**

```js
const response = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
);
const data = await response.json();
console.log(data);
```

### 特定のトランザクションフィールドを取得

トランザクションから特定のフィールドのみを取得します:

```bash
GET https://arweave.net/tx/{TX_ID}/{FIELD}
```

**利用可能なフィールド:**

- `id` - トランザクション ID
- `last_tx` - 所有者の最後のトランザクション
- `owner` - 所有者のウォレットアドレス
- `target` - 送金先のウォレットアドレス（送金の場合）
- `quantity` - 送金額（Winston 単位）
- `data` - トランザクションデータ
- `reward` - マイニング報酬
- `signature` - トランザクション署名

**例:**

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

## 別のゲートウェイを使用する

`arweave.net` の代わりに任意の Arweave ゲートウェイを使用できます:

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

## エラーハンドリング

HTTP リクエストを行う際は常に潜在的なエラーを処理してください:

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

## レート制限とベストプラクティス

- **節度を守る**: 公共ゲートウェイに対して過剰なリクエストを送らないでください
- **適切なタイムアウトを設定する**: リクエストのタイムアウト値を合理的に設定してください
- **エラー処理を適切に行う**: 失敗したリクエストに対してリトライロジックを実装してください
- **可能であればキャッシュする**: 頻繁にアクセスするデータをローカルに保存してください
- **HTTPS を使用する**: 常にセキュアな接続を使用してください

HTTP API を使って Arweave データを照会する欠点は、単一のゲートウェイに依存する点です。フォールバック用のゲートウェイを設定したり、データ検証を行いたい場合は、[AR.IO Wayfinder](https://github.com/ar-io/wayfinder) を確認する価値があります。
