---
prev: "data-model.md"
next: "content-types.md"
---

# エンティティタイプ

## 概要

Arweave のトランザクションは、トランザクションヘッダー（タグ）とデータペイロードで構成されます。

したがって、ArFS エンティティはメタデータをトランザクションヘッダーのタグとして保持し、JSON にエンコードしたデータをトランザクションのデータ部に保存するという形でデータが分割されています。プライベートエンティティの場合、JSON データおよびファイルデータのペイロードは、以下に定義されるプロトコル手順に従って常に暗号化されます。

- ドライブ（Drive）エンティティは、標準的な Drive タグと二次メタデータを含むエンコード済み JSON を持つ単一のメタデータトランザクションを必要とします。

- フォルダ（Folder）エンティティは、標準的な Folder タグと二次メタデータを含むエンコード済み JSON を持つ単一のメタデータトランザクションを必要とします。

- ファイル（File）エンティティは、ファイルに関連する二次メタデータを含む Data JSON を持つメタデータトランザクションを必要とします。

- ファイルエンティティはさらに、限られたセットの File タグと実際のファイルデータを含む第二のデータトランザクションを必要とします。

- スナップショット（Snapshot）エンティティは、Drive のロールアップされたすべての ArFS メタデータを含む Data JSON と、そのスナップショットを識別する標準的な Snapshot GQL タグを含む単一のトランザクションを必要とします。

## Drive（ドライブ）

ドライブはフォルダとファイルの最上位の論理的グループです。すべてのフォルダとファイルはドライブに所属し、そのドライブの Drive-Id を参照する必要があります。

Drive を作成する際は、対応するフォルダも同時に作成する必要があります。これがドライブのルートフォルダとして機能します。Drive と Folder エンティティを分離することで、フォルダビュークエリ、リネーム、リンクなどの機能が可能になります。

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
    "name": "<ユーザー定義のドライブ名>",
    "rootFolderId": "<ドライブのルートフォルダの uuid>"
}
```

<div style="text-align: center; font-size: .75em;">ドライブエンティティ トランザクション例</div>

## Folder（フォルダ）

フォルダは他のフォルダやファイルの論理的グループです。親フォルダ ID を持たないフォルダエンティティのメタデータトランザクションは、対応するドライブのルートフォルダ（Drive Root Folder）と見なされます。他のすべてのフォルダエンティティは親フォルダ ID を持つ必要があります。フォルダには基礎となるデータがないため、Folder データトランザクションは必要ありません。

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
    "name": "<ユーザー定義のフォルダ名>"
}
```

<div style="text-align: center; font-size: .75em;">フォルダエンティティ トランザクション例</div>

## File（ファイル）

ファイルは写真、ドキュメント、ムービーなどのアップロードされたデータを含みます。

Arweave ファイルシステムでは、単一のファイルはメタデータとデータの 2 部分に分割されます。

ファイルエンティティのメタデータトランザクションには実際のファイルデータは含まれません。代わりに、ファイルデータはファイルデータトランザクションと呼ばれる別のトランザクションとしてアップロードする必要があります。ファイル JSON メタデータトランザクションには、実際のデータを取得するための File Data Transaction ID への参照（dataTxId）が含まれます。この分離により、ファイル自体を再アップロードせずにファイルメタデータを更新できるようになります。また、プライベートファイルでは JSON メタデータトランザクション自体も暗号化できるため、認可されていない者がファイルやそのメタデータを閲覧できないようにできます。

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
    "name": "<拡張子付きのユーザー定義ファイル名例: happyBirthday.jpg>",
    "size": "<計算されたファイルサイズ - int>",
    "lastModifiedDate": "<OS が報告する最終更新日時のタイムスタンプ（ミリ秒単位の unix epoch） - int>",
    "dataTxId": "<保存されたデータのトランザクション id>",
    "dataContentType": "<このファイルエンティティに関連付けられたデータの MIME タイプ>",
    "pinnedDataOwner": "<ファイルが指しているデータの元の所有者アドレス>" # オプション
}
```

<div style="text-align: center; font-size: .75em;">ピンされたファイル</div>

バージョン v0.13 以降、ArFS は Pins（ピン）をサポートします。ピンは、そのデータが Arweave にアップロードされた任意のトランザクション（ピンを作成したウォレットが所有しているとは限らない）を指すファイルです。

新しいファイルピンが作成されると、作成されるトランザクションはメタデータトランザクションのみです。`dataTxId` フィールドは Arweave 上の任意のトランザクションを指し、オプションの `pinnedDataOwner` フィールドにはそのデータトランザクションの元のコピーを所有するウォレットのアドレスが格納されます。

<div style="text-align: center; font-size: .75em;">ファイルデータトランザクション例</div>

ファイルデータトランザクションには、ファイルの暗号解除に必要な情報や、ブラウザで表示するために必要な Content-Type（MIME タイプ）など、ファイルに関する限定的な情報が含まれます。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
Content-Type: "<file mime-type | application/octet-stream>"
 { File Data - Encrypted if private }
```

