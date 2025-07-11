---
locale: es
---
# Vouch
Existen varias formas de consultar una dirección de Arweave para verificar si ha sido respaldada por un servicio. A continuación se presentan dos enfoques para hacerlo.
## Paquete VouchDAO
La función `isVouched` está disponible para ser utilizada en tus aplicaciones de manera sencilla.

#### Instalación
Agrega el paquete usando npm:
```console:no-line-numbers
npm i vouchdao
```
o yarn:
```console:no-line-numbers
yarn add vouchdao
```

#### Uso
Dentro de una función asíncrona puedes utilizar la función `isVouched`, la cual retornará true si un usuario ha sido respaldado.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("DIRECCIÓN_ARWEAVE") // true || undefined
  // ...
})();
```

## Utilizando GraphQL
Puedes consultar la red de Arweave utilizando GraphQL para averiguar si una dirección de Arweave específica ha sido respaldada.

```graphql
query {
  transactions(
    tags:{name:"Vouch-For", values:["DIRECCIÓN_ARWEAVE"]}
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

Si la dirección ha sido respaldada, se devolverá una matriz de nodos con etiquetas relacionadas al servicio que emite el ANS-109. Puedes verificar la dirección del `propietario` cruzándola con los [votos de la comunidad](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) para asegurar que el servicio ha sido verificado mediante votación comunitaria a través de VouchDAO.

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
    "value": "DIRECCIÓN_ARWEAVE"
  }
]
```

## Recursos
* [VouchDAO](https://vouch-dao.arweave.dev)
* [Contrato de VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
* [Arweave/GraphQL Playground](https://arweave.net/graphql)