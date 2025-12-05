# 트랜잭션 메타데이터(태그)

Arweave의 트랜잭션은 고유 ID, 서명, 그리고 트랜잭션 게시를 위해 서명하고 비용을 지불한 주소의 소유자 주소를 가집니다.

이러한 헤더 값들과 함께, Arweave 프로토콜은 사용자가 트랜잭션에 사용자 지정 태그를 추가할 수 있도록 허용합니다. 이러한 태그는 트랜잭션에 추가되는 `key: value` 쌍들의 모음으로 지정됩니다.

사용자 지정 태그를 통해 특정 태그 또는 태그들을 포함하는 모든 트랜잭션을 Arweave에서 쿼리하여 찾을 수 있습니다. 트랜잭션을 쿼리하고 필터링하는 기능은 Arweave 위에 구축된 애플리케이션을 지원하는 데 매우 중요합니다.

## 트랜잭션 태그란 무엇인가요?

트랜잭션 태그는 키-값 쌍이며, base64URL 키와 값의 조합은 Arweave 네이티브 트랜잭션의 최대치인 2048바이트 미만이어야 합니다.

트랜잭션 태그의 일반적인 예는 다음과 같습니다:

- `Content-Type`: Permaweb에서 렌더링할 콘텐츠의 MIME 유형을 지정하는 데 사용됩니다.
- `App-Name`: 데이터를 작성하는 애플리케이션을 설명하는 태그입니다.
- `App-Version`: `App-Name`과 짝을 이루는 애플리케이션의 버전입니다.
- `Unix-Time`: 에포크 이후의 시간(초)을 나타내는 유닉스 타임스탬프 태그입니다.
- `Title`: 트랜잭션에 저장된 콘텐츠의 이름 또는 간단한 설명을 제공하는 데 사용됩니다.
- `Description`: 콘텐츠에 대한 더 긴 설명을 제공하는 데 사용됩니다.

트랜잭션 태그는 검색을 위한 트랜잭션 인덱싱, 트랜잭션을 범주로 정리, 또는 트랜잭션에 저장된 콘텐츠에 대한 메타데이터 제공 등 다양한 목적으로 사용될 수 있습니다.

## 트랜잭션 태그에 대해 알아두면 좋은 점

트랜잭션 태그의 키와 값은 모두 Base64URL로 인코딩된 문자열로 저장됩니다. 이를 통해 바이트 배열을 키나 값으로 게시하고 HTTP를 통해 안전하게 전송할 수 있습니다. 디코딩하지 않으면 사람이 읽을 수 없지만, 암호화로 간주되어서는 안 됩니다.

Arweave에 직접 게시된 트랜잭션의 트랜잭션 태그의 최대 전체 크기는 2048바이트입니다. 이 크기는 모든 태그의 모든 키와 모든 값의 연결(concatenation)에 의해 결정됩니다.

트랜잭션 태그는 GraphQL 쿼리에서 사용되어 필터링된 트랜잭션 항목 집합을 반환할 수 있습니다.

## 예시

```ts
const tx = await arweave.createTransaction({ data: mydata });

tx.addTag("Content-Type", "text/html");
tx.addTag("Title", "My incredible post about Transaction Tags");
tx.addTag("Description", "This is one post you do not want to miss!");
tx.addTag("Topic:Amazing", "Amazing");
tx.addTag("Type", "blog-post");

await arweave.transactions.sign(tx, jwk);
await arweave.transactions.post(tx);
```

## 요약

태그는 Permaweb 상에서 비경합적(non-rivalous) 데이터 경험을 장려하기 위해 공통 데이터 표준과 패턴을 소비하고 생성하는 도구를 제공합니다.

그 결과 생태계의 사용자는 데이터가 애플리케이션이 아니라 항상 사용자와 함께 있기 때문에 콘텐츠를 소비하고 생성할 애플리케이션을 선택할 수 있는 자유를 갖게 됩니다.
