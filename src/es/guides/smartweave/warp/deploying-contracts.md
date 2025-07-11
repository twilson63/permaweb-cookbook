---
locale: es
---

# Warp (SmartWeave) SDK - Despliegue de Contratos

Los Contratos SmartWeave se crean mediante la publicación de dos transacciones en la red, una Transacción de Origen y una Transacción de Estado Inicial; la transacción de origen contiene el código fuente que el contrato utilizará para determinar el estado actual. La transacción de estado inicial proporciona un identificador de contrato de referencia, así como los datos de semilla iniciales que el contrato debe usar como punto de partida para evaluar el estado actual. El estado actual se calcula accediendo a acciones que son transacciones escritas en la red que contienen parámetros de entrada para ejecutar utilizando el código fuente evaluado e instanciado. Los Contratos Warp pueden crearse utilizando diferentes lenguajes y pueden evaluarse utilizando el SDK de Warp. Esta guía mostrará las diferentes maneras en las que puedes desplegar un Contrato Warp.

::: tip
Si deseas obtener más información sobre la creación de Contratos SmartWeave Warp, ¡echa un vistazo a la Academia Warp! [https://academy.warp.cc/](https://academy.warp.cc/)
:::

A partir de la versión 1.3.0 de Warp, necesitarás un complemento para desplegar contratos con Warp. Este complemento te permitirá agregar diferentes firmas de billetera.

```js
import { DeployPlugin, InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet().use(new DeployPlugin())

...

async function deploy(initState, src) {
  if (window.arweaveWallet) {
    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY', 'SIGNATURE']);
  }
  const userSigner = new InjectedArweaveSigner(window.arweaveWallet);
  await userSigner.setPublicKey();

  return warp.deploy({
    wallet: userSigner,
    src,
    initState: JSON.stringify(initState)
  })
}
```

## Las Cuatro formas de desplegar un Contrato SmartWeave Warp

Hay 4 formas en las que puedes desplegar un Contrato SmartWeave a través del SDK de Warp, estas opciones manejan diferentes casos de uso que un desarrollador puede encontrar.

-   Necesidad de desplegar el contrato con el código fuente al mismo tiempo.
-   Necesidad de desplegar un contrato donde el código fuente ya está en la permaweb.
-   Necesidad de desplegar un contrato a través del secuenciador y señalar algunos datos mediante un manifiesto de ruta.
-   Necesidad de desplegar un contrato a través de Irys y registrar ese contrato en el secuenciador.

::: tip
Para obtener más información sobre los despliegues de Warp, consulta el Readme de GitHub para el proyecto. [https://github.com/warp-contracts/warp#deployment](https://github.com/warp-contracts/warp#deployment).
:::

::: warning
Este proyecto está en desarrollo rápido, por lo que la documentación aquí podría quedar obsoleta rápidamente. Si descubres que está desactualizada, avísanos en el [Canal de Discord del Cookbook de Permaweb](https://discord.gg/haCAX3shxF).
:::

## Ejemplos

::: tip
De forma predeterminada, todas las funciones de despliegue se publican en Arweave a través de Irys. Cada opción tiene una bandera que se puede configurar para no usar Irys, pero puede llevar muchas confirmaciones para que la red confirme completamente la transacción.
:::

**deploy**

Despliega el contrato junto con el código fuente en el Secuenciador de Warp, en Irys (L2) y en Arweave.

```ts
const { contractTxId, srcTxId } = await warp.deploy({
	wallet,
	initState,
	data: { "Content-Type": "text/html", body: "<h1>Hello World</h1>" },
	src: contractSrc,
	tags: [{ name: "AppName", value: "HelloWorld" }],
});
```

-   wallet - debe ser el archivo de clave de Arweave (wallet.json) analizado como un objeto JSON que implementa la [Interfaz JWK](https://rfc-editor.org/rfc/rfc7517) o la cadena 'use_wallet'
-   initState - es un objeto JSON convertido en cadena
-   data - es opcional si deseas escribir datos como parte de tu despliegue
-   src - es el valor de la cadena o Uint8Array del código fuente del contrato
-   tags - es un array de objetos de nombre/valor `{name: string, value: string}[]`, [Aprende más sobre etiquetas](../../../concepts/tags.md)

**deployFromSourceTx**

¿Ya tienes el código fuente en la permaweb? ¡Entonces deployFromSourceTx es tu herramienta elegida! Con la permaweb, nunca tendrás que preocuparte por los cambios en los datos, por lo que reutilizar el código fuente para los contratos es lo más conveniente.

```ts
const { contractTxId, srcTxId } = await warp.deployFromSourceTx({
	wallet,
	initState,
	srcTxId: "SRC_TX_ID",
});
```

**deployBundled**

Utiliza el punto de enlace del Secuenciador del Gateway de Warp para cargar un elemento de datos sin procesar en Irys e indexarlo.

```ts
import { createData } from "arbundles";

const dataItem = createData(
	JSON.stringify({
		manifest: "arweave/paths",
		version: "0.1.0",
		index: {
			path: "index.html",
		},
		paths: {
			"index.html": {
				id: "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI",
			},
		},
	}),
	{ tags: [{ "Content-Type": "application/x.arweave-manifest+json" }] },
);
const { contractTxId } = await warp.deployBundled(dataItem.getRaw());
```

**register**

Utiliza el punto de enlace del Secuenciador del Gateway de Warp para indexar un contrato que ha sido cargado con Irys.

```ts
import Irys from '@irys/sdk'

const irys = new Irys({'https://node2.irys.xyz', 'arweave', wallet})
const { id } = await irys.upload('Some Awesome Atomic Asset',  {
  tags: [{'Content-Type': 'text/plain' }]
})
const { contractTxId } = await warp.register(id, 'node2')
```

## Resumen

¿Por qué existen tantas opciones para desplegar contratos? Estos métodos existen para reducir la duplicación, permitir interacciones avanzadas de contratos y permitir flexibilidad para probar y utilizar el protocolo smartweave. La permaweb es muy única en su arquitectura; proporciona una función donde puedes desplegar tanto datos digitales como el contrato para administrar esos datos, generando el mismo identificador de transacción. El resultado es una combinación de datos dinámicos con un conjunto inmutable de datos. El despliegue de contratos es solo una pieza del SDK de Warp, ¡para obtener más información sigue leyendo esta guía!
