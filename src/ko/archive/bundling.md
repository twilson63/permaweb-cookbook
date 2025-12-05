# 번들링

아래의 레퍼런스를 시작하기 전에 [Core Concepts](/concepts/)의 [Bundles and Bundling](/concepts/bundles.md)를 반드시 읽었는지 확인하세요.

## 설정

여기서는 JavaScript 구현인 [arbundles](https://github.com/irys-xyz/arbundles) 라이브러리를 사용합니다. 이 라이브러리는 [ANS-104 specification](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)을 구현한 것입니다. ArBundles는 TypeScript 지원을 제공합니다.

**참고:** 이 레퍼런스는 NodeJS 환경을 가정합니다. 브라우저에서 ArBundles를 사용하려면 현재 `Buffer` 폴리필을 처리해야 하며, 이는 향후 ArBundles 버전에서 해결될 예정입니다.

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

## `Signer` 생성

DataItem을 생성하려면 먼저 `Signer`를 생성해야 합니다.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* your Arweave jwk keyfile */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## `DataItem` 생성

`DataItem`을 생성하려면, `createData()` 유틸리티 함수에 일부 데이터와 `Signer`를 전달합니다.

**참고:** `createData()` 유틸리티 함수는 `Signer`를 필요로 하지만, 반환된 `DataItem`은 아직 **서명되지 않았으며** 자리표시자 ID를 포함합니다.

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

## `Bundle` 생성

`Bundle`을 생성하려면 `DataItem`들을 `bundleAndSignData` 유틸리티 함수에 전달하고 결과를 `await`합니다.

**참고:** 이 유틸리티 함수에 전달되는 `DataItem`은 이후 섹션에서 설명하는 것처럼 사전 서명(pre-signed)될 수 있습니다.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [ myDataItem, myOtherDataItem ]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## `Bundle`로부터 `Transaction` 생성

Bundle을 Arweave에 게시하려면 궁극적으로 Bundle을 포함하는 루트 레이어 1 `Transaction`이 필요합니다.

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

## `DataItem` 서명

DataItem의 ID(예: 동일 Bundle에 포함된 매니페스트에서 사용하기 위해)를 얻으려면 해당 객체의 `.sign()` 메서드를 호출하고 `await`해야 합니다. 서명이 성공하면, `DataItem`은 고유한 ID와 서명을 가지게 되며 `Bundle`에 추가될 준비가 됩니다.

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

## `DataItem` 태깅

`DataItem`은 Layer 1 Arweave Transaction이 태그를 가질 수 있는 것과 마찬가지로 태그를 가질 수 있습니다. Arweave Gateway가 Bundle을 언번들(unbundle)하고 인덱싱하면, 이러한 `DataItem` 태그는 Layer 1 Arweave Transaction의 태그를 쿼리하는 것과 동일한 방식으로 쿼리할 수 있게 됩니다.

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

## Bundle 사용

**경고:** `new Bundle(buffer)`에 전달하는 `Buffer`가 실제로 `Bundle`을 포함하고 있는지 반드시 확인하세요. 그렇지 않으면 아주 작은 `Buffer`가 전달될 경우 스레드가 크래시할 수 있습니다. 운영 환경에서는 `new Bundle(buffer)`를 사용하지 마십시오. 대신 ArBundles 리포지토리의 [streamable interface](https://github.com/irys-xyz/arbundles/blob/master/src/stream)를 참조하세요.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
