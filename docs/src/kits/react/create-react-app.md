# Create React App Starter Kit

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

If you are not familiar with typescript you can exclude the extra check `--template typescript`

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npx create-react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
</CodeGroup>

### Change into the Project Directory

```sh
cd permaweb-create-react-app
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

Now we need to check if everything is working before jumping into next step, run
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm start
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn start
```

  </CodeGroupItem>
</CodeGroup>
This will start a new development server locally on your machine. By default it uses `PORT 3000`, if this PORT is already in use
it may ask you to switch to another available PORT in Terminal

### Modify the package.json to contain the following config

```json
{
  ...
  "homepage": ".",
}
```

### Setup Routing

Now modify the application and add a new route such as an about page, first create 2 more .tsx files. (if you have exluceded the extra check `--template typescript`, then your component file extension should be `.jsx or .js`)

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

We need to update the App.tsx to manage the different pages

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

::: info Existing Wallet
This step will generate a new, empty, Arweave wallet. If you already have an existing Arweave wallet you may provide its keyfile and skip this step.
:::

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

It is very important to make sure that your wallet file is not included in any folder you want uploaded to Arweave.

### Setup Turbo

We need Turbo to deploy our app to the Permaweb.

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
    "deploy": "turbo upload-folder --folder-path ./build --wallet-file wallet.json > latest-manifest.json"
  }
  ...
}
```

This will upload your build folder to the permaweb, and save all of the details of the upload to a file named "latest-manifest.json". That way, you'll have a reference for the manifest TxId to use later.

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

Your React app can be found at `https://arweave.net/<< tx-id >>`.

::: tip SUCCESS
You should now have a React Application on the Permaweb! Great Job!
:::

## Summary

This is a Create React App version of publishing a React app on the permaweb. You may discover new ways to deploy an app on the permaweb or checkout other starter kits in this guide!
