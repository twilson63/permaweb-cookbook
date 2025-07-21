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

```mermaid
graph TB
    A[HTTP Request] --> B[HyperBEAM Router]
    B --> C{Device Selection}
    C -->|~process@1.0| D[Process Device]
    C -->|~lua@5.3a| E[Lua Device] 
    C -->|~wasm64@1.0| F[WASM Device]
    C -->|~json@1.0| G[JSON Device]
    
    D --> H[Process State Management]
    E --> I[Lua Script Execution]
    F --> J[WebAssembly Execution]
    G --> K[JSON Processing]
    
    H --> L[HTTP Response]
    I --> L
    J --> L
    K --> L
    
    subgraph "Device Ecosystem"
        M[Security Devices]
        N[Utility Devices]
        O[Custom Devices]
    end
```

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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

```http
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

Build custom devices in Erlang to extend HyperBEAM functionality:

```erlang
%% custom_analytics_device.erl
-module(custom_analytics_device).
-behavior(hyperbeam_device).

-export([handle_request/3, device_info/0]).

%% Device metadata
device_info() ->
    #{
        name => <<"analytics">>,
        version => <<"1.0">>,
        description => <<"Custom analytics processing device">>,
        supported_operations => [<<"calculate">>, <<"aggregate">>, <<"visualize">>]
    }.

%% Handle incoming requests
handle_request(Operation, Args, State) ->
    case Operation of
        <<"calculate">> ->
            Result = perform_analytics(Args),
            {ok, Result, State};
        <<"aggregate">> ->
            Result = aggregate_data(Args),
            {ok, Result, State};
        <<"visualize">> ->
            Chart = generate_chart(Args),
            {ok, Chart, State};
        _ ->
            {error, {unsupported_operation, Operation}, State}
    end.

%% Private functions
perform_analytics(Args) ->
    Data = maps:get(<<"data">>, Args, []),
    % Implement custom analytics logic
    process_analytics_data(Data).

aggregate_data(Args) ->
    Data = maps:get(<<"data">>, Args, []),
    GroupBy = maps:get(<<"group_by">>, Args, <<"category">>),
    % Implement aggregation logic
    aggregate_by_field(Data, GroupBy).

generate_chart(Args) ->
    Data = maps:get(<<"data">>, Args, []),
    ChartType = maps:get(<<"type">>, Args, <<"bar">>),
    % Generate chart data structure
    create_chart(Data, ChartType).
```

### Native Implemented Functions (NIFs)

For maximum performance, implement critical functions in C or Rust:

```c
// high_performance_crypto.c
#include "erl_nif.h"
#include <openssl/sha.h>

static ERL_NIF_TERM
hash_sha256_nif(ErlNifEnv* env, int argc, const ERL_NIF_TERM argv[])
{
    ErlNifBinary input, output;
    
    if (!enif_inspect_binary(env, argv[0], &input)) {
        return enif_make_badarg(env);
    }
    
    if (!enif_alloc_binary(SHA256_DIGEST_LENGTH, &output)) {
        return enif_make_atom(env, "memory_error");
    }
    
    SHA256(input.data, input.size, output.data);
    
    return enif_make_binary(env, &output);
}

static ErlNifFunc nif_funcs[] = {
    {"hash_sha256", 1, hash_sha256_nif}
};

ERL_NIF_INIT(high_performance_crypto, nif_funcs, NULL, NULL, NULL, NULL)
```

## Device Discovery and Routing

### Device Registry

HyperBEAM maintains a registry of available devices:

```http
# List all available devices
GET /~meta@1.0/devices

# Get specific device information
GET /~meta@1.0/device/~lua@5.3a

# Check device availability
GET /~meta@1.0/device/~wasm64@1.0/available
```

### Dynamic Device Loading

Devices can be loaded dynamically based on demand:

```erlang
%% Device loader
-module(device_loader).
-export([load_device/2, unload_device/1]).

