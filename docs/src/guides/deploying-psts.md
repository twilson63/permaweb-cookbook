# Creating and Deploying a PST

### **Prerequisites**

---

Before you begin creating your PST, you will need:

- NodeJS/NPM
- An Arweave Wallet

### **Getting Started**

---

SmartWeave contracts can be broken down into two parts:

- **The Contract** (the actual logic behind the token)
- **Initial State** (some settings or configuration we want our token to have)

**Installing Smartweave**

Install the **`smartweave`** node package from Arweave, which will provide functions to create and deploy a PST.

Open up a command prompt (you may need to run it as administrator if you're using PowerShell), and enter the following command:

**`npm install -g smartweave`**

This will install SmartWeave globally on your system so you can use the `smartweave` CLI tool.

### **Configuring The Contract**

---

The PST requires some initial state setup before deployment, e.g. the token name, and token quantity.

Arweave provide a template configuration file that looks something like this:

```json
// token-pst.json
{
  "ticker": "TEST_PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "canEvolve": true,
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 10
  }
}

```

Which sets some initial options for the PST.

- **`ticker`** - symbol or name of the token
- **`owner`** - address of the contract owner
- **`balances`** - addresses to distribute the initial tokens to

For example, if you want 100,000 total tokens split between two founders, you would enter both founder addresses in `**balances**` with the value of **`50000`** on each address.

You can download or copy the template file [here](https://github.com/ArweaveTeam/SmartWeave/blob/master/examples/token-pst.json).

### **Deploying The Contract**

---

To deploy a contract, use the following command:

`smartweave create CONTRACT_FILE CONFIG_FILE --key-file keyfile.json`

where `CONTRACT_FILE` is the smart contract file, `CONFIG_FILE` is the `token-pst.json` just created, and `keyfile.json` is our keyfile.

#### The Smart Contract

The contract file does **not** have to be a local file on your system. Instead, you can leverage an already deployed PST Arweave have provided for us - making creation and deployment incredibly easy.

The contract has the id **`ff8wOKWGIS6xKlhA8U6t70ydZOozixF5jQMp4yjoTc8`** and is available **[here](https://px7taoffqyqs5mjklbapctvn55gj2zhkgofrc6mnamu6gkhijxhq.arweave.net/ff8wOKWGIS6xKlhA8U6t70ydZOozixF5jQMp4yjoTc8)**. 

This template contract is also useful to look at if you want to deploy a PST contract manually, or adjust/customize the logic of the contract.

The final command to deploy will look something like:

**`smartweave create ff8wOKWGIS6xKlhA8U6t70ydZOozixF5jQMp4yjoTc8 token-pst.json --key-file G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo.json`**

Keep in mind that if you aren't working on a terminal within a folder, you may need to use the absolute path name for your files.

E.g. **`C:\Users\YourName\Desktop\G1mQ4...MvSwo.json`**

Once you hit enter, you should be prompted with a screen like the one below, and your contract will be successfully deployed!🥳
![Smartweave CLI Result on PST Deployment](~@source/images/pst-deployment.png)

---

### Next Steps

---

Make a note of the contract ID to use that in the front-end of your application.