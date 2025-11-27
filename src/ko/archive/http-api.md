# Arweave 피어 HTTP API

Arweave 피어 HTTP API에 대한 보다 완전한 참조는 [링크된 가이드](https://docs.arweave.org/developers/server/http-api)를 참조하세요.

여기에 제시된 엔드포인트들은 편의상 제공되었거나 [링크된 가이드](https://docs.arweave.org/developers/server/http-api)에 누락되어 있었기 때문에 포함된 것입니다.

::: info
Permaweb 게이트웨이 서비스는 일반적으로 하나 이상의 전체 Arweave 노드에 의해 백엔드로 실행됩니다. 결과적으로 이러한 서비스는 종종 노드 엔드포인트를 `/tx/` 경로 아래에 노출하고 요청을 직접 Arweave 노드로 라우팅합니다. 이는 이러한 메서드들이 게이트웨이뿐만 아니라 Arweave 피어/노드에서 직접 호출될 수 있음을 의미합니다.
:::

<hr />

### 필드별 조회

트랜잭션과 연관된 헤더 필드를 Arweave 노드에서 직접 가져옵니다. 노드가 청크를 저장하고 데이터가 노드가 제공하기에 충분히 작다면 트랜잭션 데이터를 가져오는 데에도 사용할 수 있습니다.

`https://arweave.net/tx/TX_ID/FIELD`

사용 가능한 필드: id | last_tx | owner | target | quantity | data | reward | signature

```js
const result = await fetch(
  "https://arweave.net/tx/sHqUBKFeS42-CMCvNqPR31yEP63qSJG3ImshfwzJJF8/data"
);
// fields are returned in base64url format, so we need to decode
const base64url = await result.text();
const jsonData = JSON.parse(Arweave.utils.b64UrlToString(base64url));
console.log(jsonData);
```

<details>
<summary><b>예제 결과 보기</b></summary>

```json
{
  "ticker": "ANT-PENDING",
  "name": "pending",
  "owner": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "controller": "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0",
  "evolve": null,
  "records": {
    "@": "As-g0fqvO_ALZpSI8yKfCZaFtnmuwWasY83BQ520Duw"
  },
  "balances": { "NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0": 1 }
}
```

</details>
<hr />

### 지갑 잔액 조회

반환되는 잔액은 Winston 단위입니다. $AR 단위로 얻으려면 잔액을 1000000000000으로 나누세요.
`https://arweave.net/wallet/ADDRESS/balance`

```js
const res = await axios.get(
  `https://arweave.net/wallet/NlNd_PcajvxAkOweo7rZHJKiIJ7vW1WXt9vb6CzGmC0/balance`
);
console.log(res);
console.log(res.data / 1000000000000);

6638463438702; // Winston
6.638463438702; // $AR
```

<hr />

### 트랜잭션 상태 조회

`https://arweave.net/tx/TX_ID/status`
::: tip
이 엔드포인트는 번들된 트랜잭션이 아닌 기본 Arweave 트랜잭션만 지원합니다. 트랜잭션의 상태는 온체인에서 확인(confirmed)되어야 조회할 수 있습니다.
:::

```js
const response = await fetch(
  "https://arweave.net/tx/EiRSQExb5HvSynpn0S7_dDnwcws1AJMxoYx4x7nWoho/status"
);
const result = await response.json();
console.log(JSON.stringify(result));
```

<details>
<summary><b>예제 결과 보기</b></summary>

```json
{
  "block_height": 1095552,
  "block_indep_hash": "hyhLEyOw5WcIhZxq-tlnxhnEFgKChKHFrMoUdgIg2Sw0WoBMbdx6uSJKjxnQWon3",
  "number_of_confirmations": 10669
}
```

</details>
<hr />

### 네트워크 정보 조회

```js
const res = await axios.get("https://arweave.net/info");
console.log(res.data);
```

<details>
<summary><b>예제 결과 보기</b></summary>

```json
{
  "network": "arweave.N.1",
  "version": 5,
  "release": 53,
  "height": 1106211,
  "current": "bqPU_7t-TdRIxgsja0ftgEMNnlGL6OX621LPJJzYP12w-uB_PN4F7qRYD-DpIuRu",
  "blocks": 1092577,
  "peers": 13922,
  "queue_length": 0,
  "node_state_latency": 0
}
```

</details>
<hr />
