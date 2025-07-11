---
locale: zh
---
# 钱包和密钥

---

### Arweave 钱包

在 Arweave 上，钱包是用于在区块链上保证一个唯一地址的工具。该地址用于跟踪您的 $AR 余额，并与 Arweave 网络进行交互，例如发送交易或与[SmartWeave 合约](../guides/smartweave/warp/intro.md)进行交互。

与大多数区块链一样，在 Arweave 上，钱包的概念可能有一些误导。

钱包本身**不持有**任何代币；代币余额存储在区块链上，并与钱包地址关联。相反，钱包持有用于签署交易以发布数据或转移代币的加密的公私钥对。拥有该钱包的所有者（具有访问钱包的**私钥**）是唯一能够为该地址签署交易并访问其资金的人。

### 公私钥对和钱包格式

Arweave 使用 *4096 位* RSA-PSS 密钥对，并以 JWK（JSON Web Keys）格式存储。JWK 格式可用于存储多种类型的加密密钥，而不仅仅是 RSA 密钥对。

以下是描述 RSA-PSS 密钥对的 JWK 文件内容。这些值进行了缩写，以防止意外地将它们用作链上交易的发送方或接收方。在存储 RSA-PSS 密钥对时，与 JWK 中的 `n` 关联的值是您钱包的**公钥**，可以安全地共享，而不会损害钱包的安全性。

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

您的**私钥**也存储在 JWK 中，主要存储在与 `d` 关联的值下，但也部分派生自 JWK 中的其他值。**私钥**就像是您钱包的密码，它可以用于创建数字签名（例如用于签署交易）或解密数据。

这些 JWK 是实际的 `json` 文件，通过钱包应用程序（如[Arweave.app](https://arweave.app)）创建和导出，或使用[arweave-js](https://github.com/ArweaveTeam/arweave-js)通过代码生成。

使用钱包应用程序生成密钥对时，您的**私钥**也可以表示为一个助记符**种子短语**，在某些情况下，它可以用作替代方法来签署交易和/或恢复您的钱包。

### 钱包安全

您的**私钥**必须始终保密，因为它具有将代币从您的地址转移到他人地址的能力。作为开发者，请确保不要在任何公共的 GitHub 存储库中包含您的密钥文件，也不要在任何其他公开位置托管它。

### 钱包地址

有趣的是，您的钱包地址是由其**公钥**派生的。尽管安全分享您的**公钥**给他人，但 *4096 位*的**公钥**在方便传递时有些太长。为了减少这种开销并使钱包地址更加可读，将**公钥**的 `SHA-256` 哈希进行了`Base64URL`编码，并用作钱包地址。这种安全和确定性地将一个唯一的 43 个字符的钱包地址与钱包的**公钥**关联起来，并提供了一个方便的缩写，任何人只要具有该**公钥**即可验证。

### 钱包

[Arweave.app](https://arweave.app/welcome) - Arweave 网页钱包，用于部署永久数据、安全地将您的账户连接到去中心化的应用程序，并导航 Arweave。

[ArConnect](https://www.arconnect.io/) - Arweave 钱包浏览器扩展程序

### 来源和进一步阅读：
[Arweave 文档](https://docs.arweave.org/developers/server/http-api#key-format)

[JSON Web Key 格式 (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)