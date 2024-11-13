---
locale: ja
prev: "data-model.md"
next: "content-types.md"
---

# エンティティタイプ

## 概要

Arweaveのトランザクションは、トランザクションヘッダーとデータペイロードで構成されています。

したがって、ArFSエンティティは、トランザクションヘッダーのタグとして保存されるデータと、トランザクションのデータとしてエンコードされて保存されるデータに分かれています。プライベートエンティティの場合、JSONデータとファイルデータペイロードは常に以下で定義されたプロトコルプロセスに従って暗号化されます。

- ドライブエンティティは、標準のドライブタグとセカンダリメタデータをエンコードした単一のメタデータトランザクションを必要とします。
- フォルダーエンティティは、標準のフォルダータグとセカンダリメタデータをエンコードした単一のメタデータトランザクションを必要とします。
- ファイルエンティティは、標準のファイルタグとファイルに関連するセカンダリメタデータをエンコードしたメタデータトランザクションを必要とします。
- ファイルエンティティには、限られたセットのファイルタグと実際のファイルデータ自体を含む別のデータトランザクションも必要です。
- スナップショットエンティティは、ドライブのすべての集約されたArFSメタデータとスナップショットを識別する標準スナップショットGQLタグを含むデータJSONを含む単一のトランザクションを必要とします。

## ドライブ

ドライブは、フォルダーとファイルの論理的な最上位グループです。すべてのフォルダーとファイルはドライブの一部である必要があり、そのドライブのドライブIDを参照します。

ドライブを作成する際には、対応するフォルダーも作成する必要があります。これがドライブのルートフォルダーとして機能します。ドライブとフォルダーエンティティのこの分離により、フォルダービュークエリ、リネーミング、リンク作成などの機能が可能になります。


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
    "name": "<user defined drive name>",
    "rootFolderId": "<uuid of the drive root folder>"
}
```

<div style="text-align: center; font-size: .75em;">ドライブエンティティトランザクションの例</div>

## フォルダー

フォルダーは、他のフォルダーとファイルの論理的なグループです。親フォルダーIDがないフォルダーエンティティのメタデータトランザクションは、それに対応するドライブのルートフォルダーと見なされます。他のすべてのフォルダーエンティティは、親フォルダーIDを持っている必要があります。フォルダーは基礎データを持たないため、フォルダーデータトランザクションは必要ありません。

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
    "name": "<user defined folder name>"
}
```

<div style="text-align: center; font-size: .75em;">フォルダーエンティティトランザクションの例</div>

## ファイル

ファイルには、写真、ドキュメント、映画などのアップロードデータが含まれます。

Arweaveファイルシステムでは、単一のファイルは2つの部分に分割されます - メタデータとデータです。

Arweaveファイルシステムでは、単一のファイルは2つの部分に分割されます - メタデータとデータです。

ファイルエンティティメタデータトランザクションには、実際のファイルデータは含まれていません。代わりに、ファイルデータはファイルデータトランザクションと呼ばれる別のトランザクションとしてアップロードされる必要があります。ファイルのJSONメタデータトランザクションには、実際のデータを取得するためのファイルデータトランザクションIDへの参照が含まれています。この分離により、ファイルのメタデータを更新する際にファイル自体を再アップロードする必要がなくなります。また、プライベートファイルはそのJSONメタデータトランザクションを暗号化できるため、権限のない人がファイルやメタデータを見ることができないことが保証されます。


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
    "name": "<user defined file name with extension eg. happyBirthday.jpg>",
    "size": "<computed file size - int>",
    "lastModifiedDate": "<timestamp for OS reported time of file's last modified date represented as milliseconds since unix epoch - int>",
    "dataTxId": "<transaction id of stored data>",
    "dataContentType": "<the mime type of the data associated with this file entity>",
    "pinnedDataOwner": "<the address of the original owner of the data where the file is pointing to>" # Optional
}
```

<div style="text-align: center; font-size: .75em;">ピンファイル</div>

バージョンv0.13以降、ArFSはピンをサポートしています。ピンは、Arweaveにアップロードされた任意のトランザクションのデータであり、そのトランザクションはピンを作成したウォレットが所有しているかもしれませんし、そうでないかもしれません。

新しいファイルピンが作成されると、作成されるトランザクションはメタデータトランザクションだけです。`dataTxId`フィールドは、Arweaveの任意のトランザクションを指し、オプションの`pinnedDataOwner`フィールドには、元のデータトランザクションの所有者であるウォレットのアドレスが保持されます。


<div style="text-align: center; font-size: .75em;">ファイルデータトランザクションの例</div>

ファイルデータトランザクションには、ファイルに関する限られた情報が含まれます。例えば、復号化に必要な情報や、ブラウザで表示するために必要なContent-Type（mime-type）などです。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<file mime-type | application/octet-stream>"
 { File Data - Encrypted if private }
```

