---
prev: "data-model.md"
next: "content-types.md"
---

# 實體類型

## 概覽

Arweave 交易由交易標頭和資料有效載荷組成。

因此，ArFS 實體的資料部分會分散儲存在交易標頭的標籤（tags）中，以及以 JSON 編碼後作為交易的資料儲存。對於私密實體，JSON 資料與檔案資料有效載荷都會依照下列協議流程加密。

- Drive 實體需要一個 metadata 交易，包含標準的 Drive 標籤和編碼的 JSON（次級 metadata）。

- Folder 實體需要一個 metadata 交易，包含標準的 Folder 標籤和編碼的 JSON（次級 metadata）。

- File 實體需要一個 metadata 交易，包含標準的 File 標籤和與檔案相關的 Data JSON 次級 metadata。

- File 實體還需要第二個資料交易，該交易包含有限的 File 標籤以及實際的檔案資料本身。

- Snapshot 實體需要一個交易，其中包含一個 Data JSON，該 JSON 包含整個 Drive 的彙總 ArFS metadata，以及可辨識此 Snapshot 的標準 Snapshot GQL 標籤。

## Drive

Drive 是最高層級的邏輯群組，用以聚合資料夾與檔案。所有資料夾與檔案必須屬於某個 Drive，並參照該 Drive 的 Drive ID。

建立 Drive 時，必須同時建立一個對應的資料夾，作為該 Drive 的根資料夾（root folder）。Drive 與 Folder 實體的分離使得可以支援資料夾檢視查詢、重新命名與連結等功能。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<uuid>"
Drive-Privacy: "<public | private>"
Drive-Auth-Mode?: "password"
Entity-Type: "drive"
Unix-Time: "<seconds since unix epoch>"

Data JSON {
    "name": "<使用者自訂的 Drive 名稱>",
    "rootFolderId": "<drive 根資料夾的 uuid>"
}
```

<div style="text-align: center; font-size: .75em;">Drive 實體交易範例</div>

## Folder

Folder（資料夾）是用來邏輯分組其他資料夾與檔案的實體。沒有 parent folder id 的 Folder metadata 交易會被視為其對應 Drive 的根資料夾。所有其他 Folder 實體必須具有 parent folder id。由於資料夾本身沒有底層資料，因此不需要 Folder 資料交易。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "folder"
Folder-Id: "<uuid>"
Parent-Folder-Id?: "<parent folder uuid>"
Unix-Time: "<seconds since unix epoch>"

Data JSON {
    "name": "<使用者自訂的資料夾名稱>"
}
```

<div style="text-align: center; font-size: .75em;">Folder 實體交易範例</div>

## File

檔案（File）包含上傳的資料，例如照片、文件或影片。

在 Arweave 檔案系統中，單一檔案拆分為兩個部分：其 metadata 與其資料（data）。

File 實體的 metadata 交易不包含實際的檔案資料。相反地，檔案資料必須作為獨立交易上傳，稱為 File Data Transaction。File 的 JSON metadata 交易會包含指向 File Data Transaction ID 的參照，以便取得實際資料。此分離允許更新檔案 metadata 時無需重新上傳檔案本身，也確保私密檔案的 JSON metadata 交易可以加密，避免未授權者看到檔案或其 metadata。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "file"
File-Id: "<uuid>"
Parent-Folder-Id: "<parent folder uuid>"
Unix-Time: "<seconds since unix epoch>"

Data JSON {
    "name": "<使用者自訂的檔案名稱（含副檔名，例如 happyBirthday.jpg）>",
    "size": "<計算出的檔案大小 - int>",
    "lastModifiedDate": "<作業系統報告之檔案最後修改時間，毫秒為單位，自 Unix 紀元以來的毫秒數 - int>",
    "dataTxId": "<儲存資料的交易 id>",
    "dataContentType": "<此檔案實體所關聯資料的 mime-type>",
    "pinnedDataOwner": "<被固定（pinned）資料原始擁有者的位址>" # 選填
}
```

<div style="text-align: center; font-size: .75em;"> 釘選（Pin）檔案 </div>

自 v0.13 版本起，ArFS 支援 Pin（釘選）。Pin 是指其資料可以是任意上傳至 Arweave 的交易，該交易可能屬於或不屬於建立此 pin 的錢包。

建立新的 File Pin 時，唯一建立的交易是 Metadata 交易。`dataTxId` 欄位會指向 Arweave 中的任一交易，而選填的 `pinnedDataOwner` 欄位則會保存擁有原始資料交易的錢包位址。

<div style="text-align: center; font-size: .75em;">File Data Transaction 範例</div>

File Data Transaction 包含有限的檔案資訊，例如解密所需資訊或在瀏覽器中檢視所需的 Content-Type（mime-type）。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<file mime-type | application/octet-stream>"
 { File Data - 若為私密則為加密後資料 }
```

<div style="text-align: center; font-size: .75em;">File Metadata Transaction 範例</div>

File Metadata Transaction 含有識別檔案於某 Drive 與資料夾內所需的 GQL 標籤。

其資料部分包含檔案的 JSON metadata，包括檔名、大小、最後修改日期、資料交易 id 與資料 Content-Type。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "file"
File-Id: "<uuid>"
Parent-Folder-Id: "<parent folder uuid>"
Unix-Time: "<seconds since unix epoch>"
 { File JSON Metadata - 若為私密則為加密後 JSON }
