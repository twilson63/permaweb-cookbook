### Irys

When uploading a folder or group of files from the Irys [CLI](http://docs.irys.xyz/developer-docs/cli), [server](http://docs.irys.xyz/developer-docs/irys-sdk) or from the [browser](http://docs.irys.xyz/developer-docs/irys-sdk/irys-in-the-browser), a manifest is automatically generated for the files.

### Irys CLI

The return type for each is a [signed receipt](http://docs.irys.xyz/learn/receipts) containing a millisecond-accurate timestamp.

---

`irys upload-dir <folder>` uploads a local directory.

If you want to upload your own manifest file manually, using the flag `--content-type "application/x.arweave-manifest+json"` on any transaction will designate it as a manifest transaction.

### Irys SDK (NodeJS Client)

---

Using the following snippet uploads a local directory to Arweave and automatically generates a manifest for the files:

```js
// Upload an entire folder
const folderToUpload = "./my-folder/"; // Path to folder
try {
	const receipt = await irys.uploadFolder(folderToUpload, {
		indexFile: "index.html", // Optional index file (file the user will load when accessing the manifest)
		batchSize: 50, // Number of items to upload at once
		keepDeleted: false, // Whether to keep now deleted items from previous uploads
	}); //returns the manifest ID

	console.log(`Files uploaded. Manifest ID ${receipt.id}`);
} catch (e) {
	console.log("Error uploading file ", e);
}
```

If you want to upload your own manifest file manually, `await irys.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` will designate the `data` uploaded as a manifest transaction.

### WebIrys (Browser Client)

---

Using the following snippet uploads a local directory to Arweave and automatically generates a manifest for the files:

```js
const receipt = await webIrys.uploadFolder(files, {
	tags,
}); //returns the manifest ID
```

If you want to upload your own manifest file manually, `await irys.upload(data, { tags: [{ name: "Content-type", value: "application/x.arweave-manifest+json" }] } )` will designate the `data` uploaded as a manifest transaction.

---

Source and Further Reading: [Irys Docs](https://docs.irys.xyz/)
