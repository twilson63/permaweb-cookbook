# 錢包與密鑰

Arweave 錢包是與 Arweave 區塊鏈網路互動的入口。它們本身並不實體儲存代幣，而是管理存取與控制你的鏈上資產與資料所需的密碼學密鑰。

## 什麼是 Arweave 錢包？

Arweave 上的錢包是一種加密工具，用以保護你唯一的區塊鏈位址。該位址追蹤你的 $AR 代幣餘額，並啟用像是送出交易等網路互動。

重要的是要理解，錢包並不實際「持有」代幣。相反地，錢包儲存能讓你簽署交易並管理鏈上資產的公私密鑰對。代幣餘額存在於區塊鏈本身，並連結到你的錢包位址。

## 重點

- 錢包包含在 Arweave 網路上簽署交易並存取資金所需的密碼學密鑰
- 只有錢包擁有者（能存取 **私鑰**）才能為其位址授權交易
- Arweave 使用以 JWK（JSON Web Keys）格式儲存的 4096 位元 RSA-PSS 密鑰對
- 錢包位址由公鑰經由 SHA-256 雜湊與 Base64URL 編碼推導而得
- **私鑰** 必須時刻妥善保管，因為它控制對你的資金的存取權限

## 密鑰對與錢包格式

Arweave 採用 _4096 位元_ 的 RSA-PSS 密鑰對，並以 JWK（JSON Web Keys）格式儲存。典型的 Arweave 錢包 JWK 檔案如下（值已略寫）：

```json
{
  "d": "cgeeu66FlfX9wVgZr5AXKlw4MxTlxSuSwMtTR7mqcnoE...",
  "dp": "DezP9yvB13s9edjhYz6Dl...",
  "dq": "SzAT5DbV7eYOZbBkkh20D...",
  "e": "AQAB",
  "ext": true,
  "kty": "RSA",
  "n": "o4FU6y61V1cBLChYgF9O37S4ftUy4newYWLApz4CXlK8...",
  "p": "5ht9nFGnpfW76CPW9IEFlw...",
  "q": "tedJwzjrsrvk7o1-KELQxw...",
  "qi": "zhL9fXSPljaVZ0WYhFGPU..."
}
```

在此 JWK 檔案中：

- `n` 值代表你的錢包 **公鑰**，可以安全分享
- `d` 值（以及其它欄位）組成你的錢包 **私鑰**，必須保密

這些 JWK 檔案可以從像 [Arweave.app](https://arweave.app) 的錢包應用匯出，或使用 [arweave-js](https://github.com/ArweaveTeam/arweave-js) 程式化產生。

使用某些錢包應用時，你的 **私鑰** 也可能以助記詞（mnemonic seed phrase）的形式表示，可用來簽署交易或回復錢包。

## 錢包位址

Arweave 錢包位址由公鑰經由確定性過程推導而得：

1. 計算公鑰的 SHA-256 雜湊
2. 將此雜湊進行 Base64URL 編碼
3. 結果為一個 43 字元的錢包位址，比完整的 4096 位元公鑰更方便使用

此過程在你的錢包位址與公鑰之間建立了一個安全且可驗證的連結，同時提供更易讀的日常使用格式。

## 錢包安全

你的 **私鑰** 賦予對你錢包與資金的完全控制權。任何擁有你 **私鑰** 的人都能從你的位址轉移代幣。身為開發者，務必格外小心：

- 切勿將你的金鑰檔案放入公開的 GitHub 倉庫
- 不要將你的 **私鑰** 存放於不安全的裝置或雲端服務
- 安全地備份你的 **私鑰** 或助記詞
- 對於較大量的資產，建議使用硬體錢包

## 可用錢包

有數種錢包可用以與 Arweave 網路互動：

- [Wander](https://wander.app) - 提供 Arweave 與 AO 的瀏覽器擴充與行動錢包
- [Beacon](https://beaconwallet.app/) - 提供 Arweave 與 AO 的瀏覽器擴充與行動錢包
- [Arweave.app](https://arweave.app/welcome) - 用於部署永久資料、連接 dApp 與瀏覽 weave 的網頁錢包（對 AO/HyperBEAM 的支援有限）

## 延伸閱讀

- [Arweave 文件](https://docs.arweave.org/developers/server/http-api#key-format)
- [JSON Web Key 格式（RFC 7517）](https://www.rfc-editor.org/rfc/rfc7517)
