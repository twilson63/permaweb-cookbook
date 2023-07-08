---
locale: pt
---
# Aplicações da Permaweb

Uma aplicação da permaweb é um tipo de página da web ou aplicativo da web que é executado no seu navegador. O que torna isso uma aplicação da permaweb é que ela é implantada no Arweave e salva para sempre. Mesmo que a equipe que a desenvolveu siga em frente, os usuários podem ter a certeza de que o aplicativo da permaweb permanecerá online e disponível. Uma grande vantagem das aplicações da permaweb é que elas salvam seus dados no Arweave, o que significa que eles podem facilmente ser importados para outros aplicativos que podem melhorar aquele que você está usando atualmente.

## O que é a permaweb?

::: info INFORMAÇÃO
Para uma exploração mais profunda da permaweb, confira este artigo sobre [A Permaweb](./permaweb.md)
:::

A permaweb é uma coleção de sites, aplicativos e contratos inteligentes construídos sobre os [Serviços da Permaweb do Arweave](./permaweb.md). As partes principais da Permaweb são as seguintes:

* Serviço de Gateway (por exemplo, arweave.net, arweave.live, ar.io)
* Serviço de Agregamento (por exemplo, bundlr.network)
* Serviço de Sequenciamento (por exemplo, warp.cc)
* Serviço de Indexação (por exemplo, goldsky)

<img src="https://arweave.net/ycQzutVToTtVT_vT4811ByswtZ-KjqmifNSehSb1-eg" width="700">

### Serviços de Gateway

Os serviços de gateway são a ponte entre os dados no Arweave e a exibição dos dados no navegador. Os gateways geralmente fornecem serviços de indexação, além de fornecer dados de transações, expondo endpoints de graphQL para consulta de transações do Arweave.

### Serviços de Agregamento

Os serviços de agregamento agregam transações em pacotes de transações e garantem que esses pacotes sejam enviados diretamente para o Arweave. Ao usar um serviço de agregamento como o bundlr.network, você pode enviar centenas de milhares de transações em um único bloco do Arweave.

### Serviços de Sequenciamento

Os sequenciadores permitem alto desempenho para contratos SmartWeave para calcular a lógica de negócios armazenada na rede Arweave.

### Serviços de Indexação

Os serviços de indexação ouvem todas as transações no Arweave e as importam para um banco de dados indexado adequado para consultas rápidas. Eles então expõem um endpoint de graphQL para que as aplicações da permaweb possam fazer consultas otimizadas para dados do Arweave.

Esses serviços trabalham juntos para formar a Camada de Serviços da Permaweb e dão aos desenvolvedores o poder de construir aplicativos totalmente descentralizados na permaweb.

## Desenvolvimento de Aplicações

A abordagem ao desenvolvimento de aplicações na permaweb é semelhante ao desenvolvimento de `Aplicações de Página Única`, a aplicação consiste em funcionalidade frontend que é executada em um navegador da web, e usa GraphQL (Leitura/Consulta), Bundlr (Escrita) e SmartWeave (Computação Descentralizada) para compor a lógica de negócios e a camada de persistência da aplicação.

![aplicativo comum da permaweb](https://arweave.net/UjbgAk8duudDc97lOYIt7rBVtRHp2Z9F6Ua5OcvwNCk/)

Ao aproveitar os frameworks modernos de aplicativos da web e a especificação do [Manifesto de Caminho](./manifests.md), os desenvolvedores podem implantar sites e aplicativos da web na permaweb.

Para saber mais sobre a criação e implantação de Aplicações da Permaweb, confira nossos kits de início rápido em seu framework favorito:

* [React](../kits/react/index.md)
* [Svelte](../kits/svelte/index.md)

::: tip Faltando o meu framework?
Não encontrou seu framework? Por que você não contribui? [Como contribuir para o cookbook](../getting-started/contributing.md)
:::