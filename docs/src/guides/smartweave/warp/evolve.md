# Warp (SmartWeave) SDK - Evolve

Evolve is a feature that allows developers to update the source code of a smart contract without having to deploy a new contract. To evolve a contract you must first pose the source code which can be done using the `save` function. Once you have a new source code for the contract confirmed on the Permaweb, then you can call `evolve` to point the contract to the new contract source code id.

## Why?

Writing SmartWeave Contracts is hard to get right the first go, or you may need to add a new feature or function to your contract over time. Evolve allows you to correct/improve your contract without having to create a new contract from scratch. In order to use evolve your contract state object must have a property `evolve` on it and set to the new contract source transaction identifier.

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
It is also important to note, evolve source is future forward only, which means that you can not apply new source code to actions that occured before the contract was evolved.
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

