---
title: 從 Arweave 取得資料
---

# 從 Arweave 取得資料

當您擁有交易 ID（txid）或 ArNS 名稱時，有多種方法可以從 Arweave 網路擷取相關資料。此指南涵蓋開發者可用的主要方式。

## 概覽

當您需要取得儲存在 Arweave 的資料時，根據使用情境有多種選擇：

- **HTTP API**：對網關端點發送直接的 HTTP 請求
- **Arweave.js**：用於程式化存取的 JavaScript/TypeScript SDK
- **ARIO Wayfinder**：具智慧路由與驗證功能的協議

## 可用方法

### [HTTP API](./http-api.md)

使用標準 HTTP 請求存取 Arweave 網關的最簡單方法。非常適合基本資料擷取且希望最小化依賴的情況。

最適合：

- 簡單的資料擷取
- 伺服器端應用程式
- 想要避免額外套件時

### [Arweave.js](./arweave-js.md)

官方的 JavaScript/TypeScript SDK，提供對 Arweave 網路的完整介面。

最適合：

- JavaScript/TypeScript 應用程式
- 複雜的 Arweave 操作
- 當您需要交易的 metadata 與資料時

### [ARIO Wayfinder](./wayfinder.md)

一個提供去中心化、經密碼學驗證存取並具智慧型網關路由的協議。

最適合：

- 需要可靠性的生產環境應用程式
- 當您需要自動選擇網關時
- 需要資料驗證的應用程式

## 快速比較

| Method     | Complexity | Dependencies            | Features                          |
| ---------- | ---------- | ----------------------- | --------------------------------- |
| HTTP API   | Low        | None                    | Basic data retrieval              |
| Arweave.js | Medium     | `arweave` package       | Full transaction access           |
| Wayfinder  | Medium     | `@ar.io/wayfinder-core` | Intelligent routing, verification |

（表格欄位說明：Method = 方法, Complexity = 複雜度, Dependencies = 相依性, Features = 功能）

## 開始使用

選擇最適合您需求的方法：

1. **從 HTTP API 開始**，如果您想要最簡單的方式
2. **使用 Arweave.js**，如果您正在建置 JavaScript/TypeScript 應用程式
3. **考慮 Wayfinder**，如果您需要生產等級的可靠性與驗證

每個方法頁面都包含安裝說明、基本使用範例，以及連結到更詳細的文件。
