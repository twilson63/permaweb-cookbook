---
locale: zh
---

# 原子代币

## 什么是原子代币？

[查看概念](../../concepts/atomic-tokens.md)

## 创建原子代币

::: info 信息
在这个示例中，我们使用的是已经在网络上发布的 SWT 合约源代码。[x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs](https://sonar.warp.cc/#/app/source/x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs#) -
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
    // ANS-110 标签
    { name: 'Type', value: 'web-page' },
    { name: 'Title', value: '我的第一个永久网页' },
    { name: 'Description', value: 'Anon 的第一个永久网页' },
    { name: 'Topic:Noob', value: '初学者' },
    // SmartWeave 合约
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
  console.log('原子代币：', id)
}

main()
```

在这个示例中，我们创建了一个数据项并上传到 bundler 网络服务。然后我们使用 Warp Sequencer 注册了我们的合约。通过使用 bundler 发布我们的数据项并注册 Warp Sequencer，我们的数据立即可在 gateway 服务上使用，我们的合约立即可以接受交互。

运行示例

```sh
npm install @irys/sdk warp-contracts
npm install typescript ts-node
npx ts-node example.ts
```

::: info 信息
[ANS-110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) 是一种资产发现规范，用于与 Permaweb 应用生态系统实现组合性。
:::

## 概要

这是一个部署原子资产的简单示例，想了解更详细的示例，请查看：[https://atomic-assets.arweave.dev](https://atomic-assets.arweave.dev)

## 与代币一起使用

SmartWeave 合约无法持有 Arweave 网络的本机代币 AR。AR 用于在 Arweave 网络上购买数据存储空间，并且可以在 Arweave 网络上的源钱包和目标钱包之间转移，但无法在 SmartWeave 合约中持有。
