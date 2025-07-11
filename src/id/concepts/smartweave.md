---
locale: id
---

## Apa itu SmartWeave?

SmartWeave adalah nama yang diberikan untuk paradigma SmartContract dominan di Arweave. Sifat unik dari kontrak SmartWeave adalah bahwa keadaan saat ini dari kontrak diberikan oleh proses "evaluasi malas" (lazy evaluation). Ini berarti bahwa daripada node penambangan Arweave terus-menerus mengevaluasi keadaan saat ini dari semua kontrak, seorang klien yang membaca kontrak mengevaluasi keadaan itu sendiri.

## Mengapa SmartWeave Penting?

Keadaan dan logika dari aplikasi terdesentralisasi perlu tahan sensor, permanen, dan dapat diverifikasi seperti data lainnya. SmartWeave memungkinkan pengembang untuk menulis kontrak pintar yang mengkapsulasi keadaan dan logika aplikasi mereka on-chain dan menjalankannya dengan cara yang dapat dipercaya dan dapat diverifikasi. Ini bukanlah prestasi kecil karena protokol Arweave tidak termasuk insentif untuk node mengevaluasi keadaan kontrak pintar untuk jaringan.

SmartWeave menyediakan pola penghapusan tidak berubah untuk interaksi kontrak yang memanfaatkan penyimpanan permanen untuk menjaga keadaan mereka. Hasilnya adalah mesin keadaan on-chain yang sepenuhnya terdesentralisasi yang dapat memberikan fungsi dinamis pada protokol dan aplikasi secara izin dan tanpa kepercayaan. Dengan menggunakan SmartWeave, pengembang dapat membuat kontrak pintar yang disimpan di Arweave dan dijamin tidak akan berubah seiring waktu. Ini memungkinkan mereka untuk membangun [aplikasi Permaweb](/concepts/permawebApplications.md) dengan fungsi dinamis yang dapat digunakan secara izin dan tanpa kepercayaan.

Ada beberapa alasan mengapa pengembang mungkin memilih menggunakan SmartWeave untuk mengimplementasikan logika aplikasi permaweb mereka:

- **Penyimpanan terdesentralisasi:** SmartWeave dibangun di atas Arweave, yang berarti bahwa aplikasi yang dibuat menggunakan SmartWeave akan disimpan di jaringan yang didistribusikan oleh node daripada di server terpusat. Hal ini dapat membuat mereka lebih tahan sensor, pemalsuan, dan bentuk gangguan lainnya.

- **Evaluasi malas:** Fitur evaluasi malas dari kontrak SmartWeave memungkinkan eksekusi yang efisien dan dapat diskalakan. Alih-alih node Arweave terus-menerus mengevaluasi keadaan kontrak, klien yang membaca kontrak bertanggung jawab untuk mengevaluasi keadaan, memanfaatkan daya pemrosesan pengguna daripada node jaringan.

- **Dukungan bahasa:** SmartWeave mendukung berbagai bahasa pemrograman, termasuk JavaScript, TypeScript, Rust, Go, AssemblyScript, dan WASM (WebAssembly). Ini memungkinkan pengembang menggunakan bahasa yang paling mereka kuasai saat membuat aplikasi SmartWeave.

- **Daya tahan data:** Arweave dirancang untuk menyimpan data secara yang membuatnya sangat tahan lama. Hal ini dapat berguna untuk aplikasi yang perlu menyimpan data selama periode waktu yang lama, seperti catatan sejarah atau data ilmiah.

- **Model ekonomi:** Arweave menggunakan model ekonomi yang unik berdasarkan konsep penyimpanan permanen yang memberikan insentif kepada penambang untuk menyimpan data secara permanen. Hal ini dapat membantu memastikan keberlanjutan dan ketahanan jangka panjang dari aplikasi permaweb yang dibuat menggunakan SmartWeave.

## Bagaimana SmartWeave Bekerja?

