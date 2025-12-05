---
prev: "privacy.md"
---

## Schema 图示

下列图示显示了 Drive、Folder 与 File 实体 Schema 的完整示例。

### 公开 Drive

<img :src='$withBase("/public-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">公开 Drive Schema</div>

### 私人 Drive

<img :src='$withBase("/private-drive-schema.png")' style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">
<div style="text-align: center; font-size: .75em;">私人 Drive Schema</div>

Arweave GQL 标签字节限制为 `2048`。Data JSON 的自定义元数据没有既定上限，但数据越多会导致上传成本增加。
