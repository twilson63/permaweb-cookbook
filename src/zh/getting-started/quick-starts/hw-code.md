# Hello World（代码）

本指南将引导你通过几行代码和命令行界面（CLI），快速将静态 HTML、CSS 与 JavaScript 网页部署到 Permaweb。

## 要求

- [NodeJS](https://nodejs.org) LTS 或更新版本
- 具备基本的 HTML、CSS 与 JavaScript 知识
- 文本编辑器（VS Code、Sublime 或类似工具）

## 设置

打开终端，创建一个名为 `hello-world` 的新文件夹。

在该新目录中，执行以下指令：

```sh
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

这会建立一个 Node 项目，并新增用来建立网站的样板档案。

## 生成钱包

要将文件上传到 Arweave，你需要一个 Arweave 钱包。

在你的 `hello-world` 目录内执行下列指令来生成钱包：

```sh
npx -y @permaweb/wallet > ./wallet.json
```

:::info
`wallet.json` 文件必须位于 `hello-world` 文件夹的根目录，而不是放在你的 `src` 文件夹内。
:::

## 创建网页

接着，我们将使用基本的 HTML、CSS 与 JavaScript 建立一个网页：制作一个有样式的按钮，点击它时标题文字会改变颜色。

完成后，我们将使用 `permaweb-deploy` 和之前生成的钱包，把完整可运行的静态网页部署到 Arweave。

将下列代码块的内容粘贴到对应的文件：

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

现在已经有静态网站可供部署，你可以在终端输入 `open src/index.html` 来检查它是否按预期工作。

如果一切正常，就可以开始部署到 Arweave 了！

## 使用 permaweb-deploy 上传

安装并设置 `permaweb-deploy` 以便部署：

```bash
npm install --save-dev permaweb-deploy
```

在你的 `package.json` 中新增一个部署脚本：

```json
{
  "scripts": {
    "deploy": "permaweb-deploy --arns-name my-hello-world --deploy-folder src"
  }
}
```

部署你的应用程序：

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npm run deploy
```

有关详细的部署说明，请参阅 [Permaweb Deploy](../../guides/deployment/permaweb-deploy.md)。

## 恭喜！

你已经使用几个命令和几行代码，将静态网站发布到 Arweave！
