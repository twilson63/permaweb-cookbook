---
locale: jp
---
# ギットハブアクション

::: danger
このガイドは教育目的のみであり、アプリケーションの展開方法のオプションを学ぶために使用する必要があります。このガイドでは、ホスト企業である`マイクロソフト`が所有する3rdパーティリソース`github`を信頼して、秘密情報を保護するために使用します。彼らのドキュメントでは、`libsodium sealed box`を使用してストア内の秘密情報を暗号化しています。彼らのセキュリティ慣行についての詳細情報は[こちら](https://docs.github.com/en/actions/security-guides/encrypted-secrets)で確認できます。
:::

Githubアクションは、開発者がgithubのワークフローシステムから生成されるイベントによって自動化タスクをトリガーするためのCI/CDパイプラインです。これらのタスクはほとんど何でもできます。このガイドでは、githubアクションを使用して、bundlrとArNSを使ってパーマウェブアプリケーションをパーマウェブに展開する方法を説明します。

::: tip
このガイドには、githubアクションの理解が必要であり、一部のArNSテストトークンが必要です。詳細は[こちら](https://ar.io/arns/)を参照してください。
:::

::: warning
このガイドには、テストや他のプロダクションワークフローに追加したいチェックなどは含まれていません。
:::

## デプロイスクリプトの作成

デプロイスクリプトは、アプリケーションの展開を行う「重い作業」を行うスクリプトです。`@bundlr-network/client`と`warp-contracts`を使用してアプリケーションを公開し、ArNSで新たに公開されたアプリケーションを登録するために使用します。

デプロイの依存関係をインストールする

```console
npm install --save-dev @bundlr-network/client
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

`deploy.mjs`ファイルを作成する

```js
import Bundlr from '@bundlr-network/client'
import { WarpFactory, defaultCacheOptions } from 'warp-contracts'
import Arweave from 'arweave'

const ANT = '[YOUR ANT CONTRACT]'
const DEPLOY_FOLDER = './dist'
const BUNDLR_NODE = 'https://node2.bundlr.network'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, 'base64').toString('utf-8'))

const bundlr = new Bundlr.default(BUNDLR_NODE, 'arweave', jwk)
const warp = WarpFactory.custom(
  arweave,
  defaultCacheOptions,
  'mainnet'
).useArweaveGateway().build()

const contract = warp.contract(ANT).connect(jwk)
// フォルダをアップロードする
const result = await bundlr.uploadFolder(DEPLOY_FOLDER, {
  indexFile: 'index.html'
})


// ANTを更新する
await contract.writeInteraction({
  function: 'setRecord',
  subDomain: '@',
  transactionId: result.id
})

console.log('Cookbookを展開しました。ArNSの更新を20〜30分お待ちください！')
```

## package.jsonにスクリプトを追加する

`deploy`という新しいスクリプトプロパティを作成し、ビルドスクリプトを呼び出し、その後、スクリプトプロパティの値で`node deploy.mjs`を呼び出します。

package.json

```json
  ...
  "scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```


## ギットハブアクションの作成

`.github/workflows`フォルダに`deploy.yml`ファイルを作成します。このファイルは、`main`ブランチでプッシュイベントがトリガーされた場合にギットハブアクションが展開するように指示します。

```yml
name: publish 

on:
  push:
    branches:
      - "main"

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 18.x
      - run: yarn
      - run: yarn deploy
        env:
          KEY: ${{ secrets.PERMAWEB_KEY }}
```

## 要約

プロジェクトリポジトリで設定とシークレットに移動し、リポジトリに新しいシークレットを追加します。このプロジェクトでは、このシークレットの名前はPERMAWEB_KEYとなります。シークレットの値はデプロイメントウォレットのbase64エンコード文字列である必要があります。

```console
base64 -i wallet.json | pbcopy
```

このデプロイメントが動作するためには、このウォレットのbundlrアカウントに資金を提供する必要があります。使用するウォレットには、あまり多くの資金を入れないようにし、おそらく0.5 AR程度の資金があることを確認して、bundlr cliを使用してファンドします。

```console
npx bundlr 250000000000 -h https://node2.bundlr.network -w wallet.json -c arweave
```

::: warning
このウォレットには資金を少なめにして、このプロジェクトでのみ使用してください。
:::

:tada: permawebへのデプロイを完全に自動化するためのギットハブアクションを設定しました！