---
locale: ja
---
# Akordを使用したトランザクションの投稿

Akord APIを介してArweaveにトランザクションを直接投稿できます。新しい依存関係をコードに追加することなく、シンプルなHTTPで済みます。

## はじめに

始めるには、以下の2つが必要です：

- [Akordアカウントを作成（100MB無料）](https://v2.akord.com/signup)

- [こちらでAPIキーを取得](https://v2.akord.com/account/developers)

## HTTP API

```js
import fs from "fs";

const data = fs.readFileSync('PATH_TO_YOUR_FILE_HERE');

// add some custom tags to the transaction
const tags = [
    {
        name: "Title",
        value: "My first Arweave file"
    },
    {
        name: "Type",
        value: "image"
    }
];

// encode tags to base64
const jsonTags = JSON.stringify(tags);
const encodedTags = Buffer.from(jsonTags).toString('base64');

const response = await fetch('https://api.akord.com/files', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Api-Key': 'YOUR_API_KEY_HERE',
        'Content-Type': 'YOUR_FILE_MIME_TYPE_HERE', // see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
        'Tags': encodedTags
    },
    body: data
});
const body = await response.json();
console.log(body);
```

これで完了です！ファイルをArweaveにアップロードしました。以下は、レスポンスボディの例です：

```json
{
    "id": "a6f1fbfc-403d-4607-b648-4b949fdd50bd", 
    // technical id of upload. can be used to get metadata of the upload or file binary from Akord cache
    "mimeType": "image/jpeg", // depends on content-type of upload, goes as a tag
    "sizeInBytes": 437432,
    "cloud": {
        "uri": "a6f1fbfc-403d-4607-b648-4b949fdd50bd", // same as ID
        "url": "https://api.akord.com/files/a6f1fbfc-403d-4607-b648-4b949fdd50bd", // url to binary served from Akord cache
    },
    "tx": {
        "id": "LAWVdsBRTkUF8ptiEwiU6n4Q-_5ukBJIFmeAllX7Q0E", // fixed ID of Arweave transaction (ANS-104 data item ID)
        "status": "scheduled", // indicates where is your file in Arweave bundling context:
        // scheduled - file is in Akord cache and is scheduled for ANS-104 bundling
        // verification - file is being verified for malicious content
        // blocked - file is recognized as malicious, won't go to Arweave
        // bundled - file is bundled and is scheduled for posting
        // pending - file was posted to Arweave
        // committed - file is confirmed on Arweave
        // rejected - this indicates a technical problem with our bundling service
        "tags": [
          {
            "name": "Title",
            "value": "My first Arweave file"
          },
          {
            "name": "Type",
            "value": "image"
          },
          {
            "name": "Content-Type",
            "value": "image/jpeg"
          }
        ], // your Arweave tags appended to transaction
        "statusUrl": "https://api.akord.com/files/a6f1fbfc-403d-4607-b648-4b949fdd50bd/status",
        // check file status endpoint, returns similar JSON schema
        "gatewayUrls": [
            "https://arweave.net/LAWVdsBRTkUF8ptiEwiU6n4Q-_5ukBJIFmeAllX7Q0E",
            // this url will only work when file is in 'committed' status
            "https://akrd.net/LAWVdsBRTkUF8ptiEwiU6n4Q-_5ukBJIFmeAllX7Q0E"
            // Akord instance of Arweave gateway - this url will work always, even right after upload since it falls back to Akord cache when file is not yet on Arweave
        ],
        "viewblockUrl": "https://viewblock.io/arweave/tx/LAWVdsBRTkUF8ptiEwiU6n4Q-_5ukBJIFmeAllX7Q0E", // see your file on ViewBlock - this url will only work when file is in 'committed' status & indexed by ViewBlock
        "info": "Transaction is visible on the blockchain indexers when in the \"committed\" status.",
    }
}
```

## リソース
- トランザクションを投稿する方法の概要は、[Posting Transactions](../../concepts/post-transactions.md)セクションを参照してください。
- Akord APIを使用してArweaveにファイルをアップロードする方法のさらなる例は、[こちら](https://docs.akord.com/api-and-dev-tools/quickest-way-to-upload-to-arweave)で見つけられます。
- Akord APIの完全なドキュメントは、[こちら](https://api.akord.com/docs)で確認できます。
- バンドルに関する詳細は、[ANS-104 Standard](https://specs.g8way.io/#/view/xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)をご覧ください。