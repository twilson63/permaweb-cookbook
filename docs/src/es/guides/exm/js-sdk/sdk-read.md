---
locale: es
---
# Leer desde Funciones Serverless con Execution Machine SDK

Hay dos formas de leer el estado desde una función serverless de EXM. Como se explica en la [introducción](../intro.md#serverless-functions-on-arweave), EXM almacena una copia de la función en una capa de caché para servir rápidamente a las aplicaciones, pero también carga la función en Arweave para mantener la descentralización y sus beneficios asociados. Como resultado de esto, el estado de la función se puede leer tanto desde la capa de caché de EXM como directamente desde Arweave.

1. Leer desde la capa de caché de EXM:

La llamada de lectura lee el estado más reciente almacenado en la capa de caché de EXM. Esta capa está diseñada específicamente para servir rápidamente las aplicaciones. Adopta un enfoque optimista y actualiza el estado de la función inmediatamente al recibir una solicitud de transacción.

<CodeGroup>
  <CodeGroupItem title="leer.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// inicializar una nueva instancia de EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// leer desde la capa de caché
const resultadoLeer = await exm.functions.read(functionId);
console.log(resultadoLeer);
```

  </CodeGroupItem>
</CodeGroup>

2. Leer directamente desde Arweave (Evaluar):

La llamada de evaluación devuelve el estado más reciente procesado con éxito en Arweave. Este último estado se calcula mediante [evaluación perezosa](../intro.md#how-does-it-work-in-the-background), que evalúa el estado inicial y las interacciones con la función en orden de ocurrencia para llegar al último estado.

<CodeGroup>
  <CodeGroupItem title="evaluar.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// inicializar una nueva instancia de EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// evaluar desde Arweave
const resultadoEvaluar = await exm.functions.evaluate(functionId);
console.log(resultadoEvaluar);
```

  </CodeGroupItem>
</CodeGroup>

::: consejo
Se recomienda leer desde Arweave solo con fines de verificación. El estado de la función devuelto por la llamada de evaluación se puede verificar con la información devuelta por la capa de caché para asegurar su autenticidad. Puede haber un pequeño retraso al enviar la solicitud de transacción y que se actualice en la red.
:::