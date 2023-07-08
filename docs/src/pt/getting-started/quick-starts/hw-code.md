---
locale: pt
---
# Olá Mundo (Código)

Este guia o orientará sobre uma maneira rápida de colocar uma página da web estática em HTML, CSS e JavaScript no permaweb usando algumas linhas de código e uma [interface de linha de comando (CLI)](./hw-cli.md).

## Requisitos

* [NodeJS](https://nodejs.org) LTS ou superior
* Conhecimentos básicos de HTML, CSS e JavaScript
* Um editor de texto (VS Code, Sublime ou similar)

## Descrição

Usando uma janela de terminal/console, crie uma nova pasta chamada `hello-world`.

## Configuração

```sh
cd hello-world
npm init -y
npm install arweave @bundlr-network/client
mkdir src && cd src
touch index.js index.html style.css
```

Em seguida, abra seu editor de texto e importe o diretório `hello-world`.


## Gerar uma carteira

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Criar uma página da web
Esta página da web utiliza HTML, CSS e JavaScript básicos para criar um botão estilizado no qual, ao clicar nele, a cor do texto do cabeçalho muda. Quando terminarmos, usaremos o Bundlr e a carteira gerada anteriormente para implantar uma página da web totalmente funcional, estática e permanente no Arweave.

Cole o código dos seguintes blocos de código em seus respectivos arquivos:

**index.html**

<details>
<summary>Clique para visualizar o HTML</summary>

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
  <button onclick="changeColor()" class="button">Clique em Mim!</button>
  <h1 id="main">Olá Mundo!</h1>
</body>

</html>
```

</details>
<hr />

**style.css**

<details>
<summary>Clique para visualizar o CSS</summary>

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
<summary>Clique para visualizar o JS</summary>

```javascript
function changeColor() {
  const header = document.getElementById("main");
  header.style.color === "" ? header.style.color = "red" : header.style.color = ""
}
```

</details>

<hr />

Agora que existe um site estático para implantar, você pode verificá-lo para garantir que tudo funcione corretamente digitando `open src/index.html` no seu console/terminal. Se tudo estiver funcionando como esperado, chegou a hora de implantar no Arweave!

## Fazer upload usando o Bundlr
O comando abaixo implanta o diretório `src`, indicando também o arquivo `index.html` como índice para os manifestos (relativo ao caminho fornecido para a sinalização `upload-dir`).

```sh
bundlr upload-dir src -h https://node2.bundlr.network --index-file index.html -c arweave -w ./wallet.json
```

## Parabéns!!

Você acabou de publicar um site estático no Arweave usando alguns comandos e algumas linhas de código!