---
locale: ja
---

# Vouch

特定のサービスから vouch を受け取っているかどうかを検証するために、Arweave のアドレスに対してクエリを実行する方法はいくつかあります。以下はそのうちの 2 つの方法です。

## VouchDAO パッケージ

isVouched 関数は、アプリケーション内で簡単に使用できます。

#### インストール

npm を使ってこのパッケージを追加します:

```console:no-line-numbers
npm i vouchdao
```

または yarn:

```console:no-line-numbers
yarn add vouchdao
```

#### 使用方法

async 関数内で isVouched 関数を使用できます。ユーザーがすでに vouch を受けている場合は true を返します。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ALAMAT_ARWEAVE") // true || undefined
  // ...
})();
```

## GraphQL を使用する方法

GraphQL を使用して Arweave ネットワークにクエリを実行し、特定の Arweave アドレスが vouch を受けているかどうかを確認できます。

```graphql
query {
  transactions(tags: { name: "Vouch-For", values: ["ALAMAT_ARWEAVE"] }) {
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

アドレスが vouch を受けている場合、ANS-109 を発行したサービスに関連するタグを含むノードの配列が返されます。返されたデータの所有者アドレスを確認し、VouchDAO を通じたコミュニティ投票によってそのサービスが検証されているかを次のリンクの [voting komunitas](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) で確認できます。

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
    "value": "ALAMAT_ARWEAVE"
  }
]
```

## リソース

- [VouchDAO](https://vouch-dao.arweave.net)
- [Kontrak VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
