---
locale: zh
---
# 搜索索引服务

总结:
- 与 Arweave GraphQL 的语法兼容
- 对于复杂查询（例如多标签搜索）有更快的响应时间
- 提供更多查询选项
---

[Goldsky](https://goldsky.com) 免费的搜索服务使用了一个优化的后端，允许在 arweave 区块和交易中进行更快的复杂查询，并且还引入了模糊和通配符搜索用例的附加查询语法。

搜索 GraphQL 语法是 [Arweave GraphQL 语法](./queryingArweave.md) 的超集。它完全向后兼容，并将返回相同的查询结果，但拥有一些额外的修饰符，可以提供更多的使用选项。

- 灵活的标签过滤器
  - 仅搜索标签名或值
- 高级标签过滤器
  - 模糊搜索
  - 通配符搜索
- 仅过滤 L1 交易

如果您有任何自定义需求或功能想法，请随时通过电子邮件或 Discord 与 Goldsky 团队联系！

## 搜索网关链接点

目前，此语法的唯一版本托管在 Goldsky 上。如果有人有兴趣使用相同的语法托管自己的网关，请随时与 [Goldsky](https://goldsky.com) 联系寻求帮助。

- [Goldsky 搜索服务](https://arweave-search.goldsky.com/graphql)
- [KNN3 arseeding 索引服务](https://knn3-gateway.knn3.xyz/arseeding/graphql)

## 功能

### 灵活的标签过滤器

搜索网关语法不太严格，允许仅搜索标签名或值。

#### 示例
搜索标签值为 'cat' 的交易

```graphql:no-line-numbers
query just_values {
  transactions(
    first: 10,
    tags: [
      {
        values: ["cat"]
      }
    ]
  ) 
  {
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

搜索包含 'In-Response-To-ID' 标签的交易

```graphql:no-line-numbers
query just_name {
  transactions(
    first: 10,
    tags: [
      {
        name: "In-Response-To-ID"
      }
    ]
  ) 
  {
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


### 高级标签过滤器

搜索网关语法提供了标签过滤器的额外参数 `match`。

| Match 值 | 描述 | 
|-------------|-------------|
| EXACT | (默认) 仅精确匹配 |
| WILDCARD | 启用 * 来匹配任意数量的字符，例如 `text/*` |
| FUZZY_AND | 包含所有搜索词的模糊匹配 |
| FUZZY_OR | 包含至少一个搜索词的模糊匹配 |

打开 Playground 并尝试以下一些查询！

使用通配符搜索所有带有图像内容类型的交易
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: "image/*", match: WILDCARD}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### 模糊搜索

模糊搜索非常强大，可以搜索具有许多变体的“相似”文本。

搜索包含 'cat' 或 'dog'（或 CAT 或 doG 或 cAts 或 CAAts 等）的所有交易，即标签可能至少包含 cat 或 dog 类似的术语。

```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_OR"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

搜索具有 cat 类似和 dog 类似的标签值的交易
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_AND"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### 排除已捆绑（L2）交易

只需设置 `bundledIn: NULL`

```graphql:no-line-numbers
query just_l1 {
  transactions(
    first: 10,
    bundledIn: null
  ) 
  {
    edges {
      node {
        id
        signature
        owner {
          address
        }
        block {
          height
        }
      }
    }
  }
}
```
