# Hello World (CLI)

This guide walks you through the most simple way to get data on to the Permaweb using a command-line interface (CLI).

## Requirements

-   [NodeJS](https://nodejs.org) LTS or greater

## Setup

Open up a terminal on your computer, and create a new folder called `hello-permaweb`.

Then, `cd` into the `hello-permaweb` directory, and setup a new project with:

```sh
npm init -y
npm install arweave ardrive-cli
```

## Generate a wallet

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## Create a webpage

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## Upload using ArDrive CLI

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arweave-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arweave-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://arweave.net/${TX_ID}
```

Congratulations, you've put some data on Arweave!
