# SmartWeave

> **⚠️ 棄用通知**
>
> 本文件已被棄用，可能包含過時的資訊。

## 什麼是 SmartWeave？

SmartWeave 是 Arweave 上主要的智慧合約範式名稱。SmartWeave 合約的一個獨特特性是合約當前狀態是透過「延遲評估（lazy evaluation）」的過程提供。這表示不是由 Arweave 的礦工節點不斷評估所有合約的當前狀態，而是由讀取合約的用戶端自行評估該狀態。

## 為什麼 SmartWeave 很重要？

去中心化應用的狀態與邏輯需要像其餘資料一樣具有抗審查性、永久保存與可驗證性。SmartWeave 讓開發者能撰寫智慧合約，把應用的狀態與邏輯封裝上鏈，並以一種免信任且可驗證的方式執行。這並非易事，因為 Arweave 協議並未包含激勵節點為網路評估智慧合約狀態的機制。

SmartWeave 提供了不可變的追加模式（append-only）來處理合約互動，並利用永久存儲來保存其狀態。其結果是一個完全去中心化的鏈上狀態機，能以無許可且免信任的方式賦予協議與應用動態功能。透過使用 SmartWeave，開發者可以建立存放於 Arweave 上且保證不會隨時間改變的智慧合約。這讓他們能建構具有動態功能的 [Permaweb 應用](/concepts/permaweb-applications.md)，並以無許可與免信任的方式使用。

開發者可能會選擇使用 SmartWeave 來實作其 permaweb 應用邏輯的幾個原因包括：

- **去中心化儲存：** SmartWeave 建構於 Arweave 之上，這代表使用 SmartWeave 建立的應用會儲存在分散式節點網路，而非單一中央伺服器。這能使應用更能抵抗審查、竄改與其他干擾形式。

- **延遲評估：** SmartWeave 合約的延遲評估特性允許更有效且具擴展性的執行。不是由 Arweave 節點不斷評估合約狀態，而是由讀取合約的用戶端負責評估狀態，利用使用者的計算資源而非網路節點的資源。

- **語言支援：** SmartWeave 支援多種程式語言，包括 JavaScript、TypeScript、Rust、Go、AssemblyScript 與 WASM（WebAssembly）。這讓開發者在建立 SmartWeave 應用時可以使用自己最熟悉的語言。

- **資料持久性：** Arweave 設計用來以高度耐久且長期保存的方式存儲資料。這對需要長期保存資料的應用（例如歷史紀錄或科學資料）非常有用。

- **經濟模型：** Arweave 使用基於永久存儲概念的獨特經濟模型，對礦工提供激勵以長期儲存資料。這有助於確保使用 SmartWeave 建立的 permaweb 應用的長期可行性與耐久性。

## SmartWeave 如何運作？

SmartWeave 合約的核心由初始合約狀態建構，透過交易標籤（transaction tags）進行編輯、新增與刪除來變更狀態。

像 `Warp`（先前稱為 `RedStone`）等 SmartWeave SDK 用於查詢這些交易，以在本地端建立合約狀態，並隨每筆交易修改合約狀態。評估器（`Warp`）使用標籤來查詢合約的交易；它透過 `App-Name` 標籤與 `Contract` 標籤來判斷某筆交易是否屬於該合約。

以下是一個合約 **互動** 的範例。

- `App-Name` 指出這是一個 SmartWeave 的 **ACTION**。
- `Contract` 標籤指出初始合約狀態的特定交易 ID。
- `Input` 標籤提供合約要執行的函式以及其他所需資料：

```json
[
    {
        name:"App-Name"
        value:"SmartWeaveAction"
    },
    {
        name:"App-Version"
        value:"0.3.0"
    },
    {
        name:"Contract"
        value:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        name:"Input"
        value:"{
            "function":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```

以下是一個 **合約** 的範例。

- `App-Name` 指出這是一個 SmartWeave **CONTRACT**
- `Contract-Src` 標籤指向合約的原始程式碼：

```json
[
    {
        key:"App-Name"
        value:"SmartWeaveContract"
    },
    {
        key:"App-Version"
        value:"0.3.0"
    },
    {
        key:"Contract-Src"
        value:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        key:"SDK"
        value:"RedStone"
    },
    {
        key:"Content-Type"
        value:"application/json"
    }
]
```

最終得到的狀態就是當前合約狀態，客戶端的 SDK 可以使用該狀態來計算使用者餘額、合約擁有者以及其他合約相關的細節。一旦呼叫者擁有經驗證的合約狀態，他們就可以為使用者建立一個互動（interaction）並部署到鏈上；當該互動被挖礦或在某個 [Gateway](/concepts/gateways.md) 上被索引後，下一次有人建構合約狀態時該互動就會被納入。

欲了解 SmartWeave 協議、其主要實作 Warp Contracts，以及更多內容的完整概覽，請前往 [Warp Academy](https://academy.warp.cc/)。深入逐步教學、探索進階概念，並了解 SmartWeave 如何為 permaweb 提供動力！

## SmartWeave 生態系專案

有相當多利用 SmartWeave 智能合約的生態系專案，下面列出一些要點：

### 實作

- [Warp](https://warp.cc/) | 主要的 SmartWeave SDK 提供者、教學資源，並協助維護 SmartWeave 協議。
- [MEM](https://www.mem.tech/) | Molecular Execution Machine（MEM）是一個開發者平台，提供高可用與高效能的分散式環境應用建立與使用。

### 工具

- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeave 合約瀏覽器，由 Warp 建立與維護。

### 資源

- [Warp Academy](https://academy.warp.cc/) | 一站式的 SmartWeave 資源中心

### 應用程式

- [Permapages](https://permapages.app/) | 永久網頁建立工具、ArNS 購買入口與 ANT 建立入口。您在 permaweb 上的個人檔案。
- [ArNS](arns.md) | Arweave 名稱系統 <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | 以智慧合約實作的 NoSQL 資料庫。
- [KwilDB](https://docs.kwil.com/)| 以智慧合約實作的 SQL 資料庫。
- [ArDrive Inferno](https://ardrive.io/inferno/) | 透過 ArDrive 上傳可取得 PSTs。
- [FirstBatch](https://www.firstbatch.xyz/) | FirstBatch 協助開發者與企業建立個人化、私密且無失真（distortion-free）的 AI 應用。
- [Othent](https://othent.io/) | 使用現有傳統社群登入進行 Web3 交易。
- [BazAR](https://bazar.arweave.net/) | 具有現實世界權利的數位內容市集。
- [Alex the Archieve](https://alex.arweave.net/) | 一個利用 Arweave 不可變存儲的去中心化檔案保存平台。

還有更多。
