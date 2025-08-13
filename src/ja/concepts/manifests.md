---
locale: ja
---
# パスマニフェスト

## 概要

ファイルをArweaveにアップロードすると、各ファイルには独自のトランザクションIDが割り当てられます。デフォルトでは、これらのIDは特定の方法でグループ化されたり整理されたりしません。

例えば、あなたの猫の写真の一つはトランザクションID [bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw) で保存されている一方で、別の写真は [FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0) というトランザクションIDで保存されています。

| 猫1 | 猫2 |
|------|------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300">|<img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

これらのトランザクションIDは少し扱いにくく、関連するファイルを見つけるのが難しくなります。パスマニフェストがなければ、100枚の猫の写真をアップロードした場合、**100の異なるIDとリンク**を追跡する必要があります！ 

パスマニフェストは、複数のトランザクションを単一の基本トランザクションIDの下にリンクし、人間が読みやすいファイル名を与える方法です。猫の例に関連付けると、1つの基本トランザクションIDを覚えておき、それをフォルダのように使い、`[{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg)`や`[{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg)`のようなもっと覚えやすいファイル名で猫の写真にアクセスすることができます。

読みやすいファイル名のグループ化を作成することは、Arweave上で実用的なアプリケーションを作成するために不可欠であり、以下の例で探求するように、ウェブサイトや他のファイルコレクションをホストする能力を開放します。

### マニフェストは何に使えますか？

---

ファイルを階層的にグループ化する必要がある場合、マニフェストは便利です。例えば：

- **NFTコレクションの保存：**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

これは、ストレージAPIやIPFS上でNFT画像とメタデータにリンクする際に使用される一般的な基本パスアプローチと同様です。

- **ウェブサイトのホスティング：**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png

### マニフェストの構造

---

パスマニフェストは、以下のタグを使用して作成され、Arweaveに投稿される特別なトランザクション形式です：

`{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

そして、以下の例に一致するJSON形式のトランザクションデータを持っています。


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

- **フォールバック：**

マニフェストのバージョン0.2.0では、`fallback`属性が導入されました。`fallback`は、リゾルバがリクエストされたパスを正しく解決できない場合にフォールバックするためのArweaveデータアイテムトランザクションIDを定義するサブ属性`id`を受け付けるオブジェクトです。

公式のArweaveパスマニフェストドキュメントでの出典とさらなる読み物： [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)