---
locale: ko
---

# Vouch

## 개요

#### 동기

Vouch는 Sybil 공격에 대한 분산형 접근 방식을 제공합니다. Sybil 공격은 공격자가 다수의 가짜 아이덴티티를 생성하여 네트워크를 침해하고 부당하게 큰 영향력을 얻는 행위를 말합니다。

#### Vouch 프로토콜

Arweave는 ANS-109 Vouch(아이덴티티의 주장)의 개념을 도입했습니다. 이는 특정 트랜잭션 형식과 몇 가지 태그를 사용하여 누구나 permaweb 상의 임의의 Arweave 주소의 아이덴티티와 사람임(humanness)을 "보증"할 수 있게 하는 표준입니다。

ANS-109와 같은 표준을 permaweb에 추가함으로써 Sybil 공격과 악의적인 행위자를 최소화하고 permaweb 사용자에게 보다 안전한 경험을 제공합니다。

#### VouchDAO

VouchDAO는 Vouch 표준 위에 구축된 커뮤니티 주도 분산 검증 레이어입니다. 개발자는 보증 서비스를 생성하고, VouchDAO 커뮤니티 구성원은 이들 검증 서비스 중 어떤 것을 신뢰할지 투표로 결정합니다。

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 작동 방식

개발자는 특정 요구사항에 따라 사용자의 Arweave 지갑을 보증하기 위한 다양한 Vouch 서비스를 만들 수 있습니다. 현재의 예로는 180개 이상의 Arweave 주소를 보증해온 최초의 보증 서비스인 Twitter 서비스가 있습니다。

VouchDAO 스마트 컨트랙트의 상태에는 `vouched`라는 속성이 있습니다. 이 상태는 사용자가 검증될 때마다 업데이트됩니다. `vouched` 객체는 아래 형식으로 보증된 주소 목록을 저장합니다。

```
VOUCH_USER_ADDRESS:[
  {
    service:"SERVICE_ADDRESS_1"
    transaction:"TX_ID"
  },
   {
    service:"SERVICE_ADDRESS_2"
    transaction:"TX_ID"
  }
]
```

검증된 사용자에게는 해당 지갑이 그 서비스에 의해 보증되었음을 나타내는 ANS-109 토큰이 전송됩니다。

## ANS-109 트랜잭션 형식

| 태그명              | _선택?_ | 태그값                                                                         |
| ------------------- | ------- | ------------------------------------------------------------------------------ |
| App-Name            | 필수    | `Vouch`                                                                        |
| Vouch-For           | 필수    | 이 트랜잭션으로 보증되는 Arweave의 `address`                                   |
| App-Version         | 선택    | `0.1`                                                                          |
| Verification-Method | 선택    | 그 사람의 아이덴티티를 검증하는 방법. 예 - `Twitter`/`대면`/`Gmail`/`Facebook` |
| User-Identifier     | 선택    | 검증 방법에 따른 사용자의 식별자. 예 - `abhav@arweave.org`                     |

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO コントラクト](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