```

## Snapshot

ArFS 應用程式會透過查詢與使用者特定 `Drive-Id` 相關的所有 ArFS 交易來產生 Drive 的最新狀態。這包括使用 GQL 對已索引的 ArFS 資料進行分頁查詢，以及對每筆 ArFS 交易的 ArFS JSON metadata 條目進行擷取。

對於小型的 Drive（少於 1000 個檔案），對少量資料發出數千次請求通常能較快速且可靠地完成。對於較大的 Drive，當本地資料庫快取為空時，這會導致拉取每一筆 ArFS metadata 的同步時間變長，且可能觸發 ArWeave Gateway 的速率限制延遲。

一旦 Drive 狀態被完整且準確地重建，就可以將其彙總為單一快照並以上傳為 Arweave 交易。ArFS 用戶端可以使用 GQL 找到並擷取此快照，以快速重建整個 Drive 的狀態或其大部分內容，之後再查詢快照之後進行的個別交易。

此為一種可選方法，在構建 Drive 狀態時提供便利與資源效率，但需支付上傳快照資料的費用。採用此方法表示用戶端只需遍歷少數快照，而非該 Drive 上的每一筆交易。

### Snapshot 實體標籤

Snapshot 實體需要下列標籤。ArFS 用戶端會以此查詢 Drive 快照，將它們與任何未包含於快照內的其他交易一起組織，並建構 Drive 的最新狀態。

```json
ArFS: "0.13"
Drive-Id: "<此快照所屬的 drive uuid>"
Entity-Type: "snapshot"
Snapshot-Id: "<此 snapshot 實體的 uuid>"
Content-Type: "<application/json>"
Block-Start: "<在此快照中搜尋交易時的最低區塊高度，例如 0>"
Block-End: "<在此快照中搜尋交易時的最高區塊高度，例如 1007568>"
Data-Start: "<在此快照中有交易資料被發現之第一個區塊，例如 854300>"
Data-End: "<在此快照中有交易被發現之最後一個區塊，例如 1001671>"
Unix-Time: "<自 Unix 紀元以來的秒數>"
```

<div style="text-align: center; font-size: .75em;">Snapshot 交易 GQL 標籤範例</div>

### Snapshot 實體資料

每個 ArFS Snapshot 實體也必須上傳一個 JSON 資料物件。此資料包含該 Drive 內所有 ArFS Drive、Folder 及 File metadata 的變更，以及任何先前的 Snapshot。Snapshot 資料包含一個陣列 `txSnapshots`。陣列中的每一項都包含在該快照開始與結束期間內，對應 Drive 所進行的每筆交易的 GQL 與 ArFS metadata 詳細資料。

每個 `txSnapshot` 包含一個 `gqlNode` 物件，該物件採用與 Arweave Gateway 回傳相同的 GQL tags 介面。它包含 ArFS 用戶端所需的所有重要資訊：`block`、`owner`、`tags` 與 `bundledIn`。它也包含一個 `dataJson` 物件，用以儲存該 ArFS 實體對應的 Data JSON。

對於私密 Drive，`dataJson` 物件包含對應檔案或資料夾經加密後並經 JSON 字串轉義的文字。該加密文字使用該檔案現有的 `Cipher` 與 `Cipher-IV`，確保用戶端可以依現有的 ArFS 隱私協議快速解密此資訊。

```json
{
  "txSnapshots": [
    {
      "gqlNode": {
        "id": "bWCvIc3cOzwVgquD349HUVsn5Dd1_GIri8Dglok41Vg",
        "owner": {
          "address": "hlWRbyJ6WUoErm3b0wqVgd1l3LTgaQeLBhB36v2HxgY"
        },
        "bundledIn": {
          "id": "39n5evzP1Ip9MhGytuFm7F3TDaozwHuVUbS55My-MBk"
        },
        "block": {
          "height": 1062005,
          "timestamp": 1669053791
        },
        "tags": [
          {
            "name": "Content-Type",
            "value": "application/json"
          },
          {
            "name": "ArFS",
            "value": "0.11"
          },
          {
            "name": "Entity-Type",
            "value": "drive"
          },
          {
            "name": "Drive-Id",
            "value": "f27abc4b-ed6f-4108-a9f5-e545fc4ff55b"
          },
          {
            "name": "Drive-Privacy",
            "value": "public"
          },
          {
            "name": "App-Name",
            "value": "ArDrive-App"
          },
          {
            "name": "App-Platform",
            "value": "Web"
          },
          {
            "name": "App-Version",
            "value": "1.39.0"
          },
          {
            "name": "Unix-Time",
            "value": "1669053323"
          }
        ]
      },
      "dataJson": "{\"name\":\"november\",\"rootFolderId\":\"71dfc1cb-5368-4323-972a-e9dd0b1c63a0\"}"
    }
  ]
}
```

<div style="text-align: center; font-size: .75em;">Snapshot 交易 JSON 資料範例</div>

## 架構圖（Schema Diagrams）

下列圖示顯示 Drive、Folder 與 File 實體 Schema 的完整範例。

### 公開 Drive

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">公開 Drive 架構圖</div>

### 私密 Drive

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">私密 Drive 架構圖</div>
