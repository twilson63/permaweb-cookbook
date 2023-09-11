---
locale: zh
---
# 创建和部署PST

### **先决条件**

---

在开始创建您的PST之前，您需要安装 **NodeJS/NPM**。

### **入门**

---

SmartWeave合约可以分为两个部分：

- **合约**（代币背后的实际逻辑）
- **初始状态**（我们希望代币具有的一些设置或配置）

在本指南中，我们将创建这两部分。

**设置本地环境**

运行 `npm install arweave arlocal warp-contracts`。

这将提供用于创建和部署PST的函数。

### **配置合约**

---

在部署之前，PST需要进行一些初始状态设置，例如代币名称和代币数量。

创建一个看起来像这样的配置文件：

```json
// 初始状态.json
{
  "ticker": "TEST_PST",
  "name": "测试PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000
  }
}

```

此配置为PST设置了一些初始选项。将其保存为 `initial-state.json`。

- **`ticker`** - 代币的符号（例如BTC，ETH）
- **`name`** - 代币的名称
- **`owner`** - 合约所有者的地址
- **`balances`** - 初始代币分发的地址

### 编写合约

PST合约应该有一个名为`handle`的函数，它接受两个参数：

`state`，即合约的当前状态，和`action`，即您要执行的操作（例如转移代币）。

在调用PST合约时，它应该返回以下两种结果之一：
- **`state`** - 如果对合约的调用改变了状态（例如进行转账）。
- **`result`** - 如果对合约的调用**不**改变状态（例如查看余额）。

否则，如果调用无效或失败，应抛出**`error`**。

首先，让我们定义主要的`handle`函数。

```js
//合约.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```
这设置了一些用于智能合约使用的常见交互的变量。

现在让我们添加第一种类型的输入，它将改变状态。这允许合约的所有者将新的PST添加到他们的钱包地址。

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('无效的代币增发');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('“qty”的值无效。必须是整数');
  }

  if(caller != state.owner) {
    throw new ContractError('只有合约所有者才能增发新代币。');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```
接下来的函数将处理钱包之间的PST转移。

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`“qty”的值无效。必须是整数`);
    }

    if (!target) {
      throw new ContractError(`未指定目标`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('无效的代币转移');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`调用者的余额不足以发送 ${qty} 个代币！`);
    }

    // 降低调用者的代币余额
    balances[caller] -= qty;
    if (target in balances) {
      // 钱包已存在于状态中，添加新代币
      balances[target] += qty;
    } else {
      // 钱包是新的，设置初始余额
      balances[target] = qty;
    }

    return { state };
  }
```
让我们还添加一种查看目标钱包PST余额的方法。

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`必须指定要获取余额的目标`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`无法获取余额，目标不存在`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```
最后，如果给定的输入不是`mint`、`transfer`或`balance`函数，让我们抛出一个错误。

```js
throw new ContractError(`未提供函数或无法识别的函数：“${input.function}”`);
```

### **部署合约**

要部署合约，我们需要编写一个 NodeJS 脚本，该脚本将与 Warp 一起工作，以部署我们的合约。

创建一个名为 `deploy-contract.js` 的文件，并开始导入 `WarpFactory`。

```js
import { WarpFactory } from 'warp-contracts/mjs'
```
接下来，初始化 Warp 的实例。

根据您想要部署合约的位置，您可以将 `forMainnet()` 替换为 `forLocal()` 或 `forTestnet()`。
```js
const warp = WarpFactory.forMainnet();
```

现在我们已经设置好 Warp，您将需要一个钱包来从中部署合约。您可以使用自己的本地密钥文件：

```js
const walletAddress = "path/to/wallet.json"
```
或者，使用以下代码通过 Warp 生成一个新的钱包：

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```
交易不超过100KB是免费的，因此您甚至不需要为钱包提供资金！

---

在部署合约之前，我们需要读取初始状态文件和合约文件。

```js
const contract = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```
如果您生成了一个新的钱包来进行部署，您将需要在初始状态中覆盖 `owner`。您可以使用以下代码来执行此操作：
```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```
如果您使用的是钱包，您可以直接编辑 `initial-state.json` 文件以使用您的钱包地址。

以下代码处理合约的部署：

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('部署完成：', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

运行 `node deploy-contract.js` 脚本，它会部署您的合约，并将合约交易 ID 记录在终端中供您使用。

---

**来源和进一步阅读**：[Warp文档](https://academy.warp.cc/tutorials/pst/introduction/intro)