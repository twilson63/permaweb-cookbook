---
locale: ja
---
# Minimal Svelte Starter Kit

このガイドでは、Permaweb アプリケーションを構築しデプロイするための開発環境を構成する手順を説明します。

## 前提条件

-   TypeScript の知識
-   NodeJS v18 以上
-   Svelte の知識 - [https://svelte.dev](https://svelte.dev)
-   Git と一般的なターミナルコマンドの知識

## 開発依存関係

-   TypeScript
-   esbuild
-   w3

## 手順

### プロジェクトの作成

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

Set `type` to `module`, add a build script

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
スクリプトセッションにある `router.mode.hash()` 設定に注意してください。これは、アプリケーションをハッシュベースのルーティングを使用するように構成するために重要です。これにより、アプリケーションを `https://[gateway]/[TX]` のようなパスで実行する際の URL サポートが可能になります。
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

## Add index.html

```html
<!doctype html>
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

## 永続的なデプロイ

### ウォレットの生成

ウォレットを生成するために `arweave` パッケージが必要です。

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

then run this command in the terminal

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### ウォレットに資金を追加
ウォレットに ArDrive Turbo クレジットを追加する必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスし、ウォレットをインポートします。
その後、ウォレットのためにターボクレジットを購入できます。

### Permaweb-Deploy のセットアップ

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

### Update vite.config.ts

```ts
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  base: './'
})
```

### Update package.json

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
Replace << ANT-PROCESS >> with your ANT process id.
:::

### Run build

Now it is time to generate a build, run

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

### Run deploy

Finally we are good to deploy our first Permaweb Application

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
資金不足のエラー `Insufficient funds` が表示された場合は、デプロイ用のウォレットに ArDrive Turbo クレジットを追加したことを確認してください。
:::

### 応答

次のような応答が表示されるはずです：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたの Svelte アプリは `https://arweave.net/<< tx-id >>` で見つけることができます。

::: tip SUCCESS
これで Permaweb に Svelte アプリケーションを持つことができました！素晴らしい仕事です！
:::

## リポジトリ

この例の完全なバージョンは、こちらで利用できます: [https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## まとめ

これは Permaweb に Svelte アプリケーションを公開するための最小限のバージョンですが、ホットリロードや Tailwind などの機能を追加したいかもしれません。その場合は、ターンキーのスターターキットである `hypar` をチェックしてください。 [HypAR](https://github.com/twilson63/hypar)