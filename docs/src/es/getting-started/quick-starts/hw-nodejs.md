---
locale: es
---

# Hola Mundo (NodeJS)

Este guía le mostrará la manera más sencilla de obtener datos en el permaweb usando `arweave-js` y `Irys`.

Con Arweave 2.6 solo permitiendo 1000 elementos por bloque, directamente subir al gateway (por ejemplo, usando `arweave-js`) probablemente será poco común.

## Requerimientos

-   [NodeJS](https://nodejs.org) LTS o mayor

## Descripción

Usando una ventana de terminal/consola cree una nueva carpeta llamada `hw-nodejs`.

## Configuración

```sh
cd hw-nodejs
npm init -y
npm install arweave @irys/sdk
```

## Generar una billetera

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Subir usando Irys (Transacciones gratis)

```js:no-line-numbers
const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());
const url = "https://node2.irys.xyz";
const token = "arweave";

const irys = new Irys({
	url, // URL of the node you want to connect to
	token, // Token used for payment and signing
	jwk, // Arweave wallet
});

const dataToUpload = "GM mundo.";

try {
	const receipt = await irys.upload(dataToUpload);
	console.log(`Data uploaded ==> https://arweave.net/${receipt.id}`);
} catch (e) {
	console.log("Error uploading data ", e);
}
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

-   [Irys SDK](https://github.com/irys-xyz/js-sdk)
-   [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
-   [Irys Docs: Cargas gratuitas](http://docs.irys.xyz/faqs/dev-faq#does-irys-offer-free-uploads)
