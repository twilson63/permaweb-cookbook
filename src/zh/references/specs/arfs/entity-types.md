---
prev: "data-model.md"
next: "content-types.md"
---

# 实体类型

## 概览

Arweave 交易由交易头和数据有效载荷组成。

因此，ArFS 实体的数据部分会分散存储在交易头的标签（tags）中，以及以 JSON 编码后作为交易的数据存放。对于私密实体，JSON 数据与文件数据有效载荷都会依照下列协议流程加密。

- Drive 实体需要一个 metadata 交易，包含标准的 Drive 标签和编码的 JSON（次级 metadata）。

- Folder 实体需要一个 metadata 交易，包含标准的 Folder 标签和编码的 JSON（次级 metadata）。

- File 实体需要一个 metadata 交易，包含标准的 File 标签和与文件相关的 Data JSON 次级 metadata。

- File 实体还需要第二个数据交易，该交易包含有限的 File 标签以及实际的文件数据本身。

- Snapshot 实体需要一个交易，其中包含一个 Data JSON，该 JSON 包含整个 Drive 的汇总 ArFS metadata，以及可识别此 Snapshot 的标准 Snapshot GQL 标签。

## Drive

Drive 是最高层级的逻辑分组，用以聚合文件夹与文件。所有文件夹与文件必须属于某个 Drive，并参照该 Drive 的 Drive ID。

创建 Drive 时，必须同时创建一个对应的文件夹，作为该 Drive 的根文件夹（root folder）。Drive 与 Folder 实体的分离使得可以支持文件夹视图查询、重命名与链接等功能。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<uuid>"
Drive-Privacy: "<public | private>"
Drive-Auth-Mode?: "password"
Entity-Type: "drive"
Unix-Time: "<自 Unix 纪元以来的秒数>"

Data JSON {
    "name": "<用户自定义的 Drive 名称>",
    "rootFolderId": "<drive 根文件夹的 uuid>"
}
```

<div style="text-align: center; font-size: .75em;">Drive 实体交易示例</div>

## Folder

Folder（文件夹）是用来逻辑分组其他文件夹与文件的实体。没有 parent folder id 的 Folder metadata 交易会被视为其对应 Drive 的根文件夹。所有其他 Folder 实体必须具有 parent folder id。由于文件夹本身没有底层数据，因此不需要 Folder 数据交易。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "folder"
Folder-Id: "<uuid>"
Parent-Folder-Id?: "<parent folder uuid>"
Unix-Time: "<自 Unix 纪元以来的秒数>"

Data JSON {
    "name": "<用户自定义的文件夹名称>"
}
```

<div style="text-align: center; font-size: .75em;">Folder 实体交易示例</div>

## File

文件（File）包含上传的数据，例如照片、文档或影片。

在 Arweave 文件系统中，单一文件拆分为两个部分：其 metadata 与其数据（data）。

File 实体的 metadata 交易不包含实际的文件数据。相反地，文件数据必须作为独立交易上传，称为 File Data Transaction。File 的 JSON metadata 交易会包含指向 File Data Transaction ID 的参照，以便取得实际数据。此分离允许更新文件 metadata 时无需重新上传文件本身，也确保私密文件的 JSON metadata 交易可以加密，避免未授权者看到文件或其 metadata。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "file"
File-Id: "<uuid>"
Parent-Folder-Id: "<parent folder uuid>"
Unix-Time: "<自 Unix 纪元以来的秒数>"

Data JSON {
    "name": "<用户自定义的文件名称（含扩展名，例如 happyBirthday.jpg）>",
    "size": "<计算出的文件大小 - int>",
    "lastModifiedDate": "<操作系统报告的文件最后修改时间，毫秒为单位，自 Unix 纪元以来的毫秒数 - int>",
    "dataTxId": "<存储数据的交易 id>",
    "dataContentType": "<此文件实体所关联数据的 mime-type>",
    "pinnedDataOwner": "<被固定（pinned）数据原始拥有者的地址>" # 选填
}
```

<div style="text-align: center; font-size: .75em;">  固定（Pin）文件 </div>

自 v0.13 版本起，ArFS 支持 Pin（固定）。Pin 是指其数据可以是任意上传至 Arweave 的交易，该交易可能属于或不属于创建此 pin 的钱包。

创建新的 File Pin 时，唯一建立的交易是 Metadata 交易。`dataTxId` 字段会指向 Arweave 中的任一交易，而选填的 `pinnedDataOwner` 字段则会保存拥有原始数据交易的钱包地址。

<div style="text-align: center; font-size: .75em;">File Data Transaction 示例</div>

File Data Transaction 包含有限的文件信息，例如解密所需信息或在浏览器中查看所需的 Content-Type（mime-type）。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<file mime-type | application/octet-stream>"
 { File Data - 若为私密则为加密后数据 }
```

