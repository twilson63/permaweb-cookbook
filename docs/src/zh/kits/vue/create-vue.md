---
locale: zh
---
# 创建Vue起始工具包

本指南将提供逐步说明以配置您的开发环境并构建一个永久性Web（Permaweb）Vue应用程序。

## 先决条件

- 基本的Typescript知识（非强制）- [学习Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0或以上版本- [下载NodeJS](https://nodejs.org/en/download/)
- Vue.js知识（最好是Vue 3）- [学习Vue.js](https://vuejs.org/)
- 了解git和常用终端命令

## 开发依赖项

- TypeScript（可选）
- NPM或Yarn软件包管理器

## 步骤

### 创建项目

以下命令安装并启动create-vue，这是Vue项目的官方脚手架工具。

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

在该过程中，您将被提示选择可选功能，例如TypeScript和测试支持。我建议选择“Vue Router”并选择是，其他可根据您的喜好选择。

```console:no-line-numbers
✔ 项目名称: … <your-project-name>
✔ 添加TypeScript？: … No / Yes
✔ 添加JSX支持？: … No / Yes
✔ 添加单页应用程序开发的Vue Router？: … No / *Yes*
✔ 添加Pinia进行状态管理？: … No / Yes
✔ 添加Vitest进行单元测试？: … No / Yes
✔ 添加Cypress进行单元和端到端测试？: … No / Yes
✔ 添加ESLint进行代码质量检查？: … No / Yes
✔ 添加Prettier进行代码格式化？: … No / Yes
```

### 切换至项目目录

```sh
cd <your-project-name>
```

### 安装依赖项

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

### 设置路由器

Vue Router是Vue.js的官方路由器，可以与Vue无缝集成。为了使其与Permaweb配合使用，在您的`src/router/index.ts`或`src/router/index.js`文件中，将浏览器历史路由器改为哈希路由器，因为无法将URL发送到服务器。将`createWebHistory`更改为`createWebHashHistory`。

```ts
import { createRouter，createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
```

### 设置构建

在`vite.config.ts`或`vite.config.js`文件中配置构建过程。要从子路径（https://[gateway]/[TX_ID]）提供Permaweb应用，将配置文件的`base`属性更新为`./`。

```ts
export default defineConfig({
  base: './',
  ...
})
```

### 运行应用

在继续之前，验证一切是否正常运行非常重要。运行检查确保进展顺利。

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
它会在本地计算机上启动一个新的开发服务器，默认使用`端口5173`。如果此端口已被使用，则可能会将端口号增加1（`端口5174`）再次尝试。

## 部署

### 生成钱包

生成钱包需要`arweave`软件包。

<CodeGroup>
  <CodeGroupItem title="NPM">

  ```console:no-line-numbers
  npm install --save arweave
  ```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

  ```console:no-line-numbers
  yarn add arweave

  ```

  </CodeGroupItem>
</CodeGroup>

要生成您的钱包，请在终端中运行以下命令：
```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 安装Bundlr

为了将应用程序部署到Permaweb，我们需要Bundlr，它可以提供即时的数据上传和检索。

<CodeGroup>
  <CodeGroupItem title="NPM">

  ```console:no-line-numbers
  npm install --save-dev @bundlr-network/client
  ```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

  ```console:no-line-numbers
  yarn add -D @bundlr-network/client
  ```

  </CodeGroupItem>
</CodeGroup>

::: info Arweave钱包
要上传此应用程序，您可能需要添加AR并为您的Bundlr钱包提供资金。有关更多信息，请访问[https://bundlr.network](https://bundlr.network)和[https://www.arweave.org/](https://www.arweave.org/)。
:::

### 更新package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### 更新.gitignore

为了保护您的资金，保持钱包文件的私密性非常重要。将其上传到可能公开的GitHub上可能会导致资金泄露。为了防止这种情况发生，请将`wallet.json`文件添加到`.gitignore`文件中。并确保将其安全保存。

```sh
echo "wallet.json" >> .gitignore
```

### 运行构建

现在是生成构建的时候了。

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

最后我们可以部署我们的第一个Permaweb应用。

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

::: tip 成功
您现在应该在Permaweb上拥有一个Vue应用程序！干得好！
:::

::: warning 资助钱包
如果您的应用程序大于120 KB或收到“Not enough funds to send data”（没有足够的资金发送数据）错误，您将需要为Bundlr钱包提供资金。有关更多信息，请访问[https://bundlr.network](https://bundlr.network)。
:::

## 代码库

此位置有一个完整的JavaScript或TypeScript示例。

* 代码库：[https://github.com/ItsAnunesS/permaweb-create-vue-starter](https://github.com/ItsAnunesS/permaweb-create-vue-starter)

## 摘要

本指南提供了一个简单的逐步方法，以使用Create Vue在Permaweb上发布Vue.js应用程序。如果您需要额外的功能（如Tailwind），请考虑在指南中列出的其他起始工具包中寻找适合您需求的解决方案。