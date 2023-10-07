---
locale: es
---

# Kit de Inicio Mínimo de Svelte

Esta guía te guiará paso a paso para configurar tu entorno de desarrollo y crear y desplegar una aplicación de permaweb.

## Requisitos previos

-   Conocer TypeScript
-   NodeJS v18 o superior
-   Conocer Svelte - [https://svelte.dev](https://svelte.dev)
-   Conocer git y comandos de terminal comunes

## Dependencias de desarrollo

-   TypeScript
-   esbuild
-   w3
-   yarn `npm i -g yarn`

## Pasos

### Crear Proyecto

```sh
mkdir myproject
cd myproject
yarn init -y
yarn add -D svelte esbuild typescript esbuild-svelte tinro svelte-preprocess
```

## Crear buildscript.js

```js
import fs from "fs";
import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";

// asegurarse de que el directorio exista antes de que se añadan cosas a él
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
		console.warn(`Errors: `, error, location);
		process.exit(1);
	});

// usar un archivo html básico para probar
fs.copyFileSync("./index.html", "./dist/index.html");
```

## Modificar package.json

Establecer `type` como `module`
Agregar un build script

```json
{
  "type": "module"
  ...
  "scripts": {
    "build": "node buildscript.js"
  }
}
```

## Crear directorio `src` y algunos archivos src

```sh
mkdir src
touch src/main.ts
touch src/app.svelte
touch src/counter.svelte
touch src/about.svelte
```

## Main.ts

```ts
import App from "./app.svelte";

new App({
	target: document.body,
});
```

## app.svelte

```html
<script lang="ts">
	import { Route, router } from "tinro";
	import Counter from "./counter.svelte";
	import About from "./about.svelte";

	// agregar enrutamiento hash para soporte de permaweb
	router.mode.hash();
</script>
<nav><a href="/">Home</a> | <a href="/about">About</a></nav>
<Route path="/"><Counter /></Route>
<Route path="/about"><About /></Route>
```

::: info Enrutamiento Hash
Notarás la configuración `router.mode.hash()` en la sesión del script, esto es importante para configurar tu aplicación para usar enrutamiento basado en hash, lo que permitirá el soporte de URL al ejecutar esa aplicación en una ruta, como `https://[gateway]/[TX]`
:::

## counter.svelte

```html
<script lang="ts">
	let count = 0;

	function inc() {
		count += 1;
	}
</script>
<h1>Hola Permaweb</h1>
<button on:click="{inc}">Inc</button>
<p>Contador: {count}</p>
```

## about.svelte

```html
<h1>Página de Acerca de</h1>
<p>Página de Acerca de Mínima</p>
<a href="/">Home</a>
```

## Desplegar

### Generar billetera

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### instalar Irys

```sh
yarn add -D @irys/sdk
```

### actualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Ejecutar despliegue

```sh
yarn deploy
```

::: tip ÉXITO
¡Ahora deberías tener una Aplicación de Svelte en la Permaweb! ¡Buen trabajo!
:::

::: warning Financiar Billetera
Si tu aplicación tiene un tamaño superior a 120 kb, deberás financiar tu billetera de Irys. Visita [https://irys.xyz](https://irys.xyz) para obtener más información.
:::

## Repositorio

Una versión completa de este ejemplo está disponible aquí: [https://github.com/twilson63/permaweb-minimal-svelte-starter](https://github.com/twilson63/permaweb-minimal-svelte-starter)

## Resumen

Esta es una versión mínima de la publicación de una aplicación de Svelte en la permaweb, pero es posible que desees más características, como recarga en caliente y Tailwind, etc. Echa un vistazo a `hypar` para obtener un kit de inicio llave en mano. [HypAR](https://github.com/twilson63/hypar)
