---
locale: ja
---
# GitHub Actions

::: warning
このガイドは教育目的のためのものであり、アプリケーションをデプロイする方法を学ぶためのオプションとして使用するべきです。このガイドでは、私たちの秘密情報を保護するために`microsoft`が所有する第三者リソース`github`を信頼しています。彼らのドキュメントでは、秘密を保存する際に`libsodium sealed box`を使用して暗号化しています。彼らのセキュリティプラクティスについての詳細はこちらで確認できます。 https://docs.github.com/en/actions/security-guides/encrypted-secrets
:::

GitHub ActionsはCI/CDパイプラインで、開発者がGitHubワークフローシステムから生成されたイベントをトリガーとして自動化されたタスクを実行できるようにします。これらのタスクはほぼ何でも可能で、このガイドではIrysとArNSを使用してPermawebアプリケーションをデプロイする方法を示します。

::: tip
このガイドではGitHub Actionsの理解が必要であり、いくつかのArNSテストトークンが必要です。詳細については、https://ar.io/arns/ をご覧ください。
:::

::: warning
このガイドには、テストやプロダクションワークフローに追加したいその他のチェックは含まれていません。
:::

## デプロイスクリプトの作成

デプロイスクリプトは、アプリケーションをデプロイするための重い作業を行うスクリプトです。`@irys/sdk`と`warp-contracts`を使用して、アプリケーションを公開し、新しく公開されたアプリケーションをArNSに登録します。

デプロイ依存関係をインストールします。

```console
npm install --save-dev @permaweb/arx
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

Create `deploy.mjs` file

```js
import Arx from "@permaweb/arx";
import { WarpFactory, defaultCacheOptions } from "warp-contracts";
import Arweave from "arweave";

const ANT = "[YOUR ANT CONTRACT]";
const DEPLOY_FOLDER = "./dist";
const TURBO_NODE = "https://turbo.ardrive.io";

const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, "base64").toString("utf-8"));
const arweave = Arweave.init({ host: "arweave.net", port: 443, protocol: "https" });
const arx = new Arx({ url: TURBO_NODE, token: "arweave", key: jwk });
const warp = WarpFactory.custom(arweave, defaultCacheOptions, "mainnet").useArweaveGateway().build();

const contract = warp.contract(ANT).connect(jwk);
// upload folder
const result = await arx.uploadFolder(DEPLOY_FOLDER, {
	indexFile: "index.html",
});

// update ANT
await contract.writeInteraction({
	function: "setRecord",
	subDomain: "@",
	transactionId: result.id,
});

console.log("Deployed Cookbook, please wait 20 - 30 minutes for ArNS to update!");
```


## package.jsonにスクリプトを追加

新しいスクリプトプロパティ`deploy`を作成し、ビルドスクリプトを呼び出し、その後`scripts deploy`プロパティの値に`node deploy.mjs`を設定します。

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

## GitHub Actionの作成

`.github/workflows`フォルダーに`deploy.yml`ファイルを作成します。このファイルは、`main`ブランチでプッシュイベントがトリガーされたときにGitHub Actionsがデプロイを実行するよう指示します。

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

## まとめ

プロジェクトリポジトリの設定とシークレットに移動し、新しいシークレットをリポジトリに追加します。このプロジェクトのためにこのシークレットはPERMAWEB_KEYと呼ばれます。シークレットの値はデプロイメントウォレットのBase64エンコードされた文字列である必要があります。

```console
base64 -i wallet.json | pbcopy
```

このデプロイメントが機能するためには、このウォレットのIrysアカウントに資金を供給する必要があります。使用するウォレットには少しの$ARが必要です（0.5 AR程度で大丈夫です）。その後、Irys CLIを使用して資金を供給します。

```console
arx fund 250000000000 -w wallet.json -t arweave
```

::: warning
Keep this wallet low on funds and only use it for this project.
:::

:tada: Permawebへのデプロイを完全に自動化するGitHub Actionをセットアップしました！