Kontrak SmartWeave, pada intinya, dibangun dari keadaan awal kontrak, dengan penambahan, penambahan, dan pengurangan menggunakan tag transaksi.

SDK SmartWeave seperti `Warp` (sebelumnya `RedStone`), digunakan untuk mencari transaksi ini untuk membangun keadaan kontrak secara lokal, memodifikasi keadaan kontrak dengan setiap transaksi. Evaluator (`Warp`) menggunakan tag untuk mencari transaksi kontrak; Ia tahu sebuah transaksi adalah bagian dari kontrak berdasarkan tag App-Name, dan tag Kontrak.

Berikut adalah contoh **interaksi** kontrak.
- Tag `App-Name` menunjukkan ini adalah **TINDAKAN** Smartweave.
- Tag `Contract` memberikan ID transaksi spesifik dari keadaan kontrak awal.
- Tag `Input` memberikan fungsi kontrak dan data lain yang diperlukan:

```json
[
    {
        name:"App-Name"
        value:"SmartWeaveAction"
    },
    {
        name:"App-Version"
        value:"0.3.0"
    },
    {
        name:"Contract"
        value:"

pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        name:"Input"
        value:"{
            "function":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```
Dan berikut adalah contoh **kontrak**.
- Tag `App-Name` menunjukkan ini adalah **KONTRAK** Smartweave.
- Tag `Contract-Src` menunjuk ke kode sumber kontrak:

```json
[
    {
        key:"App-Name"
        value:"SmartWeaveContract"
    },
    {
        key:"App-Version"
        value:"0.3.0"
    },
    {
        key:"Contract-Src"
        value:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        key:"SDK"
        value:"RedStone"
    },
    {
        key:"Content-Type"
        value:"application/json"
    }
]
```

Keadaan yang dihasilkan adalah keadaan kontrak saat ini, yang dapat digunakan oleh SDK di sisi klien untuk menghitung saldo pengguna, pemilik kontrak, dan detail kontrak lainnya. Setelah pemanggil memiliki keadaan kontrak yang divalidasi, mereka dapat membangun interaksi untuk pengguna yang akan diterapkan ke rantai, yang akan dimasukkan ke dalam keadaan kontrak ketika pertama kali seseorang membangun keadaan kontrak.

## Proyek Ekosistem SmartWeave

Ada beberapa proyek ekosistem yang memanfaatkan SmartWeave SmartContracts, berikut beberapa yang perlu diperhatikan:

### Implementasi
- [Warp](https://warp.cc/) | Penyedia utama SDK SmartWeave, tutorial, dan membantu menjaga protokol SmartWeave.
- [EXM](https://docs.exm.dev/) | Execution Machine (EXM) adalah platform pengembang yang menggerakkan penciptaan dan penggunaan aplikasi yang sangat tersedia dan sangat performan dalam lingkungan terdesentralisasi.

### Alat
- [SonAr](https://sonar.warp.cc/#/app/contracts) | Penjelajah kontrak SmartWeave, dibuat dan dihosting oleh Warp.

### Aplikasi
- [Permapages](https://permapages.app/) | Alat pembuatan halaman web permanen, portal pembelian ArNS, dan portal pembuatan ANT. Profil Anda di Permaweb.
- [ArNS](arns.md) | Sistem Nama Arweave <!-- // todo: perbarui ke portal arns ketika portal dirilis -->
- [WeaveDB](https://weavedb.dev/) | Basis Data NoSQL sebagai Smart Contract.
- [KwilDB](https://docs.kwil.com/) | Basis Data SQL sebagai Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Dapatkan PST untuk mengunggah melalui Ardrive.

Ini adalah beberapa proyek yang memanfaatkan SmartWeave dalam ekosistem Arweave, dan ada banyak lagi proyek yang sedang dikembangkan dan ditambahkan seiring berjalannya waktu. SmartWeave memberikan kemungkinan yang besar untuk pembuatan aplikasi terdesentralisasi yang tahan lama dan dapat diverifikasi di Permaweb.