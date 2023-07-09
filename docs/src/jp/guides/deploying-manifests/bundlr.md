---
locale: jp
---
### Bundlr CLI

---

`bundlr upload-dir <folder>`は、ローカルディレクトリをArweaveにアップロードし、ファイルのためのマニフェストを自動生成します。

独自のマニフェストファイルを手動でアップロードしたい場合、トランザクションに `--content-type "application/x.arweave-manifest+json"` フラグを使用することで、それをマニフェストトランザクションとして指定できます。

### Bundlr JSクライアント

---

以下のスニペットを使用すると、ローカルディレクトリをArweaveにアップロードし、ファイルのためのマニフェストを自動生成します：

```js
await bundlr.uploadFolder("./path/to/folder", {
     indexFile: "./optionalIndex.html", // オプションのインデックスファイル（ユーザーがマニフェストにアクセスする際に読み込むファイル）
     batchSize: 50, // 一度にアップロードするアイテムの数
     keepDeleted: false   // 前回のアップロード時に削除されたアイテムを保持するかどうか
    }) // マニフェストのIDを返します
```

独自のマニフェストファイルを手動でアップロードしたい場合、`await bundlr.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` で、`data` をアップロードしてマニフェストトランザクションとして指定することができます。

---

出典および詳細については、[Bundlrドキュメント](https://docs.bundlr.network/docs/overview)を参照してください。