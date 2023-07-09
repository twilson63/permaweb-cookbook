---
locale: jp
---
# こんにちは世界（コード）

このガイドでは、いくつかのコードと[コマンドラインインターフェース（CLI）](./hw-cli.md)を使用して、静的なHTML、CSS、JavaScriptのWebページをパーマウェブに簡単に配置する方法を説明します。

## 必要条件

* [NodeJS](https://nodejs.org) LTS以上
* HTML、CSS、JavaScriptの基本的な知識
* テキストエディタ（VS Code、Sublimeなど）

## 説明

端末/コンソールウィンドウを使用して、「hello-world」という名前の新しいフォルダを作成します。

## セットアップ

```sh
cd hello-world
npm init -y
npm install arweave @bundlr-network/client
mkdir src && cd src
touch index.js index.html style.css
```

次に、テキストエディタを開き、「hello-world」ディレクトリをインポートします。

## ウォレットを生成

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## ウェブページを作成
このウェブページは、基本的なHTML、CSS、JavaScriptを使用して、クリックするとヘッダーテキストの色が変わるスタイル付きボタンを作成しています。完成した後、Bundlrと以前に生成したウォレットを使用して、完全に機能し、静的で永続的なウェブページをArweaveに展開します。

以下のコードブロックからそれぞれのファイルにコードを貼り付けます。

**index.html**

<details>
<summary>HTMLを表示するにはクリック</summary>

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
<summary>CSSを表示するにはクリック</summary>

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
<summary>JSを表示するにはクリック</summary>

```javascript
function changeColor() {
  const header = document.getElementById("main");
  header.style.color === "" ? header.style.color = "red" : header.style.color = ""
}
```

</details>

<hr />

静的サイトが展開できるようになったので、コンソール/ターミナルで「open src/index.html」と入力して、すべてが正常に動作しているか確認します。すべてが予想どおりに動作している場合は、Arweaveに展開する準備が整いました！

## bundlrを使用してアップロード
以下のコマンドは、「src」ディレクトリを展開し、「index.html」ファイルをマニフェストのインデックスとして示し（「upload-dir」フラグで指定されたパスに対して相対的）、`wallet.json`を使用して、Bundlrと先に生成したウォレットを使用して、Arweaveに完全に機能し、静的で永続的なウェブページを展開します。

```sh
bundlr upload-dir src -h https://node2.bundlr.network --index-file index.html -c arweave -w ./wallet.json
```

## おめでとう！！

たった数行のコードといくつかのコマンドを使用して、静的なサイトをArweaveに公開しました！