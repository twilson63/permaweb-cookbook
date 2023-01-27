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
<main>

</main>
```

The `router.mode.hash` function turns on hash router mode.
The `router.subscribe` callback is nice to reset the page to the top on page transfers

## Adding some transition components

These component will manage the transition between one page to another page when routing.

create a directory under the `src` directory called components and add these two files:

announcer.svelte

```html
<script>
  import { router } from "tinro";
  $: current = $router.path === "/" ? "Home" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">
  {#key current}
    Navigated to {current}
  {/key}
</div>

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

transition.svelte

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
let count = 0

function inc() {
  count += 1
}
</script>
<h1>Hello Permaweb</h1>
<button on:click={inc}>Inc</button>
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

## Deploying to the Permaweb

### Generate Wallet

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### install bundlr

```sh
yarn add -D @bundlr-network/client
```

### update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Run deploy

```sh
yarn deploy
```

::: tip SUCCESS 
You should now have a Svelte Application on the Permaweb! Great Job!
:::

::: warning Fund Wallet
if your application is greater than 120 kb, you will need to fund you bundlr wallet. See [https://bundlr.network](https://bundlr.network) for more information.
::: 

## Repository

A completed version of this example is available here: [https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## Summary

This is a minimal version of publishing a Svelte application on the permaweb, but you may want more features, like hot-reloading and tailwind, etc. Check out `hypar` for a turnkey starter kit. [HypAR](https://github.com/twilson63/hypar)