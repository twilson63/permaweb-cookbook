# Atomic Token Concept and Principles

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

An Atomic Token is a single permanent identifier that references data and a SmartWeave Contract on the Permaweb.

## Specifications

Data MUST be stored on the arweave network and referencable by a Transaction Identifier

Contract MUST implement a `balances` object that represents the ownership of the Atomic Token

Contract MUST implement a `transfer` function that takes the following arguments:
- target {WalletAddress or Contract}
- qty {Number}

> The transfer function should transfer ownership from the caller to the target

## Options

_These are implementation options that can make the Atomic Token discoverable and tradeable on the Permaweb_

[Verto Flex](https://github.com/useverto/flex) - The Flex Library gives your atomic token to be sold or purchased without trusting an exchange.

[Discoverability Tags - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - These additional tags can help Permaweb applications and services discover your token.

[Check out the Guide](../guides/atomic-tokens/intro.md)