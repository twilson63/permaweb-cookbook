# Create Vue Starter Kit

本指南將提供逐步說明，協助您設定開發環境並建置一個 Permaweb 的 Vue 應用程式。

## Prerequisites

- 基本 Typescript 知識（非必要） - [Learn Typescript](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 或更新版本 - [Download NodeJS](https://nodejs.org/en/download/)
- Vue.js 知識（建議使用 Vue 3） - [Learn Vue.js](https://vuejs.org/)
- 了解 git 與常見的終端機指令

## Development Dependencies

- TypeScript（選用）
- NPM 或 Yarn 套件管理工具

## Steps

### Create Project

下列指令會安裝並啟動 create-vue，這是官方的 Vue 專案產生工具。

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

在過程中，系統會提示您選擇一些可選功能，例如 TypeScript 與測試支援。我建議對 `Vue Router` 選擇 yes，其他項目可依個人喜好選擇。

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

### Change into the Project Directory

```sh
cd <your-project-name>
```

### Install Dependencies

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

### Setup Router

Vue Router 是 Vue.js 的官方路由器，並能與 Vue 無縫整合。要讓它在 Permaweb 上正常運作，需從瀏覽器歷史模式路由切換為 hash 路由，因為 URL 無法送回伺服器。在 `src/router/index.ts` 或 `src/router/index.js` 檔案中，將 `createWebHistory` 改為 `createWebHashHistory`。

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

### Setup Build

在 `vite.config.ts` 或 `vite.config.js` 檔案中設定建置流程。若要從子路徑（https://[gateway]/[TX_ID]）提供 Permaweb 應用程式，請在設定檔中將 base 屬性更改為 ./。

```ts
export default defineConfig({
  base: './',
  ...
})
```

### Run the App

在繼續下一步之前，務必確認一切運作正常。執行檢查以確保順利進行。

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

這會在您本機啟動一個開發伺服器，預設使用 `PORT 5173`。若該 PORT 已被使用，系統可能會將 PORT 編號加 1（`PORT 5174`）後再試一次。

## Deploy Permanently

### Generate Wallet

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

### Fund Wallet

您需要為錢包充值 ArDrive Turbo 點數。請前往 [ArDrive](https://app.ardrive.io) 並匯入您的錢包，然後為該錢包購買 turbo 點數。

### Setup Permaweb-Deploy

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

### Fund Your Wallet

Turbo 使用 Turbo Credits 來上傳資料到 Arweave。您可以使用多種法幣或加密貨幣購買 Turbo Credits。以下示範如何用 10 美元為您的錢包加值。此指令會開啟瀏覽器視窗並透過 Stripe 完成購買。

```console:no-line-numbers
npm install @ardrive/turbo-sdk
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

請務必將 `wallet.json` 替換為您 Arweave 錢包的路徑。

### Update package.json

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
將 << ANT-PROCESS >> 替換為您的 ANT process id。
:::

### Run build

現在可以產生建置，執行

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

### Run deploy

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
如果收到錯誤 `Insufficient funds`，請確認您已經為部署用的錢包充值 ArDrive Turbo 點數。
:::

### Response

您應該會看到類似以下的回應：

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

您的 Vue 應用程式可在 `https://arweave.net/<< tx-id >>` 找到。

::: tip SUCCESS
恭喜！您現在應該已將 Vue 應用程式部署到 Permaweb！做得很好！
:::

## Summary

本指南提供一個簡單的逐步方法，說明如何使用 Create Vue 將 Vue.js 應用程式發佈到 Permaweb。若您需要額外功能（例如 Tailwind），建議探索本指南中列出的其他起始套件，以尋找符合您需求的解決方案。
