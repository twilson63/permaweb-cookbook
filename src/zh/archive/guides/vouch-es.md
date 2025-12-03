# Vouch

有几种方式可以查询 Arweave 地址，以确认该地址是否已被某项服务背书。以下提供两种做法。

## VouchDAO 套件

函数 `isVouched` 可在你的应用中使用，方便判断该地址是否已被背书。

#### 安装

使用 npm 添加此套件：

```console:no-line-numbers
npm i vouchdao
```

或使用 yarn：

```console:no-line-numbers
yarn add vouchdao
```

#### 使用

在异步函数中可以使用 `isVouched`，如果地址已被背书，将返回 true。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("DIRECCIÓN_ARWEAVE") // true || undefined
  // ...
})();
```

## 使用 GraphQL

你可以通过 GraphQL 查询 Arweave 网络，以判断特定 Arweave 地址是否已被背书。

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

如果该地址已被背书，响应将返回一个包含与发布 ANS-109 服务相关标签的节点数组。你可以比对 `owner` 的地址，并与 [社区投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) 交叉验证，以确认该服务是否已通过 VouchDAO 的社区投票验证。

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

## 资源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
