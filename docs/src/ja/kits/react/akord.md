---
locale: ja
---
# Vite と Akord を使った React スターターキット

このガイドでは、開発環境を設定し、パーマウェブ React アプリケーションを構築してデプロイするためのステップバイステップの流れを紹介します。

## 前提条件

- 基本的な TypeScript の知識（必須ではありません） - [https://www.typescriptlang.org/docs/](Learn Typescript)
- NodeJS v16.15.0 以上 - [https://nodejs.org/en/download/](Download NodeJS)
- ReactJS の知識 - [https://reactjs.org/](Learn ReactJS)
- Git および一般的なターミナルコマンドの知識

## 開発依存関係

- TypeScript
- NPM または Yarn パッケージマネージャー

## ステップ

### React アプリを作成する


```sh
yarn create vite my-arweave-app --template react-ts
cd my-arweave-app
yarn
```

### React Router DOM を追加

```sh
yarn add react-router-dom
```

Arweave で動作するアプリを作成するために、ハッシュルーターを使用する必要があります。

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

#### App.tsx の修正

異なるページを管理するために App.tsx を更新する必要があります。

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

#### Modify index.css

Alter the `body` selector

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

```sh
yarn dev
```

### Building React App

#### Modify vite.config.ts

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

### Publishing to Arweave

### Install Akord CLI

> Requires NodeJS - https://nodejs.org

```sh
yarn global add @akord/akord-cli
```

### Login to Akord (you can create an account [here](https://v2.akord.com/signup))

```sh
akord login {your_email_address}
```

### Deploy your app

```sh
akord deploy ./dist 'My perma app'
```

### おめでとう！

あなたはパーマウェブ上に React アプリケーションを公開しました！このアプリは永遠にホストされます！

## リソースとさらなる学習

- [レシピ](https://github.com/Akord-com/recipes) - Arweave ブロックチェーンと簡単に対話する方法を学ぶ
- [Akord CLI](https://github.com/Akord-com/akord-cli)

