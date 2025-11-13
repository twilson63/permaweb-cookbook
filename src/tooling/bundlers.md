# Bundling Services

With bundling services users can post their data transactions to a bundling service to have it "bundled" together with other users transactions and posted as a single Arweave transaction in an upcoming Arweave block.

## What is a bundle?

A description of transaction bundles and their benefits can be found [here](../fundamentals/transactions/bundles.md).

Bundles follow the [ANS-104 standard](https://specs.arweave.dev/?tx=xwOgX-MmqN5_-Ny_zNu2A8o-PnTGsoRb_3FrtiMAkuw), which defines how multiple data items can be efficiently packaged together into a single Arweave transaction. This enables:

- **Cost Efficiency**: Multiple small transactions can be bundled together, reducing overall transaction costs
- **Scalability**: Higher throughput by processing many data items in a single base layer transaction
- **Flexibility**: Support for different payment tokens while the bundler handles AR token payments

## What is a Bundler node?

A bundler is a node which is responsible for accepting transactions or data items from users, bundling them, and posting them to the Arweave network (with a guarantee they will be uploaded with a specific transaction ID).

### Key Bundling Services:

#### Turbo
- **Repository**: [Turbo Upload Service](https://github.com/ardriveapp/turbo-upload-service/)
- **Description**: A high-performance bundling service developed by ArDrive
- **Features**: Fast upload processing, reliable data persistence, and efficient bundling
- **Integration**: Widely used across the Arweave ecosystem for production applications

### How Bundlers Work

1. **Data Acceptance**: Bundlers receive data items from users along with payment
2. **Validation**: Each data item is validated for proper formatting and signatures
3. **Bundling**: Multiple data items are packaged together using ANS-104 standard
4. **Network Submission**: The bundle is submitted to Arweave as a single base layer transaction
5. **Persistence Guarantee**: Bundlers ensure data is stored until confirmed on-chain

## Supporting Multiple Currencies

A key feature of bundling services is that because they pay for the base Arweave transaction to be posted (using AR tokens) they can choose to enable payments of storage fees on a variety of different tokens. This is the main entry point for other chains to enable Arweave's permanent storage for their users.

### Payment Token Support

Bundlers can accept various cryptocurrencies for payment while handling the AR token requirements internally:

- **Native AR tokens**: Direct payment in Arweave's native currency
- **Ethereum tokens**: ETH, USDC, DAI, and other ERC-20 tokens
- **Solana tokens**: SOL and SPL tokens
- **Other chains**: Support varies by bundler implementation

### Benefits for Developers

- **Simplified Integration**: Developers don't need to manage AR tokens directly
- **User Experience**: Users can pay with familiar tokens from their preferred chains
- **Cost Predictability**: Bundlers often offer fixed pricing in stable currencies
- **Automatic Handling**: Bundlers manage all Arweave network interactions

## Data Verification and Integrity

Modern bundling services implement comprehensive verification systems:

- **Signature Verification**: All data items must be properly signed
- **Data Root Verification**: Bundle contents are cryptographically verified against Arweave chain data
- **Background Verification**: Continuous validation ensures data integrity over time
- **Chunk-based Retrieval**: Data can be retrieved and verified through Arweave's chunk system

## Code Examples

### Using Turbo SDK

#### Basic Upload with Turbo

::: collapsible-code Basic Upload Example

```javascript
import { TurboFactory, ArweaveSigner } from '@ardrive/turbo-sdk';

// Initialize Turbo client
const turbo = TurboFactory.authenticated({
  privateKey: yourPrivateKey, // JWK or raw private key
});

// Upload data
async function uploadData() {
  const data = Buffer.from('Hello, Arweave!');
  
  try {
    const uploadResult = await turbo.uploadFile({
      fileStreamFactory: () => Readable.from(data),
      fileSizeFactory: () => data.length,
      signal: AbortSignal.timeout(10_000), // 10 second timeout
      dataItemOpts: {
        tags: [
          { name: 'Content-Type', value: 'text/plain' },
          { name: 'App-Name', value: 'MyApp' },
        ],
      },
    });
    
    console.log('Upload successful:', uploadResult.id);
    return uploadResult.id;
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

:::

#### Upload with Payment (ETH)

::: collapsible-code Upload with Ethereum Payment

```javascript
import { TurboFactory } from '@ardrive/turbo-sdk';
import { EthereumSigner } from 'arbundles';

// Using Ethereum wallet for payment
const turbo = TurboFactory.authenticated({
  signer: new EthereumSigner(ethereumPrivateKey),
  token: 'ethereum', // Pay with ETH
});

async function uploadWithEthPayment() {
  const data = JSON.stringify({ message: 'Hello from Ethereum!' });
  
  // Check balance first
  const balance = await turbo.getBalance();
  console.log('Current balance:', balance);
  
  // Get upload cost
  const cost = await turbo.getUploadCosts({
    bytes: [Buffer.byteLength(data)],
  });
  console.log('Upload cost:', cost);
  
  // Fund account if needed
  if (balance.winc < cost.winc) {
    await turbo.topUpWithTokens({
      tokenAmount: cost.winc,
    });
  }
  
  // Upload
  const result = await turbo.uploadFile({
    fileStreamFactory: () => Readable.from(Buffer.from(data)),
    fileSizeFactory: () => Buffer.byteLength(data),
    dataItemOpts: {
      tags: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'Payment-Method', value: 'ethereum' },
      ],
    },
  });
  
  return result.id;
}
```

:::

### Using arbundles Library

#### Create and Upload Bundle Manually

::: collapsible-code Manual Bundle Creation and Upload

```javascript
import { DataItem, createData, bundleAndSignData } from 'arbundles';
import Arweave from 'arweave';

