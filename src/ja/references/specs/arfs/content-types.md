---
prev: "entity-types.md"
next: "privacy.md"
---

# Content Types

ArFS のすべてのトランザクションタイプは、トランザクションに含まれるデータの Content-Type（MIME タイプとしても知られる）を示す特定のメタデータタグを利用します。ArFS クライアントは、Arweave ゲートウェイやブラウザがこのコンテンツを適切にレンダリングできるように、データの MIME タイプを判定する必要があります。

すべての公開ドライブ、フォルダ、およびファイル（メタデータのみ）のエンティティトランザクションは JSON 標準を使用するため、以下の Content-Type タグを持つ必要があります。

```json
Content-Type: '<application/json>'
```

ただし、ファイルのデータトランザクションについては、その MIME タイプを判定する必要があります。これは、該当するファイルのメタデータトランザクション JSON の`dataContentType`と、データトランザクション自体の Content-Type タグの両方に格納されます。

```json
Content-Type: "<file's mime-type>"
```

すべてのプライベート（暗号化された）ドライブ、フォルダ、およびファイルのエンティティトランザクションは、暗号化されているため、次の Content-Type を持つ必要があります。

```json
Content-Type: '<application/octet-stream>'
```

[ArDrive-Core](https://github.com/ardriveapp/ardrive-core-js) は、ファイルの Content-Type を判定するためのメソッドを含んでいます。

## Other Tags

ArFS 対応クライアントは、トランザクション上にアプリケーションを識別するために次のタグを含めるべきです。

```json
App-Name: "<defined application name eg. ArDrive"
App-Version: "<defined version of the app eg. 0.5.0"
Client?: "<if the application has multiple clients, they should be specified here eg. Web"
```
