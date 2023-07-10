---
locale: jp
---
# Svelte/Vite スターターキット

Svelteは、完全にコンパイルされるフレームワークで、小さなパッケージになるため、パーマウェブに最適です。我々開発者は、ユーザーエクスペリエンスと同じくらい、開発者エクスペリエンスも重視しています。このキットは、開発者たちに優れた開発者エクスペリエンスを提供するために、`vite` バンドルシステムを使用しています。

## SvelteとTypeScriptでviteをインストールする

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

## プロジェクト情報

viteビルドシステムは、index.htmlファイルをルートディレクトリに配置します。必要に応じて、ここにCSSやグローバルなスクリプトの依存関係を含めることができます。viteプロジェクトのレイアウトについての詳細は、[viteドキュメント](https://vitejs.dev/guide/#index-html-and-project-root)を参照してください。

## hash-routerの設定

hash-routerの設定には、[tinro](https://github.com/AlexxNB/tinro)を使用します。`tinro`は、React Routerに似た、小さな宣言的なルーティングライブラリです。

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

## Svelteにハッシュルーティングを使用するように指定する

`src/App.svelte`ファイルで、ルーターをハッシュルーティングモードで設定します。

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main>

</main>
```

`router.mode.hash`関数はハッシュルーターモードを有効にします。
`router.subscribe`コールバックは、ページの移動時にページを上部にリセットするために便利です。

## いくつかのトランジションコンポーネントを追加する

これらのコンポーネントは、ルーティング時に1つのページから別のページへのトランジションを管理します。

`src`ディレクトリの下に`components`ディレクトリを作成し、次の2つのファイルを追加します：

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

> このコンポーネントは、ページの変更が行われたことをスクリーンリーダーで通知するためのものです。

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

> このコンポーネントは、ページ遷移にフェード効果を追加します。

## アプリケーションにルートを追加する


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

AnnouncerとTransitionコンポーネントをルーティングシステムに追加することで、ページの遷移を通知し、トランジションをアニメーション化します。

## ページを作成する

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

### `App.svelte`を変更する

```html
<script lang="ts">
  ...
  import Home from './home.svelte'
  import About from './about.svelte'
  
</script>
...
```

## Permawebにデプロイする

### ウォレットの生成

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### bundlrをインストールする

```sh
yarn add -D @bundlr-network/client
```

### package.jsonを更新する

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### デプロイを実行する

```sh
yarn deploy
```

::: tip SUCCESS 
これでPermaweb上にSvelteアプリケーションが作成されました！お疲れ様でした！
:::

::: warning ウォレットの資金調達
アプリケーションが120 KBを超える場合は、bundlrウォレットを資金調達する必要があります。詳細については、[https://bundlr.network](https://bundlr.network)を参照してください。
:::

## レポジトリ

この例の完全なバージョンはこちらで入手できます：[https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## 要約

これはパーマウェブ上でSvelteアプリケーションを公開するための最小限のバージョンですが、ホットリローディングやtailwindなどの追加機能が必要な場合があります。[HypAR](https://github.com/twilson63/hypar)をチェックして、雛形のスターターキットを参照してください。