---
locale: ja
---
# Warp (SmartWeave) SDK - Evolve

> **⚠️ Deprecation Notice**
>
> この文書は廃止予定であり、古い情報が含まれている可能性があります。

Evolveは、開発者が新しいコントラクトをデプロイすることなくスマートコントラクトのソースコードを更新できる機能です。この機能を使用するには、まず新しいソースコードをsave関数を使って送信する必要があります。更新されたコードがPermaweb上で確認されたら、evolve関数を使用してコントラクトを新しいソースコードIDにポイントします。これにより、新しいコントラクトインスタンスを作成することなく、コントラクトの動作を更新できます。

## なぜ？

SmartWeaveコントラクトを書くのは難しく、時間の経過とともに更新や新機能を追加する必要がある場合があります。Evolveを使用することで、新しいコントラクトインスタンスをゼロから作成することなく、コントラクトに変更を加えることができます。この機能を使用するには、コントラクトの状態オブジェクトに新しいコントラクトソーストランザクション識別子を設定したevolveプロパティを含める必要があります。これにより、ゼロから始めることなく既存のコントラクトを修正および改善できます。


```json
{
  ...
  "evolve": "YOUR SOURCE CODE TX_ID"
}
```

## 新しいソースをPermawebに投稿する

既存のコントラクトを進化させる前に、新しいソースコードをPermawebに投稿する必要があります。これを`save`関数を使って行います。
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

## コントラクトを進化させる

::: warning
**確認**してください：新しいSource TX_IDが確認されていることを、[Sonar](https://sonar.warp.cc)でTX_IDが確認されていることを確認してください。
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
進化機能は、将来のアクションにのみ適用されることに注意してください。つまり、コントラクトが進化する前に発生したアクションに新しいソースコードを適用することはできません。
:::

## まとめ

Evolveは強力な機能であり、コントラクトの拡張性を提供しますが、**攻撃**ベクトルにもなり得るため、使用する際には自分が何をしているのかを十分に理解していることを確認してください。以下は、コントラクト内でのevolve関数の一般的なスニペットの例です。

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

