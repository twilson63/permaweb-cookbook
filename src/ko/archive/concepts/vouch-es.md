---
로케일: es
---

# Vouch

## 소개

#### Vouch 프로토콜

Arweave는 ANS-109 Vouch (신원 주장) 개념을 도입했습니다. 이것은 특정 트랜잭션 형식과 일부 태그를 사용하여 permaweb 상의 누구나 Arweave 주소의 신원과 인간임을 "vouch"(보증/인증)할 수 있게 하는 표준입니다.

ANS-109와 같은 표준을 permaweb에 추가하면 Sybil 공격 및 악의적 행위를 최소화하는 데 도움이 되어 permaweb에서의 사용자 경험을 더 안전하게 만듭니다.

#### VouchDAO

VouchDAO는 커뮤니티 주도형 탈중앙화 검증 계층으로 Vouch 표준 위에 구축되어 있습니다. 개발자는 vouch 서비스를 생성하고 VouchDAO 커뮤니티 구성원들이 이러한 검증 서비스들 중 신뢰할 만한지를 투표로 결정합니다.

새로운 서비스가 생성되면 해당 서비스의 주소는 [VouchDAO community.xyz](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 인터페이스에서 투표 대상이 됩니다. 투표가 승인되면 해당 서비스는 검증된 Voucher로 추가됩니다.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 작동 방식

개발자는 특정 요구사항 집합에 기반하여 Arweave 지갑에 대해 증언하는 다양한 Vouch 서비스를 생성할 수 있습니다. 현재의 예로는 Twitter 서비스가 있으며, 이 서비스는 지금까지 180개 이상의 Arweave 주소를 인증한 첫 번째 vouch 서비스입니다.

VouchDAO 스마트 컨트랙트의 상태는 `vouched`(인증됨)라는 속성을 가집니다. 이 상태는 사용자가 인증될 때마다 업데이트됩니다. `vouched`(인증됨) 객체는 다음 형식을 따르는 인증된 주소 목록을 저장합니다:

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

인증된 사용자는 해당 지갑이 해당 서비스에 의해 인증되었음을 표시하기 위해 지갑에서 ANS-109 토큰을 받게 됩니다.

## ANS-109 트랜잭션 형식

| 태그 이름         | _필수?_ | 태그 값                                                                    |
| ----------------- | ------- | -------------------------------------------------------------------------- |
| 애플리케이션 이름 | 아니요  | `Vouch`                                                                    |
| Vouch-For         | 아니요  | 이 트랜잭션에서 인증되는 Arweave 주소                                      |
| 애플리케이션 버전 | 예      | `0.1`                                                                      |
| 검증 방법         | 예      | 사람의 신원을 검증하는 방법. 예: `Twitter`/`En persona`/`Gmail`/`Facebook` |
| 사용자 식별자     | 예      | 검증 방법에 따라 사용자 기반의 식별자. 예 - `abhav@arweave.org`            |

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 컨트랙트](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
