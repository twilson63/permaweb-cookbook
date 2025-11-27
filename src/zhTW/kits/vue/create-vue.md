# Create Vue 入門套件

本指南將提供逐步說明，教你設定開發環境並建立一個 Permaweb 的 Vue 應用程式。

## 先決條件

- 基本 TypeScript 知識（非必要） - [Learn Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 或更新版本 - [Download NodeJS](https://nodejs.org/en/download/)
- 具備 Vue.js（建議 Vue 3）知識 - [Learn Vue.js](https://vuejs.org/)
- 熟悉 git 與常用終端機指令

## 開發相依

- TypeScript（可選）
- NPM 或 Yarn 套件管理工具

## 步驟

### 建立專案

下列指令會安裝並啟動 create-vue，Vue 專案的官方腳手架工具。

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

在過程中，系統會提示你選擇可選功能，例如 TypeScript 與測試支援。我建議選擇 `Vue Router` 為 yes，其他可以依個人需求選擇。

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

### 切換至專案目錄

```sh
cd <your-project-name>
```

### 安裝相依套件

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

### 設定 Router

Vue Router 是 Vue.js 的官方路由套件，並能與 Vue 無縫整合。要在 Permaweb 上運作，請將瀏覽器歷史模式路由改為雜湊（hash）路由，因為 URL 無法送到伺服器。在你的 `src/router/index.ts` 或 `src/router/index.js` 檔案中，將 `createWebHistory` 改為 `createWebHashHistory`。

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

### 設定建置

在 `vite.config.ts` 或 `vite.config.js` 檔案中設定建置流程。若要從子路徑（https://[gateway]/[TX_ID]）提供 Permaweb 應用程式，請將 config 檔中的 base 屬性更新為 ./。

```ts
export default defineConfig({
  base: './',
  ...
})
```

### 執行應用程式

在繼續下一步之前，請先確認一切運作正常。執行檢查以確保順利進行。

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

預設會在你機器上啟動一個本機開發伺服器，預設使用 `PORT 5173`。若該 PORT 已被使用，系統可能會將 PORT 數字加 1（例如 `PORT 5174`）後重試。

## 永久部署

### 產生錢包

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

接著在終端機執行此指令

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 為錢包充值

你需要使用 ArDrive Turbo 點數為你的錢包充值。前往 [ArDrive](https://app.ardrive.io) 匯入你的錢包，然後為該錢包購買 turbo credits。

### 設定 Permaweb-Deploy

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

### 為你的錢包充值（使用 Turbo）

Turbo 使用 Turbo Credits 將資料上傳至 Arweave。你可以用多種法幣或加密代幣購買 Turbo Credits。以下示範以 10 USD 為例為錢包充值。此指令會開啟瀏覽器視窗並透過 Stripe 完成購買流程。

```console:no-line-numbers
npm install @ardrive/turbo-sdk
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

請務必將 `wallet.json` 替換為你的 Arweave 錢包路徑。

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
請將 << ANT-PROCESS >> 替換為你的 ANT process id。
:::

### 執行 build

現在是產生建置檔的時候，執行

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

### 執行部署

最後，我們可以部署第一個 Permaweb 應用程式了

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
若出現 `Insufficient funds`（資金不足）錯誤，請確認你已使用 ArDrive Turbo credits 為部署錢包充值。
:::

### 回應

你應會看到類似以下的回應：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

你的 Vue 應用程式可以在 `https://arweave.net/<< tx-id >>` 找到。

::: tip SUCCESS
你現在應該已經在 Permaweb 上部署了一個 Vue 應用程式！做得好！
:::

## 摘要

本指南提供了一個簡單的逐步方法，說明如何使用 Create Vue 在 Permaweb 上發布 Vue.js 應用程式。若你需要額外功能（例如 Tailwind），建議考慮指南中列出的其他起始套件，以尋找符合你需求的解決方案。
