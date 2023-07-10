---
locale: jp
---
# Vue スターターキットの作成

このガイドでは、開発環境の設定と Permaweb Vue アプリケーションのビルド手順をステップバイステップで説明します。

## 必要条件

- TypeScript の基本知識（必須ではありません）- [TypeScript の学習](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 以上- [NodeJS のダウンロード](https://nodejs.org/en/download/)
- Vue.js の知識（できれば Vue 3）- [Vue.js の学習](https://vuejs.org/)
- git と一般的なターミナルコマンドの知識

## 開発に必要な依存関係

- TypeScript（オプション）
- NPM または Yarn パッケージマネージャー

## 手順

### プロジェクトの作成

以下のコマンドを実行すると、公式の Vue プロジェクトのスキャフォールディングツールである create-vue がインストールされ起動します。

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

このプロセス中に、TypeScript やテストサポートなどのオプション機能を選択するよう求められます。 `Vue Router` は「はい」を選択することをお勧めします。他のオプションは好みに応じて選択してください。

```console:no-line-numbers
✔ プロジェクト名: … <your-project-name>
✔ TypeScript を追加しますか？ … No / Yes
✔ JSX サポートを追加しますか？ … No / Yes
✔ シングルページアプリケーションの開発に Vue Router を追加しますか？ … No / *Yes*
✔ 状態管理のために Pinia を追加しますか？ … No / Yes
✔ ユニットテストのために Vitest を追加しますか？ … No / Yes
✔ ユニットテストおよび E2E テストのために Cypress を追加しますか？ … No / Yes
✔ コード品質のために ESLint を追加しますか？ … No / Yes
✔ コードフォーマットのために Prettier を追加しますか？ … No / Yes
```

### プロジェクトディレクトリに移動

```sh
cd <your-project-name>
```

### 依存関係のインストール

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

### ルーターのセットアップ

Vue Router は Vue.js の公式ルーターであり、Vue とシームレスに統合されます。Permaweb と連携するためには、URL をサーバーに送信できないため、ブラウザの履歴ルーターからハッシュルーターに切り替えます。`src/router/index.ts` または `src/router/index.js` ファイルで `createWebHistory` を `createWebHashHistory` に変更します。

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

### ビルドのセットアップ

`vite.config.ts` または `vite.config.js` ファイルでビルドプロセスを設定します。Permaweb アプリをサブパス（https://[gateway]/[TX_ID]）から提供するために、設定ファイルの `base` プロパティを `./` に変更します。

```ts
export default defineConfig({
  base: './',
  ...
})
```

### アプリケーションの実行

次に進む前に、すべてが正常に動作していることを確認するためにチェックを実行することが重要です。

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
これにより、デフォルトでローカルマシン上で新しい開発サーバーが起動します。デフォルトでは `PORT 5173` を使用しますが、このポートが既に使用中の場合は、ポート番号が 1 つ増えて (`PORT 5174`) 再試行されます。

## デプロイ

### ウォレットの生成
ウォレットを生成するためには、`arweave` パッケージが必要です。

<CodeGroup>
  <CodeGroupItem title="NPM">

  ```console:no-line-numbers
  npm install --save arweave
  ```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

  ```console:no-line-numbers
  yarn add arweave

  ```

  </CodeGroupItem>
</CodeGroup>

ターミナルで以下のコマンドを実行してウォレットを生成します：
```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### bundlr のインストール

Permaweb にアプリをデプロイするためには、瞬時のデータのアップロードと取得が可能な bundlr が必要です。

<CodeGroup>
  <CodeGroupItem title="NPM">

  ```console:no-line-numbers
  npm install --save-dev @bundlr-network/client
  ```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

  ```console:no-line-numbers
  yarn add -D @bundlr-network/client
  ```

  </CodeGroupItem>
</CodeGroup>

::: info Arweave ウォレット
このアプリをアップロードするには、AR を追加し、Bundlr ウォレットに資金を提供する必要がある場合があります。詳細については [https://bundlr.network](https://bundlr.network) と [https://www.arweave.org/](https://www.arweave.org/) をご覧ください。
:::

### package.json の更新

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### .gitignore の更新

資金を保護するために、ウォレットファイルをプライベートに保つことは重要です。GitHub にアップロードして公開される可能性があるため、資金が漏洩する可能性があります。これを防ぐために、`wallet.json` ファイルを `.gitignore` ファイルに追加します。保存場所を確実にしておくことも忘れないでください。

```sh
echo "wallet.json" >> .gitignore
```

### ビルドの実行

ビルドを生成する準備ができました。

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

最後に、最初の Permaweb アプリケーションをデプロイする準備が整いました。

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
これで Permaweb 上に Vue アプリケーションが作成されました！お疲れ様でした！
:::

::: warning ウォレットへの資金追加
アプリケーションのサイズが 120 KB を超える場合やエラー `Not enough funds to send data` を受け取った場合は、Bundlr ウォレットに資金を追加する必要があります。詳細については [https://bundlr.network](https://bundlr.network) をご覧ください。
:::

## リポジトリ

JavaScript や TypeScript の完全に機能する例は、次の場所で見つけることができます。

* リポジトリ: [https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## 要約

このガイドは、Create Vue を使用して Vue.js アプリケーションを Permaweb に公開するためのシンプルなステップバイステップの手法を提供しています。追加の機能が必要な場合は、ガイドにリストされている代替のスターターキットを探して、要件に適した解決策を見つけてみてください。