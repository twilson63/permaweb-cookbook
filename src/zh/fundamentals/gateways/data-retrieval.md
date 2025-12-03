---
title: 从 Arweave 获取数据
---

# 从 Arweave 获取数据

当您拥有交易 ID（txid）或 ArNS 名称时，有多种方法可以从 Arweave 网络检索相关数据。此指南涵盖开发者可用的主要方式。

## 概览

当您需要获取存储在 Arweave 的数据时，根据使用情境有多种选择：

- **HTTP API**：向网关端点发送直接的 HTTP 请求
- **Arweave.js**：用于程序化访问的 JavaScript/TypeScript SDK
- **ARIO Wayfinder**：具备智能路由与验证功能的协议

## 可用方法

### [HTTP API](./http-api.md)

使用标准 HTTP 请求访问 Arweave 网关的最简单方法。非常适合基本数据检索且希望最小化依赖的情况。

最适合：

- 简单的数据检索
- 服务器端应用程序
- 想要避免额外依赖时

### [Arweave.js](./arweave-js.md)

官方的 JavaScript/TypeScript SDK，提供对 Arweave 网络的完整接口。

最适合：

- JavaScript/TypeScript 应用程序
- 复杂的 Arweave 操作
- 当您需要交易的 metadata 与数据时

### [ARIO Wayfinder](./wayfinder.md)

一个提供去中心化、经密码学验证的访问并具备智能网关路由功能的协议。

最适合：

- 需要可靠性的生产环境应用程序
- 当您需要自动选择网关时
- 需要数据验证的应用程序

## 快速比较

| 方法       | 复杂度 | 依赖项                  | 功能           |
| ---------- | ------ | ----------------------- | -------------- |
| HTTP API   | 低     | 无                      | 基本的数据获取 |
| Arweave.js | 中     | `arweave` package       | 完整的交易访问 |
| Wayfinder  | 中     | `@ar.io/wayfinder-core` | 智能路由、验证 |

（表格列说明：Method = 方法，Complexity = 复杂度，Dependencies = 依赖项，Features = 功能）

## 开始使用

选择最适合您需求的方法：

1. **从 HTTP API 开始**，如果您想要最简单的方式
2. **使用 Arweave.js**，如果您正在构建 JavaScript/TypeScript 应用程序
3. **考虑 Wayfinder**，如果您需要生产级别的可靠性与验证

每个方法页面都包含安装说明、基本使用示例，以及链接到更详细的文档。
