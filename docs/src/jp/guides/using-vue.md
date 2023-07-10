---
locale: jp
---
# MarkdownでVueを使用する

## ブラウザAPIアクセス制限

VuePressアプリケーションは、静的ビルドを生成する際にNode.jsでサーバーレンダリングされるため、任意のVueの使用は[ユニバーサルコードの要件](https://ssr.vuejs.org/ja/universal.html)に準拠する必要があります。要するに、`beforeMount`または`mounted`フック内でのみブラウザ/DOM APIにアクセスするようにしてください。

SSRに適さない（たとえば、カスタムディレクティブを含む）コンポーネントを使用したりデモしたりする場合は、組み込みの`<ClientOnly>`コンポーネントでそれらをラップできます：