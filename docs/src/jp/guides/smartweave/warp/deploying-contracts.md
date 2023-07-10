---
locale: jp
---
# Warp（SmartWeave）SDK - 契約の展開

SmartWeave契約は、ネットワークに2つのトランザクションを投稿することによって作成されます。ソーストランザクションと初期状態トランザクションです。ソーストランザクションには、契約が現在の状態を決定するために使用するソースコードが含まれています。初期状態トランザクションは、契約を参照するための契約識別子と、現在の状態を評価するための開始ポイントとして使用する初期シードデータを提供します。現在の状態は、評価され、インスタンス化されたソースコードを使用して実行するための入力パラメータを含むネットワークに書き込まれたトランザクションであるアクションにアクセスして計算されます。Warp契約はさまざまな言語を使用して作成することができ、Warp SDKを使用して評価することができます。このガイドでは、Warp契約を展開するさまざまな方法を紹介します。

::: tip
Warp SmartWeave契約の作成について詳しく知りたい場合は、Warp Academyをチェックしてください！ [https://academy.warp.cc/](https://academy.warp.cc/)
:::

Warpバージョン1.3.0以降、Warpを使用して契約を展開するためには、プラグインが必要です。このプラグインを使用すると、さまざまなウォレット署名を追加できます。

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

async function deploy(initState, src) {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE']);
  }
  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  return warp.deploy({
    wallet: userSigner,
    src,
    initState: JSON.stringify(initState)
  })
}
```


## Warp SmartWeave契約を展開する4つの方法

Warp SDKを使用してSmartWeaveContractを展開する方法は4つあります。これらのオプションは、開発者が遭遇する可能性のあるさまざまなユースケースを処理します。

* ソースを同時に展開する必要がある場合
* ソースが既にパーマウェブにある契約を展開する必要がある場合
* シーケンサを介してデータのパスマニフェストを使用してデータを指定する契約を展開する必要がある場合
* Bundlrを介して契約を展開し、その契約をシーケンサに登録する必要がある場合

::: tip
Warp展開についての詳細については、このプロジェクトのgithub Readmeを確認してください。[https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment)。
:::

::: warning
このプロジェクトは急速に開発されているため、ここに記載されているドキュメントはすぐに古くなる可能性があります。古くなっていると発見した場合は、[Permaweb Cookbook Discordチャンネル](https://discord.gg/haCAX3shxF)でお知らせください。
:::

## 例

::: tip
デフォルトでは、すべての展開関数はBundlr-Networkを介してArweaveに公開されます。ただし、Bundlrを使用しないように設定するフラグが各オプションにあります。ただし、ネットワークがトランザクションを完全に確認するまでには多くの確認が必要です。
:::

**deploy**

契約とソースコードをWarp Sequencer、Bundlr（L2）、Arweaveに展開します。

```ts
const { contractTxId, srcTxId } = await warp.deploy({
  wallet,
  initState,
  data: {'Content-Type':'text/html',body:'<h1>Hello World</h1>'},
  src: contractSrc,
  tags: [{"name":"AppName", "value":"HelloWorld"}],
})
```

* wallet - Arweaveキーファイル（wallet.json）をJSONオブジェクトとしてパースし、[JWKインターフェース](https://rfc-editor.org/rfc/rfc7517)を実装するか、文字列 'use_wallet' である必要があります。
* initState - 文字列化されたJSONオブジェクトです。
* data - デプロイメントの一部としてデータを書き込む場合はオプションです。
* src - 契約のソースコードの文字列またはUint8Array値です。
* tags - 名前/値オブジェクトの配列 `{name: string, value: string}[]` です。[タグの詳細を確認](../../../concepts/tags.md)

**deployFromSourceTx**

既にソースをパーマウェブ上に持っていますか？それでは、deployFromSourceTxが選択するツールです！パーマウェブではデータが変更されることを心配する必要はないため、契約のためのソースコードを再利用することは当然のことです。

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
  wallet,
  initState,
  srcTxId: 'SRC_TX_ID'
})
```

**deployBundled**

Warp Gateway Sequencerのエンドポイントを使用して、生のデータ項目をBundlrにアップロードしてインデックス化します。

```ts
import { createData } from 'arbundles'

const dataItem = createData(
  JSON.stringify({
    "manifest": "arweave/paths",
    "version": "0.1.0",
    "index": {
      "path": "index.html"
    },
    "paths": {
      "index.html": {
        "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
      }
    }
  })
  , {tags:[{'Content-Type': 'application/x.arweave-manifest+json' }]})
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```


**register**

Bundlrでアップロードされた契約をインデックスするために、Warp Gateway Sequencerのエンドポイントを使用します。

```ts
import Bundlr from '@bundlr-network/client'

const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', wallet)
const { id } = await bundlr.upload('Some Awesome Atomic Asset',  { 
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2') 
```

## 要約

なぜ契約を展開するためにこれほど多くのオプションがあるのでしょうか？これらのメソッドは、重複を減らし、高度な契約の相互作用を可能にし、スマートウィーブプロトコルのテストと使用のための柔軟性を提供するために存在します。パーマウェブはそのアーキテクチャにおいて非常にユニークであり、デジタルデータとそのデータを管理する契約を同じトランザクション識別子で生成できる機能を提供します。その結果、動的データと不変のデータセットがペアになります。契約の展開はWarp SDKの一部に過ぎません。詳細については、このガイドの続きを読んでください！