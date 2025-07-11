---
locale: zh
---

# Vite 入门套件

本指南将以一步一步的流程指导您配置开发环境，构建和部署一个永久网络的 React 应用程序。

## 先决条件

-   基本的 TypeScript 知识（非必需）- [https://www.typescriptlang.org/docs/](了解 TypeScript)
-   NodeJS v16.15.0 或更高版本- [https://nodejs.org/en/download/](下载 NodeJS)
-   了解 ReactJS- [https://reactjs.org/](了解 ReactJS)
-   知道 git 和常见的终端命令

## 开发依赖

-   TypeScript
-   NPM 或 Yarn 包管理器

## 步骤

### 创建项目

如果您不熟悉 TypeScript，可以使用模板 "react" (`--template react`)

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm create vite@latest my-arweave-app -- --template react-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create vite my-arweave-app --template react-ts
```

  </CodeGroupItem>
</CodeGroup>

### 切换到项目目录

```sh
cd my-arweave-app
```

### 安装 react-router-dom

您需要安装此包以管理不同页面之间的路由

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install react-router-dom --save
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add react-router-dom -D
```

  </CodeGroupItem>
</CodeGroup>

### 运行应用程序

现在我们需要检查是否一切都很完美，然后再进行下一步，运行
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn dev
```

  </CodeGroupItem>
</CodeGroup>
它将在本地机器上启动一个新的开发服务器，默认情况下使用 `PORT 3000` ，如果此端口已被占用
它可能会要求您切换到终端中的另一个可用端口

### 设置钱包类型

如果您想使用 [ArConnect](https://arconnect.io)，[Arweave.app](https://arweave.app) 或其他基于浏览器的钱包，您可以安装 ArConnect 的类型包，以便为 `window.arweaveWallet` 进行声明。
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arconnect -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arconnect -D
```

  </CodeGroupItem>
</CodeGroup>

安装包后，您需要将其添加到 `src/vite-env.d.ts` 文件中。

```ts
/// <reference types="arconnect" />
```

### 设置路由

现在修改应用程序，并添加一个新的路由，比如一个关于页面，首先创建另外两个 .tsx 文件。（如果您使用的是原生 JS react 模板，请确保组件文件的扩展名应为 `.jsx` 或 `.js`）

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

#### HomePage.tsx

```ts
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div>
			欢迎来到永久网络！
			<Link to={"/about/"}>
				<div>关于</div>
			</Link>
		</div>
	);
}

export default HomePage;
```

#### About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
	return (
		<div>
			欢迎来到关于页面！
			<Link to={"/"}>
				<div>首页</div>
			</Link>
		</div>
	);
}

export default About;
```

#### 修改 App.tsx

我们需要更新 App.tsx 来管理不同的页面

```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

::: info 哈希路由
请注意，我们将路由包装在 HashRouter 中，并使用 react-router-dom 的 Link 组件构建链接。
这在 permaweb 的当前状态下非常重要，它将确保路由正常工作，因为应用程序
以 `https://[gateway]/[TX]` 的路径提供。
:::

## 永久部署

### 生成钱包

我们需要 `arweave` 包来生成一个钱包

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

然后在终端中运行此命令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 设置 Irys

我们需要 Irys 将我们的应用程序部署到 Permaweb，它提供即时数据上传和检索

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global @irys/sdk
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add @irys/sdk
```

  </CodeGroupItem>
</CodeGroup>

::: info
您需要为此钱包添加 AR 并向您的 Irys 钱包提供资金，以便能够上传此应用程序。有关更多信息，请参阅 [https://irys.xyz](https://irys.xyz) 和 [https://www.arweave.org/](https://www.arweave.org/)。
:::

### 更新 package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "irys upload-dir ./dist -h https://node2.irys.xyz --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### 运行构建

现在是生成构建的时候了

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

### 运行部署

最后我们可以部署我们的首个 Permaweb 应用程序

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

::: tip **成功**
您现在应该在 Permaweb 上拥有一个 React 应用程序！做得好！
:::

::: error
如果您收到错误 `Not enough funds to send data`，您需要在钱包中添加一些 AR，然后再尝试部署。
:::
