# Svelte 스타터 키트

Svelte는 자바스크립트 번들로 컴파일되는 프레임워크로, 이 과정에서 애플리케이션 배포물에서 프레임워크가 제거됩니다. 그 결과 다른 프레임워크보다 훨씬 더 작은 번들 크기를 얻을 수 있습니다. Svelte는 Permaweb 애플리케이션에 적합한 프레임워크입니다. Permaweb 애플리케이션은 단일 페이지 애플리케이션(Single Page Application, SPA)의 원칙으로 구축되지만 Arweave 네트워크 상에 존재하며 Permaweb 게이트웨이에 의해 배포됩니다.

Svelte 스타터 키트 가이드:

- [최소 구성](./minimal.md) - Svelte Permaweb 애플리케이션을 빌드하는 데 필요한 최소 구성
- [Vite](./vite.md) - Svelte, Typescript 및 Vite

::: info Permaweb 애플리케이션 제약 사항

- 100% 프론트엔드 애플리케이션 (서버 사이드 백엔드 없음)
- 애플리케이션은 서브 경로(https://[gateway]/[TX_ID])에서 제공됩니다
  :::
