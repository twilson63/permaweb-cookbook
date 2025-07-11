---
locale: zh
---
# Warp (SmartWeave) SDK - ReadState  

通过延迟计算，SmartWeave合约状态是通过读取而不是写入进行计算的。在读取合约时，SDK会收集所有状态交互，并对它们进行排序，然后使用reduce或fold模式执行它们来更新源合约。

## 基本读取状态

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = '_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk'

const result = await warp.contract(CONTRACT_ID).readState()

// 记录当前状态
console.log(result.cachedValue.state)
```

## 高级读取状态

有些合约要么读取其他合约的状态，要么调用或写入其他合约，当请求这些合约的状态时，需要设置评估选项。

```ts
const warp = WarpFactory.forMainnet()
const CONTRACT_ID = 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'

const result = await warp.contract(CONTRACT_ID)
  .setEvaluationOptions({
    internalWrites: true,
    allowBigInt: true
  })
  .readState()

// 记录当前状态
console.log(result.cachedValue.state)
```

### 常见的评估选项

| 名称 | 描述 |
| ---- | ----------- |
| internalWrites | 评估包含对其他合约的内部写入的合约 |
| allowBigInt | 评估使用BigInt原始数据类型的合约，可以在[MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)中了解更多关于BigInt的信息 |
| unsafeClient | 此值可以是`allow`、`skip`或者`throw`。在合约中避免使用unsafeClient，因为它可能导致不确定的结果。  |

## 根据特定的BlockHeight或Sortkey读取状态

您可能希望查看之前的状态，而不是当前状态，通过提供blockHeight，您可以读取合约在特定block height时的状态。

```ts
const { sortKey, cachedValue } = await contract.readState(1090111)
```

## 总结

通过拉取所有交互并通过 fold 方法处理每个交互，读取 SmartWeave 合约的当前状态可以执行状态评估。这种方法是 permaweb 独有的，需要对您的 SmartWeave 合约代码执行方式有独特的理解。