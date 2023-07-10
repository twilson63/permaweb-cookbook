---
locale: jp
---
# Create React App スターターキット

このガイドでは、ステップバイステップのフローで、開発環境を設定してパーマウェブリアクトアプリケーションをビルドして展開する方法について説明します。

## 必要条件

- 基本的な TypeScript の知識 (必須ではありません) - [https://www.typescriptlang.org/docs/](TypeScript の学習)
- NodeJS v16.15.0 以上 - [https://nodejs.org/en/download/](NodeJS のダウンロード)
- ReactJS の知識 - [https://reactjs.org/](ReactJS の学習)
- git と一般的なターミナルのコマンドの知識

## 開発に必要な依存関係

- TypeScript
- NPM または Yarn パッケージマネージャ

## 手順

### プロジェクトの作成

もし TypeScript に慣れていない場合は、追加の `--template typescript` チェックを除外することができます。

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npx create-react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
</CodeGroup>

### プロジェクトディレクトリに移動

```sh
cd permaweb-create-react-app
```

### react-router-dom のインストール

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

### アプリケーションの実行

次のステップに進む前に、すべてが正常に動作するかを確認するために、以下のコマンドを実行します。

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm start
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn start
```

  </CodeGroupItem>
</CodeGroup>

これにより、ローカルのマシン上で新しい開発サーバーが起動します。デフォルトでは、`PORT 3000` が使用されます。
すでにこの PORT が使用中の場合は、他の利用可能な PORT に切り替えるようにターミナルで要求されることがあります。

### package.json を以下のように変更

```json
{
  ...
  "homepage": ".",
}
```

### ルーティングのセットアップ

アプリケーションを変更して、about ページなどの新しいルートを追加します。まず、2つの追加の .tsx ファイルを作成します（もし追加の `--template typescript` チェックを除外した場合、コンポーネントのファイル拡張子は `.jsx` または `.js` にする必要があります）。

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

#### App.tsx を変更

App.tsx を更新して異なるページを管理します。

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
ルートを HashRouter でラップし、react-router-dom の Link コンポーネントを使用してリンクを作成していることに注意してください。
現在の状態のパーマウェブではこれが重要です。これにより、アプリケーションが `https://[gateway]/[TX]` のようなパスで提供されるため、ルートが正常に機能するようになります。
:::

## 永久デプロイ

### ウォレットの生成

ウォレットを生成するために`arweave` パッケージが必要です。

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

その後、次のコマンドをターミナルで実行します。

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Bundlr の設定

アプリケーションをパーマウェブに展開するために Bundlr が必要です。これはインスタントデータのアップロードと取得を提供します。

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
このウォレットに AR を追加し、アプリをアップロードするためには、Bundlr ウォレットに資金を提供する必要があります。詳細については、[https://bundlr.network](https://bundlr.network) と [https://www.arweave.org/](https://www.arweave.org/) を参照してください。
:::

### package.json を更新

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir ./build -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### ビルドを実行

ビルドを生成するために次のコマンドを実行します。

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

最後に、初めてのパーマウェブアプリケーションを展開する準備が整いました。

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

::: tip 成功
これでパーマウェブ上に React アプリケーションが展開されました！お疲れ様でした！
:::

::: info エラー
`Not enough funds to send data` というエラーが表示された場合、Bundlr ウォレットに AR を追加し、もう一度デプロイを試みる必要があります。以下のコマンドを実行してください。
:::

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
bundlr fund 1479016 -h https://node1.bundlr.network -w wallet.json -c arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
bundlr fund 1479016 -h https://node1.bundlr.network -w wallet.json -c arweave
```

  </CodeGroupItem>
</CodeGroup>

::: info
上記の数 1479016 は、AR の最小単位であるウィンストンで表される AR の量です。Bundlr ウォレットに反映されるまで、しばらく時間がかかります。10〜20分後にもう一度デプロイを実行してください。
:::

## リポジトリ

この例の完成版は、こちらで入手できます: [https://github.com/VinceJuliano/permaweb-create-react-app](https://github.com/VinceJuliano/permaweb-create-react-app)

## 概要

これはパーマウェブ上に React アプリケーションを公開するための Create React App のバージョンです。パーマウェブでアプリを展開する新しい方法を発見したり、このガイドで他のスターターキットをチェックしたりすることができます！