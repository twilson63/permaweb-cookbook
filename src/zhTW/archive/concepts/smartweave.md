# SmartWeave

> **⚠️ 棄用通知**
>
> 本文件已棄用，可能包含過時資訊。

## 什麼是 SmartWeave？

SmartWeave 是 Arweave 上主要的智慧合約範式名稱。SmartWeave 合約的一個獨特特性是合約的當前狀態是透過「惰性求值（lazy evaluation）」的過程提供的。這表示不是由 Arweave 的採礦節點持續評估所有合約的當前狀態，而是由讀取合約的客戶端自行評估該狀態。

## 為什麼 SmartWeave 很重要？

去中心化應用程式的狀態與邏輯需要與其餘資料一樣具有抗審查、永久保存與可驗證性。SmartWeave 讓開發者能夠撰寫將應用狀態與邏輯封裝在鏈上並以免信任（trustless）且可驗證的方式執行的智慧合約。這並非小事，因為 Arweave 協議本身並沒有提供節點為網路評估智慧合約狀態的經濟誘因。

SmartWeave 提供了一種不可變的追加（append-only）互動模式，利用永久儲存來保存合約狀態。結果是建立了一個完全去中心化、鏈上（on-chain）的狀態機，能夠為協議與應用程式在無需許可與免信任的情況下提供動態功能。透過使用 SmartWeave，開發者可以在 Arweave 上建立隨時間保證不會變更的智慧合約，這使得他們能夠建立具有動態功能且可在無需許可與免信任情況下使用的 Permaweb 應用程式（[Permaweb applications](/concepts/permaweb-applications.md））。

開發者可能選擇使用 SmartWeave 來實作他們 permaweb 應用邏輯的原因包括：

- **去中心化儲存：** SmartWeave 建構於 Arweave 之上，所以使用 SmartWeave 建立的應用將儲存在分散式節點網路上，而非集中式伺服器。這可提高對審查、竄改與其他干預形式的抵抗力。

- **惰性求值：** SmartWeave 合約的惰性求值特性可達成有效且可擴展的執行。不是由 Arweave 節點持續評估合約狀態，讀取合約的客戶端負責評估狀態，利用使用者的運算能力而非網路節點。

- **語言支援：** SmartWeave 支援多種程式語言，包括 JavaScript、TypeScript、Rust、Go、AssemblyScript 與 WASM（WebAssembly）。這讓開發者可以使用自己熟悉的語言來建立 SmartWeave 應用。

- **資料耐久性：** Arweave 的設計讓資料具高度耐久性與長期保存能力。這對需要長期保存資料的應用（例如歷史記錄或科學資料）非常有用。

- **經濟模型：** Arweave 使用一種基於永久儲存概念的獨特經濟模型，為礦工提供長期儲存資料的誘因。這有助於確保使用 SmartWeave 建立的 permaweb 應用的長期可行性與耐久性。

## SmartWeave 如何運作？

SmartWeave 合約在核心上是從初始合約狀態建立，然後透過交易標籤（transaction tags）進行編輯、增加與扣除來變更狀態。

像 `Warp`（先前稱為 `RedStone`）等 SmartWeave SDK 用於查詢這些交易以在本地端重建合約狀態，並隨每一筆交易修改合約狀態。評估器（例如 `Warp`）使用標籤來查詢某合約的交易；它會透過 `App-Name` 標籤與 `Contract` 標籤來判定某交易是否屬於該合約。

以下是一個合約互動（interaction）的範例：

- `App-Name` 表示這是一個 SmartWeave 的 **ACTION**。
- `Contract` 標籤給出初始合約狀態的特定交易 ID。
- `Input` 標籤提供合約要執行的函式與其他所需資料：

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

以下是一個**合約**（contract）的範例：

- `App-Name` 表示這是一個 SmartWeave 的 **CONTRACT**
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

最終產生的結果即為合約的當前狀態，客戶端的 SDK 可利用此狀態來計算使用者餘額、合約所有者以及其他合約特定的細節。一旦呼叫者擁有經驗證的合約狀態，他們就可以為使用者建立一個互動（interaction）並部署至鏈上；該互動在被挖礦或於 [Gateway](/concepts/gateways.md) 上被索引後，會在下一次有人重建合約狀態時被包含進去。

如需關於 SmartWeave 協議、其領先實作 Warp Contracts 與更多內容的完整概覽，請前往 [Warp Academy](https://academy.warp.cc/)。在那裡可深入逐步教學、探討進階概念，並了解 SmartWeave 如何驅動 Permaweb 的功能！

## SmartWeave 生態系統專案

有相當多的生態系統專案在使用 SmartWeave 智慧合約，以下列出一些重點：

### 實作（Implementations）

- [Warp](https://warp.cc/) | 主要的 SmartWeave SDK 提供者、教學資源，以及協助維護 SmartWeave 協議。
- [MEM](https://www.mem.tech/) | Molecular Execution Machine（MEM）是一個開發者平台，支援在去中心化環境內建立與使用高度可用與高效能的應用。

### 工具（Tools）

- [SonAr](https://sonar.warp.cc/#/app/contracts) | SmartWeave 合約瀏覽器，由 Warp 建立與託管。

### 資源（Resources）

- [Warp Academy](https://academy.warp.cc/) | 一站式 SmartWeave 教學與資源中心

### 應用（Apps）

- [Permapages](https://permapages.app/) | 永久網頁建立工具、ArNS 購買入口，以及 ANT 建立入口。你在 permaweb 的個人檔案。
- [ArNS](arns.md) | Arweave 名稱系統 <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | 以智慧合約實現的 NoSQL 資料庫。
- [KwilDB](https://docs.kwil.com/) | 以智慧合約實現的 SQL 資料庫。
- [ArDrive Inferno](https://ardrive.io/inferno/) | 透過 ArDrive 上傳可獲得 PST。
- [FirstBatch](https://www.firstbatch.xyz/) | FirstBatch 協助開發者與企業打造個人化、私有且無失真的 AI 應用。
- [Othent](https://othent.io/) | 使用既有的傳統社群登入進行 Web3 交易。
- [BazAR](https://bazar.arweave.net/) | 擁有真實世界權利的數位內容市集。
- [Alex the Archieve](https://alex.arweave.net/) | 使用 Arweave 不可變儲存的去中心化檔案保存平台。

以及更多其他專案。
