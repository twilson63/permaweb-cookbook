---
locale: pt
---
# Implantação de Funções sem Servidor com o SDK Execution Machine

Para implantar funções sem servidor com o SDK em JavaScript, criamos um script aqui que informa ao nosso computador como implantar nossa função na rede.

<details>
<summary><strong>Exemplo de Lógica de Função</strong></summary>

Após instalar o pacote, precisamos de um arquivo que define a lógica da função dentro do projeto.

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

A sintaxe para definir funções é baseada no padrão implementado pelo SmartWeave para contratos inteligentes em JavaScript. Cada função possui um `state`, que é um objeto JSON de valores armazenados nele, e `actions` para interagir com esses valores.

A função acima adiciona nomes a uma matriz de usuários, o que é feito usando a seguinte linha:

```js
state.users.push(action.input.name);
```

Ao implantar nossa função, inicializamos uma matriz vazia chamada `users` que posteriormente ajuda nossa função a identificar essa variável de estado (variável armazenada no estado da função) durante chamadas de leitura e escrita. Após a inicialização, o `state` fica assim:

```js
{ users: [] }
```

Além disso, ao escrever na função, usamos uma chave chamada `name` para ajudar a função a identificar qual valor estamos inserindo na operação de escrita. Ambas essas definições ganham maior importância ao lidar com múltiplos valores.
</details>
<br/>

Uma vez que a lógica da função é definida e o Token da API está configurado corretamente, conforme mostrado [aqui](../api.md), crie o arquivo de implantação da seguinte forma:

<CodeGroup>
  <CodeGroupItem title="deploy.js">

```js
import { Exm, ContractType } from '@execution-machine/sdk';
import { readFileSync, writeFileSync } from 'fs';

// instancia um novo EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// busca o código-fonte da função
const functionSource = readFileSync('function.js');

// .deploy(source, initState, contractType)
const data = await exm.functions.deploy(functionSource, { users: [] }, ContractType.JS);

// escreve o ID da função em um arquivo local
writeFileSync('./functionId.js', `export const functionId = "${data.id}"`)
```

  </CodeGroupItem>
</CodeGroup>

Ao implantar, precisamos passar a lógica da função, o estado inicial da função e a linguagem de programação da definição da função como argumentos. Para implantar, execute o seguinte comando na linha de comando dentro do diretório apropriado do projeto:

```bash
node deploy.js
```

Ao implantar, recebemos alguns dados nos quais armazenamos o `functionId` em um arquivo local. O `functionId`, como o nome indica, é um identificador único que ajuda em interações posteriores com a função sem servidor, como operações de leitura e escrita.

As seções a seguir descrevem o processo de leitura e escrita com funções EXM.