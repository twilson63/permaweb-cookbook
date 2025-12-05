# 브라우저 샌드박싱

## 개요

브라우저 샌드박싱은 게이트웨이 노드로의 데이터 요청을 게이트웨이의 apex 도메인의 의사-고유 하위 도메인으로 리다이렉트함으로써 브라우저의 동일 출처 정책(same-origin policy)이 제공하는 보안 이점을 활용할 수 있게 합니다. 예를 들어 `https://arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o`에 접근하려는 시도는 `https://qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova.arweave.net/gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o`로 리다이렉트됩니다.

게이트웨이 노드에서 도메인을 Arweave 트랜잭션에 연결하려면 두 개의 DNS 레코드가 필요합니다. 예를 들어 `www.mycustomsite.com`을 `www.arweave-gateway.net`에 연결하려면 다음 레코드가 필요합니다:

- Arweave 게이트웨이를 가리키는 DNS CNAME 레코드: www CNAME `arweave-gateway.net`
- 특정 트랜잭션 ID와 도메인을 연결하는 DNS TXT 레코드: arweavetx TXT `kTv4OkVtmc0NAsqIcnHfudKjykJeQ83qXXrxf8hrh0S`

브라우저가 `www.mycustomsite.com`을 요청하면 사용자의 머신은(일반적인 DNS 과정을 통해) 이 도메인을 게이트웨이 노드 `arweave-gateway.net`의 IP 주소로 해석합니다. 게이트웨이가 비기본 호스트명(예: `www.arweave-gateway.net` 대신 `www.mycustomsite.com`)을 가진 HTTP 요청을 수신하면, 게이트웨이는 `www.mycustomsite.com`의 DNS 레코드를 조회하고 `'arweavetx'` TXT 레코드가 해당 노드가 어떤 트랜잭션을 제공할지 알려줍니다.

## TLS와 브라우저 샌드박싱에서의 역할

전송 계층 보안(Transport Layer Security, TLS)은 컴퓨터 네트워크 상에서 통신 보안을 제공하도록 설계된 암호화 프로토콜입니다. Arweave 애플리케이션과 브라우저 샌드박싱의 맥락에서 TLS는 안전한 데이터 전송을 보장하고 브라우저 보안 기능을 효과적으로 활용할 수 있도록 하는 데 핵심적인 역할을 합니다.

TLS 없이 Arweave 애플리케이션에 접근할 경우, 대부분의 브라우저는 네이티브 암호화 기능(해싱, 서명, 검증 등)의 사용을 제한합니다. 이러한 기능들은 Arweave 퍼마웹(permaweb) 애플리케이션의 안전한 동작에 필수적입니다. TLS가 없으면 이러한 기능을 사용할 수 없을 뿐만 아니라 애플리케이션은 다양한 보안 위협, 특히 중간자 공격(MITM)에 취약해집니다. Arweave 트랜잭션은 서명되어 있어 직접적인 MITM 공격이 어려운 측면이 있지만, 암호화가 없으면 다른 취약점이 노출될 수 있습니다. 예를 들어 공격자가 `/price` 엔드포인트를 가로채어 변경하면 트랜잭션 실패를 유발하거나 과도한 요금 부과로 이어질 수 있습니다.

이러한 문제를 해결하기 위해 게이트웨이 운영자는 게이트웨이에 대한 TLS 인증서를 발급·유지할 책임이 있습니다. 이는 Let's Encrypt의 ACME와 같은 시스템을 통해 달성할 수 있습니다. 게이트웨이를 설정할 때 중요한 단계 중 하나는 게이트웨이 도메인에 대해 와일드카드 TLS 인증서를 획득하는 것입니다. 이 인증서는 apex 도메인과 그 단일 레벨 하위 도메인(예: `gateway.com` 및 `subdomain.gateway.com`)의 트래픽을 보호합니다.

TLS 통합은 브라우저 샌드박싱 구현에 필수적입니다. 브라우저가 게이트웨이에서 트랜잭션을 요청하면, 게이트웨이는 트랜잭션 ID에서 파생된 Base32 의사-고유 주소를 사용하여 게이트웨이의 하위 도메인으로 301 리다이렉트를 발행합니다. 이 리다이렉트는 TLS로 보호되며 브라우저의 동일 출처 정책을 작동시킵니다. 결과적으로 요청된 웹 페이지는 다른 도메인과 격리된 안전한 샌드박스 환경 내에 갇히게 됩니다. 이러한 격리는 Arweave의 퍼마웹 애플리케이션 내 트랜잭션 및 상호작용의 무결성과 보안을 유지하는 데 매우 중요합니다.

## 샌드박스 값 유도

ar.io 노드는 브라우저 샌드박스 값을 결정론적으로 생성합니다. 이 때문에 특정 트랜잭션 ID에 대해 해당 값이 무엇이 될지 사전에 계산할 수 있습니다.

샌드박스 값은 트랜잭션 ID를 Base32로 인코딩한 값입니다. ar.io 게이트웨이는 다음 코드 스니펫을 사용하여 인코딩을 수행합니다:

```typescript
const expectedTxSandbox = (id: string): string => {
  return toB32(fromB64Url(id));
};
```

예시:

```typescript
const id = "gnWKBqFXMJrrksEWrXLQRUQQQeFhv4uVxesHBcT8i6o";
const expectedTxSandbox = (id): string => {
  return toB32(fromB64Url(id));
};
console.log(expectedTxSandbox);
```

예시 출력:

```console
qj2yubvbk4yjv24syelk24wqivcbaqpbmg7yxfof5mdqlrh4rova
```

브라우저 샌드박스 값을 생성하는 전체 코드는 [여기](https://github.com/ar-io/arweave-gateway/blob/719f43f8d6135adf44c87701e95f58105638710a/src/gateway/middleware/sandbox.ts#L69)에서 확인할 수 있습니다.
