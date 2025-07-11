---
locale: zh
---
# 通过 Execution Machine SDK 从无服务函数中读取

有两种方法可以从 EXM（Execution Machine）无服务函数(serverless function)中读取状态。如在 [介绍](../intro.md#serverless-functions-on-arweave) 中所述，EXM 将函数存储在缓存层以便快速提供应用程序，但也将函数上传到 Arweave 以维护分散性及其相关的优势。因此，函数状态可以从 EXM 的缓存层或直接从 Arweave 中读取。

1. 从 EXM 的缓存层读取：

read 调用读取作为存储在 EXM 缓存层上的最新状态。该层专为快速提供应用程序而设计。它采用乐观的方法，并在接收到事务请求后立即更新函数状态。

<CodeGroup>
  <CodeGroupItem title="read.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// 初始化 EXM 实例
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// 从缓存层读取
const readResult = await exm.functions.read(functionId);
console.log(readResult);
```

  </CodeGroupItem>
</CodeGroup>

2. 直接从 Arweave 中读取（评估）：

evaluate 调用返回成功在 Arweave 上处理的最新状态。这个最新状态是通过[惰性评估](../intro.md#how-does-it-work-in-the-background)计算得出的，它按照事件发生的顺序评估初始状态和与函数的交互，以达到最新状态。

<CodeGroup>
  <CodeGroupItem title="evaluate.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// 初始化 EXM 实例
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// 从 Arweave 中评估
const evalResult = await exm.functions.evaluate(functionId);
console.log(evalResult);
```

  </CodeGroupItem>
</CodeGroup>

::: tip
仅推荐从 Arweave 中进行验证目的的读取。可以将 evaluate 调用返回的函数状态与缓存层返回的信息进行对比，以确保其真实性。在发布事务请求和在网络上进行更新之间可能存在轻微延迟。
:::