---
locale: es
---

# Servicios de empaquetamiento
---
Con los servicios de empaquetamiento, los usuarios pueden publicar sus transacciones de datos en un servicio centralizado para que se "empaqueten" con las transacciones de otros usuarios y se publiquen como una sola transacción Arweave en un bloque de Arweave próximo.

### Publicar en un servicio de empaquetamiento
---
Puede leer más sobre cómo publicar sus transacciones en un servicio de empaquetamiento [aquí] (/guides/posting-transactions/bundlr).

### ¿Qué es un paquete?
---
Puede encontrar una descripción de los paquetes de transacción y sus beneficios [aquí] (/concepts/bundles.md).

### ¿Qué es un nodo Empaquetador?
---
Un empaquetador es un nodo que se encarga de aceptar transacciones o elementos de datos de los usuarios, empaquetarlos y publicarlos en la red Arweave (con la garantía de que se cargarán con un identificador de transacción específico).

El pionero de los servicios de empaquetamiento y el empaquetador más grande actualmente es [bundlr.network](https://bundlr.network). Los nodos Bundlr ejecutan:

- Un proxy inverso de NGINX
- Procesos de API HTTP
- Una memoria caché Redis
- Una base de datos SQL (Postgres)
- Procesos de trabajador

Que aseguran que los datos se mantengan hasta que se carguen en Arweave.

### Apoyando múltiples monedas
---
Una característica clave de los servicios de empaquetamiento es que, debido a que pagan por la publicación de la transacción base de Arweave (usando tokens AR), pueden optar por habilitar pagos de tarifas de almacenamiento con una variedad de tokens diferentes. Esta es la principal vía de entrada para que otras cadenas habiliten el almacenamiento permanente de Arweave para sus usuarios.