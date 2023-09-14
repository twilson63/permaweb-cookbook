---
locale: id
---

# Struktur GraphQL Lengkap untuk Transaksi
Permintaan GraphQL berikut mengembalikan semua properti dari sebuah transaksi yang ditangkap oleh layanan indeks.

```graphql:no-line-numbers
query {
    transactions {
        
        pageInfo { 
          hasNextPage
        }
        edges {
            cursor
            node {
                id
                anchor
                signature
                recipient
                owner {
                    address
                    key
                }
                fee {
                    winston
                    ar
                }
                quantity {
                    winston
                    ar
                }
                data {
                    size
                    type
                }
                tags {
                    name
                    value
                }
                block {
                    id
                    timestamp
                    height
                    previous
                }
                parent {
                    id
                }
            }
        }
    }
}

```

## Paginasi
Secara default, permintaan GraphQL mengembalikan 10 hasil pertama. Set lebih besar dapat diminta dengan menambahkan opsi `first: X` (di mana `X` adalah nilai dari 1 hingga 100) ke permintaan transaksi.
```graphql{4}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
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
Jika ada lebih dari 100 item dalam hasil set, halaman-halaman berikutnya dari hasil dapat diambil dengan menggunakan kursor.
```graphql{13-15,17}
query
{
  transactions(
    first:100,
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
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
Jika ada halaman hasil berikutnya, `hasNextPage` akan memiliki nilai `true`. Ambil nilai `cursor` dari item terakhir dalam hasil set dan gunakan sebagai nilai untuk parameter permintaan `after`.
```graphql{5}
query
{
  transactions(
    first:100,
    after: "WyIyMDIyLTEyLTMwVDE2OjQ0OjIzLjc0OVoiLDEwMF0=",
    tags: [
      {
        name: "App-Name",
        values: ["PublicSquare"]
      }
    ]
  ) 
  {
    pageInfo { 
      hasNextPage
    }
    edges {
      cursor
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
Untuk mengambil seluruh rangkaian hasil, ulangi permintaan `after` dengan nilai `cursor` yang diperbarui dari item terakhir setiap halaman hingga `hasNextPage` adalah `false`.

## Batasan Laju
Layanan indeks akan menerapkan batasan laju untuk mencegah serangan dan penyalahgunaan layanan mereka. Layanan `arweave.net/graphql` membatasi permintaan GraphQL hingga 600 permintaan setiap 5 menit (per alamat IP). Selalu periksa hasil dari permintaan Anda untuk melihat apakah mereka memiliki kode status dalam angka 200 sebelum mengurai respons. Kode status HTTP 429 akan menunjukkan penerapan batasan laju. Kode status HTTP 503 biasanya menunjukkan bahwa hasil permintaan terlalu besar untuk `arweave.net/graphql`.

## Sumber Daya
* Untuk daftar lengkap dari skema GraphQL Arweave, lihat [Panduan GraphQL Arweave](https://gql-guide.arweave.dev)
* [Paket ArDB](../guides/querying-arweave/ardb.md)
* [Paket ar-gql](../guides/querying-arweave/ar-gql.md)
* Untuk panduan umum tentang GraphQL, [graphql.org/learn](https://graphql.org/learn) adalah titik awal yang baik.
