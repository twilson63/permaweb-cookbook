# React Starter Kit w/vite & ArDrive

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

### Create React App

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm create vite my-arweave-app --template react-ts
cd my-arweave-app
npm install
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn create vite my-arweave-app --template react-ts
cd my-arweave-app
yarn
```

</CodeGroupItem>
</CodeGroup>

### Add React Router DOM

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm install react-router-dom
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn add react-router-dom
```

</CodeGroupItem>
</CodeGroup>


We need to use the hash-router to create a working app on arweave.

### Page Components

```sh
touch src/Home.tsx src/About.tsx
```

src/Home.tsx

```tsx
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			Welcome to the Permaweb!
			<Link to={"/about/"}>
				<div>About</div>
			</Link>
		</div>
	);
}

export default Home;
```

src/About.tsx

```tsx
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

```tsx
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

#### Modify index.css

Alter the `body` selector

```css
body {
  margin: 0;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  place-items: center;
  min-width: 100%;
  min-height: 100vh;
}
```

Run the project
<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm run dev
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn dev
```

</CodeGroupItem>
</CodeGroup>


### Building React App

#### Modify vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
})
```
#### Build App

```sh
yarn build
```

### Deploy Permanently

#### Generate Wallet

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

#### Fund Wallet
You will need to fund your wallet with ArDrive Turbo credits. To do this, enter [ArDrive](https://app.ardrive.io) and import your wallet.
Then, you can purchase turbo credits for your wallet.

#### Setup Permaweb-Deploy

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



#### Update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "DEPLOY_KEY=$(base64 -i wallet.json) permaweb-deploy --ant-process << ANT-PROCESS >> "
  }
  ...
}
```

::: info
Replace << ANT-PROCESS >> with your ANT process id.
:::

#### Run build

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

#### Run deploy

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

#### Response

You should see a response similar to the following:

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

Your React app can be found at `https://arweave.net/<< tx-id >>`.

::: tip SUCCESS
You should now have a React Application on the Permaweb! Great Job!
:::
### Congrats!

You just published a react application on the Permaweb! This app will be hosted forever!

