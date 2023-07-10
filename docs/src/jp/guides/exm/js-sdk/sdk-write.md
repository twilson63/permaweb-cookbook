---
locale: jp
---
# サーバーレス関数の書き込みを実行マシンSDKで処理する

関数がデプロイされると、書き込み操作のヘルプを使用してその状態を更新することができます。EXMのサーバーレス関数の固有のアーキテクチャにより、状態の更新ロジックは状態自体と一緒に格納され、これらは同じ `functionId` を使用して参照することができます。関数は、アプリケーションの要件と書き込み呼び出しの引数に応じて、単一の操作または複数の操作を持つことができます。

<details>
<summary><strong>関数のロジックと対応する書き込みの例</strong></summary>

- <strong>状態の更新に単一の操作を持つ関数の例:</strong>

次の関数は、ユーザーの配列に名前を追加します：

```js
export async function handle(state, action) {
    state.users.push(action.input.name);
    return { state };
}
```

状態は次の行で更新されます：

```js
state.users.push(action.input.name);
```

この場合、書き込み呼び出しには、`name` のキーと値のペアだけが必要です：

```js
const inputs = [{ name: 'Open Sourcerer' }];
```

- <strong>状態の更新に複数の操作を持つ関数の例:</strong>

次の関数は、投稿を作成するだけでなく、これらの投稿を更新または削除する機能も持っています：

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

投稿は以下の形式のオブジェクトです：

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

各投稿には一意の `id` を付けて、更新または削除に参照することができるようにしています。対応する `id` が存在しない場合は、代わりに新しい投稿が作成されます。

ただし、上記の関数ロジックでは複数の操作を実行することができるため、各操作のために `type` に名前が付けられています。この名前は、適切な書き込み呼び出しを実行するために、投稿または id と共に入力として渡す必要があります。投稿を更新するためには、書き込み呼び出しの入力は次のようになります：

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

書き込みトランザクションには2つの引数が必要です。関数と対話するための関数の `functionId` と、書き込みリクエストを処理して状態を更新するために関数が必要とする `inputs` です。

<CodeGroup>
  <CodeGroupItem title="write.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// 新しいEXMインスタンスを初期化
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// inputsはオブジェクトの配列です
const inputs = [{ name: 'Open Sourcerer' }];

// キャッシュされたレイヤーから読み取り
const writeResult = await exm.functions.write(functionId, inputs);
console.log(writeResult);
```

  </CodeGroupItem>
</CodeGroup>

書き込みリクエストが成功すると、SUCCESSというステータスのオブジェクトが返されます。

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