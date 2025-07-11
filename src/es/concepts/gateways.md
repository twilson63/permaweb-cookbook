---
locale: es
---

# Puertas de Enlace

---

Los datos cargados en la red de Arweave (o el [permaweb](https://cookbook.arweave.dev/concepts/permaweb.html)) no siempre son inmediatamente fáciles de trabajar.

### ¿Qué es una Puerta de Enlace?

Las puertas de enlace a veces se refieren como la "puerta principal del permaweb". Actúan como una interfaz entre Arweave y los usuarios finales, haciendo que sea fácil acceder a datos o usar aplicaciones permaweb desde su navegador web.

Por ejemplo, el acceso a un archivo HTML almacenado en Arweave se mostrará como una página web en su navegador. Lo mismo ocurre con la visualización de imágenes, descarga de archivos, visualización de datos JSON u otros archivos almacenados en Arweave. Esto hace que interactuar con el permaweb sea muy similar al uso de la web tradicional.

### Otros roles de las Puertas de Enlace

Además de servir datos para que los usuarios los accedan, las puertas de enlace ofrecen otros servicios como:

- Caché de datos y transacciones accedidas frecuentemente
- Indexación y búsqueda de transacciones (mediante etiquetas de Arweave y una interfaz GraphQl)
- Uso de siembra de transacciones en toda la red de Arweave
- Moderación de contenido (políticas de contenido para elegir qué datos se muestran o no)

### Puertas de enlace y el protocolo de Arweave

Aunque las puertas de enlace tienen una gran importancia para permitir el acceso al contenido en Arweave, **no** forman parte del protocolo principal.

Esto significa que alojar y ejecutar puertas de enlace está separado de ejecutar un nodo para asegurar la red de Arweave (aunque a menudo se hace juntos).

Dado que las puertas de enlace no forman parte del protocolo principal, no hay una estructura de incentivos incorporada como los premios o incentivos para la minería. Esto permite que los operadores de puertas de enlace o servicios externos elijan cómo quieren estructurar su sistema de incentivos, lo que da lugar a un modelo más descentralizado y democrático. Incluso las aplicaciones individuales podrían operar su propia puerta de enlace para permitir un mejor almacenamiento en caché y mejorar el rendimiento de sus aplicaciones permaweb.

Algunas puertas de enlace populares incluyen [arweave.net](https://arweave.net/) gestionada por el equipo de Arweave, y otras como [arweave.live](https://arweave.live/), y [g8way.io](https://g8way.io). Sin embargo, la operación de puertas de enlace se está haciendo más fácil y más accesible a través de equipos como [AR.IO](https://ar.io/).

### Fuentes y Lecturas Adicionales

- [ArWiki](https://arwiki.wiki/#/es/gateways)
- [AR.IO](https://ar.io/)
