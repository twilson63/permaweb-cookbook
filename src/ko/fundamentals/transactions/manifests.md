# 경로 매니페스트

파일을 Arweave에 업로드할 때, 각 파일에는 고유한 트랜잭션 ID가 할당됩니다. 기본적으로 이러한 ID들은 특정한 방식으로 그룹화되거나 정리되지 않습니다.

경로 매니페스트(Path Manifests)는 파일들을 단일 식별자 하에 그룹화하는 특별한 종류의 Arweave 트랜잭션입니다.

## 사용 사례

경로 매니페스트의 가장 일반적인 두 가지 사용 사례는 NFT 컬렉션 저장과 정적 웹사이트 호스팅입니다.

일반적으로 Arweave에 이미지 100개를 업로드하면 100개의 서로 다른 트랜잭션 ID가 생성됩니다.

경로 매니페스트는 여러 트랜잭션을 단일 기본 트랜잭션 ID 아래에 연결하고 사람이 읽기 쉬운 파일 이름을 부여하는 방법입니다. 예를 들어 고양이 예시와 관련해, 하나의 기본 트랜잭션 ID를 기억하여 폴더처럼 사용하고 [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg) 같은 더 기억하기 쉬운 파일명으로 고양이 사진에 접근할 수 있습니다.

읽기 가능한 파일 이름을 그룹으로 묶는 기능은 Arweave 상에서 실용적인 애플리케이션을 만들기 위해 필수적이며, 아래 예시들에서 살펴보는 것처럼 웹사이트나 기타 파일 컬렉션을 호스팅할 수 있는 기능을 해제합니다.

### 예시

---

파일들을 계층적 방식으로 그룹화해야 할 때 매니페스트가 유용합니다. 예를 들면:

- **NFT 컬렉션 저장:**
  - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
  - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

이는 스토리지 API나 IPFS에서 NFT 이미지와 메타데이터를 연결할 때 NFT 컬렉션에서 흔히 사용하는 기본 경로(base path) 접근 방식과 유사합니다.

- **웹사이트 호스팅:**
  - https://arweave.net/X8Qm…AOhA/index.html
  - https://arweave.net/X8Qm…AOhA/styles.css
  - https://arweave.net/X8Qm…AOhA/public/favicon.png

## 매니페스트 구조

경로 매니페스트는 다음과 같은 태그를 사용하여 생성되고 Arweave에 게시되는 특별한 형식의 트랜잭션입니다:

`{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

그리고 아래 예시와 일치하는 JSON 형식의 트랜잭션 데이터를 가집니다.

```json
{
  "manifest": "arweave/paths",
  "version": "0.2.0",
  "index": {
    "path": "index.html"
  },
  "fallback": {
    "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

경로 매니페스트는 또한 `fallback` 속성을 제공합니다. 이 객체는 서브 속성 `id`를 허용하며, 요청된 경로를 올바르게 해석하지 못할 경우 리졸버가 대체로 참조할 Arweave 데이터 아이템 트랜잭션 ID를 정의합니다.

## 출처 및 참고자료

- [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)
