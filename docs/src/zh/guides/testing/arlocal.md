---
locale: zh
---
# arlocal（本地化）
`arlocal`是一种用于快速设置和运行本地Arweave测试环境的工具。它允许您在Arweave类似网关的服务器上测试交易。开发人员可以在模拟环境中测试其应用程序，然后再将其部署到Arweave网络上。

使用该工具无需$AR代币，并且交易是即时的。

## 命令行界面（CLI）
在使用arlocal命令行界面之前，您的计算机上必须安装Node.js和npm

要启动本地网关，请运行`npx arlocal`

::: 提示
您可以通过将您的端口作为参数传递来指定在哪个端口运行这个微型网关
`npx arlocal 8080`
:::

如果要隐藏日志，请在运行网关时添加`--hidelogs`标志
`npx arlocal --hidelogs`

## Node
通过运行以下命令将该程序包作为开发环境的依赖项进行安装
`yarn add arlocal -D` 或者 `npm install arlocal --save-dev`

```js
import ArLocal from 'arlocal';

(async () => {
  const arLocal = new ArLocal();

  // 创建本地测试环境
  await arLocal.start();

  // 在这里进行测试

  // 关闭测试环境
  await arLocal.stop();
})();
```

可以使用选项创建一个`ArLocal`实例
| 选项 | 描述 |
| ---- | ----------- |
| port | 使用的端口 |
| showLogs | 显示日志 |
| dbPath | 临时数据库的目录  |
| persist | 在服务器重启时候保持数据持久化

### 示例
要使此示例工作，代码需要使用生成的测试钱包。为此，项目中必须安装`arweave`包以及`arlocal`

`yarn add arweave arlocal -D` 或者 `npm install --save-dev arweave arlocal`

下面是一个基本的JavaScript测试，用于使用arlocal创建数据交易并将其发布到Arweave：

```js
import ArLocal from 'arlocal'
import Arweave from 'arweave'

test('test transaction', async () => {
    // 创建并启动ArLocal实例
    const arLocal = new ArLocal()
    await arLocal.start()
    // 创建本地Arweave网关
    const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
  })
  // 生成钱包
  const wallet = await arweave.wallets.generate()
  // 将一定数量的代币（以微托为单位）空投到钱包中
  await arweave.api.get(`mint/${addr}/10000000000000000`)
  // 创建mine函数
  const mine = () => arweave.api.get('mine')
  try {
    // 创建交易
    let transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, wallet);
    // 签署并发布交易
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // 挖矿交易
    await mine()
    // 测试响应结果
  } catch(err) {
    console.error('ERROR: ', err.message)
  }
  // 关闭测试环境
  await arLocal.stop()
})
```

::: 警告
L1交易的测试结果可能与L2交易不同
:::

## 资源
[arlocal文档](https://github.com/textury/arlocal)