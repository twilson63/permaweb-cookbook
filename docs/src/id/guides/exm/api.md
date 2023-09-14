---
locale: id
---

# Execution Machine API Token

EXM berusaha menjadi agnostik kripto dan hanya memerlukan satu token API (juga dikenal sebagai kunci) untuk berinteraksi. Token API ini diperlukan untuk sebagian besar tindakan di EXM seperti penyebaran dan operasi tulis.

## Membuat Token API

Untuk membuat token API, langkah-langkah berikut harus dilakukan:

- Buka [halaman utama](https://exm.dev/).
- Pilih metode yang diinginkan untuk Daftar Masuk/Log Masuk.

![Pilihan Masuk EXM](~@source/images/exm-sign-in-options.png)

- Setelah diarahkan ke dasbor, klik "Token Baru".

![Buat Token API Baru](~@source/images/exm-create-token.png)

- Salin token yang telah dibuat dan gunakan dengan SDK atau CLI.

## Menangani Token API dengan Aman

Token tersebut adalah pengidentifikasi akun kita dan memungkinkan kita mengakses fungsi yang terkait dengannya. Oleh karena itu, sangat penting untuk memastikan token ini tetap rahasia untuk mencegah spam dan serangan terhadap fungsi-fungsi kita. Cara terbaik untuk melakukannya adalah dengan menggunakan variabel lingkungan.

Ada dua cara untuk menyimpan variabel lingkungan:

1. Melalui baris perintah:

Di direktori proyek, jalankan perintah berikut:

```bash
export EXM_PK=<your_api_token>
```

2. Melalui sdk `dotenv`:

- Jalankan perintah berikut di baris perintah:

  ```bash
  npm install dotenv

  #ATAU

  yarn add dotenv
  ```
- Impor pustaka ini dalam file menggunakan variabel:

  ```jsx
  import dotenv from "dotenv";
  dotenv.config();
  ```

Maka kunci ini dapat dirujuk dalam file sebagai `process.env.EXM_PK` tanpa mengeksposnya atau mendorongnya ke sistem kontrol versi seperti GitHub.