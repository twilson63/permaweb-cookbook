---
locale: jp
---
# パスマニフェスト

## 概要

Arweaveにファイルをアップロードする際、各ファイルには固有のトランザクションIDが割り当てられます。デフォルトでは、これらのIDは特定の方法でグループ化されたり整理されたりしません。

ある猫の写真は、[bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw)というトランザクションIDで保存されるかもしれません。別の写真は、[FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0)というトランザクションIDを持つかもしれません。

| 猫1 | 猫2 |
|------|------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300">|<img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

これらのトランザクションIDはやや扱いづらく、関連するファイルを見つけるのが困難です。パスマニフェストがなければ、自分の猫の写真を100枚アップロードした場合、**100個の異なるIDとリンクを追跡する必要があります**！

パスマニフェストは、複数のトランザクションを1つの基本的なトランザクションIDの下にリンクする方法であり、それらに人間が読みやすいファイル名を付けることができます。猫の例に関連して、1つの基本トランザクションIDを持ち、それをフォルダのように使用し、より覚えやすいファイル名で猫の写真にアクセスすることができます。例えば、[{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg)や[{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg)などです。

読みやすいファイル名のグループ化は、Arweave上で実用的なアプリケーションを作成するために不可欠であり、以下の例で探求されているように、ウェブサイトや他のファイルコレクションをホストする能力を開放します。

### マニフェストの利用用途

---

階層的にファイルをグループ化する必要がある場合、マニフェストは役立ちます。例えば：

- **NFTコレクションの保存:**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

これは、NFTコレクションがストレージAPIやIPFS上のNFT画像やメタデータにリンクする際に使用される一般的な基本パスアプローチと一致します。

- **ウェブサイトのホスティング:**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png

### マニフェストの構造

---

パスマニフェストは、以下のタグを使用して生成され、Arweaveに投稿される特別なトランザクション形式です：

 `{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

その上に、下記の例に一致するようにJSON形式でトランザクションデータが作成されます。

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

公式のArweaveパスマニフェストドキュメントでのソースと追加の参考：[Arweaveドキュメント](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)