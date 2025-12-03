---
prev: "arfs.md"
next: "entity-types.md"
---

# 数据模型

由于 Arweave 的永久性与不可变更性，传统的文件结构操作（例如重命名或移动文件或文件夹）无法仅通过更新链上数据来完成。ArFS 通过基于 Arweave [交易头](https://docs.arweave.org/developers/server/http-api#transaction-format) 中元数据标签所定义的仅追加（append-only）交易数据模型来解决此问题。

此模型采用自下而上的引用方法，可避免文件系统更新时的竞争条件。每个文件包含指向父文件夹的元数据，而每个文件夹包含指向其父 Drive 的元数据。若采用自上而下的数据模型，则父模型（例如文件夹）必须存储其子项的引用。

这些已定义的实体允许客户端构建 Drive 的状态，使其在外观与使用感受上类似于文件系统

- Drive 实体包含文件夹与文件

- Folder 实体包含其他文件夹或文件

- File 实体同时包含文件数据与元数据

- Snapshot 实体包含整个 Drive 内所有文件与文件夹元数据的状态汇总

## 实体关系

下图显示 Drive、Folder、File 实体以及其相关数据之间的高阶关系。各实体类型的更详细信息可见[此处](./entity-types.md)。

<img :src="$withBase('/entity-relationship-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

<div style="text-align: center; font-size: .75em;">实体关系图</div>

如图所示，每个文件与文件夹都包含指向父文件夹与父 Drive 的元数据。Drive 实体包含关于自身的元数据，但不包含子项内容。因此，客户端必须从最低层开始构建 Drive 状态，逐层向上组合。

## 元数据格式

存储在任一 Arweave 交易标签中的元数据将以以下方式定义：

```json
{ "name": "Example-Tag", "value": "example-data" }
```

存储在交易数据有效载荷（Transaction Data Payload）中的元数据将遵循以下 JSON 格式：

```json
{
  "exampleField": "exampleData"
}
```

带有 `?` 后缀的字段为可选。

```json
{
  "name": "My Project",
  "description": "This is a sample project.",
  "version?": "1.0.0",
  "author?": "John Doe"
}
```

枚举字段值（必须遵循特定值者）以 "value 1 | value 2" 格式定义。

所有用于实体 ID 的 UUID 均基于[通用唯一识别码](https://en.wikipedia.org/wiki/Universally_unique_identifier) 标准。

不需要以任何特定顺序列出 ArFS 标签。
