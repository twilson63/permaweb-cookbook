---
locale: es
---

# Crear Starter Kit de Vue

Esta guía proporcionará instrucciones paso a paso para configurar tu entorno de desarrollo y construir una aplicación Vue en la permaweb.

## Requisitos previos

-   Conocimiento básico de TypeScript (no obligatorio) - [Aprende TypeScript](https://www.typescriptlang.org/docs/)
-   NodeJS v16.15.0 o superior - [Descarga NodeJS](https://nodejs.org/en/download/)
-   Conocimiento de Vue.js (preferiblemente Vue 3) - [Aprende Vue.js](https://vuejs.org/)
-   Conocimiento de git y comandos de terminal comunes

## Dependencias de desarrollo

-   TypeScript (opcional)
-   Gestor de paquetes NPM o Yarn

## Pasos

### Crear el proyecto

El siguiente comando instala y lanza create-vue, la herramienta oficial de estructura para proyectos de Vue.

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

Durante el proceso, se te pedirá que elijas características opcionales como TypeScript y soporte de pruebas. Recomiendo seleccionar `Vue Router` con sí, el resto se puede seleccionar según tu preferencia.

```console:no-line-numbers
✔ Nombre del proyecto: … <nombre-de-tu-proyecto>
✔ ¿Agregar TypeScript? … No / Sí
✔ ¿Agregar soporte para JSX? … No / Sí
✔ ¿Agregar Vue Router para el desarrollo de aplicaciones de una sola página? … No / *Sí*
✔ ¿Agregar Pinia para la gestión de estado? … No / Sí
✔ ¿Agregar Vitest para pruebas unitarias? … No / Sí
✔ ¿Agregar Cypress para pruebas unitarias y end-to-end? … No / Sí
✔ ¿Agregar ESLint para la calidad del código? … No / Sí
✔ ¿Agregar Prettier para el formato del código? … No / Sí
```

### Cambiar al directorio del proyecto

```sh
cd <nombre-de-tu-proyecto>
```

### Instalar dependencias

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

### Configurar el enrutador

Vue Router es el enrutador oficial para Vue.js y se integra perfectamente con Vue. Para que funcione en la permaweb, cambia de un enrutador de historial de navegación (browser history router) a un enrutador de hash (hash router) ya que la URL no se puede enviar al servidor. Cambia `createWebHistory` a `createWebHashHistory` en tu archivo `src/router/index.ts` o `src/router/index.js`.

```ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/AboutView.vue"),
		},
	],
});

export default router;
```

### Configurar la compilación

Configura el proceso de compilación en el archivo `vite.config.ts` o `vite.config.js`. Para servir aplicaciones en la permaweb desde una subruta (https://[gateway]/[TX_ID]), actualiza la propiedad base a ./ en el archivo de configuración.

```ts
export default defineConfig({
  base: './',
  ...
})
```

### Ejecutar la aplicación

Antes de continuar, es crucial verificar que todo esté funcionando correctamente. Realiza una comprobación para asegurarte de que el progreso sea fluido.

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
esto iniciará un nuevo servidor de desarrollo local en tu máquina, por defecto utiliza el `PUERTO 5173`, si este puerto ya está en uso, puede aumentar el número del puerto en 1 (`PUERTO 5174`) e intentar nuevamente.

## Desplegar

### Generar cartera

Se requiere el paquete `arweave` para generar una cartera.

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

Para generar tu cartera, ejecuta el siguiente comando en la terminal:

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Instalar Irys

Irys es necesario para desplegar tu aplicación en la permaweb, ya que ofrece carga y recuperación instantánea de datos.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save-dev @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add -D @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

::: info Arweave Wallet
Para subir esta aplicación, es posible que necesites agregar AR y financiar tu cartera de Irys. Visita [https://irys.xyz](https://irys.xyz) y [https://www.arweave.org/](https://www.arweave.org/) para obtener más información.
:::

### Actualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Actualizar .gitignore

Para proteger tus fondos, es importante mantener tu archivo de cartera en privado. Subirlo a GitHub, donde potencialmente podría hacerse público, podría resultar en una filtración de tu dinero. Para evitar esto, agrega el archivo `wallet.json` a tu archivo `.gitignore`. Y no olvides guardarlo en un lugar seguro.

```sh
echo "wallet.json" >> .gitignore
```

### Compilar

Ahora es el momento de generar la compilación.

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

### Desplegar

Finalmente estamos listos para desplegar nuestra Primera Aplicación en la Permaweb.

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

::: tip ÉXITO
¡Ahora deberías tener una aplicación Vue en la Permaweb! ¡Buen trabajo!
:::

::: warning Financiar la cartera
Si tu aplicación pesa más de 120 KB o recibes el error `Not enough funds to send data`, deberás financiar tu cartera de Irys. Consulta [https://irys.xyz](https://irys.xyz) para obtener más información.
:::

## Repositorio

Un ejemplo completamente funcional en JavaScript o TypeScript se puede encontrar en esta ubicación.

-   Repositorio: [https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## Resumen

Esta guía proporciona un método simple paso a paso para publicar una aplicación Vue.js en la Permaweb utilizando Create Vue. Si necesitas características adicionales de Tailwind, considera explorar los kits de inicio alternativos enumerados en la guía para encontrar una solución adecuada para tus requisitos.