<div style="text-align: center; font-size: .75em;">ファイルメタデータトランザクション例</div>

ファイルメタデータトランザクションには、ドライブおよびフォルダ内でファイルを識別するために必要な GQL タグが含まれます。

そのデータ部にはファイルの JSON メタデータが含まれます。これにはファイル名、サイズ、最終更新日時、データトランザクション ID、およびデータの Content-Type が含まれます。

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

## Snapshot（スナップショット）

ArFS アプリケーションは、ユーザーの特定の `Drive-Id` に関連するすべての ArFS トランザクションをクエリすることでドライブの最新状態を生成します。これには、GQL を介したインデックス化された ArFS データのページングクエリと、各 ArFS トランザクションの ArFS JSON メタデータエントリの両方が含まれます。

小規模なドライブ（1000 ファイル未満）の場合、非常に小さなデータ量に対して数千件のリクエストを比較的迅速かつ確実に実行できます。しかし、より大きなドライブでは、ローカルデータベースキャッシュが空のときにすべての ArFS メタデータを取得するために長い同期時間がかかることがあります。これにより、ArWeave ゲートウェイに関連するレート制限が発生する可能性もあります。

ドライブ状態が完全かつ正確に生成されると、それを単一のスナップショットにロールアップして Arweave トランザクションとしてアップロードできます。ArFS クライアントは GQL を使用してこのスナップショットを検索および取得し、ドライブ全体またはその大部分を高速に再構築できます。その後、スナップショット以降に実行された個々のトランザクションをクエリできます。

このオプションの方法は、スナップショットデータのアップロードに対する費用を支払うことと引き換えに、ドライブ状態の構築における利便性とリソース効率を提供します。この方法を使用すると、クライアントはドライブ上で実行されたすべてのトランザクションを反復処理する代わりに、いくつかのスナップショットを反復するだけで済みます。

### スナップショットエンティティのタグ

スナップショットエンティティは以下のタグを必要とします。これらは ArFS クライアントがドライブスナップショットを検索し、スナップショットに含まれていない他のトランザクションと一緒に整理し、ドライブの最新状態を構築するためにクエリされます。

```json
ArFS: "0.13"
Drive-Id: "<このスナップショットに関連付けられた drive uuid>"
Entity-Type: "snapshot"
Snapshot-Id: "<このスナップショットエンティティの uuid>"
Content-Type: "<application/json>"
Block-Start: "<このスナップショットで検索されたトランザクションの最小ブロック高さ、例: 0>"
Block-End: "<このスナップショットで検索されたトランザクションの最大ブロック高さ、例: 1007568>"
Data-Start: "<このスナップショットでトランザクションデータが見つかった最初のブロック、例: 854300"
Data-End: "<このスナップショットでトランザクションが見つかった最後のブロック、例: 1001671"
Unix-Time: "<unix epoch からの秒数>"
```

<div style="text-align: center; font-size: .75em;">スナップショットトランザクションの GQL タグ例</div>

### スナップショットエンティティのデータ

各 ArFS スナップショットエンティティには JSON データオブジェクトもアップロードする必要があります。このデータには、関連ドライブ内のすべての ArFS Drive、Folder、File のメタデータ変更と、以前のスナップショットが含まれます。スナップショットデータは配列 `txSnapshots` を含みます。各要素には、スナップショットの開始と終了期間内に関連ドライブのために行われた各トランザクションの GQL と ArFS メタデータの詳細が含まれます。

`txSnapshot` は、Arweave ゲートウェイが返すのと同じ GQL タグインターフェースを使用する `gqlNode` オブジェクトを含みます。これには ArFS クライアントに必要な重要な `block`、`owner`、`tags`、および `bundledIn` 情報がすべて含まれます。また、該当する ArFS エンティティの相関する Data JSON を保存する `dataJson` オブジェクトも含まれます。

プライベートドライブの場合、`dataJson` オブジェクトには関連するファイルまたはフォルダの JSON 文字列エスケープ済み暗号化テキストが含まれます。この暗号化テキストはファイルの既存の `Cipher` と `Cipher-IV` を使用します。これにより、クライアントは既存の ArFS プライバシープロトコルを使用して迅速にこの情報を復号できます。

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

<div style="text-align: center; font-size: .75em;">スナップショットトランザクション JSON データ例</div>

## スキーマ図

以下の図は Drive、Folder、File エンティティスキーマの完全な例を示します。

### パブリックドライブ

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">パブリックドライブスキーマ</div>

### プライベートドライブ

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">プライベートドライブスキーマ</div>
