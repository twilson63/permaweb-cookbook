---
locale: es
---
# Publicación de transacciones usando bundlr.network
La publicación de transacciones en bundlr.network se puede lograr utilizando el paquete de javascript `bundlr.network/client`. Los servicios de agrupamiento permiten una confirmación garantizada de las transacciones publicadas, así como el soporte de muchas miles de transacciones por bloque a través del uso de paquetes de transacciones.

## Instalación de bundlr.network/client
Para instalar `bundlr.network/client`, ejecuta

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @bundlr-network/client
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

## Inicialización del cliente de Bundlr Network
Una diferencia entre publicar transacciones de la Capa 1 y transacciones agrupadas de la Capa 2 es que cuando se utiliza bundlr, debes realizar un depósito en el nodo de bundlr con anticipación. Este depósito se puede hacer utilizando tokens AR o una variedad de otras criptomonedas. Otra diferencia es que el servicio de bundlr garantiza que tus datos llegarán a la cadena.

```js:no-line-numbers
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// carga el archivo de clave del monedero JWK desde el disco
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inicializa el SDK de bundlr
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## Publicación de una transacción agrupada

```js:no-line-numbers
// carga los datos desde el disco
const imageData = fs.readFileSync(`images/myImage.png`);

// agrega una etiqueta personalizada que le indica a la puerta de enlace cómo servir estos datos en un navegador
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// crea la transacción agrupada y firámala
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// carga la transacción a bundlr para ser incluida en un paquete de transacciones a publicar
await tx.upload();
```
## Recursos
* Para obtener una descripción general de todas las formas en que puedes publicar transacciones, consulta la sección [Publicación de Transacciones](../../concepts/post-transactions.md) del libro de recetas.

* Puedes encontrar la documentación completa del cliente bundlr en el [sitio web de bundlr.network](https://docs.bundlr.network/docs/overview)

* Un tutorial y taller para [subir una colección de NFT](https://github.com/DanMacDonald/nft-uploader) utilizando bundlr.