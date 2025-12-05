# 极简 Svelte 启动套件

本指南将逐步引导您设置开发环境，以构建并部署一个 Permaweb 应用程序。

## 先决条件

- 熟悉 TypeScript
- NodeJS v18 或以上
- 熟悉 Svelte - [https://svelte.dev](https://svelte.dev)
- 熟悉 git 与常用终端命令

## 开发依赖

- TypeScript
- esbuild
- w3

## 步骤

### 创建项目

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

## 创建 buildscript.js

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

将 `type` 设置为 `module`，并新增 build 脚本

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## 创建 `src` 目录与一些 src 文件

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

::: info 哈希路由
您会在 script 段中看到 `router.mode.hash()` 设置，这一设置对于将应用程序配置为基于 hash 的路由非常重要，能在应用程序部署到如 `https://[gateway]/[TX]` 的路径时启用 URL 支持。
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

## 添加 index.html

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

### 生成钱包

我们需要使用 `arweave` 包来生成钱包

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

然后在终端执行下列指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 为钱包充值

您需要为钱包购买 ArDrive Turbo 点数。请前往 [ArDrive](https://app.ardrive.io) 导入您的钱包，然后为该钱包购买 turbo 点数。

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

现在开始生成 build，执行

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

最后，我们可以部署第一个 Permaweb 应用程序了

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

::: info 错误
如果收到 `Insufficient funds` 错误，请确认您已为部署用的钱包充值 ArDrive Turbo 点数。
:::

### 响应

您应该会看到类似以下的响应：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

您的 Svelte 应用程序可以通过 `https://arweave.net/<< tx-id >>` 访问。

::: tip 成功
恭喜！您现在应该已经在 Permaweb 上部署了一个 Svelte 应用程序！
:::

## 总结

这是一个在 Permaweb 上发布 Svelte 应用的极简说明；如果您想要更多功能，例如热重载 (hot-reloading)、Tailwind 等，建议查看 `hypar` 作为一个开箱即用的起始模板。 [HypAR](https://github.com/twilson63/hypar)
