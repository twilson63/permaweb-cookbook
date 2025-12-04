---
locale: ja
---

# Vouch

Arweave のアドレスがサービスによって保証（vouched）されているかを確認する方法はいくつかあります。以下に 2 つのアプローチを示します。

## VouchDAO パッケージ

関数 `isVouched` はアプリケーション内で簡単に利用できます。

#### インストール

npm を使ってパッケージを追加します:

```console:no-line-numbers
npm i vouchdao
```

または yarn:

```console:no-line-numbers
yarn add vouchdao
```

#### 使用方法

非同期関数内で `isVouched` 関数を使用できます。ユーザーが保証されている場合は true を返します。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("DIRECCIÓN_ARWEAVE") // true || undefined
  // ...
})();
```

## GraphQL を使用する

GraphQL を使って Arweave ネットワークを照会し、特定の Arweave アドレスが保証されているかを確認できます。

```graphql
query {
  transactions(tags: { name: "Vouch-For", values: ["DIRECCIÓN_ARWEAVE"] }) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
```

アドレスが保証されている場合、ANS-109 を発行するサービスに関連するタグを含むノードの配列が返されます。`owner` のアドレスを [コミュニティ投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) と照合することで、VouchDAO を通じたコミュニティ投票によってそのサービスが検証されていることを確認できます。

```graphql
"owner": {
 "address": "Ax_uXyLQBPZSQ15movzv9-O1mDo30khslqN64qD27Z8"
},
"tags": [
  {
    "name": "Content-Type",
    "value": "application/json"
  },
  {
    "name": "App-Name",
    "value": "Vouch"
  },
  {
    "name": "App-Version",
    "value": "0.1"
  },
  {
    "name": "Verification-Method",
    "value": "Twitter"
  },
  {
    "name": "Vouch-For",
    "value": "DIRECCIÓN_ARWEAVE"
  }
]
```

## リソース

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO コントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL プレイグラウンド](https://arweave.net/graphql)
