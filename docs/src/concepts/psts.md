# Overview

---
> **⚠️ Deprecation Notice**
>
> This document is deprecated and may contain outdated information.

Profit Sharing Tokens (PSTs) are a type of SmartWeaveToken which include the following structure:

| property    | type        |
| ----------- | ----------- |
| balances    | object      |
| name        | string      |
| ticker      | string      |
| transfer    | method      |
| balance     | method      |

PSTs are typically used to govern a protocol or "Profit Sharing Community" (PSC) - similar to a DAO.

### How are PSTs Distributed?

---

Founders of an application can create a set number of PSTs and distribute them as they see fit - to keep, or sell to investors to raise capital.

Protocols can offer PSTs as a reward for contributing work, or completing tasks for the community to incentivize growth.

PSTs can also be exchanged between each other on [Permaswap](https://permaswap.network/#/) (currently in testnet), and developers can set up token trading permissions using [Verto Flex](https://github.com/useverto/flex).

### Features

---

PSTs work as ‘**micro-dividends**’. When a protocol is used, a tipping amount is set aside to be distributed amongst holders. The tip is paid out in $AR - **not** in the currency of the PST. This creates quite a special relationship between the app being developed, and Arweave itself.

### Benefits

---

- Provides a flexible way for developers to run a protocol and distribute as much ‘ownership’ as they see fit
- PSTs can be used as payment for protocol work or for community tasks
- Founders are incentivized to increase network usage, as it is directly tied to revenue
- Holders get **intrinsic** value (rewards $AR, not more ‘stock’)

### Example PST: ARDRIVE Token

---

ArDrive is a permaweb application utilitizing their aptly named PST, ARDRIVE.

When someone pays $AR to upload data through ArDrive, a 15% community fee is distributed to a single token holder using a random, weighted method.

![ArDrive PST Cycle](~@source/images/ardrive-pst.png)

A user uploads data -> An ARDRIVE token holder receives $AR -> ARDRIVE token holder can use this $AR to upload files -> cycle repeats. Hopefully this gives you a good idea of one way you could implement your own PST!

### Exploring PSTs

---

Going straight to viewblock and Sonar by Redstone is most appropriate most likely. Just use links that specifically show PSTs so someone doesn’t have to navigate to find them.

You can use [ViewBlock](https://viewblock.io/arweave) for an etherscan-like experience to view PST contracts, like this one [here](https://viewblock.io/arweave/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).

Another option is Sonar, an Arweave smart contract explorer built by [RedStone Finance](https://sonar.redstone.tools/#/app/contracts). View the same contract [here](https://sonar.warp.cc/?#/app/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).


> Some community members have been discussing calling PSTs “Permaweb Service Tokens”. There is still much to explore with PSTs → join the discussion [here](https://discord.com/channels/999377270701564065/999377270701564068/1055569446481178734) (Discord).