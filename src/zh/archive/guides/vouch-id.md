# Vouch

有几种方法可以查询 Arweave 地址，以验证该地址是否已获得特定服务的背书（vouch）。以下为两种方法。

## VouchDAO 套件

函数 `isVouched` 可在您的应用程序中简单使用。

#### 安装

使用 npm 安装此套件：

```console:no-line-numbers
npm i vouchdao
```

或使用 yarn：

```console:no-line-numbers
yarn add vouchdao
```

#### 用法

在 async 函数中，您可以使用 `isVouched`，若用户已获得背书，该函数会返回 `true`。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ALAMAT_ARWEAVE") // true || undefined
  // ...
})();
```

## 使用 GraphQL

您可以使用 GraphQL 对 Arweave 网络进行查询，以确认某个 Arweave 地址是否已获得背书。

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

如果该地址已获得背书，会返回包含与发布 ANS-109 的服务相关标签的节点数组。您可以检查与 [社区投票](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) 有关的 `所有者地址`，以确定该服务是否已通过 VouchDAO 的社区投票完成验证。

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

## 资源

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
