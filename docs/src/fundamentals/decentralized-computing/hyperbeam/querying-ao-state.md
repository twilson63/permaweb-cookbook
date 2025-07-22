---
title: "Querying AO Process State"
description: "Master HyperBEAM's HTTP API to query and interact with AO process state efficiently"
difficulty: "Intermediate"
stability: "Cutting-edge"
timeEstimate: "35 minutes"
---

# Querying AO Process State

HyperBEAM transforms AO process interaction into a powerful HTTP API experience. Instead of complex RPC calls or blockchain queries, you can access process state through intuitive URL patterns that compose into sophisticated data pipelines.

## Understanding HyperBEAM URLs

Think of HyperBEAM URLs as a command-line interface for the AO Computer. Each path segment represents a step in computation, and the URL structure determines how your request is processed.

### Basic URL Structure

```
https://node.url/[MESSAGE_ID]~[DEVICE@VERSION]/[KEYS]/[PIPELINE]?[PARAMS]
```

**Components:**
- **Node URL**: Any HyperBEAM node (trustless - you can switch nodes freely)
- **Message ID**: AO process ID or message identifier
- **Device**: Computational engine (`~process@1.0`, `~lua@5.3a`, etc.)
- **Keys**: Access specific data or functions within the device
- **Pipeline**: Chain multiple operations together
- **Parameters**: Query parameters with type casting support

### Example Breakdown

```http
GET https://forward.computer/TOKEN_PROCESS~process@1.0/now/balance?user=ALICE_ADDRESS
```

This URL:
1. Connects to `forward.computer` HyperBEAM node
2. Loads `TOKEN_PROCESS` with the `~process@1.0` device  
3. Executes the `now` function (real-time state calculation)
4. Accesses the `balance` field from the result
5. Passes `user=ALICE_ADDRESS` as a parameter

## Core Process Querying Patterns

### Real-Time State Access (`/now`)

The `/now` endpoint calculates the most current process state by processing all available messages:

```http
# Get complete current state
GET /PROCESS_ID~process@1.0/now

# Get specific field from current state  
GET /PROCESS_ID~process@1.0/now/balance

# Get user-specific data
GET /PROCESS_ID~process@1.0/now/users/USER_ADDRESS

# Get nested data structures
GET /PROCESS_ID~process@1.0/now/config/settings/maxSupply
```

**When to use `/now`:**
- Need the absolute latest state
- Making critical decisions based on current data
- Willing to accept slightly higher latency for accuracy

### Cached State Access (`/compute`)

The `/compute` endpoint returns the latest known state without checking for new messages:

```http  
# Get cached state (faster)
GET /PROCESS_ID~process@1.0/compute

# Access cached user balance
GET /PROCESS_ID~process@1.0/compute/balances/USER_ADDRESS

# Get cached metrics
GET /PROCESS_ID~process@1.0/compute/stats/totalTransactions
```

**When to use `/compute`:**
- Building real-time UIs that need low latency
- Getting general information where slight delays are acceptable
- Implementing dashboards or analytics views

### Comparison: `/now` vs `/compute`

```javascript
// Performance comparison
const processId = "YOUR_PROCESS_ID";

// Fast but potentially slightly outdated
const cachedBalance = await fetch(`https://forward.computer/${processId}~process@1.0/compute/balance`);

// Slower but guaranteed current  
const currentBalance = await fetch(`https://forward.computer/${processId}~process@1.0/now/balance`);

// Typical response times:
// /compute: 50-200ms
// /now: 200-1000ms (depends on message backlog)
```

## Advanced Query Patterns

### Type Casting in Query Parameters

HyperBEAM supports sophisticated type casting directly in URLs using the `+type` syntax:

```http
# Basic types
GET /~message@1.0&name="Alice"&age+integer=30&active+boolean=true/user

# Complex types - lists
GET /~message@1.0&items+list="apple",42,"banana"/items/0
# Returns: "apple"

# Complex types - maps  
GET /~message@1.0&config+map=host="localhost";port+integer=3000/config/port
# Returns: 3000

