# Github Action

::: warning
This guide is for educational purposes only, and you should use to learn options of how you might want to deploy your application. In this guide, we are trusting a 3rd party resource `github` owned by `microsoft` to protect our secret information, in their documentation they encrypt secrets in their store using `libsodium sealed box`, you can find more information about their security practices here. https://docs.github.com/en/actions/security-guides/encrypted-secrets
:::

Github Actions are CI/CD pipelines that allows developers to trigger automated tasks via events generated from the github workflow system. These tasks can be just about anything, in this guide we will show how you can use github actions to deploy your permaweb application to the permaweb using Irys and ArNS.

::: tip
This guide requires understanding of github actions, and you must have some ArNS Test Tokens, go to https://ar.io/arns/ for more details.
:::

::: warning
This guide does not include testing or any other checks you may want to add to your production workflow.
:::

## Create deploy script

A deploy script is a script that does the heavy lifting of deploying your application, we will use `@irys/sdk` and `warp-contracts` to publish our application and register the newly published application on ArNS.

Install deploy dependencies

```console
npm install --save-dev @permaweb/arx
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

Create `deploy.mjs` file

```js
import Arx from "@permaweb/arx";
import { WarpFactory, defaultCacheOptions } from "warp-contracts";
import Arweave from "arweave";

const ANT = "[YOUR ANT CONTRACT]";
const DEPLOY_FOLDER = "./dist";
const TURBO_NODE = "https://turbo.ardrive.io";

const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, "base64").toString("utf-8"));
const arweave = Arweave.init({ host: "arweave.net", port: 443, protocol: "https" });
const arx = new Arx({ url: TURBO_NODE, token: "arweave", key: jwk });
const warp = WarpFactory.custom(arweave, defaultCacheOptions, "mainnet").useArweaveGateway().build();

const contract = warp.contract(ANT).connect(jwk);
// upload folder
const result = await arx.uploadFolder(DEPLOY_FOLDER, {
	indexFile: "index.html",
});

// update ANT
await contract.writeInteraction({
	function: "setRecord",
	subDomain: "@",
	transactionId: result.id,
});

console.log("Deployed Cookbook, please wait 20 - 30 minutes for ArNS to update!");
```

## Add script to package.json

Create a new script property called `deploy`, call the build script, then call `node deploy.mjs` in the value of the scripts deploy property.

package.json

```json
  ...
  "scripts": {
    "dev": "vitepress dev src",
    "build": "vitepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```

## Create github action

Create a `deploy.yml` file in the `.github/workflows` folder, this file instructs github actions to deploy when a push event is triggered on the `main` branch.

```yml
name: publish

on:
    push:
        branches:
            - "main"

jobs:
    publish:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v1
              with:
                  node-version: 18.x
            - run: yarn
            - run: yarn deploy
              env:
                  KEY: ${{ secrets.PERMAWEB_KEY }}
```

## Summary

In the project repo, go to the settings and secrets, add a new secret to the repostiory, this secret will be called PERMAWEB_KEY for this project. The value of the secret should be the base64 encode string of the deployment wallet.

```console
base64 -i wallet.json | pbcopy
```

In order for this deployment to work, you will need to fund this wallets Irys account, make sure there is some $AR in the wallet you will be using, not much, maybe .5 AR, then use the Irys cli to fund.

```console
arx fund 250000000000 -w wallet.json -t arweave
```

::: warning
Keep this wallet low on funds and only use it for this project.
:::

:tada: You have setup a github action to completely automate your deploy to permaweb!
