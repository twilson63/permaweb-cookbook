---
locale: ja
---
# Create React App スターターキット

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

### プロジェクトを作成する

TypeScript に不慣れな場合は、追加のチェック `--template typescript` を除外できます。

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

### Change into the Project Directory

```sh
cd permaweb-create-react-app
```

### react-router-dom をインストールする

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


### アプリを実行する

次のステップに進む前に、すべてが正常に動作しているか確認する必要があります。次のコマンドを実行してください。
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
これにより、ローカルマシン上で新しい開発サーバーが起動します。デフォルトでは `PORT 3000` を使用します。このポートがすでに使用されている場合、ターミナルで別の利用可能なポートに切り替えるよう求められる場合があります。

### package.json を次の設定に変更する

```json
{
  ...
  "homepage": ".",
}
```

### ルーティングを設定する

アプリケーションを変更し、アバウトページなどの新しいルートを追加します。まず、2つの `.tsx` ファイルを作成します（`--template typescript` のチェックを除外した場合は、コンポーネントファイルの拡張子は `.jsx` または `.js` になります）。

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

#### App.tsx を修正する

異なるページを管理できるように App.tsx を更新する必要があります。

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

::: info Hash ルーティング
ルートを HashRouter でラップし、react-router-dom の Link コンポーネントを使用してリンクを構築していることに注意してください。これは、現状のパーマウェブでは重要です。これにより、アプリケーションが `https://[gateway]/[TX]` のようなパスで提供されるため、ルートが正しく機能することが保証されます。
:::

## 永続的にデプロイする

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

### ウォレットに資金を追加する
ArDrive Turbo クレジットでウォレットに資金を追加する必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスし、ウォレットをインポートします。その後、ウォレットのために Turbo クレジットを購入できます。

### Permaweb-Deploy を設定する


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

ビルドを生成する時間です。次のコマンドを実行します。

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
`Insufficient funds` のエラーが表示された場合、デプロイメント用のウォレットに ArDrive Turbo クレジットを追加するのを忘れないでください。
:::

### レスポンス

次のようなレスポンスが表示されるはずです：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたの React アプリは `https://arweave.net/<< tx-id >>` で見つけることができます。

::: tip SUCCESS
これで、Permaweb 上に React アプリケーションがあるはずです！素晴らしい仕事です！
:::

## リポジトリ

この例の完成版はここで入手できます：[https://github.com/VinceJuliano/permaweb-create-react-app](https://github.com/VinceJuliano/permaweb-create-react-app)

## まとめ

これは、Create React App を使用して Permaweb に React アプリを公開する方法です。Permaweb にアプリをデプロイする新しい方法を発見したり、このガイドに掲載されている他のスターターキットをチェックしたりできます！