# Hello World（コード）

このガイドでは、数行のコードとコマンドラインインターフェース（CLI）を使って、静的な HTML、CSS、JavaScript のウェブページを Permaweb に公開する簡単な方法を説明します。

## 前提条件

- [NodeJS](https://nodejs.org) LTS 以上
- HTML、CSS、JavaScript の基本知識
- テキストエディタ（VS Code、Sublime、または同等のもの）

## セットアップ

ターミナルを開き、`hello-world` という名前の新しいフォルダを作成します。

新しいディレクトリ内で、次のコマンドを実行します：

```sh
npm init -y
mkdir src && cd src
touch index.js index.html style.css
```

これにより Node プロジェクトがセットアップされ、ウェブサイト作成のための定型ファイルが作成されます。

## ウォレットの生成

ファイルを Arweave にアップロードするには、Arweave ウォレットが必要です。

`hello-world` ディレクトリ内で次のコマンドを実行してウォレットを生成します：

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

:::info
`wallet.json` ファイルは `hello-world` フォルダのルートに配置し、`src` フォルダの中に入れないでください。
:::

## ウェブページの作成

次に、基本的な HTML、CSS、JavaScript を使って、クリックするとヘッダーテキストの色が変わるスタイリングされたボタンを持つウェブページを作成します。

完成したら、`permaweb-deploy` と先ほど生成したウォレットを使用して、静的なウェブページを Arweave にデプロイします。

以下のコードブロックの内容をそれぞれ対応するファイルに貼り付けてください：

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

これでデプロイする静的サイトができたので、ターミナルで `open src/index.html` を実行して期待通りに動作するか確認できます。

すべて問題なければ、Arweave にデプロイする準備が整いました！

## permaweb-deploy を使ってアップロード

デプロイのために `permaweb-deploy` をインストールして設定します：

```bash
npm install --save-dev permaweb-deploy
```

`package.json` にデプロイスクリプトを追加します：

```json
{
  "scripts": {
    "deploy": "permaweb-deploy --arns-name my-hello-world --deploy-folder src"
  }
}
```

アプリケーションをデプロイします：

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npm run deploy
```

詳しいデプロイ手順については [Permaweb Deploy](/guides/deployment/permaweb-deploy) を参照してください。

## おめでとうございます！

数コマンドと数行のコードで、Arweave 上に静的サイトを公開しました！
