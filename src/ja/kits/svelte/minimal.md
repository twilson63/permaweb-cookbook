# Minimal Svelte Starter Kit

このガイドでは、Permaweb アプリケーションを構築してデプロイするための開発環境をステップバイステップで設定する方法を説明します。

## 前提条件

- TypeScript の知識
- NodeJS v18 以上
- Svelte の知識 - [https://svelte.dev](https://svelte.dev)
- git と一般的なターミナルコマンドの知識

## 開発依存関係

- TypeScript
- esbuild
- w3

## 手順

### プロジェクト作成

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

## package.json を変更

`type` を `module` に設定し、build スクリプトを追加します

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## `src` ディレクトリとソースファイルを作成

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
スクリプト内の `router.mode.hash()` 設定に注目してください。これはハッシュベースのルーティングを使用するようアプリケーションを設定するために重要です。これにより、`https://[gateway]/[TX]` のようなパス上でアプリケーションを実行した場合でも URL サポートが有効になります。
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

## index.html を追加

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

## 永続的にデプロイ

### ウォレット生成

ウォレットを生成するには `arweave` パッケージが必要です

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

その後、ターミナルで次のコマンドを実行します

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### ウォレットに資金を追加

ウォレットに ArDrive Turbo クレジットをチャージする必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスしてウォレットをインポートしてください。
その後、ウォレット用に Turbo クレジットを購入できます。

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

### vite.config.ts を更新

```ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  base: "./",
});
```

### package.json を更新

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
<< ANT-PROCESS >> をあなたの ANT プロセス ID に置き換えてください。
:::

### ビルドを実行

ビルドを生成します。次を実行してください

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

### デプロイを実行

最後に、Permaweb アプリケーションをデプロイします

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
`Insufficient funds` エラーが発生した場合は、デプロイ用ウォレットに ArDrive Turbo クレジットをチャージしたことを確認してください。
:::

### レスポンス

次のようなレスポンスが表示されるはずです:

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたの Svelte アプリは `https://arweave.net/<< tx-id >>` で見つけることができます。

::: tip SUCCESS
これで Permaweb 上に Svelte アプリケーションが公開されました。おめでとうございます！
:::

## まとめ

これは Permaweb に Svelte アプリケーションを公開するための最小構成の手順です。ホットリロードや Tailwind など、より多くの機能が必要な場合は、ターンキーのスターターキットである `hypar` をチェックしてください。 [HypAR](https://github.com/twilson63/hypar)
