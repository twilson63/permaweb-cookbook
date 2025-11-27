# Hello World（程式碼）

本指南會引導你透過幾行程式碼與命令列介面（CLI），快速將靜態 HTML、CSS 與 JavaScript 網頁部署到 Permaweb。

## 要求

- [NodeJS](https://nodejs.org) LTS 或更新版本
- 具備基本的 HTML、CSS 與 JavaScript 知識
- 文字編輯器（VS Code、Sublime 或類似工具）

## 設定

開啟終端機，建立一個名為 `hello-world` 的新資料夾。

在該新目錄內，執行以下指令：

```sh
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

這會建立一個 Node 專案，並建立用來建立網站的樣板檔案。

## 產生錢包

要將檔案上傳到 Arweave，你需要一個 Arweave 錢包。

在你的 `hello-world` 目錄內執行下列指令來產生錢包：

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

:::info
`wallet.json` 檔案必須位於 `hello-world` 資料夾的根目錄，而不是放在你的 `src` 資料夾內。
:::

## 建立網頁

接著，我們將使用基本的 HTML、CSS 與 JavaScript 建立一個網頁：製作一個有樣式的按鈕，當你點擊它時，標題文字會改變顏色。

完成後，我們將使用 `permaweb-deploy` 和先前產生的錢包，將完整可運作的靜態網頁部署到 Arweave。

將下列程式碼區塊的內容貼到對應的檔案：

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

現在已經有靜態網站可供部署，你可以在終端機輸入 `open src/index.html` 來檢查它是否如預期運作。

若一切運作正常，就可以開始部署到 Arweave 了！

## 使用 permaweb-deploy 上傳

安裝並設定 `permaweb-deploy` 以便部署：

```bash
npm install --save-dev permaweb-deploy
```

在你的 `package.json` 新增一個部署腳本：

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

有關詳細部署說明，請參閱 [Permaweb Deploy](/guides/deployment/permaweb-deploy)。

## 恭喜！

你已經使用幾個指令和幾行程式碼，將靜態網站發佈到 Arweave！
