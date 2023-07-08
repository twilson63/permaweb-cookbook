---
locale: pt
---
# Publicação de Transações usando bundlr.network
A publicação de transações na bundlr.network pode ser realizada usando o pacote javascript `bundlr.network/client`. Os serviços de agrupamento permitem a confirmação garantida das transações publicadas, além de suportarem muitas milhares de transações por bloco por meio do uso de pacotes de transações.

## Instalando o bundlr.network/client
Para instalar o `bundlr.network/client`, execute o seguinte comando

<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm install @bundlr-network/client
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console:no-line-numbers
yarn add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

## Inicializando o Cliente da Rede Bundlr
Uma diferença entre a publicação de transações da Camada 1 e as transações agrupadas da Camada 2 é que, ao usar o bundlr, você deve fazer um depósito no nó do bundlr com antecedência. Este depósito pode ser feito usando tokens AR ou uma variedade de outras criptomoedas. Outra diferença é que o serviço do bundlr garante que seus dados chegarão à rede.

```js:no-line-numbers
import Bundlr from '@bundlr-network/client';
import fs from "fs";

// carrega o arquivo de chave de carteira JWK do disco
let key = JSON.parse(fs.readFileSync("walletFile.txt").toString());

// inicializa o SDK do bundlr
const bundlr = new Bundlr("http://node1.bundlr.network", "arweave", key);
```

## Publicando uma Transação Agrupada

```js:no-line-numbers
// carrega os dados do disco
const imageData = fs.readFileSync(`images/myImage.png`);

// adiciona uma etiqueta personalizada que informa ao gateway como servir esses dados para um navegador
const tags = [
  {name: "Content-Type", value: "image/png"},
];

// cria a transação agrupada e a assina
const tx = bundlr.createTransaction(imageData, { tags });
await tx.sign();

// envia a transação para o bundlr para ser incluída em um pacote a ser publicado
await tx.upload();
```
## Recursos
* Para obter uma visão geral de todas as formas de publicar transações, consulte a seção [Publicação de Transações](../../concepts/post-transactions.md) do guia prático.

* A documentação completa do cliente do bundlr pode ser encontrada no [site da bundlr.network](https://docs.bundlr.network/docs/overview)

* Um tutorial e oficina para [enviar uma coleção de NFTs (tokens não fungíveis)](https://github.com/DanMacDonald/nft-uploader) usando o bundlr.