<div style="text-align: center; font-size: .75em;">ファイルメタデータトランザクションの例</div>

ファイルメタデータトランザクションには、ドライブとフォルダー内でファイルを特定するために必要なGQLタグが含まれています。

そのデータには、ファイルのJSONメタデータが含まれます。これには、ファイル名、サイズ、最終更新日、データトランザクションID、データコンテンツタイプが含まれます。

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
 { File JSON Metadata - Encrypted if private }
```

## スナップショット

ArFSアプリケーションは、ユーザーの特定の `Drive-Id` に関連するすべてのArFSトランザクションを照会することで、ドライブの最新の状態を生成します。これには、GQLを介したインデックス化されたArFSデータのページクエリと、各ArFSトランザクションのArFS JSONメタデータエントリの両方が含まれます。

小さなドライブ（ファイル数が1000未満）の場合、非常に小さなデータの数千リクエストを比較的迅速かつ信頼性高く達成できます。しかし、より大きなドライブの場合、ローカルデータベースキャッシュが空のときにすべてのArFSメタデータを取得するために長い同期時間がかかります。これにより、ArWeave Gatewayの遅延に関連するレート制限が発生する可能性もあります。

ドライブの状態が完全かつ正確に生成されたら、それを単一のスナップショットにまとめ、Arweaveトランザクションとしてアップロードできます。ArFSクライアントはGQLを使用してこのスナップショットを見つけて取得し、ドライブの総状態またはその大部分を迅速に再構成できます。その後、スナップショットの後に行われた個々のトランザクションを照会できます。

このオプションの方法は、スナップショットデータをアップロードするコストがかかるものの、ドライブ状態を構築する際の便利さとリソース効率を提供します。この方法を使用すると、クライアントはドライブで実行されたすべてのトランザクションの代わりに、数回のスナップショットを反復するだけで済みます。

### スナップショットエンティティタグ

スナップショットエンティティには、次のタグが必要です。これらはArFSクライアントによって照会され、ドライブスナップショットを見つけ、他のトランザクションと組織し、ドライブの最新の状態を構築するために使用されます。

```json
ArFS: "0.13"
Drive-Id: "<drive uuid that this snapshot is associated with>"
Entity-Type: "snapshot"
Snapshot-Id: "<uuid of this snapshot entity>"
Content-Type: "<application/json>"
Block-Start: "<the minimum block height from which transactions were searched for in this snapshot, eg. 0>"
Block-End: "<the maximum block height from which transactions were searched for in this snapshot, eg 1007568>"
Data-Start: "<the first block in which transaction data was found in this snapshot, eg 854300"
Data-End: "<the last block in which transaction was found in this snapshot, eg 1001671"
Unix-Time: "<seconds since unix epoch>"
```

<div style="text-align: center; font-size: .75em;">Snapshot Transaction GQL tags example</div>

### スナップショットエンティティデータ

各ArFSスナップショットエンティティに対して、JSONデータオブジェクトもアップロードする必要があります。このデータには、関連するドライブ内のすべてのArFSドライブ、フォルダー、ファイルメタデータの変更と、以前のスナップショットが含まれます。スナップショットデータには、`txSnapshots`という配列が含まれています。各アイテムには、スナップショットの開始および終了期間内の関連ドライブに対して行われた各トランザクションのGQLおよびArFSメタデータの詳細が含まれます。

`tsSnapshot`には、Arweave Gatewayから返されるのと同じGQLタグインターフェースを使用する`gqlNode`オブジェクトが含まれています。これには、ArFSクライアントに必要な重要な`block`、`owner`、`tags`、および`bundledIn`情報がすべて含まれています。また、そのArFSエンティティに関連するデータJSONを保存する`dataJson`オブジェクトも含まれています。

プライベートドライブの場合、`dataJson`オブジェクトには、関連するファイルまたはフォルダーのJSON文字列エスケープされた暗号化テキストが含まれています。この暗号化テキストは、ファイルの既存の`Cipher`と`Cipher-IV`を使用します。これにより、クライアントは既存のArFSプライバシープロトコルを使用して、この情報を迅速に復号化できることが保証されます。

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

<div style="text-align: center; font-size: .75em;">Snapshot Transaction JSON data example</div>



## スキーマダイアグラム

以下のダイアグラムは、ドライブ、フォルダー、およびファイルエンティティのスキーマの完全な例を示しています。

### パブリックドライブ

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">パブリックドライブスキーマ</div>

### プライベートドライブ

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">プライベートドライブスキーマ</div>