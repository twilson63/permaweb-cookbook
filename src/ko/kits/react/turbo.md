# React Starter Kit w/vite & ArDrive

이 가이드는 Permaweb React 애플리케이션을 빌드하고 배포하기 위해 개발 환경을 단계별로 구성하는 방법을 안내합니다.

## 사전 요구 사항

- 기본적인 TypeScript 지식 (필수 아님) - [TypeScript 배우기](https://www.typescriptlang.org/docs/)
- NodeJS v16.15.0 이상 - [NodeJS 다운로드](https://nodejs.org/en/download/)
- ReactJS에 대한 지식 - [ReactJS 배우기](https://reactjs.org/)
- Git 및 일반적인 터미널 명령어 숙지

## 개발 의존성

- TypeScript
- NPM 또는 Yarn 패키지 매니저

## 단계

### React 앱 생성

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm create vite my-arweave-app --template react-ts
cd my-arweave-app
npm install
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn create vite my-arweave-app --template react-ts
cd my-arweave-app
yarn
```

</CodeGroupItem>
</CodeGroup>

### React Router DOM 추가

<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm install react-router-dom
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn add react-router-dom
```

</CodeGroupItem>
</CodeGroup>

Arweave에서 작동하는 앱을 만들기 위해 hash-router를 사용해야 합니다.

### 페이지 컴포넌트

```sh
touch src/Home.tsx src/About.tsx
```

src/Home.tsx

```tsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Welcome to the Permaweb!
      <Link to={"/about/"}>
        <div>About</div>
      </Link>
    </div>
  );
}

export default Home;
```

src/About.tsx

```tsx
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      Welcome to the About page!
      <Link to={"/"}>
        <div>Home</div>
      </Link>
    </div>
  );
}

export default About;
```

#### App.tsx 수정

다른 페이지를 관리하도록 App.tsx를 업데이트해야 합니다.

```tsx
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about/"} element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
```

#### index.css 수정

`body` 선택자를 다음과 같이 변경하세요.

```css
body {
  margin: 0;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  place-items: center;
  min-width: 100%;
  min-height: 100vh;
}
```

프로젝트 실행
<CodeGroup>
<CodeGroupItem title="NPM">

```sh
npm run dev
```

</CodeGroupItem>
<CodeGroupItem title="YARN">

```sh
yarn dev
```

</CodeGroupItem>
</CodeGroup>

### React 앱 빌드

#### vite.config.ts 수정

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
});
```

#### 앱 빌드

```sh
yarn build
```

### 영구 배포

#### 지갑 생성

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

그런 다음 터미널에서 다음 명령을 실행하세요.

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

#### 지갑 자금 충전

지갑을 ArDrive Turbo 크레딧으로 충전해야 합니다. 이를 위해 [ArDrive](https://app.ardrive.io)에 접속하여 지갑을 가져오세요.
그런 다음 지갑에 대해 turbo 크레딧을 구매할 수 있습니다.

#### Permaweb-Deploy 설정

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --save-dev permaweb-deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add permaweb-deploy --dev --ignore-engines
```

  </CodeGroupItem>
</CodeGroup>

::: info
앱을 업로드하려면 지갑에 AR을 추가하고 Turbo 크레딧으로 자금을 충전해야 합니다. 자세한 내용은 [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)를 참조하세요.
:::

#### package.json 업데이트

```json
{
  ...
  "scripts": {
    ...
    "deploy": "npm run build && permaweb-deploy --arns-name my-react-app"
  }
  ...
}
```

::: info
`my-react-app`을 실제 ArNS 이름으로 변경하세요. 또한 스테이징 배포를 위해 `--undername staging`과 같은 추가 옵션을 추가할 수 있습니다.
:::

#### 빌드 실행

이제 빌드를 생성할 차례입니다. 다음을 실행하세요.

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

#### 배포 실행

마지막으로 첫 Permaweb 애플리케이션을 배포합니다.

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

::: warning 자금 부족
만약 `Insufficient funds` 오류가 발생하면, 배포 지갑에 Turbo 크레딧을 충전했는지 확인하세요. 자세한 내용은 [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)를 참조하세요.
:::

#### 응답

다음과 유사한 응답을 확인할 수 있습니다:

```shell
-------------------- DEPLOY DETAILS --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-react-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-react-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

React 앱은 `https://my-react-app.arweave.net`(ArNS 사용 시) 또는 `https://arweave.net/abc123def456ghi789jkl012mno345pqr678stu901v`에서 확인할 수 있습니다.

::: tip 성공
이제 Permaweb에 React 애플리케이션을 배포했습니다! 잘 하셨습니다!
:::

## 축하합니다!

Permaweb에 React 애플리케이션을 성공적으로 게시했습니다!
