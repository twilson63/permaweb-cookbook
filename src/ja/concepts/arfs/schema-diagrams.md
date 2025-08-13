---
locale: ja
prev: "privacy.md"
---

## スキーマ図

以下の図は、ドライブ、フォルダー、ファイルエンティティスキーマの完全な例を示しています。

### パブリックドライブ
<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">パブリックドライブスキーマ</div>

### プライベートドライブ
<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">プライベートドライブスキーマ</div>

Arweave GQLタグのバイト制限は `2048` に制限されています。データJSONカスタムメタデータの制限は決まっていませんが、データが多いほどアップロードコストが高くなります。