---
title: "Process Communication"
description: "Master asynchronous message passing between AO processes for distributed computing"
difficulty: "Advanced"
stability: "Cutting-edge"
timeEstimate: "40 minutes"
---

# Process Communication

AO processes communicate through asynchronous message passing, enabling sophisticated distributed computing patterns. Unlike synchronous smart contract calls, AO message passing allows for non-blocking communication, complex workflows, and resilient distributed systems.

## Message Fundamentals

### Message Structure

Every AO message contains essential components for routing and processing:

```javascript
// Complete message structure
const message = {
  Id: "MESSAGE_TX_ID",           // Unique message identifier
  Process: "TARGET_PROCESS_ID",  // Destination process
  Owner: "SENDER_ADDRESS",       // Message sender
  From: "SOURCE_PROCESS_ID",     // Source process (if process-to-process)
  Timestamp: 1699123456789,      // Message timestamp
  Data: "message payload",       // Message content
  Tags: [                        // Routing and metadata tags
    { name: "Action", value: "Transfer" },
    { name: "Recipient", value: "USER_ADDRESS" },
    { name: "Quantity", value: "1000" }
  ]
};
```

### Message Types

AO supports several communication patterns:

**Direct Messages**
- Point-to-point communication between processes
- Immediate response expected
- Used for queries and simple operations

**Broadcast Messages**
- One-to-many communication pattern
- Published to multiple subscribers
- Event-driven architecture support

**Delayed Messages**
- Scheduled execution at future timestamps
- Enables cron-like functionality
- Time-based automation

**Cross-Process Calls**
- Process A sends message to Process B
- Process B responds with result
- Enables distributed computation

## Sending Messages

### Basic Message Sending

Send messages from client applications:

```javascript
import { connect, createDataItemSigner } from "@permaweb/aoconnect";

const ao = connect();

// Send message to process
const messageId = await ao.message({
  process: "TARGET_PROCESS_ID",
  tags: [
    { name: "Action", value: "GetBalance" },
    { name: "Account", value: "USER_ADDRESS" }
  ],
  data: JSON.stringify({ requestId: "req_123" }),
  signer: createDataItemSigner(wallet)
});

console.log("Message sent:", messageId);
```

### Process-to-Process Messaging

Processes can send messages to other processes:

```lua
-- Send message from within a process handler
Handlers.add(
  "ForwardRequest",
  Handlers.utils.hasMatchingTag("Action", "ForwardRequest"),
  function(msg)
    local targetProcess = msg.Tags.TargetProcess
    local forwardData = msg.Data
    
    -- Forward the request to another process
    ao.send({
      Target = targetProcess,
      Action = "ProcessData",
      Data = forwardData,
      OriginalSender = msg.From,
      RequestId = msg.Tags.RequestId
    })
    
    -- Acknowledge receipt
    ao.send({
      Target = msg.From,
      Data = "Request forwarded to " .. targetProcess
    })
  end
)
```

### Response Handling

Handle responses in the originating process:

```lua
-- Handle response from another process
Handlers.add(
  "HandleResponse",
  Handlers.utils.hasMatchingTag("Action", "ProcessDataResponse"),
  function(msg)
    local originalSender = msg.Tags.OriginalSender
    local requestId = msg.Tags.RequestId
    
    -- Process the response
    local result = processResponse(msg.Data)
    
    -- Send result back to original sender
    if originalSender then
      ao.send({
        Target = originalSender,
        Data = json.encode({
          requestId = requestId,
          result = result,
          processedBy = msg.From,
          timestamp = msg.Timestamp
        })
      })
    end
  end
)
```

## Communication Patterns

### Request-Response Pattern

Implement synchronous-like communication:

```lua
-- Service process that handles requests
PendingRequests = PendingRequests or {}

Handlers.add(
  "ServiceRequest",
  Handlers.utils.hasMatchingTag("Action", "ServiceRequest"),
  function(msg)
    local requestId = msg.Tags.RequestId or msg.Id
    
    -- Process the request
    local result = handleServiceRequest(msg.Data)
    
    -- Send response
    ao.send({
      Target = msg.From,
      Action = "ServiceResponse",
      RequestId = requestId,
      Data = json.encode(result)
    })
  end
)

-- Client-side response handling
Handlers.add(
  "ServiceResponse",
  Handlers.utils.hasMatchingTag("Action", "ServiceResponse"),
  function(msg)
    local requestId = msg.Tags.RequestId
    local result = json.decode(msg.Data)
    
    -- Handle the response
    handleServiceResponse(requestId, result)
  end
)
```

