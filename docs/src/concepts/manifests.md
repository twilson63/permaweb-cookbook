# Path Manifests

## Overview

When uploading files to Arweave, transactions aren’t grouped or organized by default. 

One picture of your cat might be stored at [bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw), while another is stored at [FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0). 

| Cat1 | Cat2 |
|------|------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300">|<img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

This isn’t very readable and makes it difficult to find all of your relevant files. Without a manifest, if you uploaded 100 pictures of your cat you would need to keep track of **100 different links**! 

Path Manifests are a way to link other transactions together under one ID, and give them more readable names. In relation to the cat example, you could have one link to remember and use it like a folder - accessing your files with [6dRh/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [6dRh/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg), etc. 

Creating grouped sets of readable files is essential for creating practical applications on Arweave, and opens up the ability to host websites or other grouped content as explored in the examples below.

### What Can You Use Manifests For?

---

Any time you need to group files in a hierarchical way, manifests can be useful. For example:

- **Storing NFT collections:**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

This provides the same standardised format used by most collections using an API or IPFS.


- **Hosting websites:**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png


### Manifest Structure

---

Manifests are transactions created and posted to Arweave using the Tags:

 `{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

 Below is an example JSON structure from the official Arweave docs.

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
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

Source and Further Reading: [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)


