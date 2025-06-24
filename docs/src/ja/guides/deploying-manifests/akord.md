---
locale: ja
---
## Akord CLIを使用して

[Akord CLI](https://github.com/Akord-com/akord-cli)を使用して、マニフェストを生成できます。

### 開始する

> Requires NodeJS - https://nodejs.org

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install -g @akord/akord-cli
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn global add @akord/akord-cli
```

  </CodeGroupItem>
</CodeGroup>

### Akordにログイン (アカウントを[こちらで作成](https://v2.akord.com/signup)できます)
CLIをインストールしたら、プロンプトに従ってAkordのユーザー名とパスワードで認証してログインします。

```console
akord login {your_email_address}
```

### ボールトを選択
マニフェストを生成するためには、公開ボールトのボールトIDが必要です。ボールトをリストするには：

```console
akord vault:list
```

### マニフェストを生成
ログインし、ボールトIDが取得できたら、ファイルとコンテンツのマニフェストを生成できます。\
ボールトに「index.html」ファイルがない場合は、カスタムインデックスを提供できます：

```console
akord manifest:generate {vaultId} --index "my-custom-index.html"
```

マニフェストを生成すると、ボールト内に「manifest.json」というファイルが表示されます。このファイルがArweaveブロックチェーン上で確認され、ゲートウェイによって伝播されると、次のリンクであなたの公開ボールトにアクセスできるようになります： https://arweave.net/{uri}

## AkordJSを使用して

代わりに、[AkordJS](https://github.com/Akord-com/akord-js)パッケージを使用してマニフェストを生成できます。

### 開始する前に

> Requires NodeJS - https://nodejs.org

<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install @akord/akord-js
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add @akord/akord-js
```

  </CodeGroupItem>
</CodeGroup>

### マニフェストを生成しよう

### ボールト内のファイルから自動的にマニフェストを生成

```js
import { Akord, Auth } from '@akord/akord-js'

// First, let's initialize Akord instance
// In order to use AkordJS, you first need an Akord account. 
// Sign up for Akord here: https://v2.akord.com/signup
const { wallet } = await Auth.signIn(email, password);
const akord = await Akord.init(wallet);

// Let's create a public vault to contain our files
const { vaultId } = await akord.vault.create("My hello world app", { public: true });

// Let's upload a Hello world html file
const { stackId } = await akord.stack.create(
  vaultId,
  ["<html><body><h1>Hello World</h1></body></html>"],
  { name: "index.html", mimeType: "text/html" }
);

// Let's generate a manifest
const { uri } = await akord.manifest.generate(vaultId);
// In few minutes, you will be able to access your manifest here: https://arweave.net/{uri}
```


### Upload your own manifest file manually
```js
import { Akord, Auth } from '@akord/akord-js'

// First, let's initialize Akord instance
// In order to use AkordJS, you first need an Akord account. 
// Sign up for Akord here: https://v2.akord.com/signup
const { wallet } = await Auth.signIn(email, password);
const akord = await Akord.init(wallet);

// let's define our manifest
const manifest = {
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  }
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/app.js": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
};

// Let's create a public vault to contain the manifest
const { vaultId } = await akord.vault.create("My manifest", { public: true });

const { uri } = await akord.manifest.generate(vaultId, manifest);
// In few minutes, you will be able to access your manifest here: https://arweave.net/{uri}
```

### おめでとうございます！

トランザクションがArweaveネットワークで受け入れられると（平均して5〜15分かかります）、\
ブラウザで次のURLにアクセスできます。{uri}をユニークなマニフェストトランザクションIDに置き換えてください： https://arweave.net/{uri}

## Akordウェブアプリを使用して

[ウェブアプリ](https://v2.akord.com/login)からも、公開の永久ボールト内で「+」ボタンから「マニフェストを追加」を選択することで、マニフェストを作成しボールトに追加することができます。

このアクションにより、ボールト内のすべてのファイルとフォルダのマニフェストが自動的に作成されます。

マニフェストをダウンロードし、ボールト内のタイトルをクリックしてメディアギャラリーで表示できます。

それは非常に簡単です！

## リソースとさらなる情報
- [Akordボールト内でのマニフェストの生成](https://docs.akord.com/nft-projects/get-the-arweave-urls)
- [パーマウェブへのウェブサイトの公開](https://docs.akord.com/api-and-dev-tools/learn/publishing-a-website)
- [AkordJSマニフェストモジュール](https://github.com/Akord-com/akord-js?tab=readme-ov-file#manifest)