---
locale: es
---

# Publicación de transacciones usando arweave-js

Las transacciones nativas de Arweave se pueden publicar directamente en un nodo o una puerta de enlace utilizando el paquete `arweave-js`.

::: info
Arweave escala a través del uso de paquetes de transacciones. Estos paquetes hacen posible que cada bloque contenga una cantidad casi ilimitada de transacciones. Sin el uso de paquetes, los bloques de Arweave están limitados a 1000 transacciones por bloque (con nuevos bloques producidos cada ~2 minutos). Si su caso de uso excede esta capacidad, es posible que experimente transacciones eliminadas. En estas circunstancias, considere utilizar [irys.xyz](./irys.md) u otros servicios similares para agrupar sus transacciones.
:::

## Instalando el paquete arweave-js

Para instalar `arweave-js`, ejecute:
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arweave
```

  </CodeGroupItem>
</CodeGroup>

## Inicializando arweave-js

Las transacciones directas de Capa 1 se publican utilizando la biblioteca `arweave-js`.

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// cargar el archivo de clave de billetera JWK desde el disco
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inicializar una instancia de arweave
const arweave = Arweave.init({});
```

## Publicar una transacción de billetera a billetera

Una transacción básica para mover tokens AR de una dirección de billetera a otra.

```js:no-line-numbers
// crear una transacción de billetera a billetera enviando 10.5AR a la dirección de destino
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// debes firmar la transacción con tu clave antes de publicar
await arweave.transactions.sign(transaction, key);

// publicar la transacción
const response = await arweave.transactions.post(transaction);
```

## Publicar una transacción de datos

Este ejemplo ilustra cómo cargar un archivo desde el disco y crear una transacción para almacenar sus datos en la red. Puede encontrar el precio actual que la red está cobrando en [https://ar-fees.arweave.dev](https://ar-fees.arweave.dev)

```js:no-line-numbers
// cargar los datos desde el disco
const imageData = fs.readFileSync(`iamges/myImage.png`);

// crear una transacción de datos
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// agregar una etiqueta personalizada que indique a la puerta de enlace cómo servir estos datos a un navegador
transaction.addTag('Content-Type', 'image/png');

// debes firmar la transacción con tu clave antes de publicar
await arweave.transactions.sign(transaction, key);

// crear un cargador que enviará tus datos a la red
let uploader = await arweave.transactions.getUploader(transaction);

// ejecutar el cargador hasta que complete la carga
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## Recursos

-   Para obtener una visión general de todas las formas en que puedes publicar transacciones, consulta la sección [Publicación de transacciones](../../concepts/post-transactions.md) del libro de cocina.

-   Para obtener una descripción más detallada de las características de `arweave-js`, consulta la documentación [en github](https://github.com/ArweaveTeam/arweave-js).
