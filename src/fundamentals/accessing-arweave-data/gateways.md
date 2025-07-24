# Gateways

---

Data uploaded to the Arweave network (or the [permaweb](https://cookbook.arweave.dev/concepts/permaweb.html)) isn't always immediately easy to work with.

### What is a Gateway?

Gateways are sometimes referred to as the "front door to the permaweb". They act as an interface between Arweave and end-users, making it easy to access data or use permaweb applications from your web browser.

For example, accessing a HTML file stored on Arweave will be displayed as a web page in your browser. The same goes for viewing images, downloading files, viewing JSON data, or any other file stored on Arweave. This makes interacting with the permaweb very similar to using the traditional web. 

### Other Roles of Gateways

Other than serving data for users to access, gateways offer other services such as:

- Caching frequently accessed data and transactions
- Indexing and querying transactions (through Arweave tags and a GraphQl interface)
- Seeding transactions throughout the Arweave network
- Content moderation (content policies to choose which data is or isn't served)

### Gateways and the Arweave Protocol

Although gateways play a large role in allowing content to be accessed on Arweave, they are **not** part of the core protocol.

This means hosting and running gateways is separate to running a node securing the Arweave network (although are frequently done together).

As gateways are not part of the core protocol, there is no built-in incentive structure like the rewards or incentives for mining. This allows gateway operators or external services to choose how they want to structure their incentive system, leading to a more decentralized and democratic model. Individual applications could even operate their own gateway to allow for better caching and performance of their permaweb applications.

Some popular gateways include [arweave.net](https://arweave.net/) ran by the Arweave team, and others like [arweave.world](https://cookbook.arweave.world/) [arweave.asia](https://cookbook.arweave.asia) [arweave.live](https://arweave.live/), and [g8way.io](https://g8way.io). However, operating gateways is being made easier and more accessible through teams such as [AR.IO](https://ar.io/). 

### Sources and Further Reading

- [ArWiki](https://arwiki.wiki/#/en/gateways)
- [AR.IO](https://ar.io/)