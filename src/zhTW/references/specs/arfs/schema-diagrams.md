---
prev: "privacy.md"
---

## Schema 圖示

下列圖示顯示了 Drive、Folder 與 File 實體 Schema 的完整範例。

### 公開 Drive

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">公開 Drive Schema</div>

### 私人 Drive

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">私人 Drive Schema</div>

Arweave GQL 標籤位元組限制為 `2048`。Data JSON 的自訂元資料沒有既定上限，但資料越多會導致上傳成本增加。
