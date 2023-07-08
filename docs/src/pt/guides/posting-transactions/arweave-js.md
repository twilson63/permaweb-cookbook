---
locale: pt
---
# Publicação de transações usando arweave-js
Transações nativas Arweave podem ser publicadas diretamente para um nó ou gateway usando o pacote `arweave-js`.

::: info
Arweave dimensiona através do uso de pacotes de transações. Esses pacotes possibilitam que cada bloco contenha um número quase ilimitado de transações. Sem o uso de pacotes, os blocos Arweave estão limitados a 1000 transações por bloco (com novos blocos produzidos a cada ~2 minutos). Caso o seu caso de uso exceda essa capacidade, você pode vivenciar transações descartadas. Nessas circunstâncias, considere usar o [bundlr.network](./bundlr.md) ou serviços similares para agrupar as transações.
:::

## Instalando o pacote arweave-js

Para instalar o `arweave-js`, execute

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add arweave
```

  </CodeGroupItem>
</CodeGroup>

## Inicializando o arweave-js
Transações diretas da Camada 1 são publicadas usando a biblioteca `arweave-js`.

```js:no-line-numbers
import Arweave from 'arweave';
import fs from "fs";

// carregar o arquivo de chave da carteira JWK do disco
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inicializar uma instância arweave
const arweave = Arweave.init({});
```

## Publicando uma transação de carteira para carteira
Uma transação básica para mover tokens AR de um endereço de carteira para outro.

```js:no-line-numbers
// criar uma transação carteira para carteira enviando 10.5 AR para o endereço de destino
let transaction = await arweave.createTransaction({
  target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
  quantity: arweave.ar.arToWinston('10.5')
}, key);

// você deve assinar a transação com sua chave antes de publicar
await arweave.transactions.sign(transaction, key);

// publicar a transação
const response = await arweave.transactions.post(transaction);
```

## Publicando uma transação de dados
Este exemplo ilustra como carregar um arquivo do disco e criar uma transação para armazenar seus dados na rede. Você pode encontrar o preço atual que a rede está cobrando em [https://ar-fees.arweave.dev](https://ar-fees.arweave.dev)

```js:no-line-numbers
// carregar dados do disco
const imageData = fs.readFileSync(`iamges/myImage.png`);

// criar uma transação de dados
let transaction = await arweave.createTransaction({
  data: imageData
}, key);

// adicionar uma tag personalizada que informa ao gateway como servir esses dados para um navegador
transaction.addTag('Content-Type', 'image/png');

// você deve assinar a transação com sua chave antes de publicar
await arweave.transactions.sign(transaction, key);

// criar um uploader que enviará seus dados para a rede
let uploader = await arweave.transactions.getUploader(transaction);

// executar o uploader até que a transferência esteja completa.
while (!uploader.isComplete) {
  await uploader.uploadChunk();
}
```

## Recursos
* Para obter uma visão geral de todas as maneiras pelas quais você pode publicar transações, consulte a seção [Publicação de Transações](../../concepts/post-transactions.md) do cookbook.

* Para uma descrição mais detalhada de todos os recursos do `arweave-js`, consulte a documentação [no github](https://github.com/ArweaveTeam/arweave-js)