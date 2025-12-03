# 浏览器沙箱

## 概览

浏览器沙箱允许对网关（gateway）节点的数据请求通过重定向到该网关 apex 域名的伪唯一子域名，从而受益于浏览器同源策略的安全优势。例如，对 `https://arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o` 的访问会被重定向到 `https://qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova.arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o`

要将一个域名链接到网关节点上的 Arweave 交易，需要两条 DNS 记录。例如，`www.mycustomsite.com` 需要下列记录以链接到 `www.arweave-gateway.net`：

- 一条指向 Arweave 网关的 DNS CNAME 记录：www CNAME `arweave-gateway.net`
- 一条将该域名与特定交易 ID 关联的 DNS TXT 记录：arweavetx TXT `kTv4OkVtmc0NAsqIcnHfudKjykJeQ83qXXrxf8hrh0S`

当浏览器向 `www.mycustomsite.com` 发出请求时，用户的机器会（通过一般的 DNS 流程）解析到网关节点 `arweave-gateway.net` 的 IP 地址。当网关收到附有非默认主机名（例如 `www.mycustomsite.com` 而非 `www.arweave-gateway.net`）的 HTTP 请求时，网关会查询 `www.mycustomsite.com` 的 DNS 记录，而 `arweavetx` TXT 记录会告诉该节点要响应哪个交易。

## TLS 及其在浏览器沙箱中的作用

传输层安全（TLS）是一种用于在计算机网络上提供通信安全的加密协议。在 Arweave 应用与浏览器沙箱的情境中，TLS 在确保数据传输安全与启用浏览器安全功能方面扮演关键角色。

当 Arweave 应用在没有 TLS 的情况下被访问时，大多数浏览器会限制原生密码功能的使用。这些功能（包括哈希、签名与验证）对 Arweave permaweb 应用的安全运行至关重要。若无 TLS，不仅这些功能无法使用，应用还会容易受到各种安全威胁，特别是中间人（MITM）攻击。虽然 Arweave 交易本身已签署，直接的 MITM 攻击较难执行，但缺乏加密仍可能暴露其他弱点。例如，攻击者可能拦截并篡改 `/price` 端点，可能导致交易失败或被收取过高费用。

为了解决这些问题，网关运营者需为其网关生成并维护 TLS 证书。这可通过各种系统实现，例如为 Let's Encrypt 使用 ACME。配置网关的一个重要步骤是为网关域名获取通配符（wildcard）TLS 证书。此证书可保护 apex 域名及其一级子域名（例如 `gateway.com` 与 `subdomain.gateway.com`）的流量。

TLS 的整合对实现浏览器沙箱至关重要。当浏览器向网关请求一笔交易时，网关会以 301 重定向响应，指向以交易 ID 衍生的 Base32 伪唯一地址所构成的网关子域名。此重定向在 TLS 下进行，会触发浏览器的同源策略。结果，所请求的页面会被限制在一个安全的沙箱环境中，与其他域名隔离。此隔离对维持 Arweave permaweb 应用内交易与交互的完整性与安全性非常重要。

## 推导沙箱值

ar.io 节点以决定性方式产生浏览器沙箱值。因此，可以事先计算出特定交易 ID 对应的沙箱值。

沙箱值是交易 ID 的 Base32 编码。ar.io 网关使用以下代码片段来完成编码：

```typescript
const expectedTxSandbox = (id: string): string => {
  return toB32(fromB64Url(id));
};
```

示例：

```typescript
const id = "gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o";
const expectedTxSandbox = (id): string => {
  return toB32(fromB64Url(id));
};
console.log(expectedTxSandbox);
```

示例输出：

```console
qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova
```

请在此查看生成浏览器沙箱值的完整代码：[https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69](https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69).
