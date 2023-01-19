### Bundlr CLI

---

`bundlr upload-dir <folder>` uploads a local directory to Arweave and automatically generates a manifest for the files.

If you want to upload your own manifest file manually, using the flag `--content-type "application/x.arweave-manifest+json"` on any transaction will designate it as a manifest transaction.

### Bundlr JS Client

---

Using the following snippet uploads a local directory to Arweave and automatically generates a manifest for the files:

```js
await bundlr.uploadFolder("./path/to/folder", {
     indexFile: "./optionalIndex.html", // optional index file (file the user will load when accessing the manifest)
     batchSize: 50, //number of items to upload at once
     keepDeleted: false   // whether to keep now deleted items from previous uploads
    }) //returns the manifest ID
```

If you want to upload your own manifest file manually, `await bundlr.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` will designate the `data` uploaded as a manifest transaction.

---

Source and Further Reading: [Bundlr Docs](https://docs.bundlr.network/docs/overview)