### Pub/Sub Messaging

Implement publish-subscribe patterns:

```lua
-- Publisher process
Subscribers = Subscribers or {}

-- Subscribe handler
Handlers.add(
  "Subscribe",
  Handlers.utils.hasMatchingTag("Action", "Subscribe"),
  function(msg)
    local topic = msg.Tags.Topic
    local subscriber = msg.From
    
    if not Subscribers[topic] then
      Subscribers[topic] = {}
    end
    
    -- Add subscriber if not already subscribed
    local found = false
    for _, sub in ipairs(Subscribers[topic]) do
      if sub == subscriber then
        found = true
        break
      end
    end
    
    if not found then
      table.insert(Subscribers[topic], subscriber)
    end
    
    ao.send({
      Target = subscriber,
      Data = "Subscribed to topic: " .. topic
    })
  end
)

-- Publish handler
Handlers.add(
  "Publish",
  Handlers.utils.hasMatchingTag("Action", "Publish"),
  function(msg)
    local topic = msg.Tags.Topic
    local data = msg.Data
    
    if Subscribers[topic] then
      for _, subscriber in ipairs(Subscribers[topic]) do
        ao.send({
          Target = subscriber,
          Action = "Message",
          Topic = topic,
          Publisher = msg.From,
          Data = data,
          Timestamp = msg.Timestamp
        })
      end
      
      ao.send({
        Target = msg.From,
        Data = "Published to " .. #Subscribers[topic] .. " subscribers"
      })
    else
      ao.send({
        Target = msg.From,
        Data = "No subscribers for topic: " .. topic
      })
    end
  end
)
```

### Event Streaming

Build real-time event streams:

```lua
-- Event stream process
Events = Events or {}
MaxEvents = 1000  -- Keep last 1000 events

Handlers.add(
  "EmitEvent",
  Handlers.utils.hasMatchingTag("Action", "EmitEvent"),
  function(msg)
    local event = {
      id = msg.Id,
      type = msg.Tags.EventType,
      data = msg.Data,
      emitter = msg.From,
      timestamp = msg.Timestamp
    }
    
    -- Add to event stream
    table.insert(Events, event)
    
    -- Keep only recent events
    if #Events > MaxEvents then
      table.remove(Events, 1)
    end
    
    -- Broadcast to subscribers
    if Subscribers["events"] then
      for _, subscriber in ipairs(Subscribers["events"]) do
        ao.send({
          Target = subscriber,
          Action = "Event",
          Data = json.encode(event)
        })
      end
    end
  end
)

-- Get event history
Handlers.add(
  "GetEvents",
  Handlers.utils.hasMatchingTag("Action", "GetEvents"),
  function(msg)
    local limit = tonumber(msg.Tags.Limit) or 50
    local eventType = msg.Tags.EventType
    
    local filteredEvents = Events
    
    -- Filter by event type if specified
    if eventType then
      filteredEvents = {}
      for _, event in ipairs(Events) do
        if event.type == eventType then
          table.insert(filteredEvents, event)
        end
      end
    end
    
    -- Get recent events
    local recentEvents = {}
    local start = math.max(1, #filteredEvents - limit + 1)
    for i = start, #filteredEvents do
      table.insert(recentEvents, filteredEvents[i])
    end
    
    ao.send({
      Target = msg.From,
      Data = json.encode(recentEvents)
    })
  end
)
```

### Workflow Orchestration

Chain processes together in complex workflows:

