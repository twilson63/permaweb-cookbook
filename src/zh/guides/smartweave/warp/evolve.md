---
locale: zh
---
# Warp (SmartWeave) SDK - Evolve

**演进**（Evolve）是一种功能，允许开发人员更新智能合约的源代码，而无需部署新合约。要使用此功能，您必须首先使用保存函数提交新的源代码。一旦更新的代码在永久网络上得到确认，您可以使用演进函数将合约指向新的源代码标识符。这样就可以更新合约的行为，而无需创建新的合约实例。

## 为什么要使用演进功能？

编写SmartWeave合约可能很困难，并且有时需要随着时间的推移添加更新或新功能。演进功能允许您对合约进行更改，而无需从头开始创建新的合约实例。要使用此功能，您的合约状态对象必须包含一个evolve属性，该属性设置为新合约源交易标识符。这使您可以修改和改进现有合约，而无需从头开始。

```json
{
  ...
  "evolve": "YOUR SOURCE CODE TX_ID"
}
```

## 将您的新源代码发布到永久网络（Permaweb）

在对现有合约进行演进之前，您需要将新的源代码发布到永久网络（Permaweb），您可以使用“save”功能来完成此操作。

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

## 对合约进行演进

::: warning
**验证**您的新源TX_ID是否已确认，请访问[Sonar](https://sonar.warp.cc)以确保TX_ID已确认。
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
值得注意的是，演进功能只适用于未来的操作，这意味着您不能将新源代码应用于合约演进之前发生的操作。
:::

## 总结

演进是一种强大的功能，可以为您的合约提供可扩展性，但也可以成为一种**攻击**向量，因此在使用时确保您充分了解自己在做什么。以下是一个在您的合约中可能会用到的演进函数的常见代码片段。

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