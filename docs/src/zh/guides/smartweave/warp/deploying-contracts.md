---
locale: zh
---
# Warp（SmartWeave）SDK - 部署合约

SmartWeave合约是通过向网络上发布两个交易来创建的，一个是源交易，一个是初始状态交易，源交易包含合约将用于确定当前状态的源代码。初始状态交易提供了一个合约标识符用于引用，并提供了合约应使用的初始种子数据作为评估当前状态的起点。当前状态通过访问作为已写入网络的包含输入参数以使用评估和实例化的源代码的事务的操作来计算。可以使用多种不同的语言创建Warp合约，并可以使用Warp SDK进行评估。本指南将展示您可以部署Warp合约的许多不同方法。

::: 提示
如果您想了解有关撰写Warp SmartWeaveContracts的更多信息，请查看Warp Academy！[https://academy.warp.cc/](https://academy.warp.cc/)
:::

从Warp版本1.3.0开始，您将需要使用Warp部署插件来部署合约。此插件将使您能够添加不同的钱包签名。

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

function deploy(initState, src) {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE']);
  }
  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  return warp.deploy({
    wallet: userSigner,
    src,
    initState: JSON.stringify(initState)
  })
}
```


## 通过四种方式部署Warp SmartWeave合约

通过Warp SDK，您可以通过以下4种方式部署SmartWeaveContract，这些选项处理开发人员可能遇到的不同用例。

* 需要同时部署具有相同源代码的合约
* 需要部署源代码已经在permaweb上的合约
* 需要通过序列器部署合约并使用路径清单将其指向某些数据
* 需要通过Bundlr部署合约并在序列器上注册该合约

::: 提示
有关Warp部署的更多信息，请查看项目的github自述文件。[https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment)。
:::

::: 警告
该项目正在快速发展，因此这里的文档可能会很快过时，如果您发现过时了，请在[Permaweb Cookbook Discord 频道](https://discord.gg/haCAX3shxF)上告诉我们。
:::

## 示例

::: 提示
默认情况下，所有部署函数都通过Bundlr-Network发布到Arweave，每个选项都有一个标志，可以设置为不使用Bundlr，但可能需要多次确认才能完全确认交易。
:::

**部署**

将合约和源代码部署到Warp Sequencer，到Bundlr（L2），到Arweave。

```ts
const { contractTxId, srcTxId } = await warp.deploy({
  wallet,
  initState,
  data: { 'Content-Type': 'text/html', body: '<h1>Hello World</h1>' },
  src: contractSrc,
  tags: [{ "name": "AppName", "value": "HelloWorld" }],
})
```

* wallet - 应该是Arweave keyfile（wallet.json），解析为实现[JWK接口](https://rfc-editor.org/rfc/rfc7517)的JSON对象或字符串'use_wallet'
* initState - 是一个字符串化的JSON对象
* data -如果你想将数据作为部署的一部分编写，这是可选的
* src - 是合约的源代码的字符串或Uint8Array值
* tags - 是一个包含名称/值对象`{name: string, value: string}[]`的数组，[了解更多关于标签的信息](../../../concepts/tags.md)

**deployFromSourceTx**

已经在permaweb上有源代码了吗？那么deployFromSourceTx就是您的选择！有了permaweb，您永远不必担心数据的变化，因此可以无脑地重用合约的源代码。

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
  wallet,
  initState,
  srcTxId: 'SRC_TX_ID'
})
```

**deployBundled**

使用Warp Gateway Sequencer的端点将原始数据项上传到Bundlr并对其进行索引。

```ts
import { createData } from 'arbundles'

const dataItem = createData(
  JSON.stringify({
    "manifest": "arweave/paths",
    "version": "0.1.0",
    "index": {
      "path": "index.html"
    },
    "paths": {
      "index.html": {
        "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
      }
    }
  })
  , { tags: [{'Content-Type': 'application/x.arweave-manifest+json' }]})
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```


**register**

使用Warp Gateway Sequencer的端点来索引已使用Bundlr上传的合约。

```ts
import Bundlr from '@bundlr-network/client'

const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', wallet)
const { id } = await bundlr.upload('Some Awesome Atomic Asset',  { 
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2') 
```

## 总结

为什么有这么多部署合约的选项？这些方法的存在是为了减少重复，实现高级合约交互，并允许对智能契约协议进行测试和使用的灵活性。permaweb在其架构中非常独特，它提供了一个功能，在此功能中，您可以部署数字数据和用于管理该数据的合约生成相同的事务标识符。结果是由动态数据和不可变数据集一起配对。部署合约只是Warp SDK的一部分，要了解更多信息，请继续阅读本指南！