```lua
-- Workflow orchestrator process
Workflows = Workflows or {}

Handlers.add(
  "StartWorkflow",
  Handlers.utils.hasMatchingTag("Action", "StartWorkflow"),
  function(msg)
    local workflowId = msg.Id
    local steps = json.decode(msg.Data).steps
    
    Workflows[workflowId] = {
      steps = steps,
      currentStep = 1,
      status = "running",
      startTime = msg.Timestamp,
      results = {}
    }
    
    -- Start first step
    executeWorkflowStep(workflowId, 1, msg.From)
  end
)

function executeWorkflowStep(workflowId, stepIndex, originalCaller)
  local workflow = Workflows[workflowId]
  local step = workflow.steps[stepIndex]
  
  if not step then
    -- Workflow complete
    workflow.status = "completed"
    ao.send({
      Target = originalCaller,
      Action = "WorkflowComplete",
      WorkflowId = workflowId,
      Data = json.encode({
        results = workflow.results,
        completedAt = os.time()
      })
    })
    return
  end
  
  -- Execute step
  ao.send({
    Target = step.process,
    Action = step.action,
    WorkflowId = workflowId,
    StepIndex = stepIndex,
    Data = step.data or workflow.results[stepIndex - 1]
  })
end

-- Handle step completion
Handlers.add(
  "WorkflowStepComplete",
  Handlers.utils.hasMatchingTag("Action", "WorkflowStepComplete"),
  function(msg)
    local workflowId = msg.Tags.WorkflowId
    local stepIndex = tonumber(msg.Tags.StepIndex)
    
    local workflow = Workflows[workflowId]
    if not workflow then return end
    
    -- Store step result
    workflow.results[stepIndex] = msg.Data
    workflow.currentStep = stepIndex + 1
    
    -- Execute next step
    executeWorkflowStep(workflowId, stepIndex + 1, msg.From)
  end
)
```

## Advanced Communication Techniques

### Message Queuing

Implement reliable message delivery:

```lua
-- Message queue implementation
MessageQueue = MessageQueue or {}
FailedMessages = FailedMessages or {}
MaxRetries = 3

function queueMessage(target, action, data, priority)
  priority = priority or 1
  table.insert(MessageQueue, {
    id = generateId(),
    target = target,
    action = action,
    data = data,
    priority = priority,
    attempts = 0,
    queued = os.time()
  })
  
  -- Sort by priority
  table.sort(MessageQueue, function(a, b)
    return a.priority > b.priority
  end)
end

Handlers.add(
  "ProcessQueue",
  Handlers.utils.hasMatchingTag("Action", "ProcessQueue"),
  function(msg)
    if #MessageQueue == 0 then
      ao.send({
        Target = msg.From,
        Data = "Queue is empty"
      })
      return
    end
    
    local message = table.remove(MessageQueue, 1)
    message.attempts = message.attempts + 1
    
    -- Attempt to send message
    local success = pcall(function()
      ao.send({
        Target = message.target,
        Action = message.action,
        Data = message.data,
        QueueMessageId = message.id
      })
    end)
    
    if not success and message.attempts < MaxRetries then
      -- Requeue for retry
      table.insert(MessageQueue, message)
    elseif not success then
      -- Move to failed messages
      table.insert(FailedMessages, message)
    end
  end
)
```

### Circuit Breaker Pattern

Implement fault tolerance for external communication:

```lua
-- Circuit breaker for external services
CircuitBreakers = CircuitBreakers or {}

function getCircuitBreaker(serviceId)
  if not CircuitBreakers[serviceId] then
    CircuitBreakers[serviceId] = {
      state = "closed", -- closed, open, half-open
      failures = 0,
      lastFailure = 0,
      threshold = 5,
      timeout = 60 -- seconds
    }
  end
  return CircuitBreakers[serviceId]
end

function callExternalService(serviceId, processId, action, data)
  local breaker = getCircuitBreaker(serviceId)
  local currentTime = os.time()
  
  -- Check circuit breaker state
  if breaker.state == "open" then
    if currentTime - breaker.lastFailure > breaker.timeout then
      breaker.state = "half-open"
    else
      error("Circuit breaker is open for " .. serviceId)
    end
  end
  
  -- Attempt service call
  local success, result = pcall(function()
    ao.send({
      Target = processId,
      Action = action,
      Data = data,
      ServiceCall = serviceId
    })
    return true
  end)
  
  if success then
    -- Reset on success
    breaker.failures = 0
    if breaker.state == "half-open" then
      breaker.state = "closed"
    end
  else
    -- Handle failure
    breaker.failures = breaker.failures + 1
    breaker.lastFailure = currentTime
    
    if breaker.failures >= breaker.threshold then
      breaker.state = "open"
    end
    
    error("Service call failed: " .. serviceId)
  end
end
```

### Rate Limiting

Control message flow to prevent spam:

