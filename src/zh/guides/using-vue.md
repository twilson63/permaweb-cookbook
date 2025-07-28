---
locale: zh
---
在Markdown中使用Vue

## 浏览器API访问限制

由于VuePress应用程序在生成静态构建时在Node.js中进行服务器渲染，因此任何Vue使用都必须符合[通用代码要求](https://ssr.vuejs.org/en/universal.html)。简而言之，请确保只在`beforeMount`或`mounted`钩子中访问浏览器/DOM API。

如果您使用或演示的组件不符合服务器端渲染要求（例如包含自定义指令），您可以将它们包装在内置的`<ClientOnly>`组件中：