---
prev: "arfs.md"
next: "entity-types.md"
---

# データモデル

Arweave の永続的かつ不変な特性により、ファイルやフォルダの名前変更や移動といった従来のファイル構造操作は、オンチェーンのデータを単純に更新するだけでは実現できません。ArFS はこれを回避するため、Arweave の [Transaction Headers.](https://docs.arweave.org/developers/server/http-api#transaction-format) に含まれるメタデータタグに基づく追記専用（append-only）のトランザクションデータモデルを定義します。

このモデルは下位から上位への参照（ボトムアップ）方式を採用しており、ファイルシステムの更新における競合状態を回避します。各ファイルは親フォルダを参照するメタデータを持ち、各フォルダは親ドライブを参照するメタデータを持ちます。トップダウンのデータモデルでは、親モデル（例：フォルダ）が子への参照を保持する必要があります。

これらの定義されたエンティティにより、クライアントはドライブの状態を構築してファイルシステムのように扱えるようになります。

- ドライブ（Drive）エンティティはフォルダとファイルを含む
- フォルダ（Folder）エンティティは他のフォルダまたはファイルを含む
- ファイル（File）エンティティはファイルデータとメタデータの両方を含む
- スナップショット（Snapshot）エンティティはドライブ内のすべてのファイルおよびフォルダのメタデータの状態をロールアップしたものを含む

## エンティティの関係

以下の図は、ドライブ、フォルダ、ファイル各エンティティとそれに関連するデータ間の高レベルな関係を示しています。各エンティティタイプの詳細は [こちら](./entity-types.md) を参照してください。

<img :src="$withBase('/entity-relationship-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

<div style="text-align: center; font-size: .75em;">エンティティ関係図</div>

ご覧のとおり、各ファイルおよびフォルダは親フォルダと親ドライブの両方を指すメタデータを含んでいます。ドライブエンティティは自身に関するメタデータを含みますが、子の内容（子エントリ）自体は含みません。したがって、クライアントは最下層からドライブの状態を構築していく必要があります。

## メタデータの形式

任意の Arweave トランザクションタグに格納されるメタデータは、以下のように定義されます：

```json
{ "name": "Example-Tag", "value": "example-data" }
```

トランザクションのデータペイロードに格納されるメタデータは、以下のような JSON 形式に従います：

```json
{
  "exampleField": "exampleData"
}
```

`?` サフィックスが付いたフィールドはオプションです。

```json
{
  "name": "My Project",
  "description": "This is a sample project.",
  "version?": "1.0.0",
  "author?": "John Doe"
}
```

列挙されたフィールド値（特定の値に従う必要があるもの）は、"value 1 | value 2" の形式で定義されます。

エンティティ ID に使用されるすべての UUID は [Universally Unique Identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) 標準に基づいています。

ArFS タグを特定の順序で列挙する要件はありません。
