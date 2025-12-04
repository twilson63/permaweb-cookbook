# Arweave ネームシステム (ArNS)

## 概要

Arweave Name System (ArNS) は Permaweb の電話帳です。

これは分散型で検閲耐性のあるネーミングシステムで、AR.IO Gateways により実現され、フレンドリ名を Permaweb のアプリ、ページ、データに紐付けるために使用されます。

このシステムは従来の DNS と類似しており、ユーザーがレジストリで名前を購入し、DNS ネームサーバーがこれらの名前を IP アドレスに解決する方式に似ています。

ArNS では、レジストリが分散化され永続的であり Arweave 上（AO を介して）に格納され、各 AR.IO Gateway がキャッシュ兼名前解決器として動作します。ユーザーは ArNS レジストリ内に "my-name" のような名前を登録し、任意の Arweave Transaction ID を指すポインタを設定できます。

AR.IO Gateways はその名前を自身のサブドメインの一つとして解決します（例: https://laserilla.arweave.net ）および関連する Arweave Transaction ID へ全てのリクエストをプロキシします。登録された各名前は、https://v1_laserilla.arweave.net のようにそれぞれが Arweave Transaction ID を指す下位名（under names）を持つこともでき、所有者にさらに柔軟な管理を提供します。

## ArNS レジストリ

ArNS は AO を用いて名前レコードを管理します。各レコード（名前）はユーザーによってリースされるか永久購入され、ANT トークンに紐づけられます。複数の ArNS 名を単一の ANT に登録することは可能ですが、単一の ArNS 名に複数の ANT を登録することはできません — ゲートウェイはルーティング ID をどこに向けるべきか分からなくなります。

ArNS 名は最大 32 文字までで、数字 [0-9]、小文字アルファベット [a-z]、およびハイフン [-] が使用可能です。ハイフンは末尾に付けることはできません（例: -myname は不可）。

## ANTs (Arweave Name Tokens)

ANT は ArNS エコシステムの重要な要素であり、ArNS 名を所有するための実際の鍵です。ArNS 名を ANT に登録すると、その ANT がその名前の転送方法となります。ArNS レジストリは ANT の所有者が誰であるかを気にせず、単にどの名前がどの ANT に属しているかを認識します。

ANT の内部では、ArNS レジストリで承認されたソースコードトランザクション一覧の範囲内で、任意の機能を構築できます。

## Under_Names

Undernames はあなたの ANT (Arweave Name Token) によって保持・管理されるレコードです。これらのレコードは ArNS 名を所有していなくても作成・管理でき、ANT が新しい所有者に送られる際に一緒に転送されます。同様に、あなたの ArNS 名が期限切れになり、ANT を新しい ArNS 名に登録した場合でも、すべての undername はそのまま維持されます。

例: あなたが oldName.arweave.net を所有しているとします。

その後: あなたは undername "my" を作成します — my_oldName.arweave.net。

その後: oldName.arweave.net が期限切れになり、あなたが自分の ANT に newName.arweave.net を登録します。

今: my\_ の undername は newName でアクセス可能になります — my_newName.arweave.net。

以下は ANT コントラクト State の例です:

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

ベースの "@" レコードは ANT の初期ルーティング ID です。もしこの ANT に 'my-name' を登録し、my-name.arweave.net 経由でアクセスしようとした場合、@ レコードの transactionId にリダイレクトされます。

もし undername1_my-name.arweave.net にアクセスしようとした場合は、undername1 の transactionId が返されます。

理論上、ANT には無制限の数の undername を持たせることができます。しかし、実際にいくつ提供されるかは、あなたの ArNS 名で使用されるティア（階層）によって決まります。

## リソース

- [ArNS App](https://arns.app/)
- [ArNS Docs](https://docs.ar.io/arns/)