<div style="text-align: center; font-size: .75em;">File Metadata Transaction 示例</div>

File Metadata Transaction 含有识别文件于某 Drive 与文件夹内所需的 GQL 标签。

其数据部分包含文件的 JSON metadata，包括文件名、大小、最后修改日期、数据交易 id 与数据 Content-Type。

```json
ArFS: "0.13"
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<application/json | application/octet-stream>"
Drive-Id: "<drive uuid>"
Entity-Type: "file"
File-Id: "<uuid>"
Parent-Folder-Id: "<parent folder uuid>"
Unix-Time: "<自 Unix 纪元以来的秒数>"
 { File JSON Metadata - 若为私密则为加密后 JSON }
```

## Snapshot

ArFS 应用程序会透过查询与用户特定 `Drive-Id` 相关的所有 ArFS 交易来产生 Drive 的最新状态。这包括使用 GQL 对已索引的 ArFS 数据进行分页查询，以及对每笔 ArFS 交易的 ArFS JSON metadata 条目进行抓取。

对于小型的 Drive（少于 1000 个文件），对少量数据发出数千次请求通常能较快速且可靠地完成。对于较大的 Drive，当本地数据库缓存为空时，这会导致拉取每一笔 ArFS metadata 的同步时间变长，且可能触发 ArWeave Gateway 的速率限制延迟。

一旦 Drive 状态被完整且准确地重建，就可以将其汇总为单一快照并以上传为 Arweave 交易。ArFS 客户端可以使用 GQL 找到并抓取此快照，以快速重建整个 Drive 的状态或其大部分内容，之后再查询快照之后进行的个别交易。

此为一种可选方法，在构建 Drive 状态时提供便利与资源效率，但需支付上传快照数据的费用。采用此方法表示客户端只需遍历少数快照，而非该 Drive 上的每一笔交易。

### Snapshot 实体标签

Snapshot 实体需要下列标签。ArFS 客户端会以此查询 Drive 快照，将它们与任何未包含于快照内的其他交易一起组织，并构建 Drive 的最新状态。

```json
ArFS: "0.13"
Drive-Id: "<此快照所属的 drive uuid>"
Entity-Type: "snapshot"
Snapshot-Id: "<此 snapshot 实体的 uuid>"
Content-Type: "<application/json>"
Block-Start: "<在此快照中搜索交易时的最低区块高度，例如 0>"
Block-End: "<在此快照中搜索交易时的最高区块高度，例如 1007568>"
Data-Start: "<在此快照中有交易数据被发现的第一个区块，例如 854300>"
Data-End: "<在此快照中有交易被发现的最后一个区块，例如 1001671>"
Unix-Time: "<自 Unix 纪元以来的秒数>"
```

<div style="text-align: center; font-size: .75em;">Snapshot 交易 GQL 标签示例</div>

### Snapshot 实体数据

每个 ArFS Snapshot 实体也必须上传一个 JSON 数据对象。此数据包含该 Drive 内所有 ArFS Drive、Folder 及 File metadata 的变更，以及任何先前的 Snapshot。Snapshot 数据包含一个数组 `txSnapshots`。数组中的每一项都包含在该快照开始与结束期间内，对应 Drive 所进行的每笔交易的 GQL 与 ArFS metadata 详细资料。

每个 `txSnapshot` 包含一个 `gqlNode` 对象，该对象采用与 Arweave Gateway 返回相同的 GQL tags 介面。它包含 ArFS 客户端所需的所有重要信息：`block`、`owner`、`tags` 与 `bundledIn`。它也包含一个 `dataJson` 对象，用以存储该 ArFS 实体对应的 Data JSON。

对于私密 Drive，`dataJson` 对象包含对应文件或文件夹经加密后并经 JSON 字符串转义的文本。该加密文本使用该文件现有的 `Cipher` 与 `Cipher-IV`，确保客户端可以依现有的 ArFS 隐私协议快速解密此信息。

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

<div style="text-align: center; font-size: .75em;">Snapshot 交易 JSON 数据示例</div>

## 架构图（Schema Diagrams）

下列图示显示 Drive、Folder 与 File 实体 Schema 的完整示例。

### 公开 Drive

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">公开 Drive 架构图</div>

### 私密 Drive

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">私密 Drive 架构图</div>
