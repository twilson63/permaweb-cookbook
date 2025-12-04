# バンドル

以下のリファレンスを始める前に、[Core Concepts](/concepts/) の [Bundles and Bundling](/concepts/bundles.md) を必ずお読みください。

## セットアップ

ここでは [arbundles](https://github.com/irys-xyz/arbundles) ライブラリを使用します。これは [ANS-104 specification](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) の JavaScript 実装です。ArBundles は TypeScript サポートを備えています。

**注意:** このリファレンスは NodeJS 環境を前提としています。ブラウザでの ArBundles の互換性は可能ですが、現在は `Buffer` のポリフィルの取り扱いが必要です。これは将来の ArBundles のバージョンで対処される予定です。

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install arbundles
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add arbundles
```

  </CodeGroupItem>
</CodeGroup>

## `Signer` を作成する

`DataItem` を作成するためには、まず `Signer` を作成する必要があります。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem` を作成する

`DataItem` を作成するには、いくつかのデータと `Signer` を `createData()` ユーティリティ関数に渡します。

**注意:** `createData()` ユーティリティ関数は `Signer` を必要としますが、返される `DataItem` は **まだ署名されておらず** プレースホルダーの ID を含んでいます。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { createData } from 'arbundles'

// Create a DataItem from a string
const myStringData: string = 'Hello, Permaweb!'
const myDataItem = createData(myStringData, signer)

// Create a DataItem from a Buffer or Uint8Array
const myBufferData: Buffer | Uint8Array = Buffer.from('Hello, Permaweb!')
const myOtherDataItem = createData(myBufferData, signer)

/* !!!WARNING!!! DATA ITEM ARE NOT YET SIGNED! */
```

  </CodeGroupItem>
</CodeGroup>

## `Bundle` を作成する

`Bundle` を作成するには、`DataItem` を `bundleAndSignData` ユーティリティ関数に渡し、結果を `await` します。

**注意:** このユーティリティ関数に渡される `DataItem` は、後述のとおり事前に署名（pre-signed）されていてもかまいません。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## `Bundle` から `Transaction` を作成する

`Bundle` を Arweave に投稿するには、最終的にその `Bundle` を含むルートのレイヤー 1 `Transaction` が必要です。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

// Set up an Arweave client
const arweave = new Arweave({
  protocol: 'https',
  host: 'arweave.net',
  port: 443
})

// Create using ArweaveJS
const tx = await arweave.createTransaction({ data: bundle.getRaw() }, jwk)

// OR Create from the Bundle itself
const tx = await bundle.toTransaction({}, arweave, jwk)

// Sign the transaction
await arweave.transactions.sign(tx, jwk)

// Post tx to Arweave with your preferred method!
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem` に署名する

`DataItem` の ID（例えば同一バンドル内に含めるマニフェストで使用するため）を取得するには、`.sign()` メソッドを呼び出して `await` する必要があります。署名が成功すると、`DataItem` は固有の ID と署名を持ち、`Bundle` に追加する準備が整います。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
await myDataItem.sign(signer)
await myOtherDataItem.sign(signer)

const id1 = myDataItem.id
const id2 = myOtherDataItem.id
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem` のタグ付け

`DataItem` は Layer 1 の Arweave Transaction と同様にタグを持つことができます。Arweave のゲートウェイが `Bundle` をアンバンドルしてインデックス化すると、これらの `DataItem` タグはレイヤー 1 の Arweave Transaction のタグと同じ方法でクエリ可能になります。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const myStringData: string = 'Hello, Permaweb!'
  const tags = [
    { name: 'Title', value: 'Hello Permaweb' },
    { name: 'Content-Type', value: 'text/plain' }
  ]
  const myDataItem = createData(myStringData, signer, { tags })
```

  </CodeGroupItem>
</CodeGroup>

## バンドルの使用

**警告:** `new Bundle(buffer)` に渡す `Buffer` が実際に `Bundle` を含んでいることを必ず確認してください。そうでないと、非常に小さな `Buffer` を渡した際にスレッドがクラッシュする可能性があります。**本番環境で `new Bundle(buffer)` を使用しないでください。** 代わりに ArBundles リポジトリの
[streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream) を参照してください。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
