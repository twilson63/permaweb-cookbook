---
locale: id
---

# Layanan Indeks Pencarian

tl;dr

- Sintaks yang kompatibel ke belakang dengan Arweave GraphQL
- Waktu respons lebih cepat untuk kueri kompleks (misalnya pencarian multi-tag)
- Lebih banyak pilihan kueri
---

Layanan pencarian gratis [Goldsky](https://goldsky.com) menggunakan backend yang dioptimalkan yang memungkinkan pencarian lebih cepat untuk kueri kompleks di seluruh blok dan transaksi Arweave, dan juga memperkenalkan sintaks tambahan untuk kasus penggunaan pencarian fuzzy dan wildcard. 

Sintaks GraphQL Pencarian adalah superset dari [sintaks GraphQL Arweave](./queryingArweave.md). Ini sepenuhnya kompatibel ke belakang dan akan mengembalikan hasil yang sama untuk kueri yang sama, tetapi memiliki beberapa pengubah tambahan yang dapat berguna. 

- Filter tag yang fleksibel
  - Cari hanya nama tag atau nilainya saja
- Filter tag lanjutan
  - Pencarian fuzzy
  - Pencarian wildcard
- Filter hanya transaksi L1
- Total jumlah hasil

Untuk kebutuhan kustom atau ide fitur apa pun, jangan ragu untuk menghubungi tim Goldsky melalui email atau di discord! 


## Titik Akhir Gateway Pencarian

Saat ini, satu-satunya layanan dengan sintaks ini dihosting oleh Goldsky. Jika ada yang tertarik untuk meng-host gateway mereka sendiri dengan sintaks yang sama, jangan ragu untuk menghubungi [Goldsky](https://goldsky.com) untuk bantuan.

- [Layanan Pencarian Goldsky](https://arweave-search.goldsky.com/graphql)

## Fitur

### Filter Tag yang Fleksibel

Sintaks Gateway Pencarian kurang ketat dan memungkinkan pencarian hanya berdasarkan nama Tag atau nilainya saja

#### Contoh
Cari transaksi dengan nilai tag 'cat'

```graphql:no-line-numbers
query just_values {
  transactions(
    first: 10,
    tags: [
      {
        values: ["cat"]
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

Cari transaksi yang memiliki tag 'In-Response-To-ID'

```graphql:no-line-numbers
query just_name {
  transactions(
    first: 10,
    tags: [
      {
        name: "In-Response-To-ID"
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


### Filter Tag Lanjutan

Sintaks Gateway Pencarian menawarkan parameter tambahan untuk filter tag, `match`.

| Nilai Match | Deskripsi | 
|-------------|-------------|
| EXACT | (default) hanya cocok persis. |
| WILDCARD | Mengaktifkan * untuk cocok dengan jumlah karakter apa pun, misalnya `text/*` |
| FUZZY_AND | Pencocokan fuzzy yang berisi semua kata kunci pencarian |
| FUZZY_OR | Pencocokan fuzzy yang berisi setidaknya satu kata kunci pencarian |


Buka playground dan coba beberapa kueri berikut!

Mencari semua transaksi dengan jenis konten gambar menggunakan wildcard
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: "image/*", match: WILDCARD}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### Pencarian Fuzzy

Pencarian fuzzy sangat kuat dan dapat mencari teks 'serupa' dengan banyak variasi. 

Mencari semua transaksi dengan 'cat' ATAU 'dog' (atau CAT atau doG atau cAts atau CAAts, dsb). Jadi tag bisa berisi setidaknya satu istilah mirip dengan kucing atau anjing.

```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_OR"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

Cari transaksi yang memiliki nilai tag mirip dengan kucing DAN anjing
```graphql:no-line-numbers
{
    transactions(        
      tags: [
        { name: "Content-Type", values: ["cat", "dog"], match: "FUZZY_AND"}
      ]
      first: 10
    ) {
        edges {
            cursor
            node {
                id
              tags {
                name
                value
              }
              block { height }
              bundledIn {id}
            }
        }
    }
}
```

### Mengecualikan Transaksi yang Dibundel (L2)

Cukup atur `bundledIn: NULL`

```graphql:no-line-numbers
query just_l1 {
  transactions(
    first: 10,
    bundledIn: null
  ) 
  {
    edges {
      node {
        id
        signature
        owner {
          address
        }
        block {
          height
        }
      }
    }
  }
}
```


### Mendapatkan Jumlah Total yang Cocok dengan Kueri

Jika Anda ingin memahami berapa banyak transaksi yang cocok dengan seperangkat filter tertentu, cukup gunakan field `count`. Ini akan memicu operasi hitung yang dioptimalkan tambahan. Ini kemungkinan akan menggandakan waktu yang dibutuhkan untuk mengembalikan kueri, jadi gunakan hanya jika diperlukan. 

```graphql:no-line-numbers
query count_mirror {
  {
  	transactions(tags:{values:["MirrorXYZ"]})
      {
        count
      }
  }
}
```