# Hello World（CLI）

このガイドでは、コマンドラインインターフェース（CLI）を使用して Permaweb にデータを配置する最も簡単な方法を説明します。

## 要件

- [NodeJS](https://nodejs.org) LTS 以上

## セットアップ

コンピュータでターミナルを開き、`hello-permaweb` という新しいフォルダを作成します。

次に、`hello-permaweb` ディレクトリに `cd` し、次のコマンドで新しいプロジェクトをセットアップします:

```sh
npm init -y
npm install arweave ardrive-cli
```

## ウォレットの生成

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## ウェブページの作成

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## ArDrive CLI を使ったアップロード

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arweave-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arweave-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://arweave.net/${TX_ID}
```

おめでとうございます。Arweave にデータを配置しました！
