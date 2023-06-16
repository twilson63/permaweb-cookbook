---
locale: es
---
# Escribir en funciones sin servidor con el SDK de Execution Machine

Una vez que una función está desplegada, su estado puede ser actualizado con la ayuda de interacciones de escritura. Debido a la arquitectura única de las funciones sin servidor de EXM, la lógica para actualizar el estado se almacena junto con el propio estado y ambos pueden ser referenciados utilizando el mismo `functionId`. Las funciones pueden tener una sola operación o múltiples operaciones para actualizar el estado según los requisitos de la aplicación y los argumentos para la llamada de escritura varían en consecuencia.

<details>
<summary><strong>Lógica de la función y ejemplo de escritura correspondiente</strong></summary>

- <strong>Ejemplo de función con una sola operación para actualizar el estado:</strong>

La siguiente función agrega nombres a un arreglo de usuarios:

```js
export async function handle(state, action) {
    state.users.push(action.input.name);
    return { state };
}
```

El estado se actualiza con la siguiente línea:

```js
state.users.push(action.input.name);
```

En este caso, la llamada de escritura solo necesita un par clave-valor de `name` como entrada:

```js
const inputs = [{ name: 'Open Sourcerer' }];
```

- <strong>Ejemplo de función con múltiples operaciones para actualizar el estado:</strong>

La siguiente función crea publicaciones pero también tiene la capacidad de actualizar o eliminar estas publicaciones:

```js
export async function handle(state, action) {
  const { input } = action
  if (input.type === 'createPost' || input.type === 'updatePost') {
    state.posts[input.post.id] = input.post
  }
  if (input.type === 'deletePost') {
    delete state.posts[input.postId]
  }
  return { state }
}
```

Las publicaciones son objetos con el siguiente formato:

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

Damos a cada publicación un `id` único para poder referenciarlo para actualizarlo o eliminarlo. Si no existe un `id` correspondiente, se crea una nueva publicación.

Sin embargo, como se puede ver en la función anterior, esta lógica de función tiene la capacidad de realizar múltiples operaciones y por lo tanto se le ha dado un nombre al `type` de cada una. Este nombre debe pasarse como entrada junto con la publicación o el id para realizar la llamada de escritura apropiada. Para actualizar una publicación, las entradas para la llamada de escritura se verían de la siguiente manera:

```js
const inputs = [{
  type: 'updatePost',
  post: {
    id,
    title: "My Post",
    content: "My updated post",
    author: "Open Sourcerer"
  }
}];
```
</details>
<br/>

La transacción de escritura toma dos argumentos. El `functionId` de la función con la que se va a interactuar y cualquier `inputs` que la función necesite para procesar la solicitud de escritura y actualizar el estado.

<CodeGroup>
  <CodeGroupItem title="write.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// inicializar una nueva instancia de EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// inputs es un arreglo de objetos
const inputs = [{ name: 'Open Sourcerer' }];

// leer desde la capa en caché
const writeResult = await exm.functions.write(functionId, inputs);
console.log(writeResult);
```

  </CodeGroupItem>
</CodeGroup>

Una solicitud de escritura exitosa devuelve un objeto con el estado SUCCESS.

```bash
{
  status: 'SUCCESS',
  data: {
    pseudoId: 'txnId',
    execution: {
      state: [Object],
      result: null,
      validity: [Object],
      exmContext: [Object],
      updated: false
    }
  }
}
```