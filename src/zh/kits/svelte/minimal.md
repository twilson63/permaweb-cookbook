---
locale: zh
---

# 极简的 Svelte 入门套件

本指南将逐步指导您配置开发环境，以构建和部署一个永久网络应用程序。

## 先决条件

-   熟悉 Typescript
-   NodeJS v18 或更高版本
-   了解 Svelte - [https://svelte.dev](https://svelte.dev)
-   了解 git 和常用终端命令

## 开发依赖

-   TypeScript
-   esbuild
-   w3
-   yarn `npm i -g yarn`

## 步骤

### 创建项目

```sh
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

## 创建 buildscript.js

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

//确保目录存在，以便在文件放入其中之前创建目录
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

//使用基本html文件进行测试
fs.copyFileSync("./index.html", "./dist/index.html");
```

## 修改 package.json

将`type`设置为`module`
添加构建脚本

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## 创建`src`目录和一些源文件

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

## Main.ts

```ts
import App from "./app.svelte";

new App({
	target: document.body,
});
```

## app.svelte

```html
<script lang="ts">
	import { Route, router } from "tinro";
	import Counter from "./counter.svelte";
	import About from "./about.svelte";

	//添加用于永久网络支持的哈希路由
	router.mode.hash();
</script>
<nav><a href="/">Home</a> | <a href="/about">About</a></nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info **哈希路由**
您会注意到脚本会话中的`router.mode.hash()`设置，这在配置应用程序使用基于哈希的路由时是很重要的。这使得将应用程序运行时能够支持 URL 路径（如`https://[gateway]/[TX]`）。
:::

## counter.svelte

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

## about.svelte

```html
<h1>About Page</h1>
<p>Minimal About Page</p>
<a href="/">Home</a>
```

## 部署

### 生成钱包

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 安装 Irys

```sh
yarn add -D @irys/sdk
```

### 更新 package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### 运行部署

```sh
yarn deploy
```

::: tip **成功**
您现在应该在永久网络上拥有一个 Svelte 应用程序！做得好！
:::

::: warning **资金钱包**
如果您的应用程序大于 120 KB，您将需要为您的 Irys 钱包提供资金。请参阅[https://irys.xyz](https://irys.xyz)获取更多信息。
:::

## 代码库

这个示例的完整版本在这里可用：[https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## 总结

这是一个在永久网络上发布 Svelte 应用程序的最简版本，但您可能想要更多功能，比如热重载和 tailwind 等。请参考`hypar`，了解即插即用的入门套件。[HypAR](https://github.com/twilson63/hypar)
