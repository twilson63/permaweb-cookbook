---
title: ARIO Wayfinderでのデータ取得
---

# ARIO Wayfinder でのデータ取得

ARIO Wayfinder は、AR.IO ネットワークを介して Arweave 上に保存されたデータへの分散化され、暗号学的に検証されたアクセスを提供するプロトコルです。各リクエストに対して最適なゲートウェイを自動的に選択し、データの整合性を保証します。

## 概要

Wayfinder は、パーマウェブ上での信頼できるデータアクセスという課題を次の方法で解決します：

- **インテリジェントルーティング**: パフォーマンスと可用性に基づいて自動的に最適なゲートウェイを選択
- **データ検証**: 暗号学的にデータの整合性を検証
- **分散型アクセス**: 複数の AR.IO ゲートウェイにリクエストを分散
- **シームレスな統合**: 高速かつ信頼性の高いアクセスのために裏側で動作

利点:

- プロダクションレベルの信頼性
- 自動ゲートウェイ選択
- 組み込みのデータ検証
- パフォーマンス監視
- 開発者に優しい API

ユースケース:

- 本番アプリケーション
- データ整合性を保証する必要がある場合
- 高可用性を要求するアプリケーション
- 堅牢な分散アプリケーションの構築

## インストール

### コアライブラリ (JavaScript/TypeScript)

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### React 統合

```bash
npm install @ar.io/wayfinder-react @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-react @ar.io/wayfinder-core
```

## 基本的な使い方

### JavaScript/TypeScript

```js
import { Wayfinder, NetworkGatewaysProvider } from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

// Initialize Wayfinder with default settings
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
});

// Replace with your transaction ID
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

(async () => {
  try {
    const response = await wayfinder.request(`ar://${txId}`);
    const data = await response.text();
    console.log("Data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
})();
```

### React 統合

```jsx
import { WayfinderProvider, useWayfinderRequest } from "@ar.io/wayfinder-react";
import { NetworkGatewaysProvider } from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

function App() {
  return (
    <WayfinderProvider
      gatewaysProvider={new NetworkGatewaysProvider({ ario: ARIO.mainnet() })}
    >
      <MyComponent />
    </WayfinderProvider>
  );
}

function MyComponent() {
  const request = useWayfinderRequest();
  const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await request(`ar://${txId}`);
        setData(await response.text());
      } catch (e) {
        setData("Error: " + e.message);
      }
    })();
  }, [request, txId]);

  return <pre>{data}</pre>;
}
```

## 高度な設定

### カスタムゲートウェイプロバイダー

```js
import {
  Wayfinder,
  NetworkGatewaysProvider,
  StaticGatewaysProvider,
  SimpleCacheGatewaysProvider,
} from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

// Use a predefined list of gateways
const staticGateways = new StaticGatewaysProvider({
  gateways: ["https://arweave.net", "https://permagate.io", "https://g8way.io"],
});

// Cache gateway lists for performance
const cachedGateways = new SimpleCacheGatewaysProvider({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
});

const wayfinder = new Wayfinder({
  gatewaysProvider: cachedGateways,
});
```

### ルーティング戦略

```js
import {
  FastestPingRoutingStrategy,
  PreferredWithFallbackRoutingStrategy,
  RoundRobinRoutingStrategy,
  RandomRoutingStrategy,
} from "@ar.io/wayfinder-core";

// Fastest ping (recommended for performance)
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new FastestPingRoutingStrategy({ timeoutMs: 500 }),
  },
});

// Preferred gateway with fallback
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new PreferredWithFallbackRoutingStrategy({
      preferredGateways: ["https://arweave.net"],
    }),
  },
});

// Round-robin for load balancing
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new RoundRobinRoutingStrategy(),
  },
});
```

### 検証設定

```js
import {
  HashVerificationStrategy,
  SignatureVerificationStrategy,
  DataRootVerificationStrategy,
} from "@ar.io/wayfinder-core";

const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  verificationSettings: {
    enabled: true,
    strategy: new HashVerificationStrategy({
      trustedGateways: ["https://arweave.net"],
    }),
    events: {
      onVerificationSucceeded: (event) => {
        console.log("Verification passed for:", event.txId);
      },
      onVerificationFailed: (event) => {
        console.log("Verification failed for:", event.txId);
      },
    },
  },
});
```

### テレメトリとモニタリング

```js
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  telemetrySettings: {
    enabled: true,
    clientName: "my-app",
    clientVersion: "1.0.0",
    sampleRate: 0.1, // 10% sampling
  },
  routingSettings: {
    events: {
      onRoutingSucceeded: (event) => {
        console.log("Selected gateway:", event.selectedGateway);
      },
      onRoutingFailed: (event) => {
        console.log("Routing failed:", event.error);
      },
    },
  },
});
```

## 異なるデータ型の扱い

### JSON データ

```js
const response = await wayfinder.request(`ar://${txId}`);
const contentType = response.headers.get("content-type");

if (contentType.includes("application/json")) {
  const data = await response.json();
  console.log("JSON data:", data);
} else {
  const data = await response.text();
  console.log("Text data:", data);
}
```

### バイナリデータ

```js
const response = await wayfinder.request(`ar://${txId}`);
const data = await response.arrayBuffer();
console.log("Binary data size:", data.byteLength);
```

### 大きなファイルのストリーミング

```js
const response = await wayfinder.request(`ar://${txId}`);
const reader = response.body.getReader();
const chunks = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}

const data = new Uint8Array(
  chunks.reduce((acc, chunk) => acc + chunk.length, 0)
);
let offset = 0;
for (const chunk of chunks) {
  data.set(chunk, offset);
  offset += chunk.length;
}
```

## エラーハンドリング

### 基本的なエラーハンドリング

```js
async function fetchWithWayfinder(txId) {
  try {
    const response = await wayfinder.request(`ar://${txId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}
```

### リトライロジック

```js
async function fetchWithRetry(txId, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await wayfinder.request(`ar://${txId}`);
      return await response.text();
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries) {
        throw new Error(
          `Failed to fetch transaction after ${maxRetries} attempts`
        );
      }

      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
```

## ベストプラクティス

### パフォーマンス

- ユースケースに応じた適切なタイムアウト値を使用する
- 頻繁にアクセスされるデータのキャッシュを実装する
- テレメトリデータを監視してパフォーマンスを最適化する

### 信頼性

- 重要なアプリケーションではデータ検証を有効にする
- 冗長性のために複数のゲートウェイプロバイダーを使用する
- 適切なエラーハンドリングとリトライロジックを実装する

### セキュリティ

- 機密コンテンツについては常にデータ整合性を検証する
- 可能な場合は信頼できるゲートウェイのリストを使用する
- 異常を検出するために検証イベントを監視する

## トラブルシューティング

### よくある問題

ゲートウェイ選択の失敗:

```js
// Check if gateways are available
const gateways = await wayfinder.gatewaysProvider.getGateways();
console.log("Available gateways:", gateways.length);

// Use fallback routing strategy
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new PreferredWithFallbackRoutingStrategy({
      preferredGateways: ["https://arweave.net"],
    }),
  },
});
```

検証失敗:

```js
// Disable verification temporarily for debugging
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  verificationSettings: {
    enabled: false,
  },
});
```

## リソース

- [Official Wayfinder Documentation](https://docs.ar.io/wayfinder)
- [Wayfinder GitHub Repository](https://github.com/ar-io/wayfinder)
- [AR.IO Network](https://ar.io)
