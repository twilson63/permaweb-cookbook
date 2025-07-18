---
locale: zh
---
# Vouch
有几种查询 Arweave 地址以验证是否已由服务认证的方式。以下是其中两种方法。
## VouchDAO 包
`isVouched` 函数可直接在应用程序中使用。

#### 安装
使用 npm 添加包：
```console:no-line-numbers
npm i vouchdao
```
或者使用 yarn：
```console:no-line-numbers
yarn add vouchdao
```

#### 使用
在异步函数中，您可以使用 `isVouched` 函数，如果用户已经获得认证，它将返回 true。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## 使用 GraphQL
您可以使用 GraphQL 查询 Arweave 网络，以了解给定的 Arweave 地址是否已获得认证。

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

如果地址已获得认证，将返回一组与发布 ANS-109 的服务相关的节点标签。您可以将 “owner address” 的值与通过 VouchDAO 的社区投票中的[社区投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes)进行交叉参考，以确保该服务已通过社区投票验证。

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

## 资源
* [VouchDAO](https://vouch-dao.arweave.dev)
* [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
* [Arweave/GraphQL Playground](https://arweave.net/graphql)