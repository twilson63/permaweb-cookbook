# SmartWeave

## What is SmartWeave?

The SmartWeave protocol is the smartcontract protocol for Arweave. The major difference from other blockchains - namely Ethereum, one of the leaders in smartcontract ecosystems - is Arweave nodes do not validate smartcontracts, but rather the user themselves when they interact with the contract, thru the use of "lazy-evaluation". SmartWeave contracts currently support JavaScript, TypeScript, Rust, Go, AssemblyScript, and WASM (WebAssembly).

## Why is SmartWeave important?

SmartWeave is an important part of the Arweave ecosystem - it allows transfer of ownership of Atomic assets (NFTs) and updatable ledger-like record keeping.

## How does SmartWeave Work?

SmartWeave contracts, at their core, are built from an initial contract state, with edits and additions using transaction tags. SmartWeave SDK's (such as Warp {previously RedStone} and the legacy SmartWeave SDK) are used to query for these transactions to build contract state locally, adding or subtracting from the contract state with each transaction in order from oldest to newest. The resulting state is the current contract state, which the SDK on the client side can use to calculate user balances, contract owners, and other contract specific details. Once the Dapp has a validated contract state they can build an interaction for the user to deploy to the chain, which upon mining or indexing on a gateway (see gateway Core Concept) will be included the next time someone builds the contract state. 

## Smartweave ecosystem projects

Theres quite a few ecosystem projects leveraging the smartweave protocol, but here are some of note:

- [Warp](https://warp.cc/) | Main provider of SmartWeave SDK's, tutorials, and helps maintain the SmartWeave protocol.
- [SonAr](https://sonar.warp.cc/#/app/contracts)| SmartWeave contract explorer, created and hosted by Warp.
- [WeaveDB](https://weavedb.dev/) | NoSQL Database as a Smart Contract.
- [KwilDB](https://docs.kwil.com/)| SQL Database as a Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Get PST's for uploading thru Ardrive. 
- [Permapages](https://permapages.app/) | Permanent webpage creation tool, ArNS purchase portal, and ANT creation portal. Your profile on the permaweb.
- [ArNS](/concepts/arns.html) // todo: update to arns portal when portal is released
- [EXM](https://docs.exm.dev/) | Execution Machine (EXM) is a developer platform that powers the creation and usage of highly available and highly performant applications within a decentralized environment.