# Floating point numbers
GET /~message@1.0&price+float=19.99&quantity+integer=5/total
```

**Supported Types:**
- `+integer`: Convert to integer
- `+float`: Convert to floating point  
- `+boolean`: Convert to boolean (`true`/`false`)
- `+list`: Parse as comma-separated list
- `+map`: Parse as semicolon-separated key-value pairs
- `+binary`: Treat as binary string (default)
- `+atom`: Convert to Erlang atom

### Nested Data Navigation

Navigate complex state structures using path segments:

```http
# Token contract with nested user data
GET /TOKEN_CONTRACT~process@1.0/now/users/ALICE/balance
# Returns Alice's token balance

# Configuration with multiple levels
GET /APP_PROCESS~process@1.0/compute/config/database/connection/host

# Array access by index
GET /GAME_PROCESS~process@1.0/now/leaderboard/0/name
# Returns name of top player

# Dynamic key access
GET /PROCESS~process@1.0/compute/data/USER_ADDRESS
# Returns data for specific user address
```

### Conditional Queries

Use query parameters to filter and modify requests:

```http
# Get balance with minimum threshold
GET /TOKEN~process@1.0/now/balance?user=ALICE&min+integer=100

# Get transactions in date range  
GET /PROCESS~process@1.0/compute/transactions?from+integer=1640995200&to+integer=1672531200

# Paginated results
GET /PROCESS~process@1.0/now/users?limit+integer=50&offset+integer=100

# Filtered by status
GET /VOTING~process@1.0/now/proposals?status="active"
```

## Building Data Pipelines

### Simple Pipelines

Chain operations using path segments:

```http
# Get process state → Extract balance → Calculate USD value
GET /TOKEN~process@1.0/now/balance/~lua@5.3a&script=return Args[1] * 1.25/result

# Get user data → Format as JSON → Apply template
GET /USER_PROCESS~process@1.0/compute/user/ALICE~json@1.0~template@1.0&format=profile
```

### Complex Processing Pipelines

Combine multiple devices for sophisticated data processing:

```http
# Token analytics pipeline:
# 1. Get current token state
# 2. Process with Lua analytics module  
# 3. Format results as JSON
# 4. Apply dashboard template
GET /TOKEN_CONTRACT~process@1.0/now/~lua@5.3a&module=ANALYTICS_MODULE/calculateMetrics/serialize~json@1.0/format~template@1.0&type=dashboard
```

### Real-World Pipeline Example

Calculate total circulating supply for a token contract:

```http
# Multi-step calculation:
# 1. Get all balances from token contract
# 2. Sum using Lua script
# 3. Subtract locked tokens
# 4. Format as JSON response
GET /TOKEN_CONTRACT~process@1.0/now/balances/~lua@5.3a&module=CALCULATOR_MODULE/sumBalances/subtract&locked+integer=1000000/format~json@1.0
```

```lua
-- Example Lua module for token calculations
local calculator = {}

function calculator.sumBalances(balances)
    local total = 0
    for address, balance in pairs(balances) do
        total = total + balance
    end
    return total
end

function calculator.subtract(amount, toSubtract)
    return amount - toSubtract
end

return calculator
```

## Working with Different Data Types

### JSON Data

Most AO processes store state as Lua tables, which HyperBEAM can serialize to JSON:

```http
# Automatic JSON serialization
GET /PROCESS~process@1.0/now/users~json@1.0
# Returns: {"alice": {"balance": 100}, "bob": {"balance": 50}}

# Pretty-printed JSON
GET /PROCESS~process@1.0/compute/config~json@1.0&pretty=true
```

### Binary Data

Handle binary data and file storage:

```http
# Get binary content
GET /FILE_STORAGE~process@1.0/now/files/document.pdf

# Get with proper Content-Type headers
GET /MEDIA_PROCESS~process@1.0/compute/images/logo.png
# Response includes: Content-Type: image/png
```

### Structured Data

Work with complex data structures:

```http
# Access array elements
GET /PROCESS~process@1.0/now/orders/5/items/0/product

# Filter arrays by conditions
GET /PROCESS~process@1.0/compute/transactions?status="pending"&amount+integer=>1000

# Aggregate operations
GET /SALES_PROCESS~process@1.0/now/sales/~lua@5.3a&script=aggregate/total
```

## Error Handling and Debugging

### Common Response Codes

```http
# Successful queries
200 OK - Request processed successfully
206 Partial Content - Partial data returned (pagination)

