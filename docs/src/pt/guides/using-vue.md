---
locale: pt
---
# Usando o Vue em Markdown

## Restrições de acesso à API do navegador

Como as aplicações VuePress são renderizadas no servidor Node.js ao gerar builds estáticos, qualquer uso do Vue deve estar de acordo com os [requisitos de código universal](https://ssr.vuejs.org/pt-br/universal.html). Em outras palavras, certifique-se de acessar apenas APIs do navegador / DOM nos ganchos `beforeMount` ou `mounted`.

Se você estiver usando ou demonstrando componentes que não são amigáveis ​​ao SSR (por exemplo, contendo diretivas personalizadas), você pode envolvê-los dentro do componente embutido `<ClientOnly>`:

##