# Svelte/Vite 入門套件

Svelte 是一個會把框架編譯移除的框架，產生的小型封包非常適合 Permaweb。身為開發者，我們同等重視開發體驗（Dev Experience）與使用者體驗（User Experience）。本套件使用 `vite` 打包系統，提供開發者出色的開發體驗（DX）。

## 使用 Svelte 與 TypeScript 安裝 vite

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

vite 建構系統會將你的 index.html 檔案放在專案根目錄；若需要，可在此加入任何 CSS 或全域腳本依賴。欲了解更多有關 vite 專案結構的資訊，請參閱 [vite 文件](https://vitejs.dev/guide/#index-html-and-project-root)

## 設定 hash 路由

要設定 hash 路由我們會使用 [tinro](https://github.com/AlexxNB/tinro)。`tinro` 是一個輕量的宣告式路由庫，類似於 React Router。

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

## 告訴 Svelte 使用 hash 路由

在 `src/App.svelte` 檔案中，將路由器設定為使用 hash 路由模式。

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 函式會啟用 hash 路由模式。`router.subscribe` 的回呼用來在頁面切換時將頁面捲動回頂端。

## 新增過渡（transition）元件

這些元件會在路由切換時管理頁面之間的過渡效果。

在 `src` 目錄下建立一個名為 components 的資料夾，並加入以下兩個檔案：

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

> 此元件用於讓螢幕閱讀器在頁面變更時進行宣告

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

> 此元件為頁面切換新增淡入淡出過渡效果

## 為應用程式新增路由

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

將 Announcer 和 Transition 元件加入路由系統後，會同時處理頁面切換的宣告以及切換動畫。

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

## 部署到 Permaweb

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

接著在終端機執行以下指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 為錢包加值

您需要為錢包加值 ArDrive Turbo 點數。請前往 [ArDrive](https://app.ardrive.io) 並匯入您的錢包，接著即可為該錢包購買 Turbo 點數。

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
請將 << ANT-PROCESS >> 替換為您的 ANT process id。
:::

### 執行建置

現在開始產生建置，執行

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

最後，我們已準備好部署第一個 Permaweb 應用程式

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
如果收到 `Insufficient funds` 錯誤，請確認已為部署錢包加值 ArDrive Turbo 點數。
:::

### 回應

您應該會看到類似以下的回應：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

您的 Svelte 應用程式可在 `https://arweave.net/<< tx-id >>` 存取。

::: tip SUCCESS
您現在應該已在 Permaweb 上擁有一個 Svelte 應用程式！做得好！
:::

## 總結

這是在 Permaweb 上發佈 Svelte 應用程式的最小流程範例，但你或許會想要更多功能，例如熱重載（hot-reloading）與 Tailwind 等。可參考 `hypar` 作為開箱即用的起始套件。詳見 [HypAR](https://github.com/twilson63/hypar)
