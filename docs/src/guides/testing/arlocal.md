# arlocal
`arlocal` is a tool for quickly setting up and running a local Arweave testing environment. It allows you to test transactions on a Arweave gateway-like server. It allows developers to test their applications in a simulated environment before deploying them to the Arweave network

No $AR tokens are required to use and transactions are instant.

## CLI
You must have node and npm installed on your machine to use the arlocal CLI

To start the local gateway, run `npx arlocal`

::: tip
You can specify what port to run the slim gateway on by passing your port as an argument
`npx arlocal 8080`
:::

To hide the logs, add the flag `--hidelogs` when you run your gateway
`npx arlocal --hidelogs`
## Node 
Install the package as a dev dependency by running
`yarn add arlocal -D` or `npm install arlocal --save-dev`

```js
import ArLocal from 'arlocal';

(async () => {
  const arLocal = new ArLocal();

  // create local testing environment
  await arLocal.start();

  // your tests here

  // shut down testing environment
  await arLocal.stop();
})();
```

An `ArLocal` instance can be created with options
| Option | Description |
| ---- | ----------- |
| port | Port to use |
| showLogs | Show logs |
| dbPath | Directory for temporary database  |
| persist | Persisting data between server restarts

### Example
For this example to work, the code needs to use a generated test wallet. To achieve this the `arweave` package must be installed to the project along with `arlocal`

`yarn add arweave arlocal -D` or `npm install --save-dev arweave arlocal`

Below is a basic JavaScript test for creating a data transaction and posting it to Arweave using arlocal:

```js
import ArLocal from 'arlocal'
import Arweave from 'arweave'

test('test transaction', async () => {
    // create and start ArLocal instance
    const arLocal = new ArLocal()
    await arLocal.start()
    // create local Arweave gateway
    const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
  })
  // generate wallet
  const wallet = await arweave.wallets.generate()
  // airdrop amount of tokens (in winston) to wallet
  await arweave.api.get(`mint/${addr}/10000000000000000`)
  // create mine function
  const mine = () => arweave.api.get('mine')
  try {
    // create transaction
    let transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, wallet);
    // sign and post transaction
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // mine transaction
    await mine()
    // test the response
  } catch(err) {
    console.error('ERROR: ', err.message)
  }
  // tear down testing environment
  await arLocal.stop()
})
```

::: warning
Test results from L1 transactions may differ from L2 transactions
:::

## Resources
[arlocal docs](https://github.com/textury/arlocal)