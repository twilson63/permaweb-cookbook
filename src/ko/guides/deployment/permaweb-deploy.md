---
title: "Permaweb 배포"
description: "자동 ArNS 업데이트가 포함된 permaweb-deploy CLI 도구를 사용하여 Permaweb에 웹 애플리케이션 및 파일을 배포"
difficulty: "초급"
stability: "안정적"
timeEstimate: "10분"
---

# Permaweb Deploy

`permaweb-deploy`는 Arweave를 사용하여 Permaweb에 웹 애플리케이션과 파일을 배포하는 과정을 간소화하는 Node.js 명령줄 도구입니다. 빌드 폴더 또는 단일 파일을 업로드하고 Arweave 매니페스트를 생성하며 새 트랜잭션 ID로 ArNS(Arweave Name Service) 레코드를 자동으로 업데이트합니다.

## 기능

- **Turbo SDK 통합**: Arweave로의 빠르고 안정적인 파일 업로드
- **Arweave Manifest v0.2.0**: SPA에 대한 폴백 지원을 포함한 매니페스트 생성
- **ArNS 업데이트**: 새 트랜잭션 ID로 ANT를 통해 ArNS 레코드를 자동 업데이트
- **자동화된 워크플로우**: GitHub Actions와 원활하게 통합
- **Git 해시 태깅**: 커밋 해시로 배포 자동 태깅
- **404 폴백 감지**: 404.html을 자동으로 폴백으로 감지 및 설정
- **네트워크 지원**: 메인넷, 테스트넷 및 커스텀 ARIO 프로세스 ID 지원
- **유연한 배포**: 폴더 또는 단일 파일 배포 가능

## 설치

```bash
npm install permaweb-deploy --save-dev
```

Yarn 사용자:

```bash
yarn add permaweb-deploy --dev --ignore-engines
```

## 전제 조건

### 지갑 구성

**Arweave 서명자(기본):**
Arweave 지갑 키를 base64 형식으로 인코딩하세요:

```bash
base64 -i wallet.json | pbcopy
```

인코딩된 지갑을 `DEPLOY_KEY` 환경 변수로 설정하세요.

**Ethereum/Polygon/KYVE 서명자:**
원시 개인 키(인코딩 불필요)를 `DEPLOY_KEY`로 사용하세요.

:::warning 보안 권장사항
배포 전용 지갑을 사용하여 보안 위험을 최소화하세요. 업로드를 위해 지갑에 충분한 Turbo Credits가 있는지 확인하세요.
:::

## 기본 사용법

`package.json`에 배포 스크립트를 추가하세요:

```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

애플리케이션 배포:

```bash
npm run deploy
```

## CLI 옵션

| Option            | Alias | 설명                                                  | Default   |
| ----------------- | ----- | ----------------------------------------------------- | --------- |
| `--arns-name`     | `-n`  | **필수.** 업데이트할 ArNS 이름                        | -         |
| `--ario-process`  | `-p`  | ARIO 프로세스(`mainnet`, `testnet`, 또는 프로세스 ID) | `mainnet` |
| `--deploy-folder` | `-d`  | 배포할 폴더                                           | `./dist`  |
| `--deploy-file`   | `-f`  | 폴더 대신 단일 파일을 배포                            | -         |
| `--undername`     | `-u`  | 업데이트할 ANT undername                              | `@`       |
| `--ttl-seconds`   | `-t`  | ANT 레코드의 TTL(초) (60-86400)                       | `3600`    |
| `--sig-type`      | `-s`  | 서명자 유형(`arweave`, `ethereum`, `polygon`, `kyve`) | `arweave` |

## 예시

**애플리케이션 배포**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app
```

**특정 폴더 배포**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-folder ./build
```

**단일 파일 배포**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --deploy-file ./script.lua
```

