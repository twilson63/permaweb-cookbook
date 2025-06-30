---
locale: ja
---
# Vue スターターキットの作成

このガイドでは、開発環境を設定し、パーマウェブ Vue アプリケーションを構築するための手順を提供します。

## 前提条件

- 基本的な TypeScript の知識（必須ではありません） - [TypeScript を学ぶ](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 以上 - [NodeJS をダウンロード](https://nodejs.org/en/download/)
- Vue.js（できれば Vue 3）の知識 - [Vue.js を学ぶ](https://vuejs.org/)
- Git と一般的なターミナルコマンドを知っていること

## 開発依存関係

- TypeScript（オプション）
- NPM または Yarn パッケージマネージャ

## 手順

### プロジェクトを作成する

次のコマンドは、Vue プロジェクト用の公式スキャフォールディングツールである create-vue をインストールして起動します。

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm init vue@latest
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn create vue
```

  </CodeGroupItem>
</CodeGroup>

プロセス中に、TypeScriptやテストサポートなどのオプション機能を選択するように求められます。`Vue Router`を「はい」で選択することをお勧めします。他はお好みに応じて選択してください。


```console:no-line-numbers
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / *Yes*
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

### Change into the Project Directory

```sh
cd <your-project-name>
```

### Install Dependencies

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn
```

  </CodeGroupItem>
</CodeGroup>

### ルーターの設定

Vue RouterはVue.jsの公式ルーターで、Vueとシームレスに統合されます。パーマウェブで機能させるために、ブラウザの履歴ルーターからハッシュルーターに切り替えます。URLはサーバーに送信できないため、`src/router/index.ts`または`src/router/index.js`ファイルで`createWebHistory`を`createWebHashHistory`に変更します。

```ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
	],
});

export default router;
```

### ビルドの設定

`vite.config.ts`または`vite.config.js`ファイルでビルドプロセスを設定します。パーマウェブアプリをサブパス（https://[gateway]/[TX_ID]）から提供するために、設定ファイルのbaseプロパティを./に更新します。


```ts
export default defineConfig({
  base: './',
  ...
})
```

### アプリを実行する

先に進む前に、すべてが正しく機能していることを確認することが重要です。スムーズに進行するためにチェックを実行してください。

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
デフォルトでは、ローカルで新しい開発サーバーが開始され、`PORT 5173`を使用します。このポートがすでに使用されている場合、ポート番号を1増やして（`PORT 5174`）再試行します。

## 永続的にデプロイ

### ウォレットを生成する

ウォレットを生成するために`arweave`パッケージが必要です。

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

### ウォレットに資金を供給する

ウォレットにArDrive Turboクレジットを供給する必要があります。これを行うには、[ArDrive](https://app.ardrive.io)にアクセスし、ウォレットをインポートします。次に、ウォレットのためにターボクレジットを購入できます。

### Permaweb-Deployを設定する


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

今、ビルドを生成する時が来ました。次のコマンドを実行します。

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

最後に、最初のパーマウェブアプリケーションをデプロイします。

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
`Insufficient funds`というエラーが表示された場合は、デプロイ用のウォレットにArDrive Turboクレジットを供給するのを忘れていないことを確認してください。
:::

### 応答

次のような応答が表示されるはずです。


```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたのVueアプリは`https://arweave.net/<< tx-id >>`で見つけることができます。

::: tip SUCCESS
これで、パーマウェブ上にVueアプリケーションができました！お疲れ様です！
:::

## リポジトリ

JavaScriptまたはTypeScriptでの完全な機能例は、以下の場所で見つけることができます。

- リポジトリ: [https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## まとめ

このガイドでは、Create Vueを使用してパーマウェブにVue.jsアプリを公開するためのシンプルな手順を提供します。追加機能が必要な場合は、ガイドにリストされている代替スターターキットを探索して、要件に合ったソリューションを見つけることを検討してください。