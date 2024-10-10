---
locale: ja
---
# Execution Machine SDKを使用したサーバーレス関数の読み取り

EXMサーバーレス関数から状態を読み取る方法は2つあります。[はじめに](../intro.md#serverless-functions-on-arweave)で説明したように、EXMは関数のコピーをキャッシュ層に保存してアプリケーションを迅速に提供しますが、同時にその関数をArweaveにアップロードして分散化とその関連する利点を維持しています。この結果、関数の状態はEXMのキャッシュ層またはArweaveから直接読み取ることができます。

1. EXMのキャッシュ層からの読み取り:

   読み取り呼び出しは、EXMのキャッシュ層に保存された最新の状態を読み取ります。この層は、アプリケーションを迅速に提供するために特別に設計されています。楽観的アプローチを取り、トランザクションリクエストを受け取るとすぐに関数の状態を更新します。

<CodeGroup>
  <CodeGroupItem title="read.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// read from cached layer
const readResult = await exm.functions.read(functionId);
console.log(readResult);
```

  </CodeGroupItem>
</CodeGroup>

2. Arweaveからの直接読み取り（評価）:

   評価呼び出しは、Arweaveで正常に処理された最新の状態を返します。この最新の状態は、[遅延評価](../intro.md#how-does-it-work-in-the-background)によって計算され、初期状態と関数との相互作用を発生順に評価して最新の状態に到達します。

<CodeGroup>
  <CodeGroupItem title="evaluate.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// init new EXM instance
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// evaluate from arweave
const evalResult = await exm.functions.evaluate(functionId);
console.log(evalResult);
```

  </CodeGroupItem>
</CodeGroup>

::: tip
Arweaveからの読み取りは、検証目的のみに推奨されます。評価呼び出しから返された関数の状態は、キャッシュ層から返された情報と照合してその真正性を確認できます。トランザクションリクエストの投稿とネットワーク上での更新にはわずかな遅延がある場合があります。
:::

