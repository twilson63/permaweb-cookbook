---
locale: jp
---
# アトミックトークン

## アトミックトークンとは？

[コンセプトを確認する](../../concepts/atomic-tokens.md)

## アトミックトークンの作成

::: info 情報
この例では、既にネットワーク上に公開されているSWTコントラクトのソースを使用しています。[x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) - 
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
    // ANS-110 タグ
    { name: 'Type', value: 'web-page' },
    { name: 'Title', value: 'My first permaweb page' },
    { name: 'Description', value: 'First permaweb page by Anon' },
    { name: 'Topic:Noob', value: 'Noob' },
    // SmartWeave コントラクト
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

  const { id } = await bundlr.upload(data, { tags })
  await warp.createContract.register(id, 'node2')
  console.log('アトミックトークン: ', id)
}

main()
```

この例では、データアイテムを作成し、そのアイテムをバンドラネットワークサービスにアップロードしています。そして、Warpシーケンサーにコントラクトを登録しています。バンドラを使用してデータアイテムを公開し、Warpシーケンサーに登録することで、データはゲートウェイサービスで即座に利用可能になり、コントラクトは即座にインタラクションを受け付けることができます。

例を実行する

```sh
npm install @bundlr-network/client warp-contracts 
npm install typescript ts-node
npx ts-node example.ts
```

::: info 情報
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md)は、PermAwebアプリケーションエコシステムとの相互運用性のためのアセットディスカバリー仕様です。
:::

## 概要

これはアトミックアセットのデプロイの単純な例です。詳細な例については、[https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)を参照してください。

## トークンの操作

SmartWeaveコントラクトは、ArweaveネットワークのネイティブコインであるARを保持することはできません。ARはArweaveネットワーク上のデータストレージを購入するために使用され、ソースウォレットからターゲットウォレットに転送することはできますが、SmartWeaveコントラクトに保持することはできません。