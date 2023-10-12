---
locale: id
---

# Vouch
Ada beberapa cara untuk melakukan kueri pada alamat Arweave untuk memverifikasi apakah sudah mendapatkan vouch dari layanan tertentu. Berikut dua dari metode-metode tersebut.

## Paket VouchDAO
Fungsi `isVouched` tersedia untuk digunakan dalam aplikasi Anda dengan cara yang sederhana.

#### Instalasi
Tambahkan paket ini menggunakan npm:

```console:no-line-numbers
npm i vouchdao
```

atau yarn:

```console:no-line-numbers
yarn add vouchdao
```

#### Penggunaan
Dalam fungsi async, Anda dapat menggunakan fungsi `isVouched`, yang akan mengembalikan `true` jika pengguna sudah mendapatkan vouch.

```js:no-line-numbers
import { isVouched } from 'vouchdao'
(async () => {
  const res = await isVouched("ALAMAT_ARWEAVE") // true || undefined
  // ...
})();
```

## Menggunakan GraphQL
Anda dapat melakukan kueri pada jaringan Arweave menggunakan GraphQL untuk mengetahui apakah alamat Arweave tertentu telah mendapatkan vouch.

```graphql
query {
  transactions(
    tags:{name:"Vouch-For", values:["ALAMAT_ARWEAVE"]}
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

Jika alamat sudah mendapatkan vouch, akan dikembalikan larik dari node-node yang berisi tag-tag yang terkait dengan layanan yang menerbitkan ANS-109. Anda dapat memeriksa `alamat pemilik` yang berkaitan dengan [voting komunitas](https://community.xyz/#_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk/votes) yang telah dilakukan untuk memastikan bahwa layanan tersebut telah diverifikasi melalui voting komunitas melalui VouchDAO.

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
    "value": "ALAMAT_ARWEAVE"
  }
]
```

## Sumber Daya
* [VouchDAO](https://vouch-dao.arweave.dev)
* [Kontrak VouchDAO](https://sonar.warp.cc/?#/app/contract/_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk)
* [Arweave/GraphQL Playground](https://arweave.net/graphql)