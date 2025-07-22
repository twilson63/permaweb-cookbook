---
title: "Lua Serverless Functions"
description: "Deploy and execute serverless Lua functions on HyperBEAM with permanent availability and cryptographic verification"
difficulty: "Advanced"
stability: "Cutting-edge"  
timeEstimate: "45 minutes"
---

# Lua Serverless Functions

HyperBEAM's `~lua@5.3a` device enables you to run serverless Lua functions with permanent availability, instant execution, and cryptographic verification. Unlike traditional serverless platforms, your functions are deployed permanently to Arweave and executed on the decentralized HyperBEAM network.

The device uses [Luerl](https://luerl.org/), an implementation of Lua 5.3 in Erlang, which provides excellent sandboxing but has some differences from standard Lua implementations. Most standard Lua functions work as expected, but some features may behave differently.

## How HyperBEAM Lua Works

HyperBEAM executes Lua functions through HTTP requests using a specific URL structure:

```
https://forward.computer/~lua@5.3a/{function_name}/~json@1.0/serialize?param1=value1&param2=value2&module={ARWEAVE_TX_ID}
```

**URL Components:**
- `~lua@5.3a` - The Lua execution device
- `{function_name}` - The function to call from your deployed module
- `~json@1.0/serialize` - Output formatting (converts Lua tables to JSON)
- Query parameters - Function arguments with optional type casting
- `module` - Arweave transaction ID of your deployed Lua code

## Deploying Lua Modules

### 1. Write Your Lua Module

Create a Lua file with functions that return a table:

```lua
-- statistics.lua
function statistics(base, req, opts)
    base = base or {}
    local nums = {}

    -- Parse number list from request parameters
    local function parse_number_list(input_str)
        local result = {}
        if not input_str or input_str == '' then
            return result
        end

        -- Split by commas and convert to numbers
        for num_str in string.gmatch(tostring(input_str), "[^,]+") do
            local cleaned = num_str:gsub("^%s*(.-)%s*$", "%1") -- trim whitespace
            local num = tonumber(cleaned)
            if num then
                table.insert(result, num)
            end
        end

        return result
    end

    -- Get numbers from request parameters
    if req.number_list then
        nums = parse_number_list(req.number_list)
    elseif req.numbers then
        nums = parse_number_list(req.numbers)
    end

    if #nums == 0 then
        base.error = 'No valid numbers found'
        return base
    end

    -- Calculate statistics
    local sum = 0
    local min_val = nums[1]
    local max_val = nums[1]

    for i, num in ipairs(nums) do
        sum = sum + num
        if num < min_val then min_val = num end
        if num > max_val then max_val = num end
    end

    local mean = sum / #nums

    -- Calculate median
    local sorted_nums = {}
    for i, v in ipairs(nums) do
        sorted_nums[i] = v
    end

    -- Simple bubble sort
    for i = 1, #sorted_nums do
        for j = 1, #sorted_nums - i do
            if sorted_nums[j] > sorted_nums[j + 1] then
                sorted_nums[j], sorted_nums[j + 1] = sorted_nums[j + 1], sorted_nums[j]
            end
        end
    end

    local median
    local mid = #sorted_nums / 2
    if #sorted_nums % 2 == 0 then
        local mid_floor = math.floor(mid)
        median = (sorted_nums[mid_floor] + sorted_nums[mid_floor + 1]) / 2
    else
        median = sorted_nums[math.floor(mid) + 1]
    end

    -- Calculate standard deviation
    local variance_sum = 0
    for i, num in ipairs(nums) do
        local diff = num - mean
        variance_sum = variance_sum + (diff * diff)
    end
    local variance = variance_sum / #nums
    local std_dev = math.sqrt(variance)

    -- Return results
    base.count = #nums
    base.sum = sum
    base.mean = math.floor(mean * 1000) / 1000
    base.median = median
    base.min = min_val
    base.max = max_val
    base.range = max_val - min_val
    base.std_dev = math.floor(std_dev * 1000) / 1000
    base.variance = math.floor(variance * 1000) / 1000
    base.numbers = nums

    return base
end
```

### 2. Deploy to Arweave

Use permaweb-deploy to upload your Lua file:

```bash
# Using permaweb-deploy (recommended)
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-lua-modules --deploy-file statistics.lua

# Returns transaction ID: 58jTWUOJRGjYFA8xIF4PEjLKDKWT_gupBkcQ0vAaDSw
```

:::tip Alternative Deployment
You can also use the Arweave CLI for direct deployment:
```bash
arweave deploy statistics.lua --key-file wallet.json
```
:::

### 3. Execute Your Function

```bash
curl --request GET \
  --url 'https://forward.computer/~lua@5.3a/statistics/~json@1.0/serialize?number_list=1984,2025,2089&module=58jTWUOJRGjYFA8xIF4PEjLKDKWT_gupBkcQ0vAaDSw'
```

**Response:**
```json
{
  "count": 3,
  "max": 2089.0,
  "mean": 2032.666,
  "median": 2025.0,
  "min": 1984.0,
  "numbers": [1984.0, 2025.0, 2089.0],
  "range": 105.0,
  "std_dev": 43.207,
  "sum": 6098.0,
  "variance": 1866.888
}
```

## Function Parameters

### Understanding the Function Signature

HyperBEAM calls your Lua functions with three parameters:

```lua
function your_function(base, req, opts)
    -- base: Base object to extend (usually empty table {})
    -- req: Request parameters including query params and HTTP headers
    -- opts: Options and configuration (advanced usage)
    
    return base  -- Must return a table
end
```

### Query Parameter Access

Access query parameters through the `req` table:

```lua
function greet(base, req, opts)
    base = base or {}
    
    local name = req.name or "World"
    local age = req.age or "unknown"
    
    base.message = "Hello " .. name .. ", you are " .. age .. " years old"
    base.timestamp = os.time()
    
    return base
end
```

```bash
curl 'https://forward.computer/~lua@5.3a/greet/~json@1.0/serialize?name=Alice&age=25&module=YOUR_MODULE_ID'
```

### Type Casting Parameters

Use type casting to convert parameters from strings:

```lua
function calculate(base, req, opts)
    base = base or {}
    
    -- Parameters are automatically converted based on URL type casting
    local a = req.a or 0        -- +integer in URL
    local b = req.b or 0        -- +integer in URL  
    local rate = req.rate or 0  -- +float in URL
    
    base.sum = a + b
    base.product = a * b
    base.with_rate = (a + b) * rate
    
    return base
end
```

```bash
curl 'https://forward.computer/~lua@5.3a/calculate/~json@1.0/serialize?a+integer=10&b+integer=20&rate+float=1.5&module=YOUR_MODULE_ID'
```

**Available Type Casts:**
- `+integer` - Convert to integer
- `+float` - Convert to floating point number
- `+boolean` - Convert to boolean
- `+list` - Convert comma-separated values to array
- `+map` - Convert key:value pairs to table

## HTTP Request Information

Access HTTP request details through the `req` table:

```lua
function request_info(base, req, opts)
    base = base or {}
    
    -- HTTP request information
    base.method = req.method
    base.host = req.host
    base.user_agent = req['user-agent']
    base.content_type = req['content-type']
    base.connection = req.connection
    
    -- Custom headers and forwarding info
    base.real_ip = req['x-real-ip']
    base.forwarded_proto = req['x-forwarded-proto']
    
    return base
end
```

## Advanced Examples

### Text Processing Module

```lua
-- text_utils.lua
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
    
    -- Sentence count (simple approximation)
    local sentence_count = 0
    for sentence in string.gmatch(text, "[.!?]+") do
        sentence_count = sentence_count + 1
    end
    
    -- Most common words (simple implementation)
    local words = {}
    for word in string.gmatch(string.lower(text), "%w+") do
        words[word] = (words[word] or 0) + 1
    end
    
    base.text_length = char_count
    base.text_length_no_spaces = char_count_no_spaces
    base.word_count = word_count
    base.sentence_count = math.max(sentence_count, 1)
    base.avg_words_per_sentence = math.floor(word_count / math.max(sentence_count, 1) * 100) / 100
    base.word_frequency = words
    
    return base
end

function clean_text(base, req, opts)
    base = base or {}
    
    local text = req.text or ""
    
    -- Remove extra whitespace
    local cleaned = string.gsub(text, "%s+", " ")
    -- Trim leading/trailing whitespace
    cleaned = string.gsub(cleaned, "^%s*(.-)%s*$", "%1")
    -- Remove special characters (keep letters, numbers, basic punctuation)
    local alphanumeric = string.gsub(cleaned, "[^%w%s%.,%!%?%-]", "")
    
    base.original = text
    base.cleaned = cleaned
    base.alphanumeric_only = alphanumeric
    base.original_length = string.len(text)
    base.cleaned_length = string.len(cleaned)
    
    return base
end
```

Usage:
```bash
# Analyze text
curl 'https://forward.computer/~lua@5.3a/analyze_text/~json@1.0/serialize?text=Hello world! This is a test. How are you?&module=TEXT_MODULE_ID'

# Clean text
curl 'https://forward.computer/~lua@5.3a/clean_text/~json@1.0/serialize?text=Hello@#$%20world!!!%20%20%20Extra%20spaces.&module=TEXT_MODULE_ID'
```

### Financial Calculations

```lua
-- finance.lua
function compound_interest(base, req, opts)
    base = base or {}
    
    local principal = req.principal or 0
    local rate = req.annual_rate or 0
    local years = req.years or 0
    local compounds_per_year = req.compounds_per_year or 1
    
    if principal <= 0 or rate < 0 or years < 0 then
        base.error = "Invalid parameters"
        return base
    end
    
    local amount = principal * math.pow(1 + rate / compounds_per_year, compounds_per_year * years)
    local interest = amount - principal
    
    base.principal = principal
    base.annual_rate = rate
    base.years = years
    base.compounds_per_year = compounds_per_year
    base.final_amount = math.floor(amount * 100) / 100
    base.total_interest = math.floor(interest * 100) / 100
    
    return base
end

function loan_payment(base, req, opts)
    base = base or {}
    
    local principal = req.principal or 0
    local annual_rate = req.annual_rate or 0
    local years = req.years or 0
    
    if principal <= 0 or annual_rate < 0 or years <= 0 then
        base.error = "Invalid parameters"
        return base
    end
    
    local monthly_rate = annual_rate / 12
    local num_payments = years * 12
    
    local monthly_payment = 0
    if monthly_rate > 0 then
        monthly_payment = principal * (monthly_rate * math.pow(1 + monthly_rate, num_payments)) / 
                         (math.pow(1 + monthly_rate, num_payments) - 1)
    else
        monthly_payment = principal / num_payments
    end
    
    local total_payment = monthly_payment * num_payments
    local total_interest = total_payment - principal
    
    base.principal = principal
    base.annual_rate = annual_rate
    base.loan_term_years = years
    base.monthly_payment = math.floor(monthly_payment * 100) / 100
    base.total_payment = math.floor(total_payment * 100) / 100
    base.total_interest = math.floor(total_interest * 100) / 100
    
    return base
end
```

Usage:
```bash
# Calculate compound interest
curl 'https://forward.computer/~lua@5.3a/compound_interest/~json@1.0/serialize?principal+float=1000&annual_rate+float=0.05&years+integer=5&compounds_per_year+integer=12&module=FINANCE_MODULE_ID'

# Calculate loan payment
curl 'https://forward.computer/~lua@5.3a/loan_payment/~json@1.0/serialize?principal+float=200000&annual_rate+float=0.04&years+integer=30&module=FINANCE_MODULE_ID'
```

## Error Handling

Implement robust error handling in your functions:

```lua
function safe_divide(base, req, opts)
    base = base or {}
    
    local a = req.a
    local b = req.b
    
    -- Input validation
    if not a or not b then
        base.error = "Both 'a' and 'b' parameters are required"
        base.received_params = {}
        for key, value in pairs(req) do
            if key ~= 'module' then  -- Don't expose module ID
                base.received_params[key] = value
            end
        end
        return base
    end
    
    -- Type validation (if not using type casting in URL)
    a = tonumber(a)
    b = tonumber(b)
    
    if not a or not b then
        base.error = "Parameters must be valid numbers"
        return base
    end
    
    -- Division by zero check
    if b == 0 then
        base.error = "Division by zero is not allowed"
        base.attempted_division = {dividend = a, divisor = b}
        return base
    end
    
    -- Successful calculation
    base.dividend = a
    base.divisor = b
    base.result = a / b
    base.success = true
    
    return base
end
```

## Performance Best Practices

### 1. Efficient Data Structures

Use appropriate data structures for your use case:

```lua
-- For lookups, use tables (hash maps)
local user_roles = {
    alice = "admin",
    bob = "user", 
    charlie = "moderator"
}

-- For sequences, use arrays
local numbers = {1, 2, 3, 4, 5}

-- For large datasets, process in chunks
function process_large_dataset(base, req, opts)
    base = base or {}
    
    local data = req.data_list or {}
    local chunk_size = req.chunk_size or 100
    local results = {}
    
    -- Process in chunks to manage memory
    for i = 1, #data, chunk_size do
        local chunk = {}
        for j = i, math.min(i + chunk_size - 1, #data) do
            table.insert(chunk, data[j])
        end
        
        -- Process chunk
        local chunk_sum = 0
        for k, value in ipairs(chunk) do
            chunk_sum = chunk_sum + (tonumber(value) or 0)
        end
        
        table.insert(results, {
            chunk_start = i,
            chunk_end = math.min(i + chunk_size - 1, #data),
            chunk_sum = chunk_sum
        })
    end
    
    base.total_items = #data
    base.chunk_size = chunk_size
    base.chunks_processed = #results
    base.chunk_results = results
    
    return base
end
```

### 2. String Operations

Be careful with string concatenation in loops:

```lua
-- Inefficient: creates many temporary strings
function bad_concat(base, req, opts)
    local result = ""
    local items = req.items or {}
    
    for i, item in ipairs(items) do
        result = result .. item .. ", "  -- Creates new string each iteration
    end
    
    return {result = result}
end

-- Efficient: use table.concat
function good_concat(base, req, opts)
    local items = req.items or {}
    local result = table.concat(items, ", ")
    
    return {result = result}
end
```

### 3. Avoid Global Variables

Use local variables for better performance:

```lua
function efficient_function(base, req, opts)
    base = base or {}
    
    -- Use local variables
    local math_sin = math.sin  -- Cache frequently used functions
    local results = {}
    local data = req.data or {}
    
    for i, value in ipairs(data) do
        results[i] = math_sin(value)
    end
    
    base.results = results
    return base
end
```

## Module Organization

### Single File Modules

For simple functions, organize multiple related functions in one file:

```lua
-- utils.lua

function string_utils(base, req, opts)
    base = base or {}
    local text = req.text or ""
    
    base.uppercase = string.upper(text)
    base.lowercase = string.lower(text)
    base.length = string.len(text)
    base.reversed = string.reverse(text)
    
    return base
end

function math_utils(base, req, opts)
    base = base or {}
    local nums = req.numbers or {}
    
    local sum = 0
    local product = 1
    
    for i, num in ipairs(nums) do
        local n = tonumber(num) or 0
        sum = sum + n
        product = product * n
    end
    
    base.sum = sum
    base.product = product
    base.average = #nums > 0 and sum / #nums or 0
    
    return base
end

function date_utils(base, req, opts)
    base = base or {}
    
    base.timestamp = os.time()
    base.formatted_date = os.date("%Y-%m-%d")
    base.formatted_datetime = os.date("%Y-%m-%d %H:%M:%S")
    base.day_of_week = os.date("%A")
    base.month_name = os.date("%B")
    
    if req.custom_timestamp then
        local custom_time = tonumber(req.custom_timestamp)
        if custom_time then
            base.custom_formatted = os.date("%Y-%m-%d %H:%M:%S", custom_time)
        end
    end
    
    return base
end
```

Usage:
```bash
# String utilities
curl 'https://forward.computer/~lua@5.3a/string_utils/~json@1.0/serialize?text=Hello%20World&module=UTILS_MODULE_ID'

# Math utilities  
curl 'https://forward.computer/~lua@5.3a/math_utils/~json@1.0/serialize?numbers+list=1,2,3,4,5&module=UTILS_MODULE_ID'

# Date utilities
curl 'https://forward.computer/~lua@5.3a/date_utils/~json@1.0/serialize?custom_timestamp+integer=1640995200&module=UTILS_MODULE_ID'
```

## JavaScript Integration

Use HyperBEAM functions in your web applications:

```javascript
class HyperBEAMLua {
    constructor(baseUrl = 'https://forward.computer') {
        this.baseUrl = baseUrl;
    }
    
    async callFunction(moduleId, functionName, params = {}) {
        // Build query string with type casting
        const queryParams = new URLSearchParams();
        queryParams.append('module', moduleId);
        
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === 'number') {
                if (Number.isInteger(value)) {
                    queryParams.append(`${key}+integer`, value.toString());
                } else {
                    queryParams.append(`${key}+float`, value.toString());
                }
            } else if (typeof value === 'boolean') {
                queryParams.append(`${key}+boolean`, value.toString());
            } else if (Array.isArray(value)) {
                queryParams.append(`${key}+list`, value.join(','));
            } else {
                queryParams.append(key, value.toString());
            }
        }
        
        const url = `${this.baseUrl}/~lua@5.3a/${functionName}/~json@1.0/serialize?${queryParams}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('HyperBEAM Lua call failed:', error);
            throw error;
        }
    }
}