load_device(DeviceName, DeviceModule) ->
    case code:load_file(DeviceModule) of
        {module, DeviceModule} ->
            register_device(DeviceName, DeviceModule),
            {ok, loaded};
        {error, Reason} ->
            {error, {load_failed, Reason}}
    end.

unload_device(DeviceName) ->
    case unregister_device(DeviceName) of
        ok ->
            code:purge(get_device_module(DeviceName)),
            {ok, unloaded};
        {error, Reason} ->
            {error, Reason}
    end.
```

### Load Balancing and Routing

Route requests to optimal device instances:

```erlang
%% Device router
-module(device_router).
-export([route_request/3]).

route_request(DeviceName, Request, Options) ->
    AvailableInstances = get_device_instances(DeviceName),
    OptimalInstance = select_optimal_instance(AvailableInstances, Options),
    forward_request(OptimalInstance, Request).

select_optimal_instance(Instances, Options) ->
    LoadMetrics = get_load_metrics(Instances),
    LatencyMetrics = get_latency_metrics(Instances),
    ResourceMetrics = get_resource_metrics(Instances),
    
    % Weighted scoring algorithm
    Scores = calculate_instance_scores(Instances, LoadMetrics, LatencyMetrics, ResourceMetrics),
    select_best_score(Scores).
```

## Performance and Optimization

### Device Performance Characteristics

| Device | Startup Time | Memory Usage | CPU Usage | I/O Intensity |
|--------|--------------|--------------|-----------|---------------|
| `~lua@5.3a` | Very Low | Low | Low-Medium | Low |
| `~wasm64@1.0` | Low | Medium | Medium-High | Low |
| `~process@1.0` | Medium | High | Medium | High |
| `~json@1.0` | Very Low | Low | Low | Low |
| `~relay@1.0` | Low | Low | Low | High |

### Optimization Strategies

**1. Device Selection:**
```http
# Choose optimal device for task
# For simple data transformation:
GET /~json@1.0&data=...

# For complex computation:
GET /~wasm64@1.0&module=COMPUTE_MODULE

# For state queries:
GET /PROCESS~process@1.0/compute  # (cached, faster)
```

**2. Request Batching:**
```http
# Instead of multiple requests, use pipelines:
GET /DATA~process@1.0/now/~lua@5.3a&module=PROCESSOR/batch_process/~json@1.0
```

**3. Caching Strategies:**
```javascript
// Client-side caching
const deviceCache = new Map();

async function cachedDeviceCall(devicePath, ttl = 60000) {
    const cacheKey = devicePath;
    const cached = deviceCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.data;
    }
    
    const response = await fetch(`https://forward.computer${devicePath}`);
    const data = await response.json();
    
    deviceCache.set(cacheKey, {
        data,
        timestamp: Date.now()
    });
    
    return data;
}
```

### Resource Management

**Memory Management:**
```erlang
%% Device memory monitoring
-module(device_memory).
-export([monitor_device_memory/1]).

monitor_device_memory(DevicePid) ->
    {memory, Memory} = process_info(DevicePid, memory),
    case Memory > get_memory_threshold() of
        true ->
            trigger_garbage_collection(DevicePid),
            log_memory_warning(DevicePid, Memory);
        false ->
            ok
    end.
```

**CPU Scheduling:**
```erlang
%% Load balancing
-module(device_scheduler).
-export([schedule_device_execution/2]).

schedule_device_execution(DeviceRequest, Priority) ->
    AvailableWorkers = get_available_workers(),
    WorkerLoad = get_worker_loads(AvailableWorkers),
    OptimalWorker = select_worker(WorkerLoad, Priority),
    assign_work(OptimalWorker, DeviceRequest).
