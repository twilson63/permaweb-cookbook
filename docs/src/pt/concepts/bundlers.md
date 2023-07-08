---
locale: pt
---
# Serviços de Agrupamento
---
Com os serviços de agrupamento, os usuários podem enviar suas transações de dados para um serviço de agrupamento, a fim de que elas sejam "agrupadas" junto com as transações de outros usuários e postadas como uma única transação Arweave em um próximo bloco de Arweave.

### Como enviar para um serviço de agrupamento
---
Você pode ler mais sobre como enviar suas transações para um serviço de agrupamento [aqui](/guides/posting-transactions/bundlr.md).

### O que é um agrupamento?
---
Uma descrição de agrupamento de transações e seus benefícios pode ser encontrada [aqui](/concepts/bundles.md).

### O que é um nó agrupador?
---
Um agrupador é um nó responsável por aceitar transações ou itens de dados de usuários, agrupá-los e postá-los na rede Arweave (com garantia de que eles serão enviados com um ID de transação específico).

O pioneiro dos serviços de agrupamento e o maior agrupador atual é o [bundlr.network](https://bundlr.network). Os nós do Bundlr executam:

- Um proxy reverso NGINX
- Processos de API HTTP
- Um cache Redis
- Um banco de dados SQL (Postgres)
- Processos de trabalhador

Isso garante que os dados sejam persistidos até serem enviados para o Arweave.

### Suporte a múltiplas moedas
---
Um recurso chave dos serviços de agrupamento é que, como eles pagam pela transação base do Arweave para ser enviada (usando tokens AR), eles podem optar por permitir o pagamento das taxas de armazenamento com diferentes tokens. Esse é o principal ponto de entrada para outras cadeias permitirem o armazenamento permanente do Arweave para seus usuários.