# 最簡 Svelte 入門套件

本指南將逐步帶您設定開發環境，以建置並部署一個 Permaweb 應用程式。

## 先決條件

- 具備 TypeScript 基礎
- NodeJS v18 或更新版本
- 熟悉 Svelte - [https://svelte.dev](https://svelte.dev)
- 熟悉 git 及常用終端機指令

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

將 `type` 設為 `module`，並新增一個 build 腳本

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## 建立 `src` 目錄與一些檔案

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

### main.ts

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
您會注意到 script 區段中的 `router.mode.hash()` 設定，這對於將應用程式設為使用 hash（雜湊）路由非常重要，這會在應用程式部署於某個路徑時（例如 `https://[gateway]/[TX]`）啟用 URL 支援。
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

## 永久部署

### 產生錢包

我們需要 `arweave` 套件來產生錢包

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

然後在終端機執行以下指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 為錢包充值

您需要用 ArDrive Turbo 點數為錢包充值。為此，前往 [ArDrive](https://app.ardrive.io) 並匯入您的錢包。接著您就可以為錢包購買 turbo 點數。

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
將 << ANT-PROCESS >> 替換為您的 ANT process id。
:::

### 執行建置

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

### 執行部署

最後，我們就可以部署第一個 Permaweb 應用程式了

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

::: info 錯誤
如果您收到 `Insufficient funds`（資金不足）錯誤，請確認您已使用 ArDrive Turbo 點數為部署用的錢包充值。
:::

### 回應

您應該會看到類似以下的回應：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

您的 Svelte 應用程式可以透過 `https://arweave.net/<< tx-id >>` 存取。

::: tip 成功
您現在應該已經在 Permaweb 上部署了一個 Svelte 應用程式！做得好！
:::

## 總結

這是一個在 Permaweb 上發布 Svelte 應用程式的最小化版本，但您可能會需要更多功能，例如熱重新載入（hot-reloading）、Tailwind 等。可參考 `hypar` 以取得一個開箱即用的起始套件。 [HypAR](https://github.com/twilson63/hypar)
