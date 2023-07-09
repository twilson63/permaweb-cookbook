---
locale: jp
---
# ArNS - Arweaveネームシステム
## 概要
Arweave Name System（ArNS）は、PermaWebのSmartweaveを活用した電話帳です。

これは、AR.IO Gatewaysによって有効化され、フレンドリーな名前をPermaWebアプリ、ページ、データに接続するために使用される非中央集権かつ検閲耐性のあるネーミングシステムです。

このシステムは、ユーザーが登録された名前をレジストリで購入し、DNSネームサーバーがこれらの名前をIPアドレスに変換する、従来のDNSと同様に動作します。

ArNSでは、レジストリが分散化され、永続的に保存され、Arweave（Smartweaveを使用）に格納され、各AR.IOゲートウェイがキャッシュおよび名前解決サーバーの役割を果たします。ユーザーは、ArNSレジストリ内に「my-name」のような名前を登録し、任意のArweaveトランザクションIDにポインタを設定することができます。AR.IOゲートウェイは、その名前を自身のサブドメインの1つとして解決し、関連するArweaveトランザクションIDへのすべてのリクエストをプロキシします。登録された名前ごとに関連付けられているアンダーネームを持つこともできます。それぞれのアンダーネームは、ArweaveトランザクションIDを指すことができます。例えば、https://v1_laserilla.arweave.netのようなものです。これにより、所有者にさらなる柔軟性と制御が与えられます。

## ArNSレジストリ
<!-- // TODO: smartweaveコンセプトへのリンク // -->

ArNSは、スマートウィーブプロトコルを使用して名前レコードを管理します。それぞれのレコードまたは名前は、ユーザーによって貸与され、ANTトークンに関連付けられます。1つのANTに複数のArNS名前を登録することができますが、1つのArNS名前に複数のANTを登録することはできません。ゲートウェイは、どこにルーティングIDを指定すべきかわからなくなるからです。

ArNS名前は、数字[0-9]、文字[a-z]、およびハイフン[-]を含む最大32文字にすることができます。ハイフンは末尾に置くことはできません。例：-mynameはダッシュで終わることはできません。

## ANTs（Arweaveネームトークン）

ANTsは、ArNSエコシステムの重要な部分です。これらは実際にArNS名前を所有するための鍵です。ArNS名前をANTに登録すると、ANTはその名前の転送方法となります。ArNSレジストリはANTの所有者を気にしません。ただし、ANTが属している名前のANTを知っているだけです。

ANT内で、ArNSレジストリが承認したソースコードトランザクションリストの範囲内で必要な機能をビルドアウトすることができます。NFT、PST、DAO、または完全なアプリケーションなどが含まれます。

## アンダーネーム

アンダーネームは、自分のANT（Arweaveネームトークン）によって保持および管理されるレコードです。これらのレコードは、ArNS名前を所有していなくても作成および管理することができ、新しいオーナーに送信されるときにANTと共に転送されます。同様に、ArNS名前が期限切れになり、ANTを新しいArNS名前に登録すると、すべてのアンダーネームは変わらず保持されます。

例：oldName.arweave.netを所有しています。

次に：アンダーネーム「my」を作成します - my_oldName.arweave.net。

次に：oldName.arweave.netが期限切れになり、ANTをnewName.arweave.netに登録します。

今：my_アンダーネームはnewNameでアクセスできます - my_newName.arweave.net。

以下は、ANT契約状態の例です：

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
ベースの「@」レコードは、ANTの初期ルーティングIDです。このANTに「my-name」を登録し、my-name.arweave.netでアクセスしようとすると、@レコードのtransactionIdにリダイレクトされます。

undername1_my-name.arweave.netにアクセスしようとすると、undername1のtransactionIdが取得されます。

ANTは理論上では無制限の数のアンダーネームを持つことができます。ただし、提供することができるアンダーネームの数は、使用されるArNS名前のティアによって異なります。