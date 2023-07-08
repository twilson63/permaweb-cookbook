---
locale: pt
---
# Kit Inicial Mínimo do Svelte

Este guia irá orientá-lo passo a passo para configurar seu ambiente de desenvolvimento para construir e implantar um aplicativo permaweb.

## Pré-requisitos 

* Conhecer TypeScript
* NodeJS v18 ou superior
* Conhecer o Svelte - [https://svelte.dev](https://svelte.dev)
* Conhecer git e comandos comuns de terminal

## Dependências de Desenvolvimento

* TypeScript
* esbuild
* w3
* yarn `npm i -g yarn`

## Passos

### Criar Projeto

```sh
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

## Criar buildscript.js

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

//verifique se o diretório existe antes que algo seja colocado nele
if (!fs.existsSync("./dist/")) {
  fs.mkdirSync("./dist/");
}
esbuild
  .build({
    entryPoints: [`./src/main.ts`],
    bundle: true,
    outdir: `./dist`,
    mainFields: ["svelte", "browser", "module", "main"],
    // logLevel: `info`,
    splitting: true,
    write: true,
    format: `esm`,
    plugins: [
      esbuildSvelte({
        preprocess: sveltePreprocess(),
      }),
    ],
  })
  .catch((error, location) => {
    console.warn(`Erros: `, error, location);
    process.exit(1);
  });

//use um arquivo html básico para testar
fs.copyFileSync("./index.html", "./dist/index.html");

```


## Modificar package.json 

Definir `type` como `module`
Adicionar um script de compilação

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## Criar diretório `src` e alguns arquivos src

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

## Main.ts

```ts
import App from './app.svelte'

new App({
  target: document.body
})
```

## app.svelte

```html
<script lang="ts">
import { Route, router } from 'tinro'
import Counter from './counter.svelte'
import About from './about.svelte'

// adicione roteamento baseado em hash para suporte permaweb
router.mode.hash()

</script>
<nav>
<a href="/">Início</a> | <a href="/about">Sobre</a>
</nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info Roteamento Baseado em Hash
Você notará a configuração `router.mode.hash()` na sessão de script, isso é importante para configurar seu aplicativo para usar o roteamento baseado em hash, que habilitará o suporte a URLs ao executar o aplicativo em um caminho, como `https://[gateway]/[TX]` 
:::


## counter.svelte

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
```

## about.svelte

```html
<h1>Página Sobre</h1>
<p>Sobre Mínimo</p>
<a href="/">Início</a>
```

## Implantar 

### Gerar Carteira

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### instalar bundlr

```sh
yarn add -D @bundlr-network/client
```

### atualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Executar implantação

```sh
yarn deploy
```

::: tip SUCESSO
Agora você deve ter um aplicativo Svelte no Permaweb! Ótimo trabalho!
:::

::: warning Financiar Carteira
Se o seu aplicativo tiver mais de 120 kb, você precisará financiar sua carteira do bundlr. Consulte [https://bundlr.network](https://bundlr.network) para obter mais informações.
::: 

## Repositório

Uma versão completa deste exemplo está disponível aqui: [https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## Resumo

Esta é uma versão mínima de publicar um aplicativo Svelte no permaweb, mas você pode querer ter mais recursos, como hot-reloading e tailwind, etc. Confira o `hypar` para obter um kit inicial completo. [HypAR](https://github.com/twilson63/hypar)