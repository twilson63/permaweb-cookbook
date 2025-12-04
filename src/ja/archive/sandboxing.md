# ブラウザサンドボックス

## 概要

ブラウザサンドボックスは、ゲートウェイのアペックスドメインの擬似一意サブドメインへリダイレクトすることで、ブラウザの同一オリジンポリシーのセキュリティ利点をデータ要求に活用できるようにする仕組みです。例えば、`https://arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o` へのアクセスは `https://qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova.arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o` にリダイレクトされます。

ドメインをゲートウェイノード上の Arweave トランザクションに紐付けるには、2 つの DNS レコードが必要です。例えば、`www.mycustomsite.com` を `www.arweave-gateway.net` に紐付けるには以下のレコードが必要です：

- Arweave ゲートウェイを指す DNS CNAME レコード：www CNAME `arweave-gateway.net`
- 特定のトランザクション ID とドメインを紐付ける DNS TXT レコード：arweavetx TXT `kTv4OkVtmc0NAsqIcnHfudKjykJeQ83qXXrxf8hrh0S`

ブラウザが `www.mycustomsite.com` を要求すると、ユーザーのマシンは（通常の DNS プロセスを通じて）ゲートウェイノード `arweave-gateway.net` の IP アドレスを解決します。ゲートウェイがデフォルトとは異なるホスト名（例：`www.arweave-gateway.net` ではなく `www.mycustomsite.com`）を含む HTTP リクエストを受け取ると、`www.mycustomsite.com` の DNS レコードを照会し、`arweavetx` TXT レコードによってノードがどのトランザクションを配信すべきかが指示されます。

## TLS とブラウザサンドボックスにおける役割

TLS（Transport Layer Security）は、コンピュータネットワーク上の通信を保護するための暗号プロトコルです。Arweave アプリケーションとブラウザサンドボックスの文脈では、TLS は安全なデータ伝送を保証し、ブラウザのセキュリティ機能を有効にする上で重要な役割を果たします。

Arweave アプリケーションが TLS なしでアクセスされると、ほとんどのブラウザはネイティブの暗号関数の使用を制限します。これらの関数（ハッシュ化、署名、検証など）は、Arweave の permaweb アプリケーションの安全な動作に不可欠です。TLS がない場合、これらの機能が使用できなくなるだけでなく、中間者攻撃（MITM）をはじめとするさまざまなセキュリティ上の脅威に対して脆弱になります。Arweave のトランザクションは署名されているため直接的な MITM 攻撃は困難ですが、暗号化がないことで他の脆弱性が露呈する可能性があります。例えば、攻撃者が `/price` エンドポイントを傍受・改ざんすると、トランザクションの失敗や過剰請求を招く可能性があります。

これらの懸念に対処するため、ゲートウェイ運営者はゲートウェイ用の TLS 証明書を発行・管理する責任があります。これは、Let's Encrypt 向けの ACME のような様々なシステムを通じて実行できます。ゲートウェイを設定する際の重要なステップは、ゲートウェイのドメインに対するワイルドカード TLS 証明書を取得することです。この証明書により、アペックスドメインとその 1 レベル下のサブドメイン（例：`gateway.com` および `subdomain.gateway.com`）のトラフィックが保護されます。

TLS の導入はブラウザサンドボックスの実装にとって不可欠です。ブラウザがゲートウェイからトランザクションを要求すると、ゲートウェイはトランザクション ID から導出した Base32 擬似一意アドレスを用いてゲートウェイのサブドメインへ 301 リダイレクトを発行します。このリダイレクトが TLS で保護されることにより、ブラウザの同一オリジンポリシーが適用され、要求されたウェブページは他のドメインから隔離された安全なサンドボックス環境内に閉じ込められます。この分離は、トランザクションや permaweb アプリケーション内での相互作用の整合性とセキュリティを維持するために重要です。

## サンドボックス値の導出

ar.io ノードはブラウザサンドボックス値を決定的に生成します。このため、特定のトランザクション ID に対してその値が事前に計算可能です。

サンドボックス値はトランザクション ID の Base32 エンコードです。ar.io ゲートウェイは以下のコードスニペットを使用してエンコードを行います：

```typescript
const expectedTxSandbox = (id: string): string => {
  return toB32(fromB64Url(id));
};
```

例:

```typescript
const id = "gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o";
const expectedTxSandbox = (id): string => {
  return toB32(fromB64Url(id));
};
console.log(expectedTxSandbox);
```

出力例:

```console
qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova
```

ブラウザサンドボックス値を生成する完全なコードは[こちら](https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69)で確認できます。
