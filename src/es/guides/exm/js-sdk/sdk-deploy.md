---
locale: es
---
# Despliegue de funciones serverless con el SDK Execution Machine

Para desplegar funciones serverless con el SDK en JavaScript, creamos un script aquí que le indica a nuestra computadora cómo desplegar nuestra función en la red.

<details>
<summary><strong>Ejemplo de lógica de función</strong></summary>

Después de instalar el paquete, necesitamos un archivo que defina la lógica de la función dentro del proyecto.

<CodeGroup>
  <CodeGroupItem title="function.js">

```js
export async function handle(state, action) {
    state.counter++;
    return { state };
}
```

  </CodeGroupItem>
</CodeGroup>

La sintaxis para definir funciones se basa en el estándar implementado por SmartWeave para contratos inteligentes en JavaScript. Cada función tiene un `state`, que es un objeto JSON de valores almacenados en él y `actions` para interactuar con estos valores.

La función anterior agrega nombres a una matriz de usuarios, lo cual se hace utilizando la siguiente línea:

```js
state.users.push(action.input.name);
```

Al desplegar nuestra función, inicializamos una matriz vacía llamada `users` que luego ayuda a nuestra función a identificar esta variable de estado (variable almacenada en el estado de la función) durante las llamadas de lectura y escritura. Al inicializarse, el `state` se ve así:

```js
{ users: [] }
```

Además, al escribir en la función, utilizamos una clave llamada `name` para ayudar a la función a identificar qué valor estamos introduciendo en la operación de escritura. Estas definiciones adquieren mayor importancia al tratar con múltiples valores.
</details>
<br/>

Una vez que se define la lógica de la función y se configura correctamente el API Token como se muestra [aquí](../api.md), cree el archivo de despliegue de la siguiente manera:

<CodeGroup>
  <CodeGroupItem title="deploy.js">

```js
import { Exm, ContractType } from '@execution-machine/sdk';
import { readFileSync, writeFileSync } from 'fs';

// inicializar una nueva instancia de EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// obtener el código fuente de la función
const functionSource = readFileSync('function.js');

// .deploy(source, initState, contractType)
const data = await exm.functions.deploy(functionSource, { users: [] }, ContractType.JS);

// escribir el id de la función en un archivo local
writeFileSync('./functionId.js', `export const functionId = "${data.id}"`)
```

  </CodeGroupItem>
</CodeGroup>

Mientras se realiza el despliegue, debemos pasar la lógica de la función, el estado inicial de la función y el lenguaje de programación de la definición de la función como argumentos. Para desplegar, ejecute el siguiente comando en la línea de comandos dentro del directorio adecuado del proyecto:

```bash
node deploy.js
```

Al desplegar, recibimos algunos datos de los cuales almacenamos el `functionId` en un archivo local. El `functionId`, como indica el nombre, es un identificador único que ayuda en interacciones posteriores con la función serverless, como operaciones de lectura y escritura.

Las siguientes secciones explican el proceso de lectura y escritura con las funciones de EXM.