// Usage
const lua = new HyperBEAMLua();

// Call statistics function
lua.callFunction('58jTWUOJRGjYFA8xIF4PEjLKDKWT_gupBkcQ0vAaDSw', 'statistics', {
    number_list: '1984,2025,2089'
}).then(result => {
    console.log('Statistics:', result);
    // Display results in your UI
}).catch(error => {
    console.error('Error:', error);
});

// Call compound interest calculation
lua.callFunction('FINANCE_MODULE_ID', 'compound_interest', {
    principal: 1000,
    annual_rate: 0.05,
    years: 5,
    compounds_per_year: 12
}).then(result => {
    console.log('Investment projection:', result);
});
```

## Deployment Workflow

### 1. Development and Testing

Test your functions locally before deployment:

```lua
-- test_locally.lua
function test_statistics()
    -- Simulate request object
    local req = {
        number_list = "1,2,3,4,5",
        method = "GET"
    }
    
    local result = statistics({}, req, {})
    
    print("Test results:")
    for key, value in pairs(result) do
        print(key .. ": " .. tostring(value))
    end
end

-- Run test
test_statistics()
```

### 2. Deploy to Arweave

```bash
# Using permaweb-deploy (recommended)
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-lua-modules --deploy-file my_module.lua

# Alternative: Using Arweave CLI
arweave deploy my_module.lua \
    --key-file wallet.json \
    --tag "Content-Type" "text/plain" \
    --tag "App-Name" "HyperBEAM-Lua" \
    --tag "Function-Names" "statistics,analyze_text,compound_interest"
