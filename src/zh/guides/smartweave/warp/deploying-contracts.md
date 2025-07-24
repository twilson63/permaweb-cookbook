---
locale: zh
---

# Warp（SmartWeave）SDK - 部署合约

SmartWeave 合约是通过向网络上发布两个交易来创建的，一个是源交易，一个是初始状态交易，源交易包含合约将用于确定当前状态的源代码。初始状态交易提供了一个合约标识符用于引用，并提供了合约应使用的初始种子数据作为评估当前状态的起点。当前状态通过访问作为已写入网络的包含输入参数以使用评估和实例化的源代码的事务的操作来计算。可以使用多种不同的语言创建 Warp 合约，并可以使用 Warp SDK 进行评估。本指南将展示您可以部署 Warp 合约的许多不同方法。

::: 提示
如果您想了解有关撰写 Warp SmartWeaveContracts 的更多信息，请查看 Warp Academy！[https://academy.warp.cc/](https://academy.warp.cc/)
:::

从 Warp 版本 1.3.0 开始，您将需要使用 Warp 部署插件来部署合约。此插件将使您能够添加不同的钱包签名。

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

## 通过四种方式部署 Warp SmartWeave 合约

通过 Warp SDK，您可以通过以下 4 种方式部署 SmartWeaveContract，这些选项处理开发人员可能遇到的不同用例。

-   需要同时部署具有相同源代码的合约
-   需要部署源代码已经在 permaweb 上的合约
-   需要通过序列器部署合约并使用路径清单将其指向某些数据
-   需要通过 Irys 部署合约并在序列器上注册该合约

::: 提示
有关 Warp 部署的更多信息，请查看项目的 github 自述文件。[https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment)。
:::

::: 警告
该项目正在快速发展，因此这里的文档可能会很快过时，如果您发现过时了，请在[Permaweb Cookbook Discord 频道](https://discord.gg/haCAX3shxF)上告诉我们。
:::

## 示例

::: 提示
默认情况下，所有部署函数都通过 Irys 发布到 Arweave，每个选项都有一个标志，可以设置为不使用 Irys，但可能需要多次确认才能完全确认交易。
:::

**部署**

将合约和源代码部署到 Warp Sequencer，到 Irys（L2），到 Arweave。

```ts
const { contractTxId, srcTxId } = await warp.deploy({
	wallet,
	initState,
	data: { "Content-Type": "text/html", body: "<h1>Hello World</h1>" },
	src: contractSrc,
	tags: [{ name: "AppName", value: "HelloWorld" }],
});
```

-   wallet - 应该是 Arweave keyfile（wallet.json），解析为实现[JWK 接口](https://rfc-editor.org/rfc/rfc7517)的 JSON 对象或字符串'use_wallet'
-   initState - 是一个字符串化的 JSON 对象
-   data -如果你想将数据作为部署的一部分编写，这是可选的
-   src - 是合约的源代码的字符串或 Uint8Array 值
-   tags - 是一个包含名称/值对象`{name: string, value: string}[]`的数组，[了解更多关于标签的信息](../../../concepts/tags.md)

**deployFromSourceTx**

已经在 permaweb 上有源代码了吗？那么 deployFromSourceTx 就是您的选择！有了 permaweb，您永远不必担心数据的变化，因此可以无脑地重用合约的源代码。

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
	wallet,
	initState,
	srcTxId: "SRC_TX_ID",
});
```

**deployBundled**

使用 Warp Gateway Sequencer 的端点将原始数据项上传到 Irys 并对其进行索引。

```ts
import { createData } from "arbundles";

const dataItem = createData(
	JSON.stringify({
		manifest: "arweave/paths",
		version: "0.1.0",
		index: {
			path: "index.html",
		},
		paths: {
			"index.html": {
				id: "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI",
			},
		},
	}),
	{ tags: [{ "Content-Type": "application/x.arweave-manifest+json" }] },
);
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```

**register**

使用 Warp Gateway Sequencer 的端点来索引已使用 Irys 上传的合约。

```ts
import Irys from '@irys/sdk'

const irys = new Irys({ 'https://node2.irys.xyz', 'arweave', wallet })
const { id } = await irys.upload('Some Awesome Atomic Asset',  {
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2')
```

## 总结

为什么部署合约有这么多选择？这些方法的存在是为了减少重复，实现高级合约交互，并允许灵活地测试和使用 smartweave 协议。 permaweb 的架构非常独特，它提供了一个功能，您可以部署数字数据和合约来管理生成相同交易标识符的数据。结果是动态数据与一组不可变的数据配对。部署合约只是 Warp SDK 的一部分，要了解更多信息，请继续阅读本指南！
