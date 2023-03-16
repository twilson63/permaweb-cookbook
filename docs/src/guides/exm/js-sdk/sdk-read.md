# Read from Serverless Functions with Execution Machine SDK

There are two ways of reading state from an EXM serverless functions. As explained in the [introduction](../intro.md#serverless-functions-on-arweave), EXM stores a copy of the function on a cache layer for rapidly serving applications but also uploads the function on Arweave to maintain decentralisation and its associated benefits. As a result of this, the function state can be read either from EXM's cache layer or directly from Arweave.

1. Reading from EXM's cache layer:

The read call reads the latest state as stored on EXM's cached layer. This layer is specifically designed for rapily serving applications. It takes an optimistic approach and updates the function state immediately upoon receiving a transaction request.

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

2. Reading directly from Arweave (Evaluate):

The evaluate call returns the latest state as successfully processed on Arweave. This latest state is calculated by [lazy evaluation](../intro.md#how-does-it-work-in-the-background), which evaluates the initial state and the interactions with the function in order of ocurrence to arrive at the latest state.

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
Reading from Arweave is recommended for verification purposes only. The function state returned from the evaluate call can be checked against the information returned by the cache layer to ensure its authenticity. There may be a slight lag in posting the transaction request and it updating on the network.
:::

