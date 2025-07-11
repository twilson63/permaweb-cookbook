---
locale: es
---

# SmartWeave

## ¿Qué es SmartWeave?

SmartWeave es el nombre dado al paradigma dominante de SmartContracts en Arweave. Una propiedad única de los contratos de SmartWeave es que el estado actual del contrato se proporciona por medio de un proceso de "evaluación perezosa". Esto significa que en lugar de que los nodos mineros de Arweave evalúen constantemente el estado actual de todos los contratos, un cliente leyendo el contrato evalúa el estado por sí mismo.

## ¿Por qué es importante SmartWeave?

El estado y la lógica de las aplicaciones descentralizadas necesitan ser tan resistentes a la censura, permanentes y verificables como el resto de su información. SmartWeave permite a los desarrolladores escribir contratos inteligentes que encapsulen el estado y la lógica de su app en una cadena, y la ejecuten de una forma fiable y segura. Esto no es tarea sencilla ya que el protocolo Arweave no incluye incentivos para que los nodos evalúen el estado de los smart contracts de la red.

SmartWeave ofrece un patrón en el que solo se agrega de forma inmutable para las interacciones del contrato que usa el almacenamiento permanente para mantener su estado. El resultado es una máquina de estado completamente descentralizada en cadena que puede otorgar al protocolo y a las aplicaciones una funcionalidad dinámica de forma sin permiso y sin confianza. Usando SmartWeave, los desarrolladores pueden crear contratos inteligentes que se almacenan en Arweave y están garantizados para que no cambien con el tiempo. Esto les permite construir [aplicaciones Permaweb](/concepts/permawebApplications.md) con funcionalidad dinámica que se pueden usar sin permisos y sin confianza.

Existen varias razones por las que los desarrolladores podrían optar por usar SmartWeave para implementar la lógica para sus aplicaciones permaweb:

- **Almacenamiento descentralizado:** SmartWeave está construido sobre Arweave, lo que significa que las aplicaciones creadas mediante SmartWeave se almacenarán en una red distribuida de nodos en lugar de en un servidor centralizado. Esto puede hacerlas más resistentes a la censura, el fraude y otras formas de interferencia.

- **Evaluación perezosa:** La función de evaluación perezosa de los contratos de SmartWeave permite una ejecución eficiente y escalable. En lugar de que los nodos de Arweave evalúen constantemente el estado de un contrato, el cliente que lee el contrato es el responsable de evaluar el estado, aprovechando el poder de procesamiento del usuario en lugar de los nodos de la red.

- **Soporte de lenguajes:** SmartWeave soporta una variedad de lenguajes de programación, incluidos JavaScript, TypeScript, Rust, Go, AssemblyScript y WASM (WebAssembly). Esto permite a los desarrolladores usar el lenguaje con el que están más familiarizados al crear aplicaciones con SmartWeave.

- **Durabilidad de datos:** Arweave está diseñado para almacenar datos de una manera que los haga muy duraderos y de larga duración. Esto puede ser útil para aplicaciones que necesitan almacenar datos a largo plazo, como registros históricos o datos científicos.

- **Modelo económico:** Arweave usa un modelo económico único basado en el concepto de almacenamiento permanente que incentiva a los mineros para almacenar los datos de forma indefinida. Esto puede ayudar a garantizar la viabilidad a largo plazo y la durabilidad de las aplicaciones permaweb creadas con SmartWeave.

## ¿Cómo funciona SmartWeave?

Los contratos de SmartWeave, en su núcleo, se construyen a partir de un estado de contrato inicial, con ediciones, adiciones y sustracciones mediante etiquetas de transacción.

Los SDK de SmartWeave, como `Warp` (anteriormente `RedStone`), se usan para consultar estas transacciones para construir el estado del contrato localmente, modificando el estado del contrato con cada transacción. El Evaluador (`Warp`) utiliza etiquetas para consultar las transacciones de un contrato; sabe que una transacción es parte del contrato con la ayuda de la etiqueta App-Name, y la etiqueta Contract.

A continuación hay un ejemplo de una **interacción** del contrato .

- La etiqueta `App-Name` dice que se trata de una **ACCION** de Smartweave.
- La etiqueta `Contrato` ofrece el ID de transacción específico del estado de contrato inicial.
- La etiqueta `Input` le da al contrato su función para ejecutar y cualquier otro dato que necesite:

```json
[
    {
        nombre:"App-Name"
        valor:"SmartWeaveAction"
    },
    {
        nombre:"App-Version"
        valor:"0.3.0"
    },
    {
        nombre:"Contract"
        valor:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        nombre:"Input"
        valor:"{
            "función":"setRecord",
            "subDomain":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```

Y aquí hay un ejemplo de un **contrato** .

- La etiqueta `App-Name` dice que se trata de un **CONTRATO** de Smartweave.
- La etiqueta `Contract-Src` apunta al código fuente del contrato:

```json
[
    {
        clave:"App-Name"
        valor:"SmartWeaveContract"
    },
    {
        clave:"App-Version"
        valor:"0.3.0"
    },
    {
        clave:"Contract-Src"
        valor:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        clave:"SDK"
        valor:"RedStone"
    },
    {
        clave:"Content-Type"
        valor:"application/json"
    }
]
```

El estado resultante es el estado actual del contrato, que el SDK en el lado del cliente puede utilizar para calcular los saldos de los usuarios, los propietarios del contrato y otros detalles específicos del contrato. Una vez que el llamador tiene un estado de contrato validado, pueden construir una interacción para que el usuario la implemente en la cadena, la cual, después de ser minada o indexada en una [Gateway](/concepts/gateways.md), se incluirá la próxima vez que alguien construya el estado del contrato.

## Proyectos del ecosistema Smartweave

Hay varios proyectos del ecosistema que aprovechan los SmartContracts de SmartWeave, pero aquí hay algunos destacados:

### Implementaciones

- [Warp](https://warp.cc/) | Principal proveedor de SDK de SmartWeave, tutoriales y ayuda en el mantenimiento del protocolo SmartWeave.
- [EXM](https://docs.exm.dev/) | Execution Machine (EXM) es una plataforma para desarrolladores que impulsa la creación y el uso de aplicaciones altamente disponibles y de alto rendimiento dentro de un entorno descentralizado.

### Herramientas

- [SonAr](https://sonar.warp.cc/#/app/contracts) | Explorador de contratos de SmartWeave, creado y alojado por Warp.

### Aplicaciones

- [Permapages](https://permapages.app/) | Herramienta para la creación de páginas web permanentes, portal para la compra de ArNS y portal para la creación de ANT. Tu perfil en la permaweb.
- [ArNS](arns.md) | Sistema de Nombres de Arweave <!-- // todo: actualizar al portal de ArNS cuando se lance -->
- [WeaveDB](https://weavedb.dev/) | Base de datos NoSQL como Smart Contract.
- [KwilDB](https://docs.kwil.com/) | Base de datos SQL como Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Obtén PST para subir a través de Ardrive.
