---
title: Fetching Data with ARIO Wayfinder
---

# 使用 ARIO Wayfinder 抓取資料

ARIO Wayfinder 是一個協定，透過 AR.IO 網路提供去中心化且經過密碼學驗證的存取 Arweave 上資料的方式。它會為每個請求自動選擇最佳閘道並確保資料完整性。

## 概覽

Wayfinder 解決了在 permaweb 上可靠存取資料的挑戰，提供：

- **智慧路由**：根據效能與可用性自動選擇最佳閘道
- **資料驗證**：以密碼學方式驗證資料完整性
- **去中心化存取**：在多個 AR.IO 閘道之間分散請求
- **無縫整合**：在背景運作以提供快速且可靠的存取

**優點：**

- 生產等級的可靠性
- 自動閘道選擇
- 內建資料驗證
- 效能監控
- 開發者友好的 API

**使用情境：**

- 生產環境應用程式
- 需要保證資料完整性的情況
- 需要高可用性的應用程式
- 建構健壯的去中心化應用程式

## 安裝

### 核心函式庫（JavaScript/TypeScript）

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### React 整合

```bash
npm install @ar.io/wayfinder-react @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-react @ar.io/wayfinder-core
```

## 基本用法

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

### React 整合

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

## 進階設定

### 自訂閘道提供者

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

### 路由策略

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

### 驗證設定

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

### 遙測與監控

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

## 處理不同資料類型

### JSON 資料

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

### 二進位資料

```js
const response = await wayfinder.request(`ar://${txId}`);
const data = await response.arrayBuffer();
console.log("Binary data size:", data.byteLength);
```

### 串流大型檔案

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

## 錯誤處理

### 基本錯誤處理

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

### 重試邏輯

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

## 最佳做法

### 效能

- 為你的使用情境設定適當的逾時值
- 對常用資料實作快取
- 監控遙測資料以優化效能

### 可靠性

- 對於關鍵應用啟用資料驗證
- 使用多個閘道提供者以提高冗餘
- 實作適當的錯誤處理與重試邏輯

### 安全性

- 對敏感內容務必驗證資料完整性
- 在可能的情況下使用受信任的閘道清單
- 監控驗證事件以偵測異常

## 疑難排解

### 常見問題

**閘道選擇失敗：**

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

**驗證失敗：**

```js
// Disable verification temporarily for debugging
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  verificationSettings: {
    enabled: false,
  },
});
```

## 資源

- [官方 Wayfinder 文件](https://docs.ar.io/wayfinder)
- [Wayfinder GitHub 倉庫](https://github.com/ar-io/wayfinder)
- [AR.IO 網路](https://ar.io)
- [交易資料概念](/concepts/transaction-data.md)
