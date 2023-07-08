---
locale: pt
---
# Ler de funções sem servidor com o SDK do Execution Machine

Existem duas maneiras de ler o estado de uma função sem servidor do EXM. Como explicado na [introdução](../intro.md#funções-sem-servidor-no-arweave), o EXM armazena uma cópia da função em uma camada de cache para atender rapidamente as aplicações, mas também faz upload da função no Arweave para manter a descentralização e seus benefícios associados. Como resultado disso, o estado da função pode ser lido tanto na camada de cache do EXM quanto diretamente do Arweave.

1. Leitura da camada de cache do EXM:

A chamada de leitura lê o estado mais recente armazenado na camada de cache do EXM. Essa camada é especificamente projetada para atender rapidamente as aplicações. Ela adota uma abordagem otimista e atualiza o estado da função imediatamente ao receber uma solicitação de transação.

<CodeGroup>
  <CodeGroupItem title="read.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// inicializar uma nova instância do EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// ler da camada de cache
const readResult = await exm.functions.read(functionId);
console.log(readResult);
```

  </CodeGroupItem>
</CodeGroup>

2. Leitura diretamente do Arweave (Avaliação):

A chamada de avaliação retorna o estado mais recente processado com sucesso no Arweave. Esse estado mais recente é calculado por [avaliação preguiçosa](../intro.md#como-funciona-o-processamento-em-segundo-plano), que avalia o estado inicial e as interações com a função na ordem de ocorrência para chegar ao estado mais recente.

<CodeGroup>
  <CodeGroupItem title="evaluate.js">

```js
import { Exm } from '@execution-machine/sdk';
import { functionId } from './functionId.js';

// inicializar uma nova instância do EXM
const exm = new Exm({ token: process.env.EXM_API_TOKEN });

// avaliar do arweave
const evalResult = await exm.functions.evaluate(functionId);
console.log(evalResult);
```

  </CodeGroupItem>
</CodeGroup>

::: dica
A leitura do Arweave é recomendada apenas para fins de verificação. O estado da função retornado pela chamada de avaliação pode ser verificado em relação às informações retornadas pela camada de cache para garantir sua autenticidade. Pode haver um pequeno atraso na publicação da solicitação de transação e sua atualização na rede.
:::