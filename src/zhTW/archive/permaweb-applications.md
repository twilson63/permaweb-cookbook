# Permaweb 應用程式

A Permaweb application refers to a web page or app built on top of Arweave. Applications built on Arweave have the properties of immutability and long-term availability, which can go for not only data, but also backend processes (smart contracts) and the frontend of websites as well.

## 什麼是 Permaweb？

::: info 資訊
For a deeper dive into the permaweb check out this article on [The Permaweb](./permaweb.md)
:::

Permaweb 是建立在 [Arweave's Permaweb Services](./permaweb.md) 之上的網站、應用程式與智慧合約的集合。

Permaweb 的核心部分如下：

- 閘道服務（Gateways）
- 打包服務（Bundlers）
- 計算網路（AO）
- 索引服務（Indexers）

### 閘道服務

閘道通常被稱為 Permaweb 的「前門」。

閘道服務是 Arweave 上資料與瀏覽器中資料顯示之間的橋樑。它們提供交易資料、開放 GraphQL 端點以查詢 Arweave，並且通常會在閘道職責之外提供索引與快取服務。

[AR.IO](https://ar.io/) 是生態系統中最大的閘道網路之一，並提供教育資源與開源軟體，讓任何人都能自行啟動閘道節點，或運行自己的閘道。

### 打包服務

打包服務會將交易聚合成交易包（transaction bundles），並確保這些交易包直接發佈到 Arweave。透過使用像 [ArDrive Turbo](https://ardrive.io/turbo-bundler) 這樣的打包服務，你可以在單一 Arweave 區塊中發佈數十萬筆交易。

### 計算服務

AO Computer 是建立於 Arweave 之上的去中心化計算網路，提供建立通用智慧合約（Processes）的能力。

與 AO 上的 Process 的每次互動都會以 Arweave 交易的形式儲存。

AO 為大規模平行運算而設計，並整合了在 AO 的 Processes 中使用 Arweave 資料的功能。

### 索引服務

索引服務會監聽 Arweave 上的所有交易，並將它們匯入適合快速查詢的索引化資料庫。接著它們會對外提供 GraphQL 端點，以便 Permaweb 應用可以對 Arweave 資料進行最佳化查詢。

這些服務協同運作，形成 Permaweb 的服務層，賦予開發者在 Permaweb 上構建完全去中心化應用程式的能力。

## 應用程式開發

在 Permaweb 上開發應用程式的方式類似於 `Single Page Application` 的開發。

應用由在網頁瀏覽器中執行的前端功能組成，並使用 GraphQL（讀取/查詢）、Arweave/ArDrive Turbo（寫入）以及 AO（去中心化計算）來構成應用的商業邏輯與持久層。

透過利用現代 Web 應用框架與 [Path Manifest](./manifests.md) 規範，開發者可以將網站與應用程式部署到 Permaweb。

要了解更多關於建立與部署 Permaweb 應用程式的資訊，請查看您偏好的框架的入門套件：

- [React](../kits/react/index.md)
- [Svelte](../kits/svelte/index.md)
- [Vue](../kits/vue/index.md)

::: tip 找不到你的框架？
找不到你要的框架？為何不貢獻一個呢？[如何為範例手冊做出貢獻](../getting-started/contributing.md)
:::
