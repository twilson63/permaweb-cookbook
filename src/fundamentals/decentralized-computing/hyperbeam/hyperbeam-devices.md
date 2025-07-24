---
title: "HyperBEAM Devices"
description: "Understanding HyperBEAM's modular device architecture for extensible decentralized computing"
difficulty: "Advanced"
stability: "Cutting-edge"
timeEstimate: "45 minutes"
---

# HyperBEAM Devices

HyperBEAM devices are the modular building blocks that power the AO Computer. Think of them as specialized engines or services that can be plugged into the AO framework to provide specific computational capabilities. This modularity is key to AO's flexibility, extensibility, and ability to evolve with new technologies.

## Understanding the Device Architecture

### What Are Devices?

In AO-Core and HyperBEAM, **Devices** are modular components responsible for processing and interpreting Messages. They define the specific logic for how computations are performed, data is handled, or interactions occur within the AO ecosystem.

Each device is essentially an Erlang module that implements a specific interface, allowing it to:
- **Define computation logic** - Dictate how message instructions are executed
- **Enable specialization** - Allow nodes to focus on specific computational tasks  
- **Promote modularity** - Add new functionality without altering the core protocol
- **Distribute workload** - Handle different parts of complex tasks in parallel

**HyperBEAM Device Architecture:**

```
HTTP Request
     ↓
HyperBEAM Router
     ↓
Device Selection
     ↓
┌─────────────────────────────────────────┐
│ Device Types:                           │
│ • ~process@1.0  → Process State Mgmt    │
│ • ~lua@5.3a     → Lua Script Execution │
│ • ~wasm64@1.0   → WebAssembly Execution│
│ • ~json@1.0     → JSON Processing      │
└─────────────────────────────────────────┘
     ↓
Processing Results
     ↓
HTTP Response

Device Ecosystem:
┌─────────────────────────────────────────┐
│ • Security Devices (authentication)     │
│ • Utility Devices (routing, caching)   │
│ • Custom Devices (domain-specific)     │
│ • Communication Devices (relays)       │
│ • Storage Devices (state management)   │
└─────────────────────────────────────────┘
```

This modular architecture allows HyperBEAM to handle diverse computational tasks by routing requests to specialized devices, each optimized for specific types of processing.

### Device Naming and Versioning

Devices follow a consistent naming convention that makes them easy to identify and use:

**Format:** `~name@version` or `dev_name` (for internal devices)

**Examples:**
- `~process@1.0` - Primary process management device
- `~lua@5.3a` - Lua 5.3 execution device  
- `~wasm64@1.0` - WebAssembly 64-bit execution device
- `dev_router` - Internal routing device (development prefix)

The tilde (`~`) indicates a primary, user-facing device, while the `dev_` prefix is used for internal or utility devices in the source code.

### Versioning Strategy

Versioning indicates the specific interface and behavior of the device:
- **Semantic versioning** - Major.minor.patch format
- **Backward compatibility** - Breaking changes increment major version
- **Feature additions** - New features increment minor version
- **Bug fixes** - Patches increment patch version

## Core HyperBEAM Devices

### Process Management Devices

#### `~process@1.0` - Process State Manager

The process device manages persistent, shared computational states similar to traditional smart contracts, but with greater flexibility.

```
# Access current process state
GET /PROCESS_ID~process@1.0/now

# Get cached state (faster)
GET /PROCESS_ID~process@1.0/compute

# Access specific state fields
GET /PROCESS_ID~process@1.0/now/balance
GET /PROCESS_ID~process@1.0/compute/users/USER_ADDRESS
```

**Key Functions:**
- **`now`** - Calculates real-time process state by processing all messages
- **`compute`** - Returns the latest known state without checking for new messages
- **State persistence** - Automatic state snapshots to Arweave
- **Message ordering** - Ensures deterministic state transitions

