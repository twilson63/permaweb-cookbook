# Arweave Name System (ArNS)

## 개요

Arweave Name System(ArNS)는 Permaweb의 전화번호부입니다.

이는 탈중앙화되고 검열 저항적인 네이밍 시스템으로, AR.IO Gateways에 의해 가능해지며 친숙한 이름을 Permaweb 앱, 페이지 및 데이터에 연결하는 데 사용됩니다.

이 시스템은 전통적인 DNS와 유사하게 작동합니다. 사용자가 레지스트리에서 이름을 구매하면 DNS 네임 서버가 해당 이름을 IP 주소로 해석합니다.

ArNS에서는 레지스트리가 탈중앙화되어 있고 영구적이며 Arweave(AO를 통해)에 저장됩니다. 각 AR.IO 게이트웨이는 캐시이자 이름 해석기 역할을 합니다. 사용자는 ArNS 레지스트리 내에서 "my-name"과 같은 이름을 등록하고 이를 임의의 Arweave Transaction ID로 포인터를 설정할 수 있습니다.

AR.IO 게이트웨이는 해당 이름을 자신의 서브도메인 중 하나로 해석(예: https://laserilla.arweave.net)하고 모든 요청을 연관된 Arweave Transaction ID로 프록시합니다. 각 등록된 이름은 또한 각각 Arweave Transaction ID를 가리키는 undername을 가질 수 있어(예: https://v1_laserilla.arweave.net) 소유자에게 더 많은 유연성과 제어권을 제공합니다.

## ArNS 레지스트리

ArNS는 AO를 사용하여 이름 레코드를 관리합니다. 각 레코드(또는 이름)는 사용자에 의해 임대되거나 영구적으로 구매되며 ANT 토큰에 연동됩니다. 하나의 ANT에 여러 ArNS 이름을 등록할 수는 있지만, 하나의 ArNS 이름에 여러 ANT를 등록할 수는 없습니다 — 게이트웨이는 어느 ANT로 라우팅해야 할지 알 수 없기 때문입니다.

ArNS 이름은 최대 32자까지 가능하며 숫자 [0-9], 소문자 [a-z], 대시 [-]를 포함할 수 있습니다. 대시는 끝에 올 수 없으며 예: -myname처럼 선행 대시는 허용되지 않습니다.

## ANTs (Arweave Name Tokens)

ANTs는 ArNS 생태계에서 핵심적인 요소로, ArNS 이름을 소유하는 실제 열쇠입니다. ArNS 이름을 ANT에 등록하면 해당 ANT가 그 이름의 전송 수단이 됩니다. ArNS 레지스트리는 누가 ANT를 소유하는지에 관심을 두지 않으며 단지 어떤 이름이 어떤 ANT에 속하는지만 알고 있습니다.

ANT 내에서는 ArNS 레지스트리가 승인한 소스 코드 트랜잭션 목록의 범위 내에서 원하는 기능을 자유롭게 구축할 수 있습니다.

## Under_Names

Undername은 ANT(Arweave Name Token)에 의해 보유 및 관리되는 레코드입니다. 이러한 레코드는 실제로 ArNS 이름을 소유하지 않아도 생성 및 관리할 수 있으며, ANT가 새로운 소유자에게 전송될 때 함께 이전됩니다. 마찬가지로 ArNS 이름이 만료되어 ANT를 새로운 ArNS 이름에 등록하면 모든 undername은 그대로 유지됩니다.

예시: 당신이 oldName.arweave.net을 소유하고 있다고 가정합니다.

그런 다음: 당신은 undername "my"를 만듭니다 — my_oldName.arweave.net.

그런 다음: oldName.arweave.net이 만료되고 당신은 동일한 ANT에 newName.arweave.net을 등록합니다.

이제: my\_ undername은 newName에서도 접근 가능합니다 — my_newName.arweave.net.

아래는 ANT 계약 상태(State)의 예시입니다:

```json
{
  balances:{ QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ : 1 },
  controller: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  evolve: null,
  name: "ArDrive OG Logo",
  owner: "QGWqtJdLLgm2ehFWiiPzMaoFLD50CnGuzZIPEdoDRGQ",
  records:{
    @:{ transactionId: "xWQ7UmbP0ZHDY7OLCxJsuPCN3wSUk0jCTJvOG1etCRo" },
    undername1:{ transactionId: "usOLUmbP0ZHDY7OLCxJsuPCN3wSUk0jkdlvOG1etCRo" }
  },
  ticker:"ANT-ARDRIVE-OG-LOGO"
}
```

기본 "@" 레코드는 ANT의 초기 라우팅 ID입니다. 만약 이 ANT에 'my-name'을 등록했고 my-name.arweave.net으로 접근하려 하면 @ 레코드의 transactionId로 리디렉션됩니다.

만약 undername1_my-name.arweave.net으로 접근하면 undername1의 transactionId가 반환됩니다.

이론적으로 ANT는 무제한(UNLIMITED) 수의 undername을 가질 수 있습니다. 다만 실제로 몇 개가 서비스될지는 당신의 ArNS 이름에 적용된 티어에 따라 달라집니다.

## 리소스

- [ArNS 앱](https://arns.app/)
- [ArNS 문서](https://docs.ar.io/arns/)
