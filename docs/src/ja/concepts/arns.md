---
locale: ja
---
# ArNS - Arweave Name System

## 概要
Arweave Name System (ArNS) は、PermaWeb の電話帳です。

これは、AR.IO ゲートウェイによって有効化され、ユーザーが親しみやすい名前を PermaWeb アプリ、ページ、およびデータに接続するために使用される分散型かつ検閲耐性のある命名システムです。

このシステムは、ユーザーがレジストリで名前を購入し、DNS 名前サーバーがこれらの名前を IP アドレスに解決する従来の DNS と似ています。

ArNS では、レジストリが分散型で永久的であり、Arweave に保存され、各 AR.IO ゲートウェイがキャッシュおよび名前解決者として機能します。ユーザーは、"my-name" のような名前を ArNS レジストリに登録し、任意の Arweave トランザクション ID へのポインタを設定できます。AR.IO ゲートウェイは、その名前を自身のサブドメインの一部として解決し、たとえば `https://laserilla.arweave.net` のように、関連する Arweave トランザクション ID へのすべてのリクエストをプロキシします。登録された各名前は、Arweave トランザクション ID を指す関連するサブ名前を持つこともでき、例えば `https://v1_laserilla.arweave.net` のように、所有者にさらなる柔軟性と制御を提供します。

## ArNS レジストリ

ArNS は、スマートウィーブプロトコルを使用してその名前レコードを管理します。各レコードまたは名前は、ユーザーによってリースされ、ANT トークンに紐づけられています。1つの ANT に複数の ArNS 名前を登録することはできますが、1つの ArNS 名前に複数の ANT を登録することはできません - ゲートウェイはルーティング ID の指し示す場所を知ることができません。

ArNS 名は、0-9 の数字、a-z の文字、およびダッシュ [-] を含む最大 32 文字です。ダッシュは末尾に置くことはできません。例えば `-myname` は無効です。

## ANTs (Arweave Name Tokens)

ANT は ArNS エコシステムの重要な部分です - それは ArNS 名前を所有するための実際の鍵です。ArNS 名前を ANT に登録すると、その ANT はその名前の転送方法になります。ArNS レジストリは ANT の所有者が誰であるかを気にせず、単にどの名前に属する ANT であるかを知っています。

ANT 内では、ArNS レジストリによって承認されたソースコードトランザクションリストの範囲内で、任意の機能を構築できます。NFT、PST、DAO、または完全なアプリケーションを含むまでです。

## アンダーネーム

アンダーネームは、あなたの ANT (Arweave Name Token) によって保持および管理されるレコードです。これらのレコードは、ArNS 名前を所有していなくても作成および管理でき、ANT を新しい所有者に送信する際に一緒に転送されます。同様に、あなたの ArNS 名前が期限切れになった場合、ANT を新しい ArNS 名前に登録すると、すべてのアンダーネームはそのまま残ります。

例: あなたは `oldName.arweave.net` を所有しています。

その後: あなたはアンダーネーム "my" を作成します - `my_oldName.arweave.net`。

その後: `oldName.arweave.net` が期限切れになり、あなたは ANT に `newName.arweave.net` を登録します。

今: アンダーネーム `my` は `newName` 上でアクセス可能です - `my_newName.arweave.net`。

以下は ANT コントラクトの状態の例です:


```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```
ベースの "@" レコードは ANT の初期ルーティング ID です。もしこの ANT に 'my-name' を登録し、`my-name.arweave.net` 経由でアクセスしようとすると、@ レコードの `transactionId` にリダイレクトされます。

もし `undername1_my-name.arweave.net` にアクセスしようとすると、`undername1` の `transactionId` が得られます。

ANT には理論上、無制限のアンダーネームがあります。ただし、どれだけ提供されるかは、使用される ArNS 名前のティアによります。

## リソース
# [ArNS アプリ](https://arns.app/)
# [ArNS ドキュメント](https://docs.ar.io/arns/)