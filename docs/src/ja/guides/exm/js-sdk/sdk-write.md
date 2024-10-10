---
locale: ja
---
# Execution Machine SDKを使用したサーバーレス関数への書き込み

関数がデプロイされると、その状態は書き込みインタラクションを使って更新できます。EXMのサーバーレス関数のユニークなアーキテクチャにより、状態を更新するためのロジックは状態自体と共に保存され、これらは同じ `functionId` を使用して参照できます。関数は、アプリケーションの要件に応じて状態を更新するための単一の操作または複数の操作を持つことができ、書き込み呼び出しの引数はそれに応じて変わります。


<details>
<summary><strong>関数ロジックと対応する書き込み例</strong></summary>

- <strong>状態を更新するための単一の操作を持つ関数の例:</strong>

以下の関数は、ユーザーの配列に名前を追加します。

```js
export async function handle(state, action) {
    state.users.push(action.input.name);
    return { state };
}
```

The state is updated by the following line:

```js
state.users.push(action.input.name);
```

In this case, the write call only needs a key-value pair of `name` as an input:

```js
const inputs = [{ name: 'Open Sourcerer' }];
```

- <strong>状態を更新するための複数の操作を持つ関数の例:</strong>

以下の関数は投稿を作成しますが、これらの投稿を更新または削除する機能もあります。

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

投稿は次のフォーマットのオブジェクトです:

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

各投稿に一意の `id` を付与して、更新または削除する際に参照できるようにします。対応する `id` が存在しない場合は、代わりに新しい投稿が作成されます。

ただし、上記の関数に見られるように、この関数ロジックは複数の操作を実行する能力を持っており、したがって、各操作に名前が付けられています。この名前は、適切な書き込み呼び出しを実行するために、投稿またはIDと共に入力として渡す必要があります。投稿を更新する場合、書き込み呼び出しの入力は次のようになります:

```js
const inputs = [{
  type: 'updatePost',
  post: {
    id,
    title: "My Post",
    content: "My updated post",
    author: "Open Sourcerer"
  }
}];
```
</details>
<br/>

書き込みトランザクションは、相互作用する関数の `functionId` と、書き込みリクエストを処理し状態を更新するために必要な `inputs` の2つの引数を取ります。

<CodeGroup>
  <CodeGroupItem title="write.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// inputs is an array of objects
const inputs = [{ name: 'Open Sourcerer' }];

// read from cached layer
const writeResult = await exm.functions.write(functionId, inputs);
console.log(writeResult);
```

  </CodeGroupItem>
</CodeGroup>

成功した書き込みリクエストは、ステータスが SUCCESS のオブジェクトを返します。

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