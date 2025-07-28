# Svelte/Vite Starter Kit

Svelte is the framework that compiles out of the way, that results is small packages, which is perfect for the permaweb. As developers, we value Dev Experience as much as we value User Experience. This kit uses the `vite` bundle system to give developers a great DX experience.

## Installing vite with svelte and typescript

<CodeGroup>
  <CodeGroupItem title="NPM v6">

```console
npm create vite@latest my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM v7">

```console
npm create vite@latest my-perma-app -- --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="PNPM">

```console
pnpm create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
</CodeGroup>

## Project Info

The vite build system places your index.html file in the root directory, this is where you would include any css or global script dependencies if needed. For more information about the vite project layout check out the [vite documentation](https://vitejs.dev/guide/#index-html-and-project-root)

## Setup hash-router

To setup the hash-router we will use [tinro](https://github.com/AlexxNB/tinro). `tinro` is a tiny declarative routing library, that is similar to React Router.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install --save-dev tinro
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add -D tinro
```

  </CodeGroupItem>
</CodeGroup>

## Telling Svelte to use hash routing

In the `src/App.svelte` file, you want to configure the router to use the hash routing mode.

```html
<script lang="ts">
	import { Route, router } from "tinro";
	router.mode.hash();
	router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

The `router.mode.hash` function turns on hash router mode.
The `router.subscribe` callback is nice to reset the page to the top on page transfers

## Adding some transition components

These component will manage the transition between one page to another page when routing.

Create a directory under the `src` directory called components and add these two files:

### announcer.svelte

```html
<script>
	import { router } from "tinro";
	$: current = $router.path === "/" ? "Home" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">{#key current} Navigated to {current} {/key}</div>

<style>
	div {
		position: absolute;
		left: 0;
		top: 0;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		overflow: hidden;
		white-space: nowrap;
		width: 1px;
		height: 1px;
	}
</style>
```

> This component is for screen readers announcing when a page changes

### transition.svelte

```html
<script>
  import { router } from "tinro";
  import { fade } from "svelte/transition";
</script>

{#key $router.path}
  <div in:fade={{ duration: 700 }}>
    <slot />
  </div>
{/key}
```

> This component adds a fade to the page transition

## Adding Routes to the app

```html
<script lang="ts">
	...
	import Announcer from "./components/announcer.svelte";
	import Transition from "./components/transition.svelte";
	...
</script>
<Announcer />
<Transition>
	<Route path="/">
		<Home />
	</Route>
	<Route path="/about">
		<About />
	</Route>
</Transition>
```

Adding the Announcer and Transition components to our routing system will handle announcing page transitions as well as animating the transition.

## Create some pages

### home.svelte

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
<a href="/about">About</a>
```

### about.svelte

```html
<h1>About Page</h1>
<p>Svelte/Vite About Page</p>
<a href="/">Home</a>
```

### Modify `App.svelte`

```html
<script lang="ts">
	...
	import Home from './home.svelte'
	import About from './about.svelte'
</script>
...
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
