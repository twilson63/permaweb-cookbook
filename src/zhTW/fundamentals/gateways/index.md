# Arweave 網路中的閘道

閘道（Gateways）作為 Arweave 網路與終端使用者之間的介面，讓 Permaweb 的資料能透過一般網頁瀏覽器輕鬆存取。

這些服務常被形容為 Permaweb 的「前門」，允許使用者以熟悉的類網頁體驗與儲存在區塊鏈上的內容互動。

當您在 Arweave 上存取內容時，通常會使用類似以下的 URL 結構：

```
https://<gateway>/<tx>
```

這使得 HTML 檔案可以作為網頁渲染、影像能正確顯示，其他資料類型也能適當提供——即使內容儲存在去中心化的網路上，仍能創造類似傳統網路的體驗。

## 閘道的主要功能

閘道除了基本內容提供外，還提供數項關鍵服務：

- **內容快取**：儲存常被存取的交易以提升效能
- **資料索引**：提供 GraphQL 介面，以透過標籤與元資料查詢交易
- **網路分發**：協助將交易散佈至整個 Arweave 網路
- **內容審查**：套用內容政策以決定提供哪些資料

## 與核心協定的關係

重要的是要理解，閘道並非 Arweave 核心協定的一部分。這項區別帶來若干影響：

- 營運閘道與執行用以保護網路的節點是分開的
- 協定層級並未為閘道營運者提供內建的激勵機制
- 閘道服務可以實作自己的經濟模型與激勵措施
- 應用程式可以營運自己的閘道以提升效能

這種分離讓生態系統更具彈性與去中心化，不同的閘道營運者可以嘗試各種服務模式。

## 熱門閘道服務

目前有數個閘道服務支援 Arweave 生態系：

- [arweave.net](https://arweave.net/) - 由 Arweave 團隊營運
- [arweave.world](https://cookbook.arweave.world/)
- [arweave.asia](https://cookbook.arweave.asia)
- [arweave.live](https://arweave.live/)
- [g8way.io](https://g8way.io)

[AR.IO](https://ar.io/) 專案正致力於讓閘道的運作更容易上手，可能會提升網路存取點的去中心化程度。

## 延伸閱讀

- [ArWiki Gateway Documentation](https://arwiki.wiki/#/en/gateways)
- [AR.IO Project](https://ar.io/)
