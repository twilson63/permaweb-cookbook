---
locale: id
---

# Gambaran

---

Profit Sharing Tokens (PST) adalah jenis SmartWeaveToken yang memiliki struktur berikut:

| properti     | tipe        |
| ------------ | ----------- |
| saldo        | objek       |
| nama         | string      |
| simbol       | string      |
| transfer     | metode      |
| saldo        | metode      |

PST biasanya digunakan untuk mengatur protokol atau "Profit Sharing Community" (PSC) - mirip dengan DAO.

### Bagaimana PST Didistribusikan?

---

Pendiri aplikasi dapat membuat sejumlah PST dan mendistribusikannya sesuai keinginan mereka - untuk disimpan, atau dijual kepada investor untuk mengumpulkan modal.

Protokol dapat menawarkan PST sebagai imbalan atas kontribusi kerja, atau menyelesaikan tugas-tugas komunitas untuk mendorong pertumbuhan.

PST juga dapat ditukar satu sama lain di [Permaswap](https://permaswap.network/#/) (saat ini dalam uji coba), dan pengembang dapat mengatur izin perdagangan token menggunakan [Verto Flex](https://github.com/useverto/flex).

### Fitur

---

PST berfungsi sebagai '**dividen mikro**'. Ketika sebuah protokol digunakan, sejumlah tip disisihkan untuk dibagikan kepada pemegang token. Tip dibayarkan dalam $AR - **bukan** dalam mata uang PST. Hal ini menciptakan hubungan yang cukup istimewa antara aplikasi yang sedang dikembangkan dan Arweave itu sendiri.

### Manfaat

---

- Memberikan cara fleksibel bagi pengembang untuk menjalankan protokol dan mendistribusikan sebanyak mungkin 'kepemilikan' sesuai kebijaksanaan mereka
- PST dapat digunakan sebagai pembayaran untuk pekerjaan protokol atau tugas komunitas
- Pendiri termotivasi untuk meningkatkan penggunaan jaringan, karena ini langsung terkait dengan pendapatan
- Pemegang token mendapatkan nilai **intrinsic** (menghasilkan hadiah $AR, bukan 'saham' lebih banyak)

### Contoh PST: Token ARDRIVE

---

ArDrive adalah aplikasi permaweb yang menggunakan dengan baik PST mereka yang bernama ARDRIVE.

Ketika seseorang membayar $AR untuk mengunggah data melalui ArDrive, biaya komunitas sebesar 15% didistribusikan kepada pemegang token tunggal dengan menggunakan metode acak yang ditimbang.

![Siklus ARDRIVE PST](~@source/images/ardrive-pst.png)

Seorang pengguna mengunggah data -> Pemegang token ARDRIVE menerima $AR -> Pemegang token ARDRIVE dapat menggunakan $AR ini untuk mengunggah file -> siklus berulang. Semoga ini memberikan gambaran yang baik tentang salah satu cara Anda dapat mengimplementasikan PST Anda sendiri!

### Menjelajahi PST

---

Pergi langsung ke ViewBlock dan Sonar by Redstone mungkin paling sesuai. Gunakan tautan yang secara khusus menampilkan PST sehingga seseorang tidak perlu mencari-cari.

Anda dapat menggunakan [ViewBlock](https://viewblock.io/arweave) untuk pengalaman seperti etherscan dalam melihat kontrak PST, seperti yang ada [di sini](https://viewblock.io/arweave/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).

Pilihan lain adalah Sonar, penjelajah kontrak pintar Arweave yang dibangun oleh [RedStone Finance](https://sonar.redstone.tools/#/app/contracts). Lihat kontrak yang sama [di sini](https://sonar.warp.cc/?#/app/contract/-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ).

> Beberapa anggota komunitas telah membahas penyebutan PST sebagai "Permaweb Service Tokens". Masih banyak yang harus dieksplorasi dengan PST → ikuti diskusinya [di sini](https://discord.com/channels/999377270701564065/999377270701564068/1055569446481178734) (Discord).