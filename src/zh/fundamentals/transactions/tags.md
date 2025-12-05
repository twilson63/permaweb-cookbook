# 交易元数据（标签）

Arweave 上的交易具有唯一的 ID、签名，以及拥有者地址（即签署并支付该笔交易发布费用的地址）。

除了这些标头值外，Arweave 协议允许用户为交易加入自定义标签。这些标签以一组 `key: value` 配对的形式附加到交易中。

自定义标签让查询 Arweave 并找出包含特定标签（或多个标签）的所有交易成为可能。查询与筛选交易的能力对于支持构建在 Arweave 上的应用程序至关重要。

## 什么是交易标签？

交易标签是键值对（key-value pairs），其中以 Base64URL 编码的键与值的组合，对于原生 Arweave 交易而言，其总和必须小于 2048 字节的上限。

一些常见的交易标签示例包括：

- `Content-Type`: 用于指定内容的 MIME 类型，以便在 Permaweb 上呈现。
- `App-Name`: 此标签描述正在写入数据的应用程序。
- `App-Version`: 与 App-Name 配对，表示该应用程序的版本。
- `Unix-Time`: 该标签为 Unix 时间戳，**自 Epoch 起的秒数**。
- `Title`: 用于为交易中存储的内容指定名称或简短描述。
- `Description`: 用于提供内容的较长描述。

交易标签可用于各种目的，例如为搜索建立交易索引、将交易分类，或提供关于交易中所存储内容的元数据。

## 关于交易标签的重要信息

交易标签的键与值皆以 Base64URL 编码的字符串表示。这使得可以将字节数组作为键或值发布，并安全地通过 HTTP 传输。虽然未解码时对人类不可读，但不应被视为加密。

直接发布到 Arweave 的交易标签总大小上限为 2048 字节。此大小由所有标签键与所有标签值串接后的长度决定。

交易标签可以用于 GraphQL 查询中，以返回经过筛选的交易项目集合。

## 示例

```ts
const tx = await arweave.createTransaction({ data: mydata });

tx.addTag("Content-Type", "text/html");
tx.addTag("Title", "My incredible post about Transaction Tags");
tx.addTag("Description", "This is one post you do not want to miss!");
tx.addTag("Topic:Amazing", "Amazing");
tx.addTag("Type", "blog-post");

await arweave.transactions.sign(tx, jwk);
await arweave.transactions.post(tx);
```

## 摘要

标签提供一种工具，用以采用与建立通用的数据标准与模式，从而在 Permaweb 上促进非竞争性（non-rivalrous）的数据体验。

其结果使生态系统的用户可以选择不同的应用程序来消费或创建内容，因为数据始终属于用户，而非应用程序。
