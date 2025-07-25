---
locale: ja
---
# Vouch

## 概要

#### 動機

バウチングは、Sybil攻撃に対する分散型アプローチを提供します。Sybil攻撃とは、攻撃者が多数の擬似的なアイデンティティを作成してネットワークを侵害し、不相応に大きな影響を得ることです。

#### Vouchプロトコル

Arweaveは、ANS-109 Vouch（アイデンティティの主張）の概念を導入しました。これは、特定のトランザクション形式といくつかのタグを使用して、誰でもpermaweb上の任意のArweaveアドレスのアイデンティティと人間性を「保証」できるようにする標準です。

ANS-109のような標準をpermawebに追加することで、Sybil攻撃や悪意のある行為者を最小限に抑え、permawebユーザーにとってより安全な体験を提供します。

#### VouchDAO
VouchDAOは、Vouch標準の上に構築されたコミュニティ主導の分散型検証レイヤーです。開発者は保証サービスを作成し、VouchDAOコミュニティのメンバーはこれらの検証サービスのどれが信頼できるかを投票で決定します。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 仕組み
開発者は、特定の要件に基づいてユーザーのArweaveウォレットを保証するためのさまざまなVouchサービスを作成することができます。現在の例としては、180以上のArweaveアドレスを保証してきた最初の保証サービスであるTwitterサービスがあります。

VouchDAOスマートコントラクトの状態には`vouched`という属性があります。この状態は、ユーザーが確認されるたびに更新されます。`vouched`オブジェクトは、以下の形式で保証されたアドレスのリストを保存します。


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

確認されたユーザーには、そのウォレットがそのサービスによって保証されたことを示すために、ANS-109トークンが送信されます。

## ANS-109トランザクションフォーマット 
| タグ名 | _オプション?_ | タグ値 |
|---|---|---|
|App-Name|必須|`Vouch`|
|Vouch-For|必須|このトランザクションで保証されるArweaveの`address`|
|App-Version|オプション|`0.1`|
|Verification-Method|オプション|その人のアイデンティティを確認する方法。例 - `Twitter`/`対面`/`Gmail`/`Facebook`|
|User-Identifier|オプション|確認方法に基づくユーザーの識別子。例 - `abhav@arweave.org`|

## リソース
* [VouchDAO](https://vouch-dao.arweave.net)
* [VouchDAOコントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)