```

## Future Device Ecosystem

### Specialized Hardware Integration

**GPU Computing Devices:**
- `~cuda@12.0` - NVIDIA CUDA computation
- `~opencl@3.0` - OpenCL parallel computing  
- `~metal@2.4` - Apple Metal performance shaders

**AI/ML Devices:**
- `~tensorflow@2.x` - TensorFlow model inference
- `~pytorch@1.x` - PyTorch model execution
- `~onnx@1.x` - ONNX runtime for cross-platform models

**Quantum Computing Devices:**
- `~qiskit@1.0` - IBM Qiskit quantum circuits
- `~cirq@1.0` - Google Cirq quantum programming

### Domain-Specific Devices

**Financial Computing:**
- `~defi@1.0` - DeFi protocol implementations
- `~risk@1.0` - Risk analysis and calculations
- `~trading@1.0` - Algorithmic trading strategies

**Scientific Computing:**
- `~numpy@1.0` - Numerical computing arrays
- `~scipy@1.0` - Scientific computing libraries
- `~sympy@1.0` - Symbolic mathematics

**Media Processing:**
- `~ffmpeg@6.0` - Video and audio processing
- `~imagemagick@7.0` - Image manipulation
- `~webgl@2.0` - 3D graphics rendering

### Cross-Chain and Interoperability

**Blockchain Integration Devices:**
- `~ethereum@1.0` - Ethereum blockchain interaction
- `~bitcoin@1.0` - Bitcoin network integration
- `~cosmos@1.0` - Cosmos ecosystem connectivity
- `~polkadot@1.0` - Polkadot parachain communication

## Security Considerations

### Device Security Model

**Sandboxing:**
- Each device runs in isolated environment
- Memory protection between devices
- Resource quotas and limits
- Permission-based access control

**Verification:**
- Device signature verification
- Code integrity checking
- Runtime behavior monitoring
- Audit logging for security events

**Network Security:**
- Encrypted communication between devices
- Authentication for device-to-device communication
- Rate limiting and DDoS protection
- Intrusion detection and response

### Best Practices

**1. Device Selection Security:**
```http
# Verify device authenticity
GET /~snp@1.0/verify/device/~lua@5.3a

# Use specific versions
GET /~lua@5.3a&script=... # Good
GET /~lua&script=...       # Avoid (version unspecified)
```

**2. Input Validation:**
```erlang
validate_device_input(DeviceArgs) ->
    RequiredFields = [<<"script">>, <<"data">>],
    case validate_required_fields(DeviceArgs, RequiredFields) of
        ok ->
            sanitize_input(DeviceArgs);
        {error, MissingFields} ->
            {error, {missing_fields, MissingFields}}
    end.
```

**3. Resource Limits:**
```erlang
%% Set execution limits
execute_device_with_limits(Device, Args) ->
    Limits = #{
        max_memory => 100 * 1024 * 1024, % 100MB
        max_execution_time => 30000,      % 30 seconds
        max_network_requests => 10
    },
    execute_with_constraints(Device, Args, Limits).
```

## Next Steps

Explore the broader HyperBEAM ecosystem:

1. **Build Custom Devices**: [Device Development Guide](https://hyperbeam.arweave.net/build/devices/)
2. **Lua Programming**: [Lua Serverless Functions](/concepts/decentralized-computing/hyperbeam/lua-serverless)
3. **Process Integration**: [AO Process Development](/concepts/decentralized-computing/ao-processes/what-are-ao-processes)
4. **Production Deployment**: [Builder's Journey](/guides/builder-journey/)

## Resources

- **HyperBEAM Device Documentation**: [Official Device Docs](https://hyperbeam.arweave.net/build/devices/)
- **Erlang/OTP Documentation**: [Erlang Reference](https://www.erlang.org/doc/)
- **Device Development Kit**: [GitHub Repository](https://github.com/permaweb/hyperbeam-devices)
- **Community Devices**: [Device Registry](https://ao.arweave.dev/devices)
- **Support and Discussion**: [AO Discord](https://discord.gg/arweave)