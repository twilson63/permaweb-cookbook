# SmartWeave

## What is SmartWeave?

SmartWeave is the name given to the dominant SmartContract paradigm on Arweave. A unique property of SmartWeave contracts is that the current state of the contract is provided by a process of "lazy evaluation". This means that instead of Arweave mining nodes constantly evaluating the current state of all contracts, a client reading a contract evaluates the state for themselves. SmartWeave contracts currently support JavaScript, TypeScript, Rust, Go, AssemblyScript, and WASM (WebAssembly).

## Why is SmartWeave important?

SmartWeave is an important part of the Arweave ecosystem - it allows transfer of ownership of Atomic assets (NFTs) and updatable ledger-like record keeping.

## How does SmartWeave Work?

SmartWeave contracts, at their core, are built from an initial contract state, with edits and additions using transaction tags. SmartWeave SDK's (such as Warp {previously RedStone} and the legacy SmartWeave SDK) are used to query for these transactions to build contract state locally, adding or subtracting from the contract state with each transaction in order from oldest to newest. The resulting state is the current contract state, which the SDK on the client side can use to calculate user balances, contract owners, and other contract specific details. Once the caller has a validated contract state they can build an interaction for the user to deploy to the chain, which upon mining or indexing on a gateway (see gateway Core Concept) will be included the next time someone builds the contract state. 

## Smartweave ecosystem projects

Theres quite a few ecosystem projects leveraging SmartWeave SmartContracts, but here are some of note:

- [Warp](https://warp.cc/) | Main provider of SmartWeave SDK's, tutorials, and helps maintain the SmartWeave protocol.
- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeave contract explorer, created and hosted by Warp.
- [WeaveDB](https://weavedb.dev/) | NoSQL Database as a Smart Contract.
- [KwilDB](https://docs.kwil.com/)| SQL Database as a Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Get PST's for uploading thru Ardrive. 
- [Permapages](https://permapages.app/) | Permanent webpage creation tool, ArNS purchase portal, and ANT creation portal. Your profile on the permaweb.
- [ArNS](/concepts/arns.html) // todo: update to arns portal when portal is released
- [EXM](https://docs.exm.dev/) | Execution Machine (EXM) is a developer platform that powers the creation and usage of highly available and highly performant applications within a decentralized environment.
