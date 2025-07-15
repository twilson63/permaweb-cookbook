---
locale: ja
---
# Execution Machine SDKを使用したサーバーレス関数のデプロイ

JavaScriptでSDKを使用してサーバーレス関数をデプロイするために、ネットワークに関数をデプロイする方法をコンピュータに指示するスクリプトを作成します。

<details>
<summary><strong>関数ロジックの例</strong></summary>

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

関数を定義するための構文は、JavaScriptのスマートコントラクトに対してSmartWeaveによって実装された標準に基づいています。各関数には、格納されている値のJSONオブジェクトである `state` があり、これらの値と相互作用するための `actions` があります。

上記の関数は、ユーザーの配列に名前を追加するもので、次の行を使用しています:

```js
state.users.push(action.input.name);
```

関数をデプロイする際には、`users` という空の配列を初期化します。これにより、関数が読み取りおよび書き込み呼び出し中にこの状態変数（関数の状態に格納されている変数）を識別するのに役立ちます。初期化時の `state` は次のようになります:

```js
{ users: [] }
```

さらに、関数に書き込む際には、`name` というキーを使用して、書き込み操作に供給している値を識別します。これらの定義は、複数の値を扱う場合にさらに重要になります。
</details>
<br/>

関数のロジックが定義され、APIトークンが正しく設定されたら、以下のようにデプロイファイルを作成します:

<CodeGroup>
  <CodeGroupItem title="deploy.js">

```js
import { Exm, ContractType } from '@execution-machine/sdk';
import { readFileSync, writeFileSync } from 'fs';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// fetch function source
const functionSource = readFileSync('function.js');

// .deploy(source, initState, contractType)
const data = await exm.functions.deploy(functionSource, { users: [] }, ContractType.JS);

// write the function id to a local file
writeFileSync('./functionId.js', `export const functionId = "${data.id}"`)
```

  </CodeGroupItem>
</CodeGroup>

デプロイする際には、関数ロジック、関数の初期状態、および関数定義のプログラミング言語を引数として渡す必要があります。デプロイするには、プロジェクトの適切なディレクトリ内で次のコマンドを実行します:

```bash
node deploy.js
```

デプロイ後、いくつかのデータが返され、その中から `functionId` をローカルファイルに保存します。`functionId` は、その名の通り、サーバーレス関数との読み取りや書き込み操作などのさらなる相互作用を助ける一意の識別子です。

以下のセクションでは、EXM関数を使用した読み取りと書き込みのプロセスを説明します。
