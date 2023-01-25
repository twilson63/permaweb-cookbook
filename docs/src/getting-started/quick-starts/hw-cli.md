# Hello World (CLI)

This guide walks you through the most simple way to get data on to the permaweb using a command-line interface (CLI).

## Requirements

* [NodeJS](https://nodejs.org) LTS or greater

## Description

Using a terminal/console window create a new folder called `hw-permaweb-1`. 

## Setup

```sh
cd hw-permaweb-1
npm init -y
npm install arweave @bundlr-network/client
```


## Generate a wallet

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Create a web page

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## Upload using bundlr

```sh
npx bundlr upload index.html -c arweave -h https://node2.bundlr.network -w ./wallet.json
```

