---
locale: zh
---
# Github操作

::: danger
本指南仅用于教育目的，您应使用它来了解您可能希望部署应用程序的选项。在本指南中，我们信任由` microsoft` 拥有的第三方资源` github` 来保护我们的秘密信息，在他们的文档中，他们使用` libsodium sealed box` 在其存储中对秘密进行加密，您可以在此处找到有关其安全实践的更多信息。https://docs.github.com/en/actions/security-guides/encrypted-secrets 
:::

Github Actions是CI/CD流水线，允许开发人员通过生成的来自github工作流系统的事件触发自动化任务。这些任务可以是任何事情，在本指南中，我们将展示如何使用github操作将您的永久网络应用程序部署到永久网络，使用bundlr和ArNS。

::: tip
本指南需要理解github操作，并且您必须拥有一些ArNS测试代币，请访问https://ar.io/arns/获取更多详细信息。
:::

::: warning
本指南不包括测试或您可能希望添加到生产工作流的任何其他检查。
:::

## 创建部署脚本

部署脚本是执行部署应用程序的重要脚本，我们将使用`@bundlr-network/client`和`warp-contracts`来发布我们的应用程序，并在ArNS上注册新发布的应用程序。

安装部署依赖项

```console
npm install --save-dev @bundlr-network/client
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

创建`deploy.mjs`文件

```js
import Bundlr from '@bundlr-network/client'
import { WarpFactory, defaultCacheOptions } from 'warp-contracts'
import Arweave from 'arweave'

const ANT = '[YOUR ANT CONTRACT]'
const DEPLOY_FOLDER = './dist'
const BUNDLR_NODE = 'https://node2.bundlr.network'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, 'base64').toString('utf-8'))

const bundlr = new Bundlr.default(BUNDLR_NODE, 'arweave', jwk)
const warp = WarpFactory.custom(
  arweave,
  defaultCacheOptions,
  'mainnet'
).useArweaveGateway().build()

const contract = warp.contract(ANT).connect(jwk)
// 上传文件夹
const result = await bundlr.uploadFolder(DEPLOY_FOLDER, {
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

## 将脚本添加到package.json

创建一个名为`deploy`的新脚本属性，在值部署属性的脚本中调用构建脚本，然后调用`node deploy.mjs`。

package.json

```json
  ...
  "scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```

## 创建GitHub操作

在`.github/workflows`文件夹中创建一个`deploy.yml`文件，此文件告诉GitHub Actions，在`main`分支上触发推送事件时进行部署。

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

在项目存储库中，转到设置和秘密，添加一个名为PERMAWEB_KEY的新秘密到存储库，此项目的秘密值应是部署钱包的base64编码字符串。

```console
base64 -i wallet.json | pbcopy
```

为了使此部署工作，您需要为此钱包的bundlr账户提供资金，请确保钱包中有一些$AR，不要太多，也许0.5个$AR，然后使用bundlr cli进行资金注入。

```console
npx bundlr 250000000000 -h https://node2.bundlr.network -w wallet.json -c arweave
```

::: warning
保持钱包的资金较低，仅用于此项目。
:::

:tada: 您已设置了一个完全自动化的github操作，用于部署到永久网络！