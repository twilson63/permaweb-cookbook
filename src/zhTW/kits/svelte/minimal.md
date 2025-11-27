# Minimal Svelte Starter Kit

本指南將逐步引導您設定開發環境，以構建並部署一個 Permaweb 應用程式。

## 先決條件

- 熟悉 TypeScript
- NodeJS v18 或以上
- 熟悉 Svelte - [https://svelte.dev](https://svelte.dev)
- 熟悉 git 與常用終端機指令

## 開發相依套件

- TypeScript
- esbuild
- w3

## 步驟

### 建立專案

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

## 建立 buildscript.js

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

## 修改 package.json

將 `type` 設為 `module`，並新增 build 腳本

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## 建立 `src` 目錄與一些 src 檔案

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
您會在 script 區段看到 `router.mode.hash()` 設定，這一設定對於將應用程式設定為基於 hash 的路由非常重要，能在應用程式部署到如 `https://[gateway]/[TX]` 的路徑時啟用 URL 支援。
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

## 新增 index.html

```html
<!DOCTYPE html>
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

## 永久部署 (Deploy Permanently)

### 產生錢包

我們需要使用 `arweave` 套件來產生錢包

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

然後在終端機執行下列指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 為錢包充值

您需要為錢包購買 ArDrive Turbo 點數。請前往 [ArDrive](https://app.ardrive.io) 匯入您的錢包，然後為該錢包購買 turbo 點數。

### 設定 Permaweb-Deploy

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

### 更新 vite.config.ts

```ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  base: "./",
});
```

### 更新 package.json

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
請將 << ANT-PROCESS >> 替換為您的 ANT process id。
:::

### 執行 build

現在開始產生 build，執行

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

### 執行 deploy

最後，我們可以部署第一個 Permaweb 應用程式了

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
如果收到 `Insufficient funds` 錯誤，請確認您已為部署用的錢包充值 ArDrive Turbo 點數。
:::

### 回應

您應該會看到類似以下的回應：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

您的 Svelte 應用程式可以透過 `https://arweave.net/<< tx-id >>` 存取。

::: tip SUCCESS
恭喜！您現在應該已經在 Permaweb 上部署出一個 Svelte 應用程式！
:::

## 總結

這是一個在 Permaweb 上發布 Svelte 應用的極簡版本說明；若您想要更多功能，例如熱重載 (hot-reloading)、Tailwind 等，建議查看 `hypar` 作為一個開箱即用的起始範本。 [HypAR](https://github.com/twilson63/hypar)
