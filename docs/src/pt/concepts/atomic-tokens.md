---
locale: pt
---
# Conceito e Princípios do Token Atômico

![https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A](https://arweave.net/bcHI0TW_nH-iTfZnobD9Wt6d0Qe6thWfPrGhnvi1m1A)

Um Token Atômico é um identificador permanente único que faz referência a dados e a um Contrato SmartWeave na Permaweb.

## Especificações

Os dados DEVEM ser armazenados na rede arweave e podem ser referenciados por um Identificador de Transação.

O Contrato DEVE implementar um objeto `balances` que representa a propriedade do Token Atômico.

O Contrato DEVE implementar uma função `transfer` que recebe os seguintes argumentos:
- target {Endereço da carteira ou Contrato}
- qty {Número}

> A função de transferência deve transferir a propriedade do chamador para o destinatário.

## Opções

_Essas são opções de implementação que podem tornar o Token Atômico descobrível e negociável na Permaweb._

[Verto Flex](https://github.com/useverto/flex) - A biblioteca Flex permite que seu token atômico seja comprado ou vendido sem precisar confiar em uma exchange.

[Tags de Descoberta - ANS 110](https://github.com/ArweaveTeam/arweave-standards/blob/master/ans/ANS-110.md) - Essas tags adicionais podem ajudar aplicativos e serviços Permaweb a descobrir seu token.

[Veja o Guia](../guides/atomic-tokens/intro.md)