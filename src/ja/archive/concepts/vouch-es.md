---
locale: ja
---

# Vouch

## 導入

#### Vouch プロトコル

Arweave は ANS-109 Vouch（アイデンティティ主張）の概念を導入しました。これは、特定のトランザクション形式といくつかのタグを用いて、permaweb 上の誰もが任意の Arweave アドレスのアイデンティティと人間性を「vouch（証明）」できるようにする標準です。

ANS-109 のような標準を permaweb に追加することで、Sybil 攻撃や悪意あるアクターを最小限に抑え、permaweb 上のユーザー体験をより安全なものにします。

#### VouchDAO

VouchDAO は、Vouch 標準上に構築されたコミュニティ主導の分散型検証レイヤーです。開発者は Vouch サービスを作成し、VouchDAO のコミュニティメンバーがこれらの検証サービスのうち信頼に足るものを投票で決定します。

新しいサービスが作成されると、そのサービスのアドレスは[VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) のインターフェースで投票にかけられます。投票が承認されると、それは検証済みの Voucher として追加されます。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 仕組み

開発者は、特定の要件に基づいて Arweave ウォレットを証明するための様々な Vouch サービスを作成できます。現在の例としては Twitter サービスがあり、これは最初の Vouch サービスで、これまでに 180 以上の Arweave アドレスを認証しています。

VouchDAO のスマートコントラクトの状態は `vouched`（証明済み）という属性を持ちます。ユーザーが検証されるたびにこの状態は更新されます。オブジェクト `vouched`（証明済み）は、次のフォーマットで認証済みアドレスのリストを格納します:

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

検証されたユーザーは、そのウォレットが当該サービスによって認証されたことを示すために ANS-109 トークンをウォレットで受け取ります。

## ANS-109 トランザクション形式

| タグ名                       | _任意?_ | タグ値                                                        |
| ---------------------------- | ------- | ------------------------------------------------------------- |
| アプリケーション名           | いいえ  | `Vouch`                                                       |
| Vouch-For                    | いいえ  | このトランザクションで証明対象となる Arweave アドレス         |
| アプリケーションのバージョン | はい    | `0.1`                                                         |
| 検証方法                     | はい    | 本人確認の方法。例: `Twitter`/`En persona`/`Gmail`/`Facebook` |
| ユーザー識別子               | はい    | 検証方法に基づくユーザー識別子。例 - `abhav@arweave.org`      |

## リソース

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO コントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
