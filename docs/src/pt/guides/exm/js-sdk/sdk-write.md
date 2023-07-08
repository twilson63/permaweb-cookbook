---
locale: pt
---
# Escreva para Funções Serverless com o SDK Execution Machine

Uma vez que uma função é implantada, seu estado pode ser atualizado com a ajuda de interações de escrita. Devido à arquitetura única das funções serverless do EXM, a lógica para atualizar o estado é armazenada junto com o próprio estado, e ambos podem ser referenciados usando o mesmo `functionId`. As funções podem ter uma única operação ou várias operações para atualizar o estado de acordo com os requisitos do aplicativo, e os argumentos para a chamada de escrita variam de acordo.

<details>
<summary><strong>Lógica da Função e Exemplo de Escrita Correspondente</strong></summary>

- <strong>Exemplo de função com uma única operação para atualizar o estado:</strong>

A seguinte função adiciona nomes a um array de usuários:

```js
export async function handle(state, action) {
    state.users.push(action.input.name);
    return { state };
}
```

O estado é atualizado pela seguinte linha:

```js
state.users.push(action.input.name);
```

Neste caso, a chamada de escrita só precisa de um par chave-valor de `name` como entrada:

```js
const inputs = [{ name: 'Open Sourcerer' }];
```

- <strong>Exemplo de função com várias operações para atualizar o estado:</strong>

A seguinte função cria postagens, mas também tem a capacidade de atualizar ou excluir essas postagens:

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

As postagens são objetos com o seguinte formato:

```js
post: {
  id: string
  title: string
  content: string
  author: string
}
```

Damos a cada postagem um `id` único para que possamos nos referir a ela para atualizar ou excluir. Se não existir um `id` correspondente, uma nova postagem é criada.

No entanto, como pode ser visto na função acima, essa lógica de função tem a capacidade de realizar várias operações e, portanto, o `type` para cada uma recebeu um nome. Esse nome deve ser passado como entrada juntamente com a postagem ou o id para realizar a chamada adequada de escrita. Para atualizar uma postagem, as entradas para a chamada de escrita ficariam assim:

```js
const inputs = [{
  type: 'updatePost',
  post: {
    id,
    title: "Minha Postagem",
    content: "Minha postagem atualizada",
    author: "Open Sourcerer"
  }
}];
```
</details>
<br/>

A transação de escrita recebe dois argumentos. O `functionId` da função com a qual interagir e quaisquer `inputs` que a função precise para processar a solicitação de escrita e atualizar o estado.

<CodeGroup>
  <CodeGroupItem title="write.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// inicializar nova instância EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// inputs é um array de objetos
const inputs = [{ name: 'Open Sourcerer' }];

// ler a partir da camada em cache
const writeResult = await exm.functions.write(functionId, inputs);
console.log(writeResult);
```

  </CodeGroupItem>
</CodeGroup>

Uma solicitação de escrita bem-sucedida retorna um objeto com o status SUCCESS.

```bash
{
  status: 'SUCCESS',
  data: {
    pseudoId: 'txnId',
    execution: {
      state: [Objeto],
      result: null,
      validity: [Objeto],
      exmContext: [Objeto],
      updated: false
    }
  }
}
```