---
locale: jp
---
# エグゼキューションマシンSDKを使用してサーバーレス関数から読み取る

EXMのサーバーレス関数から状態を読み取る方法は2つあります。[導入](../intro.md#serverless-functions-on-arweave)で説明されているように、EXMはアプリケーションを迅速に提供するためのキャッシュレイヤーに関数のコピーを保存する一方で、分散化と関連する利点を維持するために関数をArweaveにアップロードします。その結果、関数の状態は、EXMのキャッシュレイヤーから読み取ることも、直接Arweaveから読み取ることもできます。

1. EXMのキャッシュレイヤーからの読み取り：

readコールは、EXMのキャッシュレイヤーに保存された最新の状態を読み取ります。このレイヤーはアプリケーションを迅速に提供するために特別に設計されています。楽観的なアプローチを採用し、トランザクションリクエストを受け取った直後に関数の状態を即座に更新します。

<CodeGroup>
  <CodeGroupItem title="read.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// 新しいEXMインスタンスの初期化
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// キャッシュされたレイヤーから読み取る
const readResult = await exm.functions.read(functionId);
console.log(readResult);
```

  </CodeGroupItem>
</CodeGroup>

2. Arweaveから直接読み取る（評価）：

evaluateコールは、Arweaveで正常に処理された最新の状態を返します。この最新の状態は、[遅延評価](../intro.md#how-does-it-work-in-the-background)によって計算され、発生順に初期状態と関数との相互作用を評価して最新の状態に到達します。

<CodeGroup>
  <CodeGroupItem title="evaluate.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// 新しいEXMインスタンスの初期化
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// Arweaveから評価する
const evalResult = await exm.functions.evaluate(functionId);
console.log(evalResult);
```

  </CodeGroupItem>
</CodeGroup>

::: tip
Arweaveから読み取ることは、検証目的にのみ推奨されます。評価コールから返された関数の状態は、キャッシュレイヤーから返された情報と照合してその正当性を確認することができます。トランザクションリクエストの投稿とネットワーク上の更新の間にわずかな遅延がある場合があります。
:::