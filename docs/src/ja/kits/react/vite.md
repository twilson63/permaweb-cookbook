---
locale: ja
---
# Vite スターターキット

このガイドでは、Permaweb の React アプリケーションを構築してデプロイするために、開発環境を設定する手順を説明します。

## 前提条件

-   基本的な TypeScript の知識（必須ではありません） - [https://www.typescriptlang.org/docs/](TypeScript を学ぶ)
-   NodeJS v16.15.0 以上 - [https://nodejs.org/en/download/](NodeJS をダウンロード)
-   ReactJS の知識 - [https://reactjs.org/](ReactJS を学ぶ)
-   Git と一般的なターミナルコマンドの知識

## 開発依存関係

-   TypeScript
-   NPM または Yarn パッケージマネージャ

## 手順

### プロジェクトの作成

TypeScript に不慣れな場合は、テンプレート「react」を使用できます（`--template react`）。
<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm create vite@latest my-arweave-app -- --template react-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create vite my-arweave-app --template react-ts
```

  </CodeGroupItem>
</CodeGroup>

### Change into the Project Directory

```sh
cd my-arweave-app
```

### Install react-router-dom

You have to install this package to manage routing between different pages

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install react-router-dom --save
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add react-router-dom -D
```

  </CodeGroupItem>
</CodeGroup>

### Run the App

Now we need to check if everything is going Perfect before jumping into next Step, Run
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn dev
```

  </CodeGroupItem>
</CodeGroup>

デフォルトでは、ローカルマシン上で新しい開発サーバーが開始され、`PORT 3000` が使用されます。このポートがすでに使用中の場合、ターミナルで利用可能な別のポートに切り替えるように求められることがあります。

### ウォレットの種類を設定

[Wander](https://wander.app)、[Arweave.app](https://arweave.app) または他のブラウザベースのウォレットを使用したい場合は、`window.arweaveWallet` の宣言を持つ Wander のタイプパッケージをインストールできます。


<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install Wander -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add Wander -D
```

  </CodeGroupItem>
</CodeGroup>

After installing the package, you'll need to add it to your `src/vite-env.d.ts` file.

```ts
/// <reference types="Wander" />
```

### Setup Routing

Now modify the application and add a new routes such as an about page, first create 2 more .tsx files. (if you have used the vanilla JS react template, then make sure your component file extension should be `.jsx or .js`)

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

#### HomePage.tsx

```ts
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			Welcome to the Permaweb!
			<Link to={"/about/"}>
				<div>About</div>
			</Link>
		</div>
	);
}

export default HomePage;
```

#### About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
	return (
		<div>
			Welcome to the About page!
			<Link to={"/"}>
				<div>Home</div>
			</Link>
		</div>
	);
}

export default About;
```

#### Modify App.tsx

We need to update the App.tsx to manage different pages

```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

::: info ハッシュルーティング
ルートを HashRouter でラップし、react-router-dom の Link コンポーネントを使用してリンクを構築していることに注意してください。
これは現在の状態の Permaweb では重要であり、アプリケーションが `https://[gateway]/[TX]` のようなパスで提供されるため、ルートが適切に機能することを保証します。
:::

## 永続的にデプロイ

### ウォレットを生成する

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

### vite 設定の更新

vite 設定オブジェクトに `base` プロパティを追加し、空の文字列に設定してください。

vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
})
```

### Irys のセットアップ

アプリを Permaweb にデプロイするために Irys が必要です。Irys は即時データのアップロードと取得を提供します。

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

::: info
このウォレットに AR を追加し、Irys ウォレットに資金を供給する必要があります。このアプリをアップロードできるようにするためです。詳細については [https://irys.xyz](https://irys.xyz) と [https://www.arweave.org/](https://www.arweave.org/) をご覧ください。
:::

### Update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir ./dist -h https://node2.irys.xyz --wallet ./wallet.json -t arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### Run build

Now its time to Generate Build

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

Finally we are good to deploy our First Permaweb Application

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

::: tip SUCCESS
これで Permaweb 上に React アプリケーションができました！素晴らしい仕事です！
:::

::: tip ERROR
もしこのエラー `データを送信するための資金が不足しています` が表示された場合は、ウォレットにいくらかの AR を資金を供給し、その後再度デプロイを試みてください。
:::

## Irys アカウントに資金を供給する方法

### 残高を確認


```console:no-line-numbers
irys balance [Address] -h https://node2.irys.xyz -t arweave
```

Fund Irys

```console:no-line-numbers
irys fund 20000000000 -t arweave -h https://node2.irys.xyz -w ./wallet.json
```

::: tip INFO
資金が Irys アカウントに入金されるまでに約 20 ～ 30 分かかります。
:::


