---
prev: "arfs.md"
next: "entity-types.md"
---

# 資料模型

由於 Arweave 的永久性與不可變更性，傳統的檔案結構操作（例如重新命名或移動檔案或資料夾）無法僅透過更新鏈上資料來完成。ArFS 透過基於 Arweave [交易標頭](https://docs.arweave.org/developers/server/http-api#transaction-format) 中後設資料標籤所定義的僅追加（append-only）交易資料模型來解決此問題。

此模型採用自下而上的參照方法，可避免檔案系統更新時的競態條件。每個檔案包含指向父資料夾的後設資料，而每個資料夾包含指向其父 Drive 的後設資料。若採用自上而下的資料模型，則父模型（例如資料夾）必須儲存其子項的參考。

這些已定義的實體允許用戶端構建 Drive 的狀態，使其在外觀與使用感受上類似於檔案系統

- Drive 實體包含資料夾與檔案

- Folder 實體包含其他資料夾或檔案

- File 實體同時包含檔案資料與後設資料

- Snapshot 實體包含整個 Drive 內所有檔案與資料夾後設資料的狀態彙總

## 實體關係

下圖顯示 Drive、Folder、File 實體以及其相關資料之間的高階關係。各實體類型的更詳細資訊可見[此處](./entity-types.md)。

<img :src="$withBase('/entity-relationship-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

<div style="text-align: center; font-size: .75em;">實體關係圖</div>

如圖所示，每個檔案與資料夾都包含指向父資料夾與父 Drive 的後設資料。Drive 實體包含關於自身的後設資料，但不包含子項內容。因此，用戶端必須從最低層開始構建 Drive 狀態，逐層向上組合。

## 後設資料格式

儲存在任一 Arweave 交易標籤中的後設資料將以以下方式定義：

```json
{ "name": "Example-Tag", "value": "example-data" }
```

儲存在交易資料有效載荷（Transaction Data Payload）中的後設資料將遵循以下 JSON 格式：

```json
{
  "exampleField": "exampleData"
}
```

帶有 `?` 後綴的欄位為選填。

```json
{
  "name": "My Project",
  "description": "This is a sample project.",
  "version?": "1.0.0",
  "author?": "John Doe"
}
```

列舉欄位值（必須遵循特定值者）以 "value 1 | value 2" 格式定義。

所有用於實體 ID 的 UUID 均基於[通用唯一識別碼](https://en.wikipedia.org/wiki/Universally_unique_identifier) 標準。

不需要以任何特定順序列出 ArFS 標籤。
