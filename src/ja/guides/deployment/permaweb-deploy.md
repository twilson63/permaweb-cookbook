---
title: "Permaweb デプロイ"
description: "permaweb-deploy CLI ツールを使用して、Arweave を介して Permaweb にウェブアプリケーションやファイルをデプロイし、ArNS の更新を自動化する方法"
difficulty: "初心者向け"
stability: "安定"
timeEstimate: "10分"
---

# Permaweb Deploy

`permaweb-deploy` は、Arweave を使用して Permaweb へウェブアプリケーションやファイルをデプロイするための Node.js コマンドラインツールです。ビルドフォルダや単一ファイルをアップロードし、Arweave マニフェストを作成し、新しいトランザクション ID で ArNS（Arweave Name Service）レコードを自動的に更新します。

## 機能

- **Turbo SDK 統合**: Arweave への高速で信頼性の高いファイルアップロード
- **Arweave Manifest v0.2.0**: SPA のフォールバックをサポートするマニフェストを作成
- **ArNS 更新**: 新しいトランザクション ID で ANT を介して ArNS レコードを自動更新
- **自動化ワークフロー**: GitHub Actions とシームレスに統合
- **Git ハッシュによるタグ付け**: デプロイを自動的に Git コミットハッシュでタグ付け
- **404 フォールバック検出**: 404.html を自動検出してフォールバックに設定
- **ネットワークサポート**: mainnet、testnet、カスタム ARIO プロセス ID をサポート
- **柔軟なデプロイ**: フォルダまたは単一ファイルをデプロイ可能

## インストール

```bash
npm install permaweb-deploy --save-dev
```

Yarn を使用する場合:

```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## 前提条件

### ウォレット設定

**Arweave サイナー（デフォルト）の場合:**
Arweave ウォレットキーを base64 形式でエンコードします:

```bash
base64 -i wallet.json | pbcopy
```

エンコードしたウォレットを `DEPLOY_KEY` 環境変数として設定してください。

**Ethereum/Polygon/KYVE サイナーの場合:**
生のプライベートキー（エンコード不要）を `DEPLOY_KEY` として使用してください。

:::warning セキュリティのベストプラクティス
デプロイには専用のウォレットを使用してセキュリティリスクを最小化してください。アップロード用にウォレットに十分な Turbo Credits があることを確認してください。
:::

## 基本的な使用方法

`package.json` にデプロイスクリプトを追加します:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

アプリケーションをデプロイ:

```bash
npm run deploy
```

## CLI オプション

| オプション        | エイリアス | 説明                                                       | デフォルト |
| ----------------- | ---------- | ---------------------------------------------------------- | ---------- |
| `--arns-name`     | `-n`       | **必須。** 更新する ArNS 名                                | -          |
| `--ario-process`  | `-p`       | ARIO プロセス（`mainnet`、`testnet`、またはプロセス ID）   | `mainnet`  |
| `--deploy-folder` | `-d`       | デプロイするフォルダ                                       | `./dist`   |
| `--deploy-file`   | `-f`       | フォルダの代わりに単一ファイルをデプロイ                   | -          |
| `--undername`     | `-u`       | 更新する ANT の undername                                  | `@`        |
| `--ttl-seconds`   | `-t`       | ANT レコードの TTL（秒）（60-86400）                       | `3600`     |
| `--sig-type`      | `-s`       | サイナータイプ（`arweave`、`ethereum`、`polygon`、`kyve`） | `arweave`  |

## 例

**アプリケーションをデプロイ**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app
```

**特定のフォルダをデプロイ**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-folder ./build
```

**単一ファイルをデプロイ**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-file ./script.lua
```

**Undername にデプロイ**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --undername staging
```

**カスタム TTL でデプロイ**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --ttl-seconds 7200
```

**Ethereum サイナーでデプロイ**

```bash
DEPLOY_KEY=<ETH_PRIVATE_KEY> npx permaweb-deploy --arns-name my-app --sig-type ethereum
```

## ネットワーク構成

**Mainnet（デフォルト）**

```json
{
  "scripts": {
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

**Testnet**

```json
{
  "scripts": {
    "deploy:test": "npm run build && permaweb-deploy --arns-name my-app --ario-process testnet"
  }
}
```

**カスタムプロセス ID**

```json
{
  "scripts": {
    "deploy:custom": "npm run build && permaweb-deploy --arns-name my-app --ario-process PROCESS_ID"
  }
}
```

## GitHub Actions 統合

`.github/workflows/deploy.yml` を作成:

```yaml
name: Deploy to Permaweb
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## デプロイ出力

正常にデプロイされると、以下のような出力が表示されます:

```
-------------------- デプロイ詳細 --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS 名: my-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO プロセス: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL（秒）: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

## セキュリティのベストプラクティス

- **専用ウォレットを使用**: デプロイ専用のウォレットを作成してセキュリティリスクを最小化する
- **シークレット管理を厳格に**: `DEPLOY_KEY` をバージョン管理にコミットしない
- **ビルドの検証**: デプロイ前にビルド内に露出したシークレットがないか常に確認する
- **十分なクレジット**: デプロイ前にウォレットに十分な Turbo Credits があることを確認する
- **Base64 エンコード**: Arweave ウォレットはデプロイスクリプト用に base64 エンコードする必要がある

## トラブルシューティング

### 一般的なエラー

**_"ARNS_NAME not configured"_**

- `--arns-name` フラグに有効な ArNS 名を渡していることを確認してください

**_"DEPLOY_KEY not configured"_**

- base64 エンコードしたウォレットが `DEPLOY_KEY` 環境変数として設定されていることを確認してください

**_"deploy-folder does not exist"_**

- ビルドフォルダが存在し、パスが正しいことを確認してください
- まずビルドコマンドを実行してください

**_"ARNS name does not exist"_**

- ArNS 名が正しく、指定したネットワーク上に存在することを確認してください

**_"Upload timeouts"_**

- ファイルのアップロードは 10 秒のタイムアウトがあります
- 大きなファイルは失敗する可能性があり、最適化が必要です

**_"Insufficient Turbo Credits"_**

- ウォレット残高を確認し、必要に応じてクレジットを追加してください

### デバッグ情報

詳細なログを有効にするには `DEBUG` 環境変数を設定します:

```bash
DEBUG=permaweb-deploy* npm run deploy
```

## 依存関係

- **@ar.io/sdk**: ANT 操作と ArNS 管理
- **@ardrive/turbo-sdk**: Arweave への高速ファイルアップロード
- **@permaweb/aoconnect**: AO ネットワーク接続
- **yargs**: CLI 引数パース

## 次のステップ

1. **ArNS のセットアップ**: [ArNS Names](../../references/arns.md)
2. **Turbo Credits の取得**: [ArDrive Turbo](https://docs.ar.io/build/upload/bundling-services#get-turbo-credits)

## リソース

- **GitHub リポジトリ**: [permaweb/permaweb-deploy](https://github.com/permaweb/permaweb-deploy)
- **Turbo SDK ドキュメント**: [Turbo SDK](https://github.com/ardriveapp/turbo-sdk)
- **ArNS ドキュメンテーション**: [ar.io/arns](https://docs.ar.io/learn/arns)
- **Arweave エコシステム**: [arweave.org](https://arweave.org)
