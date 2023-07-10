---
locale: jp
---
# 実行マシンSDKを使用してサーバーレス関数をデプロイする

JavaScriptのSDKを使用してサーバーレス関数をデプロイするために、ここではコンピュータに対して関数をネットワークにデプロイする方法を示すスクリプトを作成します。

<details>
<summary><strong>関数のロジックの例</strong></summary>

パッケージをインストールした後、プロジェクト内で関数のロジックを定義するファイルが必要です。

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

関数の定義の構文は、JavaScriptにおけるスマートコントラクトの実装によって実装された標準に基づいています。すべての関数には`state`というJSONオブジェクトがあり、これには関数内に保存される値が含まれています。また、これらの値とのやりとりには`action`が使用されます。

上記の関数では、以下の行を使用してユーザーの配列に名前を追加します。

```js
state.users.push(action.input.name);
```

関数のデプロイ時には、後で関数がこの状態変数（関数の状態に保存される変数）を識別するのに役立つ空の`users`という配列を初期化します。初期化時の`state`は次のようになります。

```js
{ users: [] }
```

さらに、関数への書き込み時には、`name`というキーを使用してデータの値を特定するのに役立ちます。これらの定義は、複数の値を扱う場合にさらなる重要性を持ちます。
</details>
<br/>

関数のロジックが定義され、APIトークンが[ここ](../api.md)に示されているように適切に設定されていると、以下のようにしてデプロイファイルを作成します。

<CodeGroup>
  <CodeGroupItem title="deploy.js">

```js
import { Exm, ContractType } from '@execution-machine/sdk';
import { readFileSync, writeFileSync } from 'fs';

// 新しいEXMインスタンスの初期化
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// 関数のソースを取得
const functionSource = readFileSync('function.js');

// .deploy(source, initState, contractType)
const data = await exm.functions.deploy(functionSource, { users: [] }, ContractType.JS);

// 関数IDをローカルファイルに書き込む
writeFileSync('./functionId.js', `export const functionId = "${data.id}"`)
```

  </CodeGroupItem>
</CodeGroup>

デプロイ時には、関数のロジック、関数の初期状態、関数定義のプログラミング言語を引数として渡す必要があります。デプロイするには、プロジェクトの適切なディレクトリ内で以下のコマンドをコマンドラインで実行します。

```bash
node deploy.js
```

デプロイ後、`functionId`をローカルファイルに保存するためのデータが得られます。`functionId`はその名前が示すように、読み取りや書き込みなどのサーバーレス関数とのさらなるやり取りに役立つ一意の識別子です。

以下のセクションでは、EXM関数を使用して読み取りと書き込みのプロセスを説明します。