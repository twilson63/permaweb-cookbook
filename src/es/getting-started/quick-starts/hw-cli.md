---
locale: es
---

# Hola Mundo (CLI)

Esta guía le guiará a través de la forma más simple de obtener datos en el permaweb usando una interfaz de línea de comandos (CLI).

## Requerimientos

-   [NodeJS](https://nodejs.org) LTS o superior

## Descripción

Usando una ventana de terminal / consola, cree una nueva carpeta llamada `hw-permaweb-1`.

## Configuración

```sh
cd hw-permaweb-1
npm init -y
npm install arweave ardrive-cli
```

## Generar una billetera

```sh
npx -y @permaweb/wallet > ~/.demo-arweave-wallet.json
```

## Crea una página web

```sh
echo "<h1>Hola Permaweb</h1>" > index.html
```

## Subir utilizando Irys

```sh
# Create a Drive
FOLDER_ID=$(npx ardrive create-drive -n public -w ~/.demo-arweave-wallet.json --turbo | jq -r '.created[] | select(.type == "folder") | .entityId')
# Upload file
TX_ID=$(npx ardrive upload-file -l index.html --content-type text/html -w ~/.demo-arweave-wallet.json --turbo -F ${FOLDER_ID} | jq -r '.created[] | select(.type == "file
") | .dataTxId')
# open file from ar.io gateway
open https://g8way.io/${TX_ID}
```
