# Vue 스타터 킷 만들기

이 가이드는 개발 환경을 구성하고 Permaweb용 Vue 애플리케이션을 빌드하는 단계별 지침을 제공합니다.

## 사전 요구 사항

- 기본 TypeScript 지식 (필수 아님) - [TypeScript 배우기](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 이상 - [NodeJS 다운로드](https://nodejs.org/en/download/)
- Vue.js 지식(가능하면 Vue 3) - [Vue.js 배우기](https://vuejs.org/)
- git 및 기본 터미널 명령어에 대한 지식

## 개발 의존성

- TypeScript(선택 사항)
- NPM 또는 Yarn 패키지 매니저

## 단계

### 프로젝트 생성

다음 명령은 Vue 프로젝트를 위한 공식 스캐폴딩 도구인 create-vue를 설치하고 실행합니다.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm init vue@latest
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn create vue
```

  </CodeGroupItem>
</CodeGroup>

설치 과정에서 TypeScript나 테스트 지원과 같은 선택적 기능을 선택하라는 프롬프트가 표시됩니다. `Vue Router`는 '예'로 선택하는 것을 권장하며, 나머지는 필요에 따라 선택하세요.

```console:no-line-numbers
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / *Yes*
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

### 프로젝트 디렉토리로 이동

```sh
cd <your-project-name>
```

### 의존성 설치

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn
```

  </CodeGroupItem>
</CodeGroup>

### 라우터 설정

Vue Router는 Vue.js의 공식 라우터로 Vue와 원활하게 통합됩니다. Permaweb과 함께 작동시키려면 URL을 서버로 전송할 수 없으므로 브라우저 히스토리 라우터에서 해시 라우터로 전환해야 합니다. `src/router/index.ts` 또는 `src/router/index.js` 파일에서 `createWebHistory`를 `createWebHashHistory`로 변경하세요.

```ts
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
```

### 빌드 설정

빌드 프로세스는 `vite.config.ts` 또는 `vite.config.js` 파일에서 구성하세요. Permaweb 앱을 서브 경로(https://[gateway]/[TX_ID])에서 제공하려면 구성 파일의 base 속성을 ./로 업데이트하세요.

```ts
export default defineConfig({
  base: './',
  ...
})
```

### 앱 실행

다음 단계로 진행하기 전에 모든 것이 정상적으로 작동하는지 확인하는 것이 중요합니다. 원활한 진행을 위해 확인을 실행하세요.

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn dev
```

  </CodeGroupItem>
</CodeGroup>

기본적으로 로컬에서 새 개발 서버를 시작하며 기본 포트는 `PORT 5173`입니다. 이 포트가 이미 사용 중이면 포트 번호를 1씩 증가시켜 (`PORT 5174`) 다시 시도할 수 있습니다.

## 영구 배포

### 지갑 생성

지갑을 생성하려면 `arweave` 패키지가 필요합니다.

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

그런 다음 터미널에서 다음 명령을 실행하세요

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### 지갑 자금 충전

지갑에 ArDrive Turbo 크레딧을 충전해야 합니다. 이를 위해 [ArDrive](https://app.ardrive.io)에 접속하여 지갑을 가져온 다음, 해당 지갑에 대해 Turbo 크레딧을 구매하세요.

### Permaweb-Deploy 설정

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add permaweb-deploy
```

  </CodeGroupItem>
</CodeGroup>

### 지갑 자금 충전

Turbo는 Arweave에 데이터를 업로드하기 위해 Turbo 크레딧을 사용합니다. Turbo 크레딧은 다양한 법정화폐 또는 암호화폐로 구매할 수 있습니다. 아래는 지갑에 10 USD를 충전하는 예시입니다. Stripe를 통해 결제를 완료하기 위해 브라우저 창이 열립니다.

```console:no-line-numbers
npm install @ardrive/turbo-sdk
turbo top-up --wallet-file wallet.json --currency USD --value 10
```

반드시 `wallet.json`을 실제 Arweave 지갑 파일 경로로 교체하세요.

### package.json 업데이트

```json
{
  ...
  "scripts": {
    ...
    "deploy": "DEPLOY_KEY=$(base64 -i wallet.json) permaweb-deploy --ant-process << ANT-PROCESS >> --deploy-folder build"
  }
  ...
}
```

::: info
<< ANT-PROCESS >>를 실제 ANT 프로세스 ID로 교체하세요.
:::

### 빌드 실행

이제 빌드를 생성할 차례입니다. 다음을 실행하세요

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run build
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn build
```

  </CodeGroupItem>
</CodeGroup>

### 배포 실행

드디어 첫 Permaweb 애플리케이션을 배포할 준비가 되었습니다.

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn deploy
```

  </CodeGroupItem>
</CodeGroup>

::: info ERROR
`Insufficient funds` 오류가 발생하면 배포 지갑에 ArDrive Turbo 크레딧을 충전했는지 확인하세요.
:::

### 응답

다음과 유사한 응답이 표시됩니다:

```shell
Deployed TxId [<<tx-id>>] to ANT [<<ant-process>>] using undername [<<undername>>]
```

귀하의 Vue 앱은 `https://arweave.net/<< tx-id >>`에서 확인할 수 있습니다.

::: tip SUCCESS
축하합니다! 이제 Permaweb에 Vue 애플리케이션이 배포되었습니다!
:::

## 요약

이 가이드는 Create Vue를 사용해 Permaweb에 Vue.js 앱을 게시하는 간단한 단계별 방법을 제공합니다. Tailwind와 같은 추가 기능이 필요하다면, 가이드에 나열된 대체 스타터 킷을 살펴보고 요구사항에 적합한 솔루션을 찾아보세요.
