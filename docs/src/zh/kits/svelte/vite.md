---
locale: zh
---
# Svelte/Vite 起始套件

Svelte 是一個可以編譯成小型套件的框架，非常適合用於永久網頁。作為開發者，我們重視開發體驗和使用者體驗。此套件使用 `vite` 打包系統，為開發者提供優秀的開發體驗。

## 使用 Svelte、Vite 和 TypeScript 安裝 Vite

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

## 專案資訊

Vite 建構系統將您的 index.html 檔案放在根目錄中，這是您可以添加任何 CSS 或全局腳本相依的地方。欲了解更多有關 Vite 專案配置的資訊，請參閱 [Vite 文件](https://vitejs.dev/guide/#index-html-and-project-root)。

## 設置 hash-router

為了建立 hash-router，我們將使用 [tinro](https://github.com/AlexxNB/tinro)。`tinro` 是一個小型的聲明式路由庫，類似於 React Router。

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

## 設定 Svelte 使用 hash routing

在 `src/App.svelte` 檔案中，您可以將路由器配置為使用 hash 路由模式。

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main>

</main>
```

`router.mode.hash` 函式會啟用 hash 路由模式。
`router.subscribe` 回調函式將頁面重置到頂部以實現順暢的頁面轉換效果。

## 添加一些轉場元件

這些元件將在頁面路由時處理從一個頁面到另一個頁面的轉場效果。

在 `src` 目錄下創建一個名為 `components` 的子目錄，並添加以下兩個檔案：

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

> 此元件用於屏幕閱讀器在頁面變更時進行提示。

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

> 此元件在頁面轉場時添加淡入淡出效果。

## 添加路由到應用程式

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

將 Announcer 和 Transition 元件添加到我們的路由系統中，可以處理頁面轉場時的提示和動畫效果。

## 創建一些頁面

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

### 修改 `App.svelte`

```html
<script lang="ts">
  ...
  import Home from './home.svelte'
  import About from './about.svelte'
  
</script>
...
```

## 部署到永久網頁

### 生成錢包

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 安裝 bundlr

```sh
yarn add -D @bundlr-network/client
```

### 更新 package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### 執行部署

```sh
yarn deploy
```

::: tip 成功 
您現在在永久網頁上擁有一個 Svelte 應用程式！做得好！
:::

::: warning 為錢包充值資金
如果您的應用程式大小超過 120 KB，您需要為 bundlr 錢包充值資金。請參考 [https://bundlr.network](https://bundlr.network) 以獲取更多資訊。
:::

## 存放庫

您可以在此處找到此示例的完整版本：[https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## 總結

這是在永久網頁上發布 Svelte 應用程式的最小版本，但您可能需要更多功能，例如熱重新載入和 Tailwind 等。請查看 `hypar` 獲得一個即插即用的起始套件。[HypAR](https://github.com/twilson63/hypar)