# Arweave Name System (ArNS)

## Overview

The Arweave Name System (ArNS) 是 Permaweb 的電話簿。

它是一個去中心化且抗審查的命名系統，由 AR.IO Gateways 啟用，用於將友好名稱連接到 Permaweb 應用、頁面和資料。

此系統的運作類似於傳統 DNS，使用者可以在註冊表中購買名稱，然後 DNS 名稱伺服器將這些名稱解析到 IP 位址。

在 ArNS 中，註冊表是去中心化的、永久的，並儲存在 Arweave（透過 AO）上，每個 AR.IO 閘道同時充當快取與名稱解析器。使用者可以在 ArNS 註冊表中註冊一個名稱，例如 "my-name"，並將其指向任何 Arweave 交易 ID。

AR.IO 閘道會將該名稱解析為其自有子網域之一，例如 https://laserilla.arweave.net，並將所有請求代理到關聯的 Arweave 交易 ID。每個已註冊的名稱也可以有與之關聯的子名稱（under names），每個都指向一個 Arweave 交易 ID，例如 https://v1_laserilla.arweave.net，讓擁有者具有更多彈性與控制權。

## The ArNS Registry

ArNS 使用 AO 來管理其名稱紀錄。每個紀錄（或名稱）由使用者租用或永久購買，並綁定到一個 ANT 代幣。你可以將多個 ArNS 名稱註冊到單一 ANT，但你不能將多個 ANT 註冊到單一 ArNS 名稱——閘道無法判斷要將路由 ID 指向哪裡。

ArNS 名稱最多可包含 32 個字元，包括數字 [0-9]、字母 [a-z] 與連字號 [-]。連字號不能是尾端的連字號，例如 -myname。

## ANTs (Arweave Name Tokens)

ANTs 是 ArNS 生態系統的重要部分 —— 它們是擁有 ArNS 名稱的實際鑰匙。當你將一個 ArNS 名稱註冊到一個 ANT 時，該 ANT 就成為該名稱的轉移方式。ArNS 註冊表不在意誰擁有該 ANT，它只知道那個名稱屬於哪個 ANT。

在 ANTs 之內，你可以構建任何你想要的功能，前提是符合 ArNS 註冊表核准的原始程式碼交易清單範圍。

## Under_Names

Undernames 是由你的 ANT（Arweave Name Token）持有並管理的紀錄。這些紀錄可以在你甚至不擁有 ArNS 名稱的情況下建立與管理，且在 ANT 被轉移給新擁有者時會一併轉移。同樣地，如果你的 ArNS 名稱到期，而你將你的 ANT 註冊到新的 ArNS 名稱，所有的 undername 仍會保持不變。

範例：你擁有 oldName.arweave.net。

然後：你建立 undername "my" —— my_oldName.arweave.net。

然後：oldName.arweave.net 到期，你將 newName.arweave.net 註冊到你的 ANT。

現在：my\_ undername 可在 newName 上存取 —— my_newName.arweave.net。

下面是一個 ANT 合約 State 的範例：

```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```

base 的 "@" 紀錄是該 ANT 的初始路由 ID。如果你把 'my-name' 註冊到這個 ANT，並嘗試透過 my-name.arweave.net 存取，你會被重新導向到 @ 紀錄所指的 transactionId。

如果你嘗試存取 undername1_my-name.arweave.net，你會得到 undername1 的 transactionId。

理論上，ANT 可以擁有無限數量的 undernames。然而，實際會被服務的數量取決於你在 ArNS 名稱所使用的等級。

## Resources

- [ArNS App](https://arns.app/)
- [ArNS Docs](https://docs.ar.io/arns/)
