# Hello World (CLI)

This guide walks you through the most simple way to get data on to the permaweb using a command-line interface (CLI).

## Requirements

- [NodeJS](https://nodejs.org) LTS or greater

## Description

Using a terminal/console window create a new folder called `hw-permaweb-1`.

## Setup

```sh
cd hw-permaweb-1
npm init -y
npm install arweave @irys/sdk
```

## Generate a wallet

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Create a web page

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## Upload using Irys

```sh
npx irys upload index.html -t arweave -n mainnet -w ./wallet.json
```
