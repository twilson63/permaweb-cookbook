---
title: ARIO Wayfinder로 데이터 가져오기
---

# ARIO Wayfinder로 데이터 가져오기

ARIO Wayfinder는 AR.IO 네트워크를 통해 Arweave에 저장된 데이터에 분산형으로 암호학적 검증을 거친 접근을 제공하는 프로토콜입니다. 각 요청에 대해 최적의 게이트웨이를 자동으로 선택하고 데이터 무결성을 보장합니다.

## 개요

Wayfinder는 퍼마웹에서 신뢰할 수 있는 데이터 접근의 문제를 다음과 같이 해결합니다:

- **지능형 라우팅**: 성능과 가용성을 기준으로 최적의 게이트웨이를 자동으로 선택
- **데이터 검증**: 암호학적으로 데이터 무결성을 검증
- **분산형 접근**: 여러 AR.IO 게이트웨이에 요청을 분산
- **원활한 통합**: 빠르고 신뢰할 수 있는 접근을 위해 내부적으로 동작

**장점:**

- 운영 환경 수준의 신뢰성
- 자동 게이트웨이 선택
- 내장된 데이터 검증
- 성능 모니터링
- 개발자 친화적 API

**사용 사례:**

- 운영 환경용 애플리케이션
- 데이터 무결성이 보장되어야 할 경우
- 고가용성이 필요한 애플리케이션
- 강건한 분산 애플리케이션 구축

## 설치

### 코어 라이브러리 (JavaScript/TypeScript)

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### React 통합

```bash
npm install @ar.io/wayfinder-react @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-react @ar.io/wayfinder-core
```

## 기본 사용법

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

### React 통합

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

## 고급 구성

### 커스텀 게이트웨이 제공자

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

### 라우팅 전략

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

### 검증 설정

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

### 텔레메트리 및 모니터링

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

## 다양한 데이터 유형 처리

### JSON 데이터

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

### 바이너리 데이터

```js
const response = await wayfinder.request(`ar://${txId}`);
const data = await response.arrayBuffer();
console.log("Binary data size:", data.byteLength);
```

### 대용량 파일 스트리밍

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

## 에러 처리

### 기본 에러 처리

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

### 재시도 로직

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

## 모범 사례

### 성능

- 사용 사례에 맞는 적절한 타임아웃 값 설정
- 자주 접근하는 데이터에 대해 캐싱 구현
- 성능 최적화를 위해 텔레메트리 데이터 모니터링

### 신뢰성

- 중요 애플리케이션에는 데이터 검증 활성화
- 중복성을 위해 여러 게이트웨이 제공자 사용
- 적절한 에러 처리 및 재시도 로직 구현

### 보안

- 민감한 콘텐츠는 항상 데이터 무결성 검증
- 가능한 경우 신뢰할 수 있는 게이트웨이 목록 사용
- 이상 징후를 감지하기 위해 검증 이벤트 모니터링

## 문제 해결

### 일반적인 문제

**게이트웨이 선택 실패:**

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

**검증 실패:**

```js
// Disable verification temporarily for debugging
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  verificationSettings: {
    enabled: false,
  },
});
```

## 리소스

- [공식 Wayfinder 문서](https://docs.ar.io/wayfinder)
- [Wayfinder GitHub 리포지토리](https://github.com/ar-io/wayfinder)
- [AR.IO 네트워크](https://ar.io)
- [트랜잭션 데이터 개념](/concepts/transaction-data.md)
