# Create Vue スターターキット

このガイドでは、開発環境を設定し、Permaweb 用の Vue アプリケーションをビルドするための手順を段階的に説明します。

## 前提条件

- 基本的な TypeScript の知識（必須ではありません） - [TypeScript を学ぶ](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 以上 - [NodeJS をダウンロード](https://nodejs.org/en/download/)
- Vue.js の知識（できれば Vue 3） - [Vue.js を学ぶ](https://vuejs.org/)
- git と一般的なターミナルコマンドの知識

## 開発依存

- TypeScript（任意）
- NPM または Yarn パッケージマネージャ

## 手順

### プロジェクトの作成

以下のコマンドは、公式の Vue プロジェクトスキャフォールディングツール create-vue をインストールして起動します。

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

処理の途中で、TypeScript やテストサポートなどのオプション機能を選択するよう求められます。`Vue Router` は yes を選択することを推奨します。その他はお好みで選択してください。

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

### プロジェクトディレクトリへ移動

```sh
cd <your-project-name>
```

### 依存関係をインストール

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

Vue Router は Vue.js の公式ルーターで、Vue とシームレスに統合されます。Permaweb で動作させるには、URL をサーバーに送信できないため、ブラウザヒストリールーターからハッシュルーターに切り替えてください。`src/router/index.ts` または `src/router/index.js` ファイル内で `createWebHistory` を `createWebHashHistory` に変更します。

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

### ビルド設定

`vite.config.ts` または `vite.config.js` ファイルでビルドプロセスを設定します。サブパス（https://[gateway]/[TX_ID]）から Permaweb アプリを配信するには、config ファイルの base プロパティを ./ に更新します。

```ts
export default defineConfig({
  base: './',
  ...
})
```

### アプリを実行

先に進む前に、すべてが正しく動作していることを確認することが重要です。問題なく進めるようにチェックを実行します。

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

デフォルトではローカルマシン上で新しい開発サーバーが起動します。既定の使用ポートは `PORT 5173` です。このポートが既に使用中の場合、ポート番号を 1 増やして（`PORT 5174`）再試行することがあります。

## 永続的にデプロイする

### ウォレットの生成

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

その後、ターミナルで次のコマンドを実行します。

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### ウォレットに資金を追加

ArDrive Turbo クレジットでウォレットに資金を追加する必要があります。これを行うには、[ArDrive](https://app.ardrive.io) にアクセスしてウォレットをインポートしてください。その後、ウォレット用の turbo クレジットを購入できます。

### Permaweb-Deploy の設定

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

### ウォレットへのチャージ

Turbo はデータを Arweave にアップロードするために Turbo Credits を使用します。Turbo Credits は複数の法定通貨や暗号トークンで購入できます。以下はウォレットに 10 USD をチャージする例です。購入手続きを完了するためにブラウザウィンドウが開き、Stripe を使用して支払いを完了します。

```console:no-line-numbers
npm install @ardrive/turbo-sdk
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

`wallet.json` はあなたの Arweave ウォレットへのパスに置き換えてください。

### package.json の更新

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

### ビルドを実行

ビルドを生成する時です。次を実行します。

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

最後に、Permaweb アプリケーションをデプロイします。

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
`Insufficient funds` エラーが表示された場合は、デプロイ用ウォレットに ArDrive Turbo クレジットをチャージしたことを確認してください。
:::

### レスポンス

次のようなレスポンスが表示されるはずです。

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

あなたの Vue アプリは `https://arweave.net/<< tx-id >>` で見つけることができます。

::: tip SUCCESS
これで Permaweb 上に Vue アプリケーションが公開されているはずです。お疲れさまでした！
:::

## まとめ

このガイドは Create Vue を使用して Vue.js アプリを Permaweb に公開するためのシンプルな手順を提供します。Tailwind などの追加機能が必要な場合は、ガイド内で紹介されている代替のスターターキットを検討し、要件に合ったソリューションを見つけてください。
