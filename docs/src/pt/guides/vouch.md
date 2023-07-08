---
locale: pt
---
# Vouch
Existem algumas maneiras de consultar um endereço Arweave para verificar se ele foi atestado por um serviço. Abaixo estão duas dessas abordagens.
## Pacote VouchDAO
A função `isVouched` está disponível para uso em seus aplicativos de maneira direta.

#### Instalação
Adicione o pacote usando npm:
```console:no-line-numbers
npm i vouchdao
```
ou yarn:
```console:no-line-numbers
yarn add vouchdao
```

#### Uso
Dentro de uma função assíncrona, você pode usar a função `isVouched`, que retornará verdadeiro se um usuário tiver um atestado.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ENDEREÇO_ARWEAVE") // true || undefined
  // ...
})();
```

## Usando o GraphQL
Você pode consultar a rede Arweave usando o GraphQL para descobrir se um determinado endereço Arweave foi atestado.

```graphql
query {
  transactions(
    tags:{name:"Vouch-For", values:["ENDEREÇO_ARWEAVE"]}
  ) {
    edges {
      node {
        id
        tags {
          name 
          value 
        }
      }
    }
  }
}
```

Se o endereço tiver sido atestado, um array de nós será retornado com tags referentes ao serviço que emitiu o ANS-109. Você pode cruzar a referência do valor do `endereço do proprietário` com os [votos da comunidade](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) para garantir que o serviço tenha sido verificado por meio de voto da comunidade via VouchDAO.

```graphql
"owner": {
 "address": "Ax_uXyLQBPZSQ15movzv9-O1mDo30khslqN64qD27Z8"
},
"tags": [
  {
    "name": "Content-Type",
    "value": "application/json"
  },
  {
    "name": "App-Name",
    "value": "Vouch"
  },
  {
    "name": "App-Version",
    "value": "0.1"
  },
  {
    "name": "Verification-Method",
    "value": "Twitter"
  },
  {
    "name": "Vouch-For",
    "value": "ENDEREÇO_ARWEAVE"
  }
]
```

## Recursos
* [VouchDAO](https://vouch-dao.arweave.dev)
* [Contrato VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
* [Playground Arweave/GraphQL](https://arweave.net/graphql)