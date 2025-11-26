---
title: "Permaweb Deploy"
description: "Deploy web applications and files to the Permaweb using the permaweb-deploy CLI tool with automated ArNS updates"
difficulty: "Beginner"
stability: "Stable"
timeEstimate: "10 minutes"
---

# Permaweb 部署

`permaweb-deploy` 是一個 Node.js CLI 工具，可簡化使用 Arweave 將 Web 應用和檔案部署到 Permaweb 的流程。它會上傳你的 build 資料夾或單一檔案、建立 Arweave manifest，並自動使用新的交易 ID 更新 ArNS（Arweave Name Service）紀錄。

## 功能

- **Turbo SDK 整合**：快速、可靠地上傳檔案到 Arweave
- **Arweave Manifest v0.2.0**：建立具有 SPA 回退支援的 manifest
- **ArNS 更新**：透過 ANT 自動使用新的交易 ID 更新 ArNS 紀錄
- **自動化工作流程**：與 GitHub Actions 無縫整合
- **Git Hash 標記**：自動使用 Git commit hash 標記部署
- **404 回退偵測**：自動偵測並將 404.html 設為回退頁面
- **網路支援**：支援 mainnet、testnet，以及自訂 ARIO process ID
- **彈性部署**：可部署整個資料夾或單一檔案

## 安裝

```bash
npm install permaweb-deploy --save-dev
```

Yarn 使用者：

```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## 先決條件

### 錢包設定

**對於 Arweave 簽章者（預設）：**  
將你的 Arweave 錢包金鑰以 base64 編碼：

```bash
base64 -i wallet.json | pbcopy
```

將編碼後的錢包設定為環境變數 `DEPLOY_KEY`。

**對於 Ethereum/Polygon/KYVE 簽章者：**  
使用原始私鑰（不需編碼）作為 `DEPLOY_KEY`。

:::warning 安全最佳實務
請使用專用的部署錢包以降低安全風險。確保你的錢包有足夠的 Turbo Credits 以進行上傳。
:::

## 基本用法

在你的 `package.json` 中加入部署腳本：

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

部署你的應用：

```bash
npm run deploy
```

## CLI 選項

| Option            | Alias | Description                                            | Default   |
| ----------------- | ----- | ------------------------------------------------------ | --------- |
| `--arns-name`     | `-n`  | **必填。** 要更新的 ArNS 名稱                          | -         |
| `--ario-process`  | `-p`  | ARIO process（`mainnet`、`testnet`，或 process ID）    | `mainnet` |
| `--deploy-folder` | `-d`  | 要部署的資料夾                                         | `./dist`  |
| `--deploy-file`   | `-f`  | 部署單一檔案而非資料夾                                 | -         |
| `--undername`     | `-u`  | 要更新的 ANT undername                                 | `@`       |
| `--ttl-seconds`   | `-t`  | ANT 紀錄的 TTL（秒）（60-86400）                       | `3600`    |
| `--sig-type`      | `-s`  | 簽章者類型（`arweave`、`ethereum`、`polygon`、`kyve`） | `arweave` |

## 範例

**部署應用**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app
```

**部署特定資料夾**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-folder ./build
```

**部署單一檔案**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-file ./script.lua
```

**部署到 Undername**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --undername staging
```

**使用自訂 TTL 部署**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --ttl-seconds 7200
```

**使用 Ethereum 簽章者部署**

```bash
DEPLOY_KEY=<ETH_PRIVATE_KEY> npx permaweb-deploy --arns-name my-app --sig-type ethereum
```

## 網路設定

**Mainnet（預設）**

```json
{
  "scripts": {
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

**Testnet**

```json
{
  "scripts": {
    "deploy:test": "npm run build && permaweb-deploy --arns-name my-app --ario-process testnet"
  }
}
```

**自訂 Process ID**

```json
{
  "scripts": {
    "deploy:custom": "npm run build && permaweb-deploy --arns-name my-app --ario-process PROCESS_ID"
  }
}
```

## GitHub Actions 整合

建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Permaweb
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## 部署輸出

成功部署後，你會看到類似的輸出：

```
-------------------- DEPLOY DETAILS --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

## 安全最佳實務

- **使用專用錢包**：建立專用的部署錢包以降低安全風險
- **安全的秘密管理**：切勿將 `DEPLOY_KEY` 提交到版本控制系統
- **檢查建置內容**：在部署前檢查你的 build 是否洩漏祕密
- **確保有足夠的額度**：在部署前確認你的錢包有足夠的 Turbo Credits
- **Base64 編碼**：Arweave 錢包需為 base64 編碼才能用於部署腳本

## 疑難排解

### 常見錯誤

**_"ARNS_NAME not configured"_**

- 確認你有使用 `--arns-name` 參數並提供有效的 ArNS 名稱

**_"DEPLOY_KEY not configured"_**

- 驗證是否已將 base64 編碼的錢包設定為環境變數 `DEPLOY_KEY`

**_"deploy-folder does not exist"_**

- 檢查你的 build 資料夾是否存在且路徑正確
- 先執行你的 build 指令

**_"ARNS name does not exist"_**

- 驗證 ArNS 名稱是否正確，並且存在於指定的網路中

**_"Upload timeouts"_**

- 檔案上傳有 10 秒的逾時限制
- 大檔案可能會失敗，需進行最佳化

**_"Insufficient Turbo Credits"_**

- 檢查你的錢包餘額並增加額度（如果需要）

### 除錯資訊

透過設定 `DEBUG` 環境變數啟用詳細日誌：

```bash
DEBUG=permaweb-deploy* npm run deploy
```

## 相依套件

- **@ar.io/sdk**：ANT 操作與 ArNS 管理
- **@ardrive/turbo-sdk**：快速上傳檔案到 Arweave
- **@permaweb/aoconnect**：AO 網路連線
- **yargs**：CLI 參數解析

## 下一步

1. **ArNS 設定**： [ArNS Names](../../fundamentals/accessing-arweave-data/arns.md)
2. **Turbo Credits**： [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)
3. **GitHub Actions**： [CI/CD Integration](/tooling/deployment/github-action)

## 資源

- **GitHub 倉庫**： [permaweb/permaweb-deploy](https://github.com/permaweb/permaweb-deploy)
- **Turbo SDK 文件**： [docs.ardrive.io/turbo](https://docs.ar.io/build/upload/bundling-services)
- **ArNS 文件**： [ar.io/arns](https://docs.ar.io/learn/arns)
- **Arweave 生態系**： [arweave.org](https://arweave.org)
