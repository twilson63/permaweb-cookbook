# 瀏覽器沙箱

## 概觀

瀏覽器沙箱允許對閘道（gateway）節點的資料請求透過重新導向到該閘道 apex 網域的偽唯一子網域，從而受益於瀏覽器同源政策的安全優勢。例如，對 `https://arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o` 的存取會被重新導向到 `https://qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova.arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o`

要將一個網域連結到閘道節點上的 Arweave 交易，需要兩筆 DNS 紀錄。例如，`www.mycustomsite.com` 需有下列紀錄以連結到 `www.arweave-gateway.net`：

- 一筆指向 Arweave gateway 的 DNS CNAME 紀錄：www CNAME `arweave-gateway.net`
- 一筆將該網域與特定交易 ID 連結的 DNS TXT 紀錄：arweavetx TXT `kTv4OkVtmc0NAsqIcnHfudKjykJeQ83qXXrxf8hrh0S`

當瀏覽器向 `www.mycustomsite.com` 發出請求時，使用者的機器會（透過一般的 DNS 流程）解析到閘道節點 `arweave-gateway.net` 的 IP 位址。當閘道收到附有非預設主機名稱（例如 `www.mycustomsite.com` 而非 `www.arweave-gateway.net`）的 HTTP 請求時，閘道會查詢 `www.mycustomsite.com` 的 DNS 紀錄，而 `arweavetx` TXT 紀錄會告訴該節點要回應哪個交易。

## TLS 及其在瀏覽器沙箱中的角色

傳輸層安全（TLS）是一種用於在電腦網路上提供通訊安全的密碼協議。在 Arweave 應用與瀏覽器沙箱的情境中，TLS 在確保資料傳輸安全與啟用瀏覽器安全功能方面扮演關鍵角色。

當 Arweave 應用在沒有 TLS 的情況下被存取時，大多數瀏覽器會限制原生密碼功能的使用。這些功能（包括雜湊、簽章與驗證）對 Arweave permaweb 應用的安全運作至關重要。若無 TLS，不僅這些功能無法使用，應用還會容易受到各種安全威脅，特別是中間人（MITM）攻擊。雖然 Arweave 交易本身已簽署，直接的 MITM 攻擊較難執行，但缺乏加密仍可能暴露其他弱點。例如，攻擊者可能攔截並篡改 `/price` 端點，可能導致交易失敗或被收取過高費用。

為了解決這些問題，閘道營運者需為其閘道產生並維護 TLS 憑證。這可透過各種系統實作，例如為 Let's Encrypt 使用 ACME。設定閘道的一個重要步驟是為閘道網域取得通配符（wildcard）TLS 憑證。此憑證可保護 apex 網域及其單層子網域（例如 `gateway.com` 與 `subdomain.gateway.com`）的流量。

TLS 的整合對實作瀏覽器沙箱至關重要。當瀏覽器向閘道請求一筆交易時，閘道會以 301 重新導向回應，導向以交易 ID 衍生的 Base32 偽唯一位址所構成的閘道子網域。此重新導向在 TLS 下進行，會觸發瀏覽器的同源政策。結果，所請求的網頁會被限制在一個安全的沙箱環境中，與其他網域隔離。此隔離對維持 Arweave permaweb 應用內交易與互動的完整性與安全性非常重要。

## 推導沙箱值

ar.io 節點以決定性方式產生瀏覽器沙箱值。因此，可以事先計算出特定交易 ID 對應的沙箱值。

沙箱值是交易 ID 的 Base32 編碼。ar.io 閘道使用以下程式片段來完成編碼：

```typescript
const expectedTxSandbox = (id: string): string => {
  return toB32(fromB64Url(id));
};
```

範例：

```typescript
const id = "gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o";
const expectedTxSandbox = (id): string => {
  return toB32(fromB64Url(id));
};
console.log(expectedTxSandbox);
```

範例輸出：

```console
qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova
```

請在此檢視產生瀏覽器沙箱值的完整程式碼：[https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69](https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69).
