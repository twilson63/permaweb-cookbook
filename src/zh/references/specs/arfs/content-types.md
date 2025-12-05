---
prev: "entity-types.md"
next: "privacy.md"
---

# 内容类型

ArFS 中的所有交易类型都会使用特定的元数据标签来标示数据的 Content-Type（亦称 MIME 类型）。ArFS 客户端必须判定数据的 MIME 类型，才能让 Arweave 网关与浏览器适当地呈现该内容。

所有公开的 drive、folder 与 file（仅元数据）实体交易皆采用 JSON 标准，因此必须具有以下的内容类型标签：

```json
Content-Type: '<application/json>'
```

但文件的数据交易则必须判定其 MIME 类型。此信息会存储在该文件对应的元数据交易 JSON 的 `dataContentType` 字段，以及数据交易本身的内容类型标签中。

```json
Content-Type: "<file's mime-type>"
```

所有私有的 drive、folder 与 file 实体交易由于为加密内容，必须具有下列内容类型：

```json
Content-Type: '<application/octet-stream>'
```

[ArDrive-Core](https://docs.ardrive.io/docs/core-sdk.html) 提供用来判定文件内容类型的方法。

## 其他标签

启用 ArFS 的客户端应在其交易上包含下列标签以识别其应用程序

```json
App-Name: "<defined application name eg. ArDrive"
App-Version: "<defined version of the app eg. 0.5.0"
Client?: "<if the application has multiple clients, they should be specified here eg. Web"
```
