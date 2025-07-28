---
locale: es
---

# arlocal

`arlocal` es una herramienta para configurar y ejecutar rápidamente un entorno de prueba local de Arweave. Te permite probar transacciones en un servidor similar a una pasarela de Arweave. Permite a los desarrolladores probar sus aplicaciones en un entorno simulado antes de implementarlas en la red de Arweave.

No se requieren tokens $AR para usarlo y las transacciones son instantáneas.

## CLI

Debes tener instalados node y npm en tu máquina para usar el CLI de arlocal.

Para iniciar la pasarela local, ejecuta `npx arlocal`

::: tip
Puedes especificar en qué puerto ejecutar la pasarela ligera pasando tu puerto como argumento
`npx arlocal 8080`
:::

Para ocultar los registros, agrega el indicador `--hidelogs` cuando ejecutes tu pasarela
`npx arlocal --hidelogs`

## Node

Instala el paquete como una dependencia de desarrollo ejecutando
`yarn add arlocal -D` or `npm install arlocal --save-dev`

```js
import ArLocal from "arlocal";

(async () => {
  const arLocal = new ArLocal();

  // crea un entorno de prueba local
  await arLocal.start();

  // tus pruebas aquí

  // apaga el entorno de prueba
  await arLocal.stop();
})();
```

Se puede crear una instancia de `ArLocal` con opciones
| Opción | Descripción |
| ---- | ----------- |
| port | Puerto a utilizar |
| showLogs | Mostrar registros |
| dbPath | Directorio para la base de datos temporal |
| persist | Persistir datos entre reinicios del servidor

### Ejemplo

Para que este ejemplo funcione, el código debe usar una billetera de prueba generada. Para lograr esto, el paquete `arweave` debe estar instalado en el proyecto junto con `arlocal`

`yarn add arweave arlocal -D` o `npm install --save-dev arweave arlocal`

A continuación, se muestra una prueba básica en JavaScript para crear una transacción de datos y enviarla a Arweave utilizando arlocal:

```js
import ArLocal from "arlocal";
import Arweave from "arweave";

test("prueba de transacción", async () => {
  // crear e iniciar la instancia de ArLocal
  const arLocal = new ArLocal();
  await arLocal.start();
  // crear pasarela local de Arweave
  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  });
  // generar una billetera
  const wallet = await arweave.wallets.generate();
  // enviar cantidad de tokens (en winston) a la billetera
  await arweave.api.get(`mint/${addr}/10000000000000000`);
  // crear función mine
  const mine = () => arweave.api.get("mine");
  try {
    // crear transacción
    let transaction = await arweave.createTransaction(
      {
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
      },
      wallet
    );
    // firmar y enviar transacción
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // minar transacción
    await mine();
    // probar la respuesta
  } catch (err) {
    console.error("ERROR: ", err.message);
  }
  // desmontar el entorno de prueba
  await arLocal.stop();
});
```

::: warning
Los resultados de las pruebas de transacciones L1 pueden diferir de las transacciones L2
:::

## Recursos

[documentación de arlocal](https://github.com/textury/arlocal)
