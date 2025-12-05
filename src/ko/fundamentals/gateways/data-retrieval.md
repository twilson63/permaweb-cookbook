---
title: Arweave에서 데이터 가져오기
---

# Arweave에서 데이터 가져오기

트랜잭션 ID(txid)나 ArNS 이름을 획득하면 Arweave 네트워크에서 연관된 데이터를 가져오는 여러 방법이 있습니다. 이 가이드는 개발자들이 사용할 수 있는 주요 접근법을 다룹니다.

## 개요

Arweave에 저장된 데이터를 검색해야 할 때, 사용 사례에 따라 여러 옵션을 선택할 수 있습니다:

- **HTTP API**: 게이트웨이 엔드포인트로의 직접 HTTP 요청
- **Arweave.js**: 프로그래밍 액세스를 위한 JavaScript/TypeScript SDK
- **ARIO Wayfinder**: 지능형 라우팅 및 검증 프로토콜

## 사용 가능한 방법

### [HTTP API](./http-api.md)

표준 HTTP 요청을 사용해 Arweave 게이트웨이에 접근하는 가장 간단한 방법입니다. 기본적인 데이터 검색이나 의존성을 최소화하고 싶을 때 적합합니다.

권장 용도:

- 간단한 데이터 페칭
- 서버사이드 애플리케이션
- 추가 패키지를 피하고 싶을 때

### [Arweave.js](./arweave-js.md)

Arweave 네트워크에 대한 포괄적인 인터페이스를 제공하는 공식 JavaScript/TypeScript SDK입니다.

권장 용도:

- JavaScript/TypeScript 애플리케이션
- 복잡한 Arweave 작업
- 트랜잭션 메타데이터 및 데이터가 필요할 때

### [ARIO Wayfinder](./wayfinder.md)

분산형, 암호학적으로 검증된 접근과 지능형 게이트웨이 라우팅을 제공하는 프로토콜입니다.

권장 용도:

- 신뢰성이 요구되는 운영(프로덕션) 애플리케이션
- 자동 게이트웨이 선택이 필요할 때
- 데이터 검증이 필요한 애플리케이션

## 간단 비교

| Method     | Complexity | Dependencies            | Features                          |
| ---------- | ---------- | ----------------------- | --------------------------------- |
| HTTP API   | Low        | None                    | Basic data retrieval              |
| Arweave.js | Medium     | `arweave` package       | Full transaction access           |
| Wayfinder  | Medium     | `@ar.io/wayfinder-core` | Intelligent routing, verification |

## 시작하기

필요에 가장 잘 맞는 방법을 선택하세요:

1. 가장 간단한 접근법을 원한다면 **HTTP API**로 시작하세요
2. JavaScript/TypeScript 애플리케이션을 구축 중이라면 **Arweave.js**를 사용하세요
3. 운영 환경 수준의 신뢰성과 검증이 필요하다면 **Wayfinder**를 고려하세요

각 방법 페이지에는 설치 지침, 기본 사용 예제 및 더 자세한 문서로 연결되는 링크가 포함되어 있습니다.
