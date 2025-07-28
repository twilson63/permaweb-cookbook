# Path Manifests

## Overview

When uploading files to Arweave each file is assigned its own unique transaction ID. By default these ID's aren't grouped or organized in any particular manner.

One picture of your cat might be stored with a transaction ID of [bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw), while another with [FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0) as its transaction ID.

| Cat1 | Cat2 |
|------|------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300">|<img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

These transaction ID's are a bit unwieldy and make it difficult to find all of your relevant files. Without a path manifest, if you uploaded 100 pictures of your cat you would need to keep track of **100 different IDs and links**! 

Path Manifests are a way to link multiple transactions together under a single base transaction ID and give them human readable file names. In relation to the cat example, you could have one base transaction ID to remember and use it like a folder - accessing your cat pictures with more memorable filenames like [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg), etc. 

Creating grouped sets of readable file names is essential for creating practical applications on Arweave, and unlocks the ability to host websites or other file collections as explored in the examples below.

### What Can You Use Manifests For?

---

Any time you need to group files in a hierarchical way, manifests can be useful. For example:

- **Storing NFT collections:**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

This mirrors the common base path approach used by NFT collections when linking to NFT images and metadata on a storage API or IPFS.


- **Hosting websites:**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png


### Manifest Structure

---

Path Manifests are a special format of transaction created and posted to Arweave using the Tags:

 `{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

and having JSON formatted transaction data that matches the example below.

```json
{
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

- **fallback:**

Manifest version 0.2.0 introduced the `fallback` attribute. `fallback` is an object that accepts the sub attribute `id`, which defines an Arweave data item transaction id for the resolver to fall back to if it fails to correctly resolve a requested path.

Source and Further Reading in the official Arweave Path Manifest docs: [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)


