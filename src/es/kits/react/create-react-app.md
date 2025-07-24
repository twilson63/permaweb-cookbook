---
locale: es
---

# Kit de inicio de Create React App

Esta guía te guiará paso a paso para configurar tu entorno de desarrollo para construir y desplegar una aplicación React en la permaweb.

## Requisitos previos

-   Conocimiento básico de TypeScript (no obligatorio) - [https://www.typescriptlang.org/docs/](Aprende TypeScript)
-   NodeJS v16.15.0 o superior - [https://nodejs.org/en/download/](Descargar NodeJS)
-   Conocimiento de ReactJS - [https://reactjs.org/](Aprende ReactJS)
-   Conocer git y comandos comunes de la terminal

## Dependencias de desarrollo

-   TypeScript
-   NPM o Yarn Package Manager

## Pasos

### Crear proyecto

Si no estás familiarizado con TypeScript, puedes excluir la verificación adicional `--template typescript`

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npx create-react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
</CodeGroup>

### Cambiar al directorio del proyecto

```sh
cd permaweb-create-react-app
```

### Instalar react-router-dom

Debes instalar este paquete para gestionar el enrutamiento entre diferentes páginas.

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

Ahora debemos comprobar si todo funciona correctamente antes de pasar al siguiente paso. Ejecuta:

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm start
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn start
```

  </CodeGroupItem>
</CodeGroup>

Esto iniciará un nuevo servidor de desarrollo local en tu máquina. Por defecto, utiliza el `PUERTO 3000`. Si este puerto ya está en uso, es posible que te pida que cambies a otro disponible en la terminal.

### Modificar el package.json para incluir la siguiente configuración

```json
{
  ...
  "homepage": ".",
}
```

### Configurar el enrutamiento

Ahora modifica la aplicación y añade una nueva ruta, como una página "Acerca de". Primero crea dos archivos .tsx más. (si has excluido la verificación adicional `--template typescript`, entonces la extensión del archivo de tus componentes debería ser `.jsx o .js`)

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
			¡Bienvenido a la Permaweb!
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
			¡Bienvenido a la página Acerca de!
			<Link to={"/"}>
				<div>Inicio</div>
			</Link>
		</div>
	);
}

export default About;
```

#### Modificar App.tsx

Necesitamos actualizar App.tsx para gestionar las diferentes páginas.

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

::: info Enrutamiento con Hash

Ten en cuenta que envolvemos las rutas en un HashRouter y usamos el componente Link de react-router-dom para construir los enlaces.
Esto es importante en la permaweb en su estado actual, asegurará que las rutas funcionen correctamente porque las aplicaciones
se sirven en una ruta como `https://[gateway]/[TX]`
:::

## Despliegue permanente

### Generar cartera

Necesitamos el paquete `arweave` para generar una cartera.

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

A continuación, ejecuta este comando en la terminal:

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Configurar Irys

Necesitamos Irys para desplegar nuestra aplicación en la Permaweb, proporciona una carga y recuperación instantáneas de datos.

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
Debes añadir AR a esta cartera y financiar tu cartera de Irys para poder cargar esta aplicación. Consulta [https://irys.xyz](https://irys.xyz) y [https://www.arweave.org/](https://www.arweave.org/) para obtener más información.
:::

### Actualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir ./build -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### Generar build

Ahora es el momento de generar un build, ejecuta:

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

### Ejecutar deploy

Por último, estamos listos para desplegar nuestra primera aplicación en la Permaweb.

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
¡Ahora deberías tener una aplicación React en la Permaweb! ¡Buen trabajo!
:::

::: info ERROR
Si recibes este error `Not enough funds to send data`, tienes que financiar tu cartera de Irys con AR y luego intentar desplegarla de nuevo. Ejecuta:
:::

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
irys fund 1479016 -h https://node1.irys.xyz -w wallet.json -c arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
irys fund 1479016 -h https://node1.irys.xyz -w wallet.json -c arweave
```

  </CodeGroupItem>
</CodeGroup>

::: info
El número 1479016 anterior es una cantidad de AR expresada en winston, la unidad más pequeña de AR. Esto llevará algún tiempo en propagarse a tu cartera de Irys. Vuelve en 10-20 minutos e intenta ejecutar el despliegue nuevamente.
:::

## Repositorio

Una versión completada de este ejemplo está disponible aquí: [https://github.com/VinceJuliano/permaweb-create-react-app](https://github.com/VinceJuliano/permaweb-create-react-app)

## Resumen

Esta es una versión de Create React App para publicar una aplicación React en la Permaweb. ¡Puede descubrir nuevas formas de desplegar una aplicación en la Permaweb o consultar otros kits de inicio en esta guía!
