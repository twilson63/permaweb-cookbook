---
locale: es
---
# Uso de Vue en Markdown

## Restricciones de acceso a la API del navegador

Debido a que las aplicaciones de VuePress se renderizan en el servidor con Node.js al generar compilaciones estáticas, cualquier uso de Vue debe cumplir con los [requisitos de código universal](https://ssr.vuejs.org/es/universal.html). En resumen, asegúrate de solo acceder a las API del navegador / DOM en los hooks `beforeMount` o `mounted`.

Si estás utilizando o demostrando componentes que no son compatibles con SSR (por ejemplo, aquellos que contienen directivas personalizadas), puedes envolverlos dentro del componente incorporado `<ClientOnly>`.