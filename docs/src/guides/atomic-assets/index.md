# Atomic Assets

Permaweb Atomic Assets are digital assets that are stored on the Permaweb, a decentralized, permanent data storage layer built on top of the Arweave blockchain. They are unique, non-fungible assets that can represent a wide variety of things, such as collectible items, artwork, or even web-pages, sites, and applications.

Permaweb Atomic Assets are created using a [SmartWeave Token Contract](../../concepts/psts.md), [ANS-110 Transaction Tags](../../tags.md), and digital data.

![Atomic Asset Visual](https://arweave.net/6QMAqO4ONrSn15qVJKcAjeMpFQqSRVfAY95JGQBZFXQ)

## Creating an Atomic Asset

::: info INFORMATION
For this example, we are using a SWT Contract Source that is already published on the network. [x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) - 
:::

example.ts

```ts
import Bundlr from '@bundlr-network/client'
import { WarpFactory } from 'warp-contracts'

async function main() {
  const wallet = JSON.parse(await import('fs')
    .then(fs => fs.readFileSync('./wallet.json', 'utf-8')))

  const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', wallet)
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
        name: 'AtomicAsset',
        ticker: 'ATOMIC',
        pairs: [],
        creator: 'cHB6D8oNeXxbQCsKcmOyjUX3UkL8cc3FbJmzbaj3-Nc',
        settings: [['isTradeable', true]]
      })
    }
  ]

  const { id } = await bundlr.upload(data, { tags })
  await warp.createContract.register(id, 'node2')
  console.log('Atomic Asset: ', id)
}

main()
```

In this example, we are creating a data-item and uploading the item to the bundler network service. Then we are registering our contract with the Warp sequencer. By using bundler to publish our data-item and registering with the Warp sequencer, our data is immediately available on the gateway service and our contract is immediately able to accept interactions.

Run Example

```sh
npm install @bundlr-network/client warp-contracts 
npm install typescript ts-node
npx ts-node example.ts
```

::: info INFORMATION
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) is an Asset Discovery Specification to allow for composability with the Permaweb Application ecosystem.
:::

## Summary

This is a simple example of deploying an Atomic Asset, for more detailed examples check out: [https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)

