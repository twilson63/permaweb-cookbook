---
locale: es
---

# Publicar transacciones

Hay varias formas de publicar transacciones en Arweave. Cada una tiene sus propios recursos y restricciones únicos. El diagrama a continuación ilustra los cuatro principales enfoques para publicar transacciones.

`Directo a un par`, `Directo a la Puerta de Enlace`, `Agrupado` y `Enviado`.

<img src="https://arweave.net/Z1eDDnz4kqxAkkzy6p5elMz-jKnlaVIletp-Tm6W8kQ" width="550">

::: tip <img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> Transacciones garantizadas
Al publicar una gran cantidad de transacciones o cuando se desea un tiempo de liquidación rápido, considere usar un servicio de empaquetado. Los empaquetadores liquidan grandes volúmenes de transacciones de inmediato y hacen que los datos de la transacción estén disponibles en milisegundos. El servicio de empaquetado se aferra a las transacciones publicadas hasta que se confirman en la cadena. Si las transacciones no se incluyen en el bloque más reciente, el servicio de empaquetado la vuelve a publicar con cada nuevo bloque hasta que se registren en la cadena con un número suficiente de confirmaciones.
:::

## Transacciones directas

Las transacciones publicadas directamente en Arweave vienen en dos variedades: transacciones **billetera-a-billetera** y transacciones de **datos**. La primera transfiere tokens **AR** entre direcciones de billetera. El segundo publica datos en Arweave y paga los costos de almacenamiento asociados.

Curiosamente, las **transacciones de datos** también pueden transferir tokens **AR** a una dirección de billetera al mismo tiempo que pagan los costos de almacenamiento.

Todas las transacciones permiten al usuario especificar hasta 2KB de metadatos en forma de [etiquetas personalizadas](./tags.md).

### Directo a un par

Las transacciones se pueden publicar directamente en un par de Arweave (nodo de minería). Esta es quizás la forma más descentralizada de publicar una transacción, ya que los clientes pueden elegir a qué par publicar.

Esta aproximación no está exenta de inconvenientes. Los pares pueden ir y venir, lo que dificulta la publicación confiable de transacciones desde una aplicación. Si bien es posible consultar una lista de pares activos y elegir uno antes de publicar, esto agrega cargas y fricción al proceso. Además, las transacciones publicadas a los pares solo se pueden consultar en la Puerta de Enlace después de minarse en un bloque. Esto introduce un retraso de 1-2 minutos entre la publicación de la transacción en un par y que esté disponible para leer en un navegador a través de una puerta de enlace.

Por los motivos anteriores, los desarrolladores tienden a configurar `arweave-js` para apuntar a una puerta de enlace cuando publican transacciones directas, ya que el caché optimista en la Puerta de Enlace hace que la transacción esté disponible casi de inmediato.

### Directo a la Puerta de Enlace

Las puertas de enlace se encuentran entre los clientes y la red de pares de Arweave. Una de las principales funciones de la Puerta de Enlace es indexar transacciones y cachear optimísticamente los datos publicados en la red mientras se espera que se incluyan en un bloque. Esto hace que la transacción sea consultable en un Estado "Pendiente" casi al instante, lo que permite que las aplicaciones construidas encima de una Puerta de Enlace sean más receptivas. Todavía hay un riesgo de que las transacciones caigan fuera del caché optimista si no se incluyen en un bloque por los pares.

Un ejemplo de cómo publicar una transacción directa usando `arweave-js` se puede encontrar [en esta guía](../guides/posting-transactions/arweave-js.md).

## Transacciones Agrupadas

Los servicios construidos encima de Arweave que proporcionan una utilidad adicional para los constructores de Permaweb a veces se llaman Servicios Permaweb. Un empaquetador es uno de esos servicios. Los empaquetadores recopilan múltiples transacciones individuales y las agrupan en una sola transacción que se publica directamente en Arweave. De esta manera, en el nivel de protocolo, una sola transacción puede contener decenas de miles de transacciones agrupadas. Sin embargo, hay una restricción: solo se pueden incluir **transacciones de datos** en un paquete. Las transacciones **billetera-a-billetera** (que transfieren tokens **AR** entre direcciones de billetera) deben hacerse como transacciones individuales publicadas directamente en Arweave.

Un ejemplo de cómo publicar una transacción agrupada de 100KB o menos utilizando el método `dispatch()` de las billeteras de Arweave se puede encontrar en esta guía.

## Recursos

-   Ejemplo de [arweave-js](../guides/posting-transactions/arweave-js.md)
-   Ejemplo de [dispatch](../guides/posting-transactions/dispatch.md)
