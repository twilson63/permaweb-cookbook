---
locale: es
---

# Kit de inicio de Svelte/Vite

Svelte es el marco que se compila rápidamente, lo que da como resultado paquetes pequeños, perfectos para la permaweb. Como desarrolladores, valoramos la experiencia de desarrollo tanto como la experiencia de usuario. Este kit utiliza el sistema de paquetes `vite` para brindar a los desarrolladores una gran experiencia de desarrollo (DX).

## Instalando vite con svelte y typescript

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

## Información del proyecto

El sistema de compilación de vite coloca su archivo index.html en el directorio raíz, aquí es donde debe incluir cualquier dependencia de css o script global si es necesario. Para obtener más información sobre la configuración del proyecto con vite, consulte la [documentación de vite](https://vitejs.dev/guide/#index-html-and-project-root)

## Configurando el hash-router

Para configurar el hash-router utilizaremos [tinro](https://github.com/AlexxNB/tinro). `tinro` es una pequeña biblioteca declarativa de enrutamiento, similar a React Router.

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

## Indicar a Svelte que utilice el enrutamiento hash

En el archivo `src/App.svelte`, debes configurar el enrutador para que utilice el modo de enrutamiento hash.

```html
<script lang="ts">
	import { Route, router } from "tinro";
	router.mode.hash();
	router.subscribe((_) => window.scrollTo(0, 0));
</script>
<main></main>
```

La función `router.mode.hash` activa el modo de enrutamiento hash.
La devolución de llamada `router.subscribe` sirve para restablecer la página en la parte superior en las transferencias de página.

## Agregando algunos componentes de transición

Estos componentes gestionarán la transición entre una página y otra durante el enrutamiento.

Crea un directorio en el directorio `src` llamado `components` y agrega estos dos archivos:

announcer.svelte

```html
<script>
	import { router } from "tinro";
	$: current = $router.path === "/" ? "Inicio" : $router.path.slice(1);
</script>

<div aria-live="assertive" aria-atomic="true">{#key current} Navegaste a {current} {/key}</div>

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

> Este componente es para lectores de pantalla que anuncian cuando una página cambia.

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

> Este componente agrega un efecto de desvanecimiento a la transición de página.

## Agregando rutas a la aplicación

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

Agregando los componentes Announcer y Transition a nuestro sistema de enrutamiento se encargarán de anunciar las transiciones de página, así como de animar la transición.

## Creando algunas páginas

### home.svelte

```html
<script lang="ts">
	let count = 0;

	function inc() {
		count += 1;
	}
</script>
<h1>Hola Permaweb</h1>
<button on:click="{inc}">Incrementar</button>
<p>Conteo: {count}</p>
<a href="/about">Acerca de</a>
```

### about.svelte

```html
<h1>Página Acerca</h1>
<p>Acerca de Svelte/Vite</p>
<a href="/">Inicio</a>
```

### Modificar `App.svelte`

```html
<script lang="ts">
	...
	import Home from './home.svelte'
	import About from './about.svelte'
</script>
...
```

## Implementando en la Permaweb

### Generar billetera

```sh
yarn add -D arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Instalar Irys

```sh
yarn add -D @irys/sdk
```

### Actualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "yarn build && irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Ejecutar implementación

```sh
yarn deploy
```

::: tip ÉXITO
¡Ahora deberías tener una aplicación Svelte en la Permaweb! ¡Buen trabajo!
:::

::: warning Financiar la billetera
Si tu aplicación pesa más de 120 kb, deberás financiar tu billetera de Irys. Consulta [https://irys.xyz](https://irys.xyz) para obtener más información.
:::

## Repositorio

Una versión completa de este ejemplo está disponible aquí: [https://github.com/twilson63/svelte-ts-vite-example](https://github.com/twilson63/svelte-ts-vite-example)

## Resumen

Esta es una versión mínima de cómo publicar una aplicación Svelte en la permaweb, pero es posible que desees más características, como recarga en caliente y tailwind, etc. Echa un vistazo a `hypar` para obtener un kit de inicio completo. [HypAR](https://github.com/twilson63/hypar)
