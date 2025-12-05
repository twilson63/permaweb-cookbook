---
locale: ja
---

# Vouch

Arweave アドレスがサービスによって認証されているかを確認する方法はいくつかあります。以下にそのうちの 2 つを示します。

## VouchDAO パッケージ

アプリ内で直接使用できる `isVouched` 関数があります。

#### インストール

npm でパッケージを追加：

```console:no-line-numbers
npm i vouchdao
```

または yarn を使用：

```console:no-line-numbers
yarn add vouchdao
```

#### 使用方法

非同期関数内で `isVouched` 関数を使用できます。ユーザーが既に認証されている場合、true を返します。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## GraphQL を使用する

GraphQL を使って Arweave ネットワークにクエリを投げ、指定した Arweave アドレスが認証されているか確認できます。

```graphql
query {
  transactions(tags: { name: "Vouch-For", values: ["ARWEAVE_ADDRESS"] }) {
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

アドレスが認証されている場合、ANS-109 を実装したサービスに関連するトランザクションノードのタグ群が返されます。`owner address` の値を VouchDAO のコミュニティ投票（[コミュニティ投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes)）と照合して、そのサービスがコミュニティ投票で承認されていることを確認できます。

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
    "value": "ARWEAVE_ADDRESS"
  }
]
```

## リソース

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO コントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