```

### 3. Test Deployed Function

```bash
# Test immediately after deployment
curl 'https://forward.computer/~lua@5.3a/statistics/~json@1.0/serialize?number_list=1,2,3,4,5&module=NEW_MODULE_TX_ID'
```

### 4. Update Documentation

Keep track of your deployed functions:

```markdown
# My HyperBEAM Functions

## Statistics Module
- **Module ID**: 58jTWUOJRGjYFA8xIF4PEjLKDKWT_gupBkcQ0vAaDSw
- **Functions**: statistics
- **Purpose**: Calculate statistical measures from number lists
- **Example**: `?number_list=1,2,3&module=58jTWUOJRGjYFA8xIF4PEjLKDKWT_gupBkcQ0vAaDSw`

## Finance Module  
- **Module ID**: FINANCE_MODULE_TX_ID
- **Functions**: compound_interest, loan_payment
- **Purpose**: Financial calculations
- **Example**: `?principal+float=1000&annual_rate+float=0.05&module=FINANCE_MODULE_TX_ID`
```

## Next Steps

1. **Explore Advanced Devices**: [HyperBEAM Devices](/concepts/decentralized-computing/hyperbeam/hyperbeam-devices)
2. **Process Integration**: [AO Process Communication](/concepts/decentralized-computing/ao-processes/process-communication)
3. **Build Applications**: [Zero to Deployed App](/getting-started/zero-to-deploy)

## Resources

- **HyperBEAM Documentation**: [forward.computer](https://forward.computer)
- **Luerl Documentation**: [luerl.org](https://luerl.org/)
- **Lua 5.3 Reference**: [lua.org/manual/5.3](https://www.lua.org/manual/5.3/)
- **Permaweb Deployment**: [Permaweb Deploy](/tooling/deployment/permaweb-deploy)
- **Arweave Deployment**: [Arweave CLI](https://github.com/ArweaveTeam/arweave-deploy)
- **Community Examples**: [AO Discord](https://discord.gg/arweave)