```lua
-- Rate limiting implementation
RateLimits = RateLimits or {}
RateWindows = RateWindows or {}

function isRateLimited(sender, action)
  local key = sender .. ":" .. action
  local currentTime = os.time()
  local windowSize = 60 -- 60 seconds
  local maxRequests = 10 -- 10 requests per minute
  
  if not RateWindows[key] then
    RateWindows[key] = {}
  end
  
  local window = RateWindows[key]
  
  -- Remove old entries
  local cutoff = currentTime - windowSize
  for i = #window, 1, -1 do
    if window[i] < cutoff then
      table.remove(window, i)
    end
  end
  
  -- Check if rate limited
  if #window >= maxRequests then
    return true
  end
  
  -- Add current request
  table.insert(window, currentTime)
  return false
end

-- Apply rate limiting to handlers
Handlers.add(
  "RateLimitedHandler",
  Handlers.utils.hasMatchingTag("Action", "RateLimitedAction"),
  function(msg)
    if isRateLimited(msg.From, "RateLimitedAction") then
      ao.send({
        Target = msg.From,
        Data = "Rate limit exceeded. Please try again later."
      })
      return
    end
    
    -- Process the request
    -- ... handler logic ...
  end
)
```

## Message Security

### Authentication

Verify message authenticity:

```lua
-- Message authentication
AuthorizedSenders = AuthorizedSenders or {}

function isAuthorized(sender, action)
  if not AuthorizedSenders[action] then
    return false
  end
  
  for _, authorized in ipairs(AuthorizedSenders[action]) do
    if authorized == sender then
      return true
    end
  end
  
  return false
end

Handlers.add(
  "AuthorizedOnly",
  Handlers.utils.hasMatchingTag("Action", "SensitiveAction"),
  function(msg)
    if not isAuthorized(msg.From, "SensitiveAction") then
      ao.send({
        Target = msg.From,
        Data = "Unauthorized: Access denied"
      })
      return
    end
    
    -- Process authorized request
    -- ... handler logic ...
  end
)
```

### Message Encryption

Encrypt sensitive data in messages:

```lua
-- Simple encryption example (use proper crypto libraries)
function encryptData(data, key)
  -- Implement proper encryption
  -- This is a placeholder for demonstration
  return "encrypted:" .. data
end

function decryptData(encryptedData, key)
  -- Implement proper decryption
  if encryptedData:sub(1, 10) == "encrypted:" then
    return encryptedData:sub(11)
  end
  return encryptedData
end

Handlers.add(
  "EncryptedMessage",
  Handlers.utils.hasMatchingTag("Encrypted", "true"),
  function(msg)
    local key = getEncryptionKey(msg.From)
    local decryptedData = decryptData(msg.Data, key)
    
    -- Process decrypted data
    processEncryptedMessage(decryptedData)
  end
)
```

## Debugging Communication

### Message Tracing

Track message flow through the system:

```lua
-- Message tracing
MessageTraces = MessageTraces or {}

function traceMessage(messageId, step, details)
  if not MessageTraces[messageId] then
    MessageTraces[messageId] = {}
  end
  
  table.insert(MessageTraces[messageId], {
    step = step,
    details = details,
    timestamp = os.time(),
    process = ao.id
  })
end

-- Add tracing to handlers
Handlers.add(
  "TracedHandler",
  Handlers.utils.hasMatchingTag("Action", "TracedAction"),
  function(msg)
    traceMessage(msg.Id, "received", {
      from = msg.From,
      action = msg.Tags.Action
    })
    
    -- Process message
    local result = processMessage(msg)
    
    traceMessage(msg.Id, "processed", {
      result = result,
      success = true
    })
    
    ao.send({
      Target = msg.From,
      Data = result
    })
    
    traceMessage(msg.Id, "responded", {
      target = msg.From
    })
  end
)

-- Get message trace
Handlers.add(
  "GetTrace",
  Handlers.utils.hasMatchingTag("Action", "GetTrace"),
  function(msg)
    local messageId = msg.Tags.MessageId
    local trace = MessageTraces[messageId]
    
    ao.send({
      Target = msg.From,
      Data = json.encode(trace or {})
    })
  end
)
```

### Communication Metrics

Monitor message flow and performance:

