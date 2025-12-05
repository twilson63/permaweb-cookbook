# Vouch

Arweave アドレスがサービスによって承認済みかを確認するにはいくつかの方法があります。以下はそのうちの 2 つのアプローチです。

## VouchDAO パッケージ

`isVouched` 関数は、アプリケーションで簡単に利用できるよう提供されています。

#### インストール

パッケージを追加してください:
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

async 関数内で `isVouched` 関数を使用できます。ユーザーが承認済みの場合は true を返します。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## GraphQL を使用する

GraphQL を使って Arweave ネットワークにクエリを投げ、特定の Arweave アドレスが承認されているか確認できます。

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

アドレスが承認されている場合、ANS-109 を発行するサービスに関連するタグを含むノード配列が返されます。`owner address` の値をコミュニティ投票のデータと照合することで、VouchDAO を介したコミュニティ投票によってそのサービスが検証されていることを確認できます。

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
