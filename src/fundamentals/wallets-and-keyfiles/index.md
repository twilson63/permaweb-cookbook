# Wallets and Keys

Arweave wallets serve as the gateway to interact with the Arweave blockchain network. They don't physically store tokens but instead manage the cryptographic keys needed to access and control your on-chain assets and data.

## What is an Arweave wallet?

A wallet on Arweave is a cryptographic tool that secures your unique blockchain address. This address tracks your $AR token balance and enables network interactions such as sending transactions or working with [AO Processes](https://ao.arweave.net).

It's important to understand that wallets don't actually "hold" tokens. Instead, they store the cryptographic public-private key pair that allows you to sign transactions and manage your on-chain assets. Token balances exist on the blockchain itself, linked to your wallet's address.

## Key Points

- Wallets contain the cryptographic keys needed to sign transactions and access funds on the Arweave network
- Only the wallet owner (with access to the **private key**) can authorize transactions for their address
- Arweave uses 4096-bit RSA-PSS key-pairs stored in JWK (JSON Web Keys) format
- Wallet addresses are derived from the public key using SHA-256 hashing and Base64URL encoding
- **Private keys** must be kept secure at all times, as they control access to your funds

## Keypair and Wallet Format

Arweave utilizes *4096-bit* RSA-PSS key-pairs stored in the JWK (JSON Web Keys) format. A typical JWK file for an Arweave wallet looks like this (with abbreviated values):

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

In this JWK file:
- The `n` value represents your wallet's **public key**, which can be safely shared
- The `d` value (along with other fields) comprises your wallet's **private key**, which must be kept confidential

These JWK files can be created and exported from wallet applications like [Arweave.app](https://arweave.app), or generated programmatically using [arweave-js](https://github.com/ArweaveTeam/arweave-js)

When using certain wallet applications, your **private key** may also be represented as a mnemonic **seed phrase**, which can be used to sign transactions or recover your wallet.

## Wallet Addresses

Arweave wallet addresses are derived from the public key through a deterministic process:
1. The SHA-256 hash of the public key is calculated
2. This hash is then Base64URL encoded
3. The result is a 43-character wallet address that's more convenient to use than the full 4096-bit public key

This process creates a secure and verifiable link between your wallet address and public key, while providing a more human-readable format for everyday use.

## Wallet Security

Your **private key** grants complete control over your wallet and funds. Anyone with access to your **private key** can transfer tokens from your address. As a developer, exercise extreme caution:

- Never include your keyfile in public GitHub repositories
- Don't store your **private key** on unsecured devices or cloud services
- Back up your **private key** or seed phrase securely
- Consider using hardware wallets for significant holdings

## Available Wallets

Several wallet options are available for interacting with the Arweave network:

- [Wander](https://wander.app) - Browser extension and mobile wallet for Arweave and AO
- [Beacon](https://beaconwallet.app/) - Browser extension and mobile wallet for Arweave and AO
- [Arweave.app](https://arweave.app/welcome) - Web wallet for deploying permanent data, connecting to dApps, and navigating the weave *(Limited AO/HyperBEAM support)*

## Further Reading

- [Arweave Docs](https://docs.arweave.org/developers/server/http-api#key-format)
- [JSON Web Key Format (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)
