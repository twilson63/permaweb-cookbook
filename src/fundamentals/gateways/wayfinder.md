---
title: Fetching Data with ARIO Wayfinder
---

# Fetching Data with ARIO Wayfinder

ARIO Wayfinder is a protocol that provides decentralized, cryptographically verified access to data stored on Arweave via the AR.IO Network. It automatically selects the best gateway for each request and ensures data integrity.

## Overview

Wayfinder solves the challenge of reliable data access on the permaweb by providing:

- **Intelligent Routing**: Automatically selects the best gateway based on performance and availability
- **Data Verification**: Cryptographically verifies data integrity
- **Decentralized Access**: Distributes requests across multiple AR.IO gateways
- **Seamless Integration**: Works behind the scenes for fast, reliable access

**Advantages:**

- Production-grade reliability
- Automatic gateway selection
- Built-in data verification
- Performance monitoring
- Developer-friendly APIs

**Use cases:**

- Production applications
- When you need guaranteed data integrity
- Applications requiring high availability
- Building robust decentralized applications

## Installation

### Core Library (JavaScript/TypeScript)

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### React Integration

```bash
npm install @ar.io/wayfinder-react @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-react @ar.io/wayfinder-core
```

## Basic Usage

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

### React Integration

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

## Advanced Configuration

### Custom Gateway Providers

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
  gateways: [
    "https://arweave.net",
    "https://permagate.io",
    "https://g8way.io",
  ],
});

// Cache gateway lists for performance
const cachedGateways = new SimpleCacheGatewaysProvider({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
});

const wayfinder = new Wayfinder({
  gatewaysProvider: cachedGateways,
});
```

### Routing Strategies

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

### Verification Settings

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

### Telemetry and Monitoring

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

## Working with Different Data Types

### JSON Data

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

### Binary Data

```js
const response = await wayfinder.request(`ar://${txId}`);
const data = await response.arrayBuffer();
console.log("Binary data size:", data.byteLength);
```

### Streaming Large Files

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

## Error Handling

### Basic Error Handling

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

### Retry Logic

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

## Best Practices

### Performance

- Use appropriate timeout values for your use case
- Implement caching for frequently accessed data
- Monitor telemetry data to optimize performance

### Reliability

- Enable data verification for critical applications
- Use multiple gateway providers for redundancy
- Implement proper error handling and retry logic

### Security

- Always verify data integrity for sensitive content
- Use trusted gateway lists when possible
- Monitor verification events for anomalies

## Troubleshooting

### Common Issues

**Gateway selection failures:**

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

**Verification failures:**

```js
// Disable verification temporarily for debugging
const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
  verificationSettings: {
    enabled: false,
  },
});
```

## Resources

- [Official Wayfinder Documentation](https://docs.ar.io/wayfinder)
- [Wayfinder GitHub Repository](https://github.com/ar-io/wayfinder)
- [AR.IO Network](https://ar.io)
