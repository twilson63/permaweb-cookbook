---
locale: es
---
# Máquina de Ejecución (EXM)

**Máquina de Ejecución (EXM)** es una plataforma para desarrolladores que proporciona la capacidad de crear y aprovechar **funciones sin servidor basadas en blockchain (permanentes)** sin necesidad de conocimientos o acceso a tecnologías de blockchain como billeteras y tokens.

Esto permite aún más la creación de aplicaciones **componibles**, **inmutables** y **confiables** de manera libre de fricciones.

## Funciones sin servidor en Arweave

Las funciones sin servidor se almacenan en Arweave a través del intermediario EXM, que también almacena una copia en caché para servir rápidamente aplicaciones en cualquier momento. Las funciones son estado (almacenar datos) y, por lo tanto, un solo ID de función apunta a ciertos datos, así como a la lógica para interactuar y actualizar estos datos.

EXM maneja el almacenamiento y la ejecución, eliminando la necesidad de mantener un servidor dedicado, reduciendo los costos de mantenimiento y agregando una capa de modularidad.

La modularidad también aporta la capacidad de seleccionar y ensamblar funciones en varias combinaciones para crear aplicaciones personalizadas adaptadas a nuestros requisitos. Estas funciones y las interacciones con ellas se almacenan de manera **permanente en la cadena**, no se pueden modificar y están disponibles para que cualquiera las vea, lo que las hace **inmutables** y **confiables**.

Además, EXM cubre el costo de cargar los datos en Arweave y hace que el proceso sea compatible con diferentes criptomonedas para los desarrolladores.

![Funciones en servidores dedicados vs funciones sin servidor en blockchains](~@source/images/exm-serverless-functions.png)

## ¿Cómo funciona en el fondo?

Un usuario envía una solicitud de transacción a un servidor EXM dedicado. Con la ayuda de la Computación Verificable, la Máquina de Ejecución puede procesar las solicitudes de los usuarios de manera rápida y eficiente, eliminando la necesidad de tecnología blockchain como tokens y billeteras, al mismo tiempo que mantiene un resultado descentralizado. EXM luego actualiza su capa de caché con el estado actualizado mientras también carga los datos en Arweave. La capa de caché se utiliza como ayuda para servir rápidamente aplicaciones en cualquier momento.

Además, EXM es capaz de mantener un entorno de confianza minimizado, ya que los usuarios pueden verificar las transacciones y el estado actual del contrato/funciones mediante la Evaluación Perezosa.

<details>
<summary><strong>Explained Computación Verificable</strong></summary>

La <strong>computación verificable</strong> es una forma de computación que aprovecha los beneficios de los sistemas centralizados al tiempo que garantiza un resultado descentralizado.

Cada función sin servidor tiene la capacidad de leer o actualizar el estado de alguna información. Usando la computación verificable, este estado se almacena en caché en un servidor centralizado, lo que permite un mayor rendimiento ya que no se necesita consenso en el momento del procesamiento, pero la información siempre está disponible para su verificación por parte de los usuarios. Esto permite a los usuarios "evaluar perezosamente" incluso cuando se almacena en la capa de caché antes de ser movido a la cadena.

![Computación Verificable Explicada](~@source/images/exm-verifiable-computing.png)

Para que la computación verificable funcione perfectamente, se deben implementar algunas partes fundamentales.

- <strong>Executor</strong>: Un software que procesa las solicitudes de transacción de los usuarios y las almacena en caché.
- <strong>Processor</strong>: Un sistema de canalización centralizado responsable de recibir transacciones de uno o varios usuarios. Después de recibir los diferentes lotes de transacciones enviadas, el procesador debe reevaluar el contrato inteligente con los nuevos datos. A medida que se reciben transacciones, se debe actualizar y guardar el estado más reciente del contrato inteligente con acceso para el usuario. El procesador es responsable de ordenar las transacciones, generalmente por marca de tiempo.
- <strong>Conveyor</strong>: Un sistema centralizado que establece un puente entre una cadena de bloques basada en datos. Todas las transacciones recibidas por el procesador deben enviarse al sistema de transporte, el cual garantizará el éxito de almacenar estas operaciones en una cadena de bloques basada en datos como Arweave.
</details>
<br/>

<details>
<summary><strong>Explicación de Evaluación Perezosa</strong></summary>

![Explicación de Evaluación Perezosa](~@source/images/exm-lazy-evaluation.png)

La <strong>evaluación perezosa</strong>, como sugiere el nombre, es un método para evaluar perezosamente los contratos inteligentes y su estado actual en la cadena de bloques. El contrato inteligente en sí y cualquier interacción (operaciones de escritura) con ellos se almacenan en la cadena y pueden ser accedidos por cualquier usuario.

Su objetivo es trasladar la carga de procesamiento de los nodos a los usuarios. El usuario puede optar por evaluar e interpretar el código del contrato inteligente y las interacciones con él localmente para verificar el estado actual del contrato.

Esto elimina la necesidad de que los nodos almacenen una copia completa del estado actual de una cadena y lleguen a un consenso sobre él. Por lo tanto, reduce el costo y mejora el rendimiento, respectivamente.

Dado que todos tienen acceso a los mismos datos, todos lo interpretarán de la misma manera, asegurando que todos tengan acceso al mismo estado actual de la información.
</details>
<br/>

## Ventajas de usar Funciones sin servidor

- Las funciones sin servidor agregan una capa de modularidad y se pueden componer según los requisitos de diversas aplicaciones.
- Las correcciones de errores y las integraciones de nuevas funciones son más fáciles de implementar al dirigirse a las funciones específicas.
- La Máquina de Ejecución tiene una capa de caché para servir rápidamente aplicaciones.
- La Máquina de Ejecución aprovecha un sistema centralizado al tiempo que garantiza un resultado descentralizado.
- La Máquina de Ejecución busca ser compatible con diferentes criptomonedas.