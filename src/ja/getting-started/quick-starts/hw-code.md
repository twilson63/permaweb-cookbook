---
locale: ja
---

# Hello World (コード)

このガイドでは、数行のコードと[コマンドラインインターフェース (CLI)](./hw-cli.md)を使用して、静的なHTML、CSS、JavaScriptのウェブページをパーマウェブにアップロードする簡単な方法を説明します。

## 要件

- [NodeJS](https://nodejs.org) LTS以上
- HTML、CSS、JavaScriptの基本的な知識
- テキストエディタ（VS Code、Sublime、または同様のもの）

## 説明

ターミナル/コンソールウィンドウを使用して、`hello-world`という新しいフォルダを作成します。

## セットアップ

```sh
cd hello-world
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

次に、テキストエディタを開き、`hello-world`ディレクトリをインポートします。

## ウォレットの生成

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

:::info
wallet.jsonファイルは、`hello-world`フォルダのルートに配置する必要があり、`src`フォルダの中には置かないでください。
:::

## ウェブページの作成

このウェブページでは、基本的なHTML、CSS、JavaScriptを使用して、クリックするとヘッダーのテキストの色が変わるスタイル付きボタンを作成します。完成後、Irysと以前に生成したウォレットを使用して、完全に機能する静的かつ永続的なウェブページをArweaveにデプロイします。

次のコードブロックからコードをそれぞれのファイルに貼り付けてください：

**index.html**

<details>
<summary>Click to view HTML</summary>

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
<summary>Click to view CSS</summary>

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
<summary>Click to view JS</summary>

```javascript
function changeColor() {
  const header = document.getElementById("main");
  header.style.color === ""
    ? (header.style.color = "red")
    : (header.style.color = "");
}
```

</details>

<hr />
静的サイトをデプロイする準備が整ったら、コンソール/ターミナルで`open src/index.html`と入力して、すべてが正しく機能しているか確認できます。すべてが期待通りに動作している場合、Arweaveにデプロイする時が来ました！

## permaweb-deployを使用したアップロード

詳細はこちら: [https://github.com/permaweb/permaweb-deploy](https://github.com/permaweb/permaweb-deploy)

## おめでとう！！

わずか数コマンドと数行のコードで、Arweaveに静的サイトを公開しました！