# React Starter Kit w/vite & ArDrive

このガイドでは、permaweb React アプリケーションを構築およびデプロイするための開発環境をステップバイステップで設定する方法を説明します。

## 前提条件

- 基本的な TypeScript の知識（必須ではありません） - [Learn Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 以上 - [Download NodeJS](https://nodejs.org/en/download/)
- ReactJS の知識 - [Learn ReactJS](https://reactjs.org/)
- Git と一般的なターミナルコマンドの知識

## 開発用依存関係

- TypeScript
- NPM または Yarn パッケージマネージャ

## 手順

### Create React App

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

### React Router DOM を追加

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

Arweave 上で動作するアプリを作るために、hash-router を使用する必要があります。

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

異なるページを管理するために App.tsx を更新する必要があります

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

#### index.css の修正

`body` セレクタを変更します

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

プロジェクトを実行
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

#### vite.config.ts の修正

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
});
```

#### アプリをビルド

```sh
yarn build
```

### 永続的にデプロイする

#### ウォレットの生成

ウォレットを生成するために `arweave` パッケージが必要です

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

その後、ターミナルで以下のコマンドを実行します

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

#### ウォレットに資金を入れる

ArDrive Turbo クレジットでウォレットに資金を入れる必要があります。これを行うには、[ArDrive](https://app.ardrive.io) に入り、ウォレットをインポートしてください。
その後、ウォレット用に Turbo クレジットを購入できます。

#### Permaweb-Deploy の設定

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --save-dev permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add permaweb-deploy --dev --ignore-engines
```

  </CodeGroupItem>
</CodeGroup>

::: info
ウォレットに AR を追加し、Turbo クレジットで資金を供給する必要があります。これによりアプリをアップロードできるようになります。詳細は [Turbo SDK](https://github.com/ardriveapp/turbo-sdk) を参照してください。
:::

#### package.json の更新

```json
{
  ...
  "scripts": {
    ...
    "deploy": "npm run build && permaweb-deploy --arns-name my-react-app"
  }
  ...
}
```

::: info
`my-react-app` を実際の ArNS 名に置き換えてください。`--undername staging` のような追加オプションをステージング用に追加することもできます。
:::

#### ビルドを実行

ビルドを生成する時です、以下を実行します

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

#### デプロイを実行

最後に、Permaweb アプリケーションの最初のデプロイを行います

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

::: warning 資金不足
もし `Insufficient funds` エラーが発生した場合は、デプロイ用ウォレットに Turbo クレジットを入金したか確認してください。詳細は [Turbo SDK](https://github.com/ardriveapp/turbo-sdk) を参照してください。
:::

#### レスポンス

以下のようなレスポンスが表示されるはずです:

```shell
-------------------- DEPLOY DETAILS --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-react-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-react-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

あなたの React アプリは `https://my-react-app.arweave.net`（ArNS を使用している場合）または `https://arweave.net/abc123def456ghi789jkl012mno345pqr678stu901v` で確認できます。

::: tip 成功
これで Permaweb 上に React アプリケーションが公開されました！おめでとうございます！
:::

## おめでとうございます！

Permaweb 上に React アプリケーションを公開しました！
