# Lua Serverless Functions

HyperBEAM's `~lua@5.3a` device enables you to run serverless Lua functions with permanent availability, instant execution, and cryptographic verification. Unlike traditional serverless platforms, your functions are deployed permanently to Arweave and executed on the decentralized HyperBEAM network.

## How HyperBEAM Lua Works

HyperBEAM executes Lua functions through HTTP requests using a specific URL structure:

```
https://forward.computer/~lua@5.3a/{function_name}/~json@1.0/serialize?param1=value1&module={ARWEAVE_TX_ID}
```

**URL Components:**
- `~lua@5.3a` - The Lua execution device
- `{function_name}` - The function to call from your deployed module
- `~json@1.0/serialize` - Output formatting set to JSON
- Query parameters - Function arguments with optional type casting
- `module` - Arweave transaction ID of your deployed Lua code

## Function Parameters

HyperBEAM calls your Lua functions with three parameters:

```lua
function your_function(base, req, opts)
    -- base: Base object to extend (usually empty table {})
    -- req: Request parameters including query params and HTTP headers
    -- opts: Options and configuration (advanced usage)
    
    return base  -- Must return a table
end
```

## Example Functions

### 1. Simple Calculator

```lua
-- calculator.lua
function add(base, req, opts)
    base = base or {}
    
    local a = tonumber(req.a) or 0
    local b = tonumber(req.b) or 0
    
    base.a = a
    base.b = b
    base.result = a + b
    base.operation = "addition"
    
    return base
end
```

### 2. Text Analysis

```lua
function analyze_text(base, req, opts)
    base = base or {}
    
    local text = req.text or ""
    if text == "" then
        base.error = "Text parameter required"
        return base
    end
    
    -- Word count
    local word_count = 0
    for word in string.gmatch(text, "%S+") do
        word_count = word_count + 1
    end
    
    -- Character counts
    local char_count = string.len(text)
    local char_count_no_spaces = string.len(string.gsub(text, "%s", ""))
    
    base.text_length = char_count
    base.text_length_no_spaces = char_count_no_spaces
    base.word_count = word_count
    
    return base
end
```

### 3. Data Processing

```lua
function process_numbers(base, req, opts)
    base = base or {}
    
    local numbers_str = req.numbers or ""
    local numbers = {}
    
    -- Parse comma-separated numbers
    for num_str in string.gmatch(numbers_str, "[^,]+") do
        local num = tonumber(num_str:gsub("^%s*(.-)%s*$", "%1"))
        if num then
            table.insert(numbers, num)
        end
    end
    
    if #numbers == 0 then
        base.error = "No valid numbers found"
        return base
    end
    
    -- Calculate basic statistics
    local sum = 0
    local min_val = numbers[1]
    local max_val = numbers[1]
    
    for i, num in ipairs(numbers) do
        sum = sum + num
        if num < min_val then min_val = num end
        if num > max_val then max_val = num end
    end
    
    base.count = #numbers
    base.sum = sum
    base.average = sum / #numbers
    base.min = min_val
    base.max = max_val
    base.numbers = numbers
    
    return base
end
```

## Deployment

### 1. Deploy to Arweave

```bash
# Using permaweb-deploy (recommended)
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-lua-functions --deploy-file calculator.lua
```

:::warning Propagation Delay
After deployment, it can take up to 20 minutes for your Lua module to fully propagate across the Arweave network. You may not be able to access it via HyperBEAM until propagation is complete.
:::

### 2. Execute Your Function

```bash
# Simple addition
curl 'https://forward.computer/~lua@5.3a/add/~json@1.0/serialize?a+integer=10&b+integer=20&module=YOUR_MODULE_ID'

# Text analysis
curl 'https://forward.computer/~lua@5.3a/analyze_text/~json@1.0/serialize?text=Hello%20world%20example&module=YOUR_MODULE_ID'

# Number processing
curl 'https://forward.computer/~lua@5.3a/process_numbers/~json@1.0/serialize?numbers=1,2,3,4,5&module=YOUR_MODULE_ID'
```

## Type Casting Parameters

Use type casting to convert parameters from strings:

**Available Type Casts:**
- `+integer` - Convert to integer
- `+float` - Convert to floating point number
- `+boolean` - Convert to boolean
- `+list` - Convert comma-separated values to array

Example:
```bash
curl 'https://forward.computer/~lua@5.3a/add/~json@1.0/serialize?a+integer=10&b+integer=20&module=YOUR_MODULE_ID'
```

## JavaScript Integration

```javascript
async function callLuaFunction(moduleId, functionName, params = {}) {
    const queryParams = new URLSearchParams();
    queryParams.append('module', moduleId);
    
    for (const [key, value] of Object.entries(params)) {
        if (typeof value === 'number') {
            queryParams.append(`${key}+${Number.isInteger(value) ? 'integer' : 'float'}`, value.toString());
        } else {
            queryParams.append(key, value.toString());
        }
    }
    
    const url = `https://forward.computer/~lua@5.3a/${functionName}/~json@1.0/serialize?${queryParams}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
}

// Usage
const result = await callLuaFunction('YOUR_MODULE_ID', 'add', { a: 10, b: 20 });
console.log(result); // { a: 10, b: 20, result: 30, operation: "addition" }
```