# 钱包与密钥

Arweave 钱包是与 Arweave 区块链网络互动的入口。它们本身并不实体存储代币，而是管理存取与控制你的链上资产与数据所需的密码学密钥。

## 什么是 Arweave 钱包？

Arweave 上的钱包是一种加密工具，用以保护你唯一的区块链地址。该地址追踪你的 $AR 代币余额，并启用像是发送交易等网络互动。

重要的是要理解，钱包并不实际“持有”代币。相反地，钱包存储能让你签署交易并管理链上资产的公私密钥对。代币余额存在于区块链本身，并链接到你的钱包地址。

## 重点

- 钱包包含在 Arweave 网络上签署交易并存取资金所需的密码学密钥
- 只有钱包拥有者（能存取 **私钥**）才能为其地址授权交易
- Arweave 使用以 JWK（JSON Web Keys）格式存储的 4096 位 RSA-PSS 密钥对
- 钱包地址由公钥经由 SHA-256 哈希与 Base64URL 编码推导而得
- **私钥** 必须时刻妥善保管，因为它控制对你的资金的存取权限

## 密钥对与钱包格式

Arweave 采用 4096 位的 RSA-PSS 密钥对，并以 JWK（JSON Web Keys）格式存储。典型的 Arweave 钱包 JWK 文件如下（值已略写）：

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

在此 JWK 文件中：

- `n` 值代表你的钱包 **公钥**，可以安全分享
- `d` 值（以及其它栏位）组成你的钱包 **私钥**，必须保密

这些 JWK 文件可以从像 [Arweave.app](https://arweave.app) 的钱包应用导出，或使用 [arweave-js](https://github.com/ArweaveTeam/arweave-js) 程序化产生。

使用某些钱包应用时，你的 **私钥** 也可能以助记词（mnemonic seed phrase）的形式表示，可用来签署交易或恢复钱包。

## 钱包地址

Arweave 钱包地址由公钥通过确定性过程推导而得：

1. 计算公钥的 SHA-256 哈希
2. 将该哈希进行 Base64URL 编码
3. 结果为一个 43 字符的钱包地址，比完整的 4096 位公钥更方便使用

此过程在你的钱包地址与公钥之间建立了一个安全且可验证的连接，同时提供更易读的日常使用格式。

## 钱包安全

你的 **私钥** 赋予对你钱包与资金的完全控制权。任何拥有你 **私钥** 的人都能从你的地址转移代币。身为开发者，务必格外小心：

- 切勿将你的密钥文件放入公开的 GitHub 仓库
- 不要将你的 **私钥** 存放于不安全的设备或云端服务
- 安全地备份你的 **私钥** 或助记词
- 对于较大量的资产，建议使用硬件钱包

## 可用钱包

有数种钱包可用以与 Arweave 网络互动：

- [Wander](https://wander.app) - 提供 Arweave 与 AO 的浏览器扩展与移动钱包
- [Beacon](https://beaconwallet.app/) - 提供 Arweave 与 AO 的浏览器扩展与移动钱包
- [Arweave.app](https://arweave.app/welcome) - 用于部署永久数据、连接 dApp 与浏览 weave 的网页钱包（对 AO/HyperBEAM 的支持有限）

## 延伸阅读

- [Arweave 文件](https://docs.arweave.org/developers/server/http-api#key-format)
- [JSON Web Key 格式（RFC 7517）](https://www.rfc-editor.org/rfc/rfc7517)
