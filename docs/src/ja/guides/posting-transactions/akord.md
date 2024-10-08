---
locale: ja
---
# Posting Transactions using Akord

Posting transactions to Arweave can be done directly via Akord API, no new dependencies in your code, just a simple HTTP.

## Getting Started

You just need two things to get started:

- [Create your Akord account (100 MB free)](https://v2.akord.com/signup)

- [Get your API key here](https://v2.akord.com/account/developers)

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

That's it! You just uploaded the file to Arweave. Here is the example response body:

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

## Resources
- For an overview of all the ways you can post transactions, see the [Posting Transactions](../../concepts/post-transactions.md) section of the cookbook.
- More examples of how to upload files to Arweave with Akord API can be found [here](https://docs.akord.com/api-and-dev-tools/quickest-way-to-upload-to-arweave).
- Full documentation of Akord API can be found [here](https://api.akord.com/docs).
- More about bundles [ANS-104 Standard](https://specs.g8way.io/#/view/xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw)