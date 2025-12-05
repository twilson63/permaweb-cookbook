---
prev: "content-types.md"
next: "schema-diagrams.md"
---

# 隐私

Arweave 的 blockweave 天生是公开的。但对于使用 ArFS 的应用程序（例如 ArDrive），你的私人数据在未经军用级别（且具 [量子抗性](https://blog.boot.dev/cryptography/is-aes-256-quantum-resistant/#:~:text=Symmetric%20encryption%2C%20or%20more%20specifically,key%20sizes%20are%20large%20enough)）加密之前绝不会离开你的电脑。这层隐私保护是在 Drive 级别套用，用户在首次创建 Drive 时决定该 Drive 为公开或私有。私有 Drive 必须遵循 ArFS 的隐私模型。

每个位于私有 Drive 里的文件都采用对称加密，使用 [AES-256-GCM](https://iopscience.iop.org/article/10.1088/1742-6596/1019/1/012008/pdf)。每个私有 Drive 有一个主「Drive 密钥」，此密钥由用户的 Arweave 钱包签名、用户定义的 Drive 密码，以及唯一的 Drive 识别码（[uuidv4](https://en.wikipedia.org/wiki/Universally_unique_identifier)）组合而成。每个文件有其衍生自「Drive 密钥」的专属「File 密钥」。这使得单一文件可以被分享，而不会泄露该 Drive 中其他文件的访问权。

一旦文件被加密并存储在 Arweave 上，它就永远被锁定，且只能使用该文件的文件密钥（file key）解密。

## 密钥衍生

私有 Drive 有一个全局的 Drive 密钥 `D`，以及多个用于加密的文件密钥 `F`。这使得一个 Drive 可以拥有任意数量的独立加密文件。单一文件的所有版本会使用同一个文件密钥（因为新版本会使用相同的 File-Id）。

`D` 用于加密 Drive 与文件夹（Folder）的 metadata，而 `F` 则用于加密文件（File）的 metadata 与实际存储的数据。区分这两个密钥 `D` 与 `F`，允许用户分享特定文件而不揭露整个 Drive 的内容。

`D` 使用 HKDF-SHA256 衍生，输入为对 Drive id 的未加盐（unsalted）RSA-PSS 签名以及用户提供的密码。

`F` 也使用 HKDF-SHA256 衍生，输入为 Drive 密钥与该文件的 id。

<img :src="$withBase('/encryption-diagram.png')" style="height: auto; display: block; margin-left: auto; margin-right: auto; width: 75%;">

其他钱包（例如 [Wander](https://wander.app/)）可整合此密钥衍生协议，只需暴露一个 API 以从指定的 Arweave 钱包收集签名，取得用于 HKDF 衍生 Drive 密钥所需的 SHA-256 签名。

一个使用 Dart 的示例实现可在此取得：[此处](https://github.com/ardriveapp/ardrive-web/blob/187b3fb30808bda452123c2b18931c898df6a3fb/docs/private_drive_kdf_reference.dart)，Typescript 实现则在此：[此处](https://github.com/ardriveapp/ardrive-core-js/blob/f19da30efd30a4370be53c9b07834eae764f8535/src/utils/crypto.ts)。

## 私有 Drive

Drive 可以存储公开或私有数据。此属性由 Drive 实体 metadata 中的 `Drive-Privacy` 标签表示。

```json
Drive-Privacy: "<public | private>"
```

若 Drive 实体为私有，则必须另外使用 `Drive-Auth-Mode` 标签来表示 Drive 密钥的衍生方式。ArDrive 客户端目前采用安全密码与 Arweave 钱包私钥签名的组合来衍生全局 Drive 密钥。

```json
Drive-Auth-Mode?: 'password'
```

在每个加密的 Drive 实体上，必须指定 `Cipher` 标签，并提供解密数据所需的公用参数。这些参数透过 `Cipher-*` 标签来指定，例如 `Cipher-IV`。若参数为字节数据，则在标签中必须以 Base64 编码。

ArDrive 客户端目前对所有对称加密采用 AES256-GCM，该算法需要一个由 12 个随机字节组成的 Cipher 初始化向量（Initialization Vector）。

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

此外，所有加密交易的 `Content-Type` 标签必须为 `application/octet-stream`，而非 `application/json`

私有 Drive 实体及其对应的 Root Folder 实体都会使用这些密钥与密码学参数来对包含在交易中的 JSON 文件进行对称加密。这可确保只有 Drive 拥有者（以及被分享密钥的人）能够打开该 Drive、发现根文件夹，并继续加载 Drive 中的其余子项目。

## 私有文件

当文件上传到私有 Drive 时，默认也会成为私有并使用与其父 Drive 相同的 Drive 密钥。Drive 中的每个唯一文件会根据该文件的唯一 `FileId` 取得其专属的文件密钥集合。若同一文件出现新版本，其 `File-Id` 将被重复使用，实际上所有版本会使用相同的 File Key。

这些文件密钥可由 Drive 拥有者按需分享。

私有文件实体的 metadata 与数据交易皆使用相同的文件密钥加密，确保数据的各个面向皆为真正的私密。因此，文件的 metadata 与数据交易两者都必须各自拥有唯一的 `Cipher-IV` 与 `Cipher` 标签：

```json
Cipher?: "AES256-GCM"
Cipher-IV?: "<12 byte initialization vector as Base64>"
```

与 Drive 相同，私有文件在其 metadata 与数据交易中的 `Content-Type` 标签必须设置为 `application/octet-stream`：

```json
Content-Type: "application/octet-stream"
```
