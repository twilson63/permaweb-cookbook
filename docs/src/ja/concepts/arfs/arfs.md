---
locale: ja
next: "data-model.md"
---
# ArFSプロトコル：Arweave上の分散型ファイルシステム

Arweaveファイルシステム、または「ArFS」は、一般的なファイルシステム操作を模倣し、Arweaveのそれ以外は永久的で不変なデータストレージブロックウェーブ上でデータ階層に可変性の側面を提供するために設計されたデータモデリング、ストレージ、および取得プロトコルです。

Arweaveの永久的、不変、かつ公開の性質のため、権限、ファイル/フォルダーの名前変更や移動、ファイルの更新などの従来のファイルシステム操作は、単にオンチェーンデータモデルを更新することで行うことはできません。

ArFSは、プライバシーと暗号化のパターンを実装し、[Arweaveトランザクションヘッダー](https://docs.arweave.org/developers/server/http-api#transaction-format)内のタグを使用して追加専用のトランザクションデータモデルを定義することで、この問題を解決します。

## 主な特徴

### ファイル構造

ArFSは、階層構造を使用してファイルとフォルダーを整理します。ファイルはArweaveブロックチェーン上の個々のトランザクションとして保存され、フォルダーはこれらのファイルトランザクションを参照するメタデータです。

### メタデータ

各ファイルとフォルダーには、名前、タイプ、サイズ、変更タイムスタンプなどの関連メタデータがあります。ArFSは、標準化された形式でこのメタデータを保存するためにArweaveのタグ付けシステムを活用し、簡単なクエリと整理を可能にします。

### ファイル権限

ArFSは、パブリックおよびプライベートファイル権限をサポートします。パブリックファイルはネットワーク上の誰でもアクセスできますが、プライベートファイルは所有者の秘密鍵を使用して暗号化されており、所有者のみが内容を復号してアクセスできます。

### ファイルのバージョン管理

ArFSはファイルのバージョン管理をサポートしており、ユーザーはファイルの複数のバージョンを保存し、いつでも以前のバージョンにアクセスできます。これは、新しいファイルトランザクションをメタデータタグを使用して以前のバージョンにリンクすることで実現されます。

### データ重複排除

ストレージの冗長性とコストを最小限に抑えるために、ArFSはデータ重複排除技術を採用しています。ユーザーがすでにネットワーク上に存在するファイルを保存しようとした場合、プロトコルは単に既存のファイルへの新しい参照を作成し、重複コピーを保存するのではなく、既存のファイルを参照します。

### 検索と発見

ArFSは、ファイル名、タイプ、タグなどのメタデータに基づいてファイルを検索および発見する機能を提供します。これは、Arweaveブロックチェーン内に保存されたメタデータをインデックス化することで実現されます。

### 相互運用性

ArFSは、Arweaveネットワーク上に構築された他の分散型アプリケーションやサービスと相互運用可能になるように設計されています。これにより、さまざまなアプリケーションやユーザー間でシームレスな統合とコラボレーションが可能になります。

## 始めるには

ArFSを使用するには、Arweaveエコシステムに慣れ、ストレージコストをカバーするためのARトークンを取得し、ArFSプロトコルと対話するための互換性のあるクライアントまたはライブラリを選択する必要があります。

## リソース

さらに情報、文書、およびコミュニティサポートについては、以下のリソースを参照してください。

- [Arweave公式ウェブサイト](https://www.arweave.org/)
- [Arweave開発者ドキュメント](https://docs.arweave.org/)
- [Arweaveコミュニティフォーラム](https://community.arweave.org/)