# Svelte/Vite 入门套件

Svelte 是一个在构建时移除框架运行时代码的框架，生成的小型包非常适合 Permaweb。作为开发者，我们同等重视开发体验（Dev Experience）与用户体验（User Experience）。本套件使用 `vite` 打包系统，提供开发者出色的开发体验（DX）。

## 使用 Svelte 与 TypeScript 安装 vite

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

## 项目信息

vite 构建系统会将你的 index.html 文件放在项目根目录；如有需要，可在此加入任何 CSS 或全局脚本依赖。要了解更多有关 vite 项目结构的信息，请参阅 [vite 文档](https://vitejs.dev/guide/#index-html-and-project-root)

## 设置 hash 路由

要设置 hash 路由我们会使用 [tinro](https://github.com/AlexxNB/tinro)。`tinro` 是一个轻量的声明式路由库，类似于 React Router。

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

## 告诉 Svelte 使用 hash 路由

在 `src/App.svelte` 文件中，将路由器设置为使用 hash 路由模式。

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 函数会启用 hash 路由模式。`router.subscribe` 的回调用于在页面切换时将页面滚动回顶部。

## 新增过渡（transition）组件

这些组件会在路由切换时管理页面之间的过渡效果。

在 `src` 目录下创建一个名为 components 的文件夹，并加入以下两个文件：

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

> 此组件用于让屏幕阅读器在页面变更时进行宣告

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

> 此组件为页面切换新增淡入淡出过渡效果

## 为应用程序新增路由

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

将 Announcer 和 Transition 组件加入路由系统后，会同时处理页面切换的宣告以及切换动画。

## 创建一些页面

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

### 生成钱包

我们需要 `arweave` 包来生成钱包

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

接着在终端执行以下指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 为钱包充值

您需要为钱包充值 ArDrive Turbo 点数。请前往 [ArDrive](https://app.ardrive.io) 并导入您的钱包，接着即可为该钱包购买 Turbo 点数。

### 设置 Permaweb-Deploy

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
请将 << ANT-PROCESS >> 替换为您的 ANT process id。
:::

### 执行构建

现在开始生成构建，执行

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

### 执行部署

最后，我们已准备好部署第一个 Permaweb 应用程序

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
如果收到 `Insufficient funds` 错误，请确认已为部署钱包充值 ArDrive Turbo 点数。
:::

### 响应

您应该会看到类似以下的响应：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

您的 Svelte 应用程序可在 `https://arweave.net/<< tx-id >>` 访问。

::: tip SUCCESS
您现在应该已在 Permaweb 上拥有一个 Svelte 应用程序！做得好！
:::

## 总结

这是在 Permaweb 上发布 Svelte 应用程序的最小流程示例，但你或许会想要更多功能，例如热重载（hot-reloading）与 Tailwind 等。可参考 `hypar` 作为开箱即用的起始套件。详见 [HypAR](https://github.com/twilson63/hypar)