```lua
-- Communication metrics
Metrics = {
  messagesSent = 0,
  messagesReceived = 0,
  averageResponseTime = 0,
  errorRate = 0,
  lastReset = os.time()
}

function updateMetrics(type, responseTime, success)
  if type == "sent" then
    Metrics.messagesSent = Metrics.messagesSent + 1
  elseif type == "received" then
    Metrics.messagesReceived = Metrics.messagesReceived + 1
  end
  
  if responseTime then
    local total = Metrics.averageResponseTime * (Metrics.messagesReceived - 1)
    Metrics.averageResponseTime = (total + responseTime) / Metrics.messagesReceived
  end
  
  if success == false then
    Metrics.errorRate = Metrics.errorRate + 1
  end
end

Handlers.add(
  "GetMetrics",
  Handlers.utils.hasMatchingTag("Action", "GetMetrics"),
  function(msg)
    local uptime = os.time() - Metrics.lastReset
    local errorRate = Metrics.messagesReceived > 0 and 
      (Metrics.errorRate / Metrics.messagesReceived * 100) or 0
    
    ao.send({
      Target = msg.From,
      Data = json.encode({
        uptime = uptime,
        messagesSent = Metrics.messagesSent,
        messagesReceived = Metrics.messagesReceived,
        averageResponseTime = Metrics.averageResponseTime,
        errorRate = errorRate
      })
    })
  end
)
```

## Best Practices

### Message Design

Structure messages for clarity and efficiency:

```lua
-- Good message structure
local goodMessage = {
  Target = processId,
  Action = "Transfer", -- Clear action name
  -- Use consistent tag naming
  Tags = {
    { name = "Recipient", value = recipientAddress },
    { name = "Amount", value = tostring(amount) },
    { name = "Reference", value = referenceId }
  },
  Data = json.encode({
    metadata = {
      version = "1.0",
      timestamp = os.time()
    }
  })
}
```

### Error Handling

Implement comprehensive error handling:

```lua
-- Robust error handling
Handlers.add(
  "RobustHandler",
  Handlers.utils.hasMatchingTag("Action", "RobustAction"),
  function(msg)
    local success, result = pcall(function()
      -- Validate input
      if not msg.Tags.RequiredField then
        error("Missing required field: RequiredField")
      end
      
      -- Process message
      return processMessage(msg)
    end)
    
    if success then
      ao.send({
        Target = msg.From,
        Action = "Success",
        Data = json.encode({ result = result })
      })
    else
      ao.send({
        Target = msg.From,
        Action = "Error",
        Data = json.encode({
          error = result,
          messageId = msg.Id,
          timestamp = msg.Timestamp
        })
      })
    end
  end
)
```

### Performance Optimization

Optimize for high-throughput communication:

```lua
-- Batch processing for efficiency
MessageBatch = MessageBatch or {}
BatchSize = 10
LastBatchTime = LastBatchTime or 0

function addToBatch(message)
  table.insert(MessageBatch, message)
  
  -- Process batch if full or timeout reached
  local currentTime = os.time()
  if #MessageBatch >= BatchSize or 
     (currentTime - LastBatchTime > 5) then -- 5 second timeout
    processBatch()
  end
end

function processBatch()
  if #MessageBatch == 0 then return end
  
  local batch = MessageBatch
  MessageBatch = {}
  LastBatchTime = os.time()
  
  -- Process all messages in batch
  for _, message in ipairs(batch) do
    pcall(function()
      processMessage(message)
    end)
  end
  
  -- Send batch completion notification
  ao.send({
    Target = Owner,
    Action = "BatchProcessed",
    Data = "Processed " .. #batch .. " messages"
  })
end
```

## Next Steps

Master process communication by exploring:

1. **State Management** - [State Management Patterns](/concepts/decentralized-computing/ao-processes/state-management)
2. **HyperBEAM Querying** - [Querying AO State](/concepts/decentralized-computing/hyperbeam/querying-ao-state)
3. **Advanced Patterns** - [Builder's Journey](/guides/builder-journey/)
4. **Performance Optimization** - [Process Performance Guide](/guides/performance/)

## Resources

- **AO Message Specification**: [Message Format Docs](https://ao.arweave.dev/messages)
- **Communication Patterns**: [Pattern Examples](https://github.com/permaweb/ao-cookbook)
- **Testing Tools**: [AOS Development Environment](https://github.com/permaweb/aos)
- **Community Examples**: [AO Discord](https://discord.gg/arweave)