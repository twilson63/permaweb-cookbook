---
locale: ja
---
# Warp (SmartWeave) SDK - Deploying Contracts

> **⚠️ Deprecation Notice**
>
> この文書は廃止予定であり、古い情報が含まれている可能性があります。

SmartWeaveコントラクトは、ネットワークに対して2つのトランザクションを投稿することで作成されます。1つはソーストランザクション、もう1つは初期状態トランザクションです。ソーストランザクションには、コントラクトが現在の状態を決定するために使用するソースコードが含まれています。初期状態トランザクションは、参照するためのコントラクト識別子と、コントラクトが現在の状態を評価するための出発点として使用すべき初期シードデータを提供します。現在の状態は、ネットワークに書き込まれたアクション（入力パラメータを実行するために評価されたソースコードを使用するトランザクション）にアクセスすることによって計算されます。Warpコントラクトは多くの異なる言語で作成でき、Warp SDKを使用して評価できます。このガイドでは、Warpコントラクトをデプロイするさまざまな方法を示します。

::: tip
Warp SmartWeaveコントラクトの作成について詳しく学ぶには、Warpアカデミーをチェックしてください！ [https://academy.warp.cc/](https://academy.warp.cc/)
:::

Warpバージョン1.3.0以降、コントラクトをWarpでデプロイするためにはプラグインが必要です。このプラグインを使用すると、さまざまなウォレット署名を追加できます。

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

function deploy(initState, src) {
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

## Warp SmartWeaveコントラクトをデプロイする4つの方法

Warp SDKを介してSmartWeaveコントラクトをデプロイする方法は4つあります。これらのオプションは、開発者が直面するさまざまなユースケースを処理します。

-   ソースを同時にデプロイする必要がある
-   すでにpermawebにソースがあるコントラクトをデプロイする必要がある
-   シーケンサーを介してコントラクトをデプロイし、パスマニフェストを使用してデータを指し示す必要がある
-   Irysを介してコントラクトをデプロイし、そのコントラクトをシーケンサーに登録する必要がある

::: tip
Warpのデプロイメントに関する詳細は、プロジェクトのGitHubのREADMEをチェックしてください。 [https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment)
:::

::: warning
このプロジェクトは急速に開発が進んでいるため、ここにある文書はすぐに古くなる可能性があります。古いことに気づいた場合は、[Permaweb Cookbook Discord Channel](https://discord.gg/haCAX3shxF)でお知らせください。
:::

## 例

::: tip
デフォルトでは、すべてのデプロイ関数はIrysを介してArweaveに公開されます。各オプションには、Irysを使用しないように設定できるフラグがありますが、ネットワークがトランザクションを完全に確認するまでに多くの確認が必要です。
:::

**deploy**

コントラクトとソースコードをWarpシーケンサーにデプロイし、Irys（L2）およびArweaveにデプロイします。

```ts
const { contractTxId, srcTxId } = await warp.deploy({
	wallet,
	initState,
	data: { "Content-Type": "text/html", body: "<h1>Hello World</h1>" },
	src: contractSrc,
	tags: [{ name: "AppName", value: "HelloWorld" }],
});
```

-   wallet - should be Arweave keyfile (wallet.json) parsed as a JSON object implementing the [JWK Interface](https://rfc-editor.org/rfc/rfc7517) or the string 'use_wallet'
-   initState - is a stringified JSON object
-   data - is optional if you want to write data as part of your deployment
-   src - is the string or Uint8Array value of the source code for the contract
-   tags - is an array of name/value objects `{name: string, value: string}[]`, [Learn more about tags](../../../concepts/tags.md)


**deployFromSourceTx**

すでにpermawebにソースがありますか？その場合、deployFromSourceTxがあなたの選択肢です！permawebでは、データが変更される心配がないため、コントラクトのソースコードを再利用するのは簡単です。

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
	wallet,
	initState,
	srcTxId: "SRC_TX_ID",
});
```

**deployBundled**

Warpゲートウェイシーケンサーのエンドポイントを使用して、生データアイテムをIrysにアップロードし、インデックス化します。

```ts
import { createData } from "arbundles";

const dataItem = createData(
	JSON.stringify({
		manifest: "arweave/paths",
		version: "0.1.0",
		index: {
			path: "index.html",
		},
		paths: {
			"index.html": {
				id: "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI",
			},
		},
	}),
	{ tags: [{ "Content-Type": "application/x.arweave-manifest+json" }] },
);
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```


**register**

Warpゲートウェイシーケンサーのエンドポイントを使用して、Irysでアップロードされたコントラクトをインデックス化します。

```ts
import Irys from '@irys/sdk'

const irys = new Irys({ 'https://node2.irys.xyz', 'arweave', wallet })
const { id } = await irys.upload('Some Awesome Atomic Asset',  {
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2')
```

## まとめ

なぜこれほど多くのコントラクトをデプロイするオプションがあるのでしょうか？これらのメソッドは重複を減らし、高度なコントラクトインタラクションを可能にし、スマートウィーブプロトコルのテストや使用の柔軟性を提供するために存在します。permawebは非常にユニークなアーキテクチャを持っており、デジタルデータとそのデータを管理するためのコントラクトの両方を同じトランザクション識別子でデプロイする機能を提供します。その結果、動的データと不変のデータセットがペアになります。コントラクトをデプロイすることはWarp SDKの一部に過ぎず、詳細を学ぶにはこのガイドを読み続けてください！