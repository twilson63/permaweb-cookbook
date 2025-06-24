---
locale: ja
---
# Warp (SmartWeave) SDK Intro

> **⚠️ Deprecation Notice**
>
> この文書は廃止予定であり、古い情報が含まれている可能性があります。

Warpは人気のあるSmartWeaveプロトコルSDKです。WarpとIrysを使用すると、SmartWeaveのデプロイやインタラクションを非常に高速に行うことができます。

## はじめに

このガイドはWarp SDKとそのAPIメソッドの簡単な紹介です。SmartWeaveコントラクトの一般的な情報については、[Core Concepts: SmartWeave](/concepts/smartweave.html)をご覧ください。

::: tip
Warp SDKは[github](https://github.com/warp-contracts)で見つけることができます。Warp SmartWeaveについてさらに詳しく知りたい場合は、[Warp Website](https://warp.cc)をご覧ください。
:::

SDKをサーバーで使用するには、wallet.jsonファイルへのアクセスが必要です。ブラウザでSDKを使用するには、Arweaveサポートのウォレットに接続する必要があります。

## インストール

プロジェクトにwarpをインストールするには、`npm`、`yarn`、または他のnpmクライアントを使用できます。

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install warp-contracts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add warp-contracts
```

  </CodeGroupItem>
</CodeGroup>

## インポート

Warpをプロジェクトで使用する場合、プロジェクトのセットアップに応じてSDKをインポートする方法がいくつかあります。

<CodeGroup>
  <CodeGroupItem title="Typescript">

```ts
import { WarpFactory } from "warp-contracts";
```

  </CodeGroupItem>
  <CodeGroupItem title="ESM">

```js
import { WarpFactory } from "warp-contracts/mjs";
```

  </CodeGroupItem>
  <CodeGroupItem title="CommonJS">

```js
const { WarpFactory } = require("warp-contracts");
```

  </CodeGroupItem>
</CodeGroup>

## 環境への接続

インタラクションを行いたい環境はいくつかあります。これらの環境には`forXXXX`ヘルパーを使用して接続できます。

<CodeGroup>
  <CodeGroupItem title="Mainnet">

```ts
const warp = WarpFactory.forMainnet();
```

  </CodeGroupItem>
  <CodeGroupItem title="Testnet">

```js
const warp = WarpFactory.forTestnet();
```

  </CodeGroupItem>
  <CodeGroupItem title="Local">

```js
const warp = WarpFactory.forLocal();
```

  </CodeGroupItem>
  <CodeGroupItem title="Custom">

```js
const warp = WarpFactory.custom(
	arweave, // arweave-js
	cacheOptions, // { ...defaultCacheOptions, inMemory: true}
	environment, // 'local', 'testnet', 'mainnet'
);
```

  </CodeGroupItem>
</CodeGroup>

::: warning
ローカル環境を使用する場合は、ポート1984でarLocalを実行している必要があります。
:::

## まとめ

このイントロガイドはWarpの設定を手助けするためのものであり、次のガイドではWarp SDKを使用してSmartWeaveコントラクトをデプロイし、それらのコントラクトとインタラクトし、最終的にはSmartWeaveコントラクトを進化させる方法を示します。
