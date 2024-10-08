# Bundling Services

---

With bundling services users can post their data transactions to a bundling service to have it "bundled" together with other users transactions and posted as a single Arweave transaction in an upcoming Arweave block.

---

### What is a bundle?

---

A description of transaction bundles and their benefits can be found [here](/concepts/bundles.md).

### What is a Bundler node?

---

A bundler is a node which is responsible for accepting transactions or data items from users, bundling them, and posting them to the Arweave network (with a guarantee they will be uploaded with a specific transaction ID).

Services:

- [Turbo](https://github.com/ardriveapp/turbo-upload-service/)

Which make sure the data is persisted until it is uploaded to Arweave.

### Supporting multiple currencies

---

A key feature of bundling services is that because they pay for the base Arweave transaction to be posted (using AR tokens) they can choose to enable payments of storage fees on a variety of different tokens. This is the main entry point for other chains to enable Arweave's permanent storage for their users.
