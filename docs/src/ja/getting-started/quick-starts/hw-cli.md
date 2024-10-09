---
locale: ja
---
# Hello World (CLI)


このガイドでは、コマンドラインインターフェース（CLI）を使用して、パーマウェブにデータを取得する最も簡単な方法を説明します。

## 要件

-   [NodeJS](https://nodejs.org) LTS 以上

## 説明

ターミナル/コンソールウィンドウを使用して、`hw-permaweb-1`という新しいフォルダーを作成します。

## セットアップ

```sh
cd hw-permaweb-1
npm init -y
npm install arweave ardrive-cli
```

## ウォレットを生成する

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## ウェブページを作成する

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## Ardrive CLIを使用してアップロードする

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arweave-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arweave-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://g8way.io/${TX_ID}
```

