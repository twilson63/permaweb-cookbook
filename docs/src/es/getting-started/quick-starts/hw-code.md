---
locale: es
---

# Hola Mundo (Código)

Esta guía le ayudará a lograr de forma rápida una página web estática HTML, CSS y JavaScript en Permaweb usando solo unas pocas líneas de código y una [interfaz de línea de comandos (CLI)](./hw-cli.md).

## Requisitos

-   [NodeJS](https://nodejs.org) LTS o superior
-   Conocimientos básicos de HTML, CSS y JavaScript
-   Un editor de texto (VS Code, Sublime, u otro similar)

## Descripción

Usar una terminal/ventana de consola para crear una nueva carpeta llamada `hola-mundo`.

## Configuración

```sh
cd hola-mundo
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

Ahora abra su editor de texto e importe el directorio `hola-mundo`.

## Generar una cartera

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Crear una página web

Esta página web usa HTML, CSS y JavaScript básicos para crear un botón con estilo que cambia el color del texto del encabezado cuando se hace clic. Una vez completado, usaremos Irys y nuestra cartera previamente generada para desplegar una página web completamente funcional, estática y permanente en Arweave.

Copie el código de los siguientes bloques de código y péguelos en sus archivos:

**index.html**

<details>
<summary>Haz clic para ver HTML</summary>

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" type="text/css" href="style.css" />
		<script src="index.js"></script>
		<title>¡Cookbook Hola Mundo!</title>
	</head>

	<body>
		<button onclick="changeColor()" class="button">¡Haz clic aquí!</button>
		<h1 id="main">¡Hola Mundo!</h1>
	</body>
</html>
```

</details>
<hr />

**style.css**

<details>
<summary>Haz clic para ver CSS</summary>

```css
.button {
	padding: "10px";
	background-color: #4caf50;
}
```

</details>
<hr />

**index.js**

<details>
<summary>Haz clic para ver JS</summary>

```javascript
function changeColor() {
	const header = document.getElementById("main");
	header.style.color === "" ? (header.style.color = "red") : (header.style.color = "");
}
```

</details>
<hr />

Ahora que hay un sitio estático para desplegar, se puede comprobar para asegurarse de que todo funcione correctamente escribiendo `open src/index.html` en su consola/terminal. Si todo funciona como se espera, ¡es hora de desplegar en Arweave!

## Subir con Irys

El comando a continuación despliega el directorio `src` mientras también indica el archivo `index.html` como índice para los manifiestos (relativo a la ruta proporcionada al indicador `upload-dir`).

```sh
irys upload-dir src -h https://node2.irys.xyz --index-file index.html -c arweave -w ./wallet.json
```

## ¡¡Felicidades!!

¡Acabas de publicar un sitio estático en Arweave utilizando solo unas pocas instrucciones y algunas líneas de código!
