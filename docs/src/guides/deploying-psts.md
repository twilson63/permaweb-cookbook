# Creating and Deploying a PST

### **Prerequisites**

---

Before you begin creating your PST, you will need **NodeJS/NPM** installed.

### **Getting Started**

---

SmartWeave contracts can be broken down into two parts:

- **The Contract** (the actual logic behind the token)
- **Initial State** (some settings or configuration we want our token to have)

In this guide we will create both.

**Setting Up a Local Environment**

Run `npm install arweave arlocal warp-contracts`. 

This will provide functions to create and deploy a PST.

### **Configuring The Contract**

---

The PST requires some initial state setup before deployment, e.g. the token name, and token quantity.

Create a configuration file that looks something like this:

```json
// initial-state.json
{
  "ticker": "TEST_PST",
  "name": "Test PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000,
  }
}

```

Which sets some initial options for the PST. Save it as `initial-state.json`.

- **`ticker`** - symbol of the token (e.g. BTC, ETH)
- **`name`** - name of the token
- **`owner`** - address of the contract owner
- **`balances`** - addresses to distribute the initial tokens to

### Writing The Contract

The PST contract should have a single function, `handle`, which takes two arguments:

`state`, which is the current state of the contract, and `action`, which is the action you want to perform (e.g. transferring tokens).

When making a call to the PST contract, it should return one of two things:
- **`state`** - if the call to the contract changes the state (e.g. making a transfer).
- **`result`** - if the call does **not** change the state (e.g. viewing a balance).

Otherwise it should throw **`error`** if the call is invalid or fails. 

First, let's define the main `handle` function.
```js
//contract.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```
This sets up some variables for common interactions the smart contract uses.

Now let's add the first type of input which will change the state. This allows the owner of the contract to mint new PSTs to their wallet address.

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('Invalid token mint');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('Invalid value for "qty". Must be an integer');
  }

  if(caller != state.owner) {
    throw new ContractError('Only the owner of the contract can mint new tokens.');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```
The next function will handle transfers of PSTs between wallets.

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`Invalid value for "qty". Must be an integer`);
    }

    if (!target) {
      throw new ContractError(`No target specified`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('Invalid token transfer');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`Caller balance not high enough to send ${qty} token(s)!`);
    }

    // Lower the token balance of the caller
    balances[caller] -= qty;
    if (target in balances) {
      // Wallet already exists in state, add new tokens
      balances[target] += qty;
    } else {
      // Wallet is new, set starting balance
      balances[target] = qty;
    }

    return { state };
  }
```
Let's also add a way to view the PST balance of a target wallet.

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`Must specificy target to get balance for`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`Cannnot get balance, target does not exist`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```
And finally, let's throw an error if the input given is not the `mint`, `transfer`, or `balance` function.

```js
throw new ContractError(`No function supplied or function not recognised: "${input.function}"`);
```

### **Deploying The Contract**

To deploy a contract, we need to write a NodeJS script which will work with Warp to deploy our contract.

Create a file called `deploy-contract.js`, and begin by importing `WarpFactory`.

```js
import { WarpFactory } from 'warp-contracts/mjs'
```
Next, initialize an instance of Warp.

You can replace `forMainnet()` with `forLocal()`, or `forTestnet()`, depending on where you want to deploy your contract.
```js
const warp = WarpFactory.forMainnet();
```

Now we have Warp setup, you'll need a wallet to deploy the contract from. You can either use your own local keyfile:

```js
const walletAddress = "path/to/wallet.json"
```
 or, generate a new wallet through Warp using the following code:

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```
Transactions under 100KB are free, so you don't even have to fund the wallet!

---

Before deploying the contract, we need to read in the initial state file and the contract file.

```js
const contract = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```
If you generated a new wallet to deploy from, you'll need to override the `owner` in the initial state. You can do this with the following code:
```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```
If you're using wallet, you can instead edit the `initial-state.json` file directly to use your wallet address.

The following code handles the deployment of the contract:

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('Deployment completed: ', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

Run the script with `node deploy-contract.js` which will deoply your contract and log the contract transaction ID in the terminal for you to use.

---

**Source and Further Reading**: [Warp Docs](https://academy.warp.cc/tutorials/pst/introduction/intro)