// Initialize Arweave client
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

async function createAndUploadBundle() {
  // Create multiple data items
  const dataItems = [];
  
  // First data item
  const item1 = createData('Hello World!', yourSigner, {
    tags: [
      { name: 'Content-Type', value: 'text/plain' },
      { name: 'App-Name', value: 'BundleExample' }
    ]
  });
  await item1.sign(yourSigner);
  dataItems.push(item1);
  
  // Second data item
  const item2 = createData(JSON.stringify({ foo: 'bar' }), yourSigner, {
    tags: [
      { name: 'Content-Type', value: 'application/json' },
      { name: 'Data-Type', value: 'metadata' }
    ]
  });
  await item2.sign(yourSigner);
  dataItems.push(item2);
  
  // Create bundle
  const bundle = await bundleAndSignData(dataItems, yourSigner);
  
  // Upload to Arweave
  const transaction = await arweave.createTransaction({
    data: bundle.getRaw()
  });
  
  transaction.addTag('Bundle-Format', 'binary');
  transaction.addTag('Bundle-Version', '2.0.0');
  
  await arweave.transactions.sign(transaction, yourWallet);
  await arweave.transactions.post(transaction);
  
  console.log('Bundle uploaded:', transaction.id);
  return {
    bundleId: transaction.id,
    items: dataItems.map(item => item.id)
  };
}
```

:::

### React Component Example

::: collapsible-code React File Uploader Component

```jsx
import React, { useState } from 'react';
import { TurboFactory } from '@ardrive/turbo-sdk';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  
  const turbo = TurboFactory.authenticated({
    privateKey: process.env.REACT_APP_ARWEAVE_KEY,
  });
  
  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    try {
      const result = await turbo.uploadFile({
        fileStreamFactory: () => file.stream(),
        fileSizeFactory: () => file.size,
        dataItemOpts: {
          tags: [
            { name: 'Content-Type', value: file.type },
            { name: 'File-Name', value: file.name },
            { name: 'Upload-Timestamp', value: Date.now().toString() },
          ],
        },
      });
      
      setUploadResult(result);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
      />
      <button 
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload to Arweave'}
      </button>
      
      {uploadResult && (
        <div>
          <p>Upload successful!</p>
          <p>Transaction ID: {uploadResult.id}</p>
          <p>Access URL: https://arweave.net/{uploadResult.id}</p>
        </div>
      )}
    </div>
  );
}
```

:::

### Node.js Batch Upload

::: collapsible-code Node.js Batch Directory Upload

```javascript
import fs from 'fs';
import path from 'path';
import { TurboFactory } from '@ardrive/turbo-sdk';

async function batchUploadDirectory(directoryPath) {
  const turbo = TurboFactory.authenticated({
    privateKey: process.env.ARWEAVE_PRIVATE_KEY,
  });
  
  const files = fs.readdirSync(directoryPath);
  const results = [];
  
  for (const filename of files) {
    const filePath = path.join(directoryPath, filename);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile()) {
      console.log(`Uploading: ${filename}`);
      
      try {
        const result = await turbo.uploadFile({
          fileStreamFactory: () => fs.createReadStream(filePath),
          fileSizeFactory: () => stats.size,
          dataItemOpts: {
            tags: [
              { name: 'File-Name', value: filename },
              { name: 'Content-Type', value: getContentType(filename) },
              { name: 'File-Size', value: stats.size.toString() },
              { name: 'Upload-Batch', value: 'directory-upload' },
            ],
          },
        });
        
        results.push({
          filename,
          transactionId: result.id,
          size: stats.size,
        });
        
        console.log(`✓ ${filename} uploaded: ${result.id}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${filename}:`, error);
      }
    }
  }
  
  return results;
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.txt': 'text/plain',
    '.json': 'application/json',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
  };
  return types[ext] || 'application/octet-stream';
}
```

:::

### Check Upload Status

::: collapsible-code Upload Status Verification

```javascript
async function checkUploadStatus(transactionId) {
  const turbo = TurboFactory.unauthenticated();
  
  try {
    // Check if data item exists
    const status = await turbo.getUploadStatus({ id: transactionId });
    console.log('Upload status:', status);
    
    // Alternative: Check directly with Arweave
    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https'
    });
    
    const txStatus = await arweave.transactions.getStatus(transactionId);
    console.log('Transaction status:', txStatus);
    
    return {
      exists: status !== null,
      confirmed: txStatus.confirmed,
      blockHeight: txStatus.confirmed?.block_height,
    };
  } catch (error) {
    console.error('Status check failed:', error);
    return { exists: false, confirmed: false };
  }
}
```

:::

## Integration with AR.IO Gateways

AR.IO gateways provide enhanced support for bundled data:

- **Automatic Unbundling**: Gateways can automatically extract and index data items from bundles
- **Optimistic Indexing**: Data items can be made available before final confirmation
- **Peer-to-Peer Retrieval**: Enhanced data availability through gateway networks
- **Caching**: Intelligent caching systems improve data access performance

### Accessing Bundled Data via Gateways

::: collapsible-code Gateway Data Access

```javascript
// Access data through AR.IO gateway
const gatewayUrl = 'https://arweave.net'; // or your preferred gateway
const transactionId = 'your-transaction-id';

// Direct access
const response = await fetch(`${gatewayUrl}/${transactionId}`);
const data = await response.text();

// With metadata
const headResponse = await fetch(`${gatewayUrl}/${transactionId}`, {
  method: 'HEAD'
});
const contentType = headResponse.headers.get('Content-Type');
const bundleFormat = headResponse.headers.get('Bundle-Format');
```

:::
