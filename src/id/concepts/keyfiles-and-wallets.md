---
locale: id
---

# Wallets and Keys

---

### Wallet Arweave

Di Arweave, sebuah dompet (wallet) mengamankan alamat unik di blockchain. Alamat ini digunakan untuk melacak saldo $AR Anda dan berinteraksi dengan jaringan Arweave - seperti mengirim transaksi atau berinteraksi dengan [SmartWeave Contracts](../guides/smartweave/warp/intro.md).

Seperti kebanyakan blockchain, konsep dompet di Arweave sedikit menyesatkan.

Sebuah dompet tidak "memegang" token itu sendiri; saldo token disimpan di blockchain dan terkait dengan alamat dompet. Sebaliknya, sebuah dompet memegang pasangan kunci publik-privat kriptografi yang dapat digunakan untuk menandatangani transaksi untuk mengirimkan data atau mentransfer token. Pemilik dompet (orang yang memiliki akses ke **kunci privat** dompet) adalah satu-satunya yang dapat menandatangani transaksi untuk alamat tersebut dan mengakses dana di dalamnya.

### Pasangan Kunci dan Format Dompet

Arweave menggunakan pasangan kunci RSA-PSS *4096bit* yang disimpan menggunakan format JWK (JSON Web Keys). Format JWK dapat digunakan untuk menyimpan banyak jenis kunci kriptografi, tidak hanya pasangan kunci RSA.

Berikut ini adalah isi dari sebuah berkas JWK yang menggambarkan pasangan kunci RSA-PSS. Nilai-nilai tersebut disingkat agar tidak sengaja digunakan sebagai pengirim atau penerima transaksi on-chain. Saat menyimpan pasangan kunci RSA-PSS, nilai yang terkait dengan `n` dalam JWK adalah **kunci publik** dompet Anda dan dapat dibagikan dengan aman tanpa mengorbankan keamanan dompet Anda.

```json
{
	"d": "cgeeu66FlfX9wVgZr5AXKlw4MxTlxSuSwMtTR7mqcnoE...",
	"dp": "DezP9yvB13s9edjhYz6Dl...",
	"dq": "SzAT5DbV7eYOZbBkkh20D...",
	"e": "AQAB",
	"ext": true,
	"kty": "RSA",
	"n": "o4FU6y61V1cBLChYgF9O37S4ftUy4newYWLApz4CXlK8...",
	"p": "5ht9nFGnpfW76CPW9IEFlw...",
	"q": "tedJwzjrsrvk7o1-KELQxw...",
	"qi": "zhL9fXSPljaVZ0WYhFGPU..."
}
```

**Kunci privat** Anda juga disimpan dalam JWK, terutama di bawah nilai yang terkait dengan `d`, tetapi juga sebagian berasal dari beberapa nilai lain dalam JWK. **Kunci privat** adalah seperti kata sandi untuk dompet Anda - yang dapat digunakan untuk membuat tanda tangan digital (seperti untuk menandatangani transaksi), atau mendekripsi data.

JWK ini adalah berkas `json` sebenarnya yang dibuat dan diekspor dari aplikasi dompet seperti [Arweave.app](https://arweave.app) atau dibuat melalui kode menggunakan [arweave-js](https://github.com/ArweaveTeam/arweave-js).

Saat menggunakan aplikasi dompet untuk menghasilkan pasangan kunci Anda, **kunci privat** Anda juga dapat direpresentasikan sebagai **frasa benih mnemonic**, yang dalam beberapa kasus dapat digunakan sebagai alternatif untuk menandatangani transaksi dan/atau memulihkan dompet Anda.

### Keamanan Dompet

**Kunci privat** Anda harus tetap dirahasiakan sepanjang waktu karena memiliki kemampuan untuk mentransfer token dari alamat Anda ke alamat orang lain. Sebagai pengembang, pastikan untuk tidak menyertakan berkas kunci Anda dalam repositori GitHub publik atau meng-hostnya di tempat lain secara publik.

### Alamat Dompet
Alamat dompet Anda sebenarnya berasal dari **kunci publik** dompet Anda. Meskipun aman untuk berbagi **kunci publik** Anda dengan orang lain, **kunci publik** berukuran *4096bit* agak besar untuk dibagikan dengan nyaman. Untuk mengurangi overhead tersebut dan membuat alamat dompet lebih mudah dibaca manusia, hash `SHA-256` dari **kunci publik** digunakan sebagai alamat dompet dengan encoding `Base64URL`. Ini memberikan keamanan dan menghubungkan dengan deterministik alamat dompet berupa 43 karakter yang unik ke **kunci publik** dompet, serta memberikan singkatan yang nyaman yang dapat diverifikasi oleh siapa saja yang memiliki **kunci publik** tersebut.

### Dompet
[Arweave.app](https://arweave.app/welcome) - Dompet web Arweave untuk mengunggah data permanen, menghubungkan akun Anda dengan aman ke aplikasi terdesentralisasi, dan menjelajahi weave.

[ArConnect](https://www.arconnect.io/) - Ekstensi Peramban Dompet Arweave

### Sumber dan Bacaan Lanjutan:
[Dokumentasi Arweave](https://docs.arweave.org/developers/server/http-api#key-format)

[Format JSON Web Key (RFC 7517)](https://www.rfc-editor.org/rfc/rfc7517)