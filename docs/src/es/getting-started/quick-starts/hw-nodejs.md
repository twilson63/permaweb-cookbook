---
locale: es
---

# Hola Mundo (NodeJS)

Este guía le mostrará la manera más sencilla de obtener datos en el permaweb usando `arweave-js` y `bundlr`.

Con Arweave 2.6 solo permitiendo 1000 elementos por bloque, directamente subir al gateway (por ejemplo, usando `arweave-js`) probablemente será poco común.

## Requerimientos

- [NodeJS](https://nodejs.org) LTS o mayor

## Descripción

Usando una ventana de terminal/consola cree una nueva carpeta llamada `hw-nodejs`.

## Configuración

```sh
cd hw-nodejs
npm init -y
npm install arweave @bundlr-network/client
```

## Generar una billetera

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Subir usando bundlr (Transacciones gratis)

```js:no-line-numbers
import Bundlr from "@bundlr-network/client";
import fs from "fs";

const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());

const bundlr = new Bundlr.default(
  "http://node2.bundlr.network",
  "arweave",
  jwk
);

bundlr
  .upload("Hola mundo")
  .then((r) => console.log(`https://arweave.net/${r.id}`))
  .catch(console.log);
```

## Subir usando ArweaveJS

Si está ejecutando la última versión de `nodejs` este script `arweavejs` funcionará tal como está. Para otras versiones es posible que deba usar la bandera` --experimental-fetch`.

```js:no-line-numbers
import Arweave from "arweave";
import fs from "fs";

// cargar el archivo de tecla de billetera JWK de disco
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// iniciar arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const tx = await arweave.createTransaction(
  {
    data: "¡Hola mundo!",
  },
  jwk
);

await arweave.transactions.sign(tx, jwk);

arweave.transactions.post(tx).then(console.log).catch(console.log);
console.log(`https://arweave.net/${tx.id}`);
```

## Recursos

- [Bundlr SDK](https://github.com/Bundlr-Network/js-sdk)
- [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
- [Bundlr Docs: Cargas gratuitas](https://docs.bundlr.network/FAQs/general-faq#does-bundlr-offer-free-uploads)