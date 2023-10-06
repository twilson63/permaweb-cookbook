---
locale: es
---

# Kit de Inicio Vite

Esta guía te guiará paso a paso para configurar tu entorno de desarrollo y construir y implementar una aplicación permaweb de React.

## Requisitos previos

-   Conocimientos básicos de TypeScript (no obligatorio) - [https://www.typescriptlang.org/docs/](Aprende TypeScript)
-   NodeJS v16.15.0 o superior - [https://nodejs.org/en/download/](Descargar NodeJS)
-   Conocimientos de ReactJS - [https://reactjs.org/](Aprende ReactJS)
-   Conocimiento de git y comandos de terminal comunes

## Dependencias de desarrollo

-   TypeScript
-   NPM o Yarn Package Manager

## Pasos

### Crear el proyecto

Si no estás familiarizado con TypeScript, puedes utilizar la plantilla "react" (`--template react`)

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm create vite@latest my-arweave-app -- --template react-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create vite my-arweave-app --template react-ts
```

  </CodeGroupItem>
</CodeGroup>

### Cambiar al directorio del proyecto

```sh
cd my-arweave-app
```

### Instalar react-router-dom

Debes instalar este paquete para gestionar las rutas entre las diferentes páginas.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install react-router-dom --save
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add react-router-dom -D
```

  </CodeGroupItem>
</CodeGroup>

### Ejecutar la aplicación

Ahora necesitamos verificar si todo está funcionando bien antes de pasar al siguiente paso. Ejecuta:

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

Esto iniciará un nuevo servidor de desarrollo en tu máquina. De forma predeterminada, utiliza el "PUERTO 3000". Si este puerto ya está en uso, es posible que te pida cambiar a otro puerto disponible en la terminal.

### Configurar tipos de billetera

Si deseas usar [ArConnect](https://arconnect.io), [Arweave.app](https://arweave.app) u otras billeteras basadas en el navegador, puedes instalar el paquete de tipos de ArConnect para tener las declaraciones de `window.arweaveWallet`.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arconnect -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arconnect -D
```

  </CodeGroupItem>
</CodeGroup>

Después de instalar el paquete, deberás agregarlo a tu archivo `src/vite-env.d.ts`.

```ts
/// <reference types="arconnect" />
```

### Configurar el enrutamiento

Ahora modifica la aplicación y agrega nuevas rutas, como una página de "Acerca de". Primero crea 2 archivos `.tsx` adicionales (si has utilizado la plantilla React de JavaScript básico, asegúrate de que la extensión de los archivos de tus componentes sea `.jsx` o `.js`).

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

#### HomePage.tsx

```ts
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			¡Bienvenido(a) al Permaweb!
			<Link to={"/about/"}>
				<div>Acerca de</div>
			</Link>
		</div>
	);
}

export default HomePage;
```

#### About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
	return (
		<div>
			¡Bienvenido(a) a la página "Acerca de"!
			<Link to={"/"}>
				<div>Inicio</div>
			</Link>
		</div>
	);
}

export default About;
```

#### Modificar App.tsx

Debemos actualizar App.tsx para gestionar diferentes páginas.

```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

::: info Enrutamiento con hash
Ten en cuenta que estamos envolviendo las rutas en un HashRouter y utilizando el componente Link de react-router-dom para crear enlaces. Esto es importante en el permaweb en su estado actual, ya que garantizará que las rutas funcionen correctamente, porque las aplicaciones se sirven en una ruta como `https://[gateway]/[TX]`.
:::

## Implementación permanente

### Generar billetera

Necesitamos el paquete `arweave` para generar una billetera.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

Luego, ejecuta este comando en la terminal.

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Configurar Irys

Necesitamos Irys para implementar nuestra aplicación en Permaweb, ya que proporciona una carga y recuperación instantáneas de datos.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

::: info
Necesitarás agregar AR a esta billetera y fondear tu billetera de Irys para poder cargar esta aplicación. Consulta [https://irys.xyz](https://irys.xyz) y [https://www.arweave.org/](https://www.arweave.org/) para obtener más información.
:::

### Actualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir ./dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
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

### Implementar

Finalmente, estamos listos para implementar nuestra primera aplicación de Permaweb.

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
¡Ahora deberías tener una aplicación de React en Permaweb! ¡Buen trabajo!
:::

::: error
Si recibes este error "Not enough funds to send data" (No hay suficientes fondos para enviar datos), debes fondear algo de AR en tu billetera y luego intentar implementarla nuevamente.
:::
