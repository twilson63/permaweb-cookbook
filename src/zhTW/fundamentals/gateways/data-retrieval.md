---
title: Fetching Data from Arweave
---

# 從 Arweave 取得資料

一旦你擁有交易 ID（txid）或 ArNS 名稱，就有多種方法可以從 Arweave 網路抓取相關資料。本指南涵蓋開發者可用的主要方法。

## 概覽

當你需要擷取儲存在 Arweave 上的資料時，可依使用情境選擇以下選項：

- **HTTP API**：直接向 gateway 端點發送 HTTP 請求
- **Arweave.js**：用於程式化存取的 JavaScript/TypeScript SDK
- **ARIO Wayfinder**：具智能路由與驗證的協議

## 可用方法

### [HTTP API](./http-api.md)

使用標準 HTTP 請求至 Arweave gateway 的最簡單方式。非常適合基本的資料擷取且想要最少相依性的情境。

**適用於：**

- 簡單的資料擷取
- 伺服器端應用程式
- 想避免額外套件時

### [Arweave.js](./arweave-js.md)

官方的 JavaScript/TypeScript SDK，提供與 Arweave 網路的完整介面。

**適用於：**

- JavaScript/TypeScript 應用程式
- 複雜的 Arweave 操作
- 需要交易 metadata 與資料時

### [ARIO Wayfinder](./wayfinder.md)

一個提供去中心化、密碼學驗證存取並具智能 gateway 路由的協議。

**適用於：**

- 需要生產級可靠性的應用
- 需要自動 gateway 選擇的情境
- 需要資料驗證的應用

## 快速比較

| 方法       | 複雜度 | 相依性                  | 功能           |
| ---------- | ------ | ----------------------- | -------------- |
| HTTP API   | 低     | 無                      | 基本資料擷取   |
| Arweave.js | 中等   | `arweave` 套件          | 完整交易存取   |
| Wayfinder  | 中等   | `@ar.io/wayfinder-core` | 智慧路由、驗證 |

## 開始使用

選擇最符合你需求的方法：

1. **從 HTTP API 開始**，如果你想要最簡單的方式
2. **使用 Arweave.js**，如果你正在建立 JavaScript/TypeScript 應用程式
3. **考慮 Wayfinder**，如果你需要生產級的可靠性與驗證

每個方法的頁面都包含安裝說明、基本使用範例以及通往更詳細文件的連結。
