# 打包

在開始閱讀下列任何參考之前，請先確定你已閱讀過來自 [核心概念](/concepts/) 的 [Bundles and Bundling](/concepts/bundles.md)。

## 設定

我們將使用 [arbundles](https://github.com/irys-xyz/arbundles) 函式庫，這是一個實作 [ANS-104 規範](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) 的 JavaScript 套件。ArBundles 提供 TypeScript 支援。

**注意：** 本參考假設在 NodeJS 環境中使用。ArBundles 在瀏覽器的相容性是可能的，但目前需要處理 `Buffer` 的 polyfill。此問題將在未來的 ArBundles 版本中解決。

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

## 建立 `Signer`

為了建立 `DataItem`，我們首先需要建立一個 `Signer`。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## 建立 `DataItem`

要建立 `DataItem`，我們將一些資料與 `Signer` 一起傳給 `createData()` 工具函式。

**注意：** 雖然 `createData()` 工具函式需要一個 `Signer`，但返回的 `DataItem` **尚未簽署**，並且包含一個佔位的 ID。

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

## 建立 `Bundle`

要建立 `Bundle`，我們將 `DataItem` 傳給 `bundleAndSignData` 工具函式並等待結果。

**注意：** 傳給此工具函式的 `DataItem` 可以事先簽署，詳情請見後面的章節。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## 從 `Bundle` 建立 `Transaction`

要將 `Bundle` 發佈到 Arweave，最終需要一個根層的 Layer 1 `Transaction` 包含該 `Bundle`。

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

## 簽署 `DataItem`

為了取得 `DataItem` 的 ID（例如在同一個 bundle 中的 manifest 使用），我們必須呼叫並等待其 `.sign()` 方法。如果簽署成功，該 `DataItem` 就會具有唯一的 ID 與簽章，並可以加入到 `Bundle` 中。

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

## 為 `DataItem` 加上標籤

`DataItem` 本身可以有標籤，就像 Layer 1 Arweave `Transaction` 可以有標籤一樣。一旦 Arweave Gateway 解包並索引該 `Bundle`，這些 `DataItem` 標籤就會像 Layer 1 `Transaction` 的標籤一樣可供查詢。

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

## 使用 `Bundle`

**警告：** 請確定你傳入 `new Bundle(buffer)` 的 `Buffer` 確實包含一個 `Bundle`，否則，傳入非常小的 `Buffer` 會導致執行緒崩潰。**請勿** 在生產環境中使用 `new Bundle(buffer)`。取而代之，請參考 ArBundles 倉庫中的 [streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream)。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
