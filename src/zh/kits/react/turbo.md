# React 入门模板 w/vite 与 ArDrive

本指南将逐步带您配置开发环境，以建立并部署一个 Permaweb React 应用程序。

## 先决条件

- 基本 TypeScript 知识（非必需）- [Learn Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 或更新版本 - [Download NodeJS](https://nodejs.org/en/download/)
- ReactJS 知识 - [Learn ReactJS](https://reactjs.org/)
- 熟悉 Git 与常用终端命令

## 开发依赖

- TypeScript
- NPM 或 Yarn 包管理工具

## 步骤

### 创建 React 应用

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

### 添加 React Router DOM

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

我们需要使用 hash-router 才能在 Arweave 上建立可运行的应用程序。

### 页面组件

```sh
touch src/Home.tsx src/About.tsx
```

src/Home.tsx

```tsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      歡迎來到 Permaweb！
      <Link to={"/about/"}>
        <div>關於</div>
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
      歡迎來到關於頁面！
      <Link to={"/"}>
        <div>首頁</div>
      </Link>
    </div>
  );
}

export default About;
```

#### 修改 App.tsx

我们需要更新 App.tsx 来管理不同页面

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

更改 `body` 选择器

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

运行项目
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

### 构建 React 应用

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

#### 构建应用

```sh
yarn build
```

### 永久部署

#### 生成钱包

我们需要安装 `arweave` 包来生成钱包

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

然后在终端执行此指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

#### 为钱包充值

您需要为钱包充值 ArDrive Turbo 点数。为此，前往 [ArDrive](https://app.ardrive.io) 导入您的钱包，然后为该钱包购买 Turbo 点数。

#### 设置 Permaweb-Deploy

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
您需要在钱包中加入 AR 并为其充值 Turbo 点数，才能上传此应用。详情请参阅 [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)。
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
将 `my-react-app` 替换为您实际的 ArNS 名称。您也可以加入其他选项，例如用于测试部署的 `--undername staging`。
:::

#### 执行构建

现在是产生构建的时候，执行

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

#### 执行部署

最后我们可以部署第一个 Permaweb 应用程序了

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

::: warning 资金不足
若收到 `Insufficient funds`（资金不足）错误，请确认您已为部署用钱包充值 Turbo 点数。详情请参阅 [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)。
:::

#### 回应

您应该会看到类似以下的回应：

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

您的 React 应用可在 `https://my-react-app.arweave.net`（若使用 ArNS）或 `https://arweave.net/abc123def456ghi789jkl012mno345pqr678stu901v` 找到。

::: tip 成功
您现在应该已经在 Permaweb 上有一个 React 应用！做得很好！
:::

## 恭喜！

您已成功在 Permaweb 上发布一个 React 应用！
