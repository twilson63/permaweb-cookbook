# Warp (SmartWeave) SDK - ReadState  

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

SmartWeave Contract state is calculated via lazy evaluation, which means, the state evaluation occurs on reads not writes. When reading contracts, the SDK gathers all state interactions, sorts them, and executes them against the source contract using a reduce or fold pattern.

## Basic Readstate

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// log current state
console.log(result.cachedValue.state)
```

## Advanced Readstate

Some contracts either read the state of other contracts, or invoke or write to other contracts, when requesting the state of these contracts it is necessary to set evaluation options.

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// log current state
console.log(result.cachedValue.state)
```

### Common Evaluation Options

| Name | Description |
| ---- | ----------- |
| internalWrites | Evaluates contracts that contain internal writes to other contracts |
| allowBigInt | Evaluates contracts that use the BigInt primitive you can find out more about bigInt [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
| unsafeClient | This value could be `allow` or `skip` or `throw`. You should avoid using unsafeClient in your contracts it can lead to underministic results.  |

## Readstate from specific BlockHeight or Sortkey

You may want to look at a previous state, not the current state, by supplying a blockHeight you can read the state of a contract at a specific block height

```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## Summary

Reading the current state of SmartWeave Contracts performs state evaluation by pulling all interactions and processing each interaction via a fold method. This approach is unique to the permaweb and requires a unique understanding of how your SmartWeave Contract code is executed.