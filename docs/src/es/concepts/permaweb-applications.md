---
locale: es
---

# Aplicaciones Permaweb

Una aplicación Permaweb es un tipo de página web o aplicación web que se ejecuta en su navegador. Lo que lo hace una aplicación permaweb es que se despliega en Arweave y se guarda para siempre. Incluso si el equipo que lo desarrolló sigue adelante, los usuarios pueden estar seguros de que la aplicación permaweb seguirá en línea y disponible. Una gran ventaja de las aplicaciones permaweb es que guardan sus datos en Arweave, lo que significa que se pueden importar fácilmente a otras aplicaciones que tal vez mejoren la que se está utilizando actualmente.

## ¿Qué es el permaweb?

::: info INFORMACIÓN
Para profundizar en el permaweb, consulte este artículo sobre [El Permaweb](./permaweb.md)
:::

<img src="https://arweave.net/ycQzutVToTtVT_vT4811ByswtZ-KjqmifNSehSb1-eg" width="700">

### Servicios de Puerta de Enlace

Los servicios de puerta de enlace son el puente entre los datos de Arweave y la visualización de datos en el navegador. Los gateways a menudo proporcionan servicio de indexación junto al servicio de datos de transacciones, exponen puntos finales de graphQL para consultar transacciones Arewave.

### Servicios de Secuenciación

Los secuenciadores proporcionan un alto rendimiento para los contratos SmartWeave para calcular el lógica de negocios almacenada en la red Arweave.

### Servicios de Indexación

Los servicios de indexación escuchan todas las transacciones en Arweave e importan a una base de datos indexada adecuada para consultas rápidas. Luego exponen un punto final de graphQL para que las aplicaciones permaweb puedan hacer consultas optimizadas para los datos de Arweave.

Estos servicios trabajan juntos para formar la Capa de Servicios Permaweb y dan a los desarrolladores la posibilidad de construir aplicaciones completamente descentralizadas en el permaweb.

## Desarrollo de aplicaciones

Aproximarse al desarrollo de aplicaciones con el permaweb es similar al desarrollo de aplicaciones de una sola página, la aplicación consiste en funcionalidad frontend que se ejecuta en un navegador web y usa GraphQL (Lectura / Consulta), Irys (Escribir) y SmartWeave (Computación descentralizada) para conformar la capa de lógica de negocio y de persistencia de la aplicación.

![common permaweb app](https://arweave.net/UjbgAk8duudDc97lOYIt7rBVtRHp2Z9F6Ua5OcvwNCk/)

Al aprovechar los frameworks modernos de aplicaciones web y la especificación [Manifiesto de Rutas](./manifests.md), los desarrolladores pueden desplegar sitios web y aplicaciones en el permaweb.

Para obtener más información sobre la creación y despliegue de aplicaciones Permaweb, consulte nuestros kits de inicio en su marco de trabajo favorito:

-   [React](../kits/react/index.md)
-   [Svelte](../kits/svelte/index.md)

::: tip ¿No encuentra mi marco de trabajo?
No encuentra su marco de trabajo, ¿por qué no contribuye? [Cómo contribuir al libro de recetas](../getting-started/contributing.md)
:::
