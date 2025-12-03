# 打包

在开始阅读下列任何参考之前，请先确保你已阅读来自 [核心概念](/concepts/) 的 [Bundles 与 Bundling](/concepts/bundles.md)。

## 设置

我们将使用 [arbundles](https://github.com/irys-xyz/arbundles) 库，这是一個實作 [ANS-104 规范](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md) 的 JavaScript 套件。ArBundles 提供 TypeScript 支持。

**注意：** 本参考假设在 NodeJS 环境中使用。ArBundles 在浏览器的兼容性是可能的，但目前需要处理 `Buffer` 的 polyfill。此问题将在未来的 ArBundles 版本中解决。

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

## 创建 `Signer`

为了创建 `DataItem`，我们首先需要创建一个 `Signer`。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## 创建 `DataItem`

要创建 `DataItem`，我们将一些数据与 `Signer` 一起传给 `createData()` 工具函数。

**注意：** 虽然 `createData()` 工具函数需要一个 `Signer`，但返回的 `DataItem` **尚未签署**，并且包含一个占位的 ID。

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

## 创建 `Bundle`

要创建 `Bundle`，我们将 `DataItem` 传给 `bundleAndSignData` 工具函数并等待结果。

**注意：** 传给此工具函数的 `DataItem` 可以事先签署，详情请见后面的章节。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## 从 `Bundle` 创建 `Transaction`

要将 `Bundle` 发布到 Arweave，最终需要一个根层的 Layer 1 `Transaction` 包含该 `Bundle`。

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

## 签署 `DataItem`

为了取得 `DataItem` 的 ID（例如在同一个 bundle 中的 manifest 使用），我们必须调用并等待其 `.sign()` 方法。如果签署成功，该 `DataItem` 就会具有唯一的 ID 与签名，并可以加入到 `Bundle` 中。

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

## 为 `DataItem` 添加标签

`DataItem` 本身可以有标签，就像 Layer 1 Arweave `Transaction` 可以有标签一样。一旦 Arweave Gateway 解包并索引该 `Bundle`，这些 `DataItem` 标签就会像 Layer 1 `Transaction` 的标签一样可供查询。

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

**警告：** 请确保你传入 `new Bundle(buffer)` 的 `Buffer` 确实包含一个 `Bundle`，否则，传入非常小的 `Buffer` 会导致线程崩溃。**请勿** 在生产环境中使用 `new Bundle(buffer)`。取而代之，请参考 ArBundles 仓库中的 [streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream)。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
