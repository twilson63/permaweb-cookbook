# Accessing Arweave Data

One of Arweave's core strengths is permanent data storage, but stored data is only valuable if it can be efficiently discovered and retrieved. Arweave provides multiple methods for accessing data, each optimized for different use cases and requirements.

## Data Access Fundamentals

All data on Arweave is accessible through **gateways** - HTTP endpoints that serve as bridges between users and the Arweave network. These gateways expose various interfaces and methods for retrieving data:

- **Direct data retrieval** - Access data by transaction ID
- **Query interfaces** - Search and filter data based on metadata
- **Name resolution** - Access data through human-readable names
- **Path-based access** - Navigate data collections like websites

## Access Methods

### 1. HTTP API
The simplest way to access Arweave data is through direct HTTP requests using a transaction ID:

```
https://arweave.net/{transaction-id}
```

This method is ideal for:
- Retrieving known data by ID
- Simple integrations
- Direct data access without queries

[Learn more about Gateways & Access →](./gateways.md)

### 2. GraphQL Queries
For more complex data discovery and filtering, Arweave gateways provide GraphQL endpoints that enable sophisticated queries based on:
- Owner addresses
- Transaction tags
- Block heights
- Time ranges

GraphQL is the preferred method for:
- Searching large datasets
- Building applications that need to discover data
- Complex filtering based on metadata

[Learn more about GraphQL →](./graphql.md)

### 3. Path Manifests
Path manifests enable organizing multiple files into navigable collections, similar to traditional websites:

```
https://arweave.net/{manifest-id}/{path/to/file}
```

Use manifests for:
- Hosting websites and web applications
- Creating browsable file collections
- Organizing related content

[Learn more about Manifests →](./manifests.md)

### 4. ArNS (Arweave Name System)
ArNS provides human-readable names that resolve to Arweave transaction IDs:

```
https://{name}.arweave.dev
```

ArNS is perfect for:
- User-friendly URLs
- Updatable references to content
- Building permanent web applications

[Learn more about ArNS →](./arns.md)

## Choosing the Right Method

| Method | Best For | Example Use Case |
|--------|----------|------------------|
| **HTTP API** | Direct access by ID | Loading a specific image or file |
| **GraphQL** | Data discovery and filtering | Finding all transactions with specific tags |
| **Manifests** | Multi-file collections | Hosting a website or application |
| **ArNS** | Human-readable addressing | Creating a permanent blog or dApp |

## Gateway Infrastructure

All these access methods are provided by Arweave gateways. Gateways can be:

- **Public gateways** like `arweave.net` - Open for anyone to use
- **Private gateways** - Run by individuals or organizations for their own use
- **AR.IO gateways** - Decentralized gateway network providing enhanced features

## Next Steps

- [Set up gateway access](./gateways.md) for your application
- [Query data with GraphQL](./graphql.md) to build dynamic applications
- [Create path manifests](./manifests.md) for organizing content
- [Register ArNS names](./arns.md) for user-friendly addressing

## Additional Resources

- [Querying Arweave Guide](../../guides/querying-arweave/querying-arweave.md)
- [GraphQL Reference](../../references/gql.md)