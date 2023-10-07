---
locale: zh
---

# 打包

在查看下面的任何参考资料之前，请确保您已经阅读了[Core Concepts](/concepts/)中的[Bundles and Bundling](/concepts/bundles.md)。

## 设置

我们将使用[arbundles](https://github.com/irys-xyz/arbundles)库，它是[ANS-104 规范](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)的 JavaScript 实现。ArBundles 支持 TypeScript。

**注意：** 此参考假设您的环境是 NodeJS。虽然 ArBundles 与浏览器兼容，但目前需要使用`Buffer` polyfills。这个问题在将来的版本中将得到解决。

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

## 创建`Signer`

为了创建数据项，我们需要先创建一个`Signer`。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## 创建`DataItem`

要创建`DataItem`，我们将数据和`Signer`一起传递给`createData()`函数。

**注意：** 虽然`createData()`实用函数需要一个`Signer`，但返回的`DataItem`**尚未签名**，并包含一个占位符 ID。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { createData } from 'arbundles'

// 从字符串创建DataItem
const myStringData: string = 'Hello, Permaweb!'
const myDataItem = createData(myStringData, signer)

// 从Buffer或Uint8Array创建DataItem
const myBufferData: Buffer | Uint8Array = Buffer.from('Hello, Permaweb!')
const myOtherDataItem = createData(myBufferData, signer)

/* !!!WARNING!!! 数据项尚未签名! */
```

  </CodeGroupItem>
</CodeGroup>

## 创建`Bundle`

要创建 Bundle，我们将我们的`DataItem`传递给`bundleAndSignData`函数，并使用`await`等待结果。

**注意：** 传递给此实用函数的`DataItem`可以事先签名，详见后面的部分。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## 从 Bundle 创建`Transaction`

为了将 Bundle 发布到 Arweave，最终需要一个包含 Bundle 的根 Layer 1 `Transaction`。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

// 设置一个Arweave客户端
const arweave = new Arweave({
  protocol: 'https',
  host: 'arweave.net',
  port: 443
})

// 使用ArweaveJS创建
const tx = await arweave.createTransaction({ data: bundle.getRaw() }, jwk)

// 或者从Bundle本身创建
const tx = await bundle.toTransaction({}, arweave, jwk)

// 签署交易
await arweave.transactions.sign(tx, jwk)

// 使用您喜欢的方法将交易提交到Arweave！
```

  </CodeGroupItem>
</CodeGroup>

## 签署`DataItem`

为了获取`DataItem`的 ID（例如在同一个 bundle 中同时包含的清单中使用），我们必须调用和`await`其`.sign()`方法。如果签署成功，`DataItem`将拥有唯一的 ID 和签名，并准备添加到`Bundle`中。

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

## 给`DataItem`添加标签

`DataItem`本身可以像 Layer 1 Arweave 交易一样具有标签。一旦 Arweave Gateway 解包和索引`Bundle`，这些`DataItem`标签就可以像 Layer 1 Arweave 交易的标签一样进行查询。

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

## 使用 Bundle

**警告：** 确保您传递给`new Bundle(buffer)`的`Buffer`包含一个 Bundle，否则，传递非常小的`Buffer`将导致线程崩溃。**不要** 在生产环境中使用`new Bundle(buffer)`。而是查看 ArBundles 存储库中的[streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream)。

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
