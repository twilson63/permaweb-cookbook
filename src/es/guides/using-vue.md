---
locale: es
---
# Using Vue in Markdown

## Browser API Access Restrictions

Debido a que las aplicaciones de VitePress se renderizan en el servidor con Node.js al generar compilaciones estáticas, cualquier uso de Vue debe cumplir con los [requisitos de código universal](https://ssr.vuejs.org/es/universal.html). En resumen, asegúrate de acceder a las APIs del navegador / DOM solo en los hooks `beforeMount` o `mounted`.

Si estás usando o demostrando componentes que no son compatibles con SSR (por ejemplo, que contienen directivas personalizadas), puedes envolverlos dentro del componente integrado `<ClientOnly>`: