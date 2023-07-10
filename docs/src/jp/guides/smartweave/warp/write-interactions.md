---
locale: jp
---
# Warp WriteInteractions

スマートウィーブのコントラクト上で関数を呼び出すためには、スマートウィーブアクションと呼ばれるトランザクションを作成することができます。このアクションには、スマートウィーブコントラクト上の関数名と関数への必要な入力パラメータが含まれます。スマートウィーブアクションは、contract.writeInteraction 関数を使用して作成することができます。

## コード

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

writeInteraction を呼び出す際には、入力パラメータを渡す必要があります。これらのパラメータは、コントラクトが期待するパラメータです。

::: warning
スマートウィーブコントラクトは遅延フローで評価されるため、インタラクションが正常に実行されたかどうかは、コントラクトを現在の状態に評価するまでわかりません。[Warp readState](./readstate.md) を使用してコントラクトにアクセスし、インタラクションが正常に適用されたかどうかを判断してください。
:::

## Dry Write

`DryWrite` を使用すると、パーマウェブ上で実際に実行することなく、現在の状態でのインタラクションをテストおよび検証することができます。この機能により、ローカルでインタラクションをシミュレートし、成功することを確認できます。

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
DryWrite を使用する際に注意すべき点は、readState や internalWrites を使用するコントラクトでは、すべての状態をローカルで評価する必要があることです。これにより、パフォーマンスが低下する場合があります。
:::

## スピード最適化

デフォルトでは、writeInteractions は Warp Sequencer に送信され、Arweave にバンドルされて投稿されます。バンドルを無効にすることで、直接 Arweave に投稿することができます。

```ts
const result = await contract.writeInteraction({
  function: 'NAME_OF_YOUR_FUNCTION',
  ...
}, { disableBundling: true })
```

## 概要

スマートウィーブプロトコルは、writeInteractions を使用して不変な追記専用ストレージシステム上の動的なデータの変更を可能にします。これらのインタラクションにより、スマートウィーブコントラクトとの信頼性のあるパーミッションレスな通信が可能になります。Warp SDK は、スマートウィーブプロトコルとその writeInteractions 機能との対話を容易にするための開発者向けのユーザーフレンドリーな API を提供します。

その他のリソース:

* Warp SDK [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Warp ドキュメント [https://warp.cc](https://warp.cc)