---
locale: ja
---
# Svelte/Vite スターターキット

Svelte は、余計なものをコンパイルし、コンパクトなパッケージを生成するフレームワークで、Permaweb に最適です。開発者として、私たちはユーザーエクスペリエンスと同じくらい、開発エクスペリエンス (DX) を重視しています。このキットは、開発者に素晴らしい DX 経験を提供するために `vite` バンドルシステムを使用しています。

## Svelte と TypeScript を使用した vite のインストール



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

vite のビルドシステムは、index.html ファイルをルートディレクトリに配置します。ここに必要に応じて CSS やグローバルスクリプトの依存関係を含めることができます。vite プロジェクトのレイアウトに関する詳細は、[vite ドキュメント](https://vitejs.dev/guide/#index-html-and-project-root)を参照してください。

## ハッシュルーターのセットアップ

ハッシュルーターをセットアップするために、[tinro](https://github.com/AlexxNB/tinro)を使用します。`tinro` は、React Router に似た小さな宣言型ルーティングライブラリです。

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

## Svelte にハッシュルーティングを使用するよう指示する

`src/App.svelte` ファイルで、ルーターをハッシュルーティングモードを使用するように設定します。

```html
<script lang="ts">
	import { Route, router } from "tinro";
	router.mode.hash();
	router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

`router.mode.hash` 関数は、ハッシュルーター モードをオンにします。
`router.subscribe` コールバックは、ページ遷移時にページを最上部にリセットするのに便利です。

## トランジション コンポーネントの追加

これらのコンポーネントは、ルーティング時に1ページから別のページへの遷移を管理します。

`src` ディレクトリの下に `components` というディレクトリを作成し、次の2つのファイルを追加します。

### announcer.svelte

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

> This component is for screen readers announcing when a page changes

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

> This component adds a fade to the page transition

## Adding Routes to the app

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

アナウンサーおよびトランジションコンポーネントをルーティングシステムに追加することで、ページ遷移のアナウンスと遷移のアニメーションを処理します。

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

### Modify `App.svelte`

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

`arweave` パッケージを使用してウォレットを生成する必要があります。

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

### ウォレットに資金を追加する
ウォレットに ArDrive Turbo クレジットを追加する必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスしてウォレットをインポートします。
その後、ウォレットのためにターボクレジットを購入できます。

### Permaweb-Deployの設定

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

### ビルドを実行する

今こそビルドを生成する時です。以下のコマンドを実行します。

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

最終的に、私たちは初めてのPermawebアプリケーションをデプロイする準備が整いました。
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
`Insufficient funds`というエラーが発生した場合は、デプロイ用のウォレットにArDrive Turboクレジットを資金供給したことを確認してください。
:::

### レスポンス

次のようなレスポンスが表示されるはずです：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

Your Svelte app can be found at `https://arweave.net/<< tx-id >>`.

::: tip SUCCESS
あなたは今、PermawebにSvelteアプリケーションを持っています！素晴らしい仕事です！
:::

## リポジトリ

この例の完成版は以下で入手できます: [https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## まとめ

これはPermawebにSvelteアプリケーションを公開するための最小限のバージョンですが、ホットリロードやTailwindなど、さらに多くの機能が欲しいかもしれません。ターンキーのスターターキットとして`hypar`をチェックしてください。 [HypAR](https://github.com/twilson63/hypar)