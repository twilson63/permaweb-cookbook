# 트랜잭션 데이터 가져오기

인덱싱 서비스는 트랜잭션 메타데이터 쿼리를 허용하지만 트랜잭션 데이터 자체에 대한 접근을 제공하지는 않습니다. 이는 트랜잭션 데이터를 캐시하는 것과 인덱싱 메타데이터를 처리하는 것이 서로 다른 리소스 요구사항을 가지기 때문입니다. 인덱싱 서비스는 주로 데이터베이스에서 쿼리를 수행하기 위한 컴퓨트 리소스에 의존하는 반면, 트랜잭션 데이터는 저장 및 대역폭 최적화를 위해 콘텐츠 전송 네트워크(CDN)에 배포하는 것이 더 적합합니다.

트랜잭션 데이터 캐싱 서비스는 대부분의 게이트웨이가 일련의 HTTP 엔드포인트를 통해 제공합니다. 이러한 엔드포인트에서 트랜잭션 데이터를 요청하려면 모든 HTTP 클라이언트/패키지를 사용할 수 있습니다. 예: JavaScript의 Axios 또는 Fetch, PHP의 Guzzle 등.

<img src="https://ar-io.net/VZs292M6mq8LqvjLMdoHGD45qZKDnITQVAmiM9O2KSI" width="700">

트랜잭션 데이터 캐싱 서비스를 우회하여 Arweave 피어/노드에서 직접 데이터를 가져올 수도 있지만, 상당한 작업이 필요합니다!

트랜잭션 데이터는 네트워크 시작 시점부터 현재 블록까지 연속적인 256KB 청크들의 시퀀스로 Arweave에 저장됩니다. 이 형식은 채굴자가 Arweave 데이터를 저장하고 있음을 증명하기 위해 참여하는 SPoRA 채굴 메커니즘을 지원하도록 최적화되어 있습니다.

::: info

1. 잘 알려진 피어에서 피어 목록을 가져옵니다.
1. 해당 피어에 트랜잭션 데이터가 포함된 청크 오프셋을 요청합니다.
1. 피어에 청크를 요청합니다.
   1. 피어가 청크를 제공하면, 청크들을 원래 포맷으로 결합합니다.
1. (피어가 청크를 보유하지 않은 경우) 청크를 요청하기 위해 피어 목록을 순회합니다.
1. 방문하는 각 피어에 대해 그들의 피어 목록을 확인하고 아직 목록에 없는 피어를 추가합니다.
1. 모든 청크를 얻을 때까지 3단계부터 반복합니다.
   :::

