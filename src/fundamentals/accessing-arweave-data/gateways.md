
# Gateways in the Arweave Network

Gateways serve as the interface between the Arweave network and end-users, making permaweb data easily accessible through standard web browsers. Often described as the "front door to the permaweb," these services allow users to interact with blockchain-stored content in a familiar web-like experience.

When you access content on Arweave, you typically use a URL structure like:

```
https://<gateway>/<tx>
```

This allows HTML files to render as web pages, images to display properly, and other data types to be served appropriately—creating an experience similar to the traditional web despite the content being stored on a decentralized network.

## Key Functions of Gateways

Gateways provide several critical services beyond basic content delivery:

- **Content Caching**: Store frequently accessed transactions to improve performance
- **Data Indexing**: Provide GraphQL interfaces for querying transactions by tags and metadata
- **Network Seeding**: Help distribute transactions throughout the Arweave network
- **Content Moderation**: Apply content policies to determine which data is served

## Relationship to Core Protocol

It's important to understand that gateways are **not part of the core Arweave protocol**. This distinction has several implications:

- Operating a gateway is separate from running a node that secures the network
- There is no built-in protocol-level incentive structure for gateway operators
- Gateway services can implement their own economic models and incentives
- Applications can operate their own gateways for improved performance

This separation allows for a more flexible and decentralized ecosystem where different gateway operators can experiment with various service models.

## Popular Gateway Services

Several gateway services currently serve the Arweave ecosystem:

- [arweave.net](https://arweave.net/) - Operated by the Arweave team
- [arweave.world](https://cookbook.arweave.world/)
- [arweave.asia](https://cookbook.arweave.asia)
- [arweave.live](https://arweave.live/)
- [g8way.io](https://g8way.io)

The AR.IO project is working to make gateway operation more accessible, potentially increasing the decentralization of access points to the network.

## Further Reading

- [ArWiki Gateway Documentation](https://arwiki.wiki/#/en/gateways)
- [AR.IO Project](https://ar.io/)
