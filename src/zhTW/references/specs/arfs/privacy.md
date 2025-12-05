---
prev: "content-types.md"
next: "schema-diagrams.md"
---

# 隱私

Arweave 的 blockweave 天生是公開的。但對於使用 ArFS 的應用程式（例如 ArDrive），你的私人資料在未經軍規等級（且具 [量子抗性](https://blog.boot.dev/cryptography/is-aes-256-quantum-resistant/#:~:text=Symmetric%20encryption%2C%20or%20more%20specifically,key%20sizes%20are%20large%20enough)）加密之前絕不會離開你的電腦。這層隱私保護是在 Drive 級別套用，使用者在首次建立 Drive 時決定該 Drive 為公開或私有。私有 Drive 必須遵循 ArFS 的隱私模型。

每個位於私有 Drive 裡的檔案都採用對稱式加密，使用 [AES-256-GCM](https://iopscience.iop.org/article/10.1088/1742-6596/1019/1/012008/pdf)。每個私有 Drive 有一個主「Drive Key」，此金鑰由使用者的 Arweave 錢包簽名、使用者定義的 Drive 密碼，以及唯一的 Drive 識別碼（[uuidv4](https://en.wikipedia.org/wiki/Universally_unique_identifier)）組合而成。每個檔案有其衍生自「Drive Key」的專屬「File Key」。這使得單一檔案可以被分享，而不會洩露該 Drive 中其他檔案的存取權。

一旦檔案被加密並儲存在 Arweave 上，它就永遠被鎖定，且只能使用該檔案的檔案金鑰（file key）解密。

## 金鑰衍生

私有 Drive 有一個全域的 Drive 金鑰 `D`，以及多個用於加密的檔案金鑰 `F`。這使得一個 Drive 可以擁有任意數量的獨立加密檔案。單一檔案的所有版本會使用同一個檔案金鑰（因為新版本會使用相同的 File-Id）。

`D` 用於加密 Drive 與資料夾（Folder）的 metadata，而 `F` 則用於加密檔案（File）的 metadata 與實際儲存的資料。區分這兩個金鑰 `D` 與 `F`，允許使用者分享特定檔案而不揭露整個 Drive 的內容。

`D` 使用 HKDF-SHA256 衍生，輸入為對 Drive id 的未加鹽（unsalted）RSA-PSS 簽名以及使用者提供的密碼。

`F` 也使用 HKDF-SHA256 衍生，輸入為 Drive 金鑰與該檔案的 id。

<img :src="$withBase('/encryption-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

其他錢包（例如 [Wander](https://wander.app/)）可整合此金鑰衍生協定，只需暴露一個 API 以從指定的 Arweave 錢包收集簽名，取得用於 HKDF 衍生 Drive 金鑰所需的 SHA-256 簽名。

一個使用 Dart 的範例實作可在此取得：[here](https://github.com/ardriveapp/ardrive-web/blob/187b3fb30808bda452123c2b18931c898df6a3fb/docs/private_drive_kdf_reference.dart)，Typescript 實作則在此：[here](https://github.com/ardriveapp/ardrive-core-js/blob/f19da30efd30a4370be53c9b07834eae764f8535/src/utils/crypto.ts)。

## 私有 Drive

Drive 可以儲存公開或私有資料。此屬性由 Drive 實體 metadata 中的 `Drive-Privacy` 標籤表示。

```json
Drive-Privacy: "<public | private>"
```

若 Drive 實體為私有，則必須另外使用 `Drive-Auth-Mode` 標籤來表示 Drive Key 的衍生方式。ArDrive 用戶端目前採用安全密碼與 Arweave 錢包私鑰簽名的組合來衍生全域 Drive Key。

```json
Drive-Auth-Mode?: 'password'
```

在每個加密的 Drive 實體上，必須指定 `Cipher` 標籤，並提供解密資料所需的公用參數。這些參數透過 `Cipher-*` 標籤來指定，例如 `Cipher-IV`。若參數為位元組資料，則在標籤中必須以 Base64 編碼。

ArDrive 用戶端目前對所有對稱式加密採用 AES256-GCM，該演算法需要一個由 12 個隨機位元組組成的 Cipher 初始化向量（Initialization Vector）。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

此外，所有加密交易的 `Content-Type` 標籤必須為 `application/octet-stream`，而非 `application/json`

私有 Drive 實體及其對應的 Root Folder 實體都會使用這些金鑰與密碼學參數來對包含在交易中的 JSON 檔案進行對稱式加密。這可確保只有 Drive 擁有者（以及被分享金鑰的人）能夠開啟該 Drive、發現根資料夾，並繼續載入 Drive 中的其餘子項目。

## 私有檔案

當檔案上傳到私有 Drive 時，預設也會成為私有並使用與其父 Drive 相同的 Drive 金鑰。Drive 中的每個唯檔案會根據該檔案的唯一 `FileId` 取得其專屬的檔案金鑰集合。若同一檔案出現新版本，其 `File-Id` 將被重複使用，實際上所有版本會使用相同的 File Key。

這些檔案金鑰可由 Drive 擁有者依需求分享。

私有檔案實體的 metadata 與資料交易皆使用相同的檔案金鑰加密，確保資料的各個面向皆為真正的私密。因此，檔案的 metadata 與資料交易兩者都必須各自擁有唯一的 `Cipher-IV` 與 `Cipher` 標籤：

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

與 Drive 相同，私有檔案在其 metadata 與資料交易中的 `Content-Type` 標籤必須設定為 `application/octet-stream`：

```json
Content-Type: "application/octet-stream"
```
