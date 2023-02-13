# Keyfiles and Wallets

---

### Arweave Wallets

On Arweave your account is used to keep track of your $AR balance, and interact with the Arweave
network - such as sending transactions, or using [SmartWeave Contracts](https://cookbook.arweave.dev/concepts/smartweave).

Like most blockchains, the concept of a wallet on Arweave is slightly misleading. 

Wallets do not "hold" any tokens; they keep track of balances and transactions made associated with an address. The wallet 
owner  (the person with the wallet's **private key**) can access the funds. 

### Keypair and Wallet Format

Arweave uses JWKs (JSON Web Keys) with 4096 length RSA-PSS keys to generate keypairs and wallets.

JWK (JSON Web Key) wallets are a type of digital wallet that represent cryptographic keys using objects in a JSON (JavaScript Object Notation) format. On Arweave, your keyfile represents your **private key** - which can be used to create digital signatures (such as for signing transactions), or decrypting data. 

This is an actual `json` file created from wallet services such as [Arweave.app](https://arweave.app) or generated manually through [arweave-js](https://github.com/ArweaveTeam/arweave-js).

Your private key can also be represented as a mnemonic, or **seed phrase**, which in some cases can be used as an alternative 
to sign transactions and/or recover your wallet.


### Wallet Safety

Your private key must be kept confidential at all times as it has the ability to transfer funds from your wallet. As a developer,
make sure not to include your keyfile in any public GitHub repositories or host it anywhere else publicly.
