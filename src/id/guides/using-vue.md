---
locale: id
---

# Menggunakan Vue di Markdown

## Pembatasan Akses API Browser

Karena aplikasi VuePress dirrender oleh server dalam Node.js saat menghasilkan build statis, penggunaan Vue harus sesuai dengan [persyaratan kode universal](https://ssr.vuejs.org/en/universal.html). Singkatnya, pastikan hanya mengakses API Browser / DOM dalam hook `beforeMount` atau `mounted`.

Jika Anda menggunakan atau mendemo komponen yang tidak ramah terhadap SSR (misalnya mengandung direktif kustom), Anda dapat melingkupi mereka dalam komponen bawaan `<ClientOnly>`:

##
