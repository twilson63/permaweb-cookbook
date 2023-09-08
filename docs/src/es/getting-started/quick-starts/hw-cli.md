---
locale: es
---

# Hola Mundo (CLI)

Esta guía le guiará a través de la forma más simple de obtener datos en el permaweb usando una interfaz de línea de comandos (CLI).

## Requerimientos

- [NodeJS](https://nodejs.org) LTS o superior

## Descripción

Usando una ventana de terminal / consola, cree una nueva carpeta llamada `hw-permaweb-1`.

## Configuración

```sh
cd hw-permaweb-1
npm init -y
npm installar arweave @bundlr-network/client
```

## Generar una billetera

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Crea una página web

```sh
echo "<h1>Hola Permaweb</h1>" > index.html
```

## Subir utilizando bundlr

```sh
npx bundlr upload index.html -c arweave -h https://node2.bundlr.network -w ./wallet.json
```
