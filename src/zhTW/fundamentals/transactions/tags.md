# 交易元資料（標籤）

Arweave 上的交易具有唯一的 ID、簽名，以及擁有者位址（即簽署並支付該筆交易發布費用的位址）。

除了這些標頭值外，Arweave 協議允許使用者為交易加入自訂標籤。這些標籤以一組 `key: value` 配對的形式附加到交易中。

自訂標籤讓查詢 Arweave 並找出包含特定標籤（或多個標籤）的所有交易成為可能。查詢與篩選交易的能力對於支援建立在 Arweave 上的應用程式至關重要。

## 什麼是交易標籤？

交易標籤是鍵值對（key-value pairs），其中以 base64URL 編碼的鍵與值的組合，對於原生 Arweave 交易而言，其總和必須小於 2048 位元組的上限。

一些常見的交易標籤範例包括：

- `Content-Type`: 用於指定內容的 MIME 類型，以便在 Permaweb 上呈現。
- `App-Name`: 此標籤描述正在寫入資料的應用程式。
- `App-Version`: 與 App-Name 配對，表示該應用程式的版本。
- `Unix-Time`: 該標籤為 Unix 時間戳，**自 Epoch 起的秒數**。
- `Title`: 用於為交易中儲存的內容指定名稱或簡短描述。
- `Description`: 用於提供內容的較長描述。

交易標籤可用於各種目的，例如為搜尋建立交易索引、將交易分類，或提供關於交易中所儲存內容的元資料。

## 關於交易標籤的重要資訊

交易標籤的鍵與值皆以 Base64URL 編碼的字串表示。這使得可以將位元組陣列作為鍵或值發布，並安全地透過 http 傳輸。雖然未解碼時對人類不可讀，但不應被視為加密。

直接發布到 Arweave 的交易標籤總大小上限為 2048 位元組。此大小由所有標籤鍵與所有標籤值串接後的長度決定。

交易標籤可以用在 GraphQL 查詢中，以回傳經過篩選的交易項目集合。

## 範例

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

標籤提供一種工具，用以採用與建立共通的資料標準與模式，從而在 Permaweb 上促進非競爭性（non-rivalrous）的資料體驗。

其結果讓生態系統的使用者可以選擇不同的應用程式來消費或創建內容，因為資料始終屬於使用者，而非應用程式。
