---
前のページ: "privacy.md"
---

## スキーマ図

以下の図は、Drive、Folder、File エンティティのスキーマの完全な例を示します。

### 公開 Drive

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">公開 Drive スキーマ</div>

### 非公開 Drive

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">非公開 Drive スキーマ</div>

Arweave GQL タグのバイト制限は `2048` に制限されています。Data JSON のカスタムメタデータには決められた上限はありませんが、データが多いほどアップロードコストは増加します。
