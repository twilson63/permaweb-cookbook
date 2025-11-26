# Arweave 網路中的網關

網關作為 Arweave 網路與終端使用者之間的介面，讓 Permaweb 的資料能夠透過標準網頁瀏覽器輕鬆存取。

這些服務常被形容為「Permaweb 的前門」，讓使用者以熟悉的類網頁體驗與儲存在區塊鏈上的內容互動。

當您在 Arweave 上存取內容時，通常會使用如下的 URL 結構：

```
https://<gateway>/<tx>
```

這讓 HTML 檔案能夠呈現為網頁、影像能夠正確顯示，其他資料類型也能適當地被提供——儘管內容儲存在去中心化網路上，使用體驗仍類似傳統網路。

## 網關的主要功能

除了基本的內容傳遞外，網關還提供數項關鍵服務：

- **內容快取**：儲存常被存取的交易以提升效能
- **資料索引**：提供 GraphQL 介面，透過標籤與欄位查詢交易
- **網路播種**：協助將交易散佈至整個 Arweave 網路
- **內容審核**：套用內容政策以決定提供哪些資料

## 與核心協議的關係

重要的是要理解，網關 **不是 Arweave 核心協議的一部分**。此區分帶來幾個意涵：

- 運行網關與運行保護網路安全的節點是分開的
- 在協議層面沒有為網關營運者設計的內建誘因結構
- 網關服務可以實作自己的經濟模式與誘因
- 應用程式可以自行運行網關以提升效能

這種分離允許更彈性與去中心化的生態系，不同的網關營運者可以嘗試各種服務模型。

## 常見的網關服務

目前有數個網關服務在支援 Arweave 生態系：

- [arweave.net](https://arweave.net/) - 由 Arweave 團隊營運
- [arweave.world](https://cookbook.arweave.world/)
- [arweave.asia](https://cookbook.arweave.asia)
- [arweave.live](https://arweave.live/)
- [g8way.io](https://g8way.io)

[AR.IO](https://ar.io/) 專案正致力於讓網關運營更容易上手，可能會提升網路存取點的去中心化程度。

## 延伸閱讀

- [ArWiki Gateway Documentation](https://arwiki.wiki/#/en/gateways)
- [AR.IO Project](https://ar.io/)
