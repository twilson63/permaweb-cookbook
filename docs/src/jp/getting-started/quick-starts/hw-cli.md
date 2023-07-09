---
locale: jp
---
# こんにちは世界（CLI）

このガイドでは、コマンドラインインターフェース（CLI）を使用してデータを永続ウェブに取得する最もシンプルな方法を紹介します。

## 必要条件

* [NodeJS](https://nodejs.org) LTS以上

## 説明

ターミナル/コンソールウィンドウを使用して、`hw-permaweb-1`という名前の新しいフォルダを作成してください。

## セットアップ

```sh
cd hw-permaweb-1
npm init -y
npm install arweave @bundlr-network/client
```

## ウォレットの生成

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## ウェブページの作成

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## bundlrを使用してアップロード

```sh
npx bundlr upload index.html -c arweave -h https://node2.bundlr.network -w ./wallet.json
```