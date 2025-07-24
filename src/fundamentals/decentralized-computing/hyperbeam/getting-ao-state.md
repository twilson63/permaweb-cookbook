# Exposing Process State to HyperBEAM

HyperBEAM introduces a powerful feature for exposing parts of a process's state for immediate reading over HTTP. This improves performance for web frontends and data services by replacing the need for `dryrun` calls.

## The Patch Device

The `~patch@1.0` device is the mechanism that allows AO processes to make parts of their internal state readable via direct HTTP GET requests.

### How it Works

Exposing state is a four-step process:

1. **Process Logic:** Send an outbound message to the `~patch@1.0` device from your process.
2. **Patch Message Format:** The message must include `device` and `cache` tags.

```lua
Send({ Target = ao.id, device = 'patch@1.0', cache = { mydatakey = MyValue } })
```

3. **HyperBEAM Execution:** HyperBEAM's `dev_patch` module processes this message, mapping the key-value pairs from the `cache` table to a URL path.
4. **HTTP Access:** The exposed data is then immediately available via a standard HTTP GET request:

```
GET /<process-id>~process@1.0/now/cache/<mydatakey>
```

### Initial State Sync (Optional)

To make data available immediately on process creation:

```lua
-- Place this logic at the top level of your process script

Balances = { token1 = 100, token2 = 200 } -- A table of balances
TotalSupply = 1984 -- A single total supply value

-- 1. Initialize Flag:
InitialSync = InitialSync or 'INCOMPLETE'

-- 2. Check Flag:
if InitialSync == 'INCOMPLETE' then
  -- 3. Patch State:
  Send({ device = 'patch@1.0', cache = { balances = Balances, totalsupply = TotalSupply } })
  
  -- 4. Update Flag:
  InitialSync = 'COMPLETE'
end
```

## Practical Example

Here's a complete example of a token contract that exposes its balance state:

```lua
-- Token Process with State Exposure

Balances = Balances or { [ao.id] = 1000000 }
TotalSupply = TotalSupply or 1000000

-- Initial state sync
InitialSync = InitialSync or 'INCOMPLETE'
if InitialSync == 'INCOMPLETE' then
  Send({ device = 'patch@1.0', cache = { 
    balances = Balances, 
    totalsupply = TotalSupply 
  }})
  InitialSync = 'COMPLETE'
end

-- Transfer handler
Handlers.add("transfer", "Transfer", function(msg)
  local from = msg.From
  local to = msg.Tags.Recipient or msg.Recipient
  local amount = tonumber(msg.Tags.Quantity or msg.Quantity)
  
  if Balances[from] and Balances[from] >= amount then
    Balances[from] = Balances[from] - amount
    Balances[to] = (Balances[to] or 0) + amount
    
    -- Update exposed state after transfer
    Send({ device = 'patch@1.0', cache = { 
      balances = Balances 
    }})
    
    ao.send({ Target = from, Data = "Transfer successful" })
  else
    ao.send({ Target = from, Data = "Insufficient balance" })
  end
end)
```

## Accessing Exposed Data

Once state is exposed via the patch device, you can query it directly over HTTP:

```bash
# Get all balances
curl https://hyperbeam-node.arweave.net/<process-id>~process@1.0/compute/cache/balances

# Get total supply
curl https://hyperbeam-node.arweave.net/<process-id>~process@1.0/compute/cache/totalsupply
```

## Benefits

**Performance:** Direct HTTP access is significantly faster than traditional `dryrun` calls.

**Simplicity:** Standard REST-like patterns instead of complex message handling.

**Real-time Updates:** State changes are immediately reflected in HTTP responses.

**Caching:** HyperBEAM can cache frequently accessed data for even better performance.