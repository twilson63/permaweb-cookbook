# Deploying Serverless Functions with Execution Machine SDK

For deploying serverless functions with the SDK in JavaScript, we create a script here that tells our computer how to deploy our function to the network.

<details>
<summary><strong>Function Logic Example</strong></summary>

After installing the package we need a file defining the logic of the function within the project.

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

The syntax for defining functions is based off of the standard implemented by SmartWeave for smart contracts in JavaScript. Every function has a `state` which is a JSON object of values stored in it and `actions` to interact with these values. 

The function above adds names to a users array which is done using the following line:

```js
state.users.push(action.input.name);
```

When deploying our function we initialise an empty array named `users` that later helps our function to identify this state variable (variable stored in state of the function) during read and write calls. Upon initialisation the `state` looks like this:

```js
{ users: [] }
```

Additionally, while writing to the function, we use a key named `name` to help the function identify what value we are feeding into the write operation. Both these definitions gain further significance when dealing with multiple values.
</details>
<br/>

Once the function logic is defined and API Token is setup properly as shown [here](../api.md), create the deploy file as follows:

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

While deploying, we need to pass in the function logic, function's initial state and programming language of function definition as arguments. To deploy, run the following command in the command line inside the appropriate directory of the project:

```bash
node deploy.js
```

Upon deploying we receive some data from which we store the `functionId` in a local file. The `functionId` as the name states is a unique identifier that helps in further interactions with the serverless function such as read and write operations.

The following sections walk through the process of reading and writing with EXM functions.