# Hello World（程式碼）

本指南將引導你使用幾行程式碼和命令列介面（CLI），快速把一個靜態的 HTML、CSS 和 JavaScript 網頁部署到 Permaweb。

## 需求

- [NodeJS](https://nodejs.org) LTS 或更高版本
- 基本的 HTML、CSS 和 JavaScript 知識
- 一個文字編輯器（VS Code、Sublime，或類似工具）

## 設定

打開終端機，並建立一個名為 `hello-world` 的新資料夾。

在新目錄中執行以下指令：

```sh
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

這會建立一個 Node 專案，並產生用於建立網站的範本檔案。

## 生成錢包

要將檔案上傳到 Arweave，你需要一個 Arweave 錢包。

在你的 `hello-world` 目錄中執行以下指令來生成錢包：

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

:::info
`wallet.json` 檔案必須位於 `hello-world` 資料夾的根目錄，不能放在你的 `src` 資料夾內。
:::

## 建立一個網頁

接下來，我們將使用基本的 HTML、CSS 與 JavaScript 建立一個網頁，製作一個樣式化的按鈕，當你點擊它時，頁首文字會變色。

完成後，我們會使用 `permaweb-deploy` 與先前生成的錢包，將一個可運作的靜態網頁部署到 Arweave。

把下列程式區塊的程式碼貼到對應的檔案中：

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="index.js"></script>
    <title>Cookbook Hello World!</title>
  </head>

  <body>
    <button onclick="changeColor()" class="button">Click Me!</button>
    <h1 id="main">Hello World!</h1>
  </body>
</html>
```

<hr />

### style.css

```css
.button {
  padding: "10px";
  background-color: #4caf50;
}
```

<hr />

### index.js

```javascript
function changeColor() {
  const header = document.getElementById("main");
  header.style.color === ""
    ? (header.style.color = "red")
    : (header.style.color = "");
}
```

<hr />

現在已有靜態網站可以部署，您可以在終端機鍵入 `open src/index.html` 來檢查是否如預期運作。

如果一切正常，現在就可以部署到 Arweave 了！

## 使用 permaweb-deploy 上傳

安裝並設定 `permaweb-deploy` 以進行部署：

```bash
npm install --save-dev permaweb-deploy
```

在你的 `package.json` 中新增一個部署腳本：

```json
{
  "scripts": {
    "deploy": "permaweb-deploy --arns-name my-hello-world --deploy-folder src"
  }
}
```

部署你的應用程式：

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npm run deploy
```

如需詳細的部署說明，請參閱 [Permaweb Deploy](/guides/deployment/permaweb-deploy)。

## 恭喜！

你已經使用幾個指令和幾行程式碼，在 Arweave 上發布了一個靜態網站！
