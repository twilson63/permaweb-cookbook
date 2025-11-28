# Hello World（CLI）

本指南將引導你使用命令列介面（CLI）將資料最簡單地上傳到 Permaweb。

## 系統需求

- [NodeJS](https://nodejs.org) LTS 或更新版本

## 設定

在你的電腦上開啟終端機，並建立一個名為 `hello-permaweb` 的新資料夾。

接著切換到 `hello-permaweb` 目錄，並以以下指令建立一個新專案：

```sh
npm init -y
npm install arweave ardrive-cli
```

## 產生錢包

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## 建立一個網頁

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## 使用 ArDrive CLI 上傳

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arweave-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arweave-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://arweave.net/${TX_ID}
```

恭喜，你已經將一些資料放到 Arweave！
