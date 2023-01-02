# Warp WriteInteractions

SmartWeave contracts contain a current state and the ability to modify that state via function calls, the way you call a function on a SmartWeave Contract is by creating a transaction known as a SmartWeave Action. This action contains the function name you would like to call and the input parameters required by the SmartWeave Contract function. `contract.writeInteraction` is a function that creates a SmartWeave Action.

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

Dry write is the feature you can use to apply your interaction to the current state in a simulated interaction, the interaction does not run on the permaweb, it runs locally. This is an opportunity to verify your interaction will be successful before you apply your interaction. 

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

The SmartWeave Protocol is designed to enable dynamic data changes on an immutable append-only storage system. Using writeInteractions you can interact with these contracts in a trustless and permissionless way. The writeInteractions functionality is a key feature to the SmartWeave Protocol and the Warp SDK gives developers an easy to use API to interact with the SmartWeave Protocol.
