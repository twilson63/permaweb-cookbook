---
locale: pt
---
# Criar Kit Inicial do Vue

Este guia fornecerá instruções passo a passo para configurar seu ambiente de desenvolvimento e construir uma aplicação Vue para a permaweb.

## Pré-requisitos

- Conhecimento básico de Typescript (não obrigatório) - [Aprender Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 ou superior - [Baixar NodeJS](https://nodejs.org/en/download/)
- Conhecimento de Vue.js (preferencialmente Vue 3) - [Aprender Vue.js](https://vuejs.org/)
- Conhecer git e comandos comuns de terminal

## Dependências de desenvolvimento

- Typescript (opcional)
- NPM ou Gerenciador de pacotes Yarn

## Passos

### Criar um projeto

O comando a seguir instala e inicia o create-vue, a ferramenta oficial de construção de projetos Vue.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm init vue@latest
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn create vue
```

</CodeGroupItem>
</CodeGroup>

Durante o processo, você será solicitado a selecionar recursos opcionais, como Typescript e suporte a testes. Recomendo selecionar o `Vue Router` com yes, o restante pode ser selecionado conforme sua preferência.

```console:no-line-numbers
✔ Nome do projeto: … <nome-do-seu-projeto>
✔ Adicionar Typescript? … No / Yes
✔ Adicionar Suporte JSX? … No / Yes
✔ Adicionar Vue Router para desenvolvimento de aplicativos de página única? … No / *Yes*
✔ Adicionar Pinia para gerenciamento de estado? … No / Yes
✔ Adicionar Vitest para testes unitários? … No / Yes
✔ Adicionar Cypress para testes de unidade e ponta a ponta? … No / Yes
✔ Adicionar ESLint para qualidade do código? … No / Yes
✔ Adicionar Prettier para formatação de código? … No / Yes
```

### Acessar o diretório do projeto

```sh
cd <nome-do-seu-projeto>
```

### Instalar dependências

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn
```

</CodeGroupItem>
</CodeGroup>

### Configurar o Router

O Vue Router é o roteador oficial para o Vue.js e se integra perfeitamente ao Vue. Para fazê-lo funcionar com a Permaweb, mude de um roteador de histórico do navegador para um roteador de hash, já que a URL não pode ser enviada ao servidor. Altere `createWebHistory` para `createWebHashHistory` no seu arquivo `src/router/index.ts` ou `src/router/index.js`.

```ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

### Configurar a compilação

Configure o processo de compilação no arquivo `vite.config.ts` ou `vite.config.js`. Para servir aplicativos Permaweb de um subcaminho (https://[gateway]/[TX_ID]), atualize a propriedade base para ./ no arquivo de configuração.

```ts
export default defineConfig({
  base: './',
  ...
})
```

### Executar o aplicativo

Antes de prosseguir, é crucial verificar se tudo está funcionando corretamente. Execute uma verificação para garantir um progresso tranquilo.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn dev
```

</CodeGroupItem>
</CodeGroup>

Isso iniciará um novo servidor de desenvolvimento localmente em sua máquina por padrão, ele usa `PORT 5173`. Se essa porta já estiver em uso, o número da porta aumentará em 1 (`PORT 5174`) e tentará novamente.

## Implantação

### Gerar uma carteira

O pacote `arweave` é necessário para gerar uma carteira.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arweave

```

</CodeGroupItem>
</CodeGroup>

Para gerar sua carteira, execute o seguinte comando no terminal:

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Instalar o Bundlr

O Bundlr é necessário para implantar seu aplicativo na Permaweb, pois oferece upload e recuperação instantâneos de dados.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save-dev @bundlr-network/client
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add -D @bundlr-network/client
```

</CodeGroupItem>
</CodeGroup>

::: info Arweave Wallet
Para enviar este aplicativo, você pode precisar adicionar AR e financiar sua carteira Bundlr. Visite [https://bundlr.network](https://bundlr.network) e [https://www.arweave.org/](https://www.arweave.org/) para obter mais informações.
:::

### Atualizar o package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Atualizar o .gitignore

Para proteger seus fundos, é importante manter o arquivo da sua carteira privado. Fazer o upload dele no GitHub, onde ele pode se tornar público, pode resultar no vazamento do seu dinheiro. Para evitar isso, adicione o arquivo `wallet.json` ao seu arquivo `.gitignore`. E não se esqueça de salvá-lo em um local seguro.

```sh
echo "wallet.json" >> .gitignore
```

### Executar a compilação

Agora é hora de gerar a compilação.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm run build
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn build
```

</CodeGroupItem>
</CodeGroup>

### Executar a implantação

Finalmente, estamos prontos para implantar nosso Primeiro Aplicativo Permaweb.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm run deploy
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```console:no-line-numbers
yarn deploy
```

</CodeGroupItem>
</CodeGroup>

::: tip SUCESSO
Agora você deve ter um aplicativo Vue na Permaweb! Ótimo trabalho!
:::

::: warning Financie sua carteira
Se o seu aplicativo for maior que 120 KB ou você receber o erro `Not enough funds to send data`, você precisará financiar sua carteira Bundlr. Consulte [https://bundlr.network](https://bundlr.network) para obter mais informações.
:::

## Repositório

Um exemplo totalmente funcional em JavaScript ou TypeScript pode ser encontrado neste local.

* Repositório: [https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## Resumo

Este guia fornece um método simples passo a passo para publicar um aplicativo Vue.js na Permaweb usando o Create Vue. Se você precisar de recursos adicionais do Tailwind, considere explorar kits de inicialização alternativos listados no guia para encontrar uma solução adequada para seus requisitos.