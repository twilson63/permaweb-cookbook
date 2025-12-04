# Path Manifests（パスマニフェスト）

ファイルを Arweave にアップロードすると、各ファイルには固有のトランザクション ID が割り当てられます。デフォルトでは、これらの ID は特にグループ化や整理がされていません。

Path Manifests（パスマニフェスト）は、ファイルを単一の識別子の下にグループ化する特殊な種類の Arweave トランザクションです。

## ユースケース

パスマニフェストの最も一般的なユースケースは、NFT コレクションと静的サイトのホスティングです。

通常、100 枚の画像を Arweave にアップロードすると、100 個の異なるトランザクション ID が生成されます。

パスマニフェストは、複数のトランザクションを単一のベースのトランザクション ID の下にリンクし、人間が読みやすいファイル名を付与する方法です。猫の例に関連付けると、覚えやすいフォルダのように使えるベースのトランザクション ID を 1 つ持ち、より記憶しやすいファイル名で猫の画像にアクセスできます。例: [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg) など。

読みやすいファイル名でグループ化することは、Arweave 上で実用的なアプリケーションを作成するために重要であり、以下の例で示すようにウェブサイトやその他のファイルコレクションをホストする機能を解放します。

### 例

---

階層的にファイルをグループ化する必要がある場合、マニフェストは有用です。例えば:

- **NFT コレクションの保存:**
  - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
  - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

これは、ストレージ API や IPFS 上で NFT 画像やメタデータにリンクするときに NFT コレクションが一般的に使用するベースパスのアプローチを反映しています。

- **ウェブサイトのホスティング:**
  - https://arweave.net/X8Qm…AOhA/index.html
  - https://arweave.net/X8Qm…AOhA/styles.css
  - https://arweave.net/X8Qm…AOhA/public/favicon.png

## マニフェスト構造

パスマニフェストは、以下のタグを使用して作成および Arweave に投稿されるトランザクションの特殊なフォーマットです:

`{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

および以下の例に一致する JSON 形式のトランザクションデータを持ちます。

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

パスマニフェストはまた `fallback` 属性を提供します。これはサブ属性 `id` を受け取るオブジェクトで、要求されたパスを正しく解決できなかった場合にリゾルバがフォールバックする Arweave データアイテムのトランザクション ID を定義します。

## 出典と参考資料

- [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)
