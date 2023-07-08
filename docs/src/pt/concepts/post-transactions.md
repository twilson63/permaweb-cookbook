---
locale: pt
---
# Envio de Transações

Existem várias maneiras de enviar transações para o Arweave. Cada uma delas tem suas próprias características únicas e limitações. O diagrama abaixo ilustra as quatro abordagens principais para o envio de transações.

`Direto para Peer`, `Direto para Gateway`, `Agrupado` e `Despachado`.

<img src="https://arweave.net/Z1eDDnz4kqxAkkzy6p5elMz-jKnlaVIletp-Tm6W8kQ" width="550">

::: tip <img src="https://arweave.net/blzzObMx8QvyrPTdLPGV3m-NsnJ-QqBzvQIQzzZEfIk" width="20"> Transações Garantidas
Ao enviar uma grande quantidade de transações ou quando é desejável um tempo de liquidação rápido, considere usar um serviço de agrupamento. Os serviços de agrupamento liquidam rapidamente grandes volumes de transações e tornam os dados da transação disponíveis em questão de milissegundos. O serviço de agrupamento mantém as transações enviadas até que sejam confirmadas na rede. Se as transações não forem incluídas no bloco mais recente, o serviço de agrupamento as reenvia em cada novo bloco até que sejam registradas na cadeia com um número suficiente de confirmações.
:::

## Transações Diretas

As transações enviadas diretamente para o Arweave estão disponíveis em duas variedades: transações de **carteira para carteira** e transações de **dados**. A primeira transfere tokens **AR** entre endereços de carteira. A segunda envia dados para o Arweave e paga os custos de armazenamento associados.

Curiosamente, as transações de **dados** também podem transferir tokens **AR** para um endereço de carteira enquanto pagam os custos de armazenamento ao mesmo tempo.

Todas as transações permitem que o usuário especifique até 2KB de metadados na forma de [tags personalizadas](./tags.md).

### Direto para Peer

Transações podem ser enviadas diretamente para um nó Arweave (nó de mineração). Esta é talvez a forma mais descentralizada de enviar uma transação, pois os clientes podem escolher para qual nó desejam enviar.

Essa abordagem não é isenta de desvantagens. Os nós podem entrar e sair, o que dificulta o envio confiável de transações de um aplicativo. Embora seja possível consultar uma lista de nós ativos e escolher um antes de enviar, isso adiciona complexidade ao processo. Além disso, as transações enviadas para os nós só podem ser consultadas no gateway após serem mineradas em um bloco. Isso introduz um atraso de 1-2 minutos entre o envio da transação para um nó e sua disponibilidade para leitura no navegador por meio de um gateway.

Por esses motivos, os desenvolvedores tendem a configurar o `arweave-js` para apontar para um gateway ao enviar transações diretas, pois o cache otimista no gateway torna a transação disponível quase imediatamente.

### Direto para Gateway

Os gateways estão entre os clientes e a rede de nós do Arweave. Uma das principais funções do gateway é indexar transações e armazenar em cache de forma otimista os dados enviados para a rede enquanto aguardam sua inclusão em um bloco. Isso torna a transação consultável em um estado "Pendente" quase que instantaneamente, permitindo que aplicativos desenvolvidos sobre um gateway sejam mais responsivos. Ainda há o risco de transações serem removidas do cache otimista se não forem mineradas em um bloco pelos nós.

Um exemplo de como enviar uma transação direta usando o `arweave-js` pode ser encontrado [neste guia](../guides/posting-transactions/arweave-js.md).

## Transações Agrupadas

Serviços construídos sobre o Arweave que fornecem utilidades adicionais para construtores de Permaweb às vezes são chamados de Serviços Permaweb. Um serviço de agrupamento é um desses serviços. Os agrupadores agrupam várias transações individuais em uma única transação que é enviada diretamente para o Arweave. Dessa forma, uma única transação no nível do protocolo pode conter dezenas de milhares de transações agrupadas. No entanto, há uma restrição: apenas transações de **dados** podem ser incluídas em um pacote. Transações de **carteira para carteira** (que transferem tokens **AR** entre endereços de carteira) devem ser feitas como transações individuais enviadas diretamente para o Arweave.

Outra diferença ao usar um serviço de agrupamento como o [bundlr.network](https://bundlr.network) é que você deve fazer um pequeno depósito no nó agrupador que pretende usar antes de enviar as transações. Isso permite que o serviço de agrupamento cobre por muitos envios pequenos (ou grandes) sem a necessidade de liquidar transferências de tokens **AR** diretamente no Arweave a cada vez.

O [bundlr.network](https://bundlr.network) permite que os clientes façam depósitos em várias [criptomoedas suportadas](https://docs.bundlr.network/docs/currencies).

::: info
Quando as transações são enviadas para o bundlr.network, elas também aparecem no cache otimista dos gateways conectados, tornando-as disponíveis para consulta em questão de milissegundos.
:::

Um exemplo de como enviar transações agrupadas usando o `bundlr.network/client` pode ser encontrado [neste guia](../guides/posting-transactions/bundlr.md).

## Transações Despachadas

Outra forma de enviar transações agrupadas é pelo navegador. Embora os navegadores imponham algumas restrições sobre o tamanho dos dados que podem ser enviados, as carteiras baseadas em navegadores podem enviar transações para agrupadores. As carteiras de navegador Arweave implementam um método de API chamado `dispatch()`. Se você estiver enviando transações pequenas (100KB ou menos), pode usar o método `dispatch()` das carteiras para aproveitar as transações agrupadas, mesmo se o `bundlr.network/client` não estiver incluído em seu aplicativo.

Um exemplo de como enviar uma transação agrupada de 100KB ou menos com o método `dispatch()` de uma carteira Arweave pode ser encontrado [neste guia](../guides/posting-transactions/dispatch.md).

## Recursos

- Exemplo do [arweave-js](../guides/posting-transactions/arweave-js.md)
- Exemplo do [bundlr.network](../guides/posting-transactions/bundlr.md)
- Exemplo do [dispatch](../guides/posting-transactions/dispatch.md)