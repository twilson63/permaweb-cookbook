---
locale: ja
prev: "entity-types.md"
next: "privacy.md"
---

# コンテンツタイプ

ArFSのすべてのトランザクションタイプは、トランザクションに含まれるデータのContent-Type（MIMEタイプとも呼ばれる）に特定のメタデータタグを利用します。ArFSクライアントは、データのMIMEタイプを決定する必要があります。これにより、Arweaveゲートウェイやブラウザがこのコンテンツを適切にレンダリングできるようになります。

すべてのパブリックドライブ、フォルダー、およびファイル（メタデータのみ）エンティティトランザクションはすべてJSON標準を使用するため、次のコンテンツタイプタグを持つ必要があります：


```json
Content-Type: '<application/json>'
```

ただし、ファイルのデータトランザクションにはMIMEタイプを決定する必要があります。これは、ファイルの対応するメタデータトランザクションJSONの`dataContentType`に格納されているほか、データトランザクション自体のコンテンツタイプタグにも格納されます。

```json
Content-Type: "<file's mime-type>"
```

すべてのプライベートドライブ、フォルダー、およびファイルエンティティトランザクションは、暗号化されているため、次のコンテンツタイプを持つ必要があります：

```json
Content-Type: '<application/octet-stream>'
```

[ArDrive-Core](https://docs.ardrive.io/docs/core-sdk.html)には、ファイルのコンテンツタイプを決定するためのメソッドが含まれています。

## その他のタグ

ArFS対応クライアントは、トランザクションに次のタグを含めて、アプリケーションを識別する必要があります。


```json
App-Name: "<defined application name eg. ArDrive"
App-Version: "<defined version of the app eg. 0.5.0"
Client?: "<if the application has multiple clients, they should be specified here eg. Web" 
```



