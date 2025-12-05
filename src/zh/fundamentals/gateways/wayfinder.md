---
title: 使用 ARIO Wayfinder 获取数据
---

# 使用 ARIO Wayfinder 获取数据

ARIO Wayfinder 是一个协议，通过 AR.IO Network 提供去中心化且经加密验证的方式访问存储在 Arweave 上的数据。它会为每个请求自动选择最佳网关并确保数据完整性。

## 概览

Wayfinder 解决了在 permaweb（永久网络）上可靠访问数据的挑战，提供：

- **智能路由**：根据性能与可用性自动选择最佳网关
- **数据验证**：以密码学方式验证数据完整性
- **去中心化访问**：将请求分散到多个 AR.IO 网关
- **无缝集成**：在后台运行提供快速、可靠的访问

优势：

- 生产级的可靠性
- 自动网关选择
- 内置数据验证
- 性能监控
- 开发者友好的 API

使用情境：

- 生产环境应用程序
- 需要保证数据完整性的情境
- 需要高可用性的应用程序
- 构建健全的去中心化应用程序

## 安装

### 核心库（JavaScript/TypeScript）

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### React 集成

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

// 使用默认设置初始化 Wayfinder
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
});

// Replace with your transaction ID
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

(async () => {
  try {
    const response = await wayfinder.request(`ar://${txId}`);
    const data = await response.text();
    console.log("数据:", data);
  } catch (error) {
    console.error("获取数据失败:", error);
  }
})();
```

### React 集成

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
        setData("错误: " + e.message);
      }
    })();
  }, [request, txId]);

  return <pre>{data}</pre>;
}
```

## 高级设置

### 自定义网关提供者

```js
import {
  Wayfinder,
  NetworkGatewaysProvider,
  StaticGatewaysProvider,
  SimpleCacheGatewaysProvider,
} from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

// 使用预定义的网关列表
const staticGateways = new StaticGatewaysProvider({
  gateways: ["https://arweave.net", "https://permagate.io", "https://g8way.io"],
});

// 缓存网关列表以提升性能
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

// 最快响应的 ping（推荐用于性能）
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new FastestPingRoutingStrategy({ timeoutMs: 500 }),
  },
});

// 指定首选网关并提供回退
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new PreferredWithFallbackRoutingStrategy({
      preferredGateways: ["https://arweave.net"],
    }),
  },
});

// 轮询（Round-robin）用于负载均衡
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new RoundRobinRoutingStrategy(),
  },
});
```

### 验证设置

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
        console.log("验证通过，交易 ID:", event.txId);
      },
      onVerificationFailed: (event) => {
        console.log("验证失败，交易 ID:", event.txId);
      },
    },
  },
});
```

### 遥测与监控

```js
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  telemetrySettings: {
    enabled: true,
    clientName: "my-app",
    clientVersion: "1.0.0",
    sampleRate: 0.1, // 10% 采样
  },
  routingSettings: {
    events: {
      onRoutingSucceeded: (event) => {
        console.log("已选择网关:", event.selectedGateway);
      },
      onRoutingFailed: (event) => {
        console.log("路由失败:", event.error);
      },
    },
  },
});
```

## 处理不同数据类型

### JSON 数据

```js
const response = await wayfinder.request(`ar://${txId}`);
const contentType = response.headers.get("content-type");

if (contentType.includes("application/json")) {
  const data = await response.json();
  console.log("JSON 数据:", data);
} else {
  const data = await response.text();
  console.log("文本数据:", data);
}
```

### 二进制数据

```js
const response = await wayfinder.request(`ar://${txId}`);
const data = await response.arrayBuffer();
console.log("二进制数据大小:", data.byteLength);
```

### 流式处理大型文件

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

## 错误处理

### 基本错误处理

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
    console.error("获取数据失败:", error);
    throw error;
  }
}
```

### 重试逻辑

```js
async function fetchWithRetry(txId, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await wayfinder.request(`ar://${txId}`);
      return await response.text();
    } catch (error) {
      console.log(`尝试 ${attempt} 失败:`, error.message);

      if (attempt === maxRetries) {
        throw new Error(`在 ${maxRetries} 次尝试后仍无法获取交易`);
      }

      // 在重试前等待
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
```

## 最佳实践

### 性能

- 根据使用情境设置适当的超时值
- 对常被访问的数据实现缓存
- 监控遥测数据以优化性能

### 可靠性

- 对于关键应用启用数据验证
- 使用多个网关提供者以提升冗余
- 实现妥善的错误处理与重试机制

### 安全性

- 对敏感内容务必验证数据完整性
- 尽可能使用受信任的网关清单
- 监控验证事件以检测异常

## 故障排除

### 常见问题

网关选择失败：

```js
// 检查网关是否可用
const gateways = await wayfinder.gatewaysProvider.getGateways();
console.log("可用网关:", gateways.length);

// 使用回退路由策略
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  routingSettings: {
    strategy: new PreferredWithFallbackRoutingStrategy({
      preferredGateways: ["https://arweave.net"],
    }),
  },
});
```

验证失败：

```js
// 为调试临时禁用验证
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  verificationSettings: {
    enabled: false,
  },
});
```

## 资源

- [官方 Wayfinder 文档](https://docs.ar.io/wayfinder)
- [Wayfinder GitHub 仓库](https://github.com/ar-io/wayfinder)
- [AR.IO 网络](https://ar.io)
- [Transaction Data Concepts](/concepts/transaction-data.md)