**Undername으로 배포**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --undername staging
```

**커스텀 TTL로 배포**

```bash
DEPLOY_KEY=$(base64 -i wallet.json) npx permaweb-deploy --arns-name my-app --ttl-seconds 7200
```

**Ethereum 서명자로 배포**

```bash
DEPLOY_KEY=<ETH_PRIVATE_KEY> npx permaweb-deploy --arns-name my-app --sig-type ethereum
```

## 네트워크 구성

**메인넷 (기본)**

```json
{
  "scripts": {
    "deploy": "npm run build && permaweb-deploy --arns-name my-app"
  }
}
```

**테스트넷**

```json
{
  "scripts": {
    "deploy:test": "npm run build && permaweb-deploy --arns-name my-app --ario-process testnet"
  }
}
```

**커스텀 프로세스 ID**

```json
{
  "scripts": {
    "deploy:custom": "npm run build && permaweb-deploy --arns-name my-app --ario-process PROCESS_ID"
  }
}
```

## GitHub Actions 통합

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy to Permaweb
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run deploy
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
```

## 배포 출력

성공적으로 배포되면 다음과 유사한 출력이 표시됩니다:

```
-------------------- DEPLOY DETAILS --------------------
Tx ID: abc123def456ghi789jkl012mno345pqr678stu901v
ArNS Name: my-app
Undername: @
ANT: xyz789abc012def345ghi678jkl901mno234pqr567s
AR IO Process: bh9l1cy0aksiL_x9M359faGzM_yjralacHIUo8_nQXM
TTL Seconds: 3600
--------------------------------------------------------
Deployed TxId [abc123def456ghi789jkl012mno345pqr678stu901v] to name [my-app] for ANT [xyz789abc012def345ghi678jkl901mno234pqr567s] using undername [@]
```

## 보안 권장사항

- **전용 지갑 사용**: 보안 위험을 최소화하기 위해 배포 전용 지갑을 생성하세요
- **비밀 관리 보호**: `DEPLOY_KEY`를 버전 관리 시스템에 절대 커밋하지 마세요
- **빌드 검증**: 배포 전에 빌드에 노출된 비밀이 없는지 항상 확인하세요
- **충분한 크레딧 보유**: 배포 전에 지갑에 충분한 Turbo Credits가 있는지 확인하세요
- **Base64 인코딩**: Arweave 지갑은 배포 스크립트를 위해 base64로 인코딩되어야 합니다

## 문제 해결

### 자주 발생하는 오류

**_"ARNS_NAME not configured"_**

- `--arns-name` 플래그에 유효한 ArNS 이름을 전달했는지 확인하세요

**_"DEPLOY_KEY not configured"_**

- base64로 인코딩된 지갑이 `DEPLOY_KEY` 환경 변수로 설정되어 있는지 확인하세요

**_"deploy-folder does not exist"_**

- 빌드 폴더가 존재하고 경로가 올바른지 확인하세요
- 먼저 빌드 명령을 실행하세요

**_"ARNS name does not exist"_**

- ArNS 이름이 정확하고 지정된 네트워크에 존재하는지 확인하세요

**_"Upload timeouts"_**

- 파일 업로드 타임아웃은 10초입니다
- 큰 파일은 실패할 수 있으므로 최적화가 필요할 수 있습니다

**_"Insufficient Turbo Credits"_**

- 지갑 잔액을 확인하고 필요 시 크레딧을 추가하세요

### 디버그 정보

자세한 로그를 활성화하려면 `DEBUG` 환경 변수를 설정하세요:

```bash
DEBUG=permaweb-deploy* npm run deploy
```

## 종속성

- **@ar.io/sdk**: ANT 작업 및 ArNS 관리
- **@ardrive/turbo-sdk**: Arweave로의 빠른 파일 업로드
- **@permaweb/aoconnect**: AO 네트워크 연결성
- **yargs**: CLI 인수 파싱

## 다음 단계

1. **ArNS 설정**: [ArNS Names](../../fundamentals/accessing-arweave-data/arns.md)
2. **Turbo Credits**: [Turbo SDK](https://docs.ardrive.io/docs/turbo/what-is-turbo.html)
3. **GitHub Actions**: [CI/CD 통합](/tooling/deployment/github-action)

## 리소스

- **GitHub 저장소**: [permaweb/permaweb-deploy](https://github.com/permaweb/permaweb-deploy)
- **Turbo SDK 문서**: [docs.ardrive.io/turbo](https://docs.ar.io/build/upload/bundling-services)
- **ArNS 문서**: [ar.io/arns](https://docs.ar.io/learn/arns)
- **Arweave 생태계**: [arweave.org](https://arweave.org)
