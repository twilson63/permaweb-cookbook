# 아토믹 토큰 개념과 원칙

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

아토믹 토큰(Atomic Token)은 Permaweb상의 데이터와 SmartWeave Contract를 참조하는 하나의 영구 식별자입니다.

## 명세

데이터는 arweave 네트워크에 저장되어야 하며 Transaction Identifier로 참조 가능해야 합니다.

컨트랙트는 아토믹 토큰의 소유권을 나타내는 `balances` 객체를 구현해야 합니다.

컨트랙트는 다음 인수를 받는 `transfer` 함수를 구현해야 합니다:

- target {WalletAddress or Contract}
- qty {Number}

> `transfer` 함수는 호출자(caller)로부터 대상(target)으로 소유권을 이전해야 합니다.

## 옵션

_이들은 Permaweb에서 아토믹 토큰을 검색 가능하고 거래 가능하게 만들 수 있는 구현 옵션입니다_

[Verto Flex](https://github.com/useverto/flex) - Flex 라이브러리는 거래소를 신뢰하지 않고도 아토믹 토큰을 판매하거나 구매할 수 있게 해줍니다.

[Discoverability Tags - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - 이러한 추가 태그는 Permaweb 애플리케이션 및 서비스가 귀하의 토큰을 검색하는 데 도움이 될 수 있습니다.

[가이드를 확인하세요](../guides/atomic-tokens/intro.md)
