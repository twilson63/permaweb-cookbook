# Create Vue Starter Kit

This guide will provide step-by-step instructions to configure your development environment and build a permaweb Vue application.

## Prerequisites

-   Basic Typescript Knowledge (Not Mandatory) - [Learn Typescript](https://www.typescriptlang.org/docs/)
-   NodeJS v16.15.0 or greater - [Download NodeJS](https://nodejs.org/en/download/)
-   Knowledge of Vue.js (preferably Vue 3) - [Learn Vue.js](https://vuejs.org/)
-   Know git and common terminal commands

## Development Dependencies

-   TypeScript (Optional)
-   NPM or Yarn Package Manager

## Steps

### Create Project

The following command installs and launches create-vue, the official scaffolding tool for Vue projects.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm init vue@latest
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn create vue
```

  </CodeGroupItem>
</CodeGroup>

During the process, you'll be prompted to select optional features such as TypeScript and testing support. I recommend selecting the `Vue Router` with yes, the rest can be selected as per your preference.

```console:no-line-numbers
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / *Yes*
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

### Change into the Project Directory

```sh
cd <your-project-name>
```

### Install Dependencies

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn
```

  </CodeGroupItem>
</CodeGroup>

### Setup Router

Vue Router is the official router for Vue.js and seamlessly integrates with Vue. To make it work with Permaweb, switch from a browser history router to a hash router as the URL cannot be sent to the server. Change `createWebHistory` to `createWebHashHistory` in your `src/router/index.ts` or `src/router/index.js` file.

```ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
	],
});

export default router;
```

### Setup Build

Configure the build process in the `vite.config.ts` or `vite.config.js` file. To serve Permaweb apps from a sub-path (https://[gateway]/[TX_ID]), update the base property to ./ in the config file.

```ts
export default defineConfig({
  base: './',
  ...
})
```

### Run the App

Before moving forward, it is crucial to verify that everything is working correctly. Run a check to ensure smooth progress.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn dev
```

  </CodeGroupItem>
</CodeGroup>
it will start a new development server locally on your machine by default it uses `PORT 5173`. If this PORT is already in use it may increase the PORT number by 1 (`PORT 5174`) and try again.

## Deploy Permanently

### Generate Wallet

We need the `arweave` package to generate a wallet

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

then run this command in the terminal

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Fund Wallet
You will need to fund your wallet with ArDrive Turbo credits. To do this, enter [ArDrive](https://app.ardrive.io) and import your wallet.
Then, you can purchase turbo credits for your wallet.

### Setup Permaweb-Deploy

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add permaweb-deploy
```

  </CodeGroupItem>
</CodeGroup>

### Fund Your Wallet
 
Turbo uses Turbo Credits to upload data to Arweave. You can purchase Turbo Credits with a variety of fiat currencies or crypto tokens. Below is an example for funding your wallet with 10 USD. It will open a browser window to complete the purchase using Stripe.

```console:no-line-numbers
npm install @ardrive/turbo-sdk
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

Be sure to replace `wallet.json` with the path to your Arweave wallet.

### Update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "DEPLOY_KEY=$(base64 -i wallet.json) permaweb-deploy --ant-process << ANT-PROCESS >> --deploy-folder build"
  }
  ...
}
```

::: info
Replace << ANT-PROCESS >> with your ANT process id.
:::

### Run build

Now it is time to generate a build, run

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run build
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn build
```

  </CodeGroupItem>
</CodeGroup>

### Run deploy

Finally we are good to deploy our first Permaweb Application

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn deploy
```

  </CodeGroupItem>
</CodeGroup>

::: info ERROR
If you receive an error `Insufficient funds`, make sure you remembered to fund your deployment wallet with ArDrive Turbo credits.
:::

### Response

You should see a response similar to the following:

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

Your Vue app can be found at `https://arweave.net/<< tx-id >>`.

::: tip SUCCESS
You should now have a Vue Application on the Permaweb! Great Job!
:::

## Summary

This guide provides a simple step-by-step method to publish a Vue.js app on the Permaweb using Create Vue. If you need additional features Tailwind, consider exploring alternative starter kits listed in the guide to find a suitable solution for your requirements.
