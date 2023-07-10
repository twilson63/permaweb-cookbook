---
locale: jp
---
# ワープ（スマートウィーブ）SDKイントロ

ワープは人気のあるスマートウィーブプロトコルSDKです。ワープとBundlrを使用すると、スマートウィーブの展開と相互作用が非常に高速になります。

## イントロダクション

このガイドは、ワープSDKとそのAPIメソッドのいくつかの短い紹介です。SmartWeave Contractsについて詳しく学びたい場合は、[コアコンセプト：SmartWeave](/concepts/smartweave.html)を参照してください。

::: tip
[github](https://github.com/warp-contracts)からワープSDKを見つけることができます。ワープSmartWeaveの詳細な説明については、[Warpウェブサイト](https://warp.cc)を訪れてください。
:::

サーバーでSDKを使用するには、wallet.jsonファイルにアクセスする必要があります。ブラウザーでSDKを使用するには、arweaveサポートのウォレットに接続する必要があります。

## インストール

プロジェクトにwarpをインストールするには、`npm`または`yarn`、または他のnpmクライアントを使用できます。

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

プロジェクトでワープを使用する場合、プロジェクトのセットアップに応じて、SDKをインポートする方法はいくつかあります。

<CodeGroup>
  <CodeGroupItem title="Typescript">

```ts
import { WarpFactory } from 'warp-contracts'
```

  </CodeGroupItem>
  <CodeGroupItem title="ESM">

```js
import { WarpFactory } from 'warp-contracts/mjs'
```

  </CodeGroupItem>
  <CodeGroupItem title="CommonJS">

```js
const { WarpFactory } = require('warp-contracts')
```

  </CodeGroupItem>
</CodeGroup>

## 環境への接続

相互作用する可能性のあるいくつかの環境があります。`forXXXX`ヘルパーを使用してこれらの環境に接続することがでます。

<CodeGroup>
  <CodeGroupItem title="メインネット">

```ts
const warp = WarpFactory.forMainnet()
```

  </CodeGroupItem>
  <CodeGroupItem title="テストネット">

```js
const warp = WarpFactory.forTestnet()
```

  </CodeGroupItem>
  <CodeGroupItem title="ローカル">

```js
const warp = WarpFactory.forLocal()
```

  </CodeGroupItem>
  <CodeGroupItem title="カスタム">

```js
const warp = WarpFactory.custom(
  arweave, // arweave-js
  cacheOptions, // { ...defaultCacheOptions, inMemory: true}
  environment // 'local', 'testnet', 'mainnet'
)
```

  </CodeGroupItem>
</CodeGroup>


::: warning
ローカル環境を使用する場合、ポート1984でarLocalが実行されている必要があります。
:::

## サマリー

このイントロガイドは、Warpのセットアップを支援するためのものであり、以下のガイドでは、Warp SDKを使用してSmartWeaveコントラクトを展開する方法、これらのコントラクトとの相互作用方法、最後にSmartWeaveコントラクトの発展方法を示します。