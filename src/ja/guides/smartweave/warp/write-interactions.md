---
locale: ja
---
# Warp WriteInteractions

> **⚠️ Deprecation Notice**
>
> この文書は廃止予定であり、古い情報が含まれている可能性があります。

SmartWeaveコントラクト上の関数を呼び出すには、SmartWeaveアクションとして知られるトランザクションを作成します。このアクションには、関数名とSmartWeaveコントラクトの関数に必要な入力パラメータが含まれます。コントラクトのwriteInteraction関数を使用してSmartWeaveアクションを作成できます。

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

writeInteractionを呼び出す際には、コントラクトが受け取ることを期待している入力パラメータを渡す必要があります。

::: warning
SmartWeaveコントラクトは遅延フローで評価されるため、あなたのインタラクションが成功したかどうかは、コントラクトを現在の状態に評価するまで分かりません。[Warp readState](./readstate.md)を使用してコントラクトにアクセスし、インタラクションが成功したかどうかを確認してください。
:::

## ドライ書き込み

`DryWrite`は、実際にpermaweb上で実行せずに、現在の状態でインタラクションをテストして検証できる機能です。この機能を使用すると、ローカルでインタラクションをシミュレートし、それが成功するかどうかを確認してから適用できます。


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
ドライ書き込みを使用する際の注意点として、readStateやinternalWritesを使用するコントラクトの場合、全体の状態をローカルで評価する必要があります。これにより、処理が遅くなる可能性があります。
:::

## スピード最適化

デフォルトでは、writeInteractionsはWarp Sequencerに送信され、バンドルされてArweaveに投稿されます。バンドルを無効にすることで、直接Arweaveに投稿することも可能です。

```ts
const result = await contract.writeInteraction({
  function: 'NAME_OF_YOUR_FUNCTION',
  ...
}, { disableBundling: true })
```

## まとめ

SmartWeaveプロトコルは、immutableでappend-onlyのストレージシステム上の動的データを変更することを可能にし、writeInteractionsを使用してSmartWeaveコントラクトとの信頼のない、許可のないコミュニケーションを可能にします。Warp SDKは、SmartWeaveプロトコルとそのwriteInteractions機能とのインタラクションのためのユーザーフレンドリーなAPIを提供します。

追加リソース：

* Warp SDK [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Warp Docs [https://warp.cc](https://warp.cc)