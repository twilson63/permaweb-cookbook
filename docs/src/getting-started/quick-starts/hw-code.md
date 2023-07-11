# Hello World (Code)

This guide walks you through the a quick way to get a static HTML, CSS and JavaScript webpage on to the permaweb using a few lines of code and a [command-line interface (CLI)](./hw-cli.md).

## Requirements

* [NodeJS](https://nodejs.org) LTS or greater
* Basic knowledge of HTML, CSS and JavaScript
* A text editor (VS Code, Sublime, or similar)

## Description

Using a terminal/console window create a new folder called `hello-world`. 

## Setup

```sh
cd hello-world
npm init -y
npm install arweave @bundlr-network/client
mkdir src && cd src
touch index.js index.html style.css
```

Next open your text editor and import the `hello-world` directory.


## Generate a wallet

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Create a webpage
This webpage is using basic HTML, CSS and JavaScript to create a styled button that when you click it the header text changes color. Once finished, we will be using Bundlr and our previously generated wallet to deploy a fully functioning, static and permanent webpage to Arweave.

Paste the code from the following code blocks into their files:

**index.html**

<details>
<summary>Click to view HTML</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="index.js"></script>
  <title>Cookbook Hello World!</title>
</head>

<body>
  <button onclick="changeColor()" class="button">Click Me!</button>
  <h1 id="main">Hello World!</h1>
</body>

</html>
```

</details>
<hr />

**style.css**

<details>
<summary>Click to view CSS</summary>

```css
.button {
  padding: '10px';
  background-color: #4CAF50;
}
```

</details>
<hr />

**index.js**

<details>
<summary>Click to view JS</summary>

```javascript
function changeColor() {
  const header = document.getElementById("main");
  header.style.color === "" ? header.style.color = "red" : header.style.color = ""
}
```

</details>

<hr />

Now that there is a static site to deploy, it can be checked to ensure it all functions properly by typing `open src/index.html` in your console/terminal. If everything is working as expected it is time to deploy to Arweave!

## Upload using bundlr
The command below deploys the `src` directory whilst also indicating the `index.html` file as an index for the manifests (relative to the path provided to `upload-dir` flag).

```sh
npx bundlr upload-dir src -h https://node2.bundlr.network --index-file index.html -c arweave -w ./wallet.json
```

## Congrats!!

You just published a static site on Arweave using a few commands and a few lines of code!
