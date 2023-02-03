# Create Vue Starter Kit

This guide will provide step-by-step instructions to configure your development environment and build a permaweb Vue application.

## Prerequisites

- Basic Typescript Knowledge (Not Mandatory) - [Learn Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 or greater - [Download NodeJS](https://nodejs.org/en/download/)
- Knowledge of Vue.js (preferably Vue 3) - [Learn Vue.js](https://vuejs.org/)
- Know git and common terminal commands

## Development Dependencies

- TypeScript (Optional)
- NPM or Yarn Package Manager

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
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
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
it will start a new development server locally on your machine by default it uses `PORT 5173` if this PORT is already in use it may increase the PORT number by 1 (`PORT 5174`) and try again.

## Deploy

### Generate Wallet
The `arweave` package is required to generate a wallet.

<CodeGroup>
  <CodeGroupItem title="NPM">

  ```console:no-line-numbers
  npm install --save arweave
  ```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

  ```console:no-line-numbers
  yarn add arweave

  ```

  </CodeGroupItem>
</CodeGroup>

To generate your wallet, run the following command in the terminal:
```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### install bundlr

Bundlr is needed to deploy your app to Permaweb, as it offers instant data upload and retrieval.

<CodeGroup>
  <CodeGroupItem title="NPM">

  ```console:no-line-numbers
  npm install --save-dev @bundlr-network/client
  ```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

  ```console:no-line-numbers
  yarn add -D @bundlr-network/client
  ```

  </CodeGroupItem>
</CodeGroup>

::: info Arweave Wallet
To upload this app, you may need to add AR and fund your Bundlr wallet. Visit [https://bundlr.network](https://bundlr.network) and https://www.arweave.org/](https://www.arweave.org/) for more information.
:::

### update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Update .gitignore

To protect your funds, it's important to keep your wallet file private. Uploading it to GitHub, where it can potentially become public, could result in your money being leaked. To prevent this, add the `wallet.json` file to your `.gitignore` file. And don't forget to save it in a safe place.

```sh
echo "wallet.json" >> .gitignore
```

### Run build

It's now time to generate the build.

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
Finally we are good to deploy our First Permaweb Application

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

::: tip SUCCESS
You should now have a React Application on the Permaweb! Great Job!
:::

::: warning Fund Wallet
if your application is greater than 120 kb or you receive the error `Not enough funds to send data`, you will need to fund you bundlr wallet. See [https://bundlr.network](https://bundlr.network) for more information.
:::

## Repository

A fully functional example in JavaScript or TypeScript can be found at this location.

* Repository: [https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## Summary

This guide provides a simple step-by-step method to publish a Vue.js app on the Permaweb using Create Vue. If you need additional features Tailwind, consider exploring alternative starter kits listed in the guide to find a suitable solution for your requirements.
