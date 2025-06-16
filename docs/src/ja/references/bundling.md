---
locale: ja
---
# バンドリング

以下の参考資料を始める前に、[コアコンセプト](/concepts/)の[バンドルとバンドリング](/concepts/bundles.md)を読んでおくことをお勧めします。

## セットアップ

私たちは、[arbundles](https://github.com/irys-xyz/arbundles)ライブラリを使用します。これは、[ANS-104仕様](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)のJavaScript実装です。ArBundlesはTypeScriptサポートも提供しています。

**注意:** この参考資料はNodeJS環境を前提としています。ArBundlesのブラウザ互換性は可能ですが、現在は`Buffer`ポリフィルを扱う必要があります。これは将来のArBundlesのバージョンで解決される予定です。

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

## `Signer`を作成する

データアイテムを作成するには、まず`Signer`を作成する必要があります。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem`を作成する

`DataItem`を作成するには、いくつかのデータと`Signer`を`createData()`ユーティリティ関数に渡します。

**注意:** `createData()`ユーティリティ関数は`Signer`を必要としますが、返される`DataItem`は**まだ署名されておらず**、プレースホルダーIDが含まれています。

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

## `Bundle`を作成する

`Bundle`を作成するには、`DataItem`を`bundleAndSignData`ユーティリティ関数に渡し、結果を`await`します。

**注意:** このユーティリティ関数に渡される`DataItem`は、後のセクションで詳述されているように、事前に署名されている場合があります。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## `Bundle`から`Transaction`を作成する

`Bundle`をArweaveに投稿するには、最終的に`Bundle`を含むルートLayer 1の`Transaction`が必要です。

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

## `DataItem`に署名する

`DataItem`のID（例えば、同じバンドルに含まれるマニフェストで使用するため）を取得するには、その`.sign()`メソッドを呼び出して`await`する必要があります。署名が成功すると、`DataItem`は独自のIDと署名を持ち、`Bundle`に追加する準備が整います。

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

## `DataItem`にタグ付けする

`DataItem`は、Layer 1のArweaveトランザクションと同様に、タグを持つことができます。Arweaveゲートウェイが`Bundle`をアンバンドルしてインデックス化すると、これらの`DataItem`タグは、Layer 1のArweaveトランザクションのタグと同じようにクエリ可能になります。

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

## バンドルの消費

**警告:** `new Bundle(buffer)`に渡す`Buffer`が`Bundle`を含んでいることを確認してください。そうでない場合、非常に小さな`Buffer`が渡されるとスレッドがクラッシュします。**本番環境では** `new Bundle(buffer)`を使用しないでください。代わりに、ArBundlesリポジトリの[ストリーミングインターフェース](https://github.com/irys-xyz/arbundles/blob/master/src/stream)を参照してください。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
