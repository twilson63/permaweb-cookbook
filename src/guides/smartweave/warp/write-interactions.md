# Warp WriteInteractions

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

To call a function on a SmartWeave contract, you can create a transaction known as a SmartWeave action. This action includes the function name and the necessary input parameters for the function on the SmartWeave contract. You can create a SmartWeave action using the contract.writeInteraction function.

## Code

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .writeInteraction({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

When calling writeInteraction, you need to pass your input parameters, these are the parameters the contract is expecting to receive.

::: warning
Since SmartWeave contracts are evaluated in a lazy flow, you do not know if your interaction ran successfully until you evaluate the contract to the current state. Use [Warp readState](./readstate.md) to access the contract and determine if the interaction was applied successfully.
:::

## Dry Write

`DryWrite` allows you to test and verify an interaction on the current state without actually executing it on the permaweb. This feature allows you to simulate the interaction locally and ensure that it will be successful before applying it.

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .dryWrite({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

::: warning
One thing to note when using dry writes, is that the entire state needs to be evaluated locally for contacts that use readState or internalWrites. This can result in a slow performing process.
:::

## Optimized for speed

By default, writeInteractions are submitted to the Warp Sequencer and bundled and posted to Arweave. You can post directly to Arweave by disabling bundling.

```ts
const result = await contract.writeInteraction({
  function: 'NAME_OF_YOUR_FUNCTION',
  ...
}, { disableBundling: true })
```

## Summary

The SmartWeave Protocol allows for the modification of dynamic data on an immutable, append-only storage system using writeInteractions. These interactions enable trustless and permissionless communication with SmartWeave contracts. The Warp SDK provides developers with a user-friendly API for interacting with the SmartWeave Protocol and its writeInteractions feature.

For additional resources:

* Warp SDK [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Warp Docs [https://warp.cc](https://warp.cc)
