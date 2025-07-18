# GraphQL Gateways

GraphQL gateways provide a powerful query interface for exploring transaction data on Arweave. While not required for every permaweb application, GraphQL can significantly enhance data discovery and analysis capabilities.

## Tools & Libraries

- **[ar-gql](./ar-gql.md)** - Minimal GraphQL client for Arweave with parameterized queries

## Gateway Options

### Public Gateways
- **Goldsky** - High-performance GraphQL gateway
- **ArDB** - Community-maintained GraphQL service

### Specialized Gateways
- **[Goldsky Search GraphQL Gateway](../guides/querying-arweave/search-indexing-service.md)** - Enhanced GraphQL gateway with fuzzy search, wildcard matching, and advanced filtering capabilities

## When to Use GraphQL

- Complex data queries and filtering
- Data analytics and reporting
- Building explorers and indexing services
- Advanced transaction search functionality

## When to Use Goldsky Search Gateway

- Multi-tag searches requiring faster response times
- Fuzzy or wildcard search requirements
- Need for advanced filtering options (L1-only transactions, result counts)
- Backwards compatibility with standard Arweave GraphQL syntax

## Alternatives

For simple applications, consider:
- Direct HTTP API calls
- Arweave-js SDK for basic queries
- Custom indexing solutions