---
locale: id
---

# Jalur Manifest

## Gambaran

Saat mengunggah file ke Arweave, setiap file diberi ID transaksi uniknya sendiri. Secara default, ID ini tidak dikelompokkan atau diorganisir dalam cara tertentu.

Sebuah gambar kucing mungkin disimpan dengan ID transaksi [bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw](https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw), sedangkan gambar lainnya dengan [FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0](https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0) sebagai ID transaksi.

| Kucing 1 | Kucing 2 |
|---------|---------|
| <img src="https://arweave.net/bVLEkL1SOPFCzIYi8T_QNnh17VlDp4RylU6YTwCMVRw" width="300"> | <img src="https://arweave.net/FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0" width="360"> |
| bVLEkL1SOPFCzIYi8T_QNnh17VlDp4... | FguFk5eSth0wO8SKfziYshkSxeIYe7oK9zoPN2PhSc0 |

ID transaksi ini agak sulit diurus dan membuat sulit untuk menemukan semua file yang relevan. Tanpa path manifest, jika Anda mengunggah 100 gambar kucing Anda, Anda perlu melacak **100 ID dan tautan yang berbeda**!

Path Manifest adalah cara untuk menghubungkan beberapa transaksi di bawah satu ID transaksi dasar tunggal dan memberi mereka nama file yang mudah dibaca manusia. Terkait dengan contoh kucing, Anda bisa memiliki satu ID transaksi dasar untuk diingat dan menggunakannya seperti folder - mengakses gambar kucing Anda dengan nama file yang lebih mudah diingat seperti [{base id}/cat1.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat1.jpg), [{base id}/cat2.jpg](https://arweave.net/6dRh-TaiA5qtd0NWqrghpvC4_l3EtA3AwCluwPtfWVw/cat2.jpg), dll.

Membuat set grup nama file yang dapat dibaca adalah penting untuk membuat aplikasi praktis di Arweave, dan membuka kemampuan untuk meng-host situs web atau koleksi file lainnya seperti yang dijelajahi dalam contoh di bawah ini.

### Apa Yang Bisa Anda Gunakan untuk Manifests?

---

Setiap kali Anda perlu mengelompokkan file secara hierarkis, manifest dapat berguna. Misalnya:

- **Menyimpan koleksi NFT:**
    - [https://arweave.net/X8Qm…AOhA/0.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/0.png)
    - [https://arweave.net/X8Qm…AOhA/1.png](https://arweave.net/X8Qm4X2MD4TJoY7OqUSMM3v8H1lvFr-xHby0YbKAOhA/1.png)

Ini mencerminkan pendekatan jalur dasar umum yang digunakan oleh koleksi NFT saat menghubungkan gambar NFT dan metadata ke API penyimpanan atau IPFS.

- **Meng-host situs web:**
    - https://arweave.net/X8Qm…AOhA/index.html
    - https://arweave.net/X8Qm…AOhA/styles.css
    - https://arweave.net/X8Qm…AOhA/public/favicon.png

### Struktur Manifest

---

Path Manifest adalah format transaksi khusus yang dibuat dan diposting ke Arweave dengan menggunakan Tag:

 `{ name: "Content-type", value: "application/x.arweave-manifest+json" }`

dan memiliki data transaksi berformat JSON yang sesuai dengan contoh di bawah ini.

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": {
      "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI"
    },
    "js/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/style.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "css/mobile.css": {
      "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ"
    },
    "assets/img/logo.png": {
      "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU"
    },
    "assets/img/icon.png": {
      "id": "0543SMRGYuGKTaqLzmpOyK4AxAB96Fra2guHzYxjRGo"
    }
  }
}
```

Sumber dan Bacaan Lanjutan dalam dokumen Path Manifest resmi Arweave: [Arweave Docs](https://github.com/ArweaveTeam/arweave/blob/master/doc/path-manifest-schema.md)