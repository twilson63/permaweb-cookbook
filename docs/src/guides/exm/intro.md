# Execution Machine (EXM)

**Execution Machine (EXM)** is a developer platform that provides the ability to create and leverage **blockchain-based (permanent) serverless functions** without the need for knowledge of or access to blockchain technologies like wallets and tokens.

This further enables the creation of **composable**, **immutable** and **trustless** applications in a frictionless manner.

## Serverless Functions on Arweave

Serverless functions are stored on Arweave through the intermediary EXM that also stores a copy as cache to rapidly serve applications at any time. The functions are stateful (store data) and hence, a single function id points to some data as well as the logic for interacting and updating this data.

EXM handles the storage and execution, eliminating the need for maintaining a dedicated server, reducing upkeep costs and adding a layer of modularity.

The modularity also brings in composability to select and assemble functions in various combinations to create custom applications suited to our requirements. These functions, and interactions with them, are **permanently stored on chain**, they cannot be tampered with and are available for anyone to view, making them **immutable** and **trustless**.

Additionally, EXM covers the cost for uploading the data to Arweave and making the process crypto agnostic for devs.

![Functions on dedicated servers vs serverless functions on blockchains](~@source/images/exm-serverless-functions.png)

## How does it work in the background?

A user sends a transaction request to a dedicated EXM server. With the help of Verifiable Computing, Execution Machine is able to process user requests in a quick and performant manner, eliminating the need for blockchain technology like tokens and wallets, while still maintaining a decentralised result. EXM then updates its cache layer with the updated state while also uploading the data to Arweave. The cache layer is used as an aid to rapidly serve applications at any time.

Additionally, EXM is able to maintain a trust minimised environment as users can verify the transactions and current state of the contract/ functions using Lazy Evaluation.

<details>
<summary><strong>Verifiable Computing Explained</strong></summary>

<strong>Verifiable computing</strong> is a form of computing that takes advantage of the benefits of centralised system while still guaranteeing a decentralised result.

Every serverless function either has the ability to read or update the state of some information. Using verifiable computing, this state is cached in a centralised server which allows for greater performance as consensus is not needed at the time of processing, but the information is always available for verification by the users. This allows users to “lazily evaluate” even when it is stored on the cache layer before eventually being moved on chain.

![Verifiable Computing Explained](~@source/images/exm-verifiable-computing.png)

For verifiable computing to work seamlessly, some core parts must be implemented.

- <strong>Executor</strong>: A software that processes user transaction requests and caches them.
- <strong>Processor</strong>: A centralised pipeline (system) responsible for receiving transactions by a single or multiple users. After receiving the different bulks of transactions sent, processor must re-evaluate the smart contract with the new data. As transactions are received, the latest state of the smart contract must be upgraded and saved with accessibility to the user. The processor is responsible for ordering the transactions, usually by timestamp.
- <strong>Conveyor</strong>: A centralised system that establishes a bridge between a data-based blockchain. All the transactions received by the processor must be sent to the conveyor, the conveyor will guarantee the success of storing these operations in a data-based blockchain like Arweave.
</details>
<br/>

<details>
<summary><strong>Lazy Evaluation Explained</strong></summary>

![Lazy Evaluation Explained](~@source/images/exm-lazy-evaluation.png)

<strong>Lazy evaluation</strong>, as the name suggests, is a method for lazily evaluating smart contracts and their current state on the blockchain. The smart contract itself and any interactions (write operations) with them are stored on chain and can be accessed by any user.

It aims to shift the burden of processing from the nodes to the users. The user can opt to evaluate and interpret the smart contract code and interactions with it locally to verify the current state of the contract.

This eliminates the need for nodes to store the full copy of the current state of a chain and arrive at a consensus on it. Thus, reducing the cost and improving performance, respectively.

As everyone has access to the same data, everyone will interpret the it in the same way ensuring everyone has access to the same current state of information.
</details>
<br/>

## Advantages of using Serverless Functions

- Serverless functions add a layer of modularity and can be composed as per various application requirements.
- Bug fixes and new feature integrations are easier to implement by targeting.
- Execution Machine has a cached layer for rapidly serving applications.
- Execution Machine leverages a centralised system while guaranteeing a decentralised result.
- Execution Machine seeks to be crypto agnostic.