---
locale: "es"
---

# Publicación de transacciones

Existen varias formas de publicar transacciones en Arweave. Cada una tiene sus propias características y limitaciones. El siguiente diagrama ilustra los cuatro enfoques principales para la publicación de transacciones.

`Directo a un par`, `Directo a un gateway`, `Agrupado` y `Enviado`.

<img src="https://arweave.net/Z1eDDnz4kqxAkkzy6p5elMz-jKnlaVIletp-Tm6W8kQ" width="550">

::: tip <img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> Transacciones garantizadas
Cuando se publica una gran cantidad de transacciones o se desea un tiempo de liquidación rápido, se recomienda utilizar un servicio de agrupación. Los agrupadores liquidan grandes volúmenes de transacciones de inmediato y ponen los datos de la transacción a disposición en cuestión de milisegundos. El servicio de agrupación retiene las transacciones publicadas hasta que se confirmen en la cadena. Si las transacciones no se incluyen en el bloque más reciente, el servicio de agrupación las vuelve a publicar con cada nuevo bloque hasta que se registren en la cadena con un número suficiente de confirmaciones.
:::

## Transacciones directas

Las transacciones publicadas directamente en Arweave se dividen en dos tipos: transacciones de **billetera a billetera** y transacciones de **datos**. El primer tipo transfiere tokens **AR** entre direcciones de billetera. El segundo tipo publica datos en Arweave y paga los costos de almacenamiento asociados.

Curiosamente, las transacciones de **datos** también pueden transferir tokens **AR** a una dirección de billetera al mismo tiempo que pagan los costos de almacenamiento.

Todas las transacciones permiten al usuario especificar hasta 2 KB de metadatos en forma de [etiquetas personalizadas](./tags.md).

### Directo a un par

Las transacciones se pueden enviar directamente a un par de Arweave (nodo minero). Esta es quizás la forma más descentralizada de publicar una transacción, ya que los clientes pueden elegir a qué par desean enviarla.

Sin embargo, este enfoque no está exento de inconvenientes. Los pares pueden aparecer y desaparecer, lo que dificulta la publicación confiable de transacciones desde una aplicación. Aunque es posible consultar una lista de pares activos y elegir uno antes de la publicación, esto agrega sobrecarga y fricción al proceso. Además, las transacciones publicadas en los pares solo se pueden consultar en el gateway después de ser minadas en un bloque. Esto introduce un retraso de 1 a 2 minutos entre la publicación de la transacción en un par y su disponibilidad para su lectura en un navegador desde un gateway.

Por las razones mencionadas anteriormente, los desarrolladores suelen configurar `arweave-js` para que apunte a un gateway al publicar transacciones directas, ya que la caché optimista en el gateway hace que la transacción esté disponible casi de inmediato.

### Directo a un gateway

Los gateways se encuentran entre los clientes y la red de pares de Arweave. Una de las principales funciones del gateway es indexar las transacciones y almacenar en caché de manera optimista los datos publicados en la red mientras espera que se incluyan en un bloque. Esto permite que la transacción sea consultable en un estado "Pendiente" casi al instante, lo que permite que las aplicaciones construidas sobre un gateway sean más receptivas. Aún existe el riesgo de que las transacciones se eliminen de la caché optimista si no se minan en un bloque por los pares.

Se puede encontrar un ejemplo de cómo publicar una transacción directa usando `arweave-js` en [esta guía](../guides/posting-transactions/arweave-js.md).

## Transacciones agrupadas

Los servicios construidos sobre Arweave que brindan utilidad adicional para los creadores de Permaweb a veces se llaman Servicios Permaweb. Un agrupador es uno de esos servicios. Los agrupadores toman múltiples transacciones individuales y las agrupan en una sola transacción que se publica directamente en Arweave. De esta manera, una sola transacción a nivel de protocolo puede contener decenas de miles de transacciones agrupadas. Sin embargo, existe una restricción: solo se pueden incluir transacciones de **datos** en un paquete. Las transacciones de **billetera a billetera** (que transfieren tokens **AR** entre direcciones de billetera) deben hacerse como transacciones individuales publicadas directamente en Arweave.

Otra diferencia al utilizar un servicio de agrupación como [bundlr.network](https://bundlr.network) es que debes hacer un pequeño depósito en el nodo del agrupador que planeas usar antes de publicar las transacciones. Esto permite que el servicio de agrupación cobre por muchas cargas pequeñas (o grandes) sin el costo de liquidar las transferencias de tokens **AR** directamente en Arweave cada vez.

[bundlr.network](https://bundlr.network) permite a los clientes realizar depósitos en una variedad de [criptomonedas admitidas](https://docs.bundlr.network/docs/currencies).

::: info
Cuando las transacciones se publican en bundlr.network, también aparecen en la caché optimista de los gateways conectados, por lo que se pueden consultar en cuestión de milisegundos.
:::

Se puede encontrar un ejemplo de cómo publicar transacciones agrupadas utilizando `bundlr.network/client` en [esta guía](../guides/posting-transactions/bundlr.md).

## Transacciones enviadas

Otra forma de publicar transacciones agrupadas es desde el navegador. Si bien los navegadores imponen algunas restricciones en el tamaño de los datos que se pueden cargar, las billeteras basadas en el navegador pueden publicar transacciones en agrupadores. Las billeteras del navegador de Arweave implementan un método de API llamado `dispatch()`. Si estás publicando transacciones pequeñas (de 100 KB o menos), puedes utilizar el método `dispatch()` de la billetera para aprovechar las transacciones agrupadas, incluso si `bundlr.network/client` no está incluido en tu aplicación.

Se puede encontrar un ejemplo de cómo publicar una transacción agrupada de 100 KB o menos con el método `dispatch()` de una billetera de Arweave en [esta guía](../guides/post

ing-transactions/dispatch.md).

## Recursos

- Ejemplo de [arweave-js](../guides/posting-transactions/arweave-js.md)
- Ejemplo de [bundlr.network](../guides/posting-transactions/bundlr.md)
- Ejemplo de [dispatch](../guides/posting-transactions/dispatch.md)
