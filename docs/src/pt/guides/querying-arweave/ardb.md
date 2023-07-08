---
locale: pt
---
# ArDB
Uma biblioteca construída em cima do GraphQL que possibilita consultar dados de transações e blocos do Arweave sem precisar memorizar os nomes dos parâmetros do GraphQL. Apenas construa consultas usando o preenchimento automático no seu editor de código favorito.

## Instalação
```console:no-line-numbers
yarn add ardb
```

## Exemplo
```js:no-line-numbers
import Arweave from 'arweave';
import ArDB from 'ardb';

// inicializa uma instância do Arweave
const arweave = Arweave.init({});

// arweave é uma instância de cliente Arweave
const ardb = new ArDB(arweave);

// Obtenha uma única transação pelo seu ID
const tx = await ardb.search('transaction')
	.id('A235HBk5p4nEWfjBEGsAo56kYsmq7mCCyc5UZq5sgjY')
	.findOne();

// Obtenha uma lista de transações e inclua apenas o primeiro resultado
const txs = await ardb.search('transactions')
	.appName('SmartWeaveAction')
	.findOne();

// Isto é o mesmo que fazer:
const txs = await ardb.search('transactions')
	.tag('App-Name', 'SmartWeaveAction')
	.limit(1)
	.find();

// Procure várias transações de um proprietário/endereço de carteira específico
const txs = await ardb.search('transactions')
	.from('BPr7vrFduuQqqVMu_tftxsScTKUq9ke0rx4q5C9ieQU')
	.find();

// Continue navegando pelos resultados com...
const newTxs = await ardb.next();

// Ou você pode obter todos os resultados de uma só vez fazendo:
const txs = await ardb.search('blocks')
 .id('BkJ_h-GGIwfek-cJd-RaJrOXezAc0PmklItzzCLIF_aSk36FEjpOBuBDS27D2K_T')
 .findAll();

```

## Recursos
* [Pacote NPM ArDB](https://www.npmjs.com/package/ardb)