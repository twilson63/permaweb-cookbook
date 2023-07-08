---
locale: pt
---
# Olá Mundo (NodeJS)

Este guia apresenta a maneira mais simples de enviar dados para a permaweb usando `arweave-js` e `bundlr`.

Com o Arweave 2.6 permitindo apenas 1000 itens por bloco, postar diretamente no gateway (por exemplo, usando `arweave-js`) provavelmente será incomum.

## Requisitos

- [NodeJS](https://nodejs.org) LTS ou superior

## Descrição

Usando uma janela de terminal/console, crie uma nova pasta chamada `hw-nodejs`.

## Configuração

```sh
cd hw-nodejs
npm init -y
npm install arweave @bundlr-network/client
```

## Gerar uma carteira

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

## Upload usando o bundlr (Transações gratuitas)

```js:no-line-numbers
import Bundlr from "@bundlr-network/client";
import fs from "fs";

const jwk = JSON.parse(fs.readFileSync("wallet.json").toString());

const bundlr = new Bundlr(
  "http://node2.bundlr.network",
  "arweave",
  jwk
);

bundlr
  .upload("Olá Mundo")
  .then((r) => console.log(`https://arweave.net/${r.id}`))
  .catch(console.log);
```

## Upload usando o ArweaveJS

Se você estiver executando a versão mais recente do `nodejs`, este script do `arweavejs` funcionará como está. Para outras versões, talvez seja necessário usar a opção `--experimental-fetch`.
 
```js:no-line-numbers
import Arweave from "arweave";
import fs from "fs";

// carrega o arquivo chave JWK da carteira do disco
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// inicializa o arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const tx = await arweave.createTransaction(
  {
    data: "Olá Mundo!",
  },
  jwk
);

await arweave.transactions.sign(tx, jwk);

arweave.transactions.post(tx).then(console.log).catch(console.log);
console.log(`https://arweave.net/${tx.id}`);
```

## Recursos

- [Bundlr SDK](https://github.com/Bundlr-Network/js-sdk)
- [Arweave JS SDK](https://github.com/ArweaveTeam/arweave-js)
- [Documentação do Bundlr: Uploads gratuitos](https://docs.bundlr.network/FAQs/general-faq#does-bundlr-offer-free-uploads)