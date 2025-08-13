---
locale: zh
---
# 使用 Execution Machine SDK 向无服务器函数写入数据

一旦函数部署完成，就可以通过写入操作来更新其状态。由于EXM无服务器函数的独特架构，更新状态的逻辑与状态本身存储在一起，并且可以使用相同的`functionId`进行引用。根据应用程序的需求，函数可以有单个操作或多个操作来更新状态，写入调用的参数也相应不同。

<details>
<summary><strong>函数逻辑及对应的写入示例</strong></summary>

- <strong>仅有单个操作用于更新状态的函数示例:</strong>

以下函数将名称添加到用户数组中：

```js
export async function handle(state, action) {
    state.users.push(action.input.name);
    return { state };
}
```

通过以下行来更新状态：

```js
state.users.push(action.input.name);
```

在这种情况下，写入调用只需要一个`name`键值对作为输入：

```js
const inputs = [{ name: '开源之星' }];
```

- <strong>具有多个操作用于更新状态的函数示例:</strong>

以下函数创建帖子并具有更新或删除这些帖子的能力：

```js
export async function handle(state, action) {
  const { input } = action
  if (input.type === 'createPost' || input.type === 'updatePost') {
    state.posts[input.post.id] = input.post
  }
  if (input.type === 'deletePost') {
    delete state.posts[input.postId]
  }
  return { state }
}
```

帖子是具有以下格式的对象：

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

我们为每个帖子分配了唯一的`id`，以便我们可以引用它以进行更新或删除。如果没有相应的`id`存在，则创建一个新的帖子。

然而，如上所示的函数逻辑具有执行多个操作的能力，因此为每个操作的`type`都赋予了一个名称。此名称必须作为输入之一传递，并与帖子或id一起用于执行适当的写入调用。要更新帖子，写入调用的输入如下所示：

```js
const inputs = [{
  type: 'updatePost',
  post: {
    id,
    title: "我的帖子",
    content: "我的更新后的帖子",
    author: "开源之星"
  }
}];
```
</details>
<br/>

写入事务需要两个参数。要与之交互的函数的`functionId`以及函数需要处理写入请求和更新状态的任何`inputs`。

<CodeGroup>
  <CodeGroupItem title="write.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// 初始化新的EXM实例
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// inputs是一个对象数组
const inputs = [{ name: '开源之星' }];

// 从缓存层读取
const writeResult = await exm.functions.write(functionId, inputs);
console.log(writeResult);
```

  </CodeGroupItem>
</CodeGroup>

成功的写入请求将返回一个带有状态为SUCCESS的对象。

```bash
{
  status: 'SUCCESS',
  data: {
    pseudoId: 'txnId',
    execution: {
      state: [Object],
      result: null,
      validity: [Object],
      exmContext: [Object],
      updated: false
    }
  }
}
```