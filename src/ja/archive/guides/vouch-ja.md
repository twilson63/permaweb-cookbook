---
locale: ja
---

# Vouch

Arweave アドレスがサービスによって承認されているかどうかを照会する方法はいくつかあります。以下はそのうちの 2 つのアプローチです。

## VouchDAO パッケージ

`isVouched` 関数はアプリケーション内で簡単に使用できるよう提供されています。

#### インストール

パッケージを追加します:
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm i vouchdao
```

</CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add vouchdao
```

</CodeGroupItem>
</CodeGroup>

#### 使用方法

非同期関数内で `isVouched` 関数を使用できます。ユーザーが承認済みであれば true を返します。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## GraphQL を使用する

GraphQL を使って Arweave ネットワークにクエリを投げ、指定した Arweave アドレスが承認されているかどうかを確認できます。

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

アドレスが承認されている場合、ANS-109 を発行するサービスに関連するタグを含むノードの配列が返されます。`owner address` の値を渡されたコミュニティ投票と照合することで、そのサービスが VouchDAO を通じたコミュニティ投票によって検証されていることを確認できます。

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
- [Arweave/GraphQL プレイグラウンド](https://arweave.net/graphql)