# Client errors  
400 Bad Request - Malformed URL or parameters
404 Not Found - Process or key doesn't exist
422 Unprocessable Entity - Invalid type casting or parameters

# Server errors
500 Internal Server Error - Device execution error
503 Service Unavailable - Node temporarily unavailable
```

### Error Response Format

```json
{
  "error": "key_not_found", 
  "message": "Key 'invalidField' not found in process state",
  "path": "/PROCESS~process@1.0/now/invalidField",
  "timestamp": "2024-01-15T10:30:00Z",
  "nodeId": "forward.computer"
}
```

### Debugging Techniques

**1. Inspect Raw State:**
```http
# Get complete process state for debugging
GET /PROCESS~process@1.0/now

# Check if specific key exists
GET /PROCESS~process@1.0/compute/balance
# vs
GET /PROCESS~process@1.0/compute/balances
```

**2. Use Message Device for Testing:**
```http
# Test data structures and type casting
GET /~message@1.0&test+integer=42&list+list="a","b","c"/test
# Returns: 42

GET /~message@1.0&test+integer=42&list+list="a","b","c"/list/1  
# Returns: "b"
```

**3. Trace Pipeline Steps:**
```http
# Test each step of pipeline individually
GET /PROCESS~process@1.0/now                           # Step 1
GET /PROCESS~process@1.0/now/users                     # Step 2  
GET /PROCESS~process@1.0/now/users/ALICE               # Step 3
GET /PROCESS~process@1.0/now/users/ALICE/balance       # Step 4
```

## Performance Optimization

### Caching Strategies

Use appropriate caching based on your use case:

```javascript
// Smart caching strategy
async function getBalance(processId, userId, requireRealTime = false) {
  const endpoint = requireRealTime ? 'now' : 'compute';
  const response = await fetch(
    `https://forward.computer/${processId}~process@1.0/${endpoint}/balances/${userId}`
  );
  return await response.json();
}

// Use cached data for UI updates
const displayBalance = await getBalance(processId, userId, false);

// Use real-time data for transactions
const exactBalance = await getBalance(processId, userId, true);
```

### Request Batching

Minimize requests by using pipelines:

```javascript
// Instead of multiple requests:
// const state = await fetch(`${node}/${process}~process@1.0/now`);
// const processed = await processData(state);
// const formatted = await formatResponse(processed);

// Use a single pipeline:
const result = await fetch(`${node}/${process}~process@1.0/now/~lua@5.3a&module=PROCESSOR/process/format~json@1.0`);
```

### Node Selection

Choose nodes based on performance and location:

```javascript
// Test node latency and select best performer
const nodes = [
  'https://forward.computer'
];

async function selectBestNode(nodes) {
  const results = await Promise.allSettled(
    nodes.map(async (node) => {
      const start = Date.now();
      await fetch(`${node}/~message@1.0&ping=true/ping`);
      return { node, latency: Date.now() - start };
    })
  );
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
    .sort((a, b) => a.latency - b.latency);
    
  return successful[0]?.node;
}
```

## Security Considerations

### Response Verification

Verify response authenticity using HyperBEAM signatures:

```javascript
async function verifyResponse(response) {
  const signature = response.headers.get('X-HyperBEAM-Signature');
  const hashPath = response.headers.get('X-HyperBEAM-HashPath');
  const data = await response.text();
  
  // Verify signature matches hashPath and data
  return await cryptoVerify(signature, hashPath, data);
}
```

### Input Sanitization

Always sanitize user inputs in query parameters:

```javascript
function sanitizeUserInput(input) {
  // Remove potentially harmful characters
  return encodeURIComponent(input).replace(/[^\w\-\.]/g, '');
}

// Safe query construction
const userId = sanitizeUserInput(userInput);
const url = `${node}/${process}~process@1.0/now/users/${userId}/balance`;
```

### Cross-Origin Security

Configure CORS appropriately when building web applications:

```javascript
// Most HyperBEAM nodes support CORS for browser access
const response = await fetch(`${node}/${process}~process@1.0/now`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Origin': 'https://your-app.com'
  }
});
```

## Integration Examples

### React Hook for Process State

```javascript
import { useState, useEffect } from 'react';

