---
locale: pt
---
# Kit Inicial Svelte/Vite

Svelte é o framework que compila sem problemas, resultando em pacotes pequenos, o que é perfeito para a permaweb. Como desenvolvedores, valorizamos tanto a experiência do desenvolvedor quanto a experiência do usuário. Este kit utiliza o sistema de pacotes `vite` para proporcionar aos desenvolvedores uma ótima experiência de desenvolvimento (DX).

## Instalando o vite com svelte e typescript

<CodeGroup>
  <CodeGroupItem title="NPM v6">

```console
npm create vite@latest my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM v7">

```console
npm create vite@latest my-perma-app -- --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="PNPM">

```console
pnpm create vite my-perma-app --template svelte-ts
```

  </CodeGroupItem>
</CodeGroup>

## Informações do Projeto

O sistema de compilação do vite coloca o arquivo index.html na raiz do diretório, onde você deve incluir qualquer css ou dependências de script global, se necessário. Para obter mais informações sobre a estrutura do projeto vite, confira a [documentação do vite](https://vitejs.dev/guide/#index-html-and-project-root).

## Configurar o hash-router

Para configurar o hash-router, vamos utilizar o [tinro](https://github.com/AlexxNB/tinro). `tinro` é uma pequena biblioteca declarativa de rotas, similar ao React Router.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install --save-dev tinro
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add -D tinro
```

  </CodeGroupItem>
</CodeGroup>

## Definindo o uso do roteamento de hash pelo Svelte

No arquivo `src/App.svelte`, você quer configurar o roteador para usar o modo de roteamento de hash.

```html
<script lang="ts">
  import { Route, router } from "tinro";
  router.mode.hash();
  router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main>

</main>
```

A função `router.mode.hash` ativa o modo de roteador de hash.
O callback `router.subscribe` é útil para voltar a página para o topo quando ocorrer uma troca de página.

## Adicionando alguns componentes de transição

Esses componentes serão responsáveis pela transição entre uma página e outra durante o roteamento.

Crie um diretório chamado `components` dentro do diretório `src` e adicione esses dois arquivos:

announcer.svelte

```html
<script>
  import { router } from "tinro";
  $: current = $router.path === "/" ? "Home" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">
  {#key current}
    Navegando para {current}
  {/key}
</div>

<style>
  div {
    position: absolute;
    left: 0;
    top: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
    width: 1px;
    height: 1px;
  }
</style>
```

> Este componente é para leitores de tela que anunciam quando uma página muda.

transition.svelte

```html
<script>
  import { router } from "tinro";
  import { fade } from "svelte/transition";
</script>

{#key $router.path}
  <div in:fade={{ duration: 700 }}>
    <slot />
  </div>
{/key}
```

> Este componente adiciona um efeito de fade à transição da página.

## Adicionando rotas ao aplicativo

```html
<script lang="ts">
  ...
  import Announcer from "./components/announcer.svelte";
  import Transition from "./components/transition.svelte";
  ...
</script>
<Announcer />
<Transition>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Transition>
```

Adicionar os componentes Announcer e Transition ao nosso sistema de roteamento lidará com a anunciação das transições de página, bem como a animação da transição.

## Criando algumas páginas

### home.svelte

```html
<script lang="ts">
let count = 0

function inc() {
  count += 1
}
</script>
<h1>Olá Permaweb</h1>
<button on:click={inc}>Inc</button>
<p>Contagem: {count}</p>
<a href="/about">Sobre</a>
```

### about.svelte

```html
<h1>Página Sobre</h1>
<p>Svelte/Vite Página Sobre</p>
<a href="/">Início</a>
```

### Modifique `App.svelte`

```html
<script lang="ts">
  ...
  import Home from './home.svelte'
  import About from './about.svelte'
  
</script>
...
```

## Implantação na Permaweb

### Gerar carteira

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Instalar o bundlr

```sh
yarn add -D @bundlr-network/client
```

### Atualizar o package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Executar o deploy

```sh
yarn deploy
```

::: tip SUCESSO 
Agora você deverá ter um Aplicativo Svelte na Permaweb! Ótimo trabalho!
:::

::: warning Financiar a carteira
se o seu aplicativo for maior que 120 kb, você precisará financiar a sua carteira do bundlr. Veja mais informações em [https://bundlr.network](https://bundlr.network).
::: 

## Repositório

Uma versão completa deste exemplo está disponível aqui: [https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## Resumo

Esta é uma versão mínima para publicar um aplicativo Svelte na permaweb, mas você pode querer mais recursos, como recarregamento automático e tailwind, etc. Confira `hypar` para um kit inicial pronto para uso. [HypAR](https://github.com/twilson63/hypar)