# Minimal Svelte Starter Kit

This guide will walk you through in a step by step flow to configure your development environment to build and deploy a permaweb application.

## Prerequisites

-   Know typescript
-   NodeJS v18 or greater
-   Know Svelte - [https://svelte.dev](https://svelte.dev)
-   Know git and common terminal commands

## Development Dependencies

-   TypeScript
-   esbuild
-   w3

## Steps

### Create Project

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
mkdir myproject
cd myproject
npm init -y
npm install -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```


  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

  </CodeGroupItem>
</CodeGroup>

## Create buildscript.js

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./dist/")) {
	fs.mkdirSync("./dist/");
}
esbuild
	.build({
		entryPoints: [`./src/main.ts`],
		bundle: true,
		outdir: `./dist`,
		mainFields: ["svelte", "browser", "module", "main"],
		// logLevel: `info`,
		splitting: true,
		write: true,
		format: `esm`,
		plugins: [
			esbuildSvelte({
				preprocess: sveltePreprocess(),
			}),
		],
	})
	.catch((error, location) => {
		console.warn(`Errors: `, error, location);
		process.exit(1);
	});

//use a basic html file to test with
fs.copyFileSync("./index.html", "./dist/index.html");
```

## Modify package.json

Set `type` to `module`, add a build script

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## Create `src` directory and some src files

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

### Main.ts

```ts
import App from "./app.svelte";

new App({
	target: document.body,
});
```

### app.svelte

```html
<script lang="ts">
	import { Route, router } from "tinro";
	import Counter from "./counter.svelte";
	import About from "./about.svelte";

	// add hash routing for permaweb support
	router.mode.hash();
</script>
<nav><a href="/">Home</a> | <a href="/about">About</a></nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info Hash Routing
You will notice the `router.mode.hash()` setting in the script session, this is important to configure your application to use hash based routing, which will enable url support when running that application on a path, like `https://[gateway]/[TX]`
:::

### counter.svelte

```html
<script lang="ts">
	let count = 0;

	function inc() {
		count += 1;
	}
</script>
<h1>Hello Permaweb</h1>
<button on:click="{inc}">Inc</button>
<p>Count: {count}</p>
```

### about.svelte

```html
<h1>About Page</h1>
<p>Minimal About Page</p>
<a href="/">Home</a>
```

## Add index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Svelte + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```


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

### Update vite.config.ts

```ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  base: './'
})
```

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

Your Svelte app can be found at `https://arweave.net/<< tx-id >>`.

::: tip SUCCESS
You should now have a Svelte Application on the Permaweb! Great Job!
:::

## Summary

This is a minimal version of publishing a Svelte application on the permaweb, but you may want more features, like hot-reloading and tailwind, etc. Check out `hypar` for a turnkey starter kit. [HypAR](https://github.com/twilson63/hypar)
