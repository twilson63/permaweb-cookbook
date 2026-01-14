# What is Arweave?

Arweave is a decentralized network and protocol built around the premise of long-term, immutable data storage.

It is designed so that users (or developers) can pay once, and retrieve their uploaded data indefinitely without ongoing 
maintenance payments. This is unlike most centralized storage providers.

Arweave is not just a layer to read and write data, but also to host websites and application data, too. 

Developers and users can access all public data uploaded to Arweave allowing for the creation of unique and interesting applications.

Arweave can offer this unique proposition due to the way it is designed. It is built on common principles of blockchain technology, which 
create incentive mechanisms for people and entities all around the world to store and serve Arweave data.

## Nodes

Like many other blockchains, Arweave is a network of connected computers (nodes). These nodes run the Arweave node software, which connects 
these computers together.

## Transactions

Users (or developers) send **transactions** to these nodes which contain data (or a value), and are shared around the network for nodes to validate and store. 

Transactions are immutable, verifiable, and tamper-proof. Together these form a public dataset that users can read and write to. Users pay for these uploads using a currency called $AR.

## Blocks and consensus

Uploaded transactions are periodically grouped into **blocks**.

Miners (node runners) "mine" or add new blocks to be confirmed and added to the Arweave ledger.

Arweave uses a structure called **blockweave**.

Arweave uses a "Proof-of-Access" based consensus algorithm, more accurately described as [SPoRA](https://coinmarketcap.com/academy/glossary/succinct-proofs-of-random-access-spora) (Succinct Proofs of Random Access). 

On Arweave, each new block references:
- The previous block
- A random older block

To mine new blocks, miners on the Arweave network must prove they are storing the previous block and one random other Arweave block. This encourages miners to store as much of the Arweave dataset as possible.

## Accounts and state

Users pay for these uploads using a currency called $AR.

Arweave keeps track of all of these uploads, including the **account** that users upload files from, any attached metadata, and their account balance in $AR.
