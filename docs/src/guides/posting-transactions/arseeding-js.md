# Posting Transactions using arseeding.js
You can use the `arseeding-js` JavaScript SDK package to publish transactions on the Arweave network. Arseeding automatically broadcasts the transaction to all Arweave nodes in the network, ensuring that the transaction is promptly received in the pending pool of all Arweave nodes, thus increasing the transaction's packaging speed.
## Installing arseeding.js
To install `arseeding.js` run:

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arseeding-js
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arseeding-js
```

  </CodeGroupItem>
</CodeGroup>

## Transaction for Uploading Data
When using Arseeding, you must pre-fund your account on [everpay](https://app.everpay.io/). This balance can be funded with $AR tokens or other cryptocurrencies. Another distinction is that the Arseeding service ensures that your data will make it onto the blockchain.

```js:no-line-numbers
const { genNodeAPI } = require('arseeding-js')

const run = async () => {
  const instance = genNodeAPI('YOUR PRIVATE KEY')
  const arseedUrl = 'https://arseed.web3infra.dev'
  const data = Buffer.from('........')
  const payCurrencyTag = 'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // everPay supported token tag (chainType-symbol-id)
  const options = {
    tags: [{ name: 'Content-Type', value: 'image/png' }]
  }
  const res = await instance.sendAndPay(arseedUrl, data, payCurrencyTag, options)
  console.log('res', res)
}
run()
```


## Resources
* For an overview of all methods for publishing transactions, please refer to the [Publishing Transactions](../../concepts/post-transactions.md) section in the operation manual.

* You can find the complete Arseeding documentation on the [Arseeding website](https://web3infra.dev/docs/arseeding/introduction/lightNode/).

* Follow the Arseeding Upload Manifest tutorial [here](https://web3infra.dev/docs/arseeding/sdk/arseeding-js/manifest/).