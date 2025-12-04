# Svelte/Vite スターターキット

Svelte はコンパイル時にフレームワークが取り除かれ、小さなパッケージになるフレームワークで、Permaweb に最適です。開発者として、我々はユーザー体験（UX）と同様に開発者体験（Dev Experience / DX）を重視します。このキットは開発者に優れた DX を提供するために `vite` バンドルシステムを使用しています。

## `vite` を `svelte` と `typescript` でインストールする

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

`vite` ビルドシステムは `index.html` ファイルをルートディレクトリに配置します。ここに必要に応じて CSS やグローバルなスクリプト依存関係を含めます。`vite` のプロジェクトレイアウトの詳細は [vite のドキュメント](https://vitejs.dev/guide/#index-html-and-project-root) を参照してください。

## ハッシュルーターのセットアップ

ハッシュルーターをセットアップするために [tinro](https://github.com/AlexxNB/tinro) を使用します。`tinro` は React Router に似た小さな宣言的ルーティングライブラリです。

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

## Svelte にハッシュルーティングを使わせる

`src/App.svelte` ファイルで、ルーターをハッシュルーティングモードに設定します。

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 関数はハッシュルーターモードを有効にします。  
`router.subscribe` のコールバックはページ遷移時にページをトップにリセットするために便利です。

## トランジションコンポーネントの追加

これらのコンポーネントはルーティング時にあるページから別のページへ移動する際のトランジションを管理します。

`src` ディレクトリの下に `components` というディレクトリを作成し、以下の 2 つのファイルを追加してください。

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

> このコンポーネントはページが変更されたときにスクリーンリーダー向けにアナウンスするためのものです

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

> このコンポーネントはページ遷移にフェードを追加します

## アプリにルートを追加する

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

Announcer と Transition コンポーネントをルーティングシステムに追加することで、ページ遷移のアナウンスと遷移アニメーションを処理します。

## ページを作成する

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

### `App.svelte` を修正する

```html
<script lang="ts">
  ...
  import Home from './home.svelte'
  import About from './about.svelte'
</script>
...
```

## 永続的にデプロイする

### ウォレットを生成する

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

### ウォレットに資金を追加する

ウォレットに ArDrive Turbo クレジットで資金を追加する必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスしてウォレットをインポートしてください。  
その後、ウォレット用に Turbo クレジットを購入できます。

### Permaweb-Deploy をセットアップする

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

### vite.config.ts を更新する

```ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  base: "./",
});
```

### package.json を更新する

### package.json を更新する

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

### ビルドを実行する

ビルドを生成する準備ができました。次を実行します

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

### デプロイを実行する

最後に、最初の Permaweb アプリケーションをデプロイします

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

::: info エラー
`Insufficient funds` エラーが発生した場合は、デプロイ用ウォレットに ArDrive Turbo クレジットをチャージしたことを確認してください。
:::

### レスポンス

次のような応答が表示されます：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたの Svelte アプリは `https://arweave.net/<< tx-id >>` で見つけることができます。

::: tip 成功
これで Permaweb 上に Svelte アプリケーションが存在するはずです！おめでとうございます！
:::

## まとめ

これは Permaweb に Svelte アプリケーションを公開するための最小限の手順ですが、ホットリロードや Tailwind などのより多くの機能が必要になる場合があります。ターンキーのスターターキットとして `hypar` をチェックしてください。 [HypAR](https://github.com/twilson63/hypar)
