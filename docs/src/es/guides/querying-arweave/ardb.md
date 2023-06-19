---
locale: es
---
# ArDB
Una biblioteca construida sobre GraphQL que permite consultar datos de transacciones y bloques de Arweave sin necesidad de memorizar los nombres de los parámetros de GraphQL. Simplemente construye consultas utilizando el autocompletado en tu editor de código favorito.

## Instalación
```console:no-line-numbers
yarn add ardb
```

## Ejemplo
```js:no-line-numbers
import Arweave from 'arweave';
import ArDB from 'ardb';

// inicializa una instancia de Arweave
const arweave = Arweave.init({});

// arweave es una instancia de cliente de Arweave
const ardb = new ArDB(arweave);

// Obtén una transacción individual por su id
const tx = await ardb.search('transacción')
	.id('A235HBk5p4nEWfjBEGsAo56kYsmq7mCCyc5UZq5sgjY')
	.findOne();

// Obtén un arreglo de transacciones e incluye solo el primer resultado
const txs = await ardb.search('transacciones')
	.appName('SmartWeaveAction')
	.findOne();

// Esto es lo mismo que hacer:
const txs = await ardb.search('transacciones')
	.tag('App-Name', 'SmartWeaveAction')
	.limit(1)
	.find();

// Busca varias transacciones de un propietario/dirección de billetera específico
const txs = await ardb.search('transacciones')
	.from('BPr7vrFduuQqqVMu_tftxsScTKUq9ke0rx4q5C9ieQU')
	.find();

// Continúa paginando a través de los resultados con...
const newTxs = await ardb.next();

// O puedes obtener todos los resultados de una vez haciendo:
const txs = await ardb.search('bloques')
 .id('BkJ_h-GGIwfek-cJd-RaJrOXezAc0PmklItzzCLIF_aSk36FEjpOBuBDS27D2K_T')
 .findAll();

```

## Recursos
* [Paquete NPM de ArDB](https://www.npmjs.com/package/ardb)