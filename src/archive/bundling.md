# Bundling

Before getting started with any of the below references, make sure you've read
[Bundles and Bundling](/concepts/bundles.md) from [Core Concepts](/concepts/).

## Setup

We'll be using the [arbundles](https://github.com/irys-xyz/arbundles)
library which is a JavaScript implementation of the
[ANS-104 specification](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md). ArBundles comes with TypeScript support.

**Note:** This reference assumes a NodeJS environment. Browser compatibility
with ArBundles is possible but currently requires wrangling `Buffer` polyfills.
This will be addressed in a future version of ArBundles.

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

To create a `DataItem`, we pass some data along with a `Signer` to the
`createData()` utility function.

**Note:** While the `createData()` utility function requires a `Signer`, the
returned `DataItem` is **not yet signed** and contains a placeholder ID.

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

**Note:** A `DataItem` passed to this utility function can
be pre-signed as detailed in a later section.

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

In order to post a `Bundle` to Arweave there ultimately needs to be a root
Layer 1 `Transaction` containing the `Bundle`.

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

In order to get a `DataItem`'s ID (e.g. for use in a manifest also contained in the same bundle), we must call and `await` its `.sign()` method. If signing
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

## Tagging `DataItem`

`DataItem` can themselves have tags just as Layer 1 Arweave Transactions can
have tags. Once an Arweave Gateway unbundles and indexes the `Bundle`, these
`DataItem` tags become queryable the same way a Layer 1 Arweave Transaction's
tags are queryable.

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

**WARNING:** Be sure that the `Buffer` you pass to `new Bundle(buffer)` does
contain a `Bundle`, otherwise, very small `Buffer` being passed will crash
the thread. **DO NOT** use `new Bundle(buffer)` in a production environment.
Instead, see the
[streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream)
in the ArBundles repository.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
