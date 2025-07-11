---
locale: zh
---
# 完整的交易GraphQL结构
下面的GraphQL查询返回由索引服务捕获的交易的所有属性。

```graphql:no-line-numbers
query {
    transactions {
        cursor
        pageInfo { 
          hasNextPage
        }
        edges {
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                parent {
                    id
                }
            }
        }
    }
}

```

## 分页
默认情况下，GraphQL查询返回前10个结果。可以通过向交易查询添加`first: X`选项（其中`X`是从1到100的值）来请求更大的结果集。
```graphql{4}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
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
如果结果集中有超过100个项目，可以使用游标来检索后续的结果页。
```graphql{13-15,17}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
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
如果存在后续结果页，`hasNextPage`将为`true`。将结果集中最后一个项目的`cursor`值作为`after`查询参数的值。
```graphql{5}
query
{
  transactions(
    first:100,
    after: "WyIyMDIyLTEyLTMwVDE2OjQ0OjIzLjc0OVoiLDEwMF0=",
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
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
为了检索整个结果集，请重复使用每个页面中最后一项的`after`查询，并更新`cursor`值，直到`hasNextPage`为`false`为止。

## 速率限制
索引服务将实施速率限制以防止攻击和滥用其服务。`arweave.net/graphql`服务将GraphQL查询限制为每5分钟的600个查询（每个IP地址）。在解析响应之前，始终检查查询结果是否具有200的状态代码。状态代码为429表示正在执行速率限制。状态代码为503通常表示查询结果集对于`arweave.net/graphql`来说太大。

## 资源
* 有关更完整的Arweave GraphQL模式列表，请参阅[Arweave GraphQL指南](https://gql-guide.arweave.dev)
* [ArDB软件包](../guides/querying-arweave/ardb.md)
* [ar-gql软件包](../guides/querying-arweave/ar-gql.md)
* 对于GraphQL的一般指南，[graphql.org/learn](https://graphql.org/learn)是一个很好的起点
