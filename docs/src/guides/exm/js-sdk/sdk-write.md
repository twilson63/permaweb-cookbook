# Write to Serverless Functions with Execution Machine SDK

Once a function is deployed, it's state can be updated with the help of write interactions. Due to the unique architecture of EXM's serverless functions, the logic for updating state is stored along with the state itself and both of these can be referred to using the same `functionId`. Functions can have a single operation or multiple operations for updating state as per the application requirements and the arguments for the write call vary accordingly.

<details>
<summary><strong>Function Logic and Corresponding Write Example</strong></summary>

- <strong>Function example with single operations for updating state:</strong>

The following function adds names to a users array:

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

- <strong>Function example with multiple operations for updating state:</strong>

The following function creates posts but also has the ability to update or delete these posts:

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

The posts are objects with the following format:

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

We give each post a unique `id` so that we can refer to it for updating or deleting. If no corresponding `id` exists, then a new post is created instead.

However, as can be seen in the function above, this function logic has the abilitiy to perform multiple operations and hence the `type` for each has been given a name. This name must be passed in as an input along with the post or id for performing the appropriate write call. To update a post, the inputs for the write call would look as follows:

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

The write transaction takes in two arguments. The `functionId` of the function to interact with and any `inputs` the function needs to process the write request and update state.

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

A successful write request returns an object with the status as SUCCESS.

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