# Bundling

在開始閱讀下列任何參考內容之前，請先確定你已經閱讀過來自 [Core Concepts](/concepts/) 的 [Bundles and Bundling](/concepts/bundles.md)。

## Setup

我們會使用 [arbundles](https://github.com/irys-xyz/arbundles) 函式庫，它是 [ANS-104 specification](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) 的 JavaScript 實作。ArBundles 提供 TypeScript 支援。

**注意：** 本參考假設運行在 NodeJS 環境。ArBundles 在瀏覽器上的相容性是可行的，但目前需要處理 `Buffer` 的 polyfill。這個問題會在 ArBundles 的未來版本中解決。

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

## Create a `Signer`

為了建立 Data Items，我們首先需要建立一個 `Signer`。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## Create a `DataItem`

要建立 `DataItem`，我們將一些資料與一個 `Signer` 一起傳遞給 `createData()` 工具函式。

**注意：** 雖然 `createData()` 工具函式需要一個 `Signer`，但回傳的 `DataItem` 尚未被簽署，且包含一個佔位的 ID。

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

## Create a `Bundle`

要建立 Bundle，我們將 `DataItem` 傳給 `bundleAndSignData` 工具函式並等待結果。

**注意：** 傳給此工具函式的 `DataItem` 可以事先簽署，如後續章節所述。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## Create a `Transaction` from a `Bundle`

為了將 `Bundle` 發佈到 Arweave，最終需要在 Layer 1 中包含該 `Bundle` 的 root `Transaction`。

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

## Sign a `DataItem`

為了取得 `DataItem` 的 ID（例如在同一個 bundle 中的 manifest 使用），我們必須呼叫並等待它的 `.sign()` 方法。如果簽署成功，該 `DataItem` 現在會有其唯一的 ID 和簽名，並且可以被加入到 `Bundle` 中。

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

## Tagging `DataItem`

`DataItem` 本身可以像 Layer 1 的 Arweave 交易一樣擁有 tags。一旦 Arweave Gateway 解包並索引該 `Bundle`，這些 `DataItem` 的 tags 將能像 Layer 1 Arweave 交易的 tags 一樣被查詢。

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

## Consuming Bundles

**警告：** 請確保你傳給 `new Bundle(buffer)` 的 `Buffer` 確實包含一個 `Bundle`，否則，傳入非常小的 `Buffer` 會造成執行緒崩潰。**不要** 在生產環境中使用 `new Bundle(buffer)`。取而代之，請參考 ArBundles 倉庫中的 [streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream)。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
