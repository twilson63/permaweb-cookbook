# arlocal

`arlocal` 是一个用于快速建立和运行本地 Arweave 测试环境的工具。它允许您在类似 Arweave 网关的服务器上测试交易，让开发者能在部署到 Arweave 网络之前于模拟环境中测试应用程序。

使用时不需要 $AR 代币，且交易为即时完成。

## CLI

您必须在机器上安装 node 与 npm 才能使用 arlocal CLI

要启动本地网关，运行 `npx arlocal`

::: tip
您可以通过传递端口号作为参数来指定精简网关要运行的端口
`npx arlocal 8080`
:::

若要隐藏日志，启动网关时加入标志 `--hidelogs`
`npx arlocal --hidelogs`

## Node

将此包作为开发依赖安装，运行
`yarn add arlocal -D` 或 `npm install arlocal --save-dev`

```js
import ArLocal from "arlocal";

(async () => {
  const arLocal = new ArLocal();

  // 创建本地测试环境
  await arLocal.start();

  // 在此处编写您的测试

  // 关闭测试环境
  await arLocal.stop();
})();
```

可以使用选项建立 `ArLocal` 实例
| Option | Description |
| ---- | ----------- |
| port | 使用的端口 |
| showLogs | 是否显示日志 |
| dbPath | 临时数据库的目录 |
| persist | 在服务器重启间保留数据 |

### 示例

此示例要运行，程序需使用生成的测试钱包。为此，项目必须同时安装 `arweave` 与 `arlocal` 包

`yarn add arweave arlocal -D` 或 `npm install --save-dev arweave arlocal`

下面是一个使用 arlocal 在 Arweave 上创建数据交易并发布的基础 JavaScript 测试示例：

```js
import ArLocal from "arlocal";
import Arweave from "arweave";

test("test transaction", async () => {
  // create and start ArLocal instance
  const arLocal = new ArLocal();
  await arLocal.start();
  // create local Arweave gateway
  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  });
  // generate wallet
  const wallet = await arweave.wallets.generate();
  // airdrop amount of tokens (in winston) to wallet
  await arweave.api.get(`mint/${addr}/10000000000000000`);
  // create mine function
  const mine = () => arweave.api.get("mine");
  try {
    // create transaction
    let transaction = await arweave.createTransaction(
      {
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
      },
      wallet
    );
    // sign and post transaction
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // mine transaction
    await mine();
    // test the response
  } catch (err) {
    console.error("错误：", err.message);
  }
  // tear down testing environment
  await arLocal.stop();
});
```

::: warning
来自 L1 交易的测试结果可能与 L2 交易不同
:::

## 资源

[arlocal 文档](https://github.com/textury/arlocal)
