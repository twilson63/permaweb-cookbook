# Warp (SmartWeave) SDK - Evolve

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

Evolve is a feature that allows developers to update the source code of a smart contract without deploying a new contract. To use this feature, you must first submit the new source code using the save function. Once the updated code has been confirmed on the Permaweb, you can use the evolve function to point the contract to the new source code ID. This allows you to update the contract's behavior without creating a new contract instance.

## Why?

Writing SmartWeave contracts can be difficult and sometimes requires updates or new features to be added over time. Evolve allows you to make changes to your contract without having to create a new contract instance from scratch. To use this feature, your contract state object must include an evolve property that is set to the new contract source transaction identifier. This enables you to modify and improve your existing contract without starting from scratch.

```json
{
  ...
  "evolve": "YOUR SOURCE CODE TX_ID"
}
```

## Post your new source to the permaweb

Before you can evolve your existing contract, you need to post the new source code to the permaweb, you can do this with the `save` function.

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const TX_ID = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function main() {
  const newSrcTxId = await warp.contract(TX_ID).connect(jwk).save({src })
  console.log('NEW SRC ID', newSrcTxId)
}

main()
```

## Evolve your contract

::: warning
**Verify** your new Source TX_ID is confirmed, go to [Sonar](https://sonar.warp.cc) to make sure the TX_ID is confirmed.
:::

```ts
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const src = fs.readFileSync('./dist/contract.js', 'utf-8')
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const TX_ID = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
const warp = WarpFactory.forMainnet()

async function main() {
  const newSrcTxId = await warp.contract(TX_ID).connect(jwk).evolve('SRC TX ID')
  console.log(result)
}

main()

```

::: tip
It's worth noting that the evolve feature is only applicable to future actions, meaning you cannot use it to apply new source code to actions that occurred before the contract was evolved.
:::


## Summary

Evolve is a powerful feature and can provide extensibility for your contracts, it can also be an **attack** vector, so make sure you fully understand what you are doing when using it. Below is a common snippet of what an evolve function may look like in your contract.

```js

export async function handle(state, action) {
  ...
  if (action.input.function === 'evolve') {
    if (action.caller === state.creator) {
      state.evolve = action.input.value 
    }
    return { state }
  }
  ...
}
```

