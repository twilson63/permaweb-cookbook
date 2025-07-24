---
locale: zh
---

# Svelte/Vite 起始套件

Svelte 是一个可以编译成小型套件的框架，非常适合用于永久网页。作为开发者，我们重视开发体验和使用者体验。此套件使用 `vite` 打包系统，为开发者提供优秀的开发体验。

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

## 项目信息

Vite 构建后将 index.html 文件放在根目录中，这是您可以添加任何 CSS 或全局脚本依赖的地方。了解更多关于 Vite 项目配置的信息，请参阅 [Vite 文档](https://vitejs.dev/guide/#index-html-and-project-root)。

## 设置 hash-router

为了建立 hash-router，我们将使用 [tinro](https://github.com/AlexxNB/tinro)。tinro 是一个小型的声明式路由库，类似于 React Router。
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

## 设置 Svelte 使用 hash routing

在 `src/App.svelte` 文件中，您可以将路由器配置为使用 hash 路由模式。

```html
<script lang="ts">
	import { Route, router } from "tinro";
	router.mode.hash();
	router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 函数打开 hash 路由模式。
`router.subscribe` 回调函数将页面重置到顶部以实现顺畅的页面转换效果。

## 添加一些转场组件

这些组件将在页面路由时处理从一个页面到另一个页面的转场效果。

在 `src` 目录下创建一个名为 `components` 的子目录，并添加以下两个文件：

announcer.svelte

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

> 此组件用于屏幕阅读器在页面变更时进行提示。

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

> 此组件在页面转场时添加淡入淡出效果。

## 添加路由到应用程序

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

将 Announcer 和 Transition 元件添加到我们的路由系统中，可以处理页面转场时的提示和动画效果。

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

## 部署到永久网

### 生成钱包

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 安裝 Irys

```sh
yarn add -D @irys/sdk
```

### 更新 package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && irys upload-dir dist -h https://node2.irys.sdk --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### 执行部署

```sh
yarn deploy
```

::: tip 成功
您现在在永久网页上拥有一个 Svelte 应用程序！做得好！
:::

::: warning 為錢包充值資金
如果您的应用程序大小超过 120 KB，您需要为 Irys 钱包充值资金。请参考 [https://irys.sdk](https://irys.sdk) 以获取更多信息。
:::

## 代码库

您可以在此处找到此示例的完整版本：[https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## 总结

这是在永久网页上发布 Svelte 应用程序的最小版本，但您可能需要更多功能，例如热重新加载和 Tailwind 等。请查看 hypar 获取一个即插即用的起始套件。。[HypAR](https://github.com/twilson63/hypar)
