---
locale: zh
---

# Hello World（代码）

本指南将指导您如何使用几行代码和[命令行界面（CLI）](./hw-cli.md)快速将一个静态 HTML、CSS 和 JavaScript 网页上载到区块链上。

## 要求

-   [NodeJS](https://nodejs.org) LTS 或更高版本
-   基本的 HTML、CSS 和 JavaScript 知识
-   文本编辑器（VS Code、Sublime 或类似的）

## 说明

在终端/控制台窗口中创建一个名为`hello-world`的新文件夹。

## 设置

```sh
cd hello-world
npm init -y
npm install arweave @irys/sdk
mkdir src && cd src
touch index.js index.html style.css
```

接下来，打开您的文本编辑器并导入`hello-world`文件夹。

## 生成钱包

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## 创建网页

此网页使用基本的 HTML、CSS 和 JavaScript 创建了一个带有样式按钮的页面，当您点击它时，标题文本将更改颜色。完成后，我们将使用 Irys 和之前生成的钱包将一个完全功能、静态和永久的网页部署到 Arweave。

复制以下代码块中的代码到它们的相应文件中：

**index.html**

<details>
<summary>点击查看HTML</summary>

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

</details>
<hr />

**style.css**

<details>
<summary>点击查看CSS</summary>

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
<summary>点击查看JS</summary>

```javascript
function changeColor() {
	const header = document.getElementById("main");
	header.style.color === "" ? (header.style.color = "red") : (header.style.color = "");
}
```

</details>

<hr />

现在已经有了一个要部署的静态网站，可以通过在控制台/终端中键入`open src/index.html`来检查它是否正常工作。如果一切按预期工作，就可以部署到 Arweave 上了！

## 使用 Irys 上传

以下命令将部署`src`目录，并将`index.html`文件作为清单的索引位置（相对于提供给`upload-dir`标志的路径）。

```sh
irys upload-dir src -h https://node2.irys.xyz --index-file index.html -c arweave -w ./wallet.json
```

## 恭喜！！

您刚刚使用几个命令和几行代码在 Arweave 上发布了一个静态网站！
