# SmartWeave

> **⚠️ 사용 중단 알림**
>
> 이 문서는 사용 중단되었으며 오래된 정보를 포함하고 있을 수 있습니다.

## SmartWeave란?

SmartWeave는 Arweave에서 지배적인 스마트 계약(SmartContract) 패러다임에 붙여진 이름입니다. SmartWeave 계약의 고유한 특성은 현재 계약 상태가 "지연 평가(lazy evaluation)" 방식으로 제공된다는 점입니다. 이는 Arweave 채굴 노드가 모든 계약의 현재 상태를 지속적으로 평가하는 대신, 계약을 읽는 클라이언트가 스스로 상태를 평가한다는 것을 의미합니다.

## SmartWeave가 중요한 이유는 무엇인가?

분산 애플리케이션의 상태와 로직은 그들의 데이터와 마찬가지로 검열 저항성, 영구성 및 검증 가능성을 가져야 합니다. SmartWeave는 개발자가 온체인에 앱의 상태와 로직을 캡슐화한 스마트 계약을 작성하고 신뢰 없이 검증 가능한 방식으로 실행할 수 있도록 합니다. 이는 Arweave 프로토콜이 네트워크의 스마트 계약 상태를 평가할 노드에 대한 인센티브를 포함하고 있지 않기 때문에 결코 쉬운 일이 아닙니다.

SmartWeave는 상태를 유지하기 위해 영구 저장소를 활용하는 불변의 추가 전용(append-only) 패턴을 계약 상호작용에 제공합니다. 그 결과는 완전 분산된 온체인 상태 기계로, 프로토콜 및 애플리케이션에 권한 없음(permissionless)과 신뢰 없음(trustless) 방식으로 동적 기능을 제공할 수 있습니다. SmartWeave를 사용하면 개발자는 Arweave에 저장되고 시간이 지나도 변경되지 않도록 보장되는 스마트 계약을 생성할 수 있습니다. 이를 통해 권한 없음 및 신뢰 없음 방식으로 사용할 수 있는 동적 기능을 갖춘 퍼마웹(Permaweb) 애플리케이션을 구축할 수 있습니다.

개발자가 퍼마웹 애플리케이션의 로직을 구현하기 위해 SmartWeave를 선택하는 여러 이유는 다음과 같습니다:

- **분산 저장소:** SmartWeave는 Arweave 위에 구축되어 있으므로 SmartWeave로 생성된 애플리케이션은 중앙 서버가 아닌 분산된 노드 네트워크에 저장됩니다. 이는 검열, 변조 및 기타 간섭에 대한 저항성을 높일 수 있습니다.

- **지연 평가:** SmartWeave 계약의 지연 평가 기능은 효율적이고 확장 가능한 실행을 가능하게 합니다. Arweave 노드가 계약의 상태를 지속적으로 평가하는 대신, 계약을 읽는 클라이언트가 상태를 평가하여 네트워크 노드 대신 사용자 처리 능력을 활용합니다.

- **언어 지원:** SmartWeave는 JavaScript, TypeScript, Rust, Go, AssemblyScript 및 WASM(WebAssembly) 등 다양한 프로그래밍 언어를 지원합니다. 이를 통해 개발자는 SmartWeave 애플리케이션을 만들 때 자신에게 익숙한 언어를 사용할 수 있습니다.

- **데이터 내구성:** Arweave는 데이터를 장기간 동안 높은 내구성으로 저장하도록 설계되었습니다. 이는 역사 기록이나 과학 데이터처럼 장기간 데이터를 보관해야 하는 애플리케이션에 유용합니다.

- **경제 모델:** Arweave는 영구 저장 개념을 기반으로 노드가 데이터를 무기한 저장하도록 장려하는 고유한 경제 모델을 사용합니다. 이는 SmartWeave로 생성된 퍼마웹 애플리케이션의 장기적 생존 가능성과 내구성을 보장하는 데 도움이 될 수 있습니다.

## SmartWeave는 어떻게 작동하나요?

SmartWeave 계약은 근본적으로 초기 계약 상태에서 시작하여 트랜잭션 태그를 통해 편집, 추가 및 제거되어 빌드됩니다.

`Warp`(이전 명칭 `RedStone`)와 같은 SmartWeave SDK는 이러한 트랜잭션을 쿼리하여 로컬에서 계약 상태를 구성하는 데 사용됩니다. 평가기(Evaluator, `Warp`)는 태그를 사용해 계약의 트랜잭션을 쿼리합니다; App-Name 태그와 Contract 태그를 통해 트랜잭션이 해당 계약의 일부인지 식별합니다.

