---
locale: jp
---
# Warp（SmartWeave）SDK - 進化

進化は、新しい契約をデプロイせずにスマートコントラクトのソースコードを更新することができる機能です。この機能を使用するには、まず save 関数を使用して新しいソースコードを提出する必要があります。更新されたコードが Permaweb 上で確認された後、evolve 関数を使用して契約を新しいソースコードのIDに向けることができます。これにより、新しい契約インスタンスを作成せずに契約の動作を更新することができます。

## なぜ進化が必要なのか？

SmartWeaveの契約を記述することは困難であり、時には時間の経過とともに更新や新機能の追加が必要になる場合があります。進化を使用すると、ゼロから新しい契約インスタンスを作成せずに契約を変更することができます。ただし、この機能を使用するには、契約の状態オブジェクトに evolve プロパティが含まれており、それが新しい契約ソーストランザクションの識別子に設定されている必要があります。これにより、既存の契約をゼロからではなく、修正および改善することができます。

```json
{
  ...
  "evolve": "YOUR SOURCE CODE TX_ID"
}
```

## 新しいソースコードをPermawebに投稿する

既存の契約を進化させる前に、新しいソースコードをPermawebに投稿する必要があります。これは、`save` 関数を使用して行うことができます。

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

## 契約を進化させる

::: warning
新しいソース TX_ID が確認されていることを **確認してください**。[Sonar](https://sonar.warp.cc) にアクセスして TX_ID が確認されていることを確認してください。
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
進化機能は、将来のアクションにのみ適用されることに留意する価値があります。つまり、契約が進化する前に行われたアクションに新しいソースコードを適用することはできません。
:::


## 概要

進化は強力な機能であり、契約に対して拡張性を提供するだけでなく、**攻撃**の経路となる可能性もありますので、使用する際には自分が何をしているのかを理解していることを確認してください。以下は、契約内の進化関数の一般的なスニペットの例です。

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