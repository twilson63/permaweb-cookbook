# Wallets and Keys

---

### Arweave Wallets

On Arweave a wallet secures a unique address on the blockchain. The address is used to keep track of your $AR balance, and interact with the Arweave
network - such as sending transactions, or interacting with [AO Processes](https://ao.arweave.net).

Like most blockchains, the concept of a wallet on Arweave is slightly misleading. 

A Wallet does not "hold" any tokens itself; token balances are stored on the blockchain and linked to the wallets address. Instead a wallet holds the cryptographic public-private key pair that can be used to sign transactions to post data or transfer tokens. The wallet 
owner (the person with access to the wallet's **private key**) is the only one who can sign transactions for the address and access its funds. 

### Keypair and Wallet Format

Arweave uses *4096bit* RSA-PSS key-pairs stored using the JWK (JSON Web Keys) format. The JWK format can be used to store many types of cryptographic keys, not just RSA key-pairs. 

Shown here is the contents of a JWK file which describes an RSA-PSS key-pair. The values are abbreviated so they are not accidentally used as the sender or recipient of an on-chain transaction. When storing RSA-PSS key-pairs the value associated with `n` in the JWK is your wallets **public key** and can be shared safely without compromising the security of your wallet.

```json
{
	"d": "cgeeu66FlfX9wVgZr5AXKlw4MxTlxSuSwMtTR7mqcnoE...",
	"dp": "DezP9yvB13s9edjhYz6Dl...",
	"dq": "SzAT5DbV7eYOZbBkkh20D...",
	"e": "AQAB",
	"ext": true,
	"kty": "RSA",
	"n": "o4FU6y61V1cBLChYgF9O37S4ftUy4newYWLApz4CXlK8...",
	"p": "5ht9nFGnpfW76CPW9IEFlw...",
	"q": "tedJwzjrsrvk7o1-KELQxw...",
	"qi": "zhL9fXSPljaVZ0WYhFGPU..."
}
```

Your **private key** is also stored in the JWK, primarily under the value associated with `d` but it is also partially derived from some of the other values in the JWK. The **private key** is like the password for your wallet - which can be used to create digital signatures (such as for signing transactions), or decrypting data. 

These JWKs are actual `json` files created and exported from a wallet app such as [Arweave.app](https://arweave.app) or generated through code using [arweave-js](https://github.com/ArweaveTeam/arweave-js).

When using a wallet app to generate your key-pair your **private key** can also be represented as a mnemonic **seed phrase**, which in some cases can be used as an alternative to sign transactions and/or recover your wallet.


### Wallet Safety

Your **private key** must be kept confidential at all times as it has the ability to transfer tokens from your address to someone elses. As a developer,
make sure not to include your keyfile in any public GitHub repositories or host it anywhere else publicly.

### Wallet Addresses
Interestingly the address of your wallet is derived from its **public key**. While it's safe to share your **public key** with others, a *4096bit* **public key** is a bit large to pass around conveniently. To reduce that overhead and keep wallet addresses a little more human readable, the `SHA-256` hash of the **public key** is `Base64URL` encoded and used as the wallet address. This security and deterministically links a unique 43 character wallet address to the wallets **public-key** and provides a convenient shorthand that anyone with the **public-key** can verify.

### Wallets
[Arweave.app](https://arweave.app/welcome) - Arweave web wallet to deploy permanent data, connect your accounts securely to decentralized applications, and navigate the weave.

[Wander](https://wander.app) - Browser extension and mobile wallet for Arweave and AO

### Sources and Further Reading:
[Arweave Docs](https://docs.arweave.org/developers/server/http-api#key-format)

[JSON Web Key Format (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)
