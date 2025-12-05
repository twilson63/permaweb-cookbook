# 디스패치(Dispatch)를 사용한 트랜잭션 게시

Arweave 브라우저 지갑에는 트랜잭션을 디스패치하는 개념이 있습니다.

트랜잭션 크기가 100KB 미만인 경우 Arweave에 무료로 게시할 수 있습니다!

## 트랜잭션 디스패치

클라이언트 앱에 패키지 종속성 없이 이 작업을 수행할 수 있습니다. 사용자가 브라우저 지갑을 활성화했고 데이터가 100KB 미만인 한, 디스패치된 트랜잭션은 무료이며 네트워크에서 확인되는 것이 보장됩니다.

```js:no-line-numbers
// use arweave-js to create a transaction
let tx = await arweave.createTransaction({ data:"Hello World!" })

// add some custom tags to the transaction
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// use the browser wallet to dispatch() the transaction
let result = await window.arweaveWallet.dispatch(tx);

// log out the transactino id
console.log(result.id);
```

## 리소스

- 트랜잭션을 게시하는 모든 방법에 대한 개요는 [트랜잭션 게시하기](../../fundamentals/post-transactions.md) 섹션을 참조하세요.
