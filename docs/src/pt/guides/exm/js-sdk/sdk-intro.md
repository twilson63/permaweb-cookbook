---
locale: pt
---
# Execução da Máquina SDK

O SDK JavaScript permite o uso da Máquina de Execução (EXM) em aplicativos JavaScript e TypeScript. Para usar o SDK, são necessárias as seguintes etapas de configuração.

## Instalação

Para instalar o EXM no seu projeto, você pode usar `npm` ou `yarn`.

<CodeGroup>
  <CodeGroupItem title="npm">

```bash
npm install @execution-machine/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="yarn">

```bash
yarn add @execution-machine/sdk
```

  </CodeGroupItem>
</CodeGroup>

## Importação

Ao usar o EXM no seu projeto, o pacote deve ser importado da seguinte forma.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
import { Exm } from '@execution-machine/sdk';
```
  </CodeGroupItem>
</CodeGroup>

## Criando uma instância

Para interagir com o EXM após a instalação e importação, uma instância deve ser criada.

<CodeGroup>
  <CodeGroupItem title="JavaScript">

```js
const exmInstance = new Exm({ token: 'MEU_TOKEN_EXM' });
```
  </CodeGroupItem>
</CodeGroup>

## Resumo

Os guias a seguir mostrarão como implantar funções sem servidor usando o EXM JS SDK e como interagir com elas.