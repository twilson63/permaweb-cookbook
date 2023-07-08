---
locale: pt
---
# SmartWeave

## O que é o SmartWeave?

SmartWeave é o nome dado ao paradigma dominante de SmartContracts na Arweave. Uma propriedade única dos contratos SmartWeave é que o estado atual do contrato é fornecido por um processo de "avaliação preguiçosa". Isso significa que, em vez dos nós de mineração da Arweave constantemente avaliarem o estado atual de todos os contratos, um cliente lendo um contrato avalia o estado por si mesmo.

## Por que o SmartWeave é importante?

O estado e a lógica das aplicações descentralizadas precisam ser tão resistentes à censura, permanentes e verificáveis quanto o restante de seus dados. O SmartWeave permite que os desenvolvedores escrevam smart contracts que encapsulam o estado e a lógica de seus aplicativos on-chain e os executem de maneira trustless e verificável. Isso não é uma tarefa fácil, pois o protocolo Arweave não inclui incentivos para os nós avaliarem o estado dos smart contracts para a rede.

O SmartWeave fornece um padrão imutável de apêndice único para interações de contrato, que utiliza armazenamento permanente para manter seu estado. O resultado é uma máquina de estado on-chain totalmente descentralizada que pode fornecer funcionalidade dinâmica para protocolos e aplicativos de maneira permissiva e trustless. Ao usar o SmartWeave, os desenvolvedores podem criar smart contracts que são armazenados na Arweave e têm garantia de que não serão alterados ao longo do tempo. Isso permite que eles construam [aplicações Permaweb](/concepts/permawebApplications.md) com funcionalidade dinâmica que pode ser usada de maneira permissiva e trustless.

Existem várias razões pelas quais os desenvolvedores podem escolher usar o SmartWeave para implementar a lógica de suas aplicações permaweb:

- **Armazenamento descentralizado:** O SmartWeave é construído na Arweave, o que significa que as aplicações criadas usando o SmartWeave serão armazenadas em uma rede distribuída de nós, em vez de um servidor centralizado. Isso pode torná-las mais resistentes à censura, adulteração e outras formas de interferência.

- **Avaliação preguiçosa:** A funcionalidade de avaliação preguiçosa dos contratos SmartWeave permite uma execução eficiente e escalável. Em vez dos nós da Arweave avaliarem constantemente o estado de um contrato, o cliente que lê o contrato é responsável por avaliar o estado, aproveitando o poder de processamento dos usuários em vez dos nós da rede.

- **Suporte de linguagens:** O SmartWeave suporta várias linguagens de programação, incluindo JavaScript, TypeScript, Rust, Go, AssemblyScript e WASM (WebAssembly). Isso permite que os desenvolvedores usem a linguagem com a qual estão mais familiarizados ao criar aplicativos SmartWeave.

- **Durabilidade dos dados:** A Arweave foi projetada para armazenar dados de maneira altamente durável e de longa duração. Isso pode ser útil para aplicações que precisam armazenar dados por um longo período de tempo, como registros históricos ou dados científicos.

- **Modelo econômico:** A Arweave utiliza um modelo econômico único baseado no conceito de armazenamento permanente que incentiva os mineradores a armazenar dados indefinidamente. Isso pode ajudar a garantir a viabilidade e durabilidade de longo prazo das aplicações permaweb criadas usando o SmartWeave.

## Como o SmartWeave funciona?

Os contratos SmartWeave, em sua essência, são construídos a partir de um estado inicial do contrato, com edições, adições e subtrações usando tags de transação.

SDKs SmartWeave, como o `Warp` (anteriormente `RedStone`), são usados para consultar essas transações e construir o estado do contrato localmente, modificando o estado do contrato com cada transação. O Avaliador (`Warp`) usa tags para consultar as transações de um contrato; Ele sabe que uma transação faz parte do contrato por meio da tag App-Name e pela tag Contract.

Aqui está um exemplo de uma **interação** de contrato.
- O `App-Name` diz que é uma **AÇÃO** do Smartweave.
- A tag `Contract` fornece o ID da transação específica do estado inicial do contrato.
- A tag `Input` fornece ao contrato sua função a ser executada e qualquer outro dado necessário:

```json
[
    {
        nome:"App-Name"
        valor:"SmartWeaveAction"
    },
    {
        nome:"App-Version"
        valor:"0.3.0"
    },
    {
        nome:"Contract"
        valor:"pyM5amizQRN2VlcVBVaC7QzlguUB0p3O3xx9JmbNW48"
    },
    {
        nome:"Input"
        valor:"{
            "função":"setRecord",
            "subDomínio":"@",
            "transactionId":"lfaFgcoBT8auBrFJepLV1hyiUjtlKwVwn5MTjPnTDcs"
        }"
    }
]
```
E aqui está um exemplo de um **contrato**.
- O `App-Name` diz que é um **CONTRATO** Smartweave.
- A tag `Contract-Src` aponta para o código-fonte do contrato:

```json
[
    {
        chave:"App-Name"
        valor:"SmartWeaveContract"
    },
    {
        chave:"App-Version"
        valor:"0.3.0"
    },
    {
        chave:"Contract-Src"
        valor:"JIIB01pRbNK2-UyNxwQK-6eknrjENMTpTvQmB8ZDzQg"
    },
    {
        chave:"SDK"
        valor:"RedStone"
    },
    {
        chave:"Content-Type"
        valor:"application/json"
    }
]
```

O estado resultante é o estado atual do contrato, que o SDK no lado do cliente pode usar para calcular saldos de usuários, proprietários de contratos e outros detalhes específicos do contrato. Assim que o chamador tem um estado de contrato validado, ele pode construir uma interação para o usuário implantar na cadeia, que, após mineração ou indexação em um [Gateway](/concepts/gateways.md), será incluída na próxima vez que alguém construir o estado do contrato.

## Projetos do ecossistema SmartWeave

Existem vários projetos do ecossistema que aproveitam os SmartContracts do SmartWeave, mas aqui estão alguns de destaque:

### Implementações
- [Warp](https://warp.cc/) | Principal provedor de SDKs SmartWeave, tutoriais e ajuda a manter o protocolo SmartWeave.
- [EXM](https://docs.exm.dev/) | Execution Machine (EXM) é uma plataforma de desenvolvimento que possibilita a criação e uso de aplicativos altamente disponíveis e performáticos em um ambiente descentralizado.

### Ferramentas
- [SonAr](https://sonar.warp.cc/#/app/contracts)| Explorador de contratos SmartWeave, criado e hospedado pelo Warp.

### Aplicativos
- [Permapages](https://permapages.app/) | Ferramenta de criação de páginas permanentes, portal de compra ArNS e portal de criação de ANT. Seu perfil no permaweb.
- [ArNS](arns.md) | Sistema de Nomes Arweave <!-- // todo: atualizar para o portal ArNS quando for lançado -->
- [WeaveDB](https://weavedb.dev/) | Banco de dados NoSQL como um Smart Contract.
- [KwilDB](https://docs.kwil.com/) | Banco de dados SQL como um Smart Contract.
- [ArDrive Inferno](https://ardrive.io/inferno/) | Obtenha PSTs para fazer upload por meio do Ardrive.