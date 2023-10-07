---
locale: zh
---

# 交易元数据（标签）

可以将 Arweave 视为一个永久的只追加硬盘，其中硬盘上的每个条目都是独立的交易。交易有唯一的 ID、签名和所有者地址，用于签署并支付发布交易的地址。除了这些标题值之外，Arweave 协议还允许用户为交易添加自定义标签。这些标签被指定为附加到交易中的集合名称值对。这些标签使得可以查询 Arweave 并找到包含特定标签或标签的所有交易。对于构建在 Arweave 上的应用程序来说，查询和过滤交易的能力非常关键。

## 交易标签是什么？

交易标签是键值对，其中 base64URL 键和值的组合必须少于 Arweave 本地交易的最大 2048 字节。

::: tip
捆绑交易支持更多的标签空间。通过 bundler.network 发布的交易具有最多 4096 字节的标签空间。
:::

一些常见的交易标签示例包括：

-   `Content-Type`：用于指定在永久网络上呈现的内容的 MIME 类型。
-   `App-Name`：此标签描述编写数据的应用程序。
-   `App-Version`：此标签是与`App-Name`配对的应用程序版本。
-   `Unix-Time`：此标签是 UNIX 时间戳，自纪元以来的**秒数**。
-   `Title`：用于为存储在交易中的内容提供名称或简要描述。
-   `Description`：用于提供内容的更长描述。

交易标签可用于多种目的，例如将交易索引用于搜索，将交易组织到类别中，或提供有关存储在交易中的内容的元数据。

## 关于交易标签的一些重要信息

交易标签以 Base64URL 编码的字符串形式进行编码，用于键和值都是如此。这样可以将字节数组作为键或值数组进行传输，并通过 http 安全地传输它们。虽然未解码时不可读，但不应将其视为加密。

直接发布到 Arweave 的交易的最大标签总大小为 2048 字节。此大小由交易标签的所有键和所有值的串联确定。

可以在 GraphQL 查询中使用交易标签返回过滤后的交易项集。

## 社区中常用的标签

| <div style="width:100px">标签名称</div> | 描述                                       | 使用场景                                                                  |
| --------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------- |
| App-Name                                | 最常用于 SmartWeave 标识符                 | 常见值有 SmartWeaveContract、SmartWeaveAction 和 SmartWeaveContractSource |
| App-Version                             | 数据的版本，可能代表使用此信息的应用程序   | 0.3.0 是当前的 SmartWeave 版本                                            |
| Content-Type                            | 用于识别交易中包含的数据的 MIME 类型       | text/html，application/json，image/png                                    |
| Unix-Time                               | 此标签是 UNIX 时间戳，自纪元以来的**秒数** | 交易提交的时间                                                            |
| Title                                   | ANS-110 标准的内容描述                     | 为原子资产提供名称                                                        |
| Type                                    | ANS-110 标准的数据分类                     | 类型可以对永久网络资产进行分类                                            |

## 示例

<CodeGroup>
  <CodeGroupItem title="arweave">

```ts
const tx = await arweave.createTransaction({ data: mydata });
tx.addTag("Content-Type", "text/html");
tx.addTag("Title", "关于交易标签的我令人难以置信的帖子");
tx.addTag("Description", "这是一个你不想错过的帖子！");
tx.addTag("Topic:Amazing", "Amazing");
tx.addTag("Type", "blog-post");

await arweave.transactions.sign(tx, jwk);
await arweave.transactions.post(tx);
```

  </CodeGroupItem>
  <CodeGroupItem title="@irys/sdk">

```js
await irys.upload(mydata, [
	{ name: "Content-Type", value: "text/html" },
	{ name: "Title", value: "关于交易标签的我令人难以置信的帖子" },
	{ name: "Description", value: "这是一个你不想错过的帖子!" },
	{ name: "Topic:Amazing", value: "Amazing" },
	{ name: "Type", value: "blog-post" },
]);
```

  </CodeGroupItem>
</CodeGroup>

## 总结

了解事务标签如何纳入 Arweave 技术堆栈可以提供有关如何使用 Permaweb 作为应用程序平台解决问题的背景信息。标签提供了一种工具来使用和创建通用数据标准和模式，以鼓励 Permaweb 上的非竞争性数据体验。结果使生态系统的用户可以选择应用程序来消费和创建内容，因为他们的数据始终在用户而不是应用程序中。
