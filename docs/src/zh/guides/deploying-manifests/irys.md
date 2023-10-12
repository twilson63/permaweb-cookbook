---
locale: zh
---

### Irys CLI

---

`irys upload-dir <folder>` 将本地目录上传到 Arweave，并自动生成文件清单。

如果您想手动上传自己的文件清单，请在任何交易中使用 `--content-type "application/x.arweave-manifest+json"` 标志来标识它为一个文件清单交易。

### Irys JS 客户端

---

使用以下代码片段将本地目录上传到 Arweave，并自动生成文件清单：

```js
await irys.uploadFolder("./path/to/folder", {
	indexFile: "./optionalIndex.html", // 可选的索引文件（用户在访问文件清单时加载的文件）
	batchSize: 50, // 一次上传的项目数量
	keepDeleted: false, // 是否保留之前上传中已删除的项目
}); // 返回文件清单的 ID
```

如果您想手动上传自己的文件清单， `await irys.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` 将把上传的 `data` 标识为一个文件清单交易。

---

参考资料和阅读更多内容：[Irys 文档](https://docs.irys.xyz)
