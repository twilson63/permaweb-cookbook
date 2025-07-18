# SmartWeave

> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

## What is SmartWeave?

SmartWeave is the name given to the dominant SmartContract paradigm on Arweave. A unique property of SmartWeave contracts is that the current state of the contract is provided by a process of "lazy evaluation". This means that instead of Arweave mining nodes constantly evaluating the current state of all contracts, a client reading a contract evaluates the state for themselves.

## Why is SmartWeave important?

The state and logic of decentralized applications need to be as censorship-resistant, permanent, and verifiable as the rest of their data. SmartWeave enables developers to write smart contracts that encapsulate their apps state and logic on-chain and execute it in a trustless verifiable way. This is no small feat as the Arweave protocol does not include incentives for nodes to evaluate smart contract state for the network.

SmartWeave provides an immutable append-only pattern for contract interactions that leverage permanent storage to hold onto their state. The result is a fully decentralized on-chain state machine that can give protocols and applications dynamic functionality in a permissionless and trustless way. By using SmartWeave, developers can create smart contracts that are stored on Arweave and are guaranteed not to change over time. This allows them to build [Permaweb applications](/concepts/permawebApplications.md) with dynamic functionality that can be used in a permissionless and trustless manner.

There are several reasons why developers might choose to use SmartWeave to implement the logic for their permaweb applications:

- **Decentralized storage:** SmartWeave is built on Arweave, which means that applications created using SmartWeave will be stored on a distributed network of nodes rather than on a centralized server. This can make them more resistant to censorship, tampering, and other forms of interference.

- **Lazy evaluation:** The lazy evaluation feature of SmartWeave contracts allows for efficient and scaleable execution. Instead of Arweave nodes constantly evaluating the state of a contract, the client reading the contract is responsible for evaluating the state, leveraging the users processing power instead of the networks nodes.

- **Language support:** SmartWeave supports a range of programming languages, including JavaScript, TypeScript, Rust, Go, AssemblyScript, and WASM (WebAssembly). This allows developers to use the language they are most familiar with when creating SmartWeave applications.

- **Data durability:** Arweave is designed to store data in a way that makes it highly durable and long-lasting. This can be useful for applications that need to store data over a long period of time, such as historical records or scientific data.

- **Economic model:** Arweave uses a unique economic model based on the concept of permanent storage that incentivizes miners to store data indefinitely. This can help ensure the long-term viability and durability of permaweb applications created using SmartWeave.

## How does SmartWeave Work?

SmartWeave contracts, at their core, are built from an initial contract state, with edits, additions, and subtractions using transaction tags. 

SmartWeave SDK's such as `Warp` (previously `RedStone`), are used to query for these transactions to build contract state locally, modifying the contract state with each transaction. The Evaluator (`Warp`) uses tags to query for a contracts transactions; It knows a transaction is part of the contract by way of the App-Name tag, and the Contract tag.  

Here is an example of a contract **interaction** .
- The `App-Name` says its a Smartweave **ACTION** . 
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
And here is an example of a **contract** . 
- The `App-Name` says its a Smartweave **CONTRACT**
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

The resulting state is the current contract state, which the SDK on the client side can use to calculate user balances, contract owners, and other contract specific details. Once the caller has a validated contract state they can build an interaction for the user to deploy to the chain, which upon mining or indexing on a [Gateway](/concepts/gateways.md) will be included the next time someone builds the contract state.

For a comprehensive overview of the SmartWeave Protocol, its leading implementation Warp Contracts, and more, head to [Warp Academy](https://academy.warp.cc/). Dive into step-by-step tutorials, explore advanced concepts, and uncover how SmartWeave power up the permaweb!

## Smartweave ecosystem projects

There's quite a few ecosystem projects leveraging SmartWeave SmartContracts, but here are some of notes:

### Implementations
- [Warp](https://warp.cc/) | Main provider of SmartWeave SDK's, tutorials, and helps maintain the SmartWeave protocol.
- [MEM](https://www.mem.tech/) | Molecular Execution Machine (MEM) is a developer platform that powers the creation and usage of highly available and highly performant applications within a decentralized environment.

### Tools
- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeave contract explorer, created and hosted by Warp.

### Resources
- [Warp Academy](https://academy.warp.cc/) | A one-stop shop for all things SmartWeave

### Apps
- [Permapages](https://permapages.app/) | Permanent webpage creation tool, ArNS purchase portal, and ANT creation portal. Your profile on the permaweb.
- [ArNS](arns.md) | Arweave Name System <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | NoSQL Database as a Smart Contract.
- [KwilDB](https://docs.kwil.com/)| SQL Database as a Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Get PST's for uploading thru Ardrive.
- [FirstBatch](https://www.firstbatch.xyz/) | FirstBatch aids developers and enterprises in creating personalized, private, and distortion-free AI applications.
- [Othent](https://othent.io/) | Web3 transactions with existing traditional social logins.
- [BazAR](https://bazar.arweave.dev/) | Digital content marketplace with real-world rights.
- [Alex the Archieve](https://alex.arweave.dev/) | A decentralized archival platform utilizing Arweave's immutable storage.

and so much more.
