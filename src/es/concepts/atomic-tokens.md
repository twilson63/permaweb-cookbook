---
locale: es
---
 - For more information and examples for creating Atomic Tokens.

# Concepto y principios de Token Atómico 

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

Un Token Atómico es un único identificador permanente que hace referencia a los datos y un Contrato SmartWeave en el Permaweb.

## Especificaciones

Los datos DEBEN almacenarse en la red de arweave y referenciables mediante un Identificador de Transacción.

El Contrato DEBE implementar un objeto "balances" que represente la propiedad del Token Atómico.

El Contrato DEBE implementar una función "transfer" que tenga los siguientes argumentos:
- objetivo {WalletAddress o Contracto}
- qty {Número}

> La función de transferencia debería transferir la propiedad del llamador al objetivo.

## Opciones

_Estas son opciones de implementación que pueden hacer que el Token Atómico sea descubrible y comerciable en el Permaweb_

[Verto Flex](https://github.com/useverto/flex) - La Biblioteca Flex permite que su token atómico sea vendido o comprado sin confiar en un intercambio.

[Etiquetas de descubrimiento - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - Estas etiquetas adicionales pueden ayudar a las aplicaciones y servicios del Permaweb a descubrir su token.

[Echa un vistazo a la Guía](../guides/atomic-tokens/intro.md) - Para obtener más información y ejemplos para crear Tokens Atómicos.