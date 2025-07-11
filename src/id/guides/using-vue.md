---
locale: id
---

# Using Vue in Markdown

## Browser API Access Restrictions

Karena aplikasi VitePress dirrender oleh server dalam Node.js saat menghasilkan build statis, penggunaan Vue harus sesuai dengan [persyaratan kode universal](https://ssr.vuejs.org/en/universal.html). Singkatnya, pastikan hanya mengakses Browser / DOM API di hook `beforeMount` atau `mounted`.

Jika Anda menggunakan atau mendemonstrasikan komponen yang tidak ramah SSR (misalnya yang berisi direktif kustom), Anda dapat membungkusnya di dalam komponen bawaan `<ClientOnly>`:

##
