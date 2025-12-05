# Vouch

## 개요

#### 동기

Vouching은 Sybil 공격 방지에 대한 분산형 접근 방식을 제공합니다. Sybil 공격은 공격자가 다수의 가명 신원을 생성하여 네트워크를 교란하고 불균형적으로 큰 영향력을 확보하는 경우를 말합니다.

#### Vouch 프로토콜

Arweave는 ANS-109 Vouch(신원 주장) 개념을 도입했습니다. 이는 특정 트랜잭션 형식과 몇몇 태그를 사용하여 permaweb 상의 누구나 어떤 Arweave 주소의 신원과 인간성을 "vouch"(보증)할 수 있도록 하는 표준입니다.

ANS-109와 같은 표준을 permaweb에 추가하면 Sybil 공격 및 악성 행위자를 최소화하는 데 도움이 되어 permaweb 사용자에게 더 안전한 경험을 제공합니다.

## ANS-109 트랜잭션 형식

| 태그 이름           | _선택 여부?_ | 태그 값                                                                |
| ------------------- | ------------ | ---------------------------------------------------------------------- |
| App-Name            | False        | `Vouch`                                                                |
| Vouch-For           | False        | Arweave `address` that is being vouched for in this transaction        |
| App-Version         | True         | `0.1`                                                                  |
| Verification-Method | True         | 사람의 신원 확인 방법. 예시 - `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | True         | 검증 방법에 기반한 사용자 식별자. 예시 - `abhav@arweave.org`           |

## 리소스

- [ANS-109 문서](https://github.com/ArweaveTeam/arweave-standards/blob/ans-109/ans/ANS-109.md)
