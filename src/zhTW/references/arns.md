# Arweave 名稱系統 (ArNS)

## 概覽

Arweave 名稱系統 (ArNS) 是 Permaweb 的電話簿。

它是一個去中心化且抗審查的命名系統，由 AR.IO Gateways 啟用，用於將友善名稱連結到 Permaweb 應用、頁面與資料。

此系統的運作類似傳統的 DNS，使用者可以在註冊表中購買名稱，DNS 名稱伺服器會將這些名稱解析（resolve）到 IP 位址。

在 ArNS 中，註冊表是去中心化、永久且儲存在 Arweave（透過 AO）上，每個 AR.IO gateway 同時扮演快取與名稱解析器。使用者可以在 ArNS 註冊表中註冊名稱（例如 "my-name"），並將該名稱指向任一 Arweave 交易 ID（Transaction ID）。

AR.IO Gateways 會將該名稱解析為其自身的子網域，例如 https://laserilla.arweave.net，並將所有請求代理（proxy）到所關聯的 Arweave 交易 ID。每個已註冊的名稱也可以擁有多個下位名稱（undernames），每個下位名稱皆指向一個 Arweave 交易 ID，例如 https://v1_laserilla.arweave.net，為持有人提供更多彈性與控制權。

## ArNS 註冊表

ArNS 使用 AO 來管理其名稱紀錄。每個紀錄（或名稱）由使用者租用或永久購買，並綁定到一個 ANT 代幣（ANT token）。你可以將多個 ArNS 名稱註冊到單一 ANT，但不能將多個 ANT 註冊到單一 ArNS 名稱——否則 gateway 無法判斷應該將路由指向哪個 ID。

ArNS 名稱最多可包含 32 個字元，允許的字元包括數字 [0-9]、小寫英文字母 [a-z] 與連字符 [-]。連字符不得為尾端連字符，例如 -myname。

## ANTs（Arweave Name Tokens）

ANTs 是 ArNS 生態系統中的關鍵部分 —— 它們是擁有 ArNS 名稱的實際鑰匙。當你將 ArNS 名稱註冊到某個 ANT 時，該 ANT 隨即成為該名稱的轉移（轉讓）方式。ArNS 註冊表並不關心誰擁有該 ANT，它僅記錄該名稱所屬的 ANT。

在 ANT 內，你可以依據 ArNS 註冊表核准的原始程式碼交易清單範圍，構建任意你需要的功能。

## Under_Names

Undernames（下位名稱）是由你的 ANT（Arweave Name Token）持有並管理的紀錄。這些紀錄可以在未擁有 ArNS 名稱的情況下建立與管理，並會在 ANT 轉移給新持有人時一併轉移。相同地，如果你的 ArNS 名稱到期，且你把 ANT 註冊到新的 ArNS 名稱，所有下位名稱將會保持不變。

範例：你擁有 oldName.arweave.net。

接著：你建立下位名稱 "my" —— my_oldName.arweave.net。

再接著：oldName.arweave.net 到期，你把 newName.arweave.net 註冊到你的 ANT。

現在：my\_ 下位名稱可透過 newName 存取 —— my_newName.arweave.net。

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

base 的 "@" 紀錄是該 ANT 的初始路由 ID。如果你將 'my-name' 註冊到此 ANT，並透過 my-name.arweave.net 存取，將會被導向到 @ 紀錄所對應的 transactionId。

如果你嘗試存取 undername1_my-name.arweave.net，則會取得 undername1 的 transactionId。

理論上，ANT 可以有無限數量的下位名稱（undernames）。然而，實際會被提供的數量取決於你為 ArNS 名稱所使用的層級（tier）。

## 資源

- [ArNS App](https://arns.app/)
- [ArNS Docs](https://docs.ar.io/arns/)
