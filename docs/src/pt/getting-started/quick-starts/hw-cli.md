---
locale: pt
---
# Olá Mundo (CLI)

Este guia mostra a maneira mais simples de obter dados na permaweb usando uma interface de linha de comando (CLI).

## Requisitos

* [NodeJS](https://nodejs.org) LTS ou superior

## Descrição

Usando uma janela de terminal/console, crie uma nova pasta chamada `hw-permaweb-1`.

## Configuração

```sh
cd hw-permaweb-1
npm init -y
npm install arweave @bundlr-network/client
```


## Gerar uma carteira

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Criar uma página web

```sh
echo "<h1>Hello Permaweb</h1>" > index.html
```

## Fazer upload usando o bundlr

```sh
npx bundlr upload index.html -c arweave -h https://node2.bundlr.network -w ./wallet.json
```