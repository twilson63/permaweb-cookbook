---
locale: es
---

# Agrupamiento

Antes de comenzar con las referencias a continuación, asegúrate de haber leído [Bundles y Agrupamiento](/concepts/bundles.md) de [Conceptos Básicos](/concepts/).

## Configuración

Utilizaremos la biblioteca [arbundles](https://github.com/irys-xyz/arbundles), que es una implementación en JavaScript de la [especificación ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md). ArBundles cuenta con soporte para TypeScript.

**Nota:** Esta referencia asume un entorno de NodeJS. La compatibilidad con el navegador y ArBundles es posible, pero actualmente requiere la manipulación de polifills de `Buffer`. Esto se abordará en una versión futura de ArBundles.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install arbundles
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add arbundles
```

  </CodeGroupItem>
</CodeGroup>

## Crear un `Signer`

Para crear elementos de datos, primero debemos crear un `Signer`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { ArweaveSigner, JWKInterface } from 'arbundles'

const jwk: JWKInterface = { /* tu archivo de clave jwk de Arweave */ }
const signer = new ArweaveSigner(jwk)
```

  </CodeGroupItem>
</CodeGroup>

## Crear un `DataItem`

Para crear un `DataItem`, pasamos datos junto con un `Signer` a la función de utilidad `createData()`.

**Nota:** Si bien la función de utilidad `createData()` requiere un `Signer`, el `DataItem` devuelto aún **no está firmado** y contiene un ID de marcador de posición.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { createData } from 'arbundles'

// Crear un DataItem a partir de una cadena
const myStringData: string = '¡Hola, Permaweb!'
const myDataItem = createData(myStringData, signer)

// Crear un DataItem a partir de un búfer o Uint8Array
const myBufferData: Buffer | Uint8Array = Buffer.from('¡Hola, Permaweb!')
const myOtherDataItem = createData(myBufferData, signer)

/* !!!ADVERTENCIA!!! ¡LOS DATA ITEM NO ESTÁN FIRMADOS TODAVÍA! */
```

  </CodeGroupItem>
</CodeGroup>

## Crear un `Bundle`

Para crear un Bundle, pasamos nuestros `DataItem` a la función de utilidad `bundleAndSignData` y esperamos el resultado utilizando `await`.

**Nota:** Un `DataItem` pasado a esta función de utilidad puede estar pre-firmado, como se detalla en una sección posterior.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import { bundleAndSignData } from 'arbundles'

const dataItems = [myDataItem, myOtherDataItem]
const bundle = await bundleAndSignData(dataItems, signer)
```

  </CodeGroupItem>
</CodeGroup>

## Crear una `Transaction` a partir de un `Bundle`

Para enviar un `Bundle` a Arweave, en última instancia, se necesita una transacción raíz de Capa 1 que contenga el `Bundle`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
import Arweave from 'Arweave'

// Configurar un cliente de Arweave
const arweave = new Arweave({
  protocol: 'https',
  host: 'arweave.net',
  port: 443
})

// Crear usando ArweaveJS
const tx = await arweave.createTransaction({ data: bundle.getRaw() }, jwk)

// O crear a partir del propio Bundle
const tx = await bundle.toTransaction({}, arweave, jwk)

// Firmar la transacción
await arweave.transactions.sign(tx, jwk)

// ¡Publica la transacción en Arweave con tu método preferido!
```

  </CodeGroupItem>
</CodeGroup>

## Firmar un `DataItem`

Para obtener el ID de un `DataItem` (por ejemplo, para usarlo en un manifiesto contenido en el mismo bundle), debemos llamar y esperar su método `.sign()`. Si la firma es exitosa, el `DataItem` ahora tendrá su ID y firma únicos y estará listo para ser agregado a un `Bundle`.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
await myDataItem.sign(signer)
await myOtherDataItem.sign(signer)

const id1 = myDataItem.id
const id2 = myOtherDataItem.id
```

  </CodeGroupItem>
</CodeGroup>

## Etiquetar un `DataItem`

Los `DataItem` pueden tener etiquetas, al igual que las transacciones de Arweave de Capa 1. Una vez que un Gateway de Arweave desagrupa e indexa el `Bundle`, estas etiquetas del `DataItem` se pueden consultar de la misma manera que las etiquetas de una transacción de Arweave de Capa 1.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const myStringData: string = '¡Hola, Permaweb!'
  const tags = [
    { name: 'Title', value: 'Hello Permaweb' },
    { name: 'Content-Type', value: 'text/plain' }
  ]
  const myDataItem = createData(myStringData, signer, { tags })
```

  </CodeGroupItem>
</CodeGroup>

## Consumir Bundles

**ADVERTENCIA:** Asegúrate de que el `Buffer` que pasas a `new Bundle(buffer)` contenga un `Bundle`, de lo contrario, pasar un `Buffer` muy pequeño hará que se bloquee el hilo. **NO** utilices `new Bundle(buffer)` en un entorno de producción. En su lugar, consulta la [interfaz para transmisión](https://github.com/irys-xyz/arbundles/blob/master/src/stream) en el repositorio de ArBundles.

<CodeGroup>
  <CodeGroupItem title="TS">

```ts:no-line-numbers
  const bundle = new Bundle(Buffer.from(tx.data))
  const myDataItem = bundle.get(0)
  const myOtherDataItem = bundle.get(1)
```

  </CodeGroupItem>
</CodeGroup>