이 작업을 Arweave 네트워크에서 데이터를 가져올 때마다 수행하는 것은 꽤 많은 작업입니다. 예를 들어 [https://public-square.arweave.net](https://public-square.arweave.net)처럼 트윗 타임라인을 표시하려고 한다고 상상해 보세요. 로드 시간이 길고 로딩 표시기가 계속 표시되면 사용자 경험이 매우 나빠집니다. Arweave의 데이터는 영구적이므로 원래 형태로 안전하게 캐시할 수 있으며, 이를 통해 트랜잭션 데이터의 조회를 훨씬 빠르고 쉽게 만들 수 있습니다.

다음 HTTP 엔드포인트는 arweave.net 트랜잭션 데이터 캐싱 서비스에서 캐시된 트랜잭션 데이터에 접근하는 방법을 보여줍니다.

<hr />

### 캐시된 TX 데이터 가져오기

이 메서드는 지정된 트랜잭션 ID(TX_ID)와 연관된 트랜잭션 데이터를 캐시에서 가져옵니다.

`https://arweave.net/TX_ID`

```js
const res = await axios.get(
  `https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8`
);
console.log(res);
```

<details>
<summary><b>예제 결과 보기</b></summary>

```json
{
  "data": {
    "ticker": "ANT-PENDING",
    "name": "pending",
    "owner": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
    "controller": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
    "evolve": null,
    "records": {
      "@": "As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
    },
    "balances": {
      "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0": 1
    }
  },
  "status": 200,
  "statusText": "",
  "headers": {
    "cache-control": "public,must-revalidate,max-age=2592000",
    "content-length": "291",
    "content-type": "application/json; charset=utf-8"
  },
  "config": {
    "transitional": {
      "silentJSONParsing": true,
      "forcedJSONParsing": true,
      "clarifyTimeoutError": false
    },
    "adapter": ["xhr", "http"],
    "transformRequest": [null],
    "transformResponse": [null],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "env": {},
    "headers": {
      "Accept": "application/json, text/plain, */*"
    },
    "method": "get",
    "url": "https://arweave.net/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8"
  },
  "request": {}
}
```

</details>
<hr />

### 원시 트랜잭션 가져오기

일부 [트랜잭션 유형](manifests.md)에 대한 데이터는 렌더링 규칙이 다르게 적용됩니다. 이 엔드포인트는 변환되지 않은(raw) 원시 데이터를 반환합니다.
`https://arweave.net/raw/TX_ID`

```js
const result = await fetch(
  "https://arweave.net/raw/rLyni34aYMmliemI8OjqtkE_JHHbFMb24YTQHGe9geo"
).then((res) => res.json());
console.log(JSON.stringify(result));
```

<details>
<summary><b>예제 결과 보기</b></summary>

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": {
      "id": "FOPrEoqqk184Bnk9KrnQ0MTZFOM1oXb0JZjJqhluv78"
    }
  }
}
```

</details>
<hr/>

각 Arweave 피어/노드도 종종 복제된 게이트웨이 역할을 하는 일부 HTTP 엔드포인트를 노출합니다. Arweave 피어의 HTTP 엔드포인트에 대해서는 [여기](/references/http-api.md)에서 자세히 읽을 수 있습니다.

---

## Wayfinder로 데이터 가져오기

[Wayfinder](https://docs.ar.io/wayfinder)는 AR.IO 네트워크를 통해 Arweave에 저장된 데이터에 대해 분산화되고 암호학적으로 검증된 접근을 제공하는 프로토콜 및 라이브러리 집합입니다. Wayfinder는 각 요청에 대해 최적의 게이트웨이를 자동으로 선택하고, 데이터 무결성을 검증하며, 퍼마웹(permaweb) 콘텐츠에 대한 안정적인 접근을 보장합니다.

- **지능형 라우팅**: 가장 빠르고 신뢰할 수 있는 게이트웨이를 자동으로 선택합니다.
- **데이터 검증**: 변경되지 않은 진본 콘텐츠를 수신했는지 확인합니다.
- **분산 접근**: AR.IO 게이트웨이 네트워크 전반에 요청을 분산시킵니다.

### 설치

```bash
npm install @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-core
```

### 기본 사용법 (JavaScript/TypeScript)

```js
import { Wayfinder, NetworkGatewaysProvider } from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

const wayfinder = new Wayfinder({
  gatewaysProvider: new NetworkGatewaysProvider({ ario: ARIO.mainnet() }),
});

// Replace with your transaction ID
const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";

(async () => {
  try {
    const response = await wayfinder.request(`ar://${txId}`);
    const data = await response.text();
    console.log("Data:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
})();
```

### React 사용법

두 패키지를 모두 설치하세요:

```bash
npm install @ar.io/wayfinder-react @ar.io/wayfinder-core
# or
yarn add @ar.io/wayfinder-react @ar.io/wayfinder-core
```

```jsx
import { WayfinderProvider, useWayfinderRequest } from "@ar.io/wayfinder-react";
import { NetworkGatewaysProvider } from "@ar.io/wayfinder-core";
import { ARIO } from "@ar.io/sdk";

function App() {
  return (
    <WayfinderProvider
      gatewaysProvider={new NetworkGatewaysProvider({ ario: ARIO.mainnet() })}
    >
      <MyComponent />
    </WayfinderProvider>
  );
}

function MyComponent() {
  const request = useWayfinderRequest();
  const txId = "sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8";
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      try {
        const response = await request(`ar://${txId}`);
        setData(await response.text());
      } catch (e) {
        setData("Error: " + e.message);
      }
    })();
  }, [request, txId]);
  return <pre>{data}</pre>;
}
```

더 고급 구성 및 사용법은 [공식 Wayfinder 문서](https://docs.ar.io/wayfinder)를 참조하세요.
