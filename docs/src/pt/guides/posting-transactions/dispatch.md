---
locale: pt
---
# Publicando uma Transação usando Dispatch
As carteiras do Navegador Arweave possuem o conceito de envio de transações. Se a transação tiver menos de 100KB, ela pode ser postada gratuitamente!
## Enviando uma Transação
Isso pode ser feito sem depender de nenhum pacote para o aplicativo cliente. Contanto que o usuário tenha uma carteira de navegador ativada e os dados tenham menos de 100KB, as transações enviadas são gratuitas e garantidas para serem confirmadas na rede.

```js:no-line-numbers
// use arweave-js para criar uma transação
let tx = await arweave.createTransaction({ data:"Olá Mundo!" })

// adicione algumas tags personalizadas à transação
tx.addTag('App-Name', 'PublicSquare')
tx.addTag('Content-Type', 'text/plain')
tx.addTag('Version', '1.0.1')
tx.addTag('Type', 'post')

// use a carteira do navegador para dispatch() a transação
let result = await window.arweaveWallet.dispatch(tx);

// faça o log do ID da transação
console.log(result.id);
```

## Recursos
* Para ter uma visão geral de todas as maneiras de postar transações, consulte a seção [Publicando Transações](../../concepts/post-transactions.md) do livro de receitas.