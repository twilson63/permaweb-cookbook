# Vouch

有几种方式可以查询 Arweave 地址，以验证该地址是否已被某项服务背书。下面演示两种方法。

## VouchDAO 包

`isVouched` 函数以简单直观的方式提供，供您的应用程序使用。

#### 安装

新增套件：
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

在 async 函数中，您可以使用 `isVouched` 函数；若用户已被背书，该函数会返回 true。

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ARWEAVE_ADDRESS") // true || undefined
  // ...
})();
```

## 使用 GraphQL

您可以使用 GraphQL 查询 Arweave 网络，以判定特定 Arweave 地址是否已被背书。

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

如果该地址已被背书，回传结果会包含一个节点数组，其 tags 涵盖发行 ANS-109 的服务相关信息。您可以将 `owner address` 的值与已提交的社区投票交叉比对，以确保该服务已透过 VouchDAO 的社区投票获得验证。

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

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
- [Arweave/GraphQL Playground](https://arweave.net/graphql)