**Use Cases:**
- Token contracts and DeFi applications
- Voting and governance systems
- Game state management
- Decentralized databases

#### `~scheduler@1.0` - Message Scheduling

Handles the ordering and execution timing of messages within processes.

```
# Query scheduler status
GET /PROCESS_ID~scheduler@1.0/status

# Get message queue information
GET /PROCESS_ID~scheduler@1.0/queue/pending
```

**Responsibilities:**
- Message ordering and consensus
- Execution timing coordination
- Load balancing across compute units
- Fault tolerance and recovery

### Execution Devices

#### `~lua@5.3a` - Lua Script Execution

Executes Lua scripts for serverless functions and data processing.

```
# Simple calculation
GET /~lua@5.3a&script=return 2 + 3 * 4/result

# With parameters
GET /~lua@5.3a&script=return Args.name .. " is " .. Args.age .. " years old"&name="Alice"&age+integer=25/result

# Using modules
GET /~lua@5.3a&module=MODULE_TX_ID&script=return math_utils.factorial(Args.n)&n+integer=5/result
```

**Capabilities:**
- Full Lua 5.3 language support
- Module loading from Arweave transactions
- JSON processing and manipulation
- String processing and regex
- Mathematical computations
- HTTP client functionality (via libraries)

**Performance Characteristics:**
- Lightweight execution overhead
- Fast startup time (no cold starts)
- Memory efficient for small to medium computations
- Excellent for data transformation and business logic

#### `~wasm64@1.0` - WebAssembly Execution

Executes WebAssembly code for high-performance computations written in languages like Rust, C++, Go, and others.

```
# Execute WASM module
GET /~wasm64@1.0&module=WASM_MODULE_TX_ID/function_name

# With parameters
GET /~wasm64@1.0&module=WASM_MODULE_TX_ID&arg1+integer=100&arg2="test"/compute
```

**Advantages:**
- **High performance** - Near-native execution speed
- **Multiple languages** - Support for Rust, C++, Go, AssemblyScript
- **Sandboxed execution** - Secure isolated environment
- **Predictable performance** - No garbage collection pauses

**Use Cases:**
- Cryptographic operations (hashing, signatures, ZK proofs)
- Image and video processing
- Machine learning inference
- Scientific computing
- Game engines and simulations

**Example WASM Module (Rust):**
```rust
// Compile to WASM and deploy to Arweave
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

#[wasm_bindgen]
pub fn hash_data(data: &str) -> String {
    use sha2::{Sha256, Digest};
    let mut hasher = Sha256::new();
    hasher.update(data);
    format!("{:x}", hasher.finalize())
}
```

### Data Processing Devices

#### `~json@1.0` - JSON Manipulation

Provides JSON data structure access and manipulation capabilities.

```
# Format process state as JSON
GET /PROCESS_ID~process@1.0/now~json@1.0

# Pretty-print JSON
GET /PROCESS_ID~process@1.0/compute~json@1.0&pretty=true

# Extract specific JSON fields
GET /~json@1.0&data={"users":{"alice":{"balance":100}}}/users/alice/balance
```

**Features:**
- JSON serialization and deserialization
- Path-based field access
- Pretty printing and formatting
- Schema validation (when configured)
- Type conversion and casting

#### `~message@1.0` - Message Processing

The default device that resolves keys to their literal values within messages.

```
# Create temporary message with data
GET /~message@1.0&greeting="Hello"&count+integer=42/count
# Response: 42

# Complex data structures
GET /~message@1.0&config+map=host="localhost";port+integer=3000&items+list="a","b","c"/config/port
# Response: 3000
```

**Type Casting Support:**
- `+integer` - Convert to integer
- `+float` - Convert to floating point
- `+boolean` - Convert to boolean
- `+list` - Parse comma-separated values
- `+map` - Parse key-value pairs
- `+binary` - Treat as binary string (default)

### Communication Devices

#### `~relay@1.0` - Message Relay