다음은 계약 **상호작용(interaction)** 예시입니다.

- `App-Name`은 이것이 SmartWeave **ACTION**임을 나타냅니다.
- `Contract` 태그는 초기 계약 상태의 특정 트랜잭션 ID를 제공합니다.
- `Input` 태그는 계약이 실행할 함수와 필요로 하는 다른 데이터를 제공합니다:

```json
[
    {
        name:"App-Name"
        value:"SmartWeaveAction"
    },
    {
        name:"App-Version"
        value:"0.3.0"
    },
    {
        name:"Contract"
        value:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        name:"Input"
        value:"{
            "function":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```

다음은 **계약(contract)** 예시입니다.

- `App-Name`은 이것이 SmartWeave **CONTRACT**임을 나타냅니다.
- `Contract-Src` 태그는 계약의 소스 코드를 가리킵니다:

```json
[
    {
        key:"App-Name"
        value:"SmartWeaveContract"
    },
    {
        key:"App-Version"
        value:"0.3.0"
    },
    {
        key:"Contract-Src"
        value:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        key:"SDK"
        value:"RedStone"
    },
    {
        key:"Content-Type"
        value:"application/json"
    }
]
```

최종적으로 산출된 상태는 현재 계약 상태이며, 클라이언트 측 SDK는 이를 사용해 사용자 잔액, 계약 소유자 및 기타 계약 관련 세부사항을 계산할 수 있습니다. 호출자가 검증된 계약 상태를 확보하면, 사용자가 블록체인에 배포할 상호작용을 작성할 수 있고, 해당 트랜잭션이 채굴되거나 [Gateway](/concepts/gateways.md)에서 인덱싱되면 누군가가 다음 번에 계약 상태를 구성할 때 포함됩니다.

SmartWeave 프로토콜, 그 주요 구현체인 Warp Contracts 등에 대한 포괄적인 개요는 [Warp Academy](https://academy.warp.cc/)를 참조하세요. 단계별 튜토리얼을 따라가고, 고급 개념을 탐구하며 SmartWeave가 퍼마웹을 어떻게 강화하는지 확인해 보세요!

## SmartWeave 생태계 프로젝트

SmartWeave 스마트 계약을 활용하는 생태계 프로젝트가 상당수 존재합니다. 주요 프로젝트는 다음과 같습니다:

### 구현체

- [Warp](https://warp.cc/) | SmartWeave SDK, 튜토리얼의 주요 제공자이며 SmartWeave 프로토콜 유지에 기여합니다.
- [MEM](https://www.mem.tech/) | Molecular Execution Machine(MEM)은 분산 환경에서 고가용성 및 고성능 애플리케이션의 생성 및 사용을 지원하는 개발자 플랫폼입니다.

### 도구

- [SonAr](https://sonar.warp.cc/#/app/contracts) | Warp가 제작 및 호스팅하는 SmartWeave 계약 탐색기입니다.

### 자료

- [Warp Academy](https://academy.warp.cc/) | SmartWeave 관련 모든 것을 위한 원스톱 자료실

### 앱

- [Permapages](https://permapages.app/) | 영구 웹페이지 생성 도구, ArNS 구매 포털 및 ANT 생성 포털. 퍼마웹상의 프로필을 제공합니다.
- [ArNS](arns.md) | Arweave 네임 시스템 <!-- // todo: update to arns portal when portal is released -->
- [WeaveDB](https://weavedb.dev/) | Smart Contract로 구현된 NoSQL 데이터베이스입니다.
- [KwilDB](https://docs.kwil.com/) | Smart Contract로 구현된 SQL 데이터베이스입니다.
- [ArDrive Inferno](https://ardrive.io/inferno/) | ArDrive를 통해 업로드할 때 PST를 획득합니다.
- [FirstBatch](https://www.firstbatch.xyz/) | FirstBatch는 개발자와 기업이 개인화되고 프라이빗하며 왜곡 없는 AI 애플리케이션을 만드는 것을 돕습니다.
- [Othent](https://othent.io/) | 기존의 전통적 소셜 로그인으로 Web3 트랜잭션을 처리합니다.
- [BazAR](https://bazar.arweave.net/) | 현실 세계 권리를 포함한 디지털 콘텐츠 마켓플레이스입니다.
- [Alex the Archieve](https://alex.arweave.net/) | Arweave의 불변 저장소를 활용하는 분산 아카이브 플랫폼입니다.

그리고 그 밖에도 많은 프로젝트가 있습니다.
