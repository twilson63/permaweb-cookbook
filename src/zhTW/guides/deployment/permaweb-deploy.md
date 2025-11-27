---
title: "Permaweb 部署"
description: "使用 permaweb-deploy CLI 工具透過自動化 ArNS 更新將 Web 應用程式和檔案部署到 Permaweb"
difficulty: "入門"
stability: "穩定"
timeEstimate: "10 分鐘"
---

# Permaweb Deploy

`permaweb-deploy` 是一個 Node.js 命令列工具，可簡化使用 Arweave 將 Web 應用程式與檔案部署到 Permaweb 的流程。它會上傳您的 build 資料夾或單一檔案、建立 Arweave manifest，並自動使用新的交易 ID 更新 ArNS（Arweave Name Service）紀錄。

## 功能

- **Turbo SDK 整合**：快速且可靠地將檔案上傳到 Arweave
- **Arweave Manifest v0.2.0**：建立支援 SPA 的 manifest 並具備 fallback 支援
- **ArNS 更新**：透過 ANT 自動使用新的交易 ID 更新 ArNS 紀錄
- **自動化工作流程**：可與 GitHub Actions 無縫整合
- **Git Hash 標記**：自動以 Git commit hash 標記部署
- **404 Fallback 偵測**：自動偵測並將 404.html 設為 fallback
- **網路支援**：支援 mainnet、testnet 與自訂 ARIO process ID
- **彈性部署**：可部署整個資料夾或單一檔案

## 安裝

```bash
npm install permaweb-deploy --save-dev
```

對於 Yarn 使用者：

```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## 前置需求

### 錢包設定

**對於 Arweave 簽章者（預設）：**
將您的 Arweave 錢包金鑰以 base64 編碼：

```bash
base64 -i wallet.json | pbcopy
```

將編碼後的錢包設為 `DEPLOY_KEY` 環境變數。

**對於 Ethereum/Polygon/KYVE 簽章者：**
使用原始私鑰（不需編碼）作為 `DEPLOY_KEY`。

:::warning 安全最佳實務
請使用專用的部署錢包以降低安全風險。確保您的錢包具有足夠的 Turbo Credits 以進行上傳。
:::

## 基本用法

在您的 `package.json` 中加入部署腳本：

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

部署您的應用程式：

```bash
npm run deploy
```

## CLI 選項

| 選項 |
