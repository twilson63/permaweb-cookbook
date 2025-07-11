# Vouch

## Overview

#### Motivation

Vouching provides a decentralized approach to Sybil resistance. A Sybil attack is when an attacker subverts the network by creating a large number of pseudonymous identities to gain a disproportionately large influence.

#### Vouch Protocol

Arweave introduced the concept of the ANS-109 Vouch (Assertion of Identity). It is a standard that uses a specific transaction format along with some tags to allows anyone on the permaweb to "vouch" for the identity and humanity of any Arweave address.

Adding a standard such as the ANS-109 to the permaweb will help minimize Sybil attacks and bad actors, making it a safer experience for permaweb users. 

#### VouchDAO
VouchDAO is a community led, decentralized verification layer built on top of the Vouch standard. Developers create vouch services and members of the VouchDAO community vote on which of these verification services are deemed trustworthy.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## How It Works
Developers have the ability to create different Vouch services to attest to a user's Arweave wallet based on a given set of requirements. A current example of this is the Twitter service which is the first vouch service, which has vouched over 180 Arweave addresses so far.

The VouchDAO smart contract state has an attribute `vouched`. This state gets updated whenever a user gets verified. The `vouched` object stores a list of vouched addresses in the following format:
```
VOUCH_USER_ADDRESS:[
  {
    service:"SERVICE_ADDRESS_1"
    transaction:"TX_ID"
  },
   {
    service:"SERVICE_ADDRESS_2"
    transaction:"TX_ID"
  }
]
```

Users that get verified will have the ANS-109 token sent to their wallet to indicate that wallet has been vouched for by that service.

## ANS-109 Transaction Format 
| Tag Name | _Optional?_ | Tag Value |
|---|---|---|
|App-Name|False|`Vouch`|
|Vouch-For|False|Arweave `address` that is being vouched for in this transaction|
|App-Version|True|`0.1`|
|Verification-Method|True| Method of verification of identity for the person. Example - `Twitter`/`In-Person`/`Gmail`/`Facebook`|
|User-Identifier|True|An identifier for the user based on the Verification Method. Example - `abhav@arweave.org`|

## Resources
* [VouchDAO](https://vouch-dao.arweave.dev)
* [VouchDAO Contract](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)