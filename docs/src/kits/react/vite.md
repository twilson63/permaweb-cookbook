# Vite Starter Kit

This guide will walk you through in a step by step flow to configure your development environment to build and deploy a permaweb react application.

## Prerequisites

-   Basic Typescript Knowledge (Not Mandatory) - [https://www.typescriptlang.org/docs/](Learn Typescript)
-   NodeJS v16.15.0 or greater - [https://nodejs.org/en/download/](Download NodeJS)
-   Knowledge of ReactJS - [https://reactjs.org/](Learn ReactJS)
-   Know git and common terminal commands

## Development Dependencies

-   TypeScript
-   NPM or Yarn Package Manager

## Steps

### Create Project

if you are not familiar with typescript you can use the template "react" (`--template react`)

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm create vite@latest my-arweave-app -- --template react-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create vite my-arweave-app --template react-ts
```

  </CodeGroupItem>
</CodeGroup>

### Change into the Project Directory

```sh
cd my-arweave-app
```

### Install react-router-dom

You have to install this package to manage routing between different pages

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install react-router-dom --save
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add react-router-dom -D
```

  </CodeGroupItem>
</CodeGroup>

### Run the App

Now we need to check if everything is going Perfect before jumping into next Step, Run
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
it will start a new development server locally on your machine by default it uses `PORT 3000` if this PORT is already in use
it may ask you to switch to another available PORT in Terminal

### Setup wallet types

If you want to use [ArConnect](https://arconnect.io), [Arweave.app](https://arweave.app) or other browser-based wallets, you can install ArConnect's types package to have declarations for `window.arweaveWallet`.
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arconnect -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arconnect -D
```

  </CodeGroupItem>
</CodeGroup>

After installing the package, you'll need to add it to your `src/vite-env.d.ts` file.

```ts
/// <reference types="arconnect" />
```

### Setup Routing

Now modify the application and add a new routes such as an about page, first create 2 more .tsx files. (if you have used the vanilla JS react template, then make sure your component file extension should be `.jsx or .js`)

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

#### HomePage.tsx

```ts
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			Welcome to the Permaweb!
			<Link to={"/about/"}>
				<div>About</div>
			</Link>
		</div>
	);
}

export default HomePage;
```

#### About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
	return (
		<div>
			Welcome to the About page!
			<Link to={"/"}>
				<div>Home</div>
			</Link>
		</div>
	);
}

export default About;
```

#### Modify App.tsx

We need to update the App.tsx to manage different pages

```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

::: info Hash Routing
Note that we are wrapping the routes in a HashRouter and using the react-router-dom Link component to build links.
This is important on the permaweb in its current state, it will ensure the routes work properly because applications
are served on a path like `https://[gateway]/[TX]`
:::

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

### Update vite config

Make sure you add the `base` property to the vite config object and set it to an empty string.

vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
})
```

### Setup Turbo

### Setup Turbo

We need Turbo to deploy our app to the Permaweb.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install @ardrive/turbo-sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add @ardrive/turbo-sdk
```

  </CodeGroupItem>
</CodeGroup>

### Fund Your Wallet
 
Turbo uses Turbo Credits to upload data to Arweave. You can purchase Turbo Credits with a variety of fiat currencies or crypto tokens. Below is an example for funding your wallet with 10 USD. It will open a browser window to complete the purchase using Stripe.

```console:no-line-numbers
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

Be sure to replace `wallet.json` with the path to your Arweave wallet.

### Update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "turbo upload-folder --folder-path ./build --wallet-file wallet.json > latest-manifest.json"
  }
  ...
}
```

This will upload your build folder to the permaweb, and save all of the details of the upload to a file named "latest-manifest.json". That way, you'll have a reference for the manifest TxId to use later.

### Run build

Now its time to Generate Build

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

