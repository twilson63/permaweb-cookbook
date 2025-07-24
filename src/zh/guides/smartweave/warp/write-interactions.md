---
locale: zh
---
# Warp WriteInteractions

要调用 SmartWeave 合约上的函数，您可以创建一个称为 SmartWeave 操作的交易。此操作包括 SmartWeave 合约上函数的函数名称和必要的输入参数。您可以使用 Contract.writeInteraction 函数创建 SmartWeave 操作。

## 代码

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .writeInteraction({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

在调用 writeInteraction 时，你需要传递输入参数。这些参数是合约期望接收的参数。

::: warning
由于SmartWeave合约在惰性流中进行评估，你在评估合约到当前状态之前无法知道你的操作是否成功执行。使用[Warp readState](./readstate.md)来访问合约并确定操作是否成功应用。
:::

## 模拟写入

`DryWrite`允许您在当前状态上测试和验证一个交互，而不必在永久网络(permaweb)上执行它。这个功能允许您在本地模拟交互并确保它在应用之前会成功。

```ts
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet()
const STAMP_PROTOCOL = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

async function doStamp() {
  const result = await warp.contract(STAMP_PROTOCOL)
    .connect('use_wallet')
    .dryWrite({
      function: 'stamp',
      timestamp: Date.now(),
      transactionId: 'zQhANphTO0DOsaWXhExylUD5cBN3a6xWvfn5ZCpmCVY'
    })
  console.log(result)
}
```

::: warning
在使用模拟写入时需要注意的一点是，对于使用 readState 或 internalWrites 的合约，需要在本地评估整个状态。这可能会导致执行速度较慢。
:::

## 速度优化

默认情况下，writeInteractions会被提交到Warp Sequencer并捆绑并发布到Arweave。您可以通过禁用捆绑直接发布到Arweave。

```ts
const result = await contract.writeInteraction({
  function: 'YOUR_FUNCTION_NAME',
  ...
}, { disableBundling: true })
```

## 摘要

SmartWeave协议允许使用writeInteractions在一个不可变的、仅追加的存储系统上修改动态数据。这些交互使得与SmartWeave合约进行无信任和无权限的通信成为可能。Warp SDK为开发人员提供了一个用户友好的API，用于与SmartWeave协议和其writeInteractions功能进行交互。

获取额外资源:

* Warp SDK [https://github.com/warp-contracts/warp](https://github.com/warp-contracts/warp)
* Warp文档 [https://warp.cc](https://warp.cc)