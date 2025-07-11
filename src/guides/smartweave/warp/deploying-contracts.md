# Warp (SmartWeave) SDK - Deploying Contracts

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

SmartWeave Contracts are created by posting two transactions to the network, a Source Transaction and a Initial State Transaction, the source transaction contains the source code the contract will use to determine the current state. The initial state transaction provides a contract identifer to reference as well as the initial seed data the contract should use as the starting point to evaluate the current state. The current state is calculated by accessing actions that are transactions written to the network that contain input parameters to execute using the evaluated and instantiated source code. Warp Contracts can be created using many different languages and can be evaluated using the Warp SDK. This guide will show the many different ways you can deploy a Warp Contract.

::: tip
If you would like to learn more about authoring Warp SmartWeaveContracts, checkout the Warp Academy! [https://academy.warp.cc/](https://academy.warp.cc/)
:::

As of Warp version 1.3.0 you willl need a plugin to deploy contracts with Warp. This plugin will enable you to add different wallet signatures.

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

function deploy(initState, src) {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE']);
  }
  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  return warp.deploy({
    wallet: userSigner,
    src,
    initState: JSON.stringify(initState)
  })
}
```

## The Four ways to deploy a Warp SmartWeave Contract

There are 4 ways you can deploy a SmartWeaveContract via the Warp SDK, these options handle different use cases that a developer may encounter.

-   Need to deploy the contract with the source at the same time
-   Need to deploy a contract where the source is already on the permaweb
-   Need to deploy a contract through the sequencer and point it to some data using a path manifest
-   Need to deploy a contract via Irys and register that contract on the sequencer

::: tip
For more information about Warp deployments check out the github Readme for the project. [https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment).
:::

::: warning
This project is in rapid development, so the documentation here could be out of data quickly, if you discover it is out of date, please let us know on the [Permaweb Cookbook Discord Channel](https://discord.gg/haCAX3shxF).
:::

## Examples

::: tip
By default all deploy functions are published to Arweave via Irys, each option has a flag that can be set to not use Irys, but it can take many confirmations for the network to fully confirm the transaction.
:::

**deploy**

Deploys contract plus source code to Warp Sequencer, to Irys (L2), to Arweave.

```ts
const { contractTxId, srcTxId } = await warp.deploy({
	wallet,
	initState,
	data: { "Content-Type": "text/html", body: "<h1>Hello World</h1>" },
	src: contractSrc,
	tags: [{ name: "AppName", value: "HelloWorld" }],
});
```

-   wallet - should be Arweave keyfile (wallet.json) parsed as a JSON object implementing the [JWK Interface](https://rfc-editor.org/rfc/rfc7517) or the string 'use_wallet'
-   initState - is a stringified JSON object
-   data - is optional if you want to write data as part of your deployment
-   src - is the string or Uint8Array value of the source code for the contract
-   tags - is an array of name/value objects `{name: string, value: string}[]`, [Learn more about tags](../../../concepts/tags.md)

**deployFromSourceTx**

Already have the source on the permaweb? Then deployFromSourceTx is your tool of choice! With the permaweb you never have to worry about data changing so re-using source code for contracts is a no brainer.

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
	wallet,
	initState,
	srcTxId: "SRC_TX_ID",
});
```

**deployBundled**

Uses Warp Gateway Sequencer's endpoint to upload a raw data item to Irys and index it.

```ts
import { createData } from "arbundles";

const dataItem = createData(
	JSON.stringify({
		manifest: "arweave/paths",
		version: "0.1.0",
		index: {
			path: "index.html",
		},
		paths: {
			"index.html": {
				id: "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI",
			},
		},
	}),
	{ tags: [{ "Content-Type": "application/x.arweave-manifest+json" }] },
);
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```

**register**

Uses Warp Gateway Sequencer's endpoint to index a contract that has been uploaded with Irys.

```ts
import Irys from '@irys/sdk'

const irys = new Irys({ 'https://node2.irys.xyz', 'arweave', wallet })
const { id } = await irys.upload('Some Awesome Atomic Asset',  {
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2')
```

## Summary

Why are there so many options to deploy contracts? These methods exist to reduce duplication, enable advanced contract interactions, and allow for flexibility for testing and usage of the smartweave protocol. The permaweb is very unique in its architecture, it provides a feature where you can deploy both digital data and the contract to manage that data generating the same transaction identifier. The result is dynamic data paired with an immutable set of data. Deploying contracts is just one piece of the Warp SDK, to learn more keep reading this guide!
