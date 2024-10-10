---
locale: ja
---
# アトミックトークン

> **⚠️ 廃止通知**
>
> この文書は廃止されており、古い情報が含まれている可能性があります。

## アトミックトークンとは？

[この概念をチェックしてください](../../concepts/atomic-tokens.md)

## アトミックトークンの作成

::: info INFORMATION
この例では、ネットワーク上に既に公開されているSWTコントラクトソースを使用しています。[x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) -
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

この例では、データアイテムを作成し、それをバンドラーネットワークサービスにアップロードしています。その後、Warpシーケンサーに契約を登録します。バンドラーを使用してデータアイテムを公開し、Warpシーケンサーに登録することで、私たちのデータはすぐにゲートウェイサービスで利用可能になり、私たちの契約はすぐにインタラクションを受け入れることができるようになります。

## 例を実行

```sh
npm install @irys/sdk warp-contracts
npm install typescript ts-node
npx ts-node example.ts
```

::: info INFORMATION
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) は、Permawebアプリケーションエコシステムとのコンポーザビリティを可能にするための資産発見仕様です。
:::

## まとめ

これはアトミックアセットをデプロイするシンプルな例です。より詳細な例については、[https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)をチェックしてください。

## トークンの操作

SmartWeaveコントラクトは、ArweaveネットワークのネイティブコインであるARを保持することができません。ARは、Arweaveネットワーク上のデータのストレージを購入するために使用され、ソースウォレットからターゲットウォレットに転送することができますが、SmartWeaveコントラクト内に保持することはできません。