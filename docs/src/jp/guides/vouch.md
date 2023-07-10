---
locale: jp
---
＃ 保証
Arweaveアドレスがサービスによって保証されたかどうかを確認するためのいくつかの方法があります。以下にそのうちの2つの手法があります。

## VouchDAOパッケージ
`isVouched`関数は、アプリケーション内で簡単に使用できるように提供されています。

#### インストール
npmを使用してパッケージを追加します：
```console:no-line-numbers
npm i vouchdao
```
またはyarnを使用します：
```console:no-line-numbers
yarn add vouchdao
```

#### 使用法
async関数の内部で、ユーザーが保証されている場合はtrueを返す`isVouched`関数を使用できます。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## GraphQLを使用する
GraphQLを使用してArweaveネットワークをクエリすることで、指定されたArweaveアドレスが保証されているかどうかを調べることができます。

```graphql
query {
  transactions(
    tags:{name:"Vouch-For", values:["ARWEAVE_ADDRESS"]}
  ) {
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

アドレスが保証されている場合、ANL-109を発行するサービスに関連するタグを持つノードの配列が返されます。渡された[コミュニティ投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes)とのクロスリファレンスで、サービスがコミュニティ投票を経て検証されていることを確認することができます。

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
* [VouchDAO](https://vouch-dao.arweave.dev)
* [VouchDAOコントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
* [Arweave/GraphQL Playground](https://arweave.net/graphql)