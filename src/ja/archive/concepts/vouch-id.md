---
locale: ja
---

# Vouch

## 概要

#### Vouch プロトコル

Arweave は ANS-109 Vouch (Assertion of Identity) の概念を導入しました。これは特定のトランザクション形式といくつかのタグを用いる標準で、パーマウェブ上の誰でも任意の Arweave アドレスの身元と人間性を「vouch（保証）」できるようにします。

ANS-109 のような標準をパーマウェブに追加することで、Sybil 攻撃や悪意あるアクターを減らし、パーマウェブ利用者にとってより安全な体験を提供できます。

#### VouchDAO

VouchDAO はコミュニティ主導の分散型検証レイヤーで、Vouch 標準の上に構築されています。開発者は vouch サービスを作成し、VouchDAO コミュニティのメンバーがどの検証サービスを信頼できるかを投票で決定します。

新しいサービスが作成されると、そのアドレスは [VouchDAO コミュニティ](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) のインターフェースを通じて選定されます。投票が承認されると、そのサービスは認証済みの Voucher として追加されます。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 仕組み

開発者は特定の要件セットに基づいて、ユーザーの Arweave ウォレットに対して保証を提供するさまざまな Vouch サービスを構築できます。現在の例は Twitter サービスで、これは最初の vouch サービスであり、これまでに 180 以上の Arweave アドレスに保証を与えています。

VouchDAO のスマートコントラクトのステータスは属性 `vouched` を持ちます。このステータスはユーザーが検証されるたびに更新されます。`vouched` オブジェクトは以下の形式で vouch されたアドレスのリストを保持します:

```
ALAMAT_PENGGUNA_VOUCH:[
  {
    service:"ALAMAT_LAYANAN_1"
    transaction:"ID_TX"
  },
   {
    service:"ALAMAT_LAYANAN_2"
    transaction:"ID_TX"
  }
]
```

検証されたユーザーは、そのウォレットが当該サービスによって vouch されたことを示す ANS-109 トークンを受け取ります。

## ANS-109 トランザクション形式

| タグ名              | _任意?_ | タグ値                                                              |
| ------------------- | ------- | ------------------------------------------------------------------- |
| App-Name            | いいえ  | `Vouch`                                                             |
| Vouch-For           | いいえ  | このトランザクションで vouch される Arweave のアドレス              |
| App-Version         | はい    | `0.1`                                                               |
| Verification-Method | はい    | 本人確認の方法。例 - `Twitter`/`Secara Langsung`/`Gmail`/`Facebook` |
| User-Identifier     | はい    | 検証方法に基づくユーザー識別子。例 - `abhav@arweave.org`            |

## リソース

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO コントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
