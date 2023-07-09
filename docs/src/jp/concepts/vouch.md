---
locale: jp
---
# ヴァウチ
## 概要
#### ヴァウチプロトコル
Arweaveは、ANS-109 Vouch（アイデンティティの主張）という概念を導入しました。これは、特定のトランザクション形式といくつかのタグを使用して、パーマウェブ上の誰でも任意のArweaveアドレスの身元と人間性を「保証する」ことができる標準です。

ANS-109のような標準をパーマウェブに追加することで、Sybil攻撃や悪意のあるアクターを最小限に抑え、パーマウェブユーザーにとってより安全な体験を提供できるようになります。

#### VouchDAO
VouchDAOは、Vouch標準の上に構築されたコミュニティ主導の分散型検証レイヤーです。開発者は検証サービスを作成し、VouchDAOコミュニティのメンバーはこれらの検証サービスの信頼性を投票で評価します。

新しいサービスが作成されると、そのアドレスは[VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)のインターフェース上で投票されます。投票が承認されると、検証済みのバウチャーとして追加されます。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 動作原理
開発者は、特定の要件に基づいてユーザーのArweaveウォレットを証明するためのさまざまなヴァウチサービスを作成できます。現在の例としてはTwitterサービスがあり、これは最初のヴァウチサービスであり、これまでに180以上のArweaveアドレスの保証を行っています。

VouchDAOスマートコントラクトの状態には「vouched」という属性があります。この状態は、ユーザーが検証されるたびに更新されます。`vouched`オブジェクトには、次の形式で保証のあるアドレスのリストが格納されます：
```
VOUCH_USER_ADDRESS:[
  {
    service:"SERVICE_ADDRESS_1"
    transaction:"TX_ID"
  },
   {
    service:"SERVICE_ADDRESS_2"
    transaction:"TX_ID"
  }
]
```

検証が完了したユーザーは、ヴァウチサービスによってそのウォレットにANS-109トークンが送信され、そのウォレットが保証されていることが示されます。

## ANS-109トランザクション形式
| タグ名 | _必須?_ | タグの値 |
|---|---|---|
|App-Name|False|`Vouch`|
|Vouch-For|False|このトランザクションで保証されるArweaveの`address`|
|App-Version|True|`0.1`|
|Verification-Method|True|本人の身元の検証方法。例 - `Twitter`/`In-Person`/`Gmail`/`Facebook`|
|User-Identifier|True|検証方法に基づいたユーザーの識別子。例 - `abhav@arweave.org`|

## リソース
* [VouchDAO](https://vouch-dao.arweave.dev)
* [VouchDAO契約書](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)