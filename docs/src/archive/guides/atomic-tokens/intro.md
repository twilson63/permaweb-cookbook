# Atomic Tokens

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

## What is an Atomic Token?

[Check out the concept](../../concepts/atomic-tokens.md)

## Creating an Atomic Token

::: info INFORMATION
For this example, we are using a SWT Contract Source that is already published on the network. [x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) -
:::

example.ts

```ts
import Irys from '@irys/sdk'
import { WarpFactory } from 'warp-contracts'

async function main() {
  const wallet = JSON.parse(await import('fs')
    .then(fs => fs.readFileSync('./wallet.json', 'utf-8')))

  const irys = new Irys({ 'https://node2.irys.xyz', 'arweave', wallet })
  const warp = WarpFactory.forMainnet()

  const data = `<h1>Hello Permaweb!</h1>`
  const tags = [
    { name: 'Content-Type', value: 'text/html' },
    // ANS-110 Tags
    { name: 'Type', value: 'web-page' },
    { name: 'Title', value: 'My first permaweb page' },
    { name: 'Description', value: 'First permaweb page by Anon' },
    { name: 'Topic:Noob', value: 'Noob' },
    // SmartWeave Contract
    { name: 'App-Name', value: 'SmartWeaveContract' },
    { name: 'App-Version', value: '0.3.0' },
    { name: 'Contract-Src', value: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs' },
    {
      name: 'Init-State', value: JSON.stringify({
        balances: {
          'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc': 1000000
        },
        name: 'AtomicToken',
        ticker: 'ATOMIC-TOKEN',
        pairs: [],
        creator: 'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc',
        settings: [['isTradeable', true]]
      })
    }
  ]

  const { id } = await irys.upload(data, { tags })
  await warp.createContract.register(id, 'node2')
  console.log('Atomic Token: ', id)
}

main()
```

In this example, we are creating a data-item and uploading the item to the bundler network service. Then we are registering our contract with the Warp sequencer. By using bundler to publish our data-item and registering with the Warp sequencer, our data is immediately available on the gateway service and our contract is immediately able to accept interactions.

Run Example

```sh
npm install @irys/sdk warp-contracts
npm install typescript ts-node
npx ts-node example.ts
```

::: info INFORMATION
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) is an Asset Discovery Specification to allow for composability with the Permaweb Application ecosystem.
:::

## Summary

This is a simple example of deploying an Atomic Asset, for more detailed examples check out: [https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)

## Working with Tokens

SmartWeave Contracts can not hold AR the native coin of the Arweave Network. AR is used to purchase storage for data on the Arweave Network and it can be transferred from a source wallet to a target wallet on the Arweave network, but it can not be held in a SmartWeave contract.
