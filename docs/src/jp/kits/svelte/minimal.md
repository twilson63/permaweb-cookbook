---
locale: jp
---
# 最小のSvelteスターターキット

このガイドでは、ステップバイステップの流れで、開発環境を設定してパーマウェブアプリケーションをビルドおよびデプロイする方法について説明します。

## 必要条件

* TypeScriptの知識
* NodeJS v18以上
* Svelteの知識 - [https://svelte.dev](https://svelte.dev)
* gitと一般的なターミナルコマンドの知識

## 開発に必要な依存関係

* TypeScript
* esbuild
* w3
* yarn `npm i -g yarn`

## 手順

### プロジェクトの作成

```sh
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

## buildscript.jsの作成

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

//必要なディレクトリが存在することを確認してからファイルを作成する
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

//基本的なhtmlファイルをテストに使用する
fs.copyFileSync("./index.html", "./dist/index.html");

```


## package.jsonの編集

`type`を`module`に設定してください
ビルドスクリプトを追加します

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## `src`ディレクトリおよびいくつかのsrcファイルの作成

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

## Main.ts

```ts
import App from './app.svelte'

new App({
  target: document.body
})
```

## app.svelte

```html
<script lang="ts">
import { Route, router } from 'tinro'
import Counter from './counter.svelte'
import About from './about.svelte'

//パーマウェブサポートのためにハッシュルーティングを追加
router.mode.hash()

</script>
<nav>
<a href="/">Home</a> | <a href="/about">About</a>
</nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info ハッシュルーティング
スクリプトセッションで`router.mode.hash()`の設定を確認できますが、これはアプリケーションがハッシュベースのルーティングを使用するように設定するために重要です。これにより、`https://[gateway]/[TX]`のようなパスでアプリケーションを実行する場合にURLサポートが可能になります。
:::


## counter.svelte

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
```

## about.svelte

```html
<h1>About Page</h1>
<p>Minimal About Page</p>
<a href="/">Home</a>
```

## デプロイ 

### ウォレットの生成

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### bundlrのインストール

```sh
yarn add -D @bundlr-network/client
```

### package.jsonの更新

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### デプロイの実行

```sh
yarn deploy
```

::: tip 成功 
これでPermaweb上にSvelteアプリケーションがあるはずです！お疲れさまでした！
:::

::: warning ウォレットの資金供給
アプリケーションが120 kbを超える場合、資金の供給が必要です。詳細については、[https://bundlr.network](https://bundlr.network)を参照してください。
:::

## リポジトリ

この例の完成版はこちらから入手できます：[https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## 概要

これはSvelteアプリケーションをパーマウェブ上に公開する最小のバージョンですが、ホットリローディングやTailwindなどの他の機能が必要な場合は、`hypar`をチェックしてください。[HypAR](https://github.com/twilson63/hypar)