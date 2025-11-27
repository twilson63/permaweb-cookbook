---
prev: "entity-types.md"
next: "privacy.md"
---

# 內容類型

ArFS 中的所有交易類型都會使用特定的元資料標籤來標示資料的 Content-Type（亦稱 MIME 類型）。ArFS 用戶端必須判定資料的 MIME 類型，才能讓 Arweave 閘道與瀏覽器適當地呈現該內容。

所有公開的 drive、folder 與 file（僅元資料）實體交易皆採用 JSON 標準，因此必須具有以下的內容類型標籤：

```json
Content-Type: '<application/json>'
```

但檔案的資料交易則必須判定其 MIME 類型。此資訊會儲存在該檔案對應的元資料交易 JSON 的 `dataContentType` 欄位，以及資料交易本身的內容類型標籤中。

```json
Content-Type: "<file's mime-type>"
```

所有私有的 drive、folder 與 file 實體交易由於為加密過的內容，必須具有下列內容類型：

```json
Content-Type: '<application/octet-stream>'
```

[ArDrive-Core](https://docs.ardrive.io/docs/core-sdk.html) 提供用來判定檔案內容類型的方法。

## 其他標籤

啟用 ArFS 的用戶端應在其交易上包含下列標籤以識別其應用程式

```json
App-Name: "<defined application name eg. ArDrive"
App-Version: "<defined version of the app eg. 0.5.0"
Client?: "<if the application has multiple clients, they should be specified here eg. Web"
```
