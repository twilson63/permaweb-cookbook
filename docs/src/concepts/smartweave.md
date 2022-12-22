# SmartWeave

## What is SmartWeave?

SmartWeave is the name given to the dominant SmartContract paradigm on Arweave. A unique property of SmartWeave contracts is that the current state of the contract is provided by a process of "lazy evaluation". This means that instead of Arweave mining nodes constantly evaluating the current state of all contracts, a client reading a contract evaluates the state for themselves.

## Why is SmartWeave important?

To build decentralized applications, you need to have business logic stored in a persistent layer that is guaranteed not to change over time and is cryptographically verified on the chain. This business logic is called a "Smart Contract"; this "Contract" defines the business rules for some functionality for a protocol or application. Additionally, you need to be able to store the state or data of the contract on chain; SmartWeave provides an immutable append-only pattern that leverages permanent storage to hold this state. The result is a fully decentralized on-chain state machine that can give protocols and applications dynamic functionality in a permissionless and trustless way.

By using SmartWeave, developers can create smart contracts that are stored on Arweave and are guaranteed not to change over time. This allows them to build [Permaweb applications](/concepts/permaweb-apps) with dynamic functionality that can be used in a permissionless and trustless manner.

There are several reasons why developers might choose to use SmartWeave to create permaweb applications:

- Decentralized storage: SmartWeave is built on Arweave, which means that applications created using SmartWeave will be stored on a distributed network of nodes rather than on a central server. This can make them more resistant to censorship, tampering, and other forms of interference.

- Lazy evaluation: The lazy evaluation feature of SmartWeave contracts allows for efficient and scalable execution. Instead of constantly evaluating the state of a contract, the client reading the contract is responsible for evaluating the state, leveraging the users processing power instead of the network nodes.

- Language support: SmartWeave supports a range of programming languages, including JavaScript, TypeScript, Rust, Go, AssemblyScript, and WASM (WebAssembly). This allows developers to use the language they are most familiar with when creating SmartWeave applications.

- Data durability: Arweave is designed to store data in a way that makes it highly durable and long-lasting. This can be useful for applications that need to store data over a long period of time, such as historical records or scientific data.

- Economic model: Arweave uses a unique economic model based on the concept of "data forever" that incentivizes miners to store data indefinitely. This can help ensure the long-term viability and durability of permaweb applications created using SmartWeave.

## How does SmartWeave Work?

SmartWeave contracts, at their core, are built from an initial contract state, with edits, additions, and subtractions using transaction tags. 

SmartWeave SDK's such as `Warp` (previously `RedStone`), are used to query for these transactions to build contract state locally, modifying the contract state with each transaction. The Evaluator (`Warp`) uses tags to query for a contracts transactions; It knows a transaction is part of the contract by way of the App-Name tag, and the Contract tag.  

Here is an example of a contract ==interaction== .
- The `App-Name` says its a Smartweave ==ACTION== . 
- The `Contract` tag gives the specific transaction ID of the initial contract state. 
- The `Input` tag gives the contract its function to execute and any other data it needs: 

```json
[
    {
        name:"App-Name"
        value:"SmartWeaveAction"
    },
    {
        name:"App-Version"
        value:"0.3.0"
    },
    {
        name:"Contract"
        value:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        name:"Input"
        value:"{
            "function":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
            }"
    }
]
```
And here is an example of a ==contract== . 
- The `App-Name` says its a Smartweave ==CONTRACT==
- The `Contract-Src` tag points to the source code of the contract:

```json
[
    {
        key:"App-Name"
        value:"SmartWeaveContract"
    },
    {
        key:"App-Version"
        value:"0.3.0"
    },
    {
        key:"Contract-Src"
        value:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        key:"SDK"
        value:"RedStone"
    },
    {
        key:"Content-Type"
        value:"application/json"
    }
]
```

The resulting state is the current contract state, which the SDK on the client side can use to calculate user balances, contract owners, and other contract specific details. Once the caller has a validated contract state they can build an interaction for the user to deploy to the chain, which upon mining or indexing on a [Gateway](/concepts/gateways) will be included the next time someone builds the contract state. 

## Smartweave ecosystem projects

Theres quite a few ecosystem projects leveraging SmartWeave SmartContracts, but here are some of note:

- [Warp](https://warp.cc/) | Main provider of SmartWeave SDK's, tutorials, and helps maintain the SmartWeave protocol.

- [Permapages](https://permapages.app/) | Permanent webpage creation tool, ArNS purchase portal, and ANT creation portal. Your profile on the permaweb.

- [ArNS](/concepts/arns.html) // todo: update to arns portal when portal is released

- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeave contract explorer, created and hosted by Warp.

- [See more Ecosystem Projects](/references/ecosystem-projects)



<!-- - [WeaveDB](https://weavedb.dev/) | NoSQL Database as a Smart Contract.
- [KwilDB](https://docs.kwil.com/)| SQL Database as a Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Get PST's for uploading thru Ardrive. 
- [EXM](https://docs.exm.dev/) | Execution Machine (EXM) is a developer platform that powers the creation and usage of highly available and highly performant applications within a decentralized environment. -->
