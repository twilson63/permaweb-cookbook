---
locale: es
---

# Paquetes de transacción

### ¿Qué es un paquete?

---

Un paquete de transacciones es un tipo especial de transacción de Arweave. Permite agrupar múltiples transacciones y/o elementos de datos en su interior. Debido a que los paquetes de transacciones contienen muchas transacciones anidadas, son clave para la capacidad de Arweave de escalar a miles de transacciones por segundo.

Los usuarios envían transacciones a un servicio de agrupamiento, como [irys.xyz](https://irys.xyz), que las combina en un 'paquete' con otras transacciones y las publica en la red.

### ¿Cómo ayudan los paquetes a Arweave?

---

#### Disponibilidad

Las transacciones en paquetes están garantizadas para ser liquidadas en Arweave.
El ID de la transacción del paquete es inmediatamente disponible, lo que significa que los datos se pueden acceder inmediatamente como si ya estuvieran en la red Arweave.

#### Confiabilidad

Las transacciones publicadas a Arweave ocasionalmente pueden fallar al confirmarse debido a diversas razones, como una alta actividad en la red. En estas instancias, las transacciones se vuelven **huérfanas**, es decir, se quedan estancadas en el pool de memoria y eventualmente son eliminadas.

Los servicios de empaquetado (Bundlers) solucionan este problema intentando continuamente publicar sus datos empaquetados en Arweave, asegurando que no fallen ni se queden atascados en el pool de memoria. Además, garantiza que **todos** sus datos empaquetados lleguen juntos.

#### Escalabilidad

Los paquetes pueden guardar hasta 2<sup>256</sup> transacciones, cada una de las cuales se liquida como una sola transacción en Arweave. Esto hace a Arweave esencialmente infinitamente escalable.

#### Flexibilidad

Dado que el agrupamiento es gestionado por servicios de agrupamiento construidos sobre Arweave, se abre la posibilidad de pagar por el almacenamiento con diferentes monedas. [irys.xyz](https://irys.xyz) admite pagos en múltiples tokens (como ETH, MATIC y SOL) para cargar datos en Arweave.

### ¿Qué son los paquetes anidados?

---

Los paquetes pueden incluir elementos de datos para cargar en Arweave y esos elementos de datos también pueden ser un paquete.

Esto significa que es posible cargar un paquete de paquetes, o en otras palabras, **paquetes anidados**.

Los paquetes anidados no tienen un límite teórico en la profundidad de anidamiento, lo que significa que se puede aumentar drásticamente el rendimiento de las transacciones.

Los paquetes anidados pueden ser útiles cuando tienes diferentes grupos de datos empaquetados que deseas garantizar que lleguen a Arweave todos juntos y al mismo tiempo.

Fuentes y lecturas adicionales:

[Docs de Irys](https://docs.irys.xyz)

[ESTÁNDAR ANS-104](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)
