# Hello World（CLI）

本指南将引导你使用命令行界面（CLI）将数据简单地上传到 Permaweb。

## 系统需求

- [NodeJS](https://nodejs.org) LTS 或更新版本

## 设置

在你的电脑上打开终端，并创建一个名为 `hello-permaweb` 的新文件夹。

接着切换到 `hello-permaweb` 目录，并使用以下指令创建一个新项目：

```sh
npm init -y
npm install arweave ardrive-cli
```

## 生成钱包

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## 创建一个网页

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## 使用 ArDrive CLI 上传

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arwe-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arwe-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://arweave.net/${TX_ID}
```

恭喜，你已经将数据上传到 Arweave！
