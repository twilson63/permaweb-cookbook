# arlocal

`arlocal`은 로컬 Arweave 테스트 환경을 빠르게 설정하고 실행하기 위한 도구입니다. Arweave 게이트웨이 유사 서버에서 트랜잭션을 테스트할 수 있게 해줍니다. 개발자는 Arweave 네트워크에 배포하기 전에 시뮬레이션된 환경에서 애플리케이션을 테스트할 수 있습니다.

사용하는데 $AR 토큰이 필요하지 않으며 트랜잭션은 즉시 처리됩니다.

## CLI

arlocal CLI를 사용하려면 머신에 node와 npm이 설치되어 있어야 합니다.

로컬 게이트웨이를 시작하려면 `npx arlocal`을 실행하세요.

::: tip
실행할 슬림 게이트웨이의 포트를 인수로 지정할 수 있습니다:
`npx arlocal 8080`
:::

로그를 숨기려면 게이트웨이를 실행할 때 `--hidelogs` 플래그를 추가하세요:
`npx arlocal --hidelogs`

## Node

패키지를 개발 의존성으로 설치하려면 다음을 실행하세요:
`yarn add arlocal -D` 또는 `npm install arlocal --save-dev`

```js
import ArLocal from "arlocal";

(async () => {
  const arLocal = new ArLocal();

  // create local testing environment
  await arLocal.start();

  // your tests here

  // shut down testing environment
  await arLocal.stop();
})();
```

`ArLocal` 인스턴스는 다음 옵션으로 생성할 수 있습니다
| 옵션 | 설명 |
| ---- | ----------- |
| port | 사용할 포트 |
| showLogs | 로그 표시 여부 |
| dbPath | 임시 데이터베이스 디렉토리 |
| persist | 서버 재시작 간 데이터 유지

### 예시

이 예시가 동작하려면 코드에서 생성된 테스트 지갑을 사용해야 합니다. 이를 위해 프로젝트에 `arweave` 패키지를 `arlocal`과 함께 설치해야 합니다.

`yarn add arweave arlocal -D` 또는 `npm install --save-dev arweave arlocal`

아래는 arlocal을 사용해 데이터 트랜잭션을 생성하고 Arweave에 게시하는 기본 JavaScript 테스트 예시입니다:

```js
import ArLocal from "arlocal";
import Arweave from "arweave";

test("test transaction", async () => {
  // create and start ArLocal instance
  const arLocal = new ArLocal();
  await arLocal.start();
  // create local Arweave gateway
  const arweave = Arweave.init({
    host: "localhost",
    port: 1984,
    protocol: "http",
  });
  // generate wallet
  const wallet = await arweave.wallets.generate();
  // airdrop amount of tokens (in winston) to wallet
  await arweave.api.get(`mint/${addr}/10000000000000000`);
  // create mine function
  const mine = () => arweave.api.get("mine");
  try {
    // create transaction
    let transaction = await arweave.createTransaction(
      {
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
      },
      wallet
    );
    // sign and post transaction
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // mine transaction
    await mine();
    // test the response
  } catch (err) {
    console.error("ERROR: ", err.message);
  }
  // tear down testing environment
  await arLocal.stop();
});
```

::: warning
L1 트랜잭션의 테스트 결과는 L2 트랜잭션과 다를 수 있습니다
:::

## 리소스

[arlocal docs](https://github.com/textury/arlocal)
