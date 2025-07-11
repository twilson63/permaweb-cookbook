# Vouch

## Overview

#### Motivation

Vouching provides a decentralized approach to Sybil resistance. A Sybil attack is when an attacker subverts the network by creating a large number of pseudonymous identities to gain a disproportionately large influence.

#### Vouch Protocol

Arweave introduced the concept of the ANS-109 Vouch (Assertion of Identity). It is a standard that uses a specific transaction format along with some tags to allows anyone on the permaweb to "vouch" for the identity and humanity of any Arweave address.

Adding a standard such as the ANS-109 to the permaweb will help minimize Sybil attacks and bad actors, making it a safer experience for permaweb users. 

## ANS-109 Transaction Format 
| Tag Name | _Optional?_ | Tag Value |
|---|---|---|
|App-Name|False|`Vouch`|
|Vouch-For|False|Arweave `address` that is being vouched for in this transaction|
|App-Version|True|`0.1`|
|Verification-Method|True| Method of verification of identity for the person. Example - `Twitter`/`In-Person`/`Gmail`/`Facebook`|
|User-Identifier|True|An identifier for the user based on the Verification Method. Example - `abhav@arweave.org`|

## Resources
* [ANS-10 Docs](https://github.com/ArweaveTeam/arweave-standards/blob/ans-109/ans/ANS-109.md)
