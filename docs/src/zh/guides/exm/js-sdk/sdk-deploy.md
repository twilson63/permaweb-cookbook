---
locale: zh
---
# 使用 Execution Machine SDK 部署无服务器函数

对于使用 JavaScript 中的 SDK 部署无服务器函数(serverless function)，我们在这里创建一个脚本，告诉计算机如何将我们的函数部署到网络上。

<details>
<summary><strong>函数逻辑示例</strong></summary>

在安装了我们需要的包之后，我们需要一个在项目中定义函数逻辑的文件。

<CodeGroup>
  <CodeGroupItem title="function.js">

```js
export async function handle(state, action) {
    state.counter++;
    return { state };
}
```

  </CodeGroupItem>
</CodeGroup>

定义函数的语法基于 SmartWeave 在 JavaScript 中为智能合约实现的标准。每个函数都有一个 `state`，它是一个 JSON 对象，其中存储了值，并且有 `actions` 用于与这些值进行交互。

上述函数向一个用户数组中添加名称，可以使用以下代码完成：

```js
state.users.push(action.input.name);
```

在部署函数时，我们初始化了一个空数组，命名为 `users`，它在读取和写入调用期间帮助函数来识别此状态变量（函数状态中存储的变量）。在初始化时，`state` 如下所示：

```js
{ users: [] }
```

此外，在向函数写入时，我们使用名为 `name` 的键来帮助函数识别我们正在输入的值。在处理多个值时，这两个定义变得更为重要。
</details>
<br/>

一旦函数逻辑被定义且 API 令牌被正确设置，如[此处](../api.md)所示，创建部署文件的步骤如下：

<CodeGroup>
  <CodeGroupItem title="deploy.js">

```js
import { Exm, ContractType } from '@execution-machine/sdk';
import { readFileSync, writeFileSync } from 'fs';

// 初始化新的 EXM 实例
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// 获取函数源代码
const functionSource = readFileSync('function.js');

// .deploy(source, initState, contractType)
const data = await exm.functions.deploy(functionSource, { users: [] }, ContractType.JS);

// 将函数 ID 写入本地文件
writeFileSync('./functionId.js', `export const functionId = "${data.id}"`)
```

  </CodeGroupItem>
</CodeGroup>

在部署时，我们需要传入函数逻辑、函数的初始状态和函数定义的编程语言作为参数。要进行部署，请在项目相应目录的命令行中运行以下命令：

```bash
node deploy.js
```

在部署完成后，我们会收到一些数据，其中我们将函数的 `functionId` 存储在本地文件中。正如其名称所示，`functionId` 是一个用于进一步与无服务器函数进行交互（例如读取和写入操作）的唯一标识符。

以下各节介绍了使用 EXM 函数进行读取和写入的过程。