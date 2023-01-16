# Minimal Svelte Starter Kit

This guide will walk you through in a step by step flow to configure your development environment to build and deploy a permaweb application.

## Prerequisites 

* Know typescript
* NodeJS v18 or greater
* Know Svelte - [https://svelte.dev](https://svelte.dev)
* Know git and common terminal commands

## Development Dependencies

* TypeScript
* esbuild
* w3
* yarn `npm i -g yarn`

## Steps

### Create Project

```sh
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

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

Set `type` to `module`
Add a build cripts

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

## Main.ts

```ts
import App from './app.svelte'

new App({
  target: document.body
})
```

## app.svelte

```html
<script lang="ts">
import { Route, router } from 'tinro'
import Counter from './counter.svelte'
import About from './about.svelte'

// add hash routing for permaweb support
router.mode.hash()

</script>
<nav>
<a href="/">Home</a> | <a href="/about">About</a>
</nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info Hash Routing
You will notice the `router.mode.hash()` setting in the script session, this is important to configure your application to use hash based routing, which will enable url support when running that application on a path, like `https://[gateway]/[TX]` 
:::


## counter.svelte

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
```

## about.svelte

```html
<h1>About Page</h1>
<p>Minimal About Page</p>
<a href="/">Home</a>
```

## Deploy 

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
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
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

A completed version of this example is available here: [https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## Summary

This is a minimal version of publishing a Svelte application on the permaweb, but you may want more features, like hot-reloading and tailwind, etc. Check out `hypar` for a turnkey starter kit. [HypAR](https://github.com/twilson63/hypar)