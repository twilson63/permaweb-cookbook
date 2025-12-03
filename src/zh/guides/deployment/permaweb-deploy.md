---
title: "Permaweb 部署"
description: "使用 permaweb-deploy CLI 工具将网页应用与文件部署至 Permaweb，并自动更新 ArNS"
difficulty: "入门"
stability: "稳定"
timeEstimate: "10 分钟"
---

# Permaweb 部署

`permaweb-deploy` 是一款 Node.js 命令行工具，可通过 Arweave 让网页应用与文件的部署流程更顺畅。它会上传你的构建文件夹或单一文件、生成 Arweave manifest，并自动使用新的交易 ID 更新 ArNS（Arweave Name Service）记录。

## 功能特色

- **Turbo SDK 集成**：快速、可靠的 Arweave 文件上传
- **Arweave Manifest v0.2.0**：生成支持 SPA 的 fallback manifest
- **ArNS 自动更新**：通过 ANT 自动将 ArNS 记录更新为新的交易 ID
- **自动化流程**：可无缝集成到 GitHub Actions
- **Git Hash 标记**：自动以 Git commit hash 标记部署版本
- **404 Fallback 检测**：自动检测并设置 404.html 作为 fallback
- **网络支持**：支持 mainnet、testnet 及自定义 ARIO process ID
- **灵活部署方式**：可部署文件夹或单一文件

## 安装

```bash
npm install permaweb-deploy --save-dev
```

若使用 Yarn：

```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## 使用前准备

### 钱包设置

**若使用 Arweave signer（默认）**：
将你的 Arweave wallet key 编码为 base64：

```bash
base64 -i wallet.json | pbcopy
```

将编码后的内容设置为环境变量 `DEPLOY_KEY`。

**若使用 Ethereum / Polygon / KYVE signer：**
可直接使用原始私钥（无需编码）作为 `DEPLOY_KEY`。

:::warning 安全性最佳实践
请使用专用钱包进行部署以降低风险。确保钱包内有足够的 Turbo Credits 用于上传。
:::

## 基本使用方式

在你的 `package.json` 中加入部署脚本：

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

部署你的应用：

```bash
npm run deploy
```

## CLI 参数

| Option            | Alias | 说明                                                    | 默认值    |
| ----------------- | ----- | ------------------------------------------------------- | --------- |
| `--arns-name`     | `-n`  | **(必填)** 要更新的 ArNS 名称                           | -         |
| `--ario-process`  | `-p`  | ARIO process（`mainnet`、`testnet` 或 process ID）      | `mainnet` |
| `--deploy-folder` | `-d`  | 要部署的文件夹                                          | `./dist`  |
| `--deploy-file`   | `-f`  | 改为部署单一文件                                        | -         |
| `--undername`     | `-u`  | 要更新的 ANT undername                                  | `@`       |
| `--ttl-seconds`   | `-t`  | ANT record TTL（60–86400 秒）                           | `3600`    |
| `--sig-type`      | `-s`  | Signer 类型（`arweave`、`ethereum`、`polygon`、`kyve`） | `arweave` |

## 使用示例

**部署应用**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app
```

**部署特定文件夹**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-folder ./build
```

**部署单一文件**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-file ./script.lua
```

**部署至特定 undername**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --undername staging
```

**自定义 TTL**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --ttl-seconds 7200
```

**使用 Ethereum signer 部署**

```bash
DEPLOY_KEY=<ETH_PRIVATE_KEY> npx permaweb-deploy --arns-name my-app --sig-type ethereum
```

## 网络设置

**Mainnet（默认）**

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

**自定义 Process ID**

```json
{
  "scripts": {
    "deploy:custom": "npm run build && permaweb-deploy --arns-name my-app --ario-process PROCESS_ID"
  }
}
```

## GitHub Actions 集成

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

## 部署输出结果

成功部署后，你将看到类似以下的输出：

```
-------------------- 部署详情 --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
已将 TxId [abc123def456ghi789jkl012mno345pqr678stu901v] 部署到名称 [my-app]，针对 ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] 使用 undername [@]
```

## 安全性最佳实践

- **使用专用钱包**：为部署创建独立钱包可降低风险
- **妥善管理机密信息**：不要将 `DEPLOY_KEY` 提交到版本控制中
- **构建验证**：部署前请确认构建内容未包含敏感数据
- **确保足够 Turbo Credits**：部署前确认钱包余额
- **Base64 编码**：Arweave 钱包需先进行 base64 编码

## 疑难排解

### 常见错误

**_"ARNS_NAME not configured"_**

- 请确认已传入 `--arns-name` 并使用有效名称

**_"DEPLOY_KEY not configured"_**

- 请确认你的 base64 钱包已设置为 `DEPLOY_KEY` 环境变量

**_"deploy-folder does not exist"_**

- 请确认构建文件夹存在且路径正确
- 请先执行构建命令

**_"ARNS name does not exist"_**

- 请确认 ArNS 名称是否存在于指定网络中

**_"Upload timeouts"_**

- 单文件上传超时为 10 秒
- 大型文件可能失败，需先进行优化

**_"Insufficient Turbo Credits"_**

- 请检查钱包余额并补充 Credits

### 调试信息

可通过设置 `DEBUG` 变量启用详细日志：

```bash
DEBUG=permaweb-deploy* npm run deploy
```

## 依赖项

- **@ar.io/sdk**：ANT 操作与 ArNS 管理
- **@ardrive/turbo-sdk**：快速上传至 Arweave
- **@permaweb/aoconnect**：AO 网络连接
- **yargs**：CLI 参数解析

## 下一步

1. **ArNS 设置**：[ArNS Names](../../references/arns.md)
2. **Turbo Credits**：[Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)

## 资源

- **GitHub Repo**：[`permaweb/permaweb-deploy`](https://github.com/permaweb/permaweb-deploy)
- **Turbo SDK 文档**：[https://docs.ar.io/build/upload/bundling-services](https://docs.ar.io/build/upload/bundling-services)
- **ArNS 文档**：[https://docs.ar.io/learn/arns](https://docs.ar.io/learn/arns)
- **Arweave 生态**：[https://arweave.org](https://arweave.org)
