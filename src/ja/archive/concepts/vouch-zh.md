---
locale: ja
---

# Vouch（承認）

## 概要

#### Vouch プロトコル

Arweave は ANS-109 Vouch（身元の表明）の概念を導入しました。これは特定のトランザクション形式と一連のタグを使用する標準で、permaweb 上の任意の人物が任意の Arweave アドレスの身元および人間性を「承認」できるようにします。

ANS-109 のような標準を permaweb に追加することは、Sybil 攻撃や悪意あるアクターを最小化し、permaweb のユーザー体験をより安全にするのに役立ちます。

#### VouchDAO

VouchDAO はコミュニティ主導の、Vouch 標準に基づく分散型検証レイヤーです。開発者は承認サービスを作成し、VouchDAO コミュニティのメンバーがどの検証サービスを信頼に値するかを投票で決定します。

新しいサービスが作成されると、そのアドレスは [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) インターフェース上で投票にかけられます。投票が可決されれば、それは検証済みの承認として追加されます。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 仕組み

開発者は異なる Vouch サービスを作成でき、与えられた一連の要件に基づいてユーザーの Arweave ウォレットを検証します。現在の例のひとつが Twitter サービスで、これは最初の承認サービスであり、これまでに 180 を超える Arweave アドレスに対して承認を提供しています。

VouchDAO スマートコントラクトの状態には `vouched` プロパティがあります。ユーザーが検証されるたびに状態は更新されます。`vouched` オブジェクトは、承認を受けたアドレスのリストを以下の形式で格納します：

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

検証に成功したユーザーは、そのウォレットに ANS-109 トークンを受け取り、当該ウォレットがそのサービスによって承認されたことを示します。

## ANS-109 トランザクション形式

| タグ名              | _必須/任意_ | タグ値                                                                      |
| ------------------- | ----------- | --------------------------------------------------------------------------- |
| App-Name            | 必須        | `Vouch`                                                                     |
| Vouch-For           | 必須        | このトランザクションで承認される Arweave の `address`                       |
| App-Version         | 任意        | `0.1`                                                                       |
| Verification-Method | 任意        | この人物の身元を検証する方法。例 - `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | 任意        | 検証方法に基づくユーザー識別子。例 - `abhav@arweave.org`                    |

## リソース

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合約](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
