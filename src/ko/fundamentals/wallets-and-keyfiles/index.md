# 지갑과 키

Arweave 지갑은 Arweave 블록체인 네트워크와 상호작용하기 위한 관문 역할을 합니다. 지갑은 토큰을 물리적으로 저장하지 않으며, 대신 온체인 자산과 데이터를 접근하고 제어하는 데 필요한 암호화 키를 관리합니다.

## Arweave 지갑이란?

Arweave의 지갑은 고유한 블록체인 주소를 보호하는 암호화 도구입니다. 이 주소는 여러분의 $AR 토큰 잔액을 추적하며, 트랜잭션 전송과 같은 네트워크 상호작용을 가능하게 합니다.

지갑이 실제로 "토큰을 보관"하는 것은 아니라는 점을 이해하는 것이 중요합니다. 지갑은 트랜잭션에 서명하고 온체인 자산을 관리할 수 있게 해주는 공개-개인 키 쌍을 저장합니다. 토큰 잔액은 지갑 주소에 연결되어 블록체인 자체에 존재합니다.

## 주요 사항

- 지갑은 트랜잭션에 서명하고 Arweave 네트워크의 자금에 접근하는 데 필요한 암호화 키를 포함합니다
- 오직 지갑 소유자(즉 **개인 키**에 접근할 수 있는 사람)만 해당 주소의 트랜잭션을 승인할 수 있습니다
- Arweave는 JWK (JSON Web Keys) 형식으로 저장되는 4096비트 RSA-PSS 키 쌍을 사용합니다
- 지갑 주소는 공개 키에서 SHA-256 해싱 및 Base64URL 인코딩을 통해 도출됩니다
- **개인 키**는 자금에 대한 접근을 제어하므로 항상 안전하게 보관해야 합니다

## 키 쌍 및 지갑 형식

Arweave는 _4096비트_ RSA-PSS 키 쌍을 JWK (JSON Web Keys) 형식으로 저장합니다. Arweave 지갑의 일반적인 JWK 파일은 다음과 같습니다(값은 축약됨):

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

이 JWK 파일에서:

- `n` 값은 지갑의 **공개 키**를 나타내며 안전하게 공유할 수 있습니다
- `d` 값(및 기타 필드)은 지갑의 **개인 키**를 구성하며 기밀로 유지해야 합니다

이러한 JWK 파일은 [Arweave.app](https://arweave.app)과 같은 지갑 애플리케이션에서 생성 및 내보낼 수 있으며, [arweave-js](https://github.com/ArweaveTeam/arweave-js)를 사용해 프로그래밍 방식으로 생성할 수도 있습니다.

일부 지갑 애플리케이션에서는 **개인 키**가 니모닉 시드 문구(또는 시드 문구)로 표현될 수 있으며, 이는 트랜잭션에 서명하거나 지갑을 복구하는 데 사용할 수 있습니다.

## 지갑 주소

Arweave 지갑 주소는 공개 키에서 다음의 결정론적 과정을 통해 도출됩니다:

1. 공개 키의 SHA-256 해시를 계산합니다
2. 이 해시를 Base64URL로 인코딩합니다
3. 그 결과는 전체 4096비트 공개 키보다 사용하기 편리한 43자 길이의 지갑 주소가 됩니다

이 과정은 지갑 주소와 공개 키 사이에 안전하고 검증 가능한 연결을 생성하면서 일상적인 사용에 더 읽기 쉬운 형식을 제공합니다.

## 지갑 보안

여러분의 **개인 키**는 지갑과 자금에 대한 완전한 제어 권한을 부여합니다. **개인 키**에 접근 가능한 누구나 해당 주소에서 토큰을 전송할 수 있습니다. 개발자로서 다음 사항에 각별히 주의하세요:

- 키파일을 공개 GitHub 저장소에 포함하지 마세요
- 보안되지 않은 기기나 클라우드 서비스에 **개인 키**를 저장하지 마세요
- **개인 키**나 시드 문구를 안전하게 백업하세요
- 중요한 자산의 경우 하드웨어 지갑 사용을 고려하세요

## 사용 가능한 지갑

Arweave 네트워크와 상호작용하기 위한 여러 지갑 옵션이 있습니다:

- [Wander](https://wander.app) - Arweave 및 AO용 브라우저 확장 및 모바일 지갑
- [Beacon](https://beaconwallet.app/) - Arweave 및 AO용 브라우저 확장 및 모바일 지갑
- [Arweave.app](https://arweave.app/welcome) - 영구 데이터를 배포하고 dApp에 연결하며 weave를 탐색하기 위한 웹 지갑 _(AO/HyperBEAM 지원 제한됨)_

## 추가 자료

- [Arweave Docs](https://docs.arweave.org/developers/server/http-api#key-format)
- [JSON Web Key 형식 (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)
