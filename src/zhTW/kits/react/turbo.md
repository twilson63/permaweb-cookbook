# React Starter Kit w/vite & ArDrive

本指南將一步步引導你設定開發環境，以建置並部署一個 Permaweb 的 React 應用程式。

## 先決條件

- 基本 Typescript 知識（非必須） - [學習 Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 或更新版本 - [下載 NodeJS](https://nodejs.org/en/download/)
- ReactJS 知識 - [學習 ReactJS](https://reactjs.org/)
- 熟悉 Git 與常見終端機指令

## 開發相依套件

- TypeScript
- NPM 或 Yarn 套件管理工具

## 步驟

### 建立 React 應用

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm create vite my-arweave-app --template react-ts
cd my-arweave-app
npm install
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn create vite my-arweave-app --template react-ts
cd my-arweave-app
yarn
```

</CodeGroupItem>
</CodeGroup>

### 新增 React Router DOM

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm install react-router-dom
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn add react-router-dom
```

</CodeGroupItem>
</CodeGroup>

我們需要使用 hash-router 才能在 Arweave 上建立可運作的應用程式。

### 頁面元件

```sh
touch src/Home.tsx src/About.tsx
```

src/Home.tsx

```tsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Welcome to the Permaweb!
      <Link to={"/about/"}>
        <div>About</div>
      </Link>
    </div>
  );
}

export default Home;
```

src/About.tsx

```tsx
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      Welcome to the About page!
      <Link to={"/"}>
        <div>Home</div>
      </Link>
    </div>
  );
}

export default About;
```

#### 修改 App.tsx

我們需要更新 App.tsx 以管理不同頁面

```tsx
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about/"} element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
```

#### 修改 index.css

調整 `body` 選取器

```css
body {
  margin: 0;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  place-items: center;
  min-width: 100%;
  min-height: 100vh;
}
```

執行專案
<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm run dev
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn dev
```

</CodeGroupItem>
</CodeGroup>

### 建置 React 應用

#### 修改 vite.config.ts

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
});
```

#### 建置應用

```sh
yarn build
```

### 永久部署

#### 產生錢包

我們需要 `arweave` 套件來產生錢包

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

然後在終端機執行此指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

#### 為錢包充值

你需要為你的錢包加值 ArDrive Turbo 點數。為此，前往 [ArDrive](https://app.ardrive.io) 並匯入你的錢包。之後，你可以為錢包購買 turbo 點數。

#### 設定 Permaweb-Deploy

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --save-dev permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add permaweb-deploy --dev --ignore-engines
```

  </CodeGroupItem>
</CodeGroup>

::: info
你需要在錢包中加入 AR 並以 Turbo 點數為其充值，才能上傳此應用。欲了解更多資訊，請參閱 [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)。
:::

#### 更新 package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "npm run build && permaweb-deploy --arns-name my-react-app"
  }
  ...
}
```

::: info
請將 `my-react-app` 替換為你實際的 ArNS 名稱。你也可以加入其他選項，例如用於暫存部署的 `--undername staging`。
:::

#### 執行建置

現在是產生建置的時候了，執行

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run build
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn build
```

  </CodeGroupItem>
</CodeGroup>

#### 執行部署

最後，我們準備好部署我們的第一個 Permaweb 應用程式

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn deploy
```

  </CodeGroupItem>
</CodeGroup>

::: warning 資金不足
如果你收到錯誤 `Insufficient funds`，請確認你已經記得為部署錢包充值 Turbo 點數。欲了解更多資訊，請參閱 [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)。
:::

#### 回應

你應該會看到類似以下的回應：

```shell
-------------------- DEPLOY DETAILS --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-react-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-react-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

你的 React 應用可以透過 `https://my-react-app.arweave.net`（如果使用 ArNS）或 `https://arweave.net/abc123def456ghi789jkl012mno345pqr678stu901v` 存取。

::: tip 成功
你現在應該已經在 Permaweb 上擁有一個 React 應用程式！幹得好！
:::

## 恭喜！

你已經成功在 Permaweb 上發佈了一個 React 應用程式！
