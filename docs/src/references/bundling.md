# Bundling

Before getting started with any of the below references, make sure you've read
[Bundles and Bundling](/concepts/bundles) from [Core Concepts](/concepts).

We'll be using the [arbundles](https://github.com/bundlr-Network/arbundles)
library which is a JavaScript implementation of the
[ANS-104 specification](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md).  This library comes with TypeScript support.

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

In order to create Data Items, we need to first create a `Signer`.

Note: for Typescript, you can also import the `JWKInterface` from the `arweave` library.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner } from 'arbundles/src/signing'
import type { JWKInterface } from 'arbundles/src/interface-jwk'

const jwk: JWKInterface = { /* your jwk */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## Create a `DataItem`

To create a `DataItem`, we pass some data along with a `Signer` to the
`createData()` utility function.

Note: while the `createData()` utility
function requires a `Signer`, the returned `DataItem` is not yet signed and
contains a placeholder ID.

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

To create a Bundle, we pass our `DataItem` to the `bundleAndSignData` utility
function and `await` the result.

Note: `DataItem` passed to this utility function can
be pre-signed as detailed in a later section.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems)
```

  </CodeGroupItem>
</CodeGroup>

## Create a `Transaction` from a `Bundle`

In order to post a `Bundle` to Arweave, there ultimately needs to be a root
Layer 1 `Transaction` containing the `Bundle`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

const arweave = new Arweave({})

// Create using ArweaveJS
const tx = arweave.createTransaction({ data: bundle.getRaw() }, jwk)

// Create from the Bundle itself
const tx = bundle.toTransaction({}, arweave, jwk)
```

  </CodeGroupItem>
</CodeGroup>

## Sign a `DataItem`

In order to get a `DataItem`'s ID (e.g. for use in a manifest also contained in the same bundle), we must call and `await` its `.sign()` method.  If signing
is successful, the `DataItem` will now have their unique ID and signature and
are ready to be added to a `Bundle`.

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
