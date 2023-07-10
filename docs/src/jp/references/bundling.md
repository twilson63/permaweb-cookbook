---
locale: jp
---
# バンドル

以下の参照資料を使う前に、[Bundles and Bundling](/concepts/bundles.md)を[コアコンセプト](/concepts/)から読んでください。

## セットアップ

[arbundles](https://github.com/bundlr-Network/arbundles)ライブラリを使用します。これは[ANS-104仕様](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)のJavaScript実装です。ArBundlesはTypeScriptのサポートも提供しています。

**注意:** この参照資料はNodeJS環境を前提としています。ArBundlesとのブラウザ互換性も可能ですが、現在は`Buffer`ポリフィルを扱う必要があります。これは将来のバージョンで対応される予定です。

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

const jwk: JWKInterface = { /* あなたのArweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem`を作成する

`DataItem`を作成するには、`createData()`ユーティリティ関数にデータと`Signer`を渡します。

**注意:** `createData()`ユーティリティ関数は`Signer`を必要としますが、返される`DataItem`はまだ**署名されていません**。代わりにプレースホルダーIDが含まれています。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { createData } from 'arbundles'

// 文字列からDataItemを作成する
const myStringData: string = 'こんにちは、パーマウェブ！'
const myDataItem = createData(myStringData, signer)

// バッファまたはUint8ArrayからDataItemを作成する
const myBufferData: Buffer | Uint8Array = Buffer.from('こんにちは、パーマウェブ！')
const myOtherDataItem = createData(myBufferData, signer)

/* !!!警告!!! DATA ITEM はまだ署名されていません! */
```

  </CodeGroupItem>
</CodeGroup>

## `Bundle`を作成する

`Bundle`を作成するには、`bundleAndSignData`ユーティリティ関数に`DataItem`を渡し、結果を`await`します。

**注意:** このユーティリティ関数に渡される`DataItem`は、後のセクションで詳述されているように、事前に署名されている場合もあります。

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

Arweaveに`Bundle`を投稿するためには、最終的にはルートのLayer 1 `Transaction`に`Bundle`を含める必要があります。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

// Arweaveクライアントをセットアップする
const arweave = new Arweave({
  protocol: 'https',
  host: 'arweave.net',
  port: 443
})

// ArweaveJSを使用して作成する
const tx = await arweave.createTransaction({ data: bundle.getRaw() }, jwk)

// またはBundleそのものから作成する
const tx = await bundle.toTransaction({}, arweave, jwk)

// トランザクションに署名する
await arweave.transactions.sign(tx, jwk)

// トランザクションをArweaveに投稿する（お好きな方法で！）
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem`に署名する

`DataItem`のIDを取得するために（同じバンドルに含まれるマニフェストで使用するためなど）、`await`と`.sign()`メソッドを呼び出す必要があります。署名に成功すると、`DataItem`には一意のIDと署名が含まれ、`Bundle`に追加する準備ができます。

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

## `DataItem`にタグを付ける

`DataItem`自体には、Layer 1のArweaveトランザクションと同様にタグを付けることができます。Arweaveゲートウェイが`Bundle`をアンバンドルしてインデックス化すると、これらの`DataItem`のタグは、Layer 1のArweaveトランザクションのタグと同様にクエリ可能になります。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const myStringData: string = 'こんにちは、パーマウェブ！'
  const tags = [
    { name: 'Title', value: 'こんにちはパーマウェブ' },
    { name: 'Content-Type', value: 'text/plain' }
  ]
  const myDataItem = createData(myStringData, signer, { tags })
```

  </CodeGroupItem>
</CodeGroup>

## バンドルの消費

**注意:** `new Bundle(buffer)`に渡す`Buffer`が実際に`Bundle`を含んでいることを確認してください。そうでない場合、非常に小さな`Buffer`を渡すとスレッドがクラッシュします。本番環境では`new Bundle(buffer)`を使用しないでください。代わりに、ArBundlesリポジトリの[ストリームインターフェース](https://github.com/Bundlr-Network/arbundles/blob/master/src/stream)を参照してください。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>