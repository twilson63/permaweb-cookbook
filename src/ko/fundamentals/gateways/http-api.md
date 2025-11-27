---
title: HTTP API로 데이터 가져오기
---

# HTTP API로 데이터 가져오기

HTTP API는 Arweave에서 데이터를 가져오는 가장 간단한 방법입니다. 임의의 HTTP 클라이언트를 사용해 Arweave 게이트웨이로 직접 요청할 수 있습니다.

HTTP API 요청은 Arweave 게이트웨이 엔드포인트로 직접 전송됩니다. 이 방법은 추가 패키지를 필요로 하지 않으며 HTTP 요청을 지원하는 모든 프로그래밍 언어에서 작동합니다.

## 기본 데이터 조회

### 트랜잭션 데이터 가져오기

트랜잭션 ID와 연관된 데이터를 가져옵니다:

```sh
GET https://arweave.net/{TX_ID}
```

**예시:**

```bash
curl https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8
```

**JavaScript 예시:**

```js
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

response = await fetch(`https://arweave.net/${txId}`);
console.log(response.data);
```

## 고급 엔드포인트

### 원시 트랜잭션 데이터 가져오기

일부 트랜잭션 유형은 다른 렌더링 규칙을 따릅니다. 변환되지 않은 데이터를 얻으려면 raw 엔드포인트를 사용하세요:

```bash
GET https://arweave.net/raw/{TX_ID}
```

**예시:**

```js
const response = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
);
const data = await response.json();
console.log(data);
```

### 특정 트랜잭션 필드 가져오기

트랜잭션에서 특정 필드만 가져옵니다:

```bash
GET https://arweave.net/tx/{TX_ID}/{FIELD}
```

**사용 가능한 필드:**

- `id` - 트랜잭션 ID
- `last_tx` - 소유자의 마지막 트랜잭션
- `owner` - 소유자의 지갑 주소
- `target` - 대상 지갑 주소 (전송용)
- `quantity` - 전송된 금액 (Winston 단위)
- `data` - 트랜잭션 데이터
- `reward` - 채굴 보상
- `signature` - 트랜잭션 서명

**예시:**

```js
// Get just the owner address
const response = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/owner"
);
const owner = await response.text();
console.log("Owner:", owner);

// Get transaction data
const dataResponse = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
);
const data = await dataResponse.json();
console.log("Data:", data);
```

## 다른 게이트웨이 사용하기

`arweave.net` 대신 임의의 Arweave 게이트웨이를 사용할 수 있습니다:

```js
// Alternative gateways
const gateways = [
  "https://arweave.net",
  "https://arweave.world",
  "https://arweave.live",
  "https://g8way.io",
];

const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

// Try multiple gateways for redundancy
for (const gateway of gateways) {
  try {
    const response = await fetch(`${gateway}/${txId}`);
    if (response.ok) {
      const data = await response.text();
      console.log(`Data from ${gateway}:`, data);
      break;
    }
  } catch (error) {
    console.log(`Failed to fetch from ${gateway}:`, error.message);
  }
}
```

## 오류 처리

HTTP 요청을 할 때는 항상 잠재적인 오류를 처리하세요:

```js
async function fetchArweaveData(txId) {
  try {
    const response = await fetch(`https://arweave.net/${txId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Transaction not found");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

// Usage
fetchArweaveData("sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8")
  .then((data) => console.log("Success:", data))
  .catch((error) => console.error("Error:", error.message));
```

## 요청 제한 및 모범 사례

- **존중을 표시하세요**: 공용 게이트웨이에 과도한 요청을 보내지 마세요
- **적절한 타임아웃 사용**: 요청에 합리적인 타임아웃 값을 설정하세요
- **오류를 우아하게 처리**: 실패한 요청에 대해 재시도 로직을 구현하세요
- **가능하면 캐시 사용**: 자주 접근하는 데이터를 로컬에 저장하세요
- **HTTPS 사용**: 항상 보안 연결을 사용하세요

HTTP API를 사용해 Arweave 데이터를 조회하는 단점은 단일 게이트웨이에 의존한다는 점입니다. 대체 게이트웨이를 설정하거나 데이터 검증을 원한다면 [AR.IO Wayfinder](https://github.com/ar-io/wayfinder)를 확인해 보세요.
