---
locale: zh
---

# Github 操作

::: danger
本指南仅用于教育目的，您应使用它来了解您可能希望部署应用程序的选项。在本指南中，我们信任由` microsoft` 拥有的第三方资源` github` 来保护我们的密钥信息，在他们的文档中，他们使用` libsodium sealed box` 在其存储中对密钥进行加密，您可以在此处找到有关其安全实践的更多信息。https://docs.github.com/en/actions/security-guides/encrypted-secrets
:::

Github Actions 是 CI/CD 流水线，允许开发人员通过生成的来自 github 工作流系统的事件触发自动化任务。这些任务可以是任何事情，在本指南中，我们将展示如何使用 github 操作将您的永久网络应用程序部署到永久网络，使用 Irys 和 ArNS。

::: tip
本指南需要理解 github 操作，并且您必须拥有一些 ArNS 测试代币，请访问https://ar.io/arns/获取更多详细信息。
:::

::: warning
本指南不包括测试或您可能希望添加到生产工作流的任何其他检查。
:::

## 创建部署脚本

部署脚本是执行部署应用程序的重要脚本，我们将使用`@irys/sdk`和`warp-contracts`来发布我们的应用程序，并在 ArNS 上注册新发布的应用程序。

安装部署依赖项

```console
npm install --save-dev @irys/sdk
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

创建`deploy.mjs`文件

```js
import Irys from '@irys/sdk'
import { WarpFactory, defaultCacheOptions } from 'warp-contracts'
import Arweave from 'arweave'

const ANT = '[YOUR ANT CONTRACT]'
const DEPLOY_FOLDER = './dist'
const IRYS_NODE = 'https://node2.irys.xyz'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, 'base64').toString('utf-8'))

const irys = new Irys({ IRYS_NODE, 'arweave', jwk })
const warp = WarpFactory.custom(
  arweave,
  defaultCacheOptions,
  'mainnet'
).useArweaveGateway().build()

const contract = warp.contract(ANT).connect(jwk)
// 上传文件夹
const result = await irys.uploadFolder(DEPLOY_FOLDER, {
  indexFile: 'index.html'
})


// 更新ANT
await contract.writeInteraction({
  function: 'setRecord',
  subDomain: '@',
  transactionId: result.id
})

console.log('已部署的食谱，请等待20-30分钟以进行ArNS更新！')
```

## 将脚本添加到 package.json

创建一个名为`deploy`的新脚本属性，在值部署属性的脚本中调用构建脚本，然后调用`node deploy.mjs`。

package.json

```json
  ...
  "scripts": {
    "dev": "vitepress dev src",
    "build": "vitepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```

## 创建 GitHub 操作

在`.github/workflows`文件夹中创建一个`deploy.yml`文件，此文件告诉 GitHub Actions，在`main`分支上触发推送事件时进行部署。

```yml
name: publish

on:
    push:
        branches:
            - "main"

jobs:
    publish:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v1
              with:
                  node-version: 18.x
            - run: yarn
            - run: yarn deploy
              env:
                  KEY: ${{ secrets.PERMAWEB_KEY }}
```

## 总结

在项目存储库中，转到设置和密钥，添加一个名为 PERMAWEB_KEY 的新密钥到存储库，此项目的密钥值应是部署钱包的 base64 编码字符串。

```console
base64 -i wallet.json | pbcopy
```

为了使此部署工作，您需要为此钱包的 Irys 账户提供资金，请确保钱包中有一些$AR，不要太多，也许0.5个$AR，然后使用 Irys cli 进行资金注入。

```console
irys fund 250000000000 -h https://node2.irys.xyz -w wallet.json -t arweave
```

::: warning
保持钱包的资金较低，仅用于此项目。
:::

:tada: 您已设置了一个完全自动化的 github 操作，用于部署到永久网络！
