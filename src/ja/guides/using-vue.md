---
locale: ja
---
# VueをMarkdownで使用する

## ブラウザAPIアクセス制限

VuePressアプリケーションは、静的ビルドを生成する際にNode.jsでサーバー側レンダリングされるため、Vueの使用は[ユニバーサルコード要件](https://ssr.vuejs.org/en/universal.html)に準拠する必要があります。簡単に言うと、Browser / DOM APIには`beforeMount`または`mounted`フック内でのみアクセスするようにしてください。

SSRに適していないコンポーネント（カスタムディレクティブを含むなど）を使用したりデモしたりする場合は、それらを組み込みの`<ClientOnly>`コンポーネントでラップすることができます：

##