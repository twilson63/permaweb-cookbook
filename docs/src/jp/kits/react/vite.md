---
locale: jp
---
# Viteスターターキット

このガイドでは、手順ごとに進めて、開発環境の設定からパーマウェブのReactアプリケーションのビルドとデプロイまでを説明します。

## 前提条件

- 基本的なTypeScriptの知識（任意）- [https://www.typescriptlang.org/docs/](TypeScriptの学習)
- NodeJS v16.15.0以上 - [https://nodejs.org/en/download/](NodeJSのダウンロード)
- ReactJSの知識 - [https://reactjs.org/](ReactJSの学習)
- gitと一般的なターミナルコマンドの知識

## 開発依存関係

- TypeScript
- NPMまたはYarnパッケージマネージャー

## 手順

### プロジェクトの作成

TypeScriptに慣れていない場合は、"react"（`--template react`）というテンプレートを使用できます。

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

### プロジェクトディレクトリに移動

```sh
cd my-arweave-app
```

### react-router-domのインストール

異なるページ間のルーティングを管理するために、このパッケージをインストールする必要があります。

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

### アプリの実行

次のステップに進む前に、すべてが正常に動作しているかどうかを確認するために、アプリを実行します。

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

これにより、デフォルトでローカルマシン上で新しい開発サーバーが起動します。デフォルトでは`PORT 3000`を使用しますが、このPORTが既に使用されている場合、別の利用可能なPORTに切り替えるように要求される場合があります。

### ウォレットのタイプを設定する

[ArConnect](https://arconnect.io)や[Arweave.app](https://arweave.app)などのブラウザベースのウォレットを使用したい場合は、ArConnectのタイプパッケージをインストールし、`window.arweaveWallet`の宣言を持つようにする必要があります。

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arconnect -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arconnect -D
```

  </CodeGroupItem>
</CodeGroup>

パッケージをインストールした後、`src/vite-env.d.ts`ファイルに追加する必要があります。

```ts
/// <reference types="arconnect" />
```

### ルーティングの設定

次は、アプリケーションを修正し、Aboutページなどの新しいルートを追加します。まず、2つの .tsx ファイルを作成します（バニラJSのReactテンプレートを使用した場合、コンポーネントのファイル拡張子は `.jsx` または `.js` であることを確認してください）。

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
      Permawebへようこそ！
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
      Aboutページへようこそ！
      <Link to={"/"}>
        <div>Home</div>
      </Link>
    </div>
  );
}

export default About;
```

#### App.tsxの修正

異なるページを管理するためにApp.tsxを更新する必要があります。

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
ルートをHashRouterでラップし、react-router-domのLinkコンポーネントを使用してリンクを作成しています。
現在のパーマウェブでは、アプリケーションは`https://[gateway]/[TX]`というパスで提供されるため、正しくルーティングが機能することを保証するために必要です。
:::

## 永続的なデプロイ

### ウォレットの生成

ウォレットを生成するために、`arweave`パッケージが必要です。

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

次に、次のコマンドをターミナルで実行します。

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### bundlrのセットアップ

PermawebにアプリをデプロイするためにBundlrが必要です。Bundlrは、データの即時アップロードと取得を提供します。

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global @bundlr-network/client
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

::: info
このウォレットにARを追加し、このアプリをアップロードするためにbundlrウォレットに資金を提供する必要があります。詳細については、[https://bundlr.network](https://bundlr.network)と[https://www.arweave.org/](https://www.arweave.org/)を参照してください。
:::

### package.jsonの更新

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir ./dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### ビルドの実行

ビルドを生成します。

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

### デプロイの実行

最後に、Permawebアプリケーションをデプロイします。

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
これでPermaweb上にReactアプリケーションができました！お疲れ様でした！
:::

::: error
もし `Not enough funds to send data` というエラーメッセージが表示された場合は、ウォレットに一定のARを資金として投入し、再度デプロイを試みる必要があります。
:::