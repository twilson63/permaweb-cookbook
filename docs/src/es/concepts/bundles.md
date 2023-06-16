---
locale: es
---

# Paquetes de transacción

### ¿Qué es un paquete?

---

Los paquetes son grupos de transacciones o ítems de datos para ser cargados a la red Arweave. 
Los paquetes son enviados a una red de la capa 2 (Layer 2), como [Bundlr] (https://bundlr.network), quienes publican los grupos de transacciones como un solo “paquete” a Arweave (Layer 1).

### ¿Cómo ayudan los paquetes a Arweave?

---

#### Disponibilidad

Las transacciones en paquetes están garantizadas para ser liquidadas en Arweave. 
El ID de la transacción del paquete es inmediatamente disponible, lo que significa que los datos se pueden acceder inmediatamente como si ya estuvieran en la red Arweave.

#### Confiabilidad 

Las transacciones publicadas a Arweave ocasionalmente pueden fallar al confirmarse debido a diversas razones, como una alta actividad en la red. En estas instancias, las transacciones se vuelven **huérfanas**, es decir, se quedan estancadas en el pool de memoria y eventualmente son eliminadas. 

Los servicios de empaquetado (Bundlers) solucionan este problema intentando continuamente publicar sus datos empaquetados en Arweave, asegurando que no fallen ni se queden atascados en el pool de memoria. Además, garantiza que **todos** sus datos empaquetados lleguen juntos.  

#### Escalabilidad 

Los paquetes pueden guardar hasta 2^256 transacciones, cada una de las cuales se liquida como una sola transacción en Arweave. Esto hace a Arweave esencialmente infinitamente escalable. 

#### Flexibilidad

Como los paquetes son gestionados por una red de la capa 2, esto abre la oportunidad de utilizar distintos tipos de canales de pago (como eth, matic, solana) para pagar la carga de datos a Arweave. 

### ¿Qué son los paquetes anidados?

---

Los paquetes toman ítems de datos para ser cargados a Arweave, y el ítem de datos en sí puede ser un paquete. 
Esto significa que se puede cargar un paquete de paquetes, o en otras palabras, **paquetes anidados**. 

Los paquetes anidados no tienen límite teórico en la profundidad de anidamiento, lo que significa que el rendimiento de las transacciones se puede incrementar drásticamente. 
Los paquetes anidados pueden ser útiles cuando tienes distintos grupos de datos empaquetados que deseas garantizar lleguen a Arweave juntos, y al mismo tiempo. 

Fuentes y lectura adicional: 

[Docs de Bundlr] (https://docs.bundlr.network)

[ESTÁNDAR ANS-104] (https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-104.md)