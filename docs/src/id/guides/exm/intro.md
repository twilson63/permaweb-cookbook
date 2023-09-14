---
locale: id
---

# Execution Machine (EXM)

**Execution Machine (EXM)** adalah platform pengembang yang memberikan kemampuan untuk membuat dan memanfaatkan **fungsi serverless berbasis blockchain (permanent)** tanpa perlu pengetahuan atau akses ke teknologi blockchain seperti dompet dan token.

Hal ini lebih lanjut memungkinkan pembuatan aplikasi yang **dapat disusun**, **tak tergantikan**, dan **tidak dapat dipercaya** secara friksi.

## Fungsi Serverless di Arweave

Fungsi serverless disimpan di Arweave melalui perantara EXM yang juga menyimpan salinan sebagai cache untuk dengan cepat melayani aplikasi kapan saja. Fungsi-fungsi ini bersifat stateful (menyimpan data) dan oleh karena itu, sebuah id fungsi tunggal mengarah ke beberapa data serta logika untuk berinteraksi dan memperbarui data ini.

EXM menghandle penyimpanan dan eksekusi, menghilangkan kebutuhan untuk memelihara server yang dedikasi, mengurangi biaya pemeliharaan, dan menambahkan lapisan modularitas.

Modularitas ini juga membawa komposabilitas untuk memilih dan merakit fungsi dalam berbagai kombinasi untuk membuat aplikasi kustom sesuai dengan kebutuhan kita. Fungsi-fungsi ini, dan interaksi dengan mereka, **tersimpan secara permanen di rantai**, mereka tidak dapat diubah dan tersedia untuk siapa saja yang ingin melihatnya, sehingga membuatnya **tak tergantikan** dan **tidak dapat dipercaya**.

Selain itu, EXM mencakup biaya untuk mengunggah data ke Arweave dan membuat prosesnya agnostik kripto bagi para pengembang.

![Fungsi pada server yang didedikasikan vs fungsi serverless pada blockchain](~@source/images/exm-serverless-functions.png)

## Bagaimana Cara Kerjanya di Latar Belakang?

Seorang pengguna mengirimkan permintaan transaksi ke server EXM yang didedikasikan. Dengan bantuan Verifiable Computing, Execution Machine dapat memproses permintaan pengguna dengan cepat dan performa, menghilangkan kebutuhan akan teknologi blockchain seperti token dan dompet, sambil tetap menjaga hasil yang terdesentralisasi. EXM kemudian memperbarui lapisan cache-nya dengan state yang diperbarui sambil mengunggah data ke Arweave. Lapisan cache digunakan sebagai bantuan untuk dengan cepat melayani aplikasi kapan saja.

Selain itu, EXM dapat menjaga lingkungan minimisasi kepercayaan karena pengguna dapat memverifikasi transaksi dan status saat ini dari kontrak/fungsi menggunakan Lazy Evaluation.

<details>
<summary><strong>Verifiable Computing Explained</strong></summary>

<strong>Verifiable computing</strong> adalah bentuk komputasi yang memanfaatkan manfaat sistem terpusat sambil tetap menjamin hasil yang terdesentralisasi.

Setiap fungsi serverless memiliki kemampuan untuk membaca atau memperbarui status beberapa informasi. Dengan menggunakan verifiable computing, status ini disimpan dalam server terpusat yang memungkinkan kinerja yang lebih baik karena konsensus tidak diperlukan pada saat pemrosesan, tetapi informasi selalu tersedia untuk verifikasi oleh pengguna. Ini memungkinkan pengguna untuk "mengevaluasi dengan malas" bahkan ketika disimpan dalam lapisan cache sebelum akhirnya dipindahkan ke rantai.

![Verifiable Computing Explained](~@source/images/exm-verifiable-computing.png)

Agar verifiable computing dapat berfungsi secara mulus, beberapa bagian inti harus diimplementasikan.

- <strong>Pelaksana</strong>: Perangkat lunak yang memproses permintaan transaksi pengguna dan menyimpannya dalam cache.
- <strong>Pemroses</strong>: Pipa (sistem) terpusat yang bertanggung jawab menerima transaksi oleh satu atau beberapa pengguna. Setelah menerima berbagai paket transaksi yang dikirim, pemroses harus mengevaluasi ulang kontrak cerdas dengan data baru. Saat transaksi diterima, status terbaru dari kontrak cerdas harus ditingkatkan dan disimpan dengan aksesibilitas untuk pengguna. Pemroses bertanggung jawab atas pengurutan transaksi, biasanya berdasarkan timestamp.
- <strong>Konveyor</strong>: Sistem terpusat yang menjembatani blockchain berbasis data. Semua transaksi yang diterima oleh pemroses harus dikirimkan ke konveyor, konveyor akan menjamin keberhasilan penyimpanan operasi-operasi ini dalam blockchain berbasis data seperti Arweave.
</details>
<br/>

<details>
<summary><strong>Lazy Evaluation Explained</strong></summary>

![Lazy Evaluation Explained](~@source/images/exm-lazy-evaluation.png)

<strong>Lazy evaluation</strong>, sesuai dengan namanya, adalah metode untuk mengevaluasi kontrak cerdas dan status saat ini di blockchain dengan malas. Kontrak cerdas itu sendiri dan segala interaksi (operasi tulis) dengan mereka disimpan di rantai dan dapat diakses oleh pengguna mana saja.

Ini bertujuan untuk memindahkan beban pemrosesan dari node ke pengguna. Pengguna dapat memilih untuk mengevaluasi dan menginterpretasikan kode kontrak cerdas dan interaksi dengan itu secara lokal untuk memverifikasi status saat ini dari kontrak.

Hal ini menghilangkan kebutuhan bagi node untuk menyimpan salinan penuh dari status saat ini dari suatu rantai dan mencapai konsensus atasnya. Dengan demikian, mengurangi biaya dan meningkatkan performa, secara berturut-turut.

Karena semua orang memiliki akses ke data yang sama, semua orang akan menginterpretasikannya dengan cara yang sama sehingga memastikan semua orang memiliki akses ke status saat ini yang sama.
</details>
<br/>

## Keuntungan Menggunakan Fungsi Serverless

- Fungsi serverless menambahkan lapisan modularitas dan dapat disusun sesuai dengan berbagai kebutuhan aplikasi.
- Perbaikan bug dan integrasi fitur baru lebih mudah dilakukan dengan mengincar.
- Execution Machine memiliki lapisan cache untuk melayani aplikasi dengan cepat.
- Execution Machine memanfaatkan sistem terpusat sambil menjamin hasil yang terdesentralisasi.
- Execution Machine berusaha menjadi agnostik kripto.