Forwards messages between AO nodes or to external HTTP endpoints.

```
# Relay GET request to external API
GET /~relay@1.0/call?method=GET&path=https://api.example.com/data

# Relay POST with data
POST /~relay@1.0/call?method=POST&path=https://webhook.site/your-webhook
Content-Type: application/json

{"message": "Hello from AO"}

# Relay to another AO process
GET /~relay@1.0/process/TARGET_PROCESS_ID?action=GetBalance&user=ALICE
```

**Use Cases:**
- **Cross-chain bridges** - Connect to other blockchain networks
- **External API integration** - Fetch data from Web2 services
- **Inter-process communication** - Route messages between AO processes
- **Webhook delivery** - Send notifications to external services

### Security and Verification Devices

#### `~snp@1.0` - Secure Enclave Verification

Handles Trusted Execution Environment (TEE) attestation and verification.

```
# Get TEE attestation report
GET /~snp@1.0/attestation

# Verify node is running in genuine TEE
GET /~snp@1.0/verify
```

**Security Features:**
- AMD SEV-SNP attestation
- Intel TXT support
- Hardware security verification
- Remote attestation protocols
- Cryptographic proof generation

#### `dev_codec_httpsig` - HTTP Signature Processing

Manages HTTP message signing and verification for authentication.

**Capabilities:**
- HTTP signature generation and verification
- Multiple signature algorithms (RSA, ECDSA, EdDSA)
- Request/response integrity verification
- Authentication and authorization

### Utility and System Devices

#### `~meta@1.0` - Node Configuration

Configures the HyperBEAM node itself including hardware specs, supported devices, and payment information.

```
# Get node capabilities
GET /~meta@1.0/capabilities

# Get supported devices
GET /~meta@1.0/devices

# Get node status
GET /~meta@1.0/status
```

**Configuration Options:**
- Hardware specifications
- Available compute resources
- Supported device list
- Payment and billing information
- Network connectivity options

#### `dev_cron` - Task Scheduling

Coordinates scheduled task execution and workflow management.

**Features:**
- Cron-like task scheduling
- Recurring job management
- Event-driven automation
- Workflow orchestration

#### `dev_monitor` - System Monitoring

Monitors process activity, performance metrics, and system health.

**Monitoring Capabilities:**
- Process execution metrics
- Resource utilization tracking
- Error rate monitoring
- Performance benchmarking
- Alert generation

### Financial and Access Control Devices

#### `~p4@1.0` - Payment Processing

Manages metering, billing, and micropayments for node services.

```
# Check payment status
GET /~p4@1.0/balance/USER_ADDRESS

# Get pricing information
GET /~p4@1.0/pricing/compute
```

**Payment Features:**
- Micropayment processing
- Usage-based billing
- Multi-token support
- Payment channel management
- Revenue sharing protocols

#### `~faff@1.0` - Access Control

Handles authorization and access control for protected resources.

**Access Control Features:**
- Role-based access control (RBAC)
- Attribute-based access control (ABAC)
- Token-based authentication
- Multi-signature authorization
- Temporary access grants

### Data Storage and Management

#### `~patch@1.0` - State Management

Applies state updates directly to processes, often used for data migration and management.

```
# Apply state patch to process
POST /PROCESS_ID~patch@1.0/apply
Content-Type: application/json
{
  "operation": "update",
  "path": "/users/alice/balance",
  "value": 1500
}

# Get patch history
GET /PROCESS_ID~patch@1.0/history
```

**Patch Operations:**
- State updates and migrations
- Data consistency maintenance
- Version control for process state
- Rollback and recovery operations

## Advanced Device Concepts

### Device Composition and Pipelines

Devices can be chained together to create sophisticated processing pipelines:

```
# Multi-device pipeline:
# 1. Get process state
# 2. Transform with Lua
# 3. Format as JSON
# 4. Apply template
GET /TOKEN_PROCESS~process@1.0/now/~lua@5.3a&module=ANALYTICS_MODULE/calculateMetrics/~json@1.0/format~template@1.0&type=dashboard
```

### Device Specialization

Nodes can choose which devices to support, allowing for specialization:

**Compute-Optimized Nodes:**
- Focus on `~wasm64@1.0` and `~lua@5.3a` devices
- High-performance processors and memory
- Optimized for CPU-intensive workloads

**Storage-Optimized Nodes:**
- Specialize in `~process@1.0` and `~patch@1.0` devices  
- Large storage capacity and fast I/O
- Optimized for state management and data persistence

**Security-Focused Nodes:**
- Run `~snp@1.0` and security-related devices
- Hardware security modules (HSMs)
- Trusted Execution Environments (TEEs)

### Custom Device Development

While HyperBEAM comes with a comprehensive set of built-in devices, you can create custom devices in Erlang to extend functionality for specialized use cases. This is an advanced topic that allows you to build domain-specific functionality tailored to your exact needs.

For detailed guidance on building custom devices, see the [HyperBEAM Device Development Guide](https://hyperbeam.arweave.net/build/devices/building-devices.html).

## Device Discovery and Routing

HyperBEAM automatically routes requests to the appropriate devices based on the URL path. You can discover available devices on any node:

```
# List all available devices
GET /~meta@1.0/devices

# Get information about a specific device
GET /~meta@1.0/device/~lua@5.3a
```

Devices are automatically load-balanced across available instances, with HyperBEAM handling routing optimization internally.

## Performance Considerations

Different devices have varying performance characteristics:

- **`~lua@5.3a`** - Fast startup, low resource usage, ideal for simple logic
- **`~wasm64@1.0`** - Higher performance for complex computations
- **`~process@1.0`** - Use `/compute` for cached state, `/now` for real-time updates
- **`~json@1.0`** - Very lightweight for data serialization

**Optimization Tips:**
- Use device pipelines to chain operations in a single request
- Cache frequently accessed data at the application level
- Choose the right device for your workload (Lua for simple logic, WASM for computation)

## Extensible Device Ecosystem

The modular nature of HyperBEAM devices enables endless possibilities for expansion. The community and ecosystem are continuously developing new devices for:

- **Specialized Hardware** - GPU computing, AI/ML acceleration, quantum computing
- **Domain-Specific Logic** - DeFi protocols, scientific computing, media processing
- **Cross-Chain Integration** - Bridges to other blockchain networks
- **Industry Solutions** - Custom devices for specific business needs

This extensibility ensures HyperBEAM can adapt to new technologies and use cases without requiring changes to the core protocol.

## Security Considerations

HyperBEAM devices run in isolated environments with built-in security features:

- **Sandboxing** - Each device operates in its own isolated environment
- **Resource Limits** - Automatic memory and execution time constraints
- **Verification** - Device signatures and integrity checking
- **Access Control** - Permission-based device access

**Best Practices:**
- Always specify device versions (e.g., `~lua@5.3a` not just `~lua`)
- Validate inputs when building applications that use devices
- Use TEE-enabled nodes (`~snp@1.0`) for sensitive computations

## Next Steps

Explore the broader HyperBEAM ecosystem:

1. **Build Custom Devices**: [Device Development Guide](https://hyperbeam.arweave.net/build/devices/building-devices.html)
2. **Lua Programming**: [Lua Serverless Functions](../hyperbeam/lua-serverless)
3. **Process Integration**: [AO Process Development](../ao-processes/what-are-ao-processes)
4. **Production Deployment**: [Builder's Journey](../../../guides/index)

## Resources

- **HyperBEAM Device Documentation**: [Official Device Docs](https://hyperbeam.arweave.net/build/devices/building-devices.html)
- **Erlang/OTP Documentation**: [Erlang Reference](https://www.erlang.org/doc/)