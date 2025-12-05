---
locale: ko
---

# Vouch

## 개요

#### Vouch 프로토콜

Arweave는 ANS-109 Vouch(신원 보증) 개념을 도입했습니다. 이는 특정 거래 형식과 몇 가지 태그를 사용하여 퍼마웹 상의 누구나 Arweave 주소의 신원과 인간성에 대해 "보증"할 수 있도록 하는 표준입니다.

ANS-109와 같은 표준의 추가는 시빌 공격 및 악의적 행위를 줄이는 데 도움이 되어 퍼마웹 사용자에게 보다 안전한 환경을 제공할 것입니다.

#### VouchDAO

VouchDAO는 커뮤니티가 주도하는 분산 검증 계층으로 Vouch 표준 위에 구축됩니다. 개발자는 vouch 서비스를 만들고 VouchDAO 커뮤니티 구성원은 어떤 검증 서비스가 신뢰할 수 있는지 투표로 결정합니다.

새 서비스가 만들어지면 해당 주소는 [VouchDAO 커뮤니티](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk) 인터페이스를 통해 선정됩니다. 투표가 통과되면 해당 서비스는 검증된 Voucher로 추가됩니다.

<img src="https://arweave.net/7W9krszlEXdR38LB7uXgJ_EPXGj-woXljsA5h5GpGzk" />

## 작동 방식

개발자는 특정 요구사항 집합에 따라 사용자의 Arweave 지갑을 보증하는 다양한 Vouch 서비스를 만들 수 있습니다. 현재 예로 Twitter 서비스가 있으며, 이는 최초의 Vouch 서비스로 지금까지 180개 이상의 Arweave 주소를 보증했습니다.

VouchDAO 스마트 계약 상태에는 `vouched` 속성이 있습니다. 이 상태는 사용자가 검증될 때마다 업데이트됩니다. `vouched` 객체는 다음 형식으로 보증된 주소 목록을 저장합니다:

```
ALAMAT_PENGGUNA_VOUCH:[
  {
    service:"ALAMAT_LAYANAN_1"
    transaction:"ID_TX"
  },
   {
    service:"ALAMAT_LAYANAN_2"
    transaction:"ID_TX"
  }
]
```

검증된 사용자는 해당 서비스가 지갑을 보증했음을 나타내는 ANS-109 토큰을 지갑으로 수신합니다.

## ANS-109 거래 형식

| 태그 이름           | _선택 사항?_ | 태그 값                                                                          |
| ------------------- | ------------ | -------------------------------------------------------------------------------- |
| App-Name            | 아니요       | `Vouch`                                                                          |
| Vouch-For           | 아니요       | 이 트랜잭션에서 보증되는 대상 Arweave 주소                                       |
| App-Version         | 예           | `0.1`                                                                            |
| Verification-Method | 예           | 개인의 신원을 검증하는 방법. 예 - `Twitter`/`Secara Langsung`/`Gmail`/`Facebook` |
| User-Identifier     | 예           | 검증 방법에 따라 사용자를 식별하는 값. 예 - `abhav@arweave.org`                  |

## 리소스

- [VouchDAO](https://vouch-dao.arweave.net)
- [VouchDAO 계약](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
