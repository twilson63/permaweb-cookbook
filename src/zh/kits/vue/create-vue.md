# Create Vue 入门套件

本指南将提供逐步说明，教你设置开发环境并建立一个 Permaweb 的 Vue 应用程序。

## 先决条件

- 基本 TypeScript 知识（非必要） - [学习 TypeScript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 或更新版本 - [下载 NodeJS](https://nodejs.org/en/download/)
- 具备 Vue.js（建议 Vue 3）知识 - [学习 Vue.js](https://vuejs.org/)
- 熟悉 git 与常用终端指令

## 开发依赖

- TypeScript（可选）
- NPM 或 Yarn 包管理工具

## 步骤

### 创建项目

下列指令会安装并启动 create-vue，Vue 项目的官方脚手架工具。

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm init vue@latest
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn create vue
```

  </CodeGroupItem>
</CodeGroup>

在过程中，系统会提示你选择可选功能，例如 TypeScript 与测试支持。我建议选择 `Vue Router` 为 yes，其他可以依个人需求选择。

```console:no-line-numbers
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / *Yes*
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

### 切换至项目目录

```sh
cd <your-project-name>
```

### 安装依赖包

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn
```

  </CodeGroupItem>
</CodeGroup>

### 配置 Router

Vue Router 是 Vue.js 的官方路由套件，并能与 Vue 无缝整合。要在 Permaweb 上运行，请将浏览器历史模式路由改为哈希（hash）路由，因为 URL 无法发送到服务器。在你的 `src/router/index.ts` 或 `src/router/index.js` 文件中，将 `createWebHistory` 改为 `createWebHashHistory`。

```ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
```

### 配置构建

在 `vite.config.ts` 或 `vite.config.js` 文件中配置构建流程。若要从子路径（https://[gateway]/[TX_ID]）提供 Permaweb 应用程序，请将 config 文件中的 base 属性更新为 ./。

```ts
export default defineConfig({
  base: './',
  ...
})
```

### 运行应用程序

在继续下一步之前，请先确认一切运行正常。执行检查以确保顺利进行。

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

默认会在你的机器上启动一个本地开发服务器，默认使用 `PORT 5173`。若该 PORT 已被使用，系统可能会将 PORT 数字加 1（例如 `PORT 5174`）后重试。

## 永久部署

### 生成钱包

我们需要 `arweave` 套件来生成钱包

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

接着在终端执行此指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 为钱包充值

你需要使用 ArDrive Turbo 点数为你的钱包充值。前往 [ArDrive](https://app.ardrive.io) 导入你的钱包，然后为该钱包购买 turbo credits。

### 配置 Permaweb-Deploy

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add permaweb-deploy
```

  </CodeGroupItem>
</CodeGroup>

### 为你的钱包充值（使用 Turbo）

Turbo 使用 Turbo Credits 将数据上传至 Arweave。你可以用多种法币或加密代币购买 Turbo Credits。以下示范以 10 USD 为例为钱包充值。此指令会开启浏览器窗口并透过 Stripe 完成购买流程。

```console:no-line-numbers
npm install @ardrive/turbo-sdk
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

请务必将 `wallet.json` 替换为你的 Arweave 钱包路径。

### 更新 package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "DEPLOY_KEY=$(base64 -i wallet.json) permaweb-deploy --ant-process << ANT-PROCESS >> --deploy-folder build"
  }
  ...
}
```

::: info
请将 << ANT-PROCESS >> 替换为你的 ANT process id。
:::

### 执行 build

现在是生成构建文件的时候，执行

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

### 执行部署

最后，我们可以部署第一个 Permaweb 应用程序了

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

::: info ERROR
若出现 `Insufficient funds`（资金不足）错误，请确认你已使用 ArDrive Turbo credits 为部署钱包充值。
:::

### 响应

你应会看到类似以下的响应：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

你的 Vue 应用程序可以在 `https://arweave.net/<< tx-id >>` 找到。

::: tip SUCCESS
你现在应该已经在 Permaweb 上部署了一个 Vue 应用程序！做得好！
:::

## 摘要

本指南提供了一个简单的逐步方法，说明如何使用 Create Vue 在 Permaweb 上发布 Vue.js 应用程序。若你需要额外功能（例如 Tailwind），建议考虑指南中列出的其他起始套件，以寻找符合你需求的解决方案。
