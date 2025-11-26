# Svelte/Vite Starter Kit

Svelte 是一個會在編譯時「消失」的框架，產生的小套件體積很小，非常適合用在 Permaweb。作為開發者，我們同樣重視開發體驗（Dev Experience）與使用者體驗（User Experience）。此套件使用 `vite` 打包系統，為開發者提供良好的 DX 體驗。

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

## 專案資訊

vite 的建置系統會將你的 index.html 檔放在專案根目錄，若需要，你可以在那裡包含任何 CSS 或全域腳本相依性。想了解更多 vite 的專案佈局，請參考 [vite 文件](https://vitejs.dev/guide/#index-html-and-project-root)

## 設定 hash-router

要設定 hash-router 我們會使用 [tinro](https://github.com/AlexxNB/tinro)。`tinro` 是一個輕量的聲明式路由庫，類似於 React Router。

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

## 告訴 Svelte 使用 hash routing

在 `src/App.svelte` 檔案中，你要將路由器設定為使用 hash routing 模式。

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 函式會啟用 hash 路由模式。
`router.subscribe` 的回呼在頁面轉換時將頁面捲動回頂端，體驗較佳。

## 新增一些過場元件

這些元件會在路由切換時管理頁面之間的過場動畫。

在 `src` 目錄下建立一個 components 目錄，然後新增以下兩個檔案：

### announcer.svelte

```html
<script>
  import { router } from "tinro";
  $: current = $router.path === "/" ? "Home" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">
  {#key current} Navigated to {current} {/key}
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

> 這個元件用於讓螢幕閱讀器在頁面變換時發出通知

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

> 這個元件為頁面過場加入淡入淡出的效果

## 將路由加入應用程式

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

將 Announcer 與 Transition 元件加入路由系統會處理頁面轉換時的通報與過場動畫。

## 建立一些頁面

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

### 修改 `App.svelte`

```html
<script lang="ts">
  ...
  import Home from './home.svelte'
  import About from './about.svelte'
</script>
...
```

## 永久部署

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

接著在終端機執行此指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 為錢包充值

你需要使用 ArDrive Turbo 點數為錢包充值。前往 [ArDrive](https://app.ardrive.io) 並匯入你的錢包，然後為你的錢包購買 turbo 點數。

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
將 << ANT-PROCESS >> 替換為你的 ANT process id。
:::

### 執行 build

現在該產生建置了，執行

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

最後我們可以部署第一個 Permaweb 應用程式了

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
如果你收到錯誤 `Insufficient funds`，請確認你是否已經使用 ArDrive Turbo 點數為部署用錢包充值。
:::

### 回應

你會看到類似以下的回應：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

你的 Svelte 應用程式可以在 `https://arweave.net/<< tx-id >>` 找到。

::: tip SUCCESS
你現在應該已經在 Permaweb 上擁有一個 Svelte 應用程式！做得好！
:::

## 總結

這是將 Svelte 應用發布到 Permaweb 的一個最小版本教學，但你可能會想要更多功能，例如熱重載或 tailwind 等。可以查看 `hypar` 以獲得一個開箱即用的入門套件。 [HypAR](https://github.com/twilson63/hypar)
