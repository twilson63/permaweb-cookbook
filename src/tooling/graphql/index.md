---
title: "GraphQL Tools"
description: "Tools and libraries for querying Arweave data using GraphQL"
---

# GraphQL Tools

This section covers the tools and libraries available for querying Arweave data using GraphQL. GraphQL provides a powerful and flexible way to retrieve exactly the data you need from the Arweave network.

## Core GraphQL Tools

**[ar-gql](ar-gql.md)** - JavaScript Library
- Lightweight GraphQL client for Arweave
- TypeScript support
- Easy integration with web applications
- Comprehensive query building

**[Querying Arweave](/tooling/querying-arweave.md)** - Comprehensive Guide
- Complete overview of Arweave querying methods
- GraphQL query examples and patterns
- Best practices for data retrieval

## Advanced Querying

**[Goldsky Search Gateway](search-indexing-service.md)** - Search & Indexing
- Advanced search capabilities
- Full-text search across Arweave data
- Indexing and aggregation features
- High-performance querying

## Getting Started

### Basic GraphQL Query
```javascript
import { gql } from 'ar-gql'

const query = gql`
  query {
    transactions(
      owners: ["YOUR_WALLET_ADDRESS"]
      first: 10
    ) {
      edges {
        node {
          id
          block {
            height
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`
```

### Query Patterns

**Transaction Queries**
- Filter by owner, recipient, or tags
- Retrieve transaction metadata and content
- Search across time ranges

**Block Queries**
- Get block information and statistics
- Query network state at specific heights
- Analyze network activity

**Bundle Queries**
- Access bundled transactions
- Query bundle metadata
- Retrieve nested transaction data

## Best Practices

1. **Use Specific Queries**: Request only the data you need
2. **Implement Pagination**: Handle large result sets efficiently
3. **Cache Results**: Store frequently accessed data locally
4. **Error Handling**: Implement robust error handling for network issues
5. **Rate Limiting**: Respect API rate limits and implement backoff strategies

## Next Steps

- **Start with ar-gql**: [ar-gql Library](ar-gql.md)
-  **Learn Querying**: [Querying Arweave](/tooling/querying-arweave.md)
-   **Advanced Search**: [Goldsky Search Gateway](search-indexing-service.md)
