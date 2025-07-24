---
locale: es
---

# Publicación de transacciones usando Irys

La publicación de transacciones en irys.xyz se puede lograr utilizando el paquete de JavaScript `irys.xyz`. Los servicios de agrupamiento permiten una confirmación garantizada de las transacciones publicadas, así como el soporte de muchas miles de transacciones por bloque a través del uso de paquetes de transacciones.

## Instalación de irys.xyz/sdk

Para instalar `irys.xyz/sdk`, ejecuta

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

## Inicialización del cliente de Irys Network

Una diferencia entre publicar transacciones de la Capa 1 y transacciones agrupadas de la Capa 2 es que cuando se utiliza Irys, debes realizar un depósito en el nodo de Irys con anticipación. Este depósito se puede hacer utilizando tokens AR o una variedad de otras criptomonedas. Otra diferencia es que el servicio de Irys garantiza que tus datos llegarán a la cadena.

```js:no-line-numbers
import Irys from "@irys/sdk";
import fs from "fs";

// carga el archivo de clave del monedero JWK desde el disco
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());
const url = "https://node1.irys.xyz";
const token = "arweave";

// inicializa el SDK de Irys
const irys = new Irys({
	url, // URL of the node you want to connect to
	token, // Token used for payment and signing
	key, // Arweave wallet
});
```

## Publicación de una transacción agrupada

```js:no-line-numbers
// carga los datos desde el disco
const fileToUpload = "./myImage.png";

// agrega una etiqueta personalizada
const tags = [{ name: "application-id", value: "MyNFTDrop" }];

// Upload the file
try {
	const receipt = await irys.uploadFile(fileToUpload, { tags });
	console.log(`File uploaded ==> https://arweave.net/${receipt.id}`);
} catch (e) {
	console.log("Error uploading file ", e);
}

```

## Recursos

-   Para obtener una descripción general de todas las formas en que puedes publicar transacciones, consulta la sección [Publicación de Transacciones](../../concepts/post-transactions.md) del libro de recetas.

-   Puedes encontrar la documentación completa del cliente Irys en el [sitio web de Irys.xyz](http://docs.irys.xyz/developer-docs/irys-sdk)

-   Un tutorial y taller para [subir una colección de NFT](http://docs.irys.xyz/hands-on/tutorials/uploading-nfts) utilizando Irys.