function useProcessState(processId, path, realTime = false) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchState() {
      try {
        setLoading(true);
        const endpoint = realTime ? 'now' : 'compute';
        const response = await fetch(
          `https://forward.computer/${processId}~process@1.0/${endpoint}${path}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setState(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setState(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchState();
    
    // Polling for real-time updates
    if (realTime) {
      const interval = setInterval(fetchState, 5000);
      return () => clearInterval(interval);
    }
  }, [processId, path, realTime]);
  
  return { state, loading, error };
}

// Usage in component
function TokenBalance({ processId, userId }) {
  const { state: balance, loading, error } = useProcessState(
    processId, 
    `/balances/${userId}`,
    false // Use cached data for UI
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>Balance: {balance} tokens</div>;
}
```

### Node.js Backend Integration

```javascript
import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Middleware for HyperBEAM queries
async function queryProcess(processId, path, realTime = false) {
  const endpoint = realTime ? 'now' : 'compute';
  const response = await fetch(
    `https://forward.computer/${processId}~process@1.0/${endpoint}${path}`
  );
  
  if (!response.ok) {
    throw new Error(`HyperBEAM query failed: ${response.statusText}`);
  }
  
  return await response.json();
}

// API endpoint for token data
app.get('/api/token/:processId/balance/:userId', async (req, res) => {
  try {
    const { processId, userId } = req.params;
    const balance = await queryProcess(processId, `/balances/${userId}`);
    res.json({ balance, userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint for token analytics
app.get('/api/token/:processId/analytics', async (req, res) => {
  try {
    const { processId } = req.params;
    
    // Use pipeline to calculate analytics
    const analytics = await fetch(
      `https://forward.computer/${processId}~process@1.0/now/~lua@5.3a&module=ANALYTICS_MODULE/calculateMetrics/serialize~json@1.0`
    );
    
    if (!analytics.ok) {
      throw new Error('Analytics calculation failed');
    }
    
    res.json(await analytics.json());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Best Practices

### URL Construction

```javascript
// Good: Build URLs systematically
function buildQueryURL(node, processId, path, params = {}) {
  const baseUrl = `${node}/${processId}~process@1.0/compute${path}`;
  const queryParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'number') {
      queryParams.set(`${key}+integer`, value.toString());
    } else if (typeof value === 'boolean') {
      queryParams.set(`${key}+boolean`, value.toString());
    } else {
      queryParams.set(key, value);
    }
  }
  
  return queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
}

// Usage
const url = buildQueryURL('https://forward.computer', 'TOKEN_PROCESS', '/balance', {
  user: 'ALICE_ADDRESS',
  min: 100,
  active: true
});
```

### Error Handling

```javascript
// Comprehensive error handling
async function robustQuery(processId, path, options = {}) {
  const { 
    realTime = false, 
    retries = 3, 
    timeout = 5000,
    nodes = ['https://forward.computer', 'https://ao-mu-1.onrender.com']
  } = options;
  
  for (const node of nodes) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const endpoint = realTime ? 'now' : 'compute';
        const response = await fetch(
          `${node}/${processId}~process@1.0/${endpoint}${path}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          return await response.json();
        }
        
        if (response.status < 500) {
          throw new Error(`Client error: ${response.status}`);
        }
        
        // Server error, try next attempt
        continue;
        
      } catch (error) {
        if (attempt === retries - 1) {
          throw error; // Last attempt failed
        }
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  throw new Error('All nodes and retries exhausted');
}
```

## Next Steps

Master advanced HyperBEAM capabilities:

1. **Build Serverless Functions**: [Lua Serverless Functions](/concepts/decentralized-computing/hyperbeam/lua-serverless)
2. **Create Custom Devices**: [HyperBEAM Devices](/concepts/decentralized-computing/hyperbeam/hyperbeam-devices)
3. **AO Process Development**: [What are AO Processes](/concepts/decentralized-computing/ao-processes/what-are-ao-processes)
4. **Production Integration**: [Builder's Journey](/guides/builder-journey/)

## Resources

- **HyperBEAM Path Documentation**: [Pathing Guide](https://hyperbeam.arweave.net/build/pathing-in-hyperbeam.html)
- **Public Nodes**: [Node Directory](https://ao.arweave.dev/networks)
- **AO Connect Migration**: [HyperBEAM Migration Guide](https://cookbook.ao.arweave.net/guides/migrating-to-hyperbeam/)
- **Community Support**: [AO Discord](https://discord.gg/arweave)