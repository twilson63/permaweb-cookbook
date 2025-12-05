---
locale: ko
---

# Vouch(보증)

## 개요

#### Vouch 프로토콜

Arweave는 ANS-109 Vouch(신원 증명/지지)의 개념을 도입했습니다. 이는 특정 트랜잭션 형식과 몇 가지 태그를 사용하는 표준으로, permaweb 상의 누구든지 어떤 Arweave 주소의 신원과 인간성을 “보증”할 수 있게 합니다.

ANS-109 같은 표준을 permaweb에 추가하면 Sybil 공격과 악의적 행위자를 최소화하는 데 도움이 되어 permaweb 사용자 경험을 보다 안전하게 만듭니다.

#### VouchDAO

VouchDAO는 커뮤니티 주도의 Vouch 표준 위에 구축된 분산 검증 계층입니다. 개발자는 보증 서비스를 만들고 VouchDAO 커뮤니티 구성원들이 어떤 검증 서비스가 신뢰할 만한지를 투표로 결정합니다.

새로운 서비스가 생성되면 해당 주소는 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 인터페이스에서 투표됩니다. 투표가 통과되면 검증된 보증으로 추가됩니다.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 작동 방식

개발자는 다양한 Vouch 서비스를 만들어 주어진 요구 사항 집합에 따라 사용자의 Arweave 지갑을 검증할 수 있습니다. 현재의 예로 Twitter 서비스가 있으며, 이는 최초의 보증 서비스로 지금까지 180개 이상의 Arweave 주소에 대해 보증을 제공했습니다.

VouchDAO 스마트 계약 상태에는 `vouched` 속성이 있습니다. 사용자가 검증을 받을 때마다 상태가 업데이트됩니다. `vouched` 객체는 다음 형식으로 보증을 받은 주소들의 목록을 저장합니다:

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

검증을 받은 사용자는 해당 서비스로부터 보증되었음을 나타내는 ANS-109 토큰을 지갑에서 받습니다.

## ANS-109 트랜잭션 형식

| 태그 이름           | _선택 항목인가?_ | 태그 값                                                                      |
| ------------------- | ---------------- | ---------------------------------------------------------------------------- |
| App-Name            | 아니요           | `Vouch`                                                                      |
| Vouch-For           | 아니요           | 이 트랜잭션에서 보증하는 대상 Arweave `address`                              |
| App-Version         | 예               | `0.1`                                                                        |
| Verification-Method | 예               | 이 사람의 신원을 검증하는 방법. 예: `Twitter`/`In-Person`/`Gmail`/`Facebook` |
| User-Identifier     | 예               | 검증 방법에 기반한 사용자 식별자. 예: `abhav@arweave.org`                    |

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 合约](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
