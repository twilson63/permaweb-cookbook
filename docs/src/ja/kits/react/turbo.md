---
locale: ja
---
# React Starter Kit w/vite & ArDrive

このガイドでは、Permaweb React アプリケーションを構築してデプロイするための開発環境を構成する手順を説明します。

## 前提条件

-   基本的な TypeScript の知識（必須ではありません） - [https://www.typescriptlang.org/docs/](TypeScriptを学ぶ)
-   NodeJS v16.15.0 以上 - [https://nodejs.org/en/download/](NodeJSをダウンロード)
-   ReactJS の知識 - [https://reactjs.org/](ReactJSを学ぶ)
-   git と一般的なターミナルコマンドの知識

## 開発依存関係

-   TypeScript
-   NPM または Yarn パッケージマネージャ

## 手順

### React アプリを作成する
<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm create vite my-arweave-app --template react-ts
cd my-arweave-app
npm install
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn create vite my-arweave-app --template react-ts
cd my-arweave-app
yarn
```

</CodeGroupItem>
</CodeGroup>

### Add React Router DOM

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm install react-router-dom
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn add react-router-dom
```

</CodeGroupItem>
</CodeGroup>


Arweave で動作するアプリを作成するには、ハッシュルーターを使用する必要があります。

### ページコンポーネント

```sh
touch src/Home.tsx src/About.tsx
```

src/Home.tsx

```tsx
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			Welcome to the Permaweb!
			<Link to={"/about/"}>
				<div>About</div>
			</Link>
		</div>
	);
}

export default Home;
```

src/About.tsx

```tsx
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

#### App.tsx を修正する

異なるページを管理できるように App.tsx を更新する必要があります。


```tsx
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

#### index.css を修正する

`body` セレクタを変更します。

```css
body {
  margin: 0;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  place-items: center;
  min-width: 100%;
  min-height: 100vh;
}
```

Run the project
<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm run dev
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn dev
```

</CodeGroupItem>
</CodeGroup>


### React アプリをビルドする

#### vite.config.ts を修正する


```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
})
```
#### Build App

```sh
yarn build
```

### 永続的にデプロイする

#### ウォレットを生成する

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

#### ウォレットに資金を追加する
ArDrive Turbo クレジットでウォレットに資金を追加する必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスし、ウォレットをインポートします。その後、ウォレットのために Turbo クレジットを購入できます。

#### Permaweb-Deploy を設定する

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

<!-- ::: info
You will need to add AR to this wallet and fund your Irys wallet to be able to upload this app. See [https://irys.xyz](https://irys.xyz) and [https://www.arweave.org/](https://www.arweave.org/) for more information.
::: -->

#### Update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "DEPLOY_KEY=$(base64 -i wallet.json) permaweb-deploy --ant-process << ANT-PROCESS >> "
  }
  ...
}
```

::: info
Replace << ANT-PROCESS >> with your ANT process id.
:::

#### Run build

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

#### デプロイを実行する

最後に、最初の Permaweb アプリケーションをデプロイします。



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
`Insufficient funds` エラーが表示された場合は、デプロイメント用のウォレットに ArDrive Turbo クレジットを追加したことを確認してください。
:::

#### 応答

以下のような応答が表示されるはずです：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたの React アプリは `https://arweave.net/<< tx-id >>` で見つけることができます。

::: tip SUCCESS
これで、Permaweb 上に React アプリケーションを持っていることになります！素晴らしい仕事です！
:::
### おめでとうございます！

あなたは Permaweb に React アプリケーションを公開しました！このアプリは永遠にホストされます！