---
title: "Permaweb 部署"
description: "使用 permaweb-deploy CLI 工具將網頁應用與檔案部署至 Permaweb，並自動更新 ArNS"
difficulty: "Beginner"
stability: "Stable"
timeEstimate: "10 分鐘"
---

# Permaweb 部署

`permaweb-deploy` 是一款 Node.js 指令列工具，可透過 Arweave 讓網頁應用與檔案的部署流程更順暢。它會上傳你的建置資料夾或單一檔案、建立 Arweave manifest，並自動使用新的交易 ID 更新 ArNS（Arweave Name Service）紀錄。

## 功能特色

- **Turbo SDK 整合**：快速、可靠的 Arweave 檔案上傳
- **Arweave Manifest v0.2.0**：建立支援 SPA 的 fallback manifest
- **ArNS 自動更新**：透過 ANT 自動更新 ArNS 紀錄為新的交易 ID
- **自動化流程**：可無縫整合至 GitHub Actions
- **Git Hash 標記**：自動以 Git commit hash 標記部署版本
- **404 Fallback 偵測**：自動偵測並設定 404.html 作為 fallback
- **網路支援**：支援 mainnet、testnet 及自訂 ARIO process ID
- **彈性部署方式**：可部署資料夾或單一檔案

## 安裝

```bash
npm install permaweb-deploy --save-dev
```

若使用 Yarn：

```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## 使用前準備

### 錢包設定

**若使用 Arweave signer（預設）**：
將你的 Arweave wallet key 編碼為 base64：

```bash
base64 -i wallet.json | pbcopy
```

將編碼後的內容設定為環境變數 `DEPLOY_KEY`。

**若使用 Ethereum / Polygon / KYVE signer：**
可直接使用原始私鑰（不需編碼）作為 `DEPLOY_KEY`。

:::warning 安全性最佳實踐
請使用專用錢包進行部署以降低風險。確保錢包內有足夠的 Turbo Credits 用於上傳。
:::

## 基本使用方式

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

## CLI 參數

| Option            | Alias | 說明                                                    | 預設值    |
| ----------------- | ----- | ------------------------------------------------------- | --------- |
| `--arns-name`     | `-n`  | **(必填)** 要更新的 ArNS 名稱                           | -         |
| `--ario-process`  | `-p`  | ARIO process（`mainnet`、`testnet` 或 process ID）      | `mainnet` |
| `--deploy-folder` | `-d`  | 要部署的資料夾                                          | `./dist`  |
| `--deploy-file`   | `-f`  | 改為部署單一檔案                                        | -         |
| `--undername`     | `-u`  | 要更新的 ANT undername                                  | `@`       |
| `--ttl-seconds`   | `-t`  | ANT record TTL（60–86400 秒）                           | `3600`    |
| `--sig-type`      | `-s`  | Signer 類型（`arweave`、`ethereum`、`polygon`、`kyve`） | `arweave` |

## 使用範例

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

**部署至特定 undername**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --undername staging
```

**自訂 TTL**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --ttl-seconds 7200
```

**使用 Ethereum signer 部署**

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

## 部署輸出結果

成功部署後，你將看到類似以下的輸出：

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

## 安全性最佳實踐

- **使用專用錢包**：為部署建立獨立錢包可降低風險
- **妥善管理機密資訊**：不要將 `DEPLOY_KEY` 提交到版本控制中
- **建置驗證**：部署前請確認建置內容未包含敏感資料
- **確保足夠 Turbo Credits**：部署前確認錢包餘額
- **Base64 編碼**：Arweave 錢包需先進行 base64 編碼

## 疑難排解

### 常見錯誤

**_"ARNS_NAME not configured"_**

- 請確認已傳入 `--arns-name` 並使用有效名稱

**_"DEPLOY_KEY not configured"_**

- 請確認你的 base64 錢包已設定為 `DEPLOY_KEY` 環境變數

**_"deploy-folder does not exist"_**

- 請確認建置資料夾存在且路徑正確
- 請先執行建置指令

**_"ARNS name does not exist"_**

- 請確認 ArNS 名稱是否存在於指定網路中

**_"Upload timeouts"_**

- 單檔案上傳逾時時間為 10 秒
- 大型檔案可能失敗，需先進行最佳化

**_"Insufficient Turbo Credits"_**

- 請檢查錢包餘額並補充 Credits

### 除錯資訊

可透過設定 `DEBUG` 變數啟用詳細日誌：

```bash
DEBUG=permaweb-deploy* npm run deploy
```

## 相依套件

- **@ar.io/sdk**：ANT 操作與 ArNS 管理
- **@ardrive/turbo-sdk**：快速上傳至 Arweave
- **@permaweb/aoconnect**：AO 網路連線
- **yargs**：CLI 參數解析

## 下一步

1. **ArNS 設定**：[ArNS Names](../../fundamentals/accessing-arweave-data/arns.md)
2. **Turbo Credits**：[Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)
3. **GitHub Actions**：[CI/CD Integration](/tooling/deployment/github-action)

## 資源

- **GitHub Repo**：[`permaweb/permaweb-deploy`](https://github.com/permaweb/permaweb-deploy)
- **Turbo SDK 文件**：[https://docs.ar.io/build/upload/bundling-services](https://docs.ar.io/build/upload/bundling-services)
- **ArNS 文件**：[https://docs.ar.io/learn/arns](https://docs.ar.io/learn/arns)
- **Arweave 生態系**：[https://arweave.org](